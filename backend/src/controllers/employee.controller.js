const pool = require("../config/db")

exports.createEmployee = async(req, res)=>{
    try{
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
            'INSERT INTO employees (firstname, lastname, national_identity, telephone, email, department, position, laptop_manufacturer, laptop_model, serial_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [firstname, lastname, national_identity, telephone, email, department, position, laptop_manufacturer, laptop_model, serial_number]
        );

        res.status(200).json(newEmployee.rows[0], {
            success:'Employee added successfully ...'
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:'Server error'
        })
    }
}

exports.getAllEmployees = async(req,res)=>{
    try{
        const employees= await pool.query('SELECT * FROM employees ORDER BY created_at DESC');
        res.status(200).json(employees.rows)
    }catch(err){
        console.log(error)
        res.status(500).json({ error: "Server error" })
    }
}

exports.getEmployeeById = async(req,res)=>{
    try{
        const { id }=req.params;

        const employee= await pool.query('SELECT * FROM employees WHERE id=$1', [id])

        if(employee.rows.length  === 0){
            return res.status(400).json({
                error: "Employee not found"
            })
        }

        res.status(200).json(employee.rows[0])
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Server error ..."
        })
    }
}

exports.updateEmployee = async(req,res)=>{
    try{
        const {id}=req.params;
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
        } = req.body

        const updatedEmployee = await pool.query(
            `UPDATE employees 
            SET firstname=$1, lastname=$2, national_identity=$3, telephone=$4, email=$5, department=$6, position=$7, laptop_manufacturer=$8, laptop_model=$9, serial_number=$10
            WHERE  id=$11
            RETURNING *
            `,
            [firstname, lastname, national_identity, telephone, email, department, position, laptop_manufacturer, laptop_model, serial_number, id]
        )

        if (updatedEmployee.rows.length === 0){
            return res.status(400).json({
                error:'Employee not found ...'
            })
        }
        res.status(200).json(updatedEmployee.rows[0])
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Server error ....'
        })
    }
}

exports.deleteEmployee = async(req,res)=>{
    try{
        const { id }=req.params;
        const deletedEmployee = await pool.query('DELETE FROM employees WHERE id=$1 RETURNING *', [id])

        if( deletedEmployee.rows.length === 0){
            return res.status(400).json({
                error:'Employee not found'
            })
        }

        res.status(200).json({
            success:'Employee deleted successfully'
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Server error ...'
        })
    }
}