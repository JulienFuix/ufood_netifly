import { doDelete, doGet, doPost, doPut } from "./api";

export async function GetFavouriteListById(id, token) {
	return await doGet("https://ufoodapi.herokuapp.com/favorites/", id, token);
  }
  
export async function PostFavouriteList(name, owner, token) {
	return await doPost("https://ufoodapi.herokuapp.com/favorites/", {
		name: name,
		owner: owner,
	}, token);
}
  
export async function ModifyFavouriteList(name, owner, id, token) {
	return await doPut(`https://ufoodapi.herokuapp.com/favorites/${id}`, {
		name: name,
		owner: owner,
	}, token);
  }
  
export async function DeleteFavouriteList(id, token) {
	return await doDelete(`https://ufoodapi.herokuapp.com/favorites/`, id, token);
  }
  
export async function PostRestaurantFavouriteList(id, idRestaurant, token) {
	return await doPost(`https://ufoodapi.herokuapp.com/favorites/${id}/restaurants`, {
		id: idRestaurant,
	}, token)
}
  
export async function DeleteRestaurantFavouriteList(id, restaurantId, token) {
	return await doDelete(`https://ufoodapi.herokuapp.com/favorites/${id}/restaurants/`, restaurantId, token);
}