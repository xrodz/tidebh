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
							url: url_json_tidepredictions.replace(/<<STATIONID>>/g, station2id),
							success: function (response) {
								var prediction = response.predictions.pop();
								t3 = prediction.t;
								v3 = prediction.v;

								var currentSurge = v1 - v2,
									currentTime = t3,
									currentWaterLevel = getWaterLevel(v3, currentSurge),
									currentPrediction = {
										t: currentTime,
										y: "NOW",
										d: v3,
										v: currentWaterLevel,
										lineStyle: now
									};

								$.ajax({
									method: 'GET',
									url: url_json_hilopredictions.replace(/<<STATIONID>>/g, station2id).replace(/<<BDATE>>/g, getFirstDayPredictions()).replace(/<<EDATE>>/g, getLastDayPredictions()),
									success: function (response) {
										window.predictions = response.predictions.map(function (el) {
											return {
												t: el.t,
												y: getTideType(el.type),
												d: el.v,
												v: getWaterLevel(el.v, currentSurge),
												lineStyle: getLineStyle2(el.t, el.v, currentSurge)
											};
										});

										predictions.push(currentPrediction);

										predictions.sort(function (a, b) {
											if (a.v > b.v) return -1;
											if (a.v < b.v) return 1;
											return 0;
										});

										var kingTideWarning = null;
										if (checkKingTideWarning(predictions[0].v)) {var kingTideWarning = king_tide_warning_text;}

										var kingTideWatch = null;
										if (checkKingTideWatch(predictions[0].v)) {var kingTideWatch = king_tide_watch_text;}

										var dryTideWatch = null;
										if (checkDryTideWatch(predictions[predictions.length-1].v)) {var dryTideWatch = dry_tide_watch_text;}

										var dryTideWarning = null;
										if (checkDryTideWarning(predictions[predictions.length-1].v)) {var dryTideWarning = dry_tide_warning_text;}
										
										predictions.sort(function (a, b) {
											if (a.t < b.t) return -1;
											if (a.t > b.t) return 1;
											return 0;
										});

										var htmlString = '';
										predictions.forEach(function (p) {
											htmlString +=
											'<tr ' + p.lineStyle + '>' +
											 '<td>' + formatTimeStamp(p.t) + '</td>' +
											 '<td>' + p.y + '</td>' +
											 '<td>' + Number(p.d).toFixed(1) + '</td>' +
											 '<td>' + Number(p.v).toFixed(1) + '</td>' +
											'<tr>';
										});

										var url_link_station = url_link_station_tidepredictions.replace(/<<STATIONID>>/g, station2id).replace(/<<BDATE>>/g, getStartOfMonth()).replace(/<<EDATE>>/g, getEndOfMonth());

										$('#station2id').text(station2id);
										$('#station2name').text(station2name);
										document.getElementById("station2url").setAttribute("href",url_link_station);
										document.getElementById("tideobservations2url").setAttribute("href",url_link_tideobservations);					

										$('#station2 tbody').html(htmlString);
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
