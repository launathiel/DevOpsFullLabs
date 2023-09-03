const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
mongoose.set('strictQuery', true)
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const inventorySchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: null
        },
        qty: {
            type: Number,
            default: null
        }
    },
    { 
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false
    }
);

inventorySchema.plugin(autoIncrement.plugin, 'inventory');

module.exports = model('inventory', inventorySchema);