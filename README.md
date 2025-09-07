## Campjam API 💡: Backend for Learning Management System

This is the backend for the Campjam application, a robust RESTful API built to power a comprehensive learning management system (LMS). It handles all data management, user authentication, and business logic for the platform.

### ✨ Features

The Campjam API provides a secure and efficient foundation for the LMS with the following key features:

- **User Authentication & Authorization**:
  - Secure user registration and login are implemented using **Passport** and **Bcrypt** for password hashing.
  - A **role-based access control (RBAC)** system using a `UserRole` enum ensures that access to resources is based on user roles (Admin, Instructor, Student).
  - **Custom decorators and guards** restrict data access to the resource owner, providing strong security.
  - An **API throttler** is in place to protect the server from misuse and excessive requests.

- **Data Management (CRUD)**:
  - The API offers full **Create, Read, Update, and Delete (CRUD)** functionality for managing courses, course content, user profiles, and submissions.
  - Data is stored in a **PostgreSQL** database.
  - **Prisma ORM** simplifies schema management and database interactions, ensuring a reliable and type-safe data layer.

- **System Architecture**:
  - The application follows a **clean architecture** with a clear separation of concerns, organized into distinct layers (Controller, Service, Repository).
  - A **response transformer interceptor** ensures all successful API responses have a consistent format and automatically excludes sensitive information like passwords.

---

### 💻 Tech Stack

- **Framework**: **NestJS**
- **Database**: **PostgreSQL**
- **ORM**: **Prisma**
- **Authentication**: **Passport.js**, **Bcrypt**

---

### ⚙️ Installation and Usage

To set up the Campjam backend locally, follow these steps:

Follow these steps to get the Revobank Backend up and running on your local machine.

### 1\. Clone the Repository

```bash
git clone https://github.com/revou-fsse-feb25/final-project-be-rizaldi-r.git
cd final-project-be-rizaldi-r

```

### 2\. Environment Variables

Create a `.env` file in the root of the project based on the `.env.example` file.

```
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/campjam"

JWT_SECRET="" # Use a strong, unique key
JWT_REFRESH_SECRET=""

JWT_EXPIRATION_ACCESS="15m" # e.g., 1h, 7d, 30m
JWT_EXPIRATION_REFRESH="7d"

```

**Important:**

  \* Replace `user`, `password`, and `campjam` with your PostgreSQL credentials and desired database name.
  \* Generate a strong `JWT_SECRET` for production environments.

### 3\. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install

```

### 4\. Run Prisma Migrations

Apply the database schema and generate the Prisma client:

```bash
npx prisma migrate dev --name init # Use 'init' or a descriptive name for your first migration
npx prisma generate

```

If you make changes to your Prisma schema (`prisma/schema.prisma`), remember to run `npx prisma migrate dev` again to update your database.

<p align="right">(<a href="#about">back to top</a>)</p>

### 5\. Start the Application

```bash
npm run start:dev
# or
yarn start:dev
# or
pnpm run start:dev

```
----

### 🚀 Deployment

- **Frontend:** 🔗 **[https://final-project-fe-rizaldi-r.vercel.app/](https://final-project-fe-rizaldi-r.vercel.app/)**
- **Backend:** 🔗 **https://final-project-be-rizaldi-r-production.up.railway.app/**

---

## API Endpoints

All backend API endpoints are documented in detail on Postman. You can explore the full API specification, including request examples, response formats, and status codes for each endpoint by clicking the link below.

🔗 **[View API Documentation on Postman](https://documenter.getpostman.com/view/46212129/2sB3BLj84D)**

---

## 📊 Database Diagram

The database schema, built using PostgreSQL and Prisma ORM, can be viewed in the diagram below. This visual representation details all tables, their fields, relationships, and data types.

🔗 **[View Database Diagram](https://dbdiagram.io/d/6894ac98dd90d17865ece245)**

## 🤝 Contributor

[@rizaldi-r](https://github.com/rizaldi-r)