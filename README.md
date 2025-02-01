# WhatsApp-like Chat Application

## Overview

This is a real-time chat application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. It allows users to chat with others in real time using **Socket.io**, manage their profile, add users to their favorites, and check online statuses. The UI is designed with **Tailwind CSS** and **Daisy UI** for a clean and modern experience, while **Zustand** is used for efficient state management.

## Live Demo Link

-   https://mern-chat-app-d0l0.onrender.com

## Features

-   **Real-time messaging** powered by **Socket.io**
-   **User authentication** (signup, login, logout)
-   **One-on-one private chats**
-   **Online status indicators**
-   **Add users to favorites list**
-   **Update profile picture** (Cloudinary integration)
-   **Delete chats**
-   **Fully responsive UI** with **Tailwind CSS & Daisy UI**
-   **Dark/Light Theme**

## Tech Stack

### Frontend:

-   React.js
-   Zustand (State Management)
-   Tailwind CSS & Daisy UI (Styling)

### Backend:

-   Node.js
-   Express.js
-   MongoDB (Database)
-   Socket.io (Real-time communication)

### Other Integrations:

-   Cloudinary (For profile picture uploads)
-   JWT (Authentication)

## Installation & Setup

### Prerequisites

Ensure you have **Node.js** and **MongoDB** installed on your machine.

### Steps to Run Locally

1. **Clone the Repository**
    ```sh
    git clone https://github.com/gorkeem/mern-chat-app.git
    cd mern-chat-app
    ```
2. **Install Dependencies**
    ```sh
    npm install
    ```
3. **Set Up Environment Variables**
   Create a `.env` file in the backend directory and add the following:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```
4. **Start the Backend Server**
    ```sh
    cd backend/
    npm run dev
    ```
5. **Start the Frontend**
    ```sh
    cd frontend/
    npm run dev
    ```
6. **Build for Production**
    ```sh
    npm run build
    ```

## Future Enhancements

-   Group chat feature
-   Message reactions
-   Voice & video calling
-   Push notifications

## Screenshots

-   Login Page
    ![Login%20Page](screenshots/Screenshot%201.png?raw=true "Login Page")
-   Signup Page
    ![Signup%20Page](screenshots/Screenshot%202.png?raw=true "Signup Page")
-   Home Page
    ![Home%20Page](screenshots/Screenshot%203.png?raw=true "Home Page")
-   Sample Chat and Favorite Users List
    ![Sample%20Chat%20and%20Favorite%20Users%20List](screenshots/Screenshot%204.png?raw=true "Sample Chat and Favorite Users List")
-   Profile Page
    ![Profile%20Page](screenshots/Screenshot%205.png?raw=true "Profile Page")
-   Dark Theme and Online Users
    ![Dark%20Theme%20and%20Online%20Users](screenshots/Screenshot%206.png?raw=true "Dark Theme and Online Users")
-   Sending Image with Text
    ![Sending%20Image%20with%20Text](screenshots/Screenshot%207.png?raw=true "Sending Image with Text")
-   Sample Chat
    ![Sample%20Chat](screenshots/Screenshot%208.png?raw=true "Sample Chat")
