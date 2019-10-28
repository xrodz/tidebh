(function ($) {
	$(document).ready(function () {

		var t1, v1, v2, release;
		t1 = v1 = v2 = release = null;

		$.ajax({
			method: 'GET',
			url: url_link_latest_release,
			success: function (response) {
				release = response.tag_name;
			}
		});

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
						var url_link_station = url_link_station_waterlevels.replace(/<<STATIONID>>/g, station0id);
						
						$('#station0id').text(station0id);
						document.getElementById("station0url").setAttribute("href",url_link_station);					

						$('#current-surge').text((currentSurge).toFixed(1));
						
						$('#kingTideWarningLevel').text(king_tide_warning_limit_display);
						$('#dryTideWarningLevel').text(dry_tide_warning_limit_display);
						
						$('#current-date').text(getCurrentDate().toFormat("ccc, LLL d, yyyy (ZZZZ)"));
						$('#current-year').text(getCurrentDate().toFormat("yyyy"));
						$('#current-release').text(release);
					}
				});
			}
		});
	});
})(jQuery);
