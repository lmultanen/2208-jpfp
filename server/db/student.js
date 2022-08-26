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
        defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
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