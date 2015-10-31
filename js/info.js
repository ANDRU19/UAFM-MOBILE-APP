// Created by Andrew Rybachuk for UAFM RADIO

var baseUrl = 'http://live.uafm.org:9001/json.xsl?';
var mount = '/uafm';
var logo = 'img/logo.svg';

// Function fo parsing artis logo for Last FM service. 
function artistInfo(artist_info) {

	$.ajax({
		url: "http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=61cca8da7d65c64a637ea2187ecf9bcd&artist="+artist_info[0],
		type: 'GET',
		dataType: "xml",
		error: function() {
			$(".bg").css({
				"background-image": "url(" + logo + ")",
				"background-repeat": "no-repeat",
				"height": "100%",
				"background-position": "center center"
			});	
		},

	}).done(function(xml) {
		$xml = $(xml);
			item = $xml.find('image[size="mega"]')[0].innerHTML;
		
		// If there no any photo from API, paste radio logo instead

		if (item =='undefined' || artist_info[0] =='Domen' || item == "") {
			
				$(".bg").css({
				"background-image": "url(" + logo + ")",
				"background-repeat": "no-repeat",
				"height": "100%",
				"background-position": "center center"
			});

		} else {
				$(".bg").css({
				"background-image": "url(" + item + ")",
				"background-repeat": "no-repeat",
				"height": "100%",
				"background-position": "center center"
			});
		
		}
	});

	
}


function parseMusic(data) {
	
	info = (data[mount].title).split('-');
// Checking if son has the right name structure	
	

		artist_info = new Array();
		if (info[1]) {
		artist_info[0] = info[0].replace(' and ', '');
		artist_info[1] = info[1].replace(' and ', '');

	}
		artist_info[2] = data[mount].title;
	

// If there the same artis then no reason to update function of prsing artist photo
	//if ($(".song").text() !== artist_info[2]) {
		artistInfo(artist_info);
	//}

	$(".song").text(data[mount].title);
//	$("#listeners").text(data[mount].listeners);

}

function json() {

	$.getJSON(
		baseUrl + "mount=" + mount + "&callback=?",
		function(data) {
			parseMusic(data);

		}
	);

	setTimeout("json()", 16000);

}
console.log($(".song").text());
json();