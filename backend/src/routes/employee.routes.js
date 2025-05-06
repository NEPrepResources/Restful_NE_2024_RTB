const express = require('express');
const router = express.Router();
const { 
    createEmployee, 
    getAllEmployees, 
    getEmployeeById, 
    updateEmployee, 
    deleteEmployee,
    searchEmployees
} = require('../controllers/employee.controller');
const { protect } = require('../middleware/authMiddleware');
const { checkEmployeeOwnership } = require('../middleware/ownershipMiddleware');

router.use(protect);

router.post('/', createEmployee);
router.get('/', getAllEmployees);
router.get('/search', searchEmployees);
router.get('/:id', checkEmployeeOwnership, getEmployeeById);
router.put('/:id', checkEmployeeOwnership, updateEmployee);
router.delete('/:id', checkEmployeeOwnership, deleteEmployee);

module.exports = router;