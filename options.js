// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("color");
  var color = select.children[select.selectedIndex].value;
  localStorage["favorite_color"] = color;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  console.log(localStorage["qq"])
  localStorage["qq"] = "aa";
  console.log(localStorage.qq)
  
  chrome.storage.sync.set({'qq': 'aa'}, function() {
    // Notify that we saved.
    console.log('Settings saved');
    chrome.storage.sync.get("qq", function(data) {
      console.log(data.qq);
    });
  });
  
  var favorite = localStorage["favorite_color"];
  if (!favorite) {
    return;
  }
  var select = document.getElementById("color");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
//document.querySelector('#save').addEventListener('click', save_options);

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
							'<div class="green"><input type="radio" name="' + el.id + '" value="green"></div>' + 
							'<div class="yellow"><input type="radio" name="' + el.id + '" value="yellow"></div>' + 
							'<div class="red"><input type="radio" name="' + el.id + '" value="red"></div>' + 
						'</li>');
	}
});