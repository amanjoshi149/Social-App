# Social-App

This is a MERN stack-based project consisting of a server-side API built with Node.js and Express, and a React application. The project allows users to create an account, login, create posts with or without images, like other users' posts, connect with other users by following/unfollowing them, view user profiles, and includes a timeline feature displaying user and friends' posts.

##Folder Structure
#####API: Contains the server-side code built with Node.js and Express. It includes APIs for performing CRUD operations on users and posts.
#####App: Contains the React application.

##Prerequisites
Make sure you have the following dependencies installed:

######1. Node.js
######2. MongoDB

##1.Getting Started
Clone the repository:
    *git clone <repository_url>*

##2.Install the dependencies:
    *# Navigate to the API folder*
    *cd API*
    *npm install*
    *# Navigate to the App folder*
    *cd ../App*
    *npm install*

##3.Start the Server :
    *# Navigate to the API folder*
    *cd API*
    *npm start*

##4.Start the React Application
    *# Navigate to the App folder*
    *cd App*
    *npm start*

 
###Backend Packages
* bcrypt: A library for hashing passwords to enhance security.
* cors: Middleware that allows cross-origin resource sharing.
* dotenv: Loads environment variables from a .env file.
* express: A fast and minimalist web framework for Node.js.
* helmet: Helps secure Express applications by setting various HTTP headers.
* mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
* morgan: HTTP request logger middleware for Node.js.
* multer: Middleware for handling multipart/form-data, primarily used for file uploads.
* path: Provides utilities for working with file and directory paths.


###Frontend Packages
* material-ui: A popular UI component library for React applications.
* axios: A promise-based HTTP client for making API requests.
* react-router-dom: Routing library for React applications.
* timeago.js: A library for formatting dates and times in a user-friendly relative format.


Feel free to explore the code and customize it according to your requirements. Happy coding!
