

function init() {
	sendMessage("init");
	initListeners();
	hide(document.getElementById("btnContainer"));
	
	setTimeout(function(){ 
		sendMessage("checkRunStatus");	
	}, 500);
}


function sendMessage(command) {
	chrome.runtime.sendMessage({
		"command": command
	}, function(response) {
		handleMessageCb(command, response);
	});
}

function handleMessageCb(command, response) {
	if(command === "checkRunStatus") {
		var status = response.runState;
		showContent(status);
	}
	
}

function showContent(isRunning) {
	show(document.getElementById("btnContainer"));
	
	if(!isRunning) {
		hide(document.getElementById("stopRun"));
		show(document.getElementById("runOnce"));
		show(document.getElementById("runAlways"));
	} else {
		show(document.getElementById("stopRun"));
		hide(document.getElementById("runOnce"));
		hide(document.getElementById("runAlways"));
	}
}

function show(elm) {
	elm.style.display = 'block';
}

function hide(elm) {
	elm.style.display = 'none';
}

function initListeners() {
	document.getElementById("stopRun").addEventListener("click",stopRunning);
	document.getElementById("runOnce").addEventListener("click", function() { runOnSite(true)});
	document.getElementById("runAlways").addEventListener("click", function() { runOnSite(false)});
}

function runOnSite(onlyOnce) {
	sendMessage( onlyOnce ? "runOnce" : "runAlways");
	showContent(true);
}


function stopRunning() {
	sendMessage("stopRun");
	showContent(false);
}

document.addEventListener('DOMContentLoaded', init);