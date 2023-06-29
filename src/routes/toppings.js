const express = require('express');
const router = express.Router();

const toppingController = require('../app/controllers/toppingController');

router.get('/create', toppingController.create);
router.post('/store', toppingController.store);
router.get('/:id/edit', toppingController.edit);
router.put('/:id', toppingController.update);
router.get('/:slug', toppingController.show);
router.post('/handle-form-actions', toppingController.handleFormActions);
router.post('/handle-trash-actions', toppingController.handleTrashActions);
router.patch('/:id/restore', toppingController.restore);
router.delete('/:id', toppingController.delete);
router.delete('/:id/force', toppingController.forceDelete);
module.exports = router;
