function refreshWeather(response) {
	let temperatureElement = document.querySelector("#temperature");
	let temperature = response.data.temperature.current;
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let timeElement = document.querySelector("#time");
	let windSpeedElement = document.querySelector("#windSpeed");
	let date = new Date(response.data.time * 1000);
	let icon = document.querySelector("#icon");

	icon.innerHTML = `<img src="${response.data.condition.icon_url}"
					 class ="weather-icon"
					/>`;

	cityElement.innerHTML = response.data.city;

	timeElement.innerHTML = formatDate(date);
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
	windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
	temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
	let apiKey = "4b0o10e6b9ct64fa67d22c773ba3160c";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
	axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-form-input");
	let cityElement = document.querySelector("#city");
	cityElement.innerHTML = searchInput.value;
	searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Durban");
