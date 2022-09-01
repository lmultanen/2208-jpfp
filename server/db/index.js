// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database')
const Student = require('./student')
const Campus = require('./campus')
const {seedCampuses,seedStudents} = require('./seed');

Student.belongsTo(Campus)
Campus.hasMany(Student)

const syncAndSeed = async () => {
    await db.sync({ force: true });

    //use this area to sync your database
    await Promise.all(seedStudents.map(student => {
      return Student.create(student);
    }));
    await Promise.all(seedCampuses.map(campus => {
      return Campus.create(campus);
    }));
    await assignStudents();

    console.log(`
    Seeding successful!
  `);
};

const assignStudents = async () => {
  const students = await Student.findAll();
  const campuses = await Campus.findAll();

  let studentsToAssign = Math.floor(Math.random()*students.length);
  for (let i=0; i < studentsToAssign; i++) {
    await students[i].setCampus(campuses[Math.floor(Math.random()*campuses.length)])
  }
  await students.find(student => student.firstName === 'Puddles').setCampus(campuses.find(campus => campus.name === 'Oregon'))
  await students.find(student => student.firstName === 'Brutus').setCampus(campuses.find(campus => campus.name === 'Ohio State'))
}



module.exports = {
    // Include your models in this exports object as well!
    db,
    syncAndSeed,
    Student,
    Campus

}