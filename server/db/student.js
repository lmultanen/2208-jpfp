const Sequelize = require('sequelize')
const db = require('./database')

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://iio.azcast.arizona.edu/sites/default/files/profile-blank-whitebg.png'
    },
    gpa: {
        type: Sequelize.DECIMAL,
        validate: {
            min: 0.0,
            max: 4.0
        }
    }
})

module.exports = Student