const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true },
    dueDate: { 
        type: Date, 
        required: true },
    status: {
        type: String,
        enum: ['not started', 'ongoing', 'completed'],
        default: 'not started',
    },
});

module.exports = mongoose.model('Task', taskSchema);
