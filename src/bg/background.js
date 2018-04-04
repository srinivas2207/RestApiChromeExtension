var domain;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	  var cmd = request.command;
	  
	  switch (cmd) {
		case "init":
			initPage();
			break;
		case "checkRunStatus":
			var state = isRunning();
			sendResponse({runState : state});
			break;
		case "runOnce":
			setRunning(true);
			break;
		case "stopRun":
			setRunning(false);
			break;
		case "runAlways":
			setRunningAlways();
			break;
		case  "pageLoad":
			initPage();
			setTimeout(initPageLoad, 1000);
			break;
		case "API_FILTER_DATA_REQUEST":
			var data = localStorage["API_FILTER_DATA" + domain];
			sendResponse({"data" : data});
			break;
		case "API_PARAM_FILTER_DATA_REQUEST":
			var data = localStorage["API_PARAM_FILTER_DATA" + domain];
			sendResponse({"data" : data});
			break;
		case "API_SWAGGER_DATA_REQUEST":
			var data = localStorage["API_SWAGGER_DATA" + domain];
			sendResponse({"data" : data});
			break;
		case "API_FILTER_DATA_SAVE":
			localStorage["API_FILTER_DATA" + domain] = request.data;;
			break;
		case "API_PARAM_FILTER_DATA_SAVE":
			localStorage["API_PARAM_FILTER_DATA" + domain] = request.data;;
			break;
		case "API_SWAGGER_DATA_SAVE":
			localStorage["API_SWAGGER_DATA" + domain] = request.data;;
			break;
	}
  });
  

function isRunning() {
	var state = localStorage[domain+"_state"];	 
	if (state == undefined|| state == "false") {
		return false;
	} else {
		return true;
	}
}

function isRunningAlways() {
	return localStorage[domain+"_state_always"];	 
} 

function setRunning(state) {
	localStorage[domain+"_state"] = state;
	if(state) {
		injectCode();
	}else {
		localStorage[domain+"_state_always"] = false; 
	}
}

function setRunningAlways() {
	setRunning(true);
	localStorage[domain+"_state_always"] = true; 
} 

function initPage() {
	chrome.tabs.getSelected(null, function (tab) {
			var url = new URL(tab.url)
			domain = url.hostname;
		});
}

function initPageLoad() {
	var state = isRunningAlways();
	if (state == true || state == "true") {
		injectCode();
	} else {
		localStorage[domain+"_state"] = false;
	}
}

function injectCode() {
	const actualCode = `
		var s = document.createElement('script');
		s.src = chrome.extension.getURL('js/rest_api_inject.js');
		s.onload = function() {
			this.remove();
		};
		(document.head || document.documentElement).appendChild(s);  `;

		chrome.tabs.executeScript(null, {code: actualCode, runAt: 'document_end'}, null);	
}