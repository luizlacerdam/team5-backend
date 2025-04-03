// For importing the TicketLog model from the database models:
const TicketLogModel = require('../database/models/ticketLog');

// Responsible for creating a new ticket log and saving it to the database:
module.exports.create = async (req, res, next) => {
    try {
        const ticketLog = new TicketLogModel(req.body);
        await TicketLogModel.create(ticketLog);
        return res.status(200).json({ success: true, message: 'Ticket log created.' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Responsible for retrieving all ticket logs by ticket ID and returning them:
module.exports.getAllByTicketId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ticketLogs = await TicketLogModel.find({ ticketId: id }).sort({ createdAt: -1 })
        .populate('customerId', 'username');
        return res.status(200).json(ticketLogs);
    } catch (error) {
        console.log(error);
        next(error);
    }
};