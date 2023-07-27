# Backend Documentation - NodeJS, MySQL and Sequelize

## Introduction:

Welcome to the backend documentation for the Blog Website! This document provides an overview of the backend APIs and technologies used in the backend of the website.

## Folder Structure:

The backend code is organized in the following folder structure:

```
|-- middleware
| |--auth.middleware.js
|-- models
| |--Blog.js
| |--User.js
|-- routes
| |--blog.route.js
| |--user.route.js
| |--health.route.js
| |--index.js
|-- swagger
│   |-- swagger.json
|-- utils
|-- db.js
|-- config.js
|-- server.js
```

## APIs:

- POST /api/users/register: Register a new user by providing the user's name, email, and password.
- POST /api/users/login: Log in an existing user by providing the user's email and password.
- GET /api/blogs: Get all blogs from the database.
- GET /api/blogs/:id: Get a specific blog by its ID.
- POST /api/blogs: Create a new blog by providing the title, content, and author.
- PUT /api/blogs/:id: Update an existing blog by its ID.
- DELETE /api/blogs/:id: Delete a blog by its ID.

## Technologies Used:

- Node.js: A JavaScript runtime for executing server-side code.
- Express.js: A web application framework for building APIs in Node.js.
- MySQL: A relational database management system used to store and manage the application's data.
- Sequelize: An ORM (Object-Relational Mapping) for Node.js that provides a higher-level abstraction over database operations.

## Middleware:

- authMiddleware: A middleware that validates the JWT token for protected routes.

## Models:

- User: A Sequelize model for storing user information, including name, email, and password.
- Blog: A Sequelize model for storing blog information, including title, content, and author.

## Configuration:

- database: A configuration file that establishes the database connection using Sequelize.

## Endpoints:

- POST /api/signup
  1. Description: Register a new user.
  2. Request Body: { "name": "Vasanth", "email": "vasanth@example.com", "password": "password" }
  3. Response: { "message": "Signup successfully!" }
- POST /api/login
  1. Description: Log in an existing user.
  2. Request Body: { "email": "vasanth@example.com", "password": "password" }
  3. Response: { "token": "token" }
- GET /api/blog/show
  1.  Description: Get all blogs.
  2.  Response: [{"id": 1, "title": "Blog Title", "content": "Blog content goes here", "author": "Vasanth", "createdAt": "2023-07-26T12:34:56Z", "updatedAt": "2023-07-26T12:34:56Z"}]
- GET /api/blog/show/:blogId
  1.  Description: Get a specific blog by its ID.
  2.  Response: {"id": 1, "title": "Blog Title", "content": "Blog content goes here", "author": "Vasanth", "createdAt": "2023-07-26T12:34:56Z", "updatedAt": "2023-07-26T12:34:56Z"}
- POST /api/blog
  1.  Description: Create a new blog.
  2.  Request Body: { "title": "New Blog", "content": "Blog content goes here", "author": "Vasanth" }
  3.  Response: { "message": "Blog created successfully!" }
- PUT /api/blog/:blogId
  1.  Description: Update an existing blog by its ID.
  2.  Request Body: { "title": "Updated Blog", "content": "Updated blog content goes here" }
  3.  Response: { "message": "Blog updated successfully!" }
- DELETE /api/blog/:blogId
  1.  Description: Delete a blog by its ID.
  2.  Response: { "message": "Blog deleted successfully!" }

### To know more about my blog website, check out the [Documentation](https://docs.google.com/document/d/1D8jLm-6SNM7zjZY-cidjUFZTRMut8NZpJc0ChL5BcMU/edit).
