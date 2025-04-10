/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
const chai = require('chai');
const sinon = require('sinon');
// const sinonMongoose = require('sinon-mongoose');

const { expect } = chai;

const UserModel = require('../../database/models/user');
const userController = require('../../controller/user');

describe('User Controller', function () {
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

    describe('getAll', function () {
        it('should return a list of users excluding passwords', async function () {
            const users = [{ name: 'John' }];
            sinon.stub(UserModel, 'find').returns({
                select: sinon.stub().resolves(users),
            });

            await userController.getAll(req, res, next);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(users)).to.be.true;
        });

        it('should handle errors', async function () {
            const error = new Error('DB Error');
            sinon.stub(UserModel, 'find').throws(error);

            await userController.getAll(req, res, next);
            expect(next.calledWith(error)).to.be.true;
        });
    });

    describe('getById', function () {
        it('should return a user by ID excluding password', async function () {
            req.params = { id: '123' };
            const user = { name: 'John' };
            sinon.stub(UserModel, 'findById').returns({
                select: sinon.stub().resolves(user),
            });

            await userController.getById(req, res, next);
            expect(res.json.calledWith(user)).to.be.true;
        });

        it('should return 404 if user not found', async function () {
            req.params = { id: '123' };
            sinon.stub(UserModel, 'findById').returns({
                select: sinon.stub().resolves(null),
            });

            await userController.getById(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'User not found' })).to.be.true;
        });
    });

    describe('create', function () {
        it('should create a new user and return it without password', async function () {
            req.body = {
                username: 'johnny',
                name: 'Johnny',
                email: 'john@example.com',
                role: 'user',
                password: 'pass123',
            };
            sinon.stub(UserModel, 'findOne').resolves(null);
            const userObj = {
                toObject: () => ({ ...req.body, password: undefined }),
            };
            sinon.stub(UserModel, 'create').resolves(userObj);

            await userController.create(req, res, next);
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.called).to.be.true;
        });

        it('should return 409 if email already exists', async function () {
            req.body = { email: 'exists@example.com' };
            sinon.stub(UserModel, 'findOne').resolves({ email: 'exists@example.com' });

            await userController.create(req, res, next);
            expect(res.status.calledWith(409)).to.be.true;
            expect(res.json.calledWithMatch({ message: 'User with this email already exists.' })).to.be.true;
        });
    });

    describe('update', function () {
        it('should update a user and return it without password', async function () {
            req.params = { id: '123' };
            req.body = { name: 'Updated' };
            const updatedUser = {
                password: 'somepass',
                toObject: () => ({ name: 'Updated', password: 'somepass' }),
            };
            sinon.stub(UserModel, 'findByIdAndUpdate').resolves(updatedUser);
        
            await userController.update(req, res, next);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ name: 'Updated' })).to.be.true;
        });

        it('should return 404 if user to update does not exist', async function () {
            req.params = { id: '123' };
            req.body = { name: 'Updated' };
            sinon.stub(UserModel, 'findByIdAndUpdate').resolves(null);

            await userController.update(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'User not found' })).to.be.true;
        });
    });

    describe('delete', function () {
        it('should delete a user and return success message', async function () {
            req.params = { id: '123' };
            sinon.stub(UserModel, 'findByIdAndDelete').resolves({});

            await userController.delete(req, res, next);
            expect(res.json.calledWith({ message: 'User deleted successfully.' })).to.be.true;
        });

        it('should return 404 if user not found', async function () {
            req.params = { id: '123' };
            sinon.stub(UserModel, 'findByIdAndDelete').resolves(null);

            await userController.delete(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'User not found' })).to.be.true;
        });
    });

    describe('getAllTicketsByUserId', function () {
        it('should return tickets for user', async function () {
            req.params = { id: '123' };
            const user = { tickets: ['ticket1', 'ticket2'] };
            sinon.stub(UserModel, 'findById').returns({ populate: sinon.stub().resolves(user) });

            await userController.getAllTicketsByUserId(req, res, next);
            expect(res.json.calledWith(user.tickets)).to.be.true;
        });

        it('should return 404 if user not found', async function () {
            req.params = { id: '123' };
            sinon.stub(UserModel, 'findById').returns({ populate: sinon.stub().resolves(null) });

            await userController.getAllTicketsByUserId(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: 'User not found' })).to.be.true;
        });
    });
});
