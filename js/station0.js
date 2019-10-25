(function ($) {
	$(document).ready(function () {
		
		var t1, v1, v2;
		t1 = v1 = v2 = null;

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

						var currentSurge = v1 - v2;
						var	currentDate = luxon.DateTime.local().setZone("America/New_York");
						var url_link_station = url_link_station_waterlevels.replace(/<<STATIONID>>/g, station0id);
						document.getElementById("station0url").setAttribute("href",url_link_station);					

						$('#station0id').text(station0id);

						$('#current-surge').text((currentSurge).toFixed(1));
						$('#current-date').text(currentDate.toFormat("ccc, LLL d, yyyy (ZZZZ)"));
						$('#current-year').text(currentDate.toFormat("yyyy"));
					}
				});
			}
		});
	});
})(jQuery);
