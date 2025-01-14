import mongoose from "mongoose";

// Define image schema
const imageSchema = new mongoose.Schema({
    size: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

// Define index of image schema
imageSchema.index({requestDate: 1, personName: 1});

export default mongoose.model('Image', imageSchema)