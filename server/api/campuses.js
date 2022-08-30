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

router.delete('/:id', async (req,res,next) => {
    try {
        const campus = await Campus.findByPk(req.params.id);
        await campus.destroy();
        res.send(campus);
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req,res,next) => {
    try {
        const campus = await Campus.findByPk(req.params.id, {
            include: {
                model: Student
            }
        });
        // unenrollment process check
        if (req.body.studentId) {
            const student = await Student.findByPk(req.body.studentId);
            await campus.removeStudent(student);
            const updated = await Campus.findByPk(req.params.id, {
                include: {
                    model: Student
                }
            })
            res.send(updated)
        } else {
            await campus.update(req.body)
            res.send(campus);
        }
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