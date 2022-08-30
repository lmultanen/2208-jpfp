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

router.put('/:id', async (req,res,next) => {
    try {
        const student = await Student.findByPk(req.params.id, {
            include: {
                model: Campus
            }
        });
        await student.update(req.body.student)

        if (req.body.campus) {
            const campus = await Campus.findByPk(req.body.campus.id);
            if (!student.campus || (student.campus.name !== campus.name)){
                await student.setCampus(campus)
            }
        }
        const updated = await Student.findByPk(req.params.id, {
            include: {
                model: Campus
            }
        })
        // CAN CLEAN THIS UP SOME PROBABLY; MIGHT NOT NEED TO INCLUE ON FIRST FETCH

        console.log('student is saved', student)
        console.log('student is updated', updated)
        res.send(updated);
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try {
        // maybe should make this a find or create, if later want campuses to have unique names?
        const newStudent = await Student.create(req.body.student)
        if (req.body.campus) {
            const campus = await Campus.findByPk(req.body.campus.id)
            await newStudent.setCampus(campus)
        }
        res.status(201).send(newStudent);
        //modify here to setCampus if not null

    } catch (err) {
        next(err)
    }
})

module.exports = router