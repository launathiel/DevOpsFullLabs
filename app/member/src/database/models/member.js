const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
mongoose.set('strictQuery', true)
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const memberSchema = new Schema (
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            default: null
        },
        city: {
            type: String,
            default: null
        }
    },
    { 
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false
    }
);

memberSchema.plugin(autoIncrement.plugin, 'member');

module.exports = model('member', memberSchema);