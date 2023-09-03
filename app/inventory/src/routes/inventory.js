const router = require('express').Router();
const { tokenAuth } = require('../middlewares');
const inventoryServices = require('../services/inventoryServices');

const service = new inventoryServices();

router.post('/create', tokenAuth, async (req, res) => {
    await service.createInventory(req.body, res);
});

router.get('/all', tokenAuth, async (req, res) => {
    await service.getAllInventory(res);
});

router.get('/:id', tokenAuth, async (req, res) => {
    await service.getInventoryById(req.params.id, res);
});

router.put('/:id', tokenAuth, async (req, res) => {
    await service.updateInventoryById(req.params.id, req.body, res);
});

router.delete('/:id', tokenAuth, async (req, res) => {
    await service.deleteInventoryById(req.params.id, res);
});

router.get('/health', async (req, res) => {
    await service.healthCheck(res);
});

router.get('/', tokenAuth, async (req, res) => {
    return res.status(200).json({
        message: 'you\'re authorized to make a call',
        success: "true",
    });
})

module.exports = router;