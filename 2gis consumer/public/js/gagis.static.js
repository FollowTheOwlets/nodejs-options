const $ = (selector) => {
    const temp = document.querySelector(selector) || {};

    temp.isShow = () => {
        return temp.classList && !temp.classList.contains('hide');
    }
    temp.hide = () => {
        temp.classList && temp.classList.add('hide');
    }
    temp.show = () => {
        temp.classList && temp.classList.remove('hide');
    }
    temp.isEnable = () => {
        return temp.classList && !temp.classList.contains('disable');
    }
    temp.disable = () => {
        temp.classList && !temp.classList.add('disable');
        if (temp.tagName && temp.tagName.toLowerCase() === 'input') {
            temp.disabled = true;
        }
    }
    temp.enable = () => {
        temp.classList && !temp.classList.remove('disable');
        if (temp.tagName && temp.tagName.toLowerCase() === 'input') {
            temp.disabled = false;
        }
    }
    return temp;
};

const create = (tag) => {
    const temp = document.createElement(tag);

    temp.isShow = () => {
        return temp.classList && !temp.classList.contains('hide');
    }
    temp.hide = () => {
        temp.classList && temp.classList.add('hide');
    }
    temp.show = () => {
        temp.classList && temp.classList.remove('hide');
    }

    temp.withId = (id) => {
        temp.id = id;
        return temp;
    }

    temp.withClass = (clas) => {
        temp.classList.add(clas);
        return temp;
    }

    temp.withInner = (inner) => {
        temp.innerHTML = inner;
        return temp;
    }

    return temp;
};

const menuBuilder = () => {
    let menu = create('div')
        .withId('menu')
        .withClass('hide')
        .withInner(
            '<ul id="menu__list">\
                    <li>Название: <br /> <input type="text" name="name_text" /></li>\
                    <li>Описание: <br /> <textarea type="text" name="balloon_text" ></textarea></li>\
                    <li>Цвет заливки: <br /><input type="color" name="fill_color"/></li>\
                </ul><br />\
                <div align="center" class="btn">Сохранить</div>'
        );
    menu.click = (coords) => {
        console.log(menu.classList)
        if (menu.isShow()) {
            menu.remove();
            return;
        }
        $('body').appendChild(menu);
        menu.style.left = `${coords[0]}px`;
        menu.style.top = `${coords[1]}px`;

        $('#menu .btn').addEventListener('click', () => {
            let description = gagisUtils.convertTextToBalloon($('textarea[name="balloon_text"]').value);
            const object = menu.newObjectProvider();
            object.properties.set({
                iconCaption: $('input[name="name_text"]').value,
                balloonContent: description,
                balloonContentHeader: `<strong><pre> ${$('input[name="name_text"]').value}</pre></strong>`,
            });
            object.options.set({
                fillColor: $('input[name="fill_color"]').value,
                iconColor: $('input[name="fill_color"]').value,
                fillOpacity: 0.5,
                strokeWidth: 0,
            });
            object.events.add('contextmenu', menu.objectRemoveHandlerCreator(object));
            menu.objectSaveHandlerCreator(object);
            menu.remove();
        });
    };

    menu.newObjectProvider = () => { return {} };
    menu.objectSaveHandlerCreator = (object) => { };
    menu.objectRemoveHandlerCreator = (object) => { };

    menu.with = (name, fun) => {
        menu[name] = fun;
        return menu;
    };

    return menu;
}