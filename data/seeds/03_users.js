
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Khari', password: 'flamingo', is_admin: true, is_board_member: true, school_id: '2'},
        {username: 'Courtney', password: 'flamingo', is_admin: true, is_board_member: true, school_id: '1'},
        {username: 'Andrew', password: 'flamingo', is_admin: true, is_board_member: false, school_id: '3'},
        {username: 'Ryan', password: 'flamingo', is_admin: false, is_board_member: true, school_id: '1'}
      ]);
    });
};
