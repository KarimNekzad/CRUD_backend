const { Sequelize } = require("sequelize")
const db = require("../dbinit")

const Campus = db.sequelize.define("Campus", {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    image:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    adress:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = Campus