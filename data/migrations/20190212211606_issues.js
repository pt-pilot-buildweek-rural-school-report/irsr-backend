
exports.up = function(knex, Promise) {
  return knex.schema.createTable('issues', tbl => {
      tbl.increments('id')
      tbl.string('issue_name').notNullable()
    tbl.boolean('is_complete').defaultTo(false)
    tbl.boolean('is_scheduled').defaultTo(false)
    tbl.boolean('is_ignored').defaultTo(false)
    tbl.string('comments').notNullable()
    tbl.integer('school_id').unsigned()
		tbl
			.foreign('school_id')
			.references('id')
            .on('schools')
    tbl.integer('user_id').unsigned()
            tbl
                .foreign('user_id')
                .references('id')
                .on('users')
  })
};

exports.down = function(knex, Promise) {
  
};
