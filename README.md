# 24F Group Project Backend - Merge Conflict Mafia

Welcome to the **Merge Conflict Mafia Backend**! This project is built using **Node.js** and **Express**, providing a RESTful API for user and ticket management. Below you will find all the instructions to clone, install, and run the project, as well as the available API routes.

---

## Table of Contents

1. [Clone and Install Instructions](#clone-and-install-instructions)
2. [Running the Project](#running-the-project)
3. [API Documentation](#api-documentation)
   - [Users Routes](#users-routes)
   - [Tickets Routes](#tickets-routes)
4. [Live Version](#live-version)

---

## Clone and Install Instructions

### Clone the Repository

To clone the repository, use the following command:

```bash
git clone git@github.com:luizlacerdam/24F-GroupProject-Backend.git
```

### Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd 24F-GroupProject-Backend
npm install
```

Ensure that the file `jwt.evaluation.key` is placed in the root directory of the project. This file must have this exact name.

---

## Running the Project

### Start the Server

Run the following command to start the server:

```bash
npm start
```

The server will run at `http://localhost:3000` (or your specified port).

---

## API Documentation

### Base URL

- **Local**: `http://localhost:3000`
- **Live**: [https://two4f-groupproject-backend.onrender.com/](https://two4f-groupproject-backend.onrender.com/)

### Users Routes

| Method | Endpoint       | Description       | Authentication Required |
| ------ | -------------- | ----------------- | ----------------------- |
| POST   | `/users/login` | User login        | No                      |
| GET    | `/users/:id`   | Get user by ID    | Yes                     |
| PUT    | `/users/:id`   | Update user by ID | Yes                     |
| DELETE | `/users/:id`   | Delete user by ID | Yes                     |
| GET    | `/users`       | Get all users     | Yes                     |
| POST   | `/users`       | Create a new user | No                      |

### Tickets Routes

| Method | Endpoint       | Description         | Authentication Required |
| ------ | -------------- | ------------------- | ----------------------- |
| GET    | `/tickets/:id` | Get ticket by ID    | Yes                     |
| PUT    | `/tickets/:id` | Update ticket by ID | Yes                     |
| DELETE | `/tickets/:id` | Delete ticket by ID | Yes                     |
| POST   | `/tickets`     | Create a new ticket | Yes                     |
| GET    | `/tickets`     | Get all tickets     | Yes                     |

---

## Live Version

You can access the live version of this project at:
[https://two4f-groupproject-backend.onrender.com/](https://two4f-groupproject-backend.onrender.com/)

---
