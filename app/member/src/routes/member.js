const router = require('express').Router();
const { tokenAuth } = require('../middlewares');
const memberServices = require('../services/memberServices');

const service = new memberServices();

router.get('/health', async (req, res) => {
    await service.healthCheck(res);
});

router.post('/create', tokenAuth, async (req, res) => {
    await service.createMember(req.body, res);
});

router.get('/all', tokenAuth, async (req, res) => {
    await service.getAllMember(res);
});

router.get('/:id', tokenAuth, async (req, res) => {
    await service.getMemberById(req.params.id, res);
});

router.put('/:id', tokenAuth, async (req, res) => {
    await service.updateMemberById(req.params.id, req.body, res);
});

router.delete('/:id', tokenAuth, async (req, res) => {
    await service.deleteMemberById(req.params.id, res);
});

router.get('/', tokenAuth, async (req, res) => {
    return res.status(200).json({
        message: 'you\'re authorized to make a call',
        success: "true",
    });
})

module.exports = router;