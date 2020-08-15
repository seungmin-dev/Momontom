const API_KEY = '77371d8edaa624e1334298cf740c7bce';
const COORDS = 'coords';
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
	).then(function(response) {
		return response.json()
	}).then(function(json) {
		const temperature = json.main.temp;
		const place = json.name;
		weather.innerHTML = `${temperature} @ ${place}`
	})
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handlerGeoSuccess(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude // 변수 이름과 저장할 데이터 이름이 같으면 이렇게 쓸 수 있음
	}
	saveCoords(coordsObj);
  getWeather(latitude, longitude);
};

function handlerGeoError() {
	console.log("Cant access geo location");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handlerGeoSuccess, handlerGeoError);
}

function loadCoords() {
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null) {
		askForCoords();
	} else {
		const parsedCoords = JSON.parse(loadedCoords);
	  getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function init() {
	loadCoords();
}
init();
