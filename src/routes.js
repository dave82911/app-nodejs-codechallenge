const express = require('express');

const transactionsController = require('./controllers/transactionsController');

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('Health');
});

// transactions
router.post('/create', transactionsController.create);
router.get('/transaction/:id', transactionsController.findById);

module.exports = router;