exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('issues')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('issues').insert([
				{
					issue_name: 'HDMI cables',
					is_complete: false,
					is_scheduled: true,
					is_ignored: false,
					comments: 'Missing 5 cables since last Monday',
					school_id: '1',
					user_id: '1'
				},
				{
					issue_name: 'TVs',
					is_complete: false,
					is_scheduled: true,
					is_ignored: false,
					comments: 'Vandalization, 3 screens are cracked, cannot see image',
					school_id: '2',
					user_id: '2'
				},
				{
					issue_name: 'Tablets',
					is_complete: false,
					is_scheduled: true,
					is_ignored: false,
					comments: 'Tablet #1435 does not connect to internet',
					school_id: '1',
					user_id: '1'
				},
				{
					issue_name: 'Routers',
					is_complete: false,
					is_scheduled: true,
					is_ignored: false,
					comments:
						'In need of all new routers to keep up with wireless capabilities',
					school_id: '1',
					user_id: '3'
				},
				{
					issue_name: 'Server',
					is_complete: false,
					is_scheduled: true,
					is_ignored: false,
					comments: 'Server has been down since 0830',
					school_id: '3',
					user_id: '4'
				},
				{
					issue_name: 'Instructor',
					is_complete: false,
					is_scheduled: true,
					is_ignored: false,
					comments: 'Need to hire instructor for computer lab',
					school_id: '2',
					user_id: '2'
				}
			])
		})
}
