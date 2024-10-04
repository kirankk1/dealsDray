# DealsDray

**DealsDray** is a MERN stack web platform designed for admin use, allowing seamless management of employee data. The platform supports full CRUD (Create, Read, Update, Delete) operations, providing a streamlined user experience for maintaining employee details.

## Features

- **Authentication**: Sign-in is mandatory for accessing the platform.
- **Employee Management**: Admins can add, view, update, and delete employee information.
- **Secure Passwords**: Passwords are hashed for secure storage.
- **Image Storage**: Employee images are stored securely using Firebase.

## Tech Stack

### Frontend:
- **React**: Modern JavaScript framework for building interactive user interfaces.
- **Flowbite CSS**: Pre-built components for responsive design.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Backend:
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB (Mongoose)**: NoSQL database for storing employee data.
- **JSON Web Tokens (JWT)**: Secure authentication for user sessions.
- **Firebase**: Used for image uploads and storage.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/kirankk1/dealsDray.git
   cd dealsDray
Install dependencies for both the client and backend:

bash
 
    cd frontend
    npm install
    cd ../api
    npm install
Set up environment variables:

MongoDB connection string
Firebase credentials
JWT secret key
Run the application:

bash
 
# Run backend
    cd api
    nodemon index.js

# Run frontend
    cd ../fronted
    npm run dev
Usage
Sign In: Access the platform by signing in with valid credentials.
Manage Employees: Admins can create, edit, delete, and view employee profiles.
Security
Password Hashing: Passwords are encrypted using hashing algorithms to ensure security.
JWT Authentication: JSON Web Tokens are used to verify user identity and maintain session security.
Contribution
Feel free to contribute by forking this repository and submitting a pull request. Ensure to follow best practices and maintain clean, readable code.

License
This project is licensed under the MIT License. See the LICENSE file for more details.



You can tweak the specifics like environment variable names, setup instructions, or add any additional details if needed!
