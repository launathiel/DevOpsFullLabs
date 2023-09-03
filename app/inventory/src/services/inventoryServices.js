const { inventoryRepository } = require('../database');
const { healthCheck } = require('../utils');
const logger = require('../utils/logger');

class inventoryServices {
    constructor() {
        this.repository = new inventoryRepository();
    }

    async createInventory(inventoryDets, res) {
        try{
            const newInventory = await this.repository.createInventory(inventoryDets);
            return res.status(201).json({
                message: "Inventory Created!",
                success: true,
                data: newInventory
            });
        }catch(err){
            logger.error(err.message);
            return res.status(500).json({
                message: "Unable to create inventory",
                success: false,
                error: err.message
            });
        }
    }
    
    async getAllInventory(res){
        try{
            const data = await this.repository.findAllInventory();
            return res.status(200).json({
                message: 'Successfully get all inventory',
                success: "true",
                data
            });
        }catch(err){
            logger.error(err.message)
            return res.status(500).json({
                message: 'Unable to get all inventory',
                success: "false",
                error: err.message
            });
        }
    }

    async getInventoryById(id, res){
        try{
            const inventory = await this.repository.findInventoryById(id);
            if(inventory.length == 0 ){
                return res.status(404).json({
                    message: 'inventory not found',
                    success: "false",
                });
            }
            return res.status(200).json({
                message: 'Successfully get inventory by id',
                success: "true",
                inventory
            });
        }catch(err){
            logger.error(err.message)
            return res.status(500).json({
                message: 'Unable to get inventory',
                success: "false"
            });
        }
    }

    async updateInventoryById(id, inventoryDets, res){
        try{
            // check if inventory exists
            const inventory = await this.repository.findInventoryById(id);
            if(inventory.length == 0 ){
                return res.status(404).json({
                    message: "Inventory Not Found",
                    success: false
                });
            }
            // update inventory
            await this.repository.updateInventoryById(id, inventoryDets);
            return res.status(200).json({
                message: "Inventory updated successfully",
                success: true
            });
        }catch(err){
            logger.error(err.message);
            return res.status(500).json({
                message: "Unable to update inventory",
                success: false,
                error: err.message
            });
        }
    }
    
    async deleteInventoryById(id, res){
        try{
            // check if inventory exists
            const inventory = await this.repository.findInventoryById(id);
            if(inventory.length == 0 ){
                return res.status(404).json({
                    message: "Inventory Not Found",
                    success: false
                });
            }
            // delete inventory
            await this.repository.deleteInventoryById(id);
            return res.status(200).json({
                message: "Inventory deleted successfully",
                success: true
            });
        }catch(err){
            logger.error(err.message);
            return res.status(500).json({
                message: "Unable to delete Inventory",
                success: false,
                error: err.message
            });
        }
    }

    async healthCheck(res){
        try{
            const health = await healthCheck();
            return res.status(200).json({
                health
            });
        }catch(err){
            logger.error(err.message);
            return res.status(500).json({
                error: err.message,
            });
        }
    }
}

module.exports = inventoryServices;