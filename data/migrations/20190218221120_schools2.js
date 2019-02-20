exports.up = function(knex, Promise) {
    return knex.schema.table('schools', table => {
        table.specificType('issues', 'jsonb[]')
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('schools')
  };
