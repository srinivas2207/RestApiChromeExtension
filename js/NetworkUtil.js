var REST_EXT = {};

(function() {
	REST_EXT.NetworkUtil = NetworkUtil;
	
	function NetworkUtil(apiRecorder) {
		var objRef = this;
		var REQUEST_DATA = 1;
		var RESPONSE_DATA = 2;
		var apiRecorder = apiRecorder;
		var isRunning = false;
		
		
		objRef.setRunning = setRunning;
		
		init();
		
		function init() {
			//detectIframeLoad();
			
			var xhr = XMLHttpRequest.prototype;
			var open = xhr.open;
			xhr.open = function(method, url, async) {
			
				var baseUrl = url.split("?")[0];
				if (baseUrl.endsWith(".js") || baseUrl.endsWith(".css")
						|| baseUrl.endsWith(".html")
						|| baseUrl.endsWith(".scss")
						|| baseUrl.endsWith(".xml") || baseUrl.endsWith(".xsl")) {
					return open.apply(this, arguments);
				}
					
				this.method = method;
				this.url = url;
					
				var send = this.send;
				
				this.send = function(data) {
					var request = data;
					var apiCode = recordApiRequest(this.method, this.url, request);
					var onload = this.onload;
					this.onload = function(event) {
						var response = this.responseText;
						recordApiResponse(apiCode, this.status, response);
						if (onload) {
							onload.apply(this, arguments);
						}
					}; 
					send.apply(this, arguments);
				};
				
				return open.apply(this, arguments);
			};
		}
		
		function detectIframeLoad() {
			$('iframe').load(function(){
			      alert("Hellooo Iframe got loaded !!!!");
			});
		}
		
		        
		
		function recordApiRequest(method, url, request) {
			if (!isRunning) {
				return 0;
			}
			
			return apiRecorder.addRequest(method, url, request);
		}
		
		function recordApiResponse(apiCode, status, response) {
			if (!isRunning) {
				return;
			}
			apiRecorder.addResponse(apiCode, status , response);
		}
		
		function setRunning(running) {
			isRunning = running;
		}
	}
})();