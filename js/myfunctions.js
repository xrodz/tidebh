var getToday = function () {
	return luxon.DateTime.local().setZone("America/New_York").toFormat("yyyyLLdd");
}

var getTomorrow = function () {
	return luxon.DateTime.local().setZone("America/New_York").plus({days: 1}).toFormat("yyyyLLdd");
}

var toFixed = function (n) {
	return (Math.round(n * 1000) / 1000) + '';
}

var getWaterLevel = function (tide, surge) {
	var waterLevel = parseFloat(tide) + parseFloat(surge);
	return toFixed(waterLevel);
}

var getTideType = function (type) {
	if (type === "L") return "low";
	if (type === "H") return "HIGH";
}

var checkKingTide = function (level) {
	if (level >= king_tide_min) return 1;
	if (level < king_tide_min) return 0;
}

var checkDryTide = function (level) {
	if (level <= dry_tide_max) return 1;
	if (level > dry_tide_max) return 0;
}

function surge() {
  alert("Surge is the water level difference from predictions calculated by the moon and sun positions. Those differences can occur by wind push, currents, water dumping, etc and they change the water levels comparing to the original harmonic predictions.");
}