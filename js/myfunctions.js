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
	if (level >= king_tide_warning_limit) {
		return 1;
	} else {
		return 0;
	}
}

var checkKingTideWatch = function (level) {
	if (level >= king_tide_watch_limit && level < king_tide_warning_limit) {
		return 1;
	} else {
		return 0;
	}
}

var checkDryTideWatch = function (level) {
	if (level <= dry_tide_watch_limit && level > dry_tide_warning_limit) {
		return 1;
	} else {
		return 0;
	}
}

var checkDryTideWarning = function (level) {
	if (level <= dry_tide_warning_limit) {
		return 1;
	} else {
		return 0;
	}
}

var now = 'style="font-weight: bold;background-color: #2e96d3;color: white;"';
var firstday_normal = 'style="background-color: #D5D8DC;color: black;"';
var firstday_watch = 'style="background-color: #D5D8DC;color: #FF8C00;"';
var firstday_warning = 'style="background-color: #D5D8DC;color: red;"';
var nextdays_normal = '';
var nextdays_watch = 'style="color: #FF8C00;"';
var nextdays_warning = 'style="color: red;"';			

var getLineStyle = function (time, value, currentSurge) {
	if (time.slice(8,10) - getFirstDayPredictions().slice(6) === 0) {
		if (checkKingTideWarning(getWaterLevel(value, currentSurge)) || checkDryTideWarning(getWaterLevel(value, currentSurge))) {
			return firstday_warning;
		} else {
			if (checkKingTideWatch(getWaterLevel(value, currentSurge)) || checkDryTideWatch(getWaterLevel(value, currentSurge))) {
				return firstday_watch;
			} else {
				return firstday_normal;				
			}
		}
	} else {
		if (checkKingTideWarning(getWaterLevel(value, currentSurge)) || checkDryTideWarning(getWaterLevel(value, currentSurge))) {
			return nextdays_warning;
		} else {
			if (checkKingTideWatch(getWaterLevel(value, currentSurge)) || checkDryTideWatch(getWaterLevel(value, currentSurge))) {
				return nextdays_watch;
			} else {
				return nextdays_normal;				
			}
		}
	}
}

function surgeHelper() {
  alert("Surge is the water level difference from predictions calculated by the moon and sun positions. Those differences can occur by wind push, currents, water dumping, etc and they change the water levels comparing to the original harmonic predictions.");
}
