/**
 * Shuang-Yuan Chang
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

// Define the Exercise schema
const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

// Create the Exercise model
const Exercise = mongoose.model('Exercise', exerciseSchema, 'exercises');

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Validates date format MM-DD-YY
 * @param {string} date
 * Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
 */
function isDateValid(date) {
    // Test using a regular expression. 
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
 * Validates the request body for exercise operations
 */
function validateExercise(body) {
    // Check if body has exactly 5 properties
    const requiredProperties = ['name', 'reps', 'weight', 'unit', 'date'];
    const bodyKeys = Object.keys(body);
    
    // Must have exactly 5 properties, no more, no less
    if (bodyKeys.length !== 5) {
        return false;
    }
    
    // Check all required properties exist
    for (let key of requiredProperties) {
        if (!bodyKeys.includes(key)) {
            return false;
        }
    }
    
    // Validate name: string with at least one character
    if (typeof body.name !== 'string' || body.name.length === 0) {
        return false;
    }
    
    // Validate reps: integer > 0
    if (!Number.isInteger(body.reps) || body.reps <= 0) {
        return false;
    }
    
    // Validate weight: integer > 0
    if (!Number.isInteger(body.weight) || body.weight <= 0) {
        return false;
    }
    
    // Validate unit: either "kgs" or "lbs"
    if (body.unit !== 'kgs' && body.unit !== 'lbs') {
        return false;
    }
    
    // Validate date: MM-DD-YY format
    if (!isDateValid(body.date)) {
        return false;
    }
    
    return true;
}

/**
 * Creates a new exercise in the database
 */
async function createExercise(exerciseData) {
    const exercise = new Exercise(exerciseData);
    const savedExercise = await exercise.save();
    return savedExercise.toObject();
}

/**
 * Retrieves all exercises from the database
 */
async function getAllExercises() {
    const exercises = await Exercise.find();
    return exercises.map(exercise => exercise.toObject());
}

/**
 * Retrieves a single exercise by ID
 */
async function getExerciseById(id) {
    try {
        const exercise = await Exercise.findById(id);
        return exercise ? exercise.toObject() : null;
    } catch (err) {
        // Invalid ObjectId format
        return null;
    }
}

/**
 * Updates an exercise by ID
 */
async function updateExerciseById(id, exerciseData) {
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(
            id,
            exerciseData,
            { new: true }
        );
        return updatedExercise ? updatedExercise.toObject() : null;
    } catch (err) {
        // Invalid ObjectId format
        return null;
    }
}

/**
 * Deletes an exercise by ID
 */
async function deleteExerciseById(id) {
    try {
        const result = await Exercise.findByIdAndDelete(id);
        return result !== null;
    } catch (err) {
        // Invalid ObjectId format
        return false;
    }
}

export { 
    connect,
    validateExercise,
    createExercise,
    getAllExercises,
    getExerciseById,
    updateExerciseById,
    deleteExerciseById
};