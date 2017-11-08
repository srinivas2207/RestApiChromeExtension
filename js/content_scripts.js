chrome.runtime.sendMessage({
		"command": "pageLoad"
	}, function(response) {
});

window.addEventListener("message", function(event) {
  if (event.source != window)
    return;

  if (!event.data.type)
	return;

  if (event.data.type == "API_FILTER_DATA_REQUEST") {
    sendApiFilterData();
  }
  
  if (event.data.type == "API_FILTER_DATA_SAVE") {
    saveApiFilterData(event.data.data);
  }
  
  if (event.data.type == "API_SWAGGER_DATA_REQUEST") {
	  sendApiSwaggerData();
  }
	  
  if (event.data.type == "API_SWAGGER_DATA_SAVE") {
	 saveApiSwaggerData(event.data.data);
  }
}, false);


function sendApiFilterData() {
	chrome.runtime.sendMessage({
		"command": "API_FILTER_DATA_REQUEST"
	}, function(response) {
		const domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
		var filterData = response.data;
		window.postMessage({ type: 'API_FILTER_DATA_RESULT', data: filterData}, domain);
    });
}

function sendApiSwaggerData() {
	chrome.runtime.sendMessage({
		"command": "API_SWAGGER_DATA_REQUEST"
	}, function(response) {
		const domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
		var swaggerData = response.data;
		window.postMessage({ type: 'API_SWAGGER_DATA_RESULT', data: swaggerData}, domain);
    });
}

function saveApiFilterData(data) {
	chrome.runtime.sendMessage({
		"command": "API_FILTER_DATA_SAVE",
		"data" : data
	}, function(response) {
    });
}

function saveApiSwaggerData(data) {
	chrome.runtime.sendMessage({
		"command": "API_SWAGGER_DATA_SAVE",
		"data" : data
	}, function(response) {
    });
}