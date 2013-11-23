console.log("script loaded");
$(document).ready(function(){
	window.setTimeout( checkFb, 200 ); // .2 seconds
	
	function checkFb(){
		if(document.getElementById("platformDialogForm") != null){ //check if fb is on the page
			console.log("fb pop up found!");
			
			var permissions = getPermissions($('._5b_h').text());
			console.log(permissions);
		}
	}
	
	//Get permission from raw string, returns array
	function getPermissions(string){
		var pmArray = string.split(",");
		
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
		
		for(var i = 0; i < pmArray.length; i++){
			pmArray[i] = pmArray[i].trim();
		}
		
		return pmArray;
	}
});
