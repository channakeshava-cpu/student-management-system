# Student Management System

A full-stack Student Management System built with **Spring Boot, Spring Security, JWT, MySQL, React, and Vite**.

The application provides secure authentication, role-based authorization, student CRUD operations, search and filtering, academic analytics, data export, and interactive REST API documentation using Swagger/OpenAPI.

---

## 📌 Project Overview

The Student Management System is a full-stack web application designed to manage student records through a secure and responsive dashboard.

The project demonstrates practical implementation of:

- REST API development
- Spring Boot backend architecture
- Spring Data JPA
- MySQL database integration
- JWT-based authentication
- Role-based authorization
- React frontend development
- Axios API integration
- CRUD operations
- Form validation
- Search, filtering, and sorting
- Dashboard analytics
- Excel and PDF export
- Swagger/OpenAPI documentation
- Frontend and backend separation
- Production-oriented project structure

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Secure password handling
- Token-based authorization
- Automatic handling of expired/unauthorized sessions
- Protected backend endpoints

### 👥 Role-Based Authorization

The application supports two roles:

- `ADMIN`
- `USER`

### ADMIN

Administrators can:

- View students
- Add students
- Edit students
- Delete students
- Search students
- Filter students
- Sort students
- View dashboard statistics
- Export student data

### USER

Regular users can:

- View students
- Search students
- Filter students
- Sort students
- View dashboard statistics

Student modification operations are restricted to administrators.

---

## 📊 Dashboard

The dashboard provides an overview of student information, including:

- Total students
- Number of departments
- Average CGPA
- Highest CGPA
- Top department
- Student records
- Search
- Department filtering
- Sorting
- Data export

---

## 🔄 Student Management

The application supports complete CRUD operations.

### Create

Administrators can create student records containing:

- Name
- Email
- Phone
- Department
- CGPA

### Read

Authenticated users can view student records.

### Update

Administrators can update existing student information.

### Delete

Administrators can delete student records.

---

## 🔎 Search, Filtering & Sorting

The application provides:

- Student name search
- Department filtering
- Alphabetical sorting
- Pagination

---

## 📤 Data Export

Administrators can export student information in:

- Excel
- PDF

---

# 🛠️ Tech Stack

## Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- MySQL
- Maven
- Lombok
- Bean Validation
- Swagger / OpenAPI
- SLF4J Logging

## Frontend

- React
- Vite
- JavaScript
- Axios
- React Toastify
- CSS

## Development Tools

- IntelliJ IDEA
- Visual Studio Code
- Git
- GitHub
- MySQL
- Swagger UI

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       React         │
                    │      Frontend       │
                    │       Vite          │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               │ Axios
                               ▼
                    ┌─────────────────────┐
                    │    Spring Boot      │
                    │      Backend        │
                    ├─────────────────────┤
                    │ REST Controllers    │
                    │ Service Layer       │
                    │ Repository Layer    │
                    │ Spring Security     │
                    │ JWT Authentication  │
                    └──────────┬──────────┘
                               │
                               │ JPA / Hibernate
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │      Database       │
                    └─────────────────────┘
🔐 Authentication Flow
User
 │
 ▼
Login
 │
 ▼
Spring Security
 │
 ▼
Credentials Validation
 │
 ▼
JWT Token Generated
 │
 ▼
Frontend stores token
 │
 ▼
Axios sends:
Authorization: Bearer <token>
 │
 ▼
JWT Authentication Filter
 │
 ▼
Spring Security
 │
 ▼
Protected REST API

```
👥 Role Permissions
Feature	USER	ADMIN
Register	✅	✅
Login	✅	✅
View Students	✅	✅
Search Students	✅	✅
Filter Students	✅	✅
Sort Students	✅	✅
View Analytics	✅	✅
Add Student	❌	✅
Edit Student	❌	✅
Delete Student	❌	✅
Export Data	❌	✅
📚 REST API

The backend exposes REST endpoints for student management.

```

Student Endpoints
Method	Endpoint	Description
GET	/api/students	Get students
GET	/api/students/{id}	Get student by ID
GET	/api/students/search	Search students
POST	/api/students	Create a student
PUT	/api/students/{id}	Update a student
DELETE	/api/students/{id}	Delete a student

Protected endpoints require JWT authentication.

