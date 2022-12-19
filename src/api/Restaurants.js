import { doGet } from "./api";

export async function GetAllRestaurants(price_range = "", token) {
	return await doGet("https://ufoodapi.herokuapp.com/restaurants", price_range, token);
}

export async function GetInfoRestaurant(id, token) {
	return await doGet("https://ufoodapi.herokuapp.com/restaurants/", id, token)
}