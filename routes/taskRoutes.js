const express = require("express");

const Task = require("../models/task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


const ALLOWED_FIELDS = ["title", "description", "status", "dueDate"];


function isCastError(error) {
    return error && error.name === "CastError";
}


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {

    try {

        const { title, description, dueDate } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await Task.create({

            user: req.user,
            title: title.trim(),
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

        const { search, status, page, limit } = req.query;

        const query = { user: req.user };

        if (status === "Pending" || status === "Completed") {
            query.status = status;
        }

        if (search && String(search).trim()) {

            const escaped =
                String(search).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            query.$or = [
                { title: { $regex: escaped, $options: "i" } },
                { description: { $regex: escaped, $options: "i" } }
            ];

        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);

        const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));

        const total = await Task.countDocuments(query);

        const tasks = await Task.find(query)

            .sort({ createdAt: -1 })

            .skip((pageNum - 1) * limitNum)

            .limit(limitNum);

        const [completed, pending] = await Promise.all([

            Task.countDocuments({ user: req.user, status: "Completed" }),

            Task.countDocuments({ user: req.user, status: "Pending" })

        ]);

        res.status(200).json({

            tasks,
            total,
            page: pageNum,
            totalPages: Math.max(1, Math.ceil(total / limitNum)),

            stats: {
                total: completed + pending,
                completed,
                pending
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const updates = {};

        ALLOWED_FIELDS.forEach(field => {

            if (field in req.body) {
                updates[field] = req.body[field];
            }

        });

        if ("title" in updates) {

            if (!updates.title || !updates.title.trim()) {
                return res.status(400).json({
                    message: "Title is required"
                });
            }

            updates.title = updates.title.trim();

        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No valid fields to update"
            });
        }

        const updatedTask = await Task.findOneAndUpdate(

            { _id: req.params.id, user: req.user },

            { $set: updates },

            { returnDocument: "after", runValidators: true }

        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(updatedTask);

    } catch (error) {

        if (isCastError(error)) {
            return res.status(400).json({
                message: "Invalid task id"
            });
        }

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const deletedTask = await Task.findOneAndDelete({

            _id: req.params.id,
            user: req.user

        });

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted"
        });

    } catch (error) {

        if (isCastError(error)) {
            return res.status(400).json({
                message: "Invalid task id"
            });
        }

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;