const express = require("express")
const router = express.Router()
const models = require("../database/models")

//READ ALL
router.get("/", (req, res, next) => {
    models.Campus.findAll()
        .then((campuses) => {
            res.status(200).json({
                campuses,
            })
        })
        .catch((err) => {
            res.status(500).json({
                err,
            })
        })
})

//CREATE
router.post("/", (req, res, next) => {
    models.Campus.create({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        address: req.body.address,
        description: req.body.description,
    })
    
    .then((campus) => {
        res.status(200).json({
            message: "Successfully inserted Campus into database",
            campus,
        })
    })
    .catch((err) => {
        res.status(500).json({
            err,
        })
    })
})

//UPDATE
router.put("/:id", (req, res, next) => {
    models.Campus.findByPk(req.params.id).then((campus) => {
        if(!campus){
            res.status(404).json({
                message:"Campus with that id was not found to update",
            })
        }
        
        campus.update({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
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

//DELETE
router.delete("/:id", (req, res, next) => {
    models.Campus.findByPk(req.params.id).then((campus) => {
        if(!campus) {
            res.status(404).json({
                message:"Campus with that id not found to delete",
            })
        }
        campus.destroy()

        res.status(200).json({
            message: "Successfully delted campus",           
        })
    })
})

module.exports = router