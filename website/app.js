/* Global Variables */

// API credentials
const API_KEY = "&appid=52456821fdebb9f6be84655d59c6efcf&units=imperial";
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
document.getElementById("generate").addEventListener("click", displayAction);

function displayAction() {
	const zip = document.getElementById("zip").value;
	const feelings = document.getElementById("feelings").value;

	getDataApi(baseURL, zip, API_KEY)
		.then(function (data) {
			// Add data
			console.log("Data from api is: ", data);
			postDataApi("/addWeatherData", {
        date: newDate,
				temperature: data.main.temp,
				userResponse: feelings,
			});
		})
		.then(() => updateUI());
}

// Function to openweathermap Data
const getDataApi = async (baseURL, zip, API_KEY) => {
	if (zip.toString().length !== 5) {
		alert("zip should be of length 5!");
	} else {

    const request = await fetch(baseURL+zip+API_KEY);
		try {
			const Data = await request.json();
      return Data;
		} catch (error) {
			console.log("error", error);
		}
	}
};


// Function for Async POST Request

const postDataApi = async (url = "", data = {}) => {
  console.log('Async POST request response successful');
  console.log(data);
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data), 
	});

	try {
		const newData = await response.json();
		console.log(newData);
    return newData;
	} catch (error) {
		console.log("error", error);
	}
};

// Function to UPDATE UI
const updateUI = async () => {
	const request = await fetch("/all");
  console.log('Update UI request response');
	try {
		const data = await request.json();
		console.log("updateUI: ", data);
		document.getElementById("date").innerHTML = `Date: ${data.date}`;
		document.getElementById("temp").innerHTML = `Temperature: ${data.temperature}`;
		document.getElementById("content").innerHTML = `User response: ${data.userResponse}`;
	} catch (error) {
		console.log("error", error);
	}
};
