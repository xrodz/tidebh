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
	if (type === "L") return "low";
	if (type === "H") return "HIGH";
}

var checkKingTide = function (level) {
	if (level >= king_tide_min) return "King-Tide Warning! (>" + king_tide_min + "ft)";
	if (level < king_tide_min) return "";
}

var checkDryTide = function (level) {
	if (level <= dry_tide_max) return "Dry-Tide Warning! (<" + dry_tide_max + "ft)";
	if (level > dry_tide_max) return "";
}
