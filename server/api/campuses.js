const { Campus, Student } = require('../db');

const router = require('express').Router();

router.get('/', async (req,res,next) => {
    try {
        const campuses = await Campus.findAll({
            include: {
                model: Student
            }
        });
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
        if (campus === null) {
            res.status(404).send('Campus Not Found')
        }
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
        const campus = await Campus.create(req.body)
        res.status(201).send(await Campus.findByPk(campus.id, {include: {model: Student}}));
    } catch (err) {
        next(err)
    }
})

module.exports = router;