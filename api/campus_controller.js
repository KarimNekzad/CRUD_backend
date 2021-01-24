const express = require("express")
const router = express.Router()
const models = require("../database/models")

// GET -> Read All
// localhost:8080/api/campuses
router.get("/", (req, res, next) => {
  models.Campus.findAll({
    // Eager Loading
    include: {
      model: models.Student,
    },
  })
    .then((campuses) => {
      res.status(200).json({
        message: "Got all campuses",
        campuses,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error has occured getting all campuses",
        err,
      })
    })
})

// GET by PK -> Read by ID
router.get("/:id", (req, res, next) => {
  console.log("req.params.id in get campus:", req.params.id)
  models.Campus.findByPk(req.params.id, {
    include: {
      model: models.Student,
    },
  }).then((campus) => {
    if (!campus) {
      res.status(404).json({
        message: "A campus by that id was not found to read",
      })
    }

    res.status(200).json({
      message: "Sucessfully retreived campus by id!",
      campus,
    })
  })
})

// POST -> Create
// localhost:8080/api/campuses
router.post("/", (req, res, next) => {
  models.Campus.create({
    campusname: req.body.campusname,
    image: req.body.image,
    address: req.body.address,
    description: req.body.description,
  })
    .then((campus) => {
      res.status(200).json({
        message: "Successfully create campus!",
        campus,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error has occured while creating campus",
        err,
      })
    })
})

// // PUT -> Update // insert below
router.put("/:id", (req, res, next) => {
  models.Campus.findByPk(req.params.id).then((campus) => {
    if (!campus) {
      res.status(404).json({
        message: "A campus by that id was not found to update",
      })
    }

    campus.update({
      campusname: req.body.campusname,
      image: req.body.image,
      address: req.body.address,
      description: req.body.description,
    })

    campus.save()

    res.status(200).json({
      message: "Successfully updated campus",
      campus,
    })
  })
})

// DELETE -> Delete, timestamp:1:08:25
router.delete("/:id", (req, res, next) => {
  models.Campus.findByPk(req.params.id).then((campus) => {
    if (!campus) {
      res.status(404).json({
        message: "A campus by that id was not found to delete",
      })
    }

    campus.destroy()

    res.status(200).json({
      message: "Successfully deleted campus",
    })
  })
})

module.exports = router
