$(document).ready(function(){
	window.setTimeout( checkFb, 200 ); // .2 seconds
	
	function checkFb(){
		if(document.getElementById("platformDialogForm") != null){ //check if fb is on the page
			console.log("fb pop up found!");
			
			var permissions = getPermissions($('._5b_h').text());
			var container = $('._5b_h').text("");
			container.append('<h1>Permissions requested:</h1>');
			
			$.getJSON( chrome.extension.getURL("permissions.json"), function( data ) {
				for (var e = 0; e < permissions.length; e++){
					var id = ""+data[permissions[e]].id;
					chrome.storage.sync.get(id, function (obj) {
						
						array = $.map(obj, function(value, id) {return [id, value];});
						var id = array[0];
						var rating = array[1];
						
						pArray = $.map(data, function(value, id) {return [value];});
						for (var a = 0; a < pArray.length; a++){
							if(pArray[a].id == id){
								var description = pArray[a].description;
								var value = pArray[a].value;
								var type = pArray[a].type;
							}
						}
						var el = $('<div data-hover="tooltip" aria-label="' + description + '" class="tile rating' + rating + ' ' + type + '"><div>' + value + '</div></div>');
						container.append(el.css("opacity","0").animate({
						    opacity: 1
						  }, 200, function(){})
						);
				    });
				}
			});
			$("._13").prepend('<div class="banner"><a href="#"><img src="' + chrome.extension.getURL("logo.png") + '" /></a></div>');
		}
	}
	
	//Get permission from raw string, returns array
	function getPermissions(pmString){
		var pmRes = [];
		var pmArray = pmString.split(",");
		
		if(pmArray[0].indexOf("would like to") >= 0){ //no permission array
			pmRes.push("post");
		}
		else{
			//fix first element e.g. "Klout will receive the following info: your public profile"
			var firstEl = pmArray[0].split(":")[1]; //cut info at start 
			firstEl = firstEl.substring(5,firstEl.length); //cut "your" from the start
			pmArray[0] = firstEl;
			
			//fix last element (which consists of two) e.g "current city and likes."
			var lastElements = pmArray[pmArray.length-1].split("and");
			var secondLastEl = lastElements[0];
			var lastEl = lastElements[1].substring(0,lastElements[1].length-1);
			pmArray[pmArray.length-1] = secondLastEl;
			pmArray.push(lastEl);
			
			var friends_stuff = false;
			for(var i = 0; i < pmArray.length; i++){
				pmArray[i] = pmArray[i].trim().replace(/ /g, '_');
				//remove "and" for permissions with and
				if(pmArray[i].indexOf("religious and political view") >= 0){
					pmArray[i] = "religious/political_views";
				}
				if(pmArray[i].indexOf("follows and followers") >= 0){
					pmArray[i] = "follows/followers";
				}
				pmArray[i] = pmArray[i].trim();
				
				//check if the elements are in fact about the friends (if friends all following stuff will be about friends)
				if(pmArray[i].indexOf("friends'") >= 0){
					friends_stuff = true;
					
					//further decomposion needed e.g. "games activity and news activity and your friends' relationships"
					var els = pmArray[i].split("and");
					for (var u = 0; u < els.length; u++){
						if(u == els.length-1){ //last element in array, first for friends' e.g. your friends' relationships
							var el = els[u].substring(15, els[u].length);
							el = "F_" + el.trim();
							pmRes.push(el);
						}
						else{
							//last permissions for me (not friends')
							if(els[u].substring(0,1) == "_"){els[u] = els[u].substring(1,els[u].length);}//remove trailing "_xxx"
							if(els[u].substring(els[u].length-1,els[u].length) == "_"){els[u] = els[u].substring(0,els[u].length-1);}//remove trailing "xxx_"
							pmRes.push(els[u].trim());
						}
					}
				}
				else{
					if(friends_stuff){
						pmRes.push("F_" + pmArray[i]);
					}
					else{
						pmRes.push(pmArray[i]);
					}
				}
			}
		}
		return pmRes;
	}
});
