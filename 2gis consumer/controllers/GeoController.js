const express = require('express');
const GeoService = require('../services/GeoService');

const geoController = express.Router();

geoController.use(express.json());
GeoService.init();


geoController.post('/save', (req, res) => {
    const { data } = req.body;
    if (!data) return res.sendStatus(403);

    GeoService.saveAll(data).then(() => res.sendStatus(200));
});

geoController.post('/remove', (req, res) => {
    const { data } = req.body;
    if (!data) return res.sendStatus(403);

    GeoService.remove(data).then(() => res.sendStatus(200));
});

geoController.get('/load', (req, res) => {
    GeoService.load().then(result => {
        res.json({ data: result });
    });
});

geoController.get('/', (req, res) => {
    res.render('index', { apiKey: process.env.API_KEY, suggestApiKey: process.env.SUGGEST_API_KEY });
});

module.exports = geoController;
