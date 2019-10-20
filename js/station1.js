(function ($) {
	$(document).ready(function () {
		var url_1 = "https://tidesandcurrents.noaa.gov/api/datagetter?product=water_level&application=NOS.COOPS.TAC.WL&date=latest&datum=MLLW&station=8722670&time_zone=lst_ldt&units=english&format=json";
		var url_2 = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&date=latest&datum=MLLW&station=8722670&time_zone=lst_ldt&units=english&format=json";
		var url_3 = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&date=latest&datum=MLLW&station=8722669&time_zone=lst_ldt&units=english&format=json&interval=1";
		var url_4 = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=<<BDATE>>&end_date=<<EDATE>>&datum=MLLW&station=8722669&time_zone=lst_ldt&units=english&format=json&interval=hilo";

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

		var t1, v1, v2, t3, v3;
		t1 = v1 = v2 = t3 = v3 = null;

		$.ajax({
			method: 'GET',
			url: url_1,
			success: function (response) {
				t1 = response.data[0].t;
				v1 = response.data[0].v;

				$.ajax({
					method: 'GET',
					url: url_2,
					success: function (response) {
						v2 = response.predictions.filter(function (el) {
							if (el.t === t1) {
								return el;
							}
						})[0].v;

						$.ajax({
							method: 'GET',
							url: url_3,
							success: function (response) {
								var prediction = response.predictions.pop();
								t3 = prediction.t;
								v3 = prediction.v;

								var currentSurge = v1 - v2,
									currentTime = t3,
									currentWaterLevel = getWaterLevel(v3, currentSurge),
									currentPrediction = {
										t: currentTime,
										d: v3,
										v: currentWaterLevel,
										current: true
									};

								$.ajax({
									method: 'GET',
									url: url_4.replace(/<<BDATE>>/g, getToday()).replace(/<<EDATE>>/g, getTomorrow()),
									success: function (response) {
										window.predictions = response.predictions.map(function (el) {
											return {
												t: el.t,
												y: getTideType(el.type),
												d: el.v,
												v: getWaterLevel(el.v, currentSurge),
												future: el.t.slice(8,10) - getToday().slice(6)
											};
										});

										predictions.push(currentPrediction);

										predictions.sort(function (a, b) {
											if (a.t < b.t) return -1;
											if (a.t > b.t) return 1;
											return 0;
										});

										$('#current-surge').text((currentSurge).toFixed(1));
										$('#current-date').text(moment(currentTime).format("ddd, MMM Do, YYYY"));
										$('#current-year').text(moment(currentTime).format("YYYY"));


										var url_station_link1 = "https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8722669&units=standard&timezone=LST/LDT&clock=12hour&datum=MLLW&action=dailychart&bdate=<<FIRST_DAY>>&edate=<<LAST_DAY>>";
										var date = new Date(), y = date.getFullYear(), m = date.getMonth();
										var firstDay = moment(new Date(y, m, 1)).format("YYYYMMDD");
										var lastDay = moment(new Date(y, m + 1, 0)).format("YYYYMMDD");
										var url_station_link2 = url_station_link1.replace(/<<FIRST_DAY>>/g, firstDay).replace(/<<LAST_DAY>>/g, lastDay);
										document.getElementById("url_station1_link").setAttribute("href",url_station_link2);


										var htmlString = '';
										predictions.forEach(function (p) {
											if (p.current) {
												htmlString +=
												'<tr style="font-weight: bold;background-color: #2e96d3;color: #ffffff;">' +
												 '<td>' + moment(p.t).format("h:mm a") + '</td>' +
												 '<td>NOW</td>' +
												 '<td>' + Number(p.d).toFixed(1) + '</td>' +
												 '<td>' + Number(p.v).toFixed(1) + '</td>' +
												'<tr>';
											} else {
												if (p.future) {
													htmlString +=
													'<tr>' +
													 '<td>' + moment(p.t).format("h:mm a") + '</td>' +
													 '<td>' + p.y + '</td>' +
													 '<td>' + Number(p.d).toFixed(1) + '</td>' +
													 '<td>' + Number(p.v).toFixed(1) + '</td>' +
													'<tr>';
												} else {
														htmlString +=
														'<tr style="background-color: #D5D8DC;color: #000000;">' +
														 '<td>' + moment(p.t).format("h:mm a") + '</td>' +
														 '<td>' + p.y + '</td>' +
														 '<td>' + Number(p.d).toFixed(1) + '</td>' +
														 '<td>' + Number(p.v).toFixed(1) + '</td>' +
														'<tr>';
												}
											}
										});
										$('#station1 tbody').html(htmlString);
									}
								});
							}
						});
					}
				});
			}
		});
	});
})(jQuery);
