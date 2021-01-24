const Sequelize = require("sequelize")
const db = require("../dbinit")

// The student's full name, email, image, and gpa
const Student = db.sequelize.define("Student", {
  first: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gpa: {
    type: Sequelize.FLOAT,
    validate: {
      len: [0, 4],
    },
    allowNull: false,
  },
})

module.exports = Student
