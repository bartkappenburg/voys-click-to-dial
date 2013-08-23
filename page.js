// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
console.log('start');

parameters = ['hash', 'a_number', 'a_cli', 'b_cli', 'auto_answer']; 

//set the form fields
var index;
for (index = 0; index < parameters.length; ++index) {
	set_form_field(parameters[index]);
}

function set_form_field(field) {

	chrome.storage.local.get(field, function(items) {
	    if (items[field]) {
	    	document.getElementById(field).value = items[field];
	    }
	});
	

}


function save_form_field(field) {

	var obj= {};
	obj[field] = document.getElementById(field).value;
	if (obj[field].length > 0) {
		chrome.storage.local.set(obj, function () {console.log("saved " + field + "/ value = " + document.getElementById(field).value);});
	}

}

document.addEventListener('DOMContentLoaded', function () {  
 
	 document.getElementById("close").addEventListener('click', close_popup);
	 document.getElementById("save").addEventListener('click',clickHandler); 
 
 }); 

function close_popup() {
	
	window.close();
}


function clickHandler(e) {   

				var index;
				for (index = 0; index < parameters.length; ++index) {
					save_form_field(parameters[index]);				
				}
				e.preventDefault();
				document.getElementById("save").innerHTML = "Opgeslagen!";
				return false;
				
				

 }



