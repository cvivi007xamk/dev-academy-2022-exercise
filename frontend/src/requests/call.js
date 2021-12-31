import axios from "axios";
const callFarmData = async (farmName) => {
	const response = await axios.get(`http://localhost:3001/api/${farmName}`);
	const farmData = await response.data;
	return farmData;
};
const callInitialData = async () => {
	const response = await axios.get("http://localhost:3001/api");
	const newData = await response.data;
	return newData;
};

export { callFarmData, callInitialData };