```

📖 Swagger / OpenAPI

The backend includes interactive Swagger/OpenAPI documentation.

When running the backend locally, open:

http://localhost:8080/swagger-ui/index.html

Swagger provides an interactive interface for exploring and testing the REST API.

The API documentation includes endpoints for:

Authentication
Student management
Student search
Student retrieval
Student creation
Student updates
Student deletion

```
📁 Project Structure
student-management-system/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── apex/
│   │       │           └── studentmanagement/
│   │       │               ├── controller/
│   │       │               ├── dto/
│   │       │               ├── entity/
│   │       │               ├── exception/
│   │       │               ├── repository/
│   │       │               ├── security/
│   │       │               └── service/
│   │       │
│   │       └── resources/
│   │
│   ├── pom.xml
│   ├── Dockerfile
│   └── mvnw
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   └── students/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   └── screenshots/
│       ├── login.png
│       ├── admin-dashboard.png
│       ├── edit-student.png
│       └── swagger.png
│
├── README.md
└── .gitignore
```gitignore
# contents of gitignore
...
```



# 🖥️ Screenshots

## Login

![Login](https://raw.githubusercontent.com/channakeshava-cpu/student-management-system/main/docs/screenshots/login.png)
---

## Admin Dashboard

![Admin Dashboard](https://raw.githubusercontent.com/channakeshava-cpu/student-management-system/main/docs/screenshots/admin-dashboard.png)

---

## Edit Student

![Edit Student](https://raw.githubusercontent.com/channakeshava-cpu/student-management-system/main/docs/screenshots/edit-student.png)

---

## Swagger API

![Swagger API](https://raw.githubusercontent.com/channakeshava-cpu/student-management-system/main/docs/screenshots/swagger.png)

⚙️ Local Setup
Prerequisites

Make sure the following are installed:

Java 21+
Node.js
npm
MySQL
Git
🔧 Backend Setup

Navigate to the backend directory:

cd backend

Make sure MySQL is running.

Create a MySQL database, for example:

CREATE DATABASE student_management;

Configure your database connection in:

backend/src/main/resources/application.properties

Example:

spring.datasource.url=jdbc:mysql://localhost:3306/student_management
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

Configure your JWT properties according to your local environment.

Start the backend:

Windows
.\mvnw.cmd spring-boot:run

The backend will run on:

http://localhost:8080
🎨 Frontend Setup

Open another terminal.

Navigate to the frontend:

cd frontend

Install dependencies:

npm install

Create a file:

frontend/.env

Add:

VITE_API_BASE_URL=http://localhost:8080

Start the frontend:

npm run dev

The frontend will run on:

http://localhost:5173
🌐 Local Application URLs
Application	URL
Frontend	http://localhost:5173
Backend	http://localhost:8080
Swagger UI	http://localhost:8080/swagger-ui/index.html


🔒 Environment Variables



Frontend

Example:

VITE_API_BASE_URL=http://localhost:8080
Backend

Database and JWT configuration should be provided through your local configuration or deployment environment.

🧪 Testing the Application

After starting both the backend and frontend:

Open http://localhost:5173
Register a user or use an existing account
Login
Verify the dashboard
View student records
Test student search
Test department filtering
Test sorting
Login using an ADMIN account
Test Add Student
Test Edit Student
Test Delete Student
Test Excel export
Test PDF export
Open Swagger UI
Test the protected API endpoints


🐳 Docker

The backend includes a Dockerfile for containerized deployment.

Backend Docker image can be built with:

docker build -t student-management-backend ./backend

The application can then be run in a Docker environment with the required database configuration.

☁️ Deployment

The application was previously deployed using:

Frontend: Vercel
Backend: Railway

The production deployment is currently inactive because the Railway free monthly usage limit was exhausted.

The complete source code remains available in this repository and the application can be run locally using the setup instructions above.

🔮 Future Improvements

Potential future improvements include:

Refresh token support
Email verification
Password reset
Advanced role management
User profile management
More detailed analytics
Automated unit and integration testing
CI/CD pipeline
Docker Compose development environment
Cloud database
Production monitoring
Application logging and observability
Deployment on an alternative cloud platform


🎯 Learning Objectives

This project was built to gain practical experience with:

Java backend development
Spring Boot
REST API design
Spring Security
JWT authentication
Role-based authorization
JPA and Hibernate
MySQL
React
Axios
Frontend state management
API integration
CRUD architecture
Application deployment
Docker
Git and GitHub
Swagger/OpenAPI


👨‍💻 Author

Channa Keshava Reddy S V

GitHub

https://github.com/channakeshava-cpu

LinkedIn

https://www.linkedin.com/in/channakeshava-reddy-60246736/

⭐ Project Status

Completed

The Student Management System includes:

✅ React frontend
✅ Spring Boot backend
✅ MySQL database
✅ JWT authentication
✅ Role-based authorization
✅ Student CRUD operations
✅ Search and filtering
✅ Sorting and pagination
✅ Dashboard analytics
✅ Excel/PDF export
✅ Swagger/OpenAPI documentation
✅ Responsive UI
✅ Local development setup
✅ Docker-ready backend
✅ GitHub repository


📌 Repository

https://github.com/channakeshava-cpu/student-management-system
