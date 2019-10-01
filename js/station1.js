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
												kt: checkKingTide(getWaterLevel(el.v, currentSurge)),
												dt: checkDryTide(getWaterLevel(el.v, currentSurge)),
												future: el.t.slice(8,10) - getToday().slice(6)
											};
										});

										predictions.push(currentPrediction);

										predictions.sort(function (a, b) {
											if (a.v > b.v) return -1;
											if (a.v < b.v) return 1;
											return 0;
										});

										var kingTideWarning = null;
										if (checkKingTide(predictions[0].v)) {var kingTideWarning = king_tide_warning_text;}
										var dryTideWarning = null;
										if (checkDryTide(predictions[predictions.length-1].v)) {var dryTideWarning = dry_tide_warning_text;}

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
													if (p.kt || p.dt) {
														htmlString +=
														'<tr style="color: red;">' +
														 '<td>' + moment(p.t).format("h:mm a") + '</td>' +
														 '<td>' + p.y + '</td>' +
														 '<td>' + Number(p.d).toFixed(1) + '</td>' +
														 '<td>' + Number(p.v).toFixed(1) + '</td>' +
														'<tr>';
													} else {
															htmlString +=
															'<tr>' +
															 '<td>' + moment(p.t).format("h:mm a") + '</td>' +
															 '<td>' + p.y + '</td>' +
															 '<td>' + Number(p.d).toFixed(1) + '</td>' +
															 '<td>' + Number(p.v).toFixed(1) + '</td>' +
															'<tr>';
													}
												} else {
														if (p.kt || p.dt) {
															htmlString +=
															'<tr style="background-color: #D5D8DC;color: red;">' +
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
											}
										});
										
										$('#station1 tbody').html(htmlString);
										
										var firstDay = luxon.DateTime.local().setZone("America/New_York").startOf('month').toFormat("yyyyLLdd");
										var lastDay = luxon.DateTime.local().setZone("America/New_York").endOf('month').toFormat("yyyyLLdd");
										var url_link_station = url_link_station_tidepredictions.replace(/<<STATIONID>>/g, station1id).replace(/<<BDATE>>/g, firstDay).replace(/<<EDATE>>/g, lastDay);
										document.getElementById("station1url").setAttribute("href",url_link_station);
										document.getElementById("tideobservations1url").setAttribute("href",url_link_tideobservations);					

										$('#station1id').text(station1id);
										$('#station1name').text(station1name);
										$('#kingTideWarning1').text(kingTideWarning);
										$('#dryTideWarning1').text(dryTideWarning);
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
