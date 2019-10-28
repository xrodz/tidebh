<!-- ****** stations IDs & names ****** -->
var station0id = "8722670"; <!-- ****** station for real-time water levels ****** -->

var station1id = "8722669"; <!-- ****** station for predictions ****** -->
var station1name = "Lake Worth ICW"; <!-- ****** station for predictions ****** -->

var station2id = "8722802"; <!-- ****** station for predictions ****** -->
var station2name = "Lake Wyman"; <!-- ****** station for predictions ****** -->

var stations_timezone = "America/New_York"; <!-- ****** stations timezone ****** -->



<!-- ****** JSON latest water level + station name ****** -->
var url_json_waterlevel = "https://tidesandcurrents.noaa.gov/api/datagetter?product=water_level&application=NOS.COOPS.TAC.WL&date=latest&datum=MLLW&station=<<STATIONID>>&time_zone=lst_ldt&units=english&format=json";

<!-- ****** JSON latest tide predictions ****** -->
var url_json_tidepredictions = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&date=latest&datum=MLLW&station=<<STATIONID>>&time_zone=lst_ldt&units=english&format=json&interval=1";

<!-- ****** JSON date range hi-lo tide predictions ****** -->
var url_json_hilopredictions = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=<<BDATE>>&end_date=<<EDATE>>&datum=MLLW&station=<<STATIONID>>&time_zone=lst_ldt&units=english&format=json&interval=hilo";


<!-- ****** LINK station water levels ****** -->
var url_link_station_waterlevels = "https://tidesandcurrents.noaa.gov/waterlevels.html?id=<<STATIONID>>&timezone=LST/LDT";

<!-- ****** LINK station tide predictions ****** -->
var url_link_station_tidepredictions = "https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=<<STATIONID>>&units=standard&timezone=LST/LDT&clock=12hour&datum=MLLW&action=dailychart&bdate=<<BDATE>>&edate=<<EDATE>>";

<!-- ****** LINK google drive tide observations ****** -->
var url_link_tideobservations = "https://docs.google.com/spreadsheets/d/1C4ZcLu-jInXRscMxP8JZBQ1bXHWmvbjCtxdGB6KHitQ";



<!-- ****** Extreme Tides ****** -->
var king_tide_warning_limit = 4; <!-- ****** usually 4ft ****** -->
var king_tide_watch_limit = 3.8; <!-- ****** usually 3.8ft ****** -->
var dry_tide_watch_limit = 0; <!-- ****** usually <0ft ****** -->
var dry_tide_warning_limit = -0.5; <!-- ****** usually <-0.5ft ****** -->

var king_tide_warning_text = "King-Tide Warning!";
var king_tide_watch_text = "King-Tide Watch!";
var dry_tide_watch_text =  "Dry-Tide Watch!";
var dry_tide_warning_text =  "Dry-Tide Warning!";

var king_tide_warning_limit_display = "Warning if King-Tide >" + king_tide_warning_limit + "ft";
var king_tide_watch_limit_display = "Watch if King-Tide >" + king_tide_watch_limit + "ft";
var dry_tide_watch_limit_display =  "Watch if Dry-Tide <" + dry_tide_watch_limit + "ft";
var dry_tide_warning_limit_display =  "Warning if Dry-Tide <" + dry_tide_warning_limit + "ft";



<!-- ****** JSON latest release ****** -->
var url_link_latest_release = "https://api.github.com/repos/xrodz/tidebh/releases/latest";
