// Click to dial using the API of Voys
// Made by Inversive Media (2013) for Voys

// config
var apiUrl = "https://api.voipgrid.nl/api/";
var apiEndpoint = "clicktodial";

//messages
var contextMenuMessage = "Bel dit nummer"
var callFailed = "Click to dial failed. Controleer je instellingen.";
var serverResponse = "Server response:";
var callInProgress = "Nummer wordt gebeld.";
var missingSettings = "Je instellingen zijn niet compleet. Vul ze in via de extensie.";
var noValidNumber = "Dit is geen geldig telefoonnummer.";
var errorMessage = "Foutmelding";
var succesMessage = "Gelukt!";

//create the right click context menu
var id = chrome.contextMenus.create({"title": contextMenuMessage, "contexts":["page","selection"],
                                     "onclick": genericOnClick});

//handle the click event
function genericOnClick(info, tab) {
      
  call(info.selectionText);
 
}


//call the number
function call(b_number)
{
	chrome.storage.local.get(null, function(items) {

		//b_number check
		items["b_number"] = fix_number_format(b_number);
		if (items["b_number"] == false) {show_notification(errorMessage, noValidNumber); throw "Invalid phone number";}

		//set the correct auto_answer value
		if (items["auto_answer"] == "false") {items["auto_answer"] = false;} else {items["auto_answer"] = true;}

		//check if hash and a_number are present 
		if (items["hash"] && items["hash"].length > 0 && items["a_number"] && items["a_number"].length > 0) {
			api_request(items) } 
		else {
			show_notification(errorMessage, missingSettings);
		}
	});

   
}

//fix the formatting of the phone number
function fix_number_format(number) {
		
		number = number.replace('+','00');
		number = number.replace(/^(00[0-9]{1,3})0/, "$1");
		number = number.replace(/[^0-9\+]/gmi,'');
		if (number.length > 0) {
			return number;
		} else {
			return false;
		}



}

// Create a notification:
function show_notification(title, message) {

	var notification = webkitNotifications.createNotification(
	  '/assets/images/icon-48.png',  // icon url - can be relative
	  title,  // notification title
	  message  // notification body text
	);


	notification.show();


}
//fire the request
function api_request(items) {


	var req = new XMLHttpRequest();
    req.open("POST", apiUrl + apiEndpoint + "/", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Accept', 'application/json');
    req.send(JSON.stringify(items));

    console.log(JSON.stringify(items));

	req.onreadystatechange = function() 
	    { 
	        // If the request completed, close the settings popup
	        if (req.readyState == 4)
	            if (req.status != 201 && req.status != 200 && req.status != 202) {
	            			            		
	            		show_notification(errorMessage, callFailed + "\n\n" + serverResponse + "\n" + req.responseText);
	            		
	            } else {
	                
	                    show_notification(succesMessage,callInProgress);
	                
	            };
	    };



}