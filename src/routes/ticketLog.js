// For importing required modules and initializing the router
const express = require('express');

const router = express.Router();
const ticketLogController = require('../controller/ticketLog');
const { validateToken } = require('../middlewares/validateToken');

/* == == == Responsible for defining routes to create
& retrieve ticket logs with token validation == ==  === */

router.post('/', validateToken, ticketLogController.create);
router.get('/:id', validateToken, ticketLogController.getAllByTicketId);

/* ===  ==  ==  ==  == == == === == == == == == == == ==  ==  ==  ==  === */

// For exporting the router
module.exports = router;