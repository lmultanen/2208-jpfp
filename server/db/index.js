// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database')
const Student = require('./student')
const Campus = require('./campus')

const seedCampuses = [{
  name: 'Harvard',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png',
  address: 'Mass',
  description: "It's fucking Harvard yo"
}, {
  name: 'UChicago',
  imageUrl: 'https://gistbok.ucgis.org/sites/default/files/document-sharing-form-files/209/uchicago.jpg',
  address: 'Chicago',
  description: 'I went to school there'
}]

const seedStudents = [{
  firstName: 'Luke',
  lastName: 'Multanen',
  email: 'luke@luke.com',
  imageUrl: 'https://iio.azcast.arizona.edu/sites/default/files/profile-blank-whitebg.png',
  gpa: 3.5
}, {
  firstName: 'Lisa',
  lastName: 'Zhu',
  email: 'lisa@baby.com',
  imageUrl: 'https://iio.azcast.arizona.edu/sites/default/files/profile-blank-whitebg.png',
  gpa: 3.8
}, {
  firstName: 'Jacob',
  lastName: 'Ryall',
  email: 'jacob@jacob.com',
  imageUrl: 'https://iio.azcast.arizona.edu/sites/default/files/profile-blank-whitebg.png',
  gpa: 3.7
}, {
  firstName: 'Some',
  lastName: 'Dude',
  email: 'some@dude.com',
  imageUrl: 'https://iio.azcast.arizona.edu/sites/default/files/profile-blank-whitebg.png',
  gpa: 3.8
}]

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

    //testing setting a few students to campuses
    const firstStudent = await Student.findByPk(1);
    const thirdStudent = await Student.findByPk(3);
    const firstCampus = await Campus.findAll({where: {
      name: "UChicago"
    }});
    await firstStudent.setCampus(firstCampus[0])
    await thirdStudent.setCampus(firstCampus[0])

    const fourthStudent = await Student.findByPk(4);
    const secondCampus = await Campus.findAll({where: {
      name: "Harvard"
    }});
    await fourthStudent.setCampus(secondCampus[0])


    console.log(`
    Seeding successful!
  `);
};



module.exports = {
    // Include your models in this exports object as well!
    db,
    syncAndSeed,
    Student,
    Campus

}