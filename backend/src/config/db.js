const { Pool } = require('pg')
require('dotenv').config()

const pool= new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.PORT || 5432,
    database: process.env.DB_NAME || 'equipment_system',
    password: process.env.DB_PASSWORD || 'yezu'
})

module.exports = pool;