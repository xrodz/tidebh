(function ($) {
	$(document).ready(function () {
		
		var t1, v1, v2, t3, v3, direction;
		t1 = v1 = v2 = t3 = v3 = direction = null;

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

								response.predictions.pop();
								response.predictions.pop();
								var prediction_pre = response.predictions.pop();
								if (prediction.v - prediction_pre.v > 0) {direction = "&uarr;&uarr;&uarr;"} else {if (prediction.v - prediction_pre.v < 0) {direction = "&darr;&darr;&darr;"} else {direction = "==="};};

								var currentSurge = v1 - v2,
									currentTime = t3,
									currentWaterLevel = getWaterLevel(v3, currentSurge),
									currentPrediction = {
										t: currentTime,
										y: direction,
										d: v3,
										v: currentWaterLevel,
										lineStyle: now
									};

								$.ajax({
									method: 'GET',
									url: url_json_hilopredictions.replace(/<<STATIONID>>/g, station1id).replace(/<<BDATE>>/g, getFirstDayPredictions()).replace(/<<EDATE>>/g, getLastDayPredictions()),
									success: function (response) {
										window.predictions = response.predictions.map(function (el) {
											return {
												t: el.t,
												y: getTideType(el.type),
												d: el.v,
												v: getWaterLevel(el.v, currentSurge),
												lineStyle: getLineStyle1(el.t, el.v, currentSurge)
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
											htmlString +=
											'<tr ' + p.lineStyle + '>' +
											 '<td>' + formatTimeStamp(p.t) + '</td>' +
											 '<td>' + p.y + '</td>' +
											 '<td>' + Number(p.d).toFixed(1) + '</td>' +
											 '<td>' + Number(p.v).toFixed(1) + '</td>' +
											'<tr>';
										});
										
										var url_link_station = url_link_station_tidepredictions.replace(/<<STATIONID>>/g, station1id).replace(/<<BDATE>>/g, getStartOfMonth()).replace(/<<EDATE>>/g, getEndOfMonth());

										$('#station1id').text(station1id);
										$('#station1name').text(station1name);
										document.getElementById("station1url").setAttribute("href",url_link_station);
										document.getElementById("tideobservations1url").setAttribute("href",url_link_tideobservations);					

										$('#station1 tbody').html(htmlString);


										<!-- ****** extreme-tide alerts ****** -->
										for(var i = 0; i < predictions.length; i++){
										   if (predictions[i].t <= currentTime) {
										     predictions.splice(i, 1); 
										     i--;
										   }
										}

										predictions.sort(function (a, b) {
											return b.v - a.v;
										});

										var kingTideWarning = null;
										if (checkKingTideWarning(predictions[0].v)) {var kingTideWarning = king_tide_warning_text;}

										var kingTideWatch = null;
										if (checkKingTideWatch(predictions[0].v)) {var kingTideWatch = king_tide_watch_text;}

										var dryTideWatch = null;
										if (checkDryTideWatch(predictions[predictions.length-1].v)) {var dryTideWatch = dry_tide_watch_text;}

										var dryTideWarning = null;
										if (checkDryTideWarning(predictions[predictions.length-1].v)) {var dryTideWarning = dry_tide_warning_text;}

										$('#kingTideWarning1').text(kingTideWarning);
										$('#kingTideWatch1').text(kingTideWatch);
										$('#dryTideWatch1').text(dryTideWatch);
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
