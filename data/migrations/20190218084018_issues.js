exports.up = function(knex, Promise) {
	return knex.schema.createTable('issues', tbl => {
		tbl.increments('id')
        tbl.string('issue_name').notNullable()
        tbl.string('issue_type').notNullable()
        tbl.timestamp('created_at').defaultTo(knex.fn.now());
        tbl.string('logged_by').notNullable()
        tbl.boolean('is_complete').defaultTo(false)
        tbl.datetime('completed_by')
        tbl.boolean('resolved_by')
		tbl.boolean('is_scheduled').defaultTo(false)
		tbl.boolean('ignored').defaultTo(false)
		tbl.text('comments').notNullable()
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
}

exports.down = function(knex, Promise) {
	
}

