import axios from "axios";
const url = "http://localhost:3001/measurements";

// const callFarmData = async (farmName) => {
// 	const response = await axios.get(`http://localhost:3001/api/${farmName}`);
// 	const farmData = await response.data;
// 	return farmData;
// };
// const callInitialData = async () => {
// 	const response = await axios.get("http://localhost:3001/api");
// 	const newData = await response.data;
// 	return newData;
// };

// const getData = (endpoint) => {
// 	try {
// 		const response = await axios.get(endpoint);
// 		const newData = await response.data;
// 		return newData
// 	} catch (error) {
// 		return error.response.data.error;
// 	}
// };

// const postData = async (newObject) => {
// 	try {
// 		const request = await axios.post(url, newObject);
// 		return response.data;
// 	} catch (error) {
// 		setDataError(error.response.data.error);
// 	}
// };

// const putData = async (id, newObject) => {
// 	try {
// 		const request = await axios.put(`${url}/${id}`, newObject);
// 		return response.data;
// 	} catch (error) {
// 		setDataError(error.response.data.error);
// 	}
// };

const getData = async (endpoint) => {
	const response = await axios.get(endpoint);
	return response.data;
};

const createRow = async (newRow) => {
	const response = await axios.post(url, newRow);
	return response.data;
};

const updateRow = async (id, newRow) => {
	const response = await axios.put(`${url}/rows/${id}`, newRow);
	return response.data;
};

const deleteRow = async (id) => {
	const response = await axios.delete(`${url}/rows/${id}`);
	return response.data;
};

export { getData, createRow, updateRow, deleteRow };
