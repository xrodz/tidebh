var getToday = function () {
	var today = new Date,
		year = today.getFullYear(),
		month = today.getMonth() + 1,
		date = today.getDate();
	if (month < 10) month = "0" + month;
	if (date < 10) date = "0" + date;
	return "" + year + month + date;
}

var getTomorrow = function () {
	var today = new Date,
		year = today.getFullYear(),
		month = today.getMonth() + 1,
		date = today.getDate() + 1;
	if (month < 10) month = "0" + month;
	if (date < 10) date = "0" + date;
	return "" + year + month + date;
}

var toFixed = function (n) {
	return (Math.round(n * 1000) / 1000) + '';
}

var getWaterLevel = function (tide, surge) {
	var waterLevel = parseFloat(tide) + parseFloat(surge);
	return toFixed(waterLevel);
}

var getTideType = function (type) {
	if (type === "L") tideType = "low";
	if (type === "H") tideType = "HIGH";
	return tideType;
}