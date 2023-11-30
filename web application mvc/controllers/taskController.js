const express = require('express');
const TaskService = require('../services/taskService');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await TaskService.getAllTasks();
        res.render('index', { tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async (req, res) => {
    try {
        const { title } = req.body;
        await TaskService.addTask(title);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/complete/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        await TaskService.toggleTaskCompletion(taskId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/delete/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        await TaskService.deleteTask(taskId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/edit/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await TaskService.getTaskById(taskId);
        if (task) {
            res.render('edit', { task });
        } else {
            res.render('not_found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { title } = req.body;
        await TaskService.updateTask(taskId, title);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
