const db = require("../dbinit")
const Student = require("./Student")

// remove this after project is done, allows for table changes in db
db.sequelize.sync({ alter: true })

module.exports = {
  Student,
}
