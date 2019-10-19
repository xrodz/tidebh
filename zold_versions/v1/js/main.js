(function ($) {
	$(document).ready(function () {
		var url_1 = "https://tidesandcurrents.noaa.gov/api/datagetter?product=water_level&application=NOS.COOPS.TAC.WL&date=latest&datum=MLLW&station=8722670&time_zone=lst_ldt&units=english&format=json";
		var url_2 = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&date=latest&datum=MLLW&station=8722670&time_zone=lst_ldt&units=english&format=json";
		var url_3 = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&date=latest&datum=MLLW&station=8722669&time_zone=lst_ldt&units=english&format=json&interval=1";
		var url_4 = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=<<TODAY>>&end_date=<<TODAY>>&datum=MLLW&station=8722669&time_zone=lst_ldt&units=english&format=json&interval=hilo";

		var getToday = function () {
			var today = new Date,
				year = today.getFullYear(),
				month = today.getMonth() + 1,
				date = today.getDate();
			if (month < 10) month = "0" + month;
			if (date < 10) date = "0" + date;
			return "" + year + month + date;
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

								var currentTime = t3,
									waterLevel = parseFloat(v3) + (parseFloat(v1) - parseFloat(v2));
								waterLevel = Math.round(waterLevel * 1000) / 1000;
								waterLevel = waterLevel.toString();

								$.ajax({
									method: 'GET',
									url: url_4.replace(/<<TODAY>>/g, getToday()),
									success: function (response) {
										var predictions = response.predictions.map(function (el) {
											return {t: el.t, v: el.v};
										});
										predictions.push({
											t: currentTime,
											v: waterLevel
										});
										
										predictions.sort(function (a, b) {
											if (a.t < b.t) return -1;
											if (a.t > b.t) return 1;
											return 0;
										});

										var htmlString = '';
										predictions.forEach(function (p) {
											htmlString +=
											'<tr>' +
												'<td>' + p.t + '</td>' +
												'<td>' + p.v + '</td>' +
											'<tr>';
										});
										$('#container tbody').html(htmlString);
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