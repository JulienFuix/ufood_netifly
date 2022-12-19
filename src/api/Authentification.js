import { doPost } from "./api";

const url = "https://ufoodapi.herokuapp.com"

export async function PostRegister(username, password, email) {
	return await doPost(`${url}/signup`, {
		name: username,
		email: email,
		password: password,
	  }, "", false)
}

export async function PostLogin(password, email) {
	return await doPost(`${url}/login`, {
		email: email,
		password: password,
	  }, "", false)
}