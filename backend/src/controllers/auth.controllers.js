const pool = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.Signup = async (req,res)=>{
    const { name, email, password, confirmPassword } =req.body;

    try{
        if( !name || !email || !password || !confirmPassword){
            return res.status(400).json({
                error: 'All fields are required!'
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                error: 'Passwords do not match!'
            });
        }
        const existingUser= await pool.query('SELECT * FROM users where email=$1', [email]);
        if(existingUser.rows.length>0){
            return res.status(400).json({
                error: 'User already registerd!'
            })
        }

        const hashedPassword= await bcrypt.hash(password, 10)
        await pool.query(
            'INSERT INTO users(name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );

        res.status(201).json({
            success:'User registered successfully!'
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:'Server error...'
        })
    }
}

exports.Login = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: 'Invalid request body' })
        }

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required.' })
        }

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password)
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }

        const token = jwt.sign(
            { id: user.rows[0].id },
            process.env.JWT_SECRET || 'migisha@YezuAkuzwe123!',
            { expiresIn: '1d' }
        )

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                email: user.rows[0].email
            }
        })

    } catch (err) {
        console.error('Login error:', err)
        return res.status(500).json({ message: 'Server error ...' })
    }
}