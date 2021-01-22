const express = require("express");
const router = express.Router();
const models = require("../database/models");

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
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error has occurred getting all campuses",
        err,
      });
    });
});

// GET by PK -> Read by ID
router.get("/:id", (req, res, next) => {
  models.Campus.findByPk(req.params.id).then((campus) => {
    if (!campus) {
      res.status(404).json({
        message: "A campus by that id was not found to read",
      });
    }

    res.status(200).json({
      campus,
    });
  });
});

// POST
// localhost:8080/api/campuses
router.post("/", (req, res, send) => {
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
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error has occurred while creating campus",
        err,
      });
    });
});

router.post("/newCampus", async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    let newCampus = await models.Campus.create(req.body);
    res.status(201).send(newCampus);
    console.log(newCampus);
  } catch (error) {
    res.status(404).json({
      message: "Failed to create new Campus",
    });
    next(error);
  }
});

// PUT
// localhost:8080/api/campuses/:id
// router.put("/", (req, res, send))

// delete

// PUT -> Update //timestamp: 1:19:22 aj words of wisdom, why axios requests can differentiate between the same route names here, sequelize review session (sequelize tutorial)
router.put("/:id", (req, res, next) => {
  models.Campus.findByPk(req.params.id).then((campus) => {
    if (!campus) {
      res.status(404).json({
        message: "A campus by that id was not found to update",
      });
    }

    campus.update({
      campusname: req.body.campusname,
      image: req.body.image,
      address: req.body.address,
      description: req.body.description,
    });

    campus.save();

    res.status(200).json({
      message: "Successfully updated campus",
      campus,
    });
  });
});

// DELETE -> Delete, timestamp:1:08:25
router.delete("/:id", (req, res, next) => {
  models.Campus.findByPk(req.params.id).then((campus) => {
    if (!campus) {
      res.status(404).json({
        message: "A campus by that id was not found to delete",
      });
    }

    campus.destroy();

    res.status(200).json({
      message: "Successfully deleted campus",
    });
  });
});

module.exports = router;
