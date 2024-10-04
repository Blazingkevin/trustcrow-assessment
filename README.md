# Category Management API - TrustCrow Test

A **Category Management REST API** that allows administrators to manage event categories in a tree structure, where each category can have an unlimited number of subcategories. The API supports creating, deleting, moving, and fetching categories.

The API is built using **TypeScript**, **TypeORM**, **PostgreSQL**, **Express.js**, and includes API documentation via **Swagger**. Tests are written using **Jest** and **Supertest**.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)

---

## Features

- **Add a Category**: Create a new category with or without a parent category.
- **Delete a Category**: Delete a category
- **Move a Subtree**: Move a category and its descendants to another parent category.
- **Fetch a Subtree**: Fetch all subcategories of a given category.
- **Error Handling**: Custom error handling with detailed responses.
- **Swagger Documentation**: Automatically generated API documentation.

---

## Requirements

Ensure you have the following installed:

- **Node.js**: `>=18.0.0`
- **PostgreSQL**: `>=12.0.0`
- **npm**: `>=10.0.0`

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/trustcrow-assessment.git
cd trustcrow-assessment
```

### 2. Install Dependencies

Install the project dependencies using npm or yarn:

```bash
npm install
```

or

```bash
yarn install
```

### 3. Set Up PostgreSQL Database

Create a PostgreSQL database for your project. For instance, you can create a database named `trustcrowdb`(for the main application) and `trustcrowdbtest`(for test).

```sql
CREATE DATABASE trustcrowdb;
CREATE DATABASE trustcrowdbtest;
```

Make sure to configure the database credentials in the `.env` file (see below).

### 4. Configure Environment Variables

Create a `.env` and a `.env.test` file in the root of the project with the following environment variables:

```bash
# .env file

PORT=3000
DB_USER=trustcrowuser
DB_PASSWORD=trustcrowpass
DB_HOST=localhost
DB_PORT=5432
DB_NAME=trustcrowdb
NODE_ENV=development

# .env.test file

PORT=3000
DB_USER=trustcrowuser
DB_PASSWORD=trustcrowpass
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=test
DB_NAME_TEST=trustcrowdbtest
```

### 5. Run Database Migrations

To set up the database schema(locally), run the TypeORM migrations:

```bash
npm run migration:run
```

This will create the necessary tables in your PostgreSQL database.

---

## API Documentation (Swagger)

This API includes Swagger documentation for all endpoints. After running the application, you can access the documentation by visiting:

```
http://localhost:3000/api-docs
```

The Swagger UI will display all available routes and allow you to test them directly from the browser.

---

## Running the Application

You can run the application in development mode using the following command:

```bash
npm run dev
```

This will start the application on the port specified in the `.env` file (default is `3000`).

You should see output like:

```
TrustCrow Server is running on port 3000
```

---

## Running Tests

The project uses **Jest** for unit testing. All tests are located in the `src/tests` directory. To run the tests, use:

```bash
npm run test
```

This will run all test cases and provide output in the terminal.

### Running Tests in Watch Mode

To run tests in watch mode, which reruns tests when you make changes:

```bash
npm run test:watch
```

---

## Test Coverage

To check the test coverage, run:

```bash
npm run test:coverage
```

This will generate a coverage report and display it in the terminal. The detailed HTML report will be available in the `coverage/` directory. You can open it in your browser:

```
coverage/lcov-report/index.html
```

---

## Error Handling

This API includes custom error handling to provide clear and meaningful error messages. Errors from the service layer are thrown as custom exceptions (`NotFoundError`, `BadRequestError`, etc.), and the controller layer handles these errors accordingly, returning appropriate HTTP status codes (`404`, `400`, etc.).

- **404 Not Found**: If a category or parent category is not found, the API responds with a 404 error.
- **400 Bad Request**: If the request parameters are invalid (e.g., missing required fields), the API responds with a 400 error.
- **500 Internal Server Error**: Any other uncaught errors will result in a 500 error.

The error responses follow this format:

```json
{
  "message": "Error message here"
}
```

### Centralized Error Handling Middleware

All uncaught errors are caught by a centralized error handler that provides a standardized error response and logs the error stack.

---

## Project Structure

Here’s a brief overview of the project's directory structure:

```
category-management-api/
├── src/
│   ├── config/              # Database and Swagger configuration
│   ├── controllers/         # Route controllers
│   ├── dtos/                # Data Transfer Objects (DTOs) for validation
│   ├── entities/            # TypeORM entities (database models)
│   ├── errors/              # Custom error classes
│   ├── middlewares/         # Error handling and validation middlewares
│   ├── routes/              # API route definitions
│   ├── services/            # Business logic (services)
│   ├── tests/               # Unit tests
│   ├── app.ts               # Application setup
│   └── server.ts            # Server startup
├── migrations/              # TypeORM migrations
├── .env                     # Environment variables for `development`
├── .env.test                # Environment variables for `test`
├── package.json             # Project dependencies and scripts
├── jest.config.js           # Jest configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

### Key Files:

- **`src/entities/category.entity.ts`**: Defines the Category entity model using TypeORM.
- **`src/services/category.service.ts`**: Contains business logic for category operations like creating, moving, and deleting categories.
- **`src/controllers/category.controller.ts`**: Handles incoming HTTP requests and responses for the Category API.
- **`src/middlewares/errorHandler.ts`**: Global error handler for catching and responding to errors in a standardized format.
- **`src/tests`**: Contains Jest tests for the API.

---

## Available API Endpoints

- **POST /categories**: Create a new category.
- **DELETE /categories/:id**: Delete a category and its subtree.
- **GET /categories/:id/subtree**: Fetch all subcategories under a specific category.
- **PUT /categories/:id/move**: Move a category to a new parent.

Refer to the [Swagger Documentation](#api-documentation-swagger) for detailed request/response formats.
