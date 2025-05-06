````markdown
# NE_2025_RESTFUL_PREP_EQUIPMENT

## Overview
This project is a **RESTful API** built with **React** for the frontend and **Node.js/Express** for the backend. The application allows users to manage employee data, including viewing, creating, updating, and deleting employees.

## Challenge: 
https://docs.google.com/document/d/1EbrN7mkInwOiQh7jCu0zA5pIEGFpfQuxA-G37jBSSYc/edit?tab=t.0

## Features
- **Viewing Employees**: Display all employees, including basic details such as name, email, and phone number.
- **Search Functionality**: Users can search for employees by name or other attributes.
- **Add Employee**: Allows the addition of new employees.
- **Update Employee**: Allows the updating of employee details.
- **Delete Employee**: Employees can be deleted from the system.
- **User Authentication**: Secure login system that requires a token to access employee management functionalities.
- **Notifications**: Success and error notifications for CRUD operations using `react-toastify`.

## Tech Stack
- **Frontend**: React, React Router, Tailwind CSS, React Toastify
- **Backend**: Node.js, Express
- **Database**: MongoDB (or replace with your preferred database)
- **Authentication**: JWT (JSON Web Token)

## Prerequisites
Before getting started, ensure that you have the following installed on your local machine:
- **Node.js** and **npm** (Node Package Manager)
- **MongoDB** (or your preferred database setup)
- **Git** (for cloning the repo)

## How to Clone the Repository

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/NEPrepResources/Restful_NE_2024_RTB.git
````

2. Navigate to the project directory:

   ```bash
   cd NE_2025_RESTFUL_PREP_EQUIPMENT
   ```

3. Install the backend dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Set up your MongoDB database and update the connection details in `backend/config/database.js`.

5. Run the backend server:

   ```bash
   npm start
   ```

6. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

7. Install the frontend dependencies:

   ```bash
   npm install
   ```

8. Run the frontend development server:

   ```bash
   npm start
   ```

9. Open the application in your browser at `http://localhost:3000`.

## How to Use the Application

### Client-Side (Frontend)

1. **Login**:

   * Upon visiting the application, you will be prompted to log in. Use your credentials to access the system.
   * A token will be generated upon successful login, and it will be saved in localStorage for authenticated access.

2. **Viewing Employees**:

   * Once logged in, you will be taken to the employee management page where you can view a list of employees.
   * Employees' basic information, such as name, email, and phone number, will be displayed.

3. **Searching Employees**:

   * Use the search input at the top of the employee list to search for employees by their name or email.

4. **Add Employee**:

   * Click the **+Add Employee** button to navigate to a form where you can enter details for a new employee. Fill in the form and submit it to add the employee to the system.

5. **Update Employee**:

   * Click on the **Update** link beside any employee’s details to navigate to the update page where you can modify their information.

6. **Delete Employee**:

   * Click the **Delete** button beside an employee’s entry to remove them from the system. A confirmation prompt will ask for your confirmation before deletion.

7. **Logout**:

   * Click on the **Logout** button in the top right corner to log out from the system.

### Developer Guide

To run the application locally:

1. Clone the repository as shown above.
2. Set up the backend as described (make sure to set up your database correctly).
3. Run the backend and frontend servers.
4. Use a tool like **Postman** to test the backend endpoints (e.g., POST `/login`, GET `/employee`, DELETE `/employee/:id`).

The backend server runs on `http://localhost:5000`, and the frontend runs on `http://localhost:3000`.

## Troubleshooting

* **Creating/Updating Employee Doesn't Work**:

  * Ensure that you are logged in and the authentication token is properly included in your requests.
  * Check if the backend endpoints for employee creation and update are correctly implemented.

* **No User Name Displayed**:

  * Verify that the user object is correctly fetched and the user's name is included in the response from the backend.

* **No Search Functionality on Frontend**:

  * If search is not working, make sure the search query is correctly being passed to the backend and handled in the frontend.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

This README is designed to provide an overview, installation steps, usage instructions, and troubleshooting tips for both the client and developers working with the app.
```
