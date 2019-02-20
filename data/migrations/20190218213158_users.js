exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', tbl => {
		tbl.increments('id')
		tbl
			.string('username', 128)
			.notNullable()
			.unique()
		tbl.string('role').notNullable()
		tbl.string('password', 128).notNullable()
		tbl.integer('school_id').unsigned()
		tbl
			.foreign('school_id')
			.references('id')
			.on('schools')
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users')
}
