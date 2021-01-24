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
router.get("/:id", (req, res, next) => {
  models.Student.findByPk(req.params.id).then((student) => {
    if (!student) {
      res.status(404).json({
        message: "A student by that id was not found to read",
      })
    }

    res.status(200).json({
      student,
    })
  })
})

// POST -> Create
// localhost:8080/api/students
router.post("/", (req, res, next) => {
  console.log("request body:", req.body)
  models.Student.create({
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    image: req.body.image,
    gpa: req.body.gpa,
    CampusId: req.body.CampusId, // from association
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
  console.log("request body put:", req.body)
  models.Student.findByPk(req.params.id).then((student) => {
    if (!student) {
      res.status(404).json({
        message: "A student by that id was not found to update",
      })
    }

    student.update({
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      image: req.body.image,
      gpa: req.body.gpa,
      CampusId: req.body.CampusId,
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
