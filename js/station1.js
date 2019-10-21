(function ($) {
	$(document).ready(function () {
		
		var t1, v1, v2, t3, v3;
		t1 = v1 = v2 = t3 = v3 = null;

		$.ajax({
			method: 'GET',
			url: url_json_waterlevel.replace(/<<STATIONID>>/g, station0id),
			success: function (response) {
				t1 = response.data[0].t;
				v1 = response.data[0].v;

				$.ajax({
					method: 'GET',
					url: url_json_tidepredictions.replace(/<<STATIONID>>/g, station0id),
					success: function (response) {
						v2 = response.predictions.filter(function (el) {
							if (el.t === t1) {
								return el;
							}
						})[0].v;

						$.ajax({
							method: 'GET',
							url: url_json_tidepredictions.replace(/<<STATIONID>>/g, station1id),
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
									url: url_json_hilopredictions.replace(/<<STATIONID>>/g, station1id).replace(/<<BDATE>>/g, getToday()).replace(/<<EDATE>>/g, getTomorrow()),
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
										
										var date = new Date(), y = date.getFullYear(), m = date.getMonth();
										var firstDay = moment(new Date(y, m, 1)).format("YYYYMMDD");
										var lastDay = moment(new Date(y, m + 1, 0)).format("YYYYMMDD");
										var url_link_station = url_link_station_tidepredictions.replace(/<<STATIONID>>/g, station1id).replace(/<<BDATE>>/g, firstDay).replace(/<<EDATE>>/g, lastDay);
										document.getElementById("station1url").setAttribute("href",url_link_station);	
										document.getElementById("tideobservations1url").setAttribute("href",url_link_tideobservations);					

										$('#station1id').text(station1id);
										$('#station1name').text(station1name);
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
