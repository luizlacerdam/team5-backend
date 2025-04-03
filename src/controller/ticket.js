const TicketModel = require('../database/models/ticket');

// Responsible for creating a new ticket
module.exports.create = async (req, res, next) => {
    try {
        const ticket = new TicketModel(req.body);
        await TicketModel.create(ticket);
        return res.status(200).json({ success: true, message: 'Ticket created.' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Responsible for fetching all tickets
module.exports.getAll = async (req, res, next) => {
    try {
        const list = await TicketModel.find().populate('customerId', 'username')
        .sort({ createdAt: -1 });
        return res.status(200).json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Responsible for fetching a ticket by ID
module.exports.getByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ticket = await TicketModel.findById(id).populate('customerId', 'username');
        return res.status(200).json(ticket);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Responsible for updating a ticket by ID
module.exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;

        const ticket = new TicketModel(req.body);
        // eslint-disable-next-line no-underscore-dangle
        ticket._id = id;

        const result = await TicketModel.updateOne({ _id: id }, ticket);

        if (result.modifiedCount > 0) {
            res.status(200).json(
                { success: true, message: 'Ticket updated.' },
            );
        } else {
            throw new Error('Ticket not updated.');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Responsible for deleting a ticket by ID
module.exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await TicketModel.findByIdAndDelete(id);
        if (result) {
            return res.status(200).json(
                { success: true, message: 'Ticket deleted.' },
            );
        } 
        throw new Error('Ticket not deleted.');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getTicketsByCustomerId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const tickets = await TicketModel.find({ customerId: id }).sort({ createdAt: -1 });
      return res.status(200).json(tickets);
    } catch (error) {
        console.log(error);
        next(error);
    }
  };