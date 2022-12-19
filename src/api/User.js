import { doDelete, doGet, doPost } from "./api";

const idUser = "6371210f2d7b2105ad98247a";

export async function FollowUser(id, token) {
  return await doPost("https://ufoodapi.herokuapp.com/follow", {
    id: id,
  }, token);
}

export async function UnFollowUser(id, token) {
  return await doDelete(`https://ufoodapi.herokuapp.com/follow/${id}`, "", token)
}

export async function GetAllUserBySearch(search, token) {
  return await doGet(`https://ufoodapi.herokuapp.com/users?q=${search}`, "", token);
}

export async function GetUserInfo(id = idUser, token) {
	return await doGet("https://ufoodapi.herokuapp.com/users/", id, token);
}

export async function GetVisitRestaurant(id = idUser, token) {
	return await doGet(`https://ufoodapi.herokuapp.com/users/${id}/restaurants/visits`, "", token);
}

export async function GetUserFavouriteList(id = idUser, token) {
	return await doGet(`https://ufoodapi.herokuapp.com/users/${id}/favorites`, "", token)
}

export async function PostRestaurantVisite(
  id,
  idRestaurant,
  comment,
  rating,
  date,
  token
) {
	return await doPost(`https://ufoodapi.herokuapp.com/users/${id}/restaurants/visits`, {
        restaurant_id: idRestaurant,
        comment: comment,
        rating: parseInt(rating),
        date: date,
      }, token)
}

  