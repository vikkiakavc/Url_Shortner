const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME || "project1", process.env.DB_USER || "root", process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate().then(() => {
    console.log('connected')
}).catch((err) => {
    console.log('error ' + err)
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.shorts = require('../models/shorts.js')(sequelize, DataTypes)


db.sequelize.sync({ force: true }).then(() => {
    console.log(' yes re-sync')
})

module.exports = db;