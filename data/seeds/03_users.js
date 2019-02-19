
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Khari', password: 'flamingo', role: 'admin', school_id: '2'},
        {username: 'Courtney', password: 'flamingo', role: 'admin', school_id: '1'},
        {username: 'Andrew', password: 'flamingo', role: 'board', school_id: '3'},
        {username: 'Ryan', password: 'flamingo', role: 'student', school_id: '1'}
      ]);
    });
};
