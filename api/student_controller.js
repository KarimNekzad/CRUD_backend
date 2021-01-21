const express = require("express")
const router = express.Router()
const models = require("../database/models")

// GET -> Read All
// localhost:8080/api/students/
router.get("/", (req, res, next) => {
  models.Student.findAll()
    .then((students) => {
      res.status(200).json({
        students,
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
      })
    })
})

// GET by PK -> Read by ID
// CODE

// POST -> Create
// localhost:8080/api/students
router.post("/", (req, res, next) => {
  models.Student.create({
    studentname: req.body.studentname,
    email: req.body.email,
    image: req.body.image,
    gpa: req.body.gpa,
  })
    .then((student) => {
      res.status(200).json({
        message: "Successfully insered student into database",
        student,
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
      })
    })
})

// PUT -> Update //timestamp: 1:19:22 aj words of wisdom, why axios requests can differentiate between the same route names here, sequelize review session (sequelize tutorial)
router.put("/:id", (req, res, next) => {
  models.Student.findByPk(req.params.id).then((student) => {
    if (!student) {
      res.status(404).json({
        message: "A student by that id was not found to update",
      })
    }

    student.update({
      studentname: req.body.studentname,
      email: req.body.email,
      image: req.body.image,
      gpa: req.body.gpa,
    })

    student.save()

    res.status(200).json({
      message: "Successfully updated student",
      student,
    })
  })
})

// DELETE -> Delete, timestamp:1:08:25
router.delete("/:id", (req, res, next) => {
  models.Student.findByPk(req.params.id).then((student) => {
    if (!student) {
      res.status(404).json({
        message: "A student by that id was not found to delete",
      })
    }

    student.destroy()

    res.status(200).json({
      message: "Successfully deleted student",
    })
  })
})

module.exports = router
