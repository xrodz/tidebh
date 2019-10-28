var getCurrentDate = function () {
	return luxon.DateTime.local().setZone(stations_timezone);
}

var getFirstDayPredictions = function () {
	return luxon.DateTime.local().setZone(stations_timezone).toFormat("yyyyLLdd");
}

var getLastDayPredictions = function () {
	return luxon.DateTime.local().setZone(stations_timezone).plus({days: 1}).toFormat("yyyyLLdd");
}

var getStartOfMonth = function () {
	return luxon.DateTime.local().setZone(stations_timezone).startOf('month').toFormat("yyyyLLdd");
}

var getEndOfMonth = function () {
	return luxon.DateTime.local().setZone(stations_timezone).endOf('month').toFormat("yyyyLLdd");
}

var toFixed = function (n) {
	return (Math.round(n * 1000) / 1000) + '';
}

var formatTimeStamp = function (timestamp) {
	return luxon.DateTime.fromSQL(timestamp).toFormat("h:mm a");
}

var getWaterLevel = function (tide, surge) {
	var waterLevel = parseFloat(tide) + parseFloat(surge);
	return toFixed(waterLevel);
}

var getTideType = function (type) {
	if (type === "L") return "low";
	if (type === "H") return "HIGH";
}

var checkKingTideWarning = function (level) {
	if (level >= king_tide_warning_limit) return 1;
	if (level < king_tide_warning_limit) return 0;
}

var checkDryTideWarning = function (level) {
	if (level <= dry_tide_warning_limit) return 1;
	if (level > dry_tide_warning_limit) return 0;
}

function surgeHelper() {
  alert("Surge is the water level difference from predictions calculated by the moon and sun positions. Those differences can occur by wind push, currents, water dumping, etc and they change the water levels comparing to the original harmonic predictions.");
}