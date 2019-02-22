const jwt = require('jsonwebtoken')

module.exports = {
	authenticate,
	generateToken,
	checkRole
}



function authenticate(req, res, next) {
	const token = req.get('Authorization')

	if (token) {

		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ messge: 'invalid token' })
			} else {
				req.decodedToken = decodedToken
				next()
			}

		})
	} else {
		return res.status(401).json({
			error: 'No token provided, must be set on the Authorization Header'
		})
	}
}


function checkRole(role) {
	return function(req, res, next) {
		if(req.decodedToken.roles.includes(role)) {
			next()
		} else {
			res.status(403).json({ messge: `you need to be a(n) ${role}`})
		}
	}
}

//GENERATES JWT
function generateToken(user) {
	const payload = {
		username: user.username,
		userId: user.id,
		roles: ['admin']
	}

	const secret = process.env.JWT_SECRET

	const options = {
		expiresIn: '48hr'
	}
	return jwt.sign(payload, secret, options)
}

