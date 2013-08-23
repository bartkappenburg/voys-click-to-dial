// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
console.log('start');




function genericOnClick(info, tab) {
  
    
  message(info.selectionText);
 
}

var id = chrome.contextMenus.create({"title": "Bel dit nummer", "contexts":["page","selection"],
                                     "onclick": genericOnClick});


function message(b_number)
{
	chrome.storage.local.get(null, function(items) {
		items["b_number"] = fix_number_format(b_number);
		if (items["auto_answer"] == "false") {items["auto_answer"] = false;} else {items["auto_answer"] = true;}
		api_request(items)
	});

   
}

function fix_number_format(number) {
		
		number = number.replace(' ', '');
		number = number.replace('(', '');
		number = number.replace(')', '');
		number = number.replace('-', '');
		return number;


}



function api_request(items) {


	var req = new XMLHttpRequest();
    req.open("POST", "https://api.voipgrid.nl/api/clicktodial/", true);
  

    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Accept', 'application/json');

    console.log(JSON.stringify(items));

    req.send(JSON.stringify(items));

	req.onreadystatechange = function() 
	    { 
	        // If the request completed, close the extension popup
	        if (req.readyState == 4)
	            if (req.status != 201 && req.status != 200 && req.status != 202) {
	            			            		
	            		alert("Click to dial failed. Controleer je instellingen. \n\nServer response: \n" + req.responseText);
	            		
	            } else {
	                
	                    alert("Nummer wordt gebeld");
	                
	            };
	    };



}


