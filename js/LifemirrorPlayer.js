/**
 * A classy way to play HTML5 videos on a loop without gaps
 * @author LifeMirror http://www.lifemirror.org/
 * @constructor
 */

 /**
 * @param playlist An array of URLs to be played - see documentation for details
 * @param container The HTML ID of the element to insert videos into
 * @param baseurl The base URL to append to videos
 * @param options A list of additional <video> options, if any
 */
 function LifemirrorPlayer(){}
 
 LifemirrorPlayer.prototype.init = function(playlist, latList, lngList, timeList, durationList, annotationlist, annotationTextList, edgeList, weightList, container, baseurl, options) {

	this.playlist   = playlist;
    this.container  = container;
    this.baseurl    = baseurl;
    this.options    = options;
    this.preloaded  = 0;
	this.annotationlist = annotationlist;
	this.annotationTextList = annotationTextList;
	this.timeList = timeList;
	this.durationList = durationList;
	this.latList = latList;
	this.lngList = lngList;
	this.edgeList = edgeList;
	this.weightList = weightList;
	
	
	/*this.marker0 = google.maps.event.createMarker({
			position: new google.maps.LatLng(33.808678, -117.918921),
			map: map,
			icon: "http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png"
			}, "<h1>Marker 0</h1><p>This is the home marker.</p>");*/

	
	//marker = new google.maps.Marker( {position: myLatLng, map: map} );
	
}


var lifemirror;
var playingNow;


LifemirrorPlayer.prototype.preloadVideos = function() {
    for(var index=0;index<this.playlist.length;index++)
	//for(var index in this.playlist)
    {
        // Prepare HTML to insert
        // This is necessary to prevent the browser closing tags
        var htmlToInsert = "<video controls height='50%' preload oncanplaythrough='lifemirror.preloaderCallback()' onpause='lifemirror.videoCallback(\""+this.playlist[index]+"\")' id='"+ this.playlist[index]+"' style='display:none' "+this.options+">";
        //htmlToInsert += "<source src='"+Lifemirror.baseurl+Lifemirror.playlist[index]+"/video.mp4' type='video/mp4'>";
        //htmlToInsert += "<source src='"+Lifemirror.baseurl+Lifemirror.playlist[index]+"/video.ogg' type='video/ogg'>";
		htmlToInsert += "<source src='"+this.playlist[index]+"' type='video/mp4'>";
        //htmlToInsert += "<source src='"+Lifemirror.playlist[index]+"' type='video/ogg'>";
        htmlToInsert += "</video>";
		
		var annotationHtmlToInsert = "<span \" class=\"list-group-item\">";
		annotationHtmlToInsert += "<a href=\"javascript:void(0)\" id='"+this.annotationlist[index]+"' title='"+this.annotationTextList[index]+"' onclick='lifemirror.playVideo(\""+this.playlist[index]+"\")'>";
		//onclick='clicked("+this+");'
		annotationHtmlToInsert += this.annotationlist[index]+" ("+this.weightList[index]+")";
		//annotationHtmlToInsert += "onclick='lifemirror.videoCallback(\""+this.playlist[index]+"\")'"
		//annotationHtmlToInsert +="<br>"
		//annotationHtmlToInsert += this.annotationTextList[index];
		annotationHtmlToInsert += "</a>";
		//annotationHtmlToInsert += '<a href="javascript:void(0)" id="recommend" name="'+this.edgeList[index]+'">Recommend</a>';
		//annotationHtmlToInsert += '<a href="javascript:void(0)" onclick="recommend(\"'+this.edgeList[index]+'\")">Recommend</a>';
		
		/*annotationHtmlToInsert += "<select id=\""+this.edgeList[index]+"\" class=\"1-n\"></select>";
		annotationHtmlToInsert += "<a href=\"javascript:void(0)\" id=\""+this.edgeList[index]+"\" onclick='recommend(\""+this.edgeList[index]+"\")'>Recommend</a>";*/
		
		var edge = this.edgeList[index];
		
		annotationHtmlToInsert += "<span class=\"rating\"><input type=\"radio\" name=\""+edge+"\" id=\"4_"+edge+"_stars\" value=\"4\" onclick=\"recommend("+edge+",4)\"> <label class=\"lbl"+edge+" stars\" for=\"4_"+edge+"_stars\"></label> <input type=\"radio\" name=\""+edge+"\" id=\"3_"+edge+"_stars\" value=\"3\" onclick=\"recommend("+edge+",3)\"> <label class=\"lbl"+edge+" stars\" for=\"3_"+edge+"_stars\"></label> <input type=\"radio\" name=\""+edge+"\" id=\"2_"+edge+"_stars\" value=\"2\" onclick=\"recommend("+edge+",2)\"> <label class=\"lbl"+edge+" stars\" for=\"2_"+edge+"_stars\"></label> <input type=\"radio\" name=\""+edge+"\" id=\"1_"+edge+"_stars\" value=\"1\" onclick=\"recommend("+edge+",1)\"> <label class=\"lbl"+edge+" stars\" for=\"1_"+edge+"_stars\"></label> <input type=\"radio\" name=\""+edge+"\" id=\"0_"+edge+"_stars\" value=\"0\" onclick=\"recommend("+edge+",0)\" required> <label class=\"lbl"+edge+" stars\" for=\"0_"+edge+"_stars\"></label></span></span>";
		
		
		
		
		var url = this.playlist[index];
		var filename = url.substring(url.lastIndexOf('/')+1);
		filename = filename.substr(0, filename.indexOf('#')); 
		console.log("FILENAME: "+filename);
		var num = +this.durationList[index] + +this.timeList[index];
		
		var videoCaption = "<h4 id='"+ this.timeList[index]+"' style='display:none'>Showing "+filename+" from "+ this.timeList[index]+" secs to " +num+" secs. </h4> <br>"
		
        // Insert the HTML
		document.getElementById("videonamedisplay").innerHTML += videoCaption;
        document.getElementById("videodisplay").innerHTML += htmlToInsert;
		document.getElementById("annotationdisplay").innerHTML +=  annotationHtmlToInsert;
		//document.getElementById("star_rating").innerHTML +=  star_ratingHtmlToInsert;
		
		/*if((index+1)>=this.playlist.length){
				
			console.debug("INDEX: "+index);
			console.debug("LENGTH: "+this.playlist.length);
			document.getElementById("annotationdisplay").innerHTML += "<span class=\"list-group-item active\" id='end' style='display:block; line-height:30px;'> End of Adaptive Video </span>";
		}*/
		
    }
	
	
}

