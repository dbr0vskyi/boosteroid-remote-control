const express = require('express');
const { mocksControllers } = require('../controllers');

const router = express.Router();

router.get('/keymap', mocksControllers.keymapController);
router.get('/modals', mocksControllers.modalsController);

module.exports = router;
