console.log("script loaded");
$(document).ready(function(){
	window.setTimeout( checkFb, 200 ); // .2 seconds
	
	function checkFb(){
		if(document.getElementById("platformDialogForm") != null){ //check if fb is on the page
			console.log("script loaded");
			var pmString = $('._5b_h').text();
			console.log(pmString);
		}
	}
});
