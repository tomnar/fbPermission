$(document).ready(function(){
	$.getJSON( "permissions.json", function(data) {
		permissions = data;
		var personal = $(".personal");
		var friends = $(".friends");
		var other = $(".other");
		for(key in data) {
			switch(data[key].type){
			case "personal":
				appendEl(personal, data[key]);
				break;
			case "friends":
				appendEl(friends, data[key]);
				break;
			default:
				appendEl(other, data[key]);
				break;
			}
		}
	});
	
	function appendEl(container, el){
		container.append('<li>' +
							'<label>' + el.value + '</label>' + 
							'<div class="green"><input type="radio" name="' + el.id + '" value="0"></div>' + 
							'<div class="yellow"><input type="radio" name="' + el.id + '" value="1"></div>' + 
							'<div class="red"><input type="radio" name="' + el.id + '" value="2"></div>' + 
						'</li>');
	}
	
	//Save data when save it clicked
	$("input[type='submit']").click(function(){
		$("li").each(function(){
			var id = $(this).find('input:checked').attr("name");
			var value = $(this).find('input:checked').attr("value");
			console.log(id + ", "+ value);
			//chrome.storage.sync.set({'qq': 'aa'});
		});
	});
});