// For importing mongoose for schema creation:
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Responsible for defining the TicketLog schema to track ticket updates:
const TicketLog = new Schema(
    {
        customerId: { type: Schema.Types.ObjectId, ref: 'User' },
        ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket' },
        status: String,
        comment: String,
    }, 

    { 
        timestamps: true, 
    },
    );

// For Exporting the TicketLog model:
module.exports = mongoose.model('TicketLog', TicketLog);