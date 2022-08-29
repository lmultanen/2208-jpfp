const Sequelize = require('sequelize');
const db = require('./database')

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://image.shutterstock.com/image-vector/university-buildingeducation-studentcity-landscape-house-260nw-1117704410.jpg'
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
    },
})

module.exports = Campus