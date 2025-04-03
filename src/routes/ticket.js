const express = require('express');

const router = express.Router();

const ticketController = require('../controller/ticket');
const { validateToken } = require('../middlewares/validateToken');

router.get('/user/:id', validateToken, ticketController.getTicketsByCustomerId);
router.get('/:id', validateToken, ticketController.getByID);
router.patch('/:id', validateToken, ticketController.update);
router.delete('/:id', validateToken, ticketController.delete);
router.post('/', validateToken, ticketController.create);
router.get('/', validateToken, ticketController.getAll);

module.exports = router;