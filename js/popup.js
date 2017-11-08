/**
 * Initially called when extension page loads. Attaches click handlers to all the buttons.
 */
function init() {
	document.getElementById("runBtn").addEventListener("click", function(){
		var s = document.createElement('script');
		s.src = chrome.extension.getURL('rest_api_inject.js');
		s.onload = function() {
			this.remove();
		};
		(document.head || document.documentElement).appendChild(s);

		chrome.tabs.executeScript(tabId, {code: actualCode, runAt: 'document_end'}, cb);	
	});

}

function injectExtCode() {
	
}

document.addEventListener('DOMContentLoaded', init);