const Task = require('../models/task');

class TaskService {
    static async getAllTasks() {
        try {
            return await Task.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addTask(title) {
        try {
            return await Task.create({ title });
        } catch (error) {
            throw error;
        }
    }

    static async toggleTaskCompletion(taskId) {
        try {
            const task = await Task.findByPk(taskId);
            if (task) {
                task.completed = !task.completed;
                await task.save();
            }
        } catch (error) {
            throw error;
        }
    }

    static async deleteTask(taskId) {
        try {
            await Task.destroy({ where: { id: taskId } });
        } catch (error) {
            throw error;
        }
    }

    static async getTaskById(taskId) {
        try {
            return await Task.findByPk(taskId);
        } catch (error) {
            throw error;
        }
    }

    static async updateTask(taskId, title) {
        try {
            const task = await Task.findByPk(taskId);
            if (task) {
                task.title = title;
                await task.save();
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TaskService;
