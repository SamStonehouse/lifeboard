const User = () => {

}

User.validate = (username, password) => {
	return true;
}

User.get = (username) => {
	return {
		username: 'test',
		id: 0,
	}
}

module.exports = User;