(function() {
	REST_EXT.ApiRecorder = ApiRecorder;
	
	function ApiRecorder() {
		var objRef = this;
		
		var PARAMETER_FILTER  = ["_"];
		
		var apiCount = 0;
		var apiCounter = 1;
		
		var PROPERTY_API				= "API_TEST";
		var PROPERTY_URL				= "API_URL";
		var PROPERTY_REQ_METHOD			= "API_METHOD";
		var PROPERTY_REQ_STATUES		= "API_STATUS";
		var PROPERTY_POLL				= "API_POLL";
		var PROPERTY_REQUEST			= "API_REQUEST";
		var PROPERTY_RESPONSE			= "API_RESPONSE";
		var PROPERTY_COMPARE_RESPONSE	= "COMPARE_RESPONSE";
		var PROPERTY_TEST_VARS			= "TEST_VARS";
		var PROPERTY_TEST_CONDITION		= "TEST_CONDITION";
		
		var PROPERTY_FILE_PREFIX_DATA = "TEST_NAME=REST_API_TEST\n";
		
		var keys = [];
		var apiCalls = {};
		
		var savedCallList = [];
		
		var apiCallTable;
		var apiDoc = REST_EXT.ApiDoc.getInstance();
		var apiFilter = REST_EXT.ApiFilter.getInstance();
		
		objRef.addRequest = addRequest;
		objRef.addResponse = addResponse;
		objRef.saveCallObj = saveCallObj;
		objRef.getCallObj = getCallObj;
		objRef.deleteCallObj = deleteCallObj;
		objRef.saveApiCalls = saveApiCalls;
		objRef.copyCallObj = copyCallObj;
		objRef.download = download;
		objRef.clearApis = clearApis;
		objRef.filterApiCall = _filterApiCall;
		
		init();
		function init() {
			apiCallTable = new REST_EXT.ApiCallTable(objRef);		
		}
		
		function addRequest(method, url, request) {
			if(!apiFilter.isApiCallAllowed(method, url)){
				return 0;
			}

			var callId = apiCounter++;
			callId += "";
			
			// removing unnecessary params from url
			var baseUrl = url.split("?")[0];
			if ( url.split("?").length > 1) {
				var paramStr = "";
				var params = url.split("?")[1];
				var paramList = params.split("&");
				for(var i=0; i<paramList.length; i++) {
					var param = paramList[i].split("=")[0];
					if (!_isParamFiltered(param)) {
						if (paramStr.length == 0) {
							paramStr = "?" + paramList[i];
						} else {
							paramStr += "&" + paramList[i];
						}
					}
				}
				url = baseUrl + paramStr;
			}
			
			apiCalls[callId] = _createCallObj(callId, method, url, request);
			keys.push(callId);
			
			_handlePollRequest(callId, url, method, request);
			
			apiCallTable.addRequest(apiCalls[callId]);
			
			return callId;
		}
		
		function _isParamFiltered(param) {
			for(var i=0; i<PARAMETER_FILTER.length; i++) {
				if (param == PARAMETER_FILTER[i]) {
					return true;
				}
			}
			return false;
		}
		
		function _handlePollRequest(callId, url, method, request) {
			var prevCallId = parseInt(callId) - 1;
			var prevCall = apiCalls[prevCallId + ""];
			if (prevCall != null) {
				if (prevCall.method == method && prevCall.url == url
						&& prevCall.request == request) {
					var currentCall = apiCalls[callId];
					if (currentCall != null) {
						var count = prevCall.count ? prevCall.count + 1 : 2;
						if (prevCall.response) {
							currentCall.prevResponse = prevCall.response;
						}
						currentCall.count = count;
						deleteCallObj(prevCallId + "");
						return true;
					}
				}
			}
			return false;
		}
		
		function addResponse(callId, status, response) {
			//console.log(callId + " : " + response);
			var apiCallObj = apiCalls[callId];
			if (apiCallObj) {
				apiCallObj.status = status;
				apiCallObj.response = response;
			}
		}
		
		function _createCallObj(callId, method, url, request) {
			var data = {};
			var apiName;
			
			var apiInfo = apiDoc.getApiInfo(url.split("?")[0], method);
			if (apiInfo.name) {
				apiName = apiInfo.name;
			} else {
				apiName = "Test-" + callId;
			}
			
			data.callId = callId;
			data.apiName = apiName;
			data.method = method;
			data.url = url;
			data.request = request;
			data.response = "";
			data.apiInfo = apiInfo;
			return data;
		}
		
		function saveCallObj(callObj) {
			if (callObj) {
				var callId = callObj.callId;
				if (keys.indexOf(callId) != -1) {
					apiCalls[callId] = callObj;
				}
 			}
		}
		
		function getCallObj(callId) {
			callId = callId + "";
			return apiCalls[callId];
		}
		
		function deleteCallObj(callId) {
			callId = callId + "";
			var index = keys.indexOf(callId);
			if (index != -1) {
				keys.splice(index, 1);
				delete apiCalls[callId];
			}
		}
		
		
		function saveApiCalls() {
			var comment = document.getElementById('apiComment').value;
			if (comment && comment.trim().length > 0) {
				savedCallList.push(comment); 
			}
			
			// saving calls to the list
			keys.forEach(function(callId) {
				var callObj = apiCalls[callId];
				if (callObj) {
					savedCallList.push(callObj); 
				}
			});
			
			apiCount = savedCallList.length;
			$(".restApiPanel #apiDownload").html("Download - " + apiCount);
			
			// Clearing api calls
			clearApis();
		}
		
		function clearApis() {
			document.getElementById('apiComment').value = "";
			keys = [];
			apiCalls = {};
			apiCallTable.clear();
		}
		
		
		function _convertToTestData(callObj) {
			var testData = "";
			if (callObj) {
				
				var apiName = callObj.apiName;
				var apiUrl = callObj.url;
				var apiHttpMethod = callObj.method;
				var apiRequest = callObj.request;
				var apiResponse = callObj.response;
				var apiStatus= callObj.status;
				var apiPoll = callObj.apiPoll;
				var compareResponse = callObj.compareResponse;
				var testVars = callObj.testVars;
				var testCondition = callObj.testCondition;
				
				if (!apiPoll) {
					apiPoll = (callObj.count && callObj.count > 2) ? true : false;
				}
				
				
				var apiRequest = callObj.request;
				var apiResponse = callObj.response;
				if (apiRequest) {
					apiRequest = apiRequest.replace(/\r?\n|\r/g, " ");
					apiRequest = apiRequest.replace(/\t/g," ");
				} else {
					apiRequest = "";
				}
				
				if (apiResponse) {
					apiResponse = apiResponse.replace(/\r?\n|\r/g, " ");
					apiResponse = apiResponse.replace(/\t/g," ");
				} else {
					apiResponse = "";
				}
				
				if (callObj.apiInfo && callObj.apiInfo.summary) {
					testData += "#" + callObj.apiInfo.summary + "\n";
				}
				
				if (apiPoll && callObj.prevResponse && callObj.prevResponse.length > 0) {
					var prevResponse = callObj.prevResponse;
					prevResponse = prevResponse.replace(/\r?\n|\r/g, " ");
					prevResponse = prevResponse.replace(/\t/g," ");
					testData += "#PrevCallResponse=" + prevResponse + "\n";	
				}
				
				if (callObj.apiInfo && callObj.apiInfo.path) {
					testData += "#URL_FORMAT=" + callObj.apiInfo.path + "\n";
				}
				
				testData += PROPERTY_API + "=" + apiName + "\n";
				
				testData += PROPERTY_URL + "=" + apiUrl + "\n";
				testData += PROPERTY_REQ_METHOD + "=" + apiHttpMethod + "\n";
				
				if (apiRequest != null && apiRequest.length > 0) {
					testData += PROPERTY_REQUEST + "=" + apiRequest + "\n";
				}
				
				if (apiResponse != null && apiResponse.length > 0) {
					testData += PROPERTY_RESPONSE + "=" + apiResponse + "\n";
				}
				
				testData += PROPERTY_REQ_STATUES + "=" + apiStatus + "\n";
				
				if (apiPoll) {
					testData += PROPERTY_POLL + "=true" + "\n";	
				}
				
				if (compareResponse) {
					testData += PROPERTY_COMPARE_RESPONSE + "=true" + "\n";	
				}
				
				if (testVars != null && testVars.length > 0) {
					testData += PROPERTY_TEST_VARS + "=" + testVars + "\n";
				}
				
				if (testCondition != null && testCondition.length > 0) {
					testData += PROPERTY_TEST_CONDITION + "=" + testCondition + "\n";
				}
				
			}
			return testData;
		}
		
		function copyCallObj(callId) {
			var callObj = apiCalls[callId];
			if (callObj) {
				var text = _convertToTestData(callObj);
				_copyToClipboard(text);
			}
		}
		
		function _copyToClipboard(val){
			var dummy = document.createElement("textarea");
			document.body.appendChild(dummy);
			dummy.setAttribute("id", "dummy_id");
			document.getElementById("dummy_id").value=val;
			dummy.select();
			document.execCommand("copy");
			document.body.removeChild(dummy);
		}
		
		function _filterApiCall(callId) {
			var callObj = apiCalls[callId];
			if (callObj) {
				apiFilter.addFilter(callObj.method, callObj.url);
			}
		}
		
		function download() {
			var fileData = PROPERTY_FILE_PREFIX_DATA + "\n";
			
			if (savedCallList.length == 0) {
				alert("There's no API calls recorded !");
				return;
			}
			
			savedCallList.forEach(function(callData) {
				if (callData instanceof Object) {
					var testData = _convertToTestData(callData);
					fileData += testData + "\n\n"
				} else {
					fileData += ("#" + callData + "\n");
				}
			});
			
			_clearRecording();
			$(".restApiPanel #apiDownload").html("Download")
			
			var fileName  = "restapitest.properties";
    		var pom = document.createElement('a');
    		pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileData));
    		pom.setAttribute('download', fileName);
    		if (document.createEvent) {
        		var event = document.createEvent('MouseEvents');
        		event.initEvent('click', true, true);
        		pom.dispatchEvent(event);
    		}
    		else {
        		pom.click();
    		}
		}
		
		function _clearRecording() {
			clearApis();
			savedCallList = [];
		}
		
	}
})();

