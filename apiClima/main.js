// $.ajax({
// 	url: 'city.list.json',
// 	success: function( data ) {
// 		// app.datos = data;
// 		console.log(data)
		
// 	},
// 	error: function(){
// 		alert("¡Ups! No puedo obtener información de la API");
// 	}
// });
$(document).ready(function (){
	var ciudad;
	// $.getJSON('city.list.json').then( function (resp){
	// 	console.log(resp)
	// });
	$.ajax({
		url: 'ciudades.json',
		success: function( data ) {
             ciudad = data;
			// console.log(ciudad)
			for (c of ciudad){
				document.getElementById('idciudad').innerHTML+=`<option value="${c.id}">${c.name}</option`;
				}
			// app.procesaDatos();
		}, 
		error: function(){
			alert("¡Ups! No puedo obtener información de la API");
		}
	});

	
		
});
document.getElementById('idciudad').addEventListener("change", clima );
function clima(){
	var app = {};
var x = document.getElementById("idciudad").value;
app.apikey = "3e721e227b5c28d8ff5691e4fff1c36e";
app.url = "http://api.openweathermap.org/data/2.5/weather?id="+ x +"&APPID=" + app.apikey + "&units=metric";
// api.openweathermap.org/data/2.5/weather?id=2172797 por id de ciudad
// http://api.openweathermap.org/data/2.5/group?id=524901,703448,3873544 para varias ciudades
app.cargaDatos = function(){
	$.ajax({
		url: app.url,
		success: function( data ) {
            app.datos = data;
            // console.log(data)
			app.procesaDatos();
		},
		error: function(){
			alert("¡Ups! No puedo obtener información de la API");
		}
	});
}

app.procesaDatos = function(){
	app.condicionNombre = app.datos.weather[0].main;
	app.temperatura = app.datos.main.temp;
    app.nombre = app.datos.name;
	var condicionIcono = app.datos.weather[0].icon;
	app.icono = app.obtenIcono( condicionIcono );

	app.muestra();

} 
app.muestra = function(){
	document.getElementById("ciudad").innerHTML = "El tiempo en " +app.nombre;
	document.getElementById("temperatura").innerHTML = parseInt(app.temperatura) + "º"; 
	document.getElementById("js_w_icon").innerHTML = `<i class='wi ${app.icono}'></i> 
	<p class="weather_name">${app.condicionNombre.toUpperCase()}</p>`; 

}
app.obtenIcono = function( weatherIcon ) {

	var icon;
	switch( weatherIcon ){
		case "01d":
		case "01n":
		icon = "wi-day-sunny";
		break;
		case "02d":
		case "02n":
		icon = "wi-day-cloudy";
		break;

		case "03d":
		case "03n":
		icon = "wi-cloud";
		break;

		case "04d":
		case "04n":
		icon = "wi-cloudy";
		break;

		case "09d":
		case "09n":
		icon = "wi-rain";
		break;

		case "10d":
		case "10n":
		icon = "wi-day-rain-mix";
		break;

		case "11d":
		case "11n":
		icon = "wi-thunderstorm";
		break;

		case "13d":
		case "13n":
		icon = "wi-snow";
		break;

		case "50d":
		case "50n":
		icon = "wi-fog";
		break;

		default:
		icon = "wi-day-sunny";
		break;

	}

	return icon;
}
app.cargaDatos();
}