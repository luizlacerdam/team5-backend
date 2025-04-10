/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const TicketModel = require('../../database/models/ticket');
const ticketController = require('../../controller/ticket');

describe('Ticket Controller', function () {
  let req; let res; let 
next;

  beforeEach(function () {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    sinon.stub(console, 'log');
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('create', function () {
    it('should create a new ticket', async function () {
      req.body = { subject: 'Test ticket' };
      sinon.stub(TicketModel, 'create').resolves();

      await ticketController.create(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ success: true, message: 'Ticket created.' })).to.be.true;
    });

    it('should handle errors during creation', async function () {
      const error = new Error('Create error');
      req.body = { subject: 'fail' };
      sinon.stub(TicketModel, 'create').throws(error);

      await ticketController.create(req, res, next);
      expect(next.calledWith(error)).to.be.true;
    });
  });

  describe('getAll', function () {
    it('should return all tickets', async function () {
      const tickets = [{ subject: 'Test' }];
      sinon.stub(TicketModel, 'find').returns({
        populate: sinon.stub().returnsThis(),
        sort: sinon.stub().resolves(tickets),
      });

      await ticketController.getAll(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(tickets)).to.be.true;
    });

    it('should handle errors during getAll', async function () {
      const error = new Error('DB Error');
      sinon.stub(TicketModel, 'find').throws(error);

      await ticketController.getAll(req, res, next);
      expect(next.calledWith(error)).to.be.true;
    });
  });

  describe('getByID', function () {
    it('should return ticket by ID', async function () {
      req.params = { id: '123' };
      const ticket = { subject: 'Test Ticket' };
      sinon.stub(TicketModel, 'findById').returns({
        populate: sinon.stub().resolves(ticket),
      });

      await ticketController.getByID(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(ticket)).to.be.true;
    });

    it('should handle errors during getByID', async function () {
      req.params = { id: '123' };
      const error = new Error('getByID error');
      sinon.stub(TicketModel, 'findById').throws(error);

      await ticketController.getByID(req, res, next);
      expect(next.calledWith(error)).to.be.true;
    });
  });

  describe('update', function () {
    it('should update a ticket and respond with success', async function () {
      req.params = { id: '123' };
      req.body = { subject: 'Updated Ticket' };
      sinon.stub(TicketModel, 'updateOne').resolves({ modifiedCount: 1 });

      await ticketController.update(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ success: true, message: 'Ticket updated.' })).to.be.true;
    });

    it('should throw if ticket not updated', async function () {
      req.params = { id: '123' };
      req.body = { subject: 'No Change' };
      sinon.stub(TicketModel, 'updateOne').resolves({ modifiedCount: 0 });

      await ticketController.update(req, res, next);
      expect(next.called).to.be.true;
      expect(next.args[0][0].message).to.equal('Ticket not updated.');
    });
  });

  describe('delete', function () {
    it('should delete a ticket and return success', async function () {
      req.params = { id: '123' };
      sinon.stub(TicketModel, 'findByIdAndDelete').resolves({ _id: '123' });

      await ticketController.delete(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ success: true, message: 'Ticket deleted.' })).to.be.true;
    });

    it('should handle ticket not deleted', async function () {
      req.params = { id: '123' };
      sinon.stub(TicketModel, 'findByIdAndDelete').resolves(null);

      await ticketController.delete(req, res, next);
      expect(next.called).to.be.true;
      expect(next.args[0][0].message).to.equal('Ticket not deleted.');
    });
  });

  describe('getTicketsByCustomerId', function () {
    it('should return tickets for a specific customer', async function () {
      req.params = { id: 'cust123' };
      const tickets = [{ subject: 'Cust Ticket' }];
      sinon.stub(TicketModel, 'find').returns({
        sort: sinon.stub().resolves(tickets),
      });

      await ticketController.getTicketsByCustomerId(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(tickets)).to.be.true;
    });

    it('should handle errors in getTicketsByCustomerId', async function () {
      req.params = { id: 'cust123' };
      const error = new Error('Error fetching tickets');
      sinon.stub(TicketModel, 'find').throws(error);

      await ticketController.getTicketsByCustomerId(req, res, next);
      expect(next.calledWith(error)).to.be.true;
    });
  });
});
