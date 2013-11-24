var green = [0,20,21];
var yellow = [1,12,14,16,17,19,22,23,24,25,26,27,28,29,30,41,46,50];
var red = [2,3,4,5,6,7,8,9,10,11,13,15,18,20,31,32,33,34,35,36,37,38,39,40,42,43,44,45,47,48,49,51,52,53,54,55,56];

$(document).ready(function(){
	$.getJSON( "permissions.json", function(data) {
		for(key in data){
			var id = data[key].id;
			if(green.indexOf(id) >= 0){
				setSave(id, 0);
			}
			else if(yellow.indexOf(id) >= 0){
				setSave(id, 1);
			}
			else if(red.indexOf(id) >= 0){
				setSave(id, 2);
			}
			else{
				console.log("permission: " + data[key].value + " is not defined, using yellow as default");
			}
		}
	});
	
	function setSave(id, value){
		var obj = {};
		obj[id] = value;
		chrome.storage.sync.set(obj, function () {
		    //chrome.storage.sync.get(id, function (obj) {
		    //    console.log(obj);
		    //});
		});
	}
});