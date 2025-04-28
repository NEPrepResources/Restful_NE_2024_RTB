const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { 
    createEmployee, 
    getAllEmployees, 
    getEmployeeById, 
    updateEmployee, 
    deleteEmployee, 
} = require('../controllers/employee.controller')

const router= express.Router()

router.post('/', protect, createEmployee);
router.get('/', protect, getAllEmployees);
router.get('/:id', protect, getEmployeeById);
router.put('/:id', protect,  updateEmployee)
router.delete('/:id', protect, deleteEmployee)

module.exports=router