LifemirrorPlayer.prototype.startPlaying = function() {
    var object = document.getElementById(this.playlist[0]);
	var annObject = document.getElementById(this.annotationlist[0]);
	var name = document.getElementById(this.timeList[0]);
	updateMap(this.latList[0],this.lngList[0]);
    object.style.display = 'inline';
	name.style.display = 'inline';
	//annObject.style.display = 'inline';
	annObject.style.backgroundColor = '#5BC0DE';
	annObject.style.color = '#333';
	playingNow = this.playlist[0];
    //object.play();
}

function clicked(item) {
    alert($(item).attr("id"));
	lifemirror.videoCallback($(item).attr("id"));
}


   
   
LifemirrorPlayer.prototype.playVideo = function(id) {
	
    //var pausetime = document.getElementById(id).currentTime;
	//console.log(pausetime);
	//var start_time = id.match(/#t=(.*),/);
	//var end_time = id.match(/,(.*)/);
	//alert (start_time[1]+","+end_time[1]);
	
	//if(pausetime>=end_time[1]) {
		document.getElementById(playingNow).pause();
		var index = this.playlist.indexOf(playingNow);
		//console.debug("pausetime>=19");
		//console.debug("INDEX: "+index);
		//console.debug("LENGTH: "+this.playlist.length);
		//if(index+1 < this.playlist.length){
			// Hide current object
			document.getElementById(playingNow).style.display = 'none';
			document.getElementById(this.timeList[index]).style.display = 'none';

			
			
			
			// hide the previous annotation
			//document.getElementById(Lifemirror.annotationlist[index-1]).style.display = 'none';
			document.getElementById(this.annotationlist[index]).style.backgroundColor = 'transparent';
			//document.getElementById(this.annotationlist[index]).style.color = '#FFFFFF';
			//index = 0;

			// Find next object in array
			index = this.playlist.indexOf(id);
			
			
			
			// Show next video
			var object = document.getElementById(this.playlist[index]);
			var annObject = document.getElementById(this.annotationlist[index]);
			var name = document.getElementById(this.timeList[index]);
			
			//google.maps.event.moveMarker(map, marker0,50.75968 , 6.0965247);
			updateMap(this.latList[index],this.lngList[index]);
			//moveMarker(map, marker, 50, 7);
			
			//if(index < Lifemirror.playlist.length){
				object.style.display = 'inline';
				name.style.display = 'inline';
				//annobject.style.display = 'inline';
				annObject.style.backgroundColor = '#5BC0DE';
				annObject.style.color = '#333';
				playingNow = id;
				object.play();
				
			//}
		//}
		/*else{
			var annObject = document.getElementById(this.annotationlist[index]);
			annObject.style.backgroundColor = 'transparent';
			annObject.style.color = '#FFFFFF'
			
			document.getElementById("end").style.backgroundColor = '#5BC0DE';
		
		}*/
	//}
}
   
   
   

