# WTWR (What to Wear?): Back End

This project is the back-end server for the WTWR (What to Wear?) application. It provides a RESTful API for managing users and clothing items, enabling users to register, log in, and manage their virtual wardrobe. The server handles authentication, authorization, data validation, and error handling, and connects to a MongoDB database for persistent storage.

## Functionality

- User registration and authentication
- CRUD operations for clothing items (create, read, delete)
- Like/dislike functionality for clothing items
- Input validation and error handling
- Middleware for user authorization and request processing

## Technologies & Techniques Used

- **Node.js** and **Express.js** for building the server and API endpoints
- **MongoDB** with **Mongoose** for database modeling and interaction
- **ESLint** and **Prettier** for code quality and formatting
- **Validator** library for input validation (e.g., URLs)
- **Middleware** for authentication, error handling, and request preprocessing
- **Environment variables** for configuration (e.g., port, database URI)
- **RESTful API design** principles
- **Nodemon** for development with hot reload

## Links

- [Live Backend API](https://api.wtwr.homeonthewater.com)
- [Frontend Application](https://wtwr.homeonthewater.com)
- [Frontend Repository](https://github.com/Chris2Fair88/se_project_react)

## Running the Project

`npm run start` — to launch the server
`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
