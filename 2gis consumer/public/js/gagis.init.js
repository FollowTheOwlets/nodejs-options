const init = () => {
    const map = new ymaps.Map('map', {
        center: [59.915063, 30.316433],
        zoom: 13,
        controls: ['geolocationControl', 'searchControl'],
    }, {
        suppressMapOpenBlock: true
    }),
        polygonCaptionPoint = new ymaps.GeoObject({
            geometry: { type: 'Point' },
            properties: { iconCaption: 'Адрес', _id: 0 }
        }, {
            preset: 'islands#blackDotIconWithCaption',
            draggable: true,
            iconCaptionMaxWidth: '215'
        }),
        searchControl = map.controls.get('searchControl');
    searchControl.options.set({ noPlacemark: true, placeholderContent: 'Введите адрес для проверки' });
    map.geoObjects.add(polygonCaptionPoint);

    const save = () => {
        let objectsData = [];
        map.geoObjects.each(object => {
            let o = {
                type: object.geometry.getType(),
                coordinates: object.geometry.getCoordinates(),
                properties: object.properties.getAll(),
                options: object.options.getAll(),
                _id: object.properties.get('_id'),
            };

            o.properties._id = undefined;
            objectsData.push(o);
        });

        objectsData = objectsData.filter(e => e.properties._id !== 0);
        const url = '/save';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: objectsData }),
        };

        fetch(url, options);
    };
    const removeObject = (object) => (e) => {
        let data = {
            type: object.geometry.getType(),
            coordinates: object.geometry.getCoordinates(),
            properties: object.properties.getAll(),
            _id: object.properties.get('_id'),
        };

        if (data.type == 'Polygon') {
            data.options = object.options.getAll();
            data.properties._id = undefined;
        }

        const url = '/remove';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        };

        fetch(url, options).then((res) => {
            if (res.status == 200) {
                map.geoObjects.remove(object);
                let menu = $('#menu');
                if (menu.isShow()) {
                    menu.remove();
                }
            }
        });
    };
    const STATE = { DEFAULT: 0, ADD_POINT: 1, ADD_POLYGON: 2 };
    const searchInput = $('.search input');
    const searchResults = $('.results');
    const searchBtn = $('.search .btn');
    const addPointBtn = $(".add.point");
    const addPolygonBtn = $(".add.polygon");
    const controls = [searchInput, searchBtn, addPointBtn, addPolygonBtn];
    let editingMark;
    let state = STATE.DEFAULT;
    let editingPolygon;
    let polygons = [];
    const load = () => {
        const url = '/load';

        fetch(url)
            .then(response => response.json())
            .then(res => {
                let { data } = res;

                data.forEach(objectData => {
                    if (objectData._id == 0) return;
                    let geoObject;
                    switch (objectData.type) {
                        case 'Point':
                            geoObject = new ymaps.Placemark(objectData.coordinates, objectData.properties);
                            objectData.options && geoObject.options.set(objectData.options);
                            break;
                        case 'Polygon':
                            geoObject = new ymaps.Polygon(objectData.coordinates, objectData.properties);
                            geoObject.options.set(objectData.options);
                            polygons.push(geoObject);
                            break;
                        default:
                            geoObject = new ymaps.GeoObject(objectData);
                            return;
                    }
                    geoObject.properties.set('_id', objectData._id);
                    geoObject.events.add('contextmenu', removeObjectHandlerCreator(geoObject));
                    map.geoObjects.add(geoObject);
                });
            });
    };
    const removeObjectHandlerCreator = (object) => (e) => {
        let menu = $('#menu');
        if (menu.isShow()) {
            menu.remove();
            return;
        }
        menu = create('div')
            .withId('menu')
            .withInner('<div align="center" class="btn">Удалить</div>');

        $('body').appendChild(menu);

        menu.style.left = `${e.get('pagePixels')[0]}px`;
        menu.style.top = `${e.get('pagePixels')[1]}px`;

        $('#menu .btn').addEventListener('click', removeObject(object));
    };
    const markEditHandler = () => {
        let listener;
        const menu = menuBuilder()
            .with('newObjectProvider', () => editingMark)
            .with('objectRemoveHandlerCreator', removeObjectHandlerCreator)
            .with('objectSaveHandlerCreator', (object) => {
                editingMark.events.remove('contextmenu', listener);
                editingMark = undefined;
                save();
            });
        listener = (e) =>
            menu.click(e.get('pagePixels'));
        return listener;
    };
    const highlightResult = (obj) => {
        polygonCaptionPoint.balloon.close();
        const coords = obj.geometry.getCoordinates();
        let polygon;

        for (const pol of polygons) {
            if (pol.geometry.contains(coords)) {
                polygon = pol;
                break;
            }
        }

        console.log(polygon);

        const setData = async (coords) => {
            const address = await ymaps.geocode(coords).then((res) => {
                const firstGeoObject = res.geoObjects.get(0);
                console.log(firstGeoObject.properties);
                return firstGeoObject ? firstGeoObject.properties.get('text') : 'Адрес не найден';

            });
            const description = polygon.properties.get('balloonContent');
            polygonCaptionPoint.properties.set({
                iconCaption: address,
                balloonContent: `<strong>Адрес:</strong> ${address}<br/><strong>Описание:</strong></br> ${description}`,
                balloonContentHeader: `<strong>${polygon.properties.get('hintContent')}</strong>`
            });
            polygonCaptionPoint.options.visible = true;
            polygonCaptionPoint.balloon.open();
        }

        if (polygon) {
            polygonCaptionPoint.geometry.setCoordinates(coords);
            polygonCaptionPoint.options.set('iconColor', polygon.properties.get('fill'));
            setData(coords);
        } else {
            polygonCaptionPoint.geometry.setCoordinates(coords);
            polygonCaptionPoint.properties.set({
                iconCaption: 'Пока неизвестная зона',
                balloonContent: '',
                balloonContentHeader: ''
            });
            polygonCaptionPoint.options.set('iconColor', 'black');
        }
    };
    const poligonInfoEditHandler = () => {
        let listener;
        const menu = menuBuilder()
            .with('newObjectProvider', () => new ymaps.Polygon(editingPolygon.geometry.getCoordinates(), { type: 'Feature' }, {}))
            .with('objectRemoveHandlerCreator', removeObjectHandlerCreator)
            .with('objectSaveHandlerCreator', (object) => {
                editingPolygon.events.remove('contextmenu', listener);
                editingPolygon.editor.stopDrawing();
                polygons.push(object);
                map.geoObjects.remove(editingPolygon);
                map.geoObjects.add(object);
                editingPolygon = undefined;
                save();
            });
        listener = (e) =>
            menu.click(e.get('pagePixels'));
        return listener;
    };
    const createMarkHandler = (e) => {
        const coords = e.get('coords');
        if (editingMark) {
            editingMark.geometry.setCoordinates(coords);
            return;
        }
        const mark = new ymaps.Placemark(coords, {});
        map.geoObjects.add(mark);
        editingMark = mark;
        editingMark.events.add('contextmenu', markEditHandler());
        map.cursors.push('arrow');
    };
    const createPolygonHandler = (e) => {
        if (editingPolygon) return;

        editingPolygon = new ymaps.Polygon([], {}, {
            editorDrawingCursor: 'crosshair',
            fillColor: '#00FF00',
            strokeColor: '#0000FF',
            fillOpacity: 0.5,
            strokeWidth: 2,
        });

        map.geoObjects.add(editingPolygon);
        editingPolygon.editor.startDrawing();

        editingPolygon.events.add('contextmenu', poligonInfoEditHandler());
    };
    const addPointClickHandler = (e) => {
        if (!addPointBtn.isEnable()) return;

        state = STATE.ADD_POINT;

        for (let element of controls) {
            if (element !== addPointBtn) {
                element.disable();
            } else {
                element.enable();
            }
        }
        map.cursors.push('crosshair');
        map.events.add('click', createMarkHandler);
    };
    const addPolygonClickHandler = (e) => {
        if (!addPolygonBtn.isEnable()) return;

        state = STATE.ADD_POLYGON;

        for (let element of controls) {
            if (element !== addPolygonBtn) {
                element.disable();
            } else {
                element.enable();
            }
        }

        map.events.add('click', createPolygonHandler);
        createPolygonHandler(e);
    };
    const defaultHandler = (e) => {
        map.cursors.push('arrow');
        for (let element of controls) {
            element.enable();
        }
        let menu = $('#menu');
        if (menu.isShow()) {
            menu.remove();
        }
        if (state == STATE.ADD_POINT) {
            map.events.remove('click', createMarkHandler);
        }
        if (state == STATE.ADD_POLYGON) {
            map.events.remove('click', createPolygonHandler);
        }
        if (editingMark) {
            map.geoObjects.remove(editingMark);
            editingMark.events.remove('click', markEditHandler);
            editingMark = undefined;
        }
        if (editingPolygon) {
            map.geoObjects.remove(editingPolygon);
            editingPolygon.events.remove('click', poligonInfoEditHandler);
            editingPolygon.editor.stopDrawing();
            editingPolygon = undefined;
        }
        state = STATE.DEFAULT;
        return;
    };
    addPointBtn.addEventListener('click', (e) => state === STATE.ADD_POINT ? defaultHandler(e) : addPointClickHandler(e));
    addPolygonBtn.addEventListener('click', (e) => state === STATE.ADD_POLYGON ? defaultHandler(e) : addPolygonClickHandler(e));
    searchControl.events.add('resultshow', (e) => highlightResult(searchControl.getResultsArray()[e.get('index')]));
    map.controls.get('geolocationControl').events.add('locationchange', (e) => highlightResult(e.get('geoObjects').get(0)));
    polygonCaptionPoint.events.add('dragstart', () => {
        polygonCaptionPoint.properties.set({ iconCaption: '', balloonContent: '' });
        polygonCaptionPoint.options.set('iconColor', 'black');
    });
    polygonCaptionPoint.events.add('dragend', () => highlightResult(polygonCaptionPoint));
    map.events.add('click', (e) => {
        if (state == STATE.ADD_POINT) return;
        polygonCaptionPoint.geometry.setCoordinates(e.get('coords'));
        highlightResult(polygonCaptionPoint);
    });
    load();

    searchInput.addEventListener('input', () => {
        searchResults.show();

        let objectsData = [];
        map.geoObjects.each(object => {
            objectsData.push(object);
        });
        searchResults.innerHTML = "";
        objectsData
            .filter(e => e.properties.get('_id') != 0)
            .filter(e => e.properties.get('iconCaption').includes(searchInput.value))
            .map(e => {
                const block = create('div').withClass('result').withInner(e.properties.get('iconCaption'));
                block.addEventListener('click', () => {
                    console.log(e.geometry.getType())
                    if (e.geometry.getType() === 'Polygon') {
                        let coords = [0, 0];
                        for (let point of e.geometry.getCoordinates()[0]) {
                            coords[0] += point[0];
                            coords[1] += point[1];
                        }
                        coords[0] = coords[0] / e.geometry.getCoordinates()[0].length;
                        coords[1] = coords[1] / e.geometry.getCoordinates()[0].length;
                        map.setCenter(coords, 15, {
                            checkZoomRange: true
                        });
                        e.balloon.open(coords);
                    } else {
                        map.setCenter(e.geometry.getCoordinates(), 15, {
                            checkZoomRange: true
                        });
                        e.balloon.open();
                    }
                    searchResults.hide();
                });
                searchResults.appendChild(block);
            });
    });

    searchInput.addEventListener('blur', () => setTimeout(() => searchResults.hide(), 300));
}



ymaps.ready(init);