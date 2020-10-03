import axios from 'axios';
import bcrypt from 'bcryptjs';

export const UserRegister = data => {
	const password = data.password;
	// const salt = bcrypt.genSaltSync(10);
	// const hash = bcrypt.hashSync(password, salt);

	data["password"] = password;//hash;

	return axios.post('http://localhost:5000/register/add', data)
		.then(res => res.status);
}

export const UsernameValidate = data => {
	axios.post('http://localhost:5000/register/validateUsername', data)
		.then(exist => exist.status);
}

export const EmailValidate = data => {
	axios.post('http://localhost:5000/register/validateEmail', data)
		.then(exist => exist.status);
}