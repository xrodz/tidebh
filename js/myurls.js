<!-- ****** JSON latest water level + station name ****** -->
var url_json_waterlevel = "https://tidesandcurrents.noaa.gov/api/datagetter?product=water_level&application=NOS.COOPS.TAC.WL&date=latest&datum=MLLW&station=<<STATIONID>>&time_zone=lst_ldt&units=english&format=json";

<!-- ****** JSON latest tide predictions ****** -->
var url_json_tidepredictions = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&date=latest&datum=MLLW&station=<<STATIONID>>&time_zone=lst_ldt&units=english&format=json&interval=1";

<!-- ****** JSON date range hi-lo tide predictions ****** -->
var url_json_hilopredictions = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=<<BDATE>>&end_date=<<EDATE>>&datum=MLLW&station=<<STATIONID>>&time_zone=lst_ldt&units=english&format=json&interval=hilo";


<!-- ****** LINK station water levels ****** -->
var url_link_station_waterlevels = "https://tidesandcurrents.noaa.gov/waterlevels.html?id=<<STATIONID>>&timezone=LST/LDT"

<!-- ****** LINK station tide predictions ****** -->
var url_link_station_tidepredictions = "https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=<<STATIONID>>&units=standard&timezone=LST/LDT&clock=12hour&datum=MLLW&action=dailychart&bdate=<<BDATE>>&edate=<<EDATE>>"
