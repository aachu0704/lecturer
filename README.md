# Welcome to your Lovable project

TODO: Document your project here
# Lecturer Availability System

## Team: Full Stack Attack

The Lecturer Availability System is a smart and user-friendly platform designed to help students quickly check the availability status of lecturers without having to physically search for them or repeatedly contact others.

---

## Problem Statement

Students often face difficulty finding lecturers when they need academic guidance, clarification, signatures, or other assistance.

Currently, students may have to:

* Visit the lecturer's cabin or department multiple times.
* Ask other students or staff about the lecturer's availability.
* Wait unnecessarily when the lecturer is busy.
* Interrupt lecturers when they are unavailable.

This results in wasted time, unnecessary interruptions, and inefficient communication between students and lecturers.

---

## Solution

The Lecturer Availability System provides a centralized platform where lecturers can update their current availability status, allowing students to check it quickly.

The system can display different availability statuses:

* **Available** – The lecturer is currently available.
* **Busy** – The lecturer is currently occupied.
* **Unavailable** – The lecturer is not currently available.

Students can check the lecturer's status before approaching them, making communication more convenient and efficient.

---

## Key Features

* Lecturer availability tracking
* Available, Busy, and Unavailable status
* Lecturer search functionality
* User-friendly interface
* Quick access to availability information
* Lecturer status updates
* Centralized lecturer information
* Database-backed data management

---

## Tech Stack

### Frontend

* TypeScript
* CSS

### Database

* PostgreSQL
* PL/pgSQL

### Development Tools

* Visual Studio Code
* Git
* GitHub

### Languages Used

According to the repository's language statistics:

| Language   | Usage |
| ---------- | ----: |
| TypeScript | 92.3% |
| CSS        |  3.7% |
| PL/pgSQL   |  2.2% |
| Other      |  1.8% |

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/aachu0704/lecturer.git
```

### 2. Navigate to the Project

```bash
cd lecturer
```

### 3. Open the Project in Visual Studio Code

```bash
code .
```

### 4. Install Dependencies

If the project contains a `package.json` file, install the required dependencies using:

```bash
npm install
```

### 5. Configure the Database

Set up a PostgreSQL database for the project.

Create the required database and configure the database connection details according to the project's configuration files.

If the project uses environment variables, create a `.env` file and add the required database credentials.

Example:

```env
DATABASE_URL=your_database_connection_string
```

Do not commit actual database passwords or secret keys to GitHub.

### 6. Start the Development Server

Run:

```bash
npm run dev
```

The terminal will display the local development URL. Open that URL in your browser to access the application.

---

## How the System Works

```text
Student
   |
   v
Searches for Lecturer
   |
   v
Views Lecturer Information
   |
   v
Checks Availability
   |
   +--> Available
   |
   +--> Busy
   |
   +--> Unavailable
   |
   v
Student decides whether to approach the lecturer
```

---

## Objectives

* Reduce the time students spend searching for lecturers.
* Reduce unnecessary interruptions to lecturers.
* Improve communication between students and lecturers.
* Provide a centralized lecturer availability platform.
* Improve efficiency within educational institutions.

---

## Future Enhancements

* Student and lecturer authentication
* Real-time availability synchronization
* Notifications when a lecturer becomes available
* Lecturer timetable integration
* Department and location information
* Availability history and analytics
* Mobile application
* Cloud deployment
* Administrator dashboard
* Role-based access control

---

## Team Details

### Team Name: Full Stack Attack

| Member             |
| ------------------ |
| Aashwija PG        |
| Ganesha K          |
| Thanmay Shetty     |
| Vaishnavi J Shenoy |

---

## Project Impact

The Lecturer Availability System aims to make academic communication faster, easier, and more organized by providing students with quick access to lecturer availability information.

Instead of repeatedly searching for lecturers or asking others about their availability, students can check the current status through a centralized system.

---

## License

This project was developed as an academic project by Team Full Stack Attack.
