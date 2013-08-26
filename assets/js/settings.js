// Click to dial using the API of Voys
// Made by Inversive Media (2013) for Voys

//config
parameters = ['hash', 'a_number', 'a_cli', 'b_cli', 'auto_answer']; 

//messages
var saved = "Opgeslagen!";

//add an event listener to the buttons
document.addEventListener('DOMContentLoaded', function () {  
 
	 document.getElementById("close").addEventListener('click', close_popup);
	 document.getElementById("save").addEventListener('click',clickHandler); 
 
 });

//set each of the form fields
var index;
for (index = 0; index < parameters.length; ++index) {
	set_form_field(parameters[index]);
}

//set a form field
function set_form_field(field) {

	chrome.storage.local.get(field, function(items) {
	    if (items[field]) {
	    	document.getElementById(field).value = items[field];
	    }
	});
	

}

//save the form field to the local storage
function save_form_field(field) {

	var obj= {};
	obj[field] = document.getElementById(field).value;
	if (obj[field].length > 0) {
		chrome.storage.local.set(obj, function () {console.log("saved " + field + "/ value = " + document.getElementById(field).value);});
	}

}

//close the settings popup
function close_popup() {
	window.close();
}

//saving the fields
function clickHandler(e) {   

				var index;
				for (index = 0; index < parameters.length; ++index) {
					save_form_field(parameters[index]);				
				}
				e.preventDefault();
				document.getElementById("save").innerHTML = saved;
				return false;
				
				

 }



