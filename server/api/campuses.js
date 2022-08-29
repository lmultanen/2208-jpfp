const { Campus, Student } = require('../db');

const router = require('express').Router();

router.get('/', async (req,res,next) => {
    try {
        const campuses = await Campus.findAll();
        res.send(campuses);
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const campus = await Campus.findByPk(req.params.id, {
            include: {
                model: Student
            }
        });
        res.send(campus);
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try {
        // maybe should make this a find or create, if later want campuses to have unique names?
        res.status(201).send(await Campus.create(req.body));
    } catch (err) {
        next(err)
    }
})

module.exports = router;