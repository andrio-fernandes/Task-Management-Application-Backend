const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {

    try {

        const { title, description, dueDate } = req.body;

        const task = await Task.create({

            user: req.user,
            title,
            description,
            dueDate

        });

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find({
            user: req.user
        }).sort({ createdAt: -1 });

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        res.status(200).json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Task deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;