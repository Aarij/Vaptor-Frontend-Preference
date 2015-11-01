/*
 * Copyright (c) 2015 Advanced Community Information Systems (ACIS) Group, Chair
 * of Computer Science 5 (Databases & Information Systems), RWTH Aachen
 * University, Germany All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * Neither the name of the ACIS Group nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var client;


var init = function() {
		
	console.log("init function UserPreferences");
	client = new iwc.Client();
	/*var iwcCallback = function(intent) {
		// define your reactions on incoming iwc events here
		console.log(intent);
	};*/
  
	//client = new Las2peerWidgetLibrary("http://127.0.0.1:7077/userpreferences", iwcCallback);
  

	/*$('#input123').on('click', function() {
		getPreferences();
	})*/
}


// getPreferences
var getPreferences = function(){
  var preferences = null;
  var preferences = null;
  client.sendRequest("GET", "127.0.0.1:7077", preferences, "application/json", {}, true,
  function(data, type) {
    console.log(data);
  },
  function(error) {
    console.log(error);
  });
  return preferences;
}


$(document).ready(function() {
	init();
	//var lang="*";
	var duration="*";
	var noOfExp = 1;
	
	
	// OpenID Connect Button - Step 4: implement a callback function
	//function signinCallback(result) {
		console.log("In callback");
		if(localStorage.access_token!=null){
		//if(result === "success"){
			console.log("callback Success");
			//document.getElementById("userprofile").style.display = "inline";
			//document.getElementById("searchdiv").style.display = "inline";
			//initialize();
			//getVideos(document.getElementById("searchString").value);
			
			
			
			
			$("#savebtn").click(function(event){
				console.log("access Token: "+localStorage.access_token);
				updateUserProfile(localStorage.access_token);
				//document.getElementById("userprofilediv").style.display = "none";
				
				console.log(document.getElementById("exp1").value);
				//console.log(document.getElementById("exp2").value);
				console.log(document.getElementById("lvl1").value);
				//console.log(document.getElementById("lvl2").value);
				console.log(duration);
				console.log("lang"+document.getElementById("language").value);
				
				var intent = {
					"component":"",
					"sender":"",
					"data":"http://data.org/some/data",
					"dataType":"text/xml",
					"action":"search_intent",
					"categories":["category1","category2"],
					"flags":["PUBLISH_GLOBAL"],
					"extras":{"key1":"val1","key2":2}
				}
				
				if(iwc.util.validateIntent(intent)){
					client.publish(intent);
				}
				
			});
			$("#upmenu").click(function(event){
				document.getElementById("userprofilediv").style.display = "block";
			});
			
			
			//playVideos();
			// at this point, developers have access to several pieces of information
			// relevant to OpenID Connect (see ./oidc-button.js)
			/*console.log("OpenID Connect Provider Configuration:");
			console.log(oidc_provider_config);
			console.log("OpenID Connect User Info:");
			console.log(oidc_userinfo);
			console.log("OpenID Connect ID Token:");
			console.log(oidc_idtoken);
			
			$("#status").html("Hello, " + oidc_userinfo.name + "!");*/
		} else {
			console.log("not signed in...");
			console.log(result);
			$("#status").html("Do I know you?!");
		}
	//}
	
	
	$('.clockpicker').clockpicker().find('input').change(function(){
		alert(this.value);
		duration=this.value;
	});
	var input = $('#single-input').clockpicker({
		placement: 'bottom',
		align: 'left',
		autoclose: true,
		'default': 'now'
	});


		
	//$(document).ready(function() {

		var max_fields      = 10; //maximum input boxes allowed
		var wrapper_exp         = $(".exp_fields_wrap"); //Fields wrapper
		var wrapper_lvl         = $(".lvl_fields_wrap"); //Fields wrapper
		var add_button      = $(".add_field_button"); //Add button ID
		
		//var x = 2; //initial text box count
		$(add_button).click(function(e){ //on add input button click
			console.log("add button clicked");
			e.preventDefault();
			if(noOfExp < max_fields){ //max input box allowed
				
				noOfExp++; //text box increment
				//$(wrapper).append('<div><input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
				$(wrapper_exp).append('<div id="domain_' + noOfExp +'" class = "bottom_space row wide50"> <span>Domain of expertise</span> <form action="#"> <select class="form-control" id="exp' + noOfExp +'"> <option id="*" value="*" selected>Select</option> <option id="co" value="co">Construction</option> <option id="he"  value="he">Health</option> <option id="ed" value="ed">Education</option> </select> </form> <a href="#" class="remove_field">Remove</a></div>');
			
				$(wrapper_lvl).append('<div id="lvl_domain_'+ noOfExp +'" class = "bottom_space row wide50"> <span>Level of expertise</span> <form action="#"> <select class="form-control" id="lvl' + noOfExp +'"> <option id="*" value="*" selected>Select</option> <option id="no" value="1">Novice</option> <option id="in" value="2">Intermediate</option> <option id="ex" value="3">Expert</option> </select> </form> </div>');
				
			
			}
		});
		
		$(wrapper_exp).on("click",".remove_field", function(e){ //user click on remove text
			e.preventDefault(); 
			
			var name = $(this).parent('div').attr('id');
			$("#"+name).remove();
			$("#lvl_"+name).remove();
			//$(this).parent('div').remove(); 
			noOfExp--;
			
		});
	
		
	//});
	
	function updateUserProfile(access_token){

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

}
	
  
});
