# Event Management System

This is a mean-stack Event Management application with the front end built in Angular and the back end developed in NestJS. The system allows users to create, view, update, and delete events, manage attendees, and handle RSVP functionalities.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Installation](#installation)
5. [Frontend Setup (Angular)](#frontend-setup-angular)
6. [Backend Setup (NestJS)](#backend-setup-nestjs)
7. [Environment Variables](#environment-variables)
8. [Running the Application](#running-the-application)
9. [API Documentation](#api-documentation)
10. [License](#license)

## Project Overview

The Event Management System allows users to manage events efficiently. The application provides features for event creation, attendee management, and RSVP tracking. This system is designed to be scalable and user-friendly with a clean UI and a robust back end.

## Tech Stack

- **Frontend**: Angular
- **Backend**: NestJS
- **Database**: MongoDB
- **Other Tools**: RxJS, Mongoose, Angular Material, Bootstrap

## Features

- **Event Management**: Create, update, delete, and view events.
- **User Authentication**: Register, login.
- **RSVP System**: Attendees can RSVP to events.
- **Attendee Management**: View and manage the list of attendees for each event.
- **Responsive UI**: Built with Angular Material for a modern and responsive design.

## Installation

## Frontend Setup (Angular)

1. **Navigate to the Frontend Directory:**

   ```bash
   cd Frontend_Angular
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Configuration:**

   Create a `.env` file in the `frontend` directory with the following variables:

   ```plaintext
   apiEndpoint=http://localhost:3000/api
   ```

4. **Run the Application:**

   ```bash
   ng serve
   ```

   The application will run on `http://localhost:4200`.

## Backend Setup (NestJS)

1. **Navigate to the Backend Directory:**

   ```bash
   cd Backend_Angular
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Configuration:**

   Create a `.env` file in the `backend` directory with the following variables:

   ```plaintext
   PORT=3000
   DATABASE_URI=mongodb://localhost:27017/event-management
   JWT_SECRET=your_secret_key
   ```

4. **Run the Application:**

   ```bash
   npm run start:dev
   ```

   The backend API will run on `http://localhost:3000`.

## Environment Variables

Ensure you set up your `.env` files in `backend` directories. Refer to the setup steps above for the specific variables needed for each environment.

## Running the Application

1. **Frontend**: Run `ng serve` from the `frontend` directory.
2. **Backend**: Run `npm run start:dev` from the `backend` directory.

Open your browser and navigate to `http://localhost:4200` to start using the application.

## API Documentation

API documentation is available using Swagger in the NestJS backend. To view the documentation, navigate to:

```
http://localhost:3000/api
```

This page provides detailed information on all API endpoints, request bodies, and response formats.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
