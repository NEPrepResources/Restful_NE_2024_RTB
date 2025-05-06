const pool = require("../config/db");

const safeJsonStringify = (obj) => {
    return JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );
}

exports.searchEmployees = async (req, res) => {
    try {
        const { query } = req.query;
        const userId = req.user.id;

        const results = await pool.query(
            `SELECT * FROM employees 
            WHERE user_id = $1 AND 
            (firstname ILIKE $2 OR 
             lastname ILIKE $2 OR 
             email ILIKE $2 OR 
             department ILIKE $2 OR 
             position ILIKE $2 OR
             national_identity ILIKE $2 OR
             telephone ILIKE $2 OR
             laptop_model ILIKE $2 OR
             serial_number ILIKE $2)
            ORDER BY created_at DESC`,
            [userId, `%${query}%`]
        );

        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await pool.query(
            'SELECT * FROM employees WHERE user_id = $1 ORDER BY created_at DESC',
            [req.user.id]
        );
        res.status(200).json(employees.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            national_identity,
            telephone,
            email,
            department,
            position,
            laptop_manufacturer,
            laptop_model,
            serial_number
        } = req.body;

        const newEmployee = await pool.query(
            'INSERT INTO employees (firstname, lastname, national_identity, telephone, email, department, position, laptop_manufacturer, laptop_model, serial_number, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [firstname, lastname, national_identity, telephone, email, department, position, laptop_manufacturer, laptop_model, serial_number, req.user.id]
        );

        const responseData = {
            employee: newEmployee.rows[0],
            success: 'Employee added successfully ...'
        }

        res.status(200).json(JSON.parse(safeJsonStringify(responseData)));
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await pool.query(
            'SELECT * FROM employees WHERE id = $1 AND user_id = $2',
            [id, req.user.id]
        );

        if (employee.rows.length === 0) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }

        res.status(200).json(employee.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error ..." });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            firstname,
            lastname,
            national_identity,
            telephone,
            email,
            department,
            position,
            laptop_manufacturer,
            laptop_model,
            serial_number
        } = req.body;

        const updatedEmployee = await pool.query(
            `UPDATE employees 
            SET firstname=$1, lastname=$2, national_identity=$3, telephone=$4, email=$5, 
                department=$6, position=$7, laptop_manufacturer=$8, laptop_model=$9, serial_number=$10
            WHERE id=$11 AND user_id=$12
            RETURNING *`,
            [firstname, lastname, national_identity, telephone, email, department, 
             position, laptop_manufacturer, laptop_model, serial_number, id, req.user.id]
        );

        if (updatedEmployee.rows.length === 0) {
            return res.status(404).json({
                error: 'Employee not found or not owned by user'
            });
        }

        const responseData = {
            ...updatedEmployee.rows[0],
            success: 'Employee updated successfully'
        };
        res.status(200).json(JSON.parse(safeJsonStringify(responseData)));
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await pool.query(
            'DELETE FROM employees WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, req.user.id]
        );

        if (deletedEmployee.rows.length === 0) {
            return res.status(404).json({
                error: 'Employee not found or not owned by user'
            });
        }

        res.status(200).json({
            success: 'Employee deleted successfully',
            deletedEmployee: deletedEmployee.rows[0]
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};