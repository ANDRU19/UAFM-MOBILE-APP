
var baseUrl ='http://live.uafm.org:9001/json.xsl?';
var mount = '/uafm';

function artistInfo(artist_info){
	
var googleAPI = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=фото исполнителя "+artist_info[2]+"&callback=?";
$.getJSON(googleAPI, function (json) { 
$( ".bg" ).css({"background":"url("+json.responseData.results[0].unescapedUrl+")","background-repeat":"no-repeat","height":"100%","background-position":"center center"});	
});

}

 function parseMusic (data) {

$(".song").text(data[mount].title);
$("#listeners").text(data[mount].listeners); 
 dat = (data[mount].title).split('-');
artist_info = new Array(); 
artist_info[0] = dat[0].replace(' and ','');
artist_info[1] = dat[1].replace(' and ','');
artist_info[2] = data[mount].title;


 artistInfo(artist_info);
}
	function json () { 

	$.getJSON(
	     baseUrl+"mount="+mount+"&callback=?", 
	     function(data){	
             parseMusic (data);
         
                 } 
);

 setTimeout("json()", 16000);

}
		
json();




 







