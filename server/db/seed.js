const seedCampuses = [{
    name: 'Harvard',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png',
    address: 'Cambridge, Massachusetts',
    description: "It's Harvard, no other description necessary."
  }, {
    name: 'UChicago',
    imageUrl: 'https://gistbok.ucgis.org/sites/default/files/document-sharing-form-files/209/uchicago.jpg',
    address: 'Chicago, Illinois',
    description: 'Located in Hyde Park just south of the city, this school is often referred to as "where fun goes to die"!'
  }, {
    name: 'Oregon',
    imageUrl: 'https://d2jyir0m79gs60.cloudfront.net/college/logos/University_of_Oregon.jpg',
    address: 'Eugene, Oregon',
    description: 'Home of the best collegiate football team in all the west. Sco Ducks!'
  }, {
    name: 'Ohio State',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ohio_State_Buckeyes_logo.svg/1200px-Ohio_State_Buckeyes_logo.svg.png',
    address: 'Columbus, Ohio',
    description: 'Objectively speaking, their football program is riddled with cheaters and scoundrels. Nobody likes them.'
  }]
  
  const seedStudents = [{
    firstName: 'Luke',
    lastName: 'Skywalker',
    email: 'luke@jedi.com',
    imageUrl: 'https://media.vanityfair.com/photos/5a3315e78ae8fd2b3a999bc7/2:3/w_639,h_959,c_limit/star-wars-the-last-jedi-is-luke-dead.jpg',
    gpa: 3.5
  }, {
    firstName: 'Papa',
    lastName: 'Smurf',
    email: 'papa@smurf.com',
    imageUrl: 'https://pbs.twimg.com/profile_images/76413308/papasmurf_400x400.png',
    gpa: 2.5
  }, {
    firstName: 'Puddles',
    lastName: 'The Duck',
    email: 'puddles@uofo.com',
    imageUrl: 'https://pbs.twimg.com/profile_images/1456648019944697858/-wuAEPGZ_400x400.jpg',
    gpa: 3.1
  }, {
    firstName: 'Brutus',
    lastName: 'Buckeye',
    email: 'brutus@osu.com',
    imageUrl: 'https://cdn.vox-cdn.com/thumbor/kHPx2l9FbqpIfVgM3j3_ld8nUOc=/0x0:4134x2978/1200x800/filters:focal(1737x1159:2397x1819)/cdn.vox-cdn.com/uploads/chorus_image/image/65553045/usa_today_12409158.0.jpg',
    gpa: 1.2
  }, {
    firstName: 'Peter',
    lastName: 'Pan',
    email: 'peterpan@neverland.com',
    imageUrl: 'https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-r3neg5_4c4b3ee3.jpeg?region=0,0,600,600',
    gpa: 2.9
  }, {
    firstName: 'Winnie',
    lastName: 'Pooh',
    email: 'pooh@bear.com',
    imageUrl: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F07%2Fwinnie-the-pooh-blood-and-honey-film-poster-release-info-000.jpg?fit=max&cbr=1&q=90&w=750&h=500',
    gpa: 4.0
  }, {
    firstName: 'Ash',
    lastName: 'Ketchum',
    email: 'ash@pokemon.com',
    imageUrl: 'https://i.pinimg.com/736x/18/d9/e1/18d9e1307018dbc76750ca7d5124fccd--ash-ketchum-pokemon.jpg',
    gpa: 3.3
  }, {
    firstName: 'Mario',
    lastName: 'Mario',
    email: 'mario@mario.com',
    imageUrl: 'https://play-lh.googleusercontent.com/5LIMaa7WTNy34bzdFhBETa2MRj7mFJZWb8gCn_uyxQkUvFx_uOFCeQjcK16c6WpBA3E',
    gpa: 2.2
  }]

  module.exports = {
    seedCampuses, seedStudents
  }