const pool = require("../config/db");

const checkEmployeeOwnership = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const employee = await pool.query(
      'SELECT * FROM employees WHERE id = $1 AND user_id = $2', 
      [id, req.user.id] 
    );
    
    if (employee.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied. You do not own this employee record.' });
    }
    
    req.employee = employee.rows[0]; 
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = checkEmployeeOwnership;
