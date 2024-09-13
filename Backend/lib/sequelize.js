 const { Sequelize } = require('sequelize');

 const dotenv = require('dotenv');
 const pg = require('pg');
 dotenv.config()

 
const sequelize = new Sequelize(process.env.SUPABASE_URL,
    {    dialectModule: pg,
    }
);

module.exports = { sequelize };