LifemirrorPlayer.prototype.videoCallback = function(id) {
	
    var pausetime = document.getElementById(id).currentTime;
	console.log(pausetime);
	var start_time = id.match(/#t=(.*),/);
	var end_time = id.match(/,(.*)/);
	//alert (start_time[1]+","+end_time[1]);
	
	if(pausetime>=end_time[1]) {
		
		var index = this.playlist.indexOf(id);
		console.debug("pausetime>=19");
		//console.debug("INDEX: "+index);
		//console.debug("LENGTH: "+this.playlist.length);
		if(index+1 < this.playlist.length){
			// Hide current object
			document.getElementById(id).style.display = 'none';
			document.getElementById(this.timeList[index]).style.display = 'none';

			// Find next object in array
			index += 1;
			
			
			// hide the previous annotation
			//document.getElementById(Lifemirror.annotationlist[index-1]).style.display = 'none';
			document.getElementById(this.annotationlist[index-1]).style.backgroundColor = 'transparent';
			//document.getElementById(this.annotationlist[index-1]).style.color = '#FFFFFF';
			//index = 0;

			// Show next video
			var object = document.getElementById(this.playlist[index]);
			var annObject = document.getElementById(this.annotationlist[index]);
			var name = document.getElementById(this.timeList[index]);
			
			//google.maps.event.moveMarker(map, marker0,50.75968 , 6.0965247);
			updateMap(this.latList[index],this.lngList[index]);
			//moveMarker(map, marker, 50, 7);
			
			//if(index < Lifemirror.playlist.length){
				object.style.display = 'inline';
				name.style.display = 'inline';
				//annobject.style.display = 'inline';
				annObject.style.backgroundColor = '#5BC0DE';
				annObject.style.color = '#333';
				playingNow = this.playlist[index];
				object.play();
			//}
		}
		else{
			var annObject = document.getElementById(this.annotationlist[index]);
			annObject.style.backgroundColor = 'transparent';
			annObject.style.color = '#FFFFFF'
			
			document.getElementById("end").style.backgroundColor = '#5BC0DE';
		
		}
	}
}

LifemirrorPlayer.prototype.preloaderCallback = function() {
    this.preloaded++;
    if(this.preloaded == this.playlist.length) this.startPlaying();
}




lifemirror = new LifemirrorPlayer();


var videoplaylist = [];
var annotationlist = [];
var annotationTextList = [];
var timeList = [];
var durationList = [];
var latList = [];
var lngList = [];
var edgeList = [];
var weightList = [];

function flushLists(){


	//.length = 0
	videoplaylist = [];
	annotationlist = [];
	annotationTextList = [];
	timeList = [];
	durationList = [];
	latList = [];
	lngList = [];
	edgeList = [];
	weightList = [];
}



function recommend(edgeid, weight) {
	
	console.log(edgeid);
	var style = document.createElement('style');
	style.type = 'text/css';
	//style.innerHTML = 'input[type="radio"], .rating label.stars { float: right; line-height: 30px; height: 30px; }';
	style.innerHTML = '.rating label.lbl'+edgeid+':hover ~ label.lbl'+edgeid+', rating label.lbl'+edgeid+':hover, .rating input[type=radio][name=\''+edgeid+'\']:checked ~ label.lbl'+edgeid+' { background-image: url(\'http://www.findsourcecode.com/wp-content/uploads/2014/04/star.png\'); counter-increment: checkbox; }';
	
	//style.innerHTML = '.rating label.lbl'+edgeid+':hover ~ label.lbl'+edgeid+', rating label.lbl'+edgeid+':hover, .rating input[type=radio][name=stars]:checked ~ label.lbl'+edgeid+' { background-image: url(\'http://www.findsourcecode.com/wp-content/uploads/2014/04/star.png\'); counter-increment: checkbox; } .rating input[type=radio][name=stars]:required + label.stars:after { content: counter(checkbox)';
	
	//style.innerHTML += '.rating label.stars:hover ~ label.stars, rating label.stars:hover, .rating input[type=radio][name=\''+edgeid+'\']:checked ~ label.stars { background-image: url(\'http://www.findsourcecode.com/wp-content/uploads/2014/04/star.png\'); counter-increment: checkbox; } .rating input[type=radio][name=\''+edgeid+'\']:required + label.stars:after { content: counter(checkbox);';
	
	
	document.getElementsByTagName('head')[0].appendChild(style);
	
	console.log(weight+ " tada :D");
	
	//var edgeid = $(this).attr('name');
	//var weight = document.getElementById(edgeid).value;
	//console.log("weight: "+weight);
	$.ajax({

		url: "http://eiche.informatik.rwth-aachen.de.informatik.rwth-aachen.de:7076/analytics/recommend?username="+oidc_userinfo["preferred_username"]+"&edge="+edgeid+"&weight="+weight,
		type: "POST",
		dataType:'text',
		
		success: function(value) {
			console.log("success");
		},
		statusCode: {
			401: function() {
				alert("ERROR! Please login again.");
			},
			404: function() {
				alert("ERROR! Please login again.");
			}
			
		},
		error: function(e){console.log(e);}
	});

}      


function getVideos(searchString, access_token, lat, lng, postGetVideos){
	//console.log(username);
	//$(document).ready(function(event){
		
		//$("#searchbtn").click(function(event){
			//var searchString = document.getElementById("searchString").value;
			//alert(searchString);
			if(window.mobilecheck()){
				//var uri = "http://eiche.informatik.rwth-aachen.de:7074/adapter/getPlaylist?sub=123&search="+searchString+"&username="+username+"&lat="+lat+"&lng="+lng+"&mobile="+window.mobilecheck();
				var uri = "http://eiche.informatik.rwth-aachen.de:7074/adapter/getPlaylist?sub=123&search="+searchString+"&Authorization=Bearer "+access_token+"&lat="+lat+"&lng="+lng+"&mobile="+window.mobilecheck();
			}
			else{
				//var uri = "http://eiche.informatik.rwth-aachen.de:7074/adapter/getPlaylist?sub=123&search="+searchString+"&username="+username+"&lat="+lat+"&lng="+lng;
				var uri = "http://eiche.informatik.rwth-aachen.de:7074/adapter/getPlaylist?sub=123&search="+searchString+"&Authorization=Bearer "+access_token+"&lat="+lat+"&lng="+lng;
			}
			
			$.ajax({
				//url: "http://eiche.informatik.rwth-aachen.de:7074/adapter/getPlaylist?sub=123&search="+searchString+
				//"&username="+username+"&lat="+lat+"&lng="+lng,
				url: uri,
				type: "GET",
				dataType:'text',
				//beforeSend: function(xhr) {
	            //xhr.setRequestHeader("Authorization", "Bearer "+access_token);
				//},
				success: postGetVideos,
				/*function(value) {
					console.log(value);
					
					var jsonData = JSON.parse(value);
					

					for (var i = 0; i < jsonData.length; i++) {
						var videos = jsonData[i];
						var videoUri = videos.videoURL.toString();
						var title = videos.title.toString();
						var text = videos.text.toString();
						var time = videos.time.toString();
						var duration = videos.duration.toString();
						var latitude = videos.Latitude.toString();
						var longitude = videos.Longitude.toString();
						var edge = videos.edgeId.toString();
						var weight = videos.weight.toString();
						videoplaylist.push(videoUri);
						annotationlist.push(title);
						annotationTextList.push(text);
						timeList.push(time);
						durationList.push(duration);
						latList.push(latitude);
						lngList.push(longitude);
						edgeList.push(edge);
						weightList.push(weight);
					}
					console.log(annotationlist[0]);
					$('html,body').animate({
					scrollTop: $("#annotationdisplay").offset().top},'slow');
					playVideos();
					//$(function(){
					var $select = $(".1-n");
					for (i=1;i<=jsonData.length;i++){
						$select.append($('<option></option>').val(i).html(i))
					}
					//});
				},*/
				statusCode: {
					401: function() {
						alert("ERROR! Please login again.");
					},
					404: function() {
						alert("ERROR! Please login again.");
					}
					
				},
				error: function(e){console.log(e);}
			});
		//});
	//});
}

function getRecommendations(username, postGetRecommendations){

	if(window.mobilecheck()){
		var uri = "http://eiche.informatik.rwth-aachen.de:7078/recommend/initial?username="+username+"&mobile="+window.mobilecheck();
	}
	else{
		var uri = "http://eiche.informatik.rwth-aachen.de:7078/recommend/initial?username="+username;
	}
	
	$.ajax({
		url: uri,
		type: "GET",
		dataType:'text',
		success: postGetRecommendations,
		statusCode: {
			401: function() {
				alert("ERROR! Please login again.");
			},
			404: function() {
				alert("ERROR! Please login again.");
			}
			
		},
		error: function(e){console.log(e);}
	});


}

function postGetRecommendations(value){
	var jsonData = JSON.parse(value);
	
	for (var i = 0; i < jsonData.length; i=i+2) {
		var recommendationsTitle = jsonData[i];
		var recommendations = jsonData[i+1];
		console.log("String recommendations: "+recommendations.toString());

		document.getElementById("recommendation").innerHTML += "<div style=\"cursor:pointer\" class=\"col-sm-2\" > <div class='square-box'> <div class='square-content'> <div> <span class=\"recommendspan\" data-info='"+recommendations+"'>"+recommendationsTitle+"</span> </div> </div> </div></div>";
		
	}
		$(".square-box").click(function(event){

					console.log("data value: "+$(this).find('.recommendspan').attr('data-info'));
					
					document.getElementById("xmpp_status").innerHTML = "";
                    document.getElementById("videonamedisplay").innerHTML = "";
                    document.getElementById("videodisplay").innerHTML = "";
                    document.getElementById("annotationdisplay").innerHTML = "";
                    document.getElementById("map-canvas").style.display = "block";
                    flushLists();
					valeur = 0;
					$('.progress-bar').css('width', valeur+'%').attr('aria-valuenow', valeur);
                    postGetVideos($(this).find('.recommendspan').attr('data-info'));
					//playVideos();

				});
}

function postGetVideos(value){

	console.log(value);
					
	var jsonData = JSON.parse(value);

	for (var i = 0; i < jsonData.length; i++) {
		var videos = jsonData[i];
		var videoUri = videos.videoURL.toString();
		var title = videos.title.toString();
		var text = videos.text.toString();
		var time = videos.time.toString();
		var duration = videos.duration.toString();
		var latitude = videos.Latitude.toString();
		var longitude = videos.Longitude.toString();
		var edge = videos.edgeId.toString();
		var weight = videos.weight.toString();
		videoplaylist.push(videoUri);
		annotationlist.push(title);
		annotationTextList.push(text);
		timeList.push(time);
		durationList.push(duration);
		latList.push(latitude);
		lngList.push(longitude);
		edgeList.push(edge);
		weightList.push(weight);
	}
	console.log(annotationlist[0]);
	$('html,body').animate({
	scrollTop: $("#annotationdisplay").offset().top},'slow');
	playVideos();
	//$(function(){
	var $select = $(".1-n");
	for (i=1;i<=jsonData.length;i++){
		$select.append($('<option></option>').val(i).html(i))
	}
	//});
}

function playVideos(){

	var base = "random";
	var options = "";
	
	lifemirror.init(videoplaylist, latList, lngList, timeList, durationList, annotationlist, annotationTextList, edgeList, weightList, "videodisplay", base, options);
	
	lifemirror.preloadVideos();
	lifemirror.startPlaying();
}

/*function updateUserProfile(access_token){

	var lang = document.getElementById("language");
	//var location = document.getElementById("location");
	var location = document.getElementById("location").value;
	//var duration = document.getElementById("dur");
	
	if(location=="") location = "*";
	console.log("loc: "+ location);
	var jsonpreferences = '{"Authorization":"Bearer '+access_token+'","language":"'+lang+'","location":"'+location+'","duration":"'+duration+'"';
	
	for(loop=0;loop<noOfExp;loop++){
	
		var exp= document.getElementById("exp"+(loop+1));
		var lvl= document.getElementById("lvl"+(loop+1));
		
		jsonpreferences += ',"exp'+(loop+1)+'":"'+exp.value+'","lvl'+(loop+1)+'":"'+lvl.value+'"';
		//var exp2= document.getElementById("exp2");
		//var lvl2= document.getElementById("lvl2");
	}
	jsonpreferences +=',"noOfExp":"'+noOfExp+'"}';
	//var jsonpreferences = '{"username":"'+username+'","language":"'+lang+'","location":"'+location+'","duration":"'+duration+'","exp1":"'+exp1.value+'","exp2":"'+exp2.value+'","lvl1":"'+lvl1.value+'","lvl2":"'+lvl2.value+'"}'
	
	console.log(jsonpreferences);
	
	$.ajax({
	
	//var jsonpreferences = '{"username":"'+username+'","language":"'+lang+'","location":"'+location+'","duration":"'+duration.value+'","exp1":"'+exp1.value+'","exp2":"'+exp2.value+'","lvl1":"'+lvl1.value+'","lvl2":"'+lvl2.value+'"}';
	
	url: "http://eiche.informatik.rwth-aachen.de:7077/preference",
		//url: "http://eiche.informatik.rwth-aachen.de:7074/adapter/postUserProfile?Username="+username+"&language="+lang.value+"&location="+location.value+"&duration="+duration.value+"&exp1="+exp1.value+"&exp2="+exp2.value+"&lvl1="+lvl1.value+"&lvl2="+lvl2.value,
		type: "POST",
		dataType:'text',
		data: jsonpreferences,
		beforeSend: function(xhr) {
			//xhr.setRequestHeader("Username",username);
		},
		success: function(value) {
			//username = value;
			//localStorage.setItem("clvitraUser",value);
			//ocation.value = "";
			//language.value = "";
			//duration.value = "";
			document.getElementById("savelbl").innerHTML="Preferences successfully saved";
			console.log("success");
			
			//$("#nameField").text(localStorage.clvitraUser)
		},
		statusCode: {
			401: function() {
				alert("ERROR! Please login again.");
				//window.location = "/clvitra/";
			},
			404: function() {
				alert("ERROR! Please login again.");
				//window.location = "/clvitra/";
			}
			
		},
		error: function(e){console.log(e);}
	});

}*/

function updateMap(lt,ln) {
    
    var myLatLng = new google.maps.LatLng( lt,ln ),
        myOptions = {
            zoom: 4,
            center: myLatLng,
			disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            },
        map = new google.maps.Map( document.getElementById( 'map-canvas' ), myOptions ),
        marker = new google.maps.Marker( {position: myLatLng, map: map} );
    
    marker.setMap( map );
    //moveMarker( map, marker );
    
}

window.mobilecheck = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}



