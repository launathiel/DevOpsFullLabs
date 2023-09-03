const Inventory = require('../models/inventory');
const logger = require('../../utils/logger');

class inventoryRepository {
    async createInventory(inventoryDets) {
        try {
            const newInventory = new Inventory({
                name: inventoryDets.name,
                category: inventoryDets.category,
                description: inventoryDets.description,
                price: inventoryDets.price,
                qty: inventoryDets.qty
            });
            await newInventory.save();
            return newInventory;
        } catch (err) {
            logger.error(err.message);
        }
    }

    async findAllInventory() {
        try {
            const inventory = await Inventory.find();
            return inventory;
        } catch (err) {
            logger.error(err.message);
        }
    }

    async findInventoryById(id) {
        try {
            const inventory = await Inventory.find({ _id : id });
            return inventory;
        } catch (err) {
            logger.error(err.message);
        }
    }

    async updateInventoryById(id, inventoryDets) {
        try {
            const inventory = await Inventory.findByIdAndUpdate(id, inventoryDets);
            return inventory;
        } catch (err) {
            logger.error(err.message);
        }
    }

    async deleteInventoryById(id) {
        try {
            const inventory = await Inventory.deleteOne({ _id : id });
            return inventory;
        } catch (err) {
            logger.error(err.message);
        }
    }
}

module.exports = inventoryRepository;