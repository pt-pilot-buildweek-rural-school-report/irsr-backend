
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', tbl => {
		tbl.increments('id')
		tbl
			.string('username', 128)
			.notNullable()
			.unique()
		tbl.boolean('is_admin').defaultTo(false)
		tbl.boolean('is_board_member').defaultTo(false)
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
