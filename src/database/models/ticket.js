const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * TicketSchema defines the structure of the ticket document in the database.
 * 
 * @typedef {Object} TicketSchema
 * @property {String} customerId - The ID of the customer associated with the ticket.
 * @property {String} status - The current status of the ticket (e.g., open, closed, pending).
 * @property {String} description - A detailed description of the ticket issue or request.
 * @property {String} priority - The priority level of the ticket (e.g., low, medium, high).
 * @property {Date} createdAt - The date and time when the ticket was created. (Automatically managed by Mongoose)
 * @property {Date} updatedAt - The date and time when the ticket was last updated. (Automatically managed by Mongoose)
 */
const TicketSchema = new Schema(
{
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    recordNumber: String,
    cellphone: String,
    status: String,
    description: String,
    priority: String,
}, 
{ 
    timestamps: true, 
},
);

module.exports = mongoose.model('Ticket', TicketSchema);