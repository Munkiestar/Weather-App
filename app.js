window.addEventListener('load', () => {
	let long;
	let lat;
	let tempDescription = document.querySelector('.temperature-description');
	let tempDegree = document.querySelector('.temperature-degree');
	let locationTimeZome = document.querySelector('.location-timezone');
	let tempSection = document.querySelector('.temperature');
	let temperatureSpan = document.querySelector('.temperature span');



	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;


			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/09fc849615d57999254aae7fe7dccd7d/${lat},${long}`;
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data =>{
					// console.log(data);
					const {temperature, summary, icon} = data.currently;

					// set DOM elements from the API
					tempDegree.textContent = temperature;
					tempDescription.textContent = summary;
					locationTimeZome.textContent = data.timezone;

					// formula for Celsius
					let celsius = (temperature -32) * 5/9;

					// set canvas Icon
					const canvasIcon = document.querySelector('.icon');
					setIcons(icon, canvasIcon);

					// change temperature to Celsius/Farenheit
					tempSection.addEventListener('click', () =>{
						if(temperatureSpan.textContent === 'F'){
							temperatureSpan.textContent = 'C';
							tempDegree.textContent = Math.floor(celsius);
						} else{
							temperatureSpan.textContent = 'F'
							tempDegree.textContent = temperature;
						}
					});
				});
		});

	} else{
		h1.textContent = 'Please allow your Geo Loaction for a proper use. Thank you.'
	}


	function setIcons(icon, iconID){
		const skycons = new Skycons({color:'white'});
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}

});	