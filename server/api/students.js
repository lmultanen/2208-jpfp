const { Student, Campus } = require('../db');

const router = require('express').Router();

router.get('/', async (req,res,next) => {
    try {
        const students = await Student.findAll()
        res.send(students)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const student = await Student.findByPk(req.params.id,
           { include: {
                model: Campus
            }});
        res.send(student)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req,res,next) => {
    try {
        const student = await Student.findByPk(req.params.id);
        await student.destroy();
        res.send(student)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try {
        // maybe should make this a find or create, if later want campuses to have unique names?
        res.status(201).send(await Student.create(req.body));
    } catch (err) {
        next(err)
    }
})

module.exports = router