import axios from "axios";

const doGet = async(route = "", id = "", token = null) => {
	if (!token) return;
	const response = await axios
	  .get(`${route}${id}`, {
		headers: {
		  'authorization': token
		}})
	  .then((response) => {
		return response?.data;
	  })
	//   .catch((e) =>
	// 	console.log("error get on route "+ route + JSON.stringify(e))
	//   );
	return response;
}

const doPost = async(route = "", params = {}, token = null, tokenNeeded = true) => {
	if (!token && tokenNeeded) return;
	const response = await axios
    .post(
     	route, params,{
			headers: {
			  'authorization': token
			}}
    )
    .then((response) => {
      return response?.data;
    })
    // .catch((e) =>
    //   console.log("error post on route "+route + JSON.stringify(e))
    // );
  return response;

}

const doDelete = async(route = "", id = "", token = null) => {
	if (!token) return;
	const response = await axios
	.delete(`${route}${id}`,{
		headers: {
		  'authorization': token
		}})
	.then((response) => {
	  return response?.data;
	})
	// .catch((e) =>
	//   console.log("error delete on route "+ route + JSON.stringify(e))
	// );
  return response;
}

const doPut = async(route= "", params, token = null) => {
	if (!token) return;
	const response = await axios
	  .put(route, params, {
		headers: {
		  'authorization': token
		}})
	  .then((response) => {
		return response?.data;
	  })
	//   .catch((e) => console.log("error modify on route " +route+ JSON.stringify(e)));
	return response;
}

export { doGet, doPost, doDelete, doPut };

