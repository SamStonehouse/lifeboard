const User = require('./user');

module.exports = (router) => {
	const initialiseSession = (ctx, next) => {
		let n = ctx.session.views || 0;
		ctx.session.views = ++n;

		next();
	}

	router.post('/login', initialiseSession, (ctx) => {
		console.log(ctx.request)
		const username = ctx.req.body.username;
		const password = ctx.req.body.password;

		if (User.validate(username, password)) {
			ctx.session.loggedIn = true;
			ctx.session.username = username;
		} else {
			console.log('Login failed');
		}
	});

	router.get('/session', (ctx) => {
		if (ctx.session.loggedIn) {
			ctx.response.body = 'Logged in as - ' + ctx.session.username;
		} else {
			ctx.response.body = 'Logged out';
		}
	});

	router.post('/logout', (ctx) => {
		ctx.session.loggedIn = false;
		ctx.session.username = '';
	});
}