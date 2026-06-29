/**
 * Shuang-Yuan Chang
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

// POST /exercises - Create a new exercise
app.post('/exercises', asyncHandler(async (req, res) => {
    // Validate the request body
    if (!exercises.validateExercise(req.body)) {
        return res.status(400).json({ Error: "Invalid request" });
    }
    
    // Create the exercise in the database
    const newExercise = await exercises.createExercise(req.body);
    
    // Return the created exercise with 201 status
    res.status(201).json(newExercise);
}));

// GET /exercises - Retrieve all exercises
app.get('/exercises', asyncHandler(async (req, res) => {
    const allExercises = await exercises.getAllExercises();
    res.status(200).json(allExercises);
}));

// GET /exercises/:_id - Retrieve a specific exercise by ID
app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = await exercises.getExerciseById(req.params._id);
    
    if (!exercise) {
        return res.status(404).json({ Error: "Not found" });
    }
    
    res.status(200).json(exercise);
}));

// PUT /exercises/:_id - Update a specific exercise
app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    // First validate the request body
    if (!exercises.validateExercise(req.body)) {
        return res.status(400).json({ Error: "Invalid request" });
    }
    
    // Then check if the exercise exists
    const updatedExercise = await exercises.updateExerciseById(req.params._id, req.body);
    
    if (!updatedExercise) {
        return res.status(404).json({ Error: "Not found" });
    }
    
    res.status(200).json(updatedExercise);
}));

// DELETE /exercises/:_id - Delete a specific exercise
app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const deleted = await exercises.deleteExerciseById(req.params._id);
    
    if (!deleted) {
        return res.status(404).json({ Error: "Not found" });
    }
    
    res.status(204).send();
}));

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});