const API_PANEL_HTML = 
	`
	<div class='restApiPanel'>
    <div id='restApiDialog' style='display:none;'> </div>
    <div class='apiPanelTop'>
        <div class='apiPanelTitle'>
            <span class='status stopped'>
            </span> REST API Inspector </div>
        <div class='apiPanelTopIcons'>
            <div id='settings' class='icon-settings'></div>
            <span class='apipanel-minus'>
			<b>-</b>
		</span>
            <span class='apipanel-close' style = 'display: none'>
			<b>X</b>
		</span>
        </div>
    </div>
    <div id='apiPanelBody' class='apiPanelBody'>
        <div id='apiSettingsContainer' class='apiSettingsContainer'> </div>
        <div id='apiRecordPanel' class='apiRecordPanel'>
            <div id='btnContainer'>
                <button id='apiStart'>Start</button>
                <button id='apiPause'>Pause</button>
                <button id='apiResume'>Resume</button>
                <button id='apiDownload'> Download </button>
            </div>
            <div class='apiInfoContainer'>
                <div class='apiTableTop'>
                    <span class='apiClassInfoTitle'>API CALL INFO</span>
                    <div class='btnContainer'>
                        <button id='filterBtn'>Filter</button>
                        <button id='editBtn'>Edit</button>
                        <button id='copyBtn'>Copy</button>
                        <button id='deleteBtn'>Delete</button>
                        <button id='clearBtn'>Clear</button>
                    </div>
                </div>
                <table id='apiInfoTable' class='apiInfoTable'>
                    <thead>
                        <tr>
                            <th class='checkAll'>
                                <input type='checkbox' name='check_all' value='all' />
                            </th>
                            <th class='colHead'>API Call</th>
                        </tr>
                    </thead>
                    <tbody> </tbody>
                </table>
                <div class='apiCommentContainer'>
                    <label>Comment : </label>
                    <div>
                        <input id='apiComment' type='text' name='Comment' />
                    </div>
                </div>
                <button id='apiAddBtn'>ADD</button>
            </div>
        </div>
    </div>
</div>
<div class='apiEditorContainer' style='display:none'>
    <label>Name </label>
    <input id='apiEditName' type='text' name='Comment' />
    <br>
    <br>
    <label>Request </label>
    <br>
    <textarea id='apiEditRequest' class='apiEditTA'> </textarea>
    <br>
    <br>
    <label>Response </label>
    <br>
    <textarea id='apiEditResponse' class='apiEditTA'> </textarea>
</div>
	`;
	
	
const API_PANEL_CSS = 
	`
	.restApiPanel .btn {}

	.apiRecordPanel div.apiInfoContainer {
	    width: 100%;
	    margin-top: 20px;
	    display: block;
	}

	#apiAddBtn,
	#apiDownload {
	    float: right;
	    margin-bottom: 10px;
	}

	.apiCommentContainer label {
	    float: left;
	}

	.apiCommentContainer div {
	    overflow: hidden;
	}

	.apiCommentContainer input {
	    width: 99%;
	    display: block;
	}

	.apiCommentContainer {
	    margin-top: 10px;
	    margin-bottom: 10px;
	}

	.restApiPanel {
	    background: white;
	    position: fixed;
	    right: 0;
	    bottom: 0;
	    width: 600px;
	    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .4);
	    border-radius: 10px 10px 0 0;
	    margin-right: 5px;
		z-index: 999999;
	}

	.apiPanelBody {
	    margin: 10px 10px;
	    background: white;
	    transition: .1s ease-out;
	}

	.apiPanelTop {
	    position: relative;
	    display: flex;
	    padding: 5px 0;
	    border-radius: 10px 10px 0 0;
	    background: rgba(0, 0, 0, .05);
	}

	.apiPanelTopIcons {
	    padding: 0 10px 0 0;
	    display: flex;
	    position: relative;
	}

	.apiPanelTopIcons span {
	    background: rgba(220, 0, 0, .6);
	    padding: 1px 10px;
	    margin: 0 0 0 3px;
	    color: white;
	    border-radius: 0 5px 0 5px;
	    transition: 0.3s;
	    font: arial, sans-serif;
	    cursor: pointer;
	}

	.apiPanelTopIcons span:hover {
	    border-radius: 5px 0 5px 0;
	    background: rgba(220, 0, 0, 1);
	}

	.apiPanelTitle {
	    flex: 1;
	    padding: 0 0 0 10px;
	    font-size: 15px;
	    font-weight: bold;
	    color: #30649c;
	    text-shadow: 1px 1px 0 white;
	    transition: .1s ease-out;
	}

	.restApiPanel .status {
	    width: 12px;
	    height: 12px;
	    border-radius: 50%;
	    display: inline-block;
	    box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2);
	    border: 1px solid rgba(0, 0, 0, 0.15);
	    background: #cacaca;
	    margin: -1px 3px;
	}

	.restApiPanel .running {
	    background: #008000;
	}

	.restApiPanel .paused {
	    background: #FFFF00;
	}

	.restApiPanel .stopped {
	    background: #FF0000;
	}

	.apiPanelBody-min {
	    display: none;
	}


	/* editor dialog content */

	.restapi-dialog-box .apiEditorContainer {
	    width: 97%;
	    padding: 10px;
        height: 90%;
		overflow: auto;
	    display: inline-block;
	    position: absolute;
	}

	.apiEditTA {
	    width: 100%;
	    resize: none;
	    height: 100px;
	}

	#apiEditName {
	    width: 100%;
	}
	
	.restapi-dialog-box .dialogButtonContainer {
		bottom: 0px;
    	position: absolute;
		right: 0px;
	    padding: 0px 30px;
	}



	/* Gear */

	.restApiPanel .icon-settings {
	    width: 16px;
	    height: 16px;
	    color: gray;
	    box-shadow: 0 0 0 4px inset;
	    border-radius: 16px;
	    border: 1px dashed;
	    display: block;
	    cursor: pointer;
	    margin-top: 2px;
	    margin-right: 4px;
	}

	.restApiPanel .icon-settings:hover {
	    color: #696969;
	}

	.apiInfoContainer table {
	    table-layout: fixed;
	    border-collapse: collapse;
	    border: 1px solid #eee;
	    width: 100%;
	}

	.apiInfoContainer thead tr {
	    display: block;
	    position: relative;
	}

	.apiInfoContainer tbody {
	    display: block;
	    overflow: auto;
	    width: 100%;
	    height: 200px;
	}

	.apiInfoContainer table {
	    font-family: arial, sans-serif;
	    border-collapse: collapse;
	}

	.apiInfoContainer td {
	    border: 1px solid #dddddd;
	    text-align: left;
	    padding: 8px;
	}

	.apiInfoContainer th {
	    text-align: centre;
	    padding: 8px;
	}

	.apiInfoContainer td.content,
	.apiInfoContainer th.content {
	    width: 150px;
	}

	.apiInfoContainer td.content input {
	    max-width: 130px;
	}

	.apiInfoContainer th.checkAll {
	    border-right: 1px solid #dddddd;
	    padding-left: 9px;
	}

	.apiInfoContainer thead {
	    border-bottom: 1px solid #dddddd;
	}

	.apiInfoContainer .colHead {
	    width: 100%;
	}

	.restApiPanel .btnContainer {
	    position: relative;
	    float: right;
	}

	.apiInfoContainer .apiInfoTable {
	    margin: 10px 0px;
	}
	`;
	
	
const API_SETTINGS_HTML = 
	`
	<div id='settingsContent'>
	  <div>
		<div id='homeBtn' class='apiHomeBtn'>
	    <a href='#'>Home</a></div>
	  <div class = 'apiSettingsOption'>
	    <select id = 'apiSettingsOption' >
	      <option value="filter">Filter Table</option>
	      <option value="swagger">Swagger Data</option>
	    </select>
	  </div> 
	    </div>
		<br>
		<div id = 'apiFilterContainer' class='filterContainer' >
	    <div>
	       <div class='filterTableTitle'>Filter Table</div>
		     <div class='filterTableBtnContainer'>
		     	<input id='uploadFilter' type='file' accept=".json" name="files[]" hidden/>
		     	<button id='import'>Import</button>
		     	<button id='export'>Export</button>
		        <button id='addBtn'>Add New Filter</button>
		     </div>
	      </div>
		    <div class='tableContainer'>
		        <table id='apiFilterTable'>
		            <thead>
		                <tr>
		                    <th class='checkAll'>
		                        <input type='checkbox' name='check_all' value='all' />
		                    </th>
		                    <th>METHOD</th>
		                    <th class='colHead'>URL</th>
		                    <th></th>
		                </tr>
		            </thead>
		            <tbody> </tbody>
		        </table>
		    </div>
		</div>
	  <div id='swaggerDataContainer' style='display:none'>
	    <br>
	     <label>Swagger Doc</label>
	    <div>
	    	<input id="uploadSwaggerJson" type=file   accept=".json" name="files[]"/>
	    	<button id='downloadSwagger'>Download</button>
	    </div>
	   </div>
	  <button id='saveBtn' class = 'saveBtn'>Save</button>
	</div>
	`;

const API_SETTINGS_CSS = 
	`
	.apiSettingsContainer .filterContainer {
	    width: 100%;
        margin-top: 10px;
	}

	.filterContainer .tableContainer {
	    margin: 10px 0px;
	}

	.filterContainer .btnContainer {
	    margin-bottom: 10px;
	    position: relative;
	    float: right;
	}

	.filterContainer table {
	    table-layout: fixed;
	    border-collapse: collapse;
	    border: 1px solid #eee;
	    width: 100%;
	}

	.filterContainer thead tr {
	    display: block;
	    position: relative;
	}

	.filterContainer tbody {
	    display: block;
	    overflow: auto;
	    width: 100%;
	    height: 235px;
	}

	.filterContainer table {
	    font-family: arial, sans-serif;
	    border-collapse: collapse;
	}

	.filterContainer td {
	    border: 1px solid #dddddd;
	    text-align: left;
	    padding: 8px;
	}

	.filterContainer th {
	    text-align: centre;
	    padding: 8px;
	}

	.filterContainer td.content,
	.filterContainer th.content {
	    width: 100%;
	}

	.filterContainer td.content input {
	    width: 92%;
	}

	.filterContainer td select {
	    width: 70px;
	}

	.filterContainer th.checkAll {
	    border-right: 1px solid #dddddd;
	    padding-left: 9px;
	}

	.filterContainer th.colHead {
	    width: 100%;
	}

	.apiSettingsContainer .borderLessInput {
	    border: none;
	    background: white;
	}

	.apiSettingsContainer .hideElm {
	    visibility: hidden
	}

	.apiSettingsContainer .deleteFilterBtn {
	    cursor: pointer
	}

 .apiSettingsOption {
    display:inline-block;
    float:right;
 }

.apiSettingsContainer .apiHomeBtn {
   display:inline-block;
}

.apiSettingsContainer .swaggerJsonTA {
	    width: 100%;
	    resize: none;
	    height: 150px;
}

.restApiPanel .apiSettingsContainer {
    min-height: 400px;
    margin: 10px;
}

.apiSettingsContainer .saveBtn {
    position: absolute;
    bottom: 0;
    right: 0px;
    margin: 15px;
}

.apiSettingsContainer .filterTableTitle {
   display:inline-block;
}

.apiSettingsContainer .filterTableBtnContainer {
    display:inline-block;
    float:right;
}
	`;
	
	

const API_POPUP_CSS = 
		`
		/* Skin for Simple Dialog Box Plugin */
	.restapi-dialog-box {
	  width:300px;
	  height:150px;
	  background-color:white;
	  border:1px solid #ccc;
	  -webkit-box-shadow:0 1px 5px rgba(0,0,0,.2);
	  -mz-box-shadow:0 1px 5px rgba(0,0,0,.2);
	  box-shadow:0 1px 5px rgba(0,0,0,.2);
	  position:absolute;
	  width:200px;
	  height:100px;
	  margin-top:-51px;
	  margin-left:-101px;
	  z-index:9999;
	  color:#666;
	  visibility:hidden;
	  opacity:0;
	}
	.restapi-dialog-box .restapi-dialog-title {
	  margin:0;
	  padding:0;
	  font:inherit;
	  color:inherit;
	  font-weight:bold;
	  height:2em;
	  line-height:2em;
	  overflow:hidden;
	  padding:0 .8em;
	  background-color:#eee;
	  cursor:move;
	}
	.restapi-dialog-box .restapi-dialog-content {
	  border-top:1px solid #ccc;
	  padding:1px;
	  position:absolute;
	  top:2em;
	  right:0;
	  bottom:3em;
	  left:0;
	}
	.restapi-dialog-box .restapi-dialog-content iframe {
	  display:block;
	  border:none;
	  background:none;
	  margin:0;
	  padding:0;
	  width:100%;
	  height:100%;
	}
	.restapi-dialog-box .restapi-dialog-content::-webkit-scrollbar {
	  width:8px;
	  height:8px;
	  background-color:#f5f5f5;
	  border-left:1px solid #ccc;
	}
	.restapi-dialog-box .restapi-dialog-content::-webkit-scrollbar-thumb {
	  background-color:#666;
	  border:none;
	}
	.restapi-dialog-box .restapi-dialog-content::-webkit-scrollbar-thumb:hover {background-color:#555}
	.restapi-dialog-box .restapi-dialog-content::-webkit-scrollbar-thumb:active {background-color:#444}
	.restapi-dialog-box .restapi-dialog-action {
	  position:absolute;
	  right:0;
	  bottom:0;
	  left:0;
	  height:2em;
	  padding:.5em;
	  background-color:#eee;
	  border-top:1px solid #ccc;
	  text-align:right;
	}
	.restapi-dialog-box .restapi-dialog-action .btn {
	  text-decoration:none;
	  border:none;
	  outline:none;
	  color:inherit;
	  font-weight:bold;
	  background-color:white;
	  border:1px solid #ccc;
	  -webkit-border-radius:.2em;
	  -moz-border-radius:.2em;
	  border-radius:.2em;
	  padding:.4em 1em;
	  margin-left:.2em;
	  line-height:2em;
	  cursor:pointer;
	}
	.restapi-dialog-box .restapi-dialog-close,
	.restapi-dialog-box .restapi-dialog-minmax {
	  border:none;
	  outline:none;
	  background:none;
	  font:inherit;
	  font-family:Arial,Sans-Serif;
	  font-style:normal;
	  font-weight:bold;
	  font-size:150%;
	  line-height:1.4em;
	  color:#aaa;
	  text-decoration:none;
	  position:absolute;
	  top:0;
	  right:.3em;
	  text-align:center;
	  cursor:pointer;
	}
	.restapi-dialog-box .restapi-dialog-minmax {right:1.5em}
	.restapi-dialog-box .restapi-dialog-close:focus,
	.restapi-dialog-box .restapi-dialog-minmax:focus,
	.restapi-dialog-box .restapi-dialog-action .btn:focus {
	  border-width:0;
	  outline:none;
	}
	.restapi-dialog-box .restapi-dialog-close:hover,
	.restapi-dialog-box .restapi-dialog-minmax:hover {color:#777}
	.restapi-dialog-box .restapi-dialog-close:focus,
	.restapi-dialog-box .restapi-dialog-minmax:focus {color:#C90000}
	.restapi-dialog-box .restapi-dialog-close:active,
	.restapi-dialog-box .restapi-dialog-minmax:active {color:#444}
	.restapi-dialog-box .restapi-dialog-action .btn:hover {border-color:#bbb}
	.restapi-dialog-box .restapi-dialog-action .btn:focus {
	  border-color:#aaa;
	  border-width:1px;
	}
	.restapi-dialog-box .restapi-dialog-action .btn:active {
	  border-color:#aaa;
	  background-color:#f5f5f5;
	}
	.restapi-dialog-box + .restapi-dialog-box-overlay {
	  background-color:black;
	  opacity:.2;
	  filter:alpha(opacity=20);
	  position:fixed !important;
	  position:absolute;
	  top:0;
	  right:0;
	  bottom:0;
	  left:0;
	  z-index:9997;
	  display:none;
	}
	.restapi-dialog-box.fixed-restapi-dialog-box {
	  position:fixed !important;
	  position:absolute;
	  overflow: auto;
	}
	.restapi-dialog-box.minimize {
	  width:2em !important;
	  height:2em !important;
	  overflow:hidden !important;
	  margin-top:0 !important;
	  margin-left:0 !important;
	  top:-1px !important;
	  left:1em !important;
	}
	.restapi-dialog-box.minimize .restapi-dialog-title {
	  color:transparent;
	  text-shadow:none;
	  text-indent:-9999px;
	}
	.restapi-dialog-box.minimize .restapi-dialog-minmax {
	  right:0;
	  left:0;
	}
	.restapi-dialog-box.minimize .restapi-dialog-close,
	.restapi-dialog-box.minimize .restapi-dialog-content,
	.restapi-dialog-box.minimize .restapi-dialog-action {
	  display:none;
	  visibility:hidden;
	}
	
	.restapi-dialog-box .editorLabel {
	    min-width:120px;
	    text-transform: uppercase;
	    display:inline-block
	}

	.restapi-dialog-box .editorTA {
	  height: 4em;
	  width: 90%;
	}
	
		`;
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


(function() {
	REST_EXT.ApiCallTable = ApiCallTable;
	function ApiCallTable(apiCallRecorder) {
		var objRef = this;
		
		var EDIT_BTN_TYPE = 1;
		var COPY_BTN_TYPE = 2;
		var DELETE_BTN_TYPE = 3;
		var CLEAR_BTN_TYPE = 4;
		var FILTER_BTN_TYPE = 5;
		
		var apiRecorder = apiCallRecorder;
		
		objRef.addRequest = addRequest;
		objRef.clear = clear;
		objRef.save = save;
		
		
		var restApiDialog = null;
		
		var editor;
		var table;
		
		var selectedRows = [];
	
		init();
		
		function init() {
			_clearTable();
			_initRowSelectionListener();
			_initButtonClickListeners();
			_enableButtons();
		}
		
		function _clearTable() {
			selectedRows = [];
			$('#apiInfoTable tbody').html("");
		}
		
		// Row selection listeners
		function _initRowSelectionListener() {
			$('#apiInfoTable').on('click', 'input:checkbox', function(){
				var apiId = $(this).parent().parent().data().apiid;
				if (apiId) {
					var checked = $(this).is(':checked');
					_handleApiSelection(checked, apiId);
				}
			});
		}
		
		function _handleApiSelection(isSelected , apiId){
			apiId = apiId + "";
			if (isSelected) {
				selectedRows.push(apiId);
			} else {
				
				var index = selectedRows.indexOf(apiId);
				if (index != -1) {
					selectedRows.splice(index, 1);
				}
			}
			_enableButtons();
		}
		
		function _enableButtons() {
			var rowCount = selectedRows.length;
			if (rowCount == 0) {
				$('#apiRecordPanel #editBtn').hide();
				$('#apiRecordPanel #copyBtn').hide();
				$('#apiRecordPanel #deleteBtn').hide();
				$('#apiRecordPanel #filterBtn').hide();
			} else if (rowCount == 1) {
				$('#apiRecordPanel #editBtn').show();
				$('#apiRecordPanel #copyBtn').show();
				$('#apiRecordPanel #deleteBtn').show();
				$('#apiRecordPanel #filterBtn').show();
			} else {
				$('#apiRecordPanel #editBtn').hide();
				$('#apiRecordPanel #copyBtn').hide();
				$('#apiRecordPanel #deleteBtn').show();
				$('#apiRecordPanel #filterBtn').hide();
			}
		}
		
		function _initButtonClickListeners() {
			 $('#apiRecordPanel #editBtn').click( function() {_handleTableButtonClick(EDIT_BTN_TYPE)});
			 $('#apiRecordPanel #copyBtn').click( function() {_handleTableButtonClick(COPY_BTN_TYPE)});
			 $('#apiRecordPanel #deleteBtn').click( function() {_handleTableButtonClick(DELETE_BTN_TYPE)});
			 $('#apiRecordPanel #clearBtn').click( function() {_handleTableButtonClick(CLEAR_BTN_TYPE)});
			 $('#apiRecordPanel #filterBtn').click( function() {_handleTableButtonClick(FILTER_BTN_TYPE)});
		}
		
		function _handleTableButtonClick(type) {
			switch (type) {
			case EDIT_BTN_TYPE:
				var callId = selectedRows[0];
				var data = apiCallRecorder.getCallObj(callId);
				apiEditorDialog = new REST_EXT.ApiEditorDialog();
				apiEditorDialog.setCaller(objRef);
				apiEditorDialog.setData(data);
				apiEditorDialog.show(); 
				break;
			case COPY_BTN_TYPE:
				var callId = selectedRows[0];
				apiCallRecorder.copyCallObj(callId);
				break;
			case DELETE_BTN_TYPE:
				for(var i = 0;i < selectedRows.length; i ++) {
					var callId = selectedRows[i];
					apiCallRecorder.deleteCallObj(callId);
					var row = _getTableRow(callId);
					if (row) {
						_deleteRow(row.index());
					}
				}
				selectedRows = [];
				break;
			case CLEAR_BTN_TYPE:
				apiCallRecorder.clearApis();
				break;
			case FILTER_BTN_TYPE:
				//filter the selected CALL
				var callId = selectedRows[0];
				apiCallRecorder.filterApiCall(callId);
				break;
			default:
				break;
			}
			_enableButtons();
		}
		
		function addRequest(data) {
			if (data.count) {
				var callId = data.callId;
				var prevId = parseInt(callId) - 1;
				_updateRow(prevId, data);
			} else {
				_addRow(data);
			}
		}
		
		function clear() {
			_clearTable();
			_enableButtons();
		}
		
		// Table operations
		function _addRow(data) {
			var rowHtml = _getRowHtml(data);
			$('#apiInfoTable').append(rowHtml);
				
			var rowpos = $('#apiInfoTable tr:last').position();
			$('#apiInfoTable>tbody').scrollTop(rowpos.top);
		}
		
		function _addRowWithIndex(index, data) {
			var tableLength = _getTableLength();
			if (tableLength == 0) {
				_addRow(data);
			} else {
				var rowHtml = _getRowHtml(data);
				if(index == 0) {
					$('#apiInfoTable > tbody > tr').eq(index).before(rowHtml);
				} else {
					$('#apiInfoTable > tbody > tr').eq(index-1).after(rowHtml);
				}
			}
		}
		
		function _updateRow(callId, data) {
			var row = _getTableRow(callId);
			if (row) {
				 var index = row.index();
				 _deleteRow(index);
				 _addRowWithIndex(index, data);
				 
				 if (selectedRows.indexOf(callId) != -1) {
					 selectedRows.splice(selectedRows.indexOf(callId), 1);
				 }
				 _enableButtons();
			} else {
				_addRow(data);
			}
		}
		
		function _deleteRow(index) {
			 document.getElementById("apiInfoTable").deleteRow(index + 1);
		}
		
		function _getTableLength() {
			return $("#apiInfoTable > tbody > tr").length;
		}
		
		function _getTableRow(id) {
			try {
				return $("#row_" + id);
			} catch (e) {
				console.log(e);
			}
			return null;
		}
		
		function _getRowHtml(apiCall) {
			var id = apiCall.callId;
			
			var API_NAME = apiCall.method + " : " + apiCall.apiName;
			var API_TITLE = apiCall.url;
			var API_COUNT = apiCall.count ? apiCall.count : "";
			
			
			var row = "<tr id ='row_API_ID' data-apiId='API_ID'> <td> <input type='checkbox' name='check_API_ID' value='API_ID' /></td> " +
						" <td class='colHead'><div id = 'div_API_ID' title = 'API_TITLE'>API_NAME</div></td>" +
						" <td><div id = 'count_API_ID'>API_COUNT</div></tr> ";
			
			row = _replaceAll(row, "API_ID", id);
			row = _replaceAll(row, "API_NAME", API_NAME);
			row = _replaceAll(row, "API_TITLE", API_TITLE);
			row = _replaceAll(row, "API_COUNT", API_COUNT);
			
			return row;
		}
		

		function _replaceAll(str, find, replace) {
			return str.replace(new RegExp(find, 'g'), replace);
		}
		
		function save(apiCallInfo) {
			var callId = apiCallInfo.callId + "";
			_updateRow(callId, apiCallInfo);
		}

	}
	
})();


(function() {
	REST_EXT.ApiEditorDialog = ApiEditorDialog;
	function ApiEditorDialog() {
		var objRef = this;
		var uniqueId = new Date().getTime();
		var selected = null; // Object of the element to be moved
		
		var a = window;
		var b = document;
		
		var height = 600;
		var width = 800;
		var title = "API Info";
		var body = "<div id = 'apiEditorContainer' class = 'apiEditorContainer'> <label class='editorLabel'> <b>API_TEST</b> </label> <input id = 'apiName' type='text'/> <br> <br> <label class='editorLabel'> <b>API_URL</b> </label> <input id = 'apiUrl' type='text'/> <br> <br> <label class='editorLabel'> <b>API_METHOD</b> </label> <select id = 'apiHttpMethod'> <option value='GET'>GET</option> <option value='POST'>POST</option> <option value='DELETE'>DELETE</option> <option value='PUT'>PUT</option> </select> <br> <br> <label> <b>API_REQUEST</b> </label> <br> <textarea id = 'apiRequest' class = 'editorTA'> </textarea> <br> <br> <label> <b>API_RESPONSE</b> </label> <br> <textarea id = 'apiResponse' class = 'editorTA'> </textarea> <br> <br> <label class='editorLabel'> <b>API_STATUS</b> </label> <input id = 'apiStatus' type='text'/> <br> <br> <hr style='border: 1px dashed black;' /><br> <label class='editorLabel'> <b>API_POLL</b> </label> <input type='checkbox' id= 'apiPoll'/> <br> <br> <label class='editorLabel'> <b>COMPARE_RESPONSE</b> </label> <input type='checkbox' id= 'compareResponse'/> <br> <br> <label> <b>TEST_VARS</b> </label> <br> <textarea id = 'testVars' class = 'editorTA'> </textarea> <br> <br> <label> <b>TEST_CONDITION</b> </label> <br> <textarea id = 'testCondition' class = 'editorTA'> </textarea> <br> <br> </div><div class='dialogButtonContainer'><button id='cancelApiDialog'>Cancel</button> <button id='saveApiDialog'>Save</button></div>";
		
		var apiInfo = null;
		var callerObj = null;
		
		init();
		
		dialog = b.getElementById('restapi-dialog-box-' + uniqueId), // The HTML of dialog box
		dialog_title = dialog.children[0],
		dialog_close = dialog.children[1],
		dialog_content = dialog.children[2],
		dialog_overlay = dialog.nextSibling;

		objRef.setData = setData;
		objRef.setCaller = setCaller;
		objRef.show = show;
		
		function show() {
			setDialog('open', {});
			_fillContent();
			document.getElementById("cancelApiDialog").addEventListener("click", function() { setDialog("close", {content:""});});
			document.getElementById("saveApiDialog").addEventListener("click", _save);
		}
		
		function setData(data) {
			apiInfo = data;
		}
		
		function setCaller(caller) {
			callerObj = caller;
		}
		
		function setData(data) {
			apiInfo = data;
		}
		
		function init() {
			var div = b.createElement('div'),
			ovr = b.createElement('div');
			div.className = 'restapi-dialog-box';
			div.id = 'restapi-dialog-box-' + uniqueId;
			div.innerHTML = '<h3 class="restapi-dialog-title">&nbsp;</h3><a href="javascript:;" class="restapi-dialog-close" title="Close">&times;</a><div class="restapi-dialog-content">&nbsp;</div>';
			ovr.className = 'restapi-dialog-box-overlay';
			b.body.appendChild(div);
			b.body.appendChild(ovr);
		}
		
		function setDialog(set, config) {
			x_pos = 0,
			y_pos = 0, // Stores x & y coordinates of the mouse pointer
			x_elem = 0,
			y_elem = 0, // Stores top, left values (edge) of the element
			defaults = {
				title: title,
				content: body,
				width: width,
				height: height,
				top: 100,
				left: 100,
				buttons: {
					"Close": function() {
						setDialog('close');
					}
				},
				specialClass: "",
				fixed: true,
				overlay: false
			}; // Default options...

			for (var i in config) { defaults[i] = (typeof(config[i])) ? config[i] : defaults[i]; }

			dialog.className =  "restapi-dialog-box " + (defaults.fixed ? 'fixed-restapi-dialog-box ' : '') + defaults.specialClass;
			dialog.style.visibility = (set == "open") ? "visible" : "hidden";
			dialog.style.opacity = (set == "open") ? 1 : 0;
			dialog.style.width = defaults.width + 'px';
			dialog.style.height = defaults.height + 'px';
			dialog.style.top = (!defaults.top) ? "50%" : '0px';
			dialog.style.left = (!defaults.left) ? "50%" : '0px';
			dialog.style.marginTop = (!defaults.top) ? '-' + defaults.height/2 + 'px' : defaults.top + 'px';
			dialog.style.marginLeft = (!defaults.left) ? '-' + defaults.width/2 + 'px' : defaults.left + 'px';
			dialog_title.innerHTML = defaults.title;
			dialog_content.innerHTML = defaults.content;
			dialog_overlay.style.display = (set == "open" && defaults.overlay) ? "block" : "none";


			// Bind the draggable function here...
			dialog_title.onmousedown = function() {
				_drag_init(this.parentNode);
				return false;
			};

			dialog_close.onclick = function() {
				setDialog("close", {content:""});
			};

			b.onmousemove = _move_elem;
			b.onmouseup = _destroy;
		}
		
		// Will be called when user starts dragging an element
		function _drag_init(elem) {
			selected = elem; // Store the object of the element which needs to be moved
			x_elem = x_pos - selected.offsetLeft;
			y_elem = y_pos - selected.offsetTop;
		}

		// Will be called when user dragging an element
		function _move_elem(e) {
			x_pos = b.all ? a.event.clientX : e.pageX;
			y_pos = b.all ? a.event.clientY : e.pageY;
			if (selected !== null) {
				selected.style.left = !defaults.left ? ((x_pos - x_elem) + selected.offsetWidth/2) + 'px' : ((x_pos - x_elem) - defaults.left) + 'px';
				selected.style.top = !defaults.top ? ((y_pos - y_elem) + selected.offsetHeight/2) + 'px' : ((y_pos - y_elem) - defaults.top) + 'px';
			}
		}

		// Destroy the object when we are done
		function _destroy() {
			selected = null;
		}
		
		function _save() {
			var apiName;
			var apiUrl;
			var apiHttpMethod;
			var apiRequest;
			var apiResponse;
			var apiStatus;
			var apiPoll;
			var compareResponse;
			var testVars;
			var testCondition;
			
			apiName = document.getElementById("apiName").value;
			apiUrl = document.getElementById("apiUrl").value;
			apiRequest = document.getElementById("apiRequest").value;
			apiResponse = document.getElementById("apiResponse").value;
			apiStatus = document.getElementById("apiStatus").value;
			testVars = document.getElementById("testVars").value;
			testCondition = document.getElementById("testCondition").value;
			
			apiHttpMethod = document.getElementById("apiHttpMethod").value;
			
			apiPoll = document.getElementById("apiPoll").checked;
			compareResponse = document.getElementById("compareResponse").checked;
			

			apiInfo.apiName = apiName;
			apiInfo.url = apiUrl;
			apiInfo.method = apiHttpMethod;
			apiInfo.request = apiRequest;
			apiInfo.response = apiResponse;
			apiInfo.status = apiStatus;
			apiInfo.apiPoll = apiPoll;
			apiInfo.compareResponse = compareResponse;
			apiInfo.testVars = testVars;
			apiInfo.testCondition = testCondition;		
			
			callerObj.save(apiInfo);
			
			setDialog("close", {content:""});
		}
		
		function _fillContent() {
			var apiName = apiInfo.apiName;
			var apiUrl = apiInfo.url;
			var apiHttpMethod = apiInfo.method;
			var apiRequest = apiInfo.request;
			var apiResponse = apiInfo.response;
			var apiStatus= apiInfo.status;
			var apiPoll = apiInfo.apiPoll;
			var compareResponse = apiInfo.compareResponse;
			var testVars = apiInfo.testVars;
			var testCondition = apiInfo.testCondition;
			
			if (!apiPoll) {
				apiPoll = (apiInfo.count && apiInfo.count > 2) ? true : false;
			}
			
			if (!compareResponse) {
				compareResponse = false;
			}
			
			if (!apiRequest) {
				apiRequest = "";
			}
			
			if (!apiResponse) {
				apiResponse = "";
			}
			
			if (!testVars) {
				testVars = "";
			}
			
			if (!testCondition) {
				testCondition = "";
			}
			
			document.getElementById("apiName").value = apiName;
			document.getElementById("apiUrl").value = apiUrl;
			document.getElementById("apiRequest").value = apiRequest
			document.getElementById("apiResponse").value = apiResponse;
			document.getElementById("apiStatus").value = apiStatus;
			document.getElementById("testVars").value = testVars;
			document.getElementById("testCondition").value = testCondition;
			document.getElementById("apiHttpMethod").value = apiHttpMethod;
			
			document.getElementById("compareResponse").checked = compareResponse;
			document.getElementById("apiPoll").checked = apiPoll;
		}
		
	};
	
	ApiEditorDialog.getInstance = function () {
		if (!ApiEditorDialog.instance) {
			ApiEditorDialog.instance = new ApiEditorDialog();
		}
		return ApiEditorDialog.instance;
	};
})();
( function()
{
	REST_EXT.ApiFilter = ApiFilter;
	
	function ApiFilter() {
		var objRef = this;
		
		var swaggerData;
		
		var customFilteredData = {};
		var selectedCustomFilters = [];
		
		var ApiDoc = REST_EXT.ApiDoc;
	
		objRef.isApiCallAllowed = _isApiCallAllowed;
		objRef.render = render;
		objRef.addFilter = _addFilter;
		
		objRef.saveFilterData = saveFilterData;
		objRef.saveSwaggerData = saveSwaggerData;
		
		objRef.setSwaggerData = setSwaggerData;	
		objRef.getSwaggerData = getSwaggerData;
		
		_init();
		
		function _init() {
			// Fetching selecedFiltered data from browser storage
			_initMessageReceivingListener();
			
			_requestApiFilterData();
			_requestApiSwaggerData();
			
			// Fetching customFilteredPanel from browser storage
			_initListeners();
		}
		
		function _initMessageReceivingListener() {
			window.addEventListener("message", function(event) {
				if (event.source != window)
					return;

				if (event.data.type && (event.data.type == "API_FILTER_DATA_RESULT")) {
					loadFilterData(event.data.data);
				}
				
				if (event.data.type && (event.data.type == "API_SWAGGER_DATA_RESULT")) {
					loadSwaggerData(event.data.data);
				}
				
			}, false);
		}
		
		function loadFilterData(data) {
			var filterData;
			try {
				filterData = JSON.parse(data);
			} catch(e){
				
			}
			if (filterData) {
				if(filterData["customFilteredData"]) {
					customFilteredData = filterData["customFilteredData"]
				}
				
				if(filterData["selectedCustomFilters"]) {
					selectedCustomFilters = filterData["selectedCustomFilters"]
				}
			}
		}
		
		function loadSwaggerData(data) {
			var swagData;
			try {
				swagData = JSON.parse(data);
			} catch(e){
				
			}
			
			swaggerData = null;
			
			if (swagData) {
				if(swagData["swaggerData"]) {
					swaggerData = swagData["swaggerData"];
				}
			}
			
			ApiDoc.getInstance().updateSwaggerData(swaggerData);
		}
		
		function _requestApiFilterData() {
			const domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
			window.postMessage({ type: 'API_FILTER_DATA_REQUEST'}, domain);
		}
		
		function _requestApiSwaggerData() {
			const domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
			window.postMessage({ type: 'API_SWAGGER_DATA_REQUEST'}, domain);
		}
		
		function _saveApiFilterData(filterData) {
			const domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
			window.postMessage({ type: 'API_FILTER_DATA_SAVE', data: filterData}, domain);
		}
		
		function saveSwaggerData() {
			const domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
			
			var data = {};
			data["swaggerData"] = swaggerData;
			var swagData = JSON.stringify(data);
			
			window.postMessage({ type: 'API_SWAGGER_DATA_SAVE', data: swagData}, domain);
			
			ApiDoc.getInstance().updateSwaggerData(swaggerData);
		}
		
		function _initListeners() 
		{
			$("#apiSettingsContainer #addBtn").click(_addNewFilter);
			
			$("#apiSettingsContainer #import").click(_importFilter);
			
			$("#apiSettingsContainer #export").click(_exportFilter);
			
			$("#apiSettingsContainer #uploadFilter").change(_handleFilterUpload);
			
			$('#apiSettingsContainer').on('click', '.deleteFilterBtn', function(){
				_deleteFilter($(this).parent().parent());
			});
			
			$('#apiSettingsContainer').on('click', 'input:checkbox', function(){
				var filterId = $(this).parent().parent().data().filterid;
				filterId = Number(filterId);
				var checked = $(this).is(':checked');
				_handleFilterSelection(checked, filterId);
			});
			
		}
		
		function render() {
			$("#apiFilterTable > tbody").html("");
			_showCustomFilters();
		}
		
		function _showCustomFilters() {
			for(var key in customFilteredData) {
				var filterData = customFilteredData[key]; 
				var filterId = filterData.id;
				var url = filterData.url;
				var method = filterData.method;
				
				var apiId = method + ":" + url;
				var isSelected = (selectedCustomFilters.indexOf(apiId) != -1); 
				var rowHtml = _getRowHtml(filterId,url, isSelected ,false);
				$('#apiFilterTable').append(rowHtml);
				
				// updating URL method
				method = method.toUpperCase();
				$("#method_" + filterId).val(method);
			}
		
		}
		
		function _addFilter(method, url) {
			var url = url.split("?")[0];
			
			var apiData = ApiDoc.getInstance().getApiInfo(url, method);
			if (apiData["path"]) {
				url = apiData["path"];
			}
			
			var filterId = new Date().getTime();
			var filter = {};
			filter.id = filterId;
			filter.method = method;
			filter.url = url;
			
			var apiId = method + ":" + url;
			customFilteredData[apiId] =filter;
			selectedCustomFilters.push(apiId);
		}
		
		function _addNewFilter(){
			var filterId = new Date().getTime();
			var rowHtml = _getRowHtml(filterId,  "",  false ,false);
			$('#apiFilterTable').append(rowHtml);
			
			var rowpos = $('#apiFilterTable tr:last').position();
			$('#apiFilterTable>tbody').scrollTop(rowpos.top);
			
		}
		
		function _importFilter() {
			$("#apiSettingsContainer #uploadFilter").click();
		}
		
		function _exportFilter() {
			var filterData = _getFilteredData();
			filterData = JSON.stringify(filterData);

			var fileData = filterData;
			var fileName = "filter.json";
			var pom = document.createElement('a');
			pom.setAttribute('href', 'data:json;charset=utf-8,'
					+ encodeURIComponent(fileData));
			pom.setAttribute('download', fileName);

			if (document.createEvent) {
				var event = document.createEvent('MouseEvents');
				event.initEvent('click', true, true);
				pom.dispatchEvent(event);
			} else {
				pom.click();
			}
		}
		
		function _handleFilterUpload(evt) {
		    var files = evt.target.files; 
		    f = files[0];

		    var reader = new FileReader();
		    reader.onload = (function(theFile) {
		        return function(e) {
		          var filterDataStr = e.target.result;
		          
		          var filterData = null;
		          try {
		        	  filterData = JSON.parse(filterDataStr);
		          } catch(exception) {
		        	  
		          }
				
				  if (filterData == null
							|| filterData["customFilteredData"] == null
							|| filterData["selectedCustomFilters"] == null) {
						alert("Invalid Filtered data/format found !");
						return;
				  }
		          
		          if (confirm("This will override old filters !") == true) {
		        	  customFilteredData = filterData["customFilteredData"];
		        	  selectedCustomFilters = filterData["selectedCustomFilters"];
		        	  render();
		          } else {
		             return;
		          }   
		        };
		     })(f);
		    
		     reader.readAsText(f);
		 }
		
		function _deleteFilter(row){
			var filterId = row.data().filterid;
			filterId = Number(filterId);
			row.remove();
		}
		
		function _handleFilterSelection(checked, filterId) {
			
		}
		
		function setSwaggerData(data) {
			swaggerData = data;
		}

		function getSwaggerData() {
			return swaggerData;
		}
		
		function saveFilterData(){
		
			var filterData = _getFilteredData();
			
			customFilteredData = filterData["customFilteredData"];
			selectedCustomFilters = filterData["selectedCustomFilters"];
			
			filterData = JSON.stringify(filterData);
			 // Save it using the Chrome extension storage API.
			_saveApiFilterData(filterData);
		}
		
		function _getFilteredData() {
			var selFilters = [];
			var filters = {};
			var rows = $('#apiFilterTable > tbody > tr');
			for(var i=0; i<rows.length; i++) {
				var row = rows[i];
				var filterId =row.dataset.filterid;
				filterId = Number(filterId);
				
				var isChecked = $('input[name=check_' + filterId + ']').is(':checked');
				var url = $('input[name=url_' + filterId + ']').val();
				var method = $("#method_" + filterId + " option:selected").val();
				
				var filterData = {};
				filterData.id = filterId;
				filterData.url = url;
				filterData.method = method;
				
				
				var apiId = method + ":" + url;
				filters[apiId] = filterData;;
				
				if (isChecked) {
					selFilters.push(apiId);
				}
			}
			
			var data = {};
			data["customFilteredData"] = filters;
			data["selectedCustomFilters"] = selFilters;
			return data;
		}
		
		function _getRowHtml(id, url, isSelected, isReadOnly) {
			var readOnly = "";
			var inputClass = "";
			var buttonClass = "class='deleteFilterBtn'";
			if (isReadOnly) {
				inputClass = "class='borderLessInput'";
				buttonClass = "class='hideElm'";
				readOnly = "readOnly disabled";
			}
			
			var checked = "";
			if (isSelected) {
				checked = "checked";
			}
			
			var row = "<tr id ='row_FILTER_ID' data-filterId='FILTER_ID'>" +
					  "<td><input type='checkbox' CHECKED name='check_FILTER_ID' value='FILTER_ID'/> </td>" +
					  "<td><select id ='method_FILTER_ID' > <option value='GET'>GET</option> <option value='POST'>POST</option> <option value='DELETE'>DELETE</option> <option value='PUT'>PUT</option> </select></td>" + 
					  "<td class ='content'><input INPUT_CLASS type='text' name='url_FILTER_ID' value='URL_VALUE' title='URL_VALUE' INPUT_READ_ONLY/></td>" +
					  "<td><div BUTTON_CLASS>X</div></td></tr>";
			
			row = _replaceAll(row, "CHECKED", checked);
			row = _replaceAll(row, "INPUT_READ_ONLY", readOnly);
			row = _replaceAll(row, "INPUT_CLASS", inputClass);
			row = _replaceAll(row, "BUTTON_CLASS", buttonClass);
			row = _replaceAll(row, "FILTER_ID", id);
			row = _replaceAll(row, "URL_VALUE", url);
			
			
			return row;
		}
		
		
		
		function _replaceAll(str, find, replace) {
			return str.replace(new RegExp(find, 'g'), replace);
		}
		
		function _isApiCallAllowed(method, url) {
			var url = url.split("?")[0];
			try {
				for (var i=0; i<selectedCustomFilters.length; i++) {
					var filterData = customFilteredData[selectedCustomFilters[i]];
					if (filterData && filterData.method == method) {
						var matchStatus = _matchUrls(url, filterData.url);
						if (matchStatus) {
							return false;
						}
					} 
				}
				
			} catch(e){
				console.log("Issues in request filter !");
			}
			return true;
		}
	
		function _matchUrls(url, filteredUrl) {
			if(url == filteredUrl) {
				return true;
			}
			
			var regexUrl = filteredUrl.replace(/\{[^}]+\}/g, "(\\w+)");
		    regexUrl = "" + regexUrl + "$";
		    var res = url.match(regexUrl);
		    if (res && res.length > 0) {
		    	return true;
		    }
			return false;
		}
	}
	
	ApiFilter.getInstance = function () {
        if (!ApiFilter.instance) {
            ApiFilter.instance = new ApiFilter();
        }
        return ApiFilter.instance;
    };
	
})();

(function() {
	REST_EXT.ApiDoc = ApiDoc;
	
	function ApiDoc() {
		var objRef = this;
		var swaggerData;
		var restBasePath;
		
		var ApiTree = REST_EXT.ApiTree;
		var ApiFilter = REST_EXT.ApiFilter.getInstance();
	
		var apiTree = null;
		
		objRef.isApiDocAvbl = isApiDocAvbl;
		objRef.getApiInfo = getApiInfo;
		objRef.updateSwaggerData = updateSwaggerData;
		
		var apiPaths = [];
		
		init();
		
		function init() {
			swaggerData = ApiFilter.getSwaggerData();
			restBasePath = null;
			if (swaggerData && swaggerData.basePath) {
				restBasePath = swaggerData.basePath;
			}
			buildApiTree();
		}
		
		function buildApiTree() {
			if (swaggerData && swaggerData.paths) {
				apiTree = new ApiTree();
				apiPaths = swaggerData.paths;
				var pathList = [];
				for(var path in apiPaths) {
					pathList.push(path);
				}
				apiTree.buildApiTree(pathList);
			}
		}
		
		function updateSwaggerData(swagData) {
			swaggerData = swagData;
			restBasePath = null;
			if (swaggerData && swaggerData.basePath) {
				restBasePath = swaggerData.basePath;
			}
			buildApiTree();
		}
		
		function isApiDocAvbl() {
			return (apiTree != null);
		}
		
		function getApiInfo(url, method) {
			if (apiTree == null) {
				return {};
			}
			
			if (restBasePath && restBasePath.length > 0) {
				var index = url.indexOf(restBasePath);
				if (index != -1) {
					index = index + restBasePath.length;
					url = url.substring(index);
				}
			}
			
			var apiInfo = {};
			var path = apiTree.findMatchingApi(url);
			var method = method.toLowerCase();
			if (path && apiPaths[path] && apiPaths[path][method]) {
				apiInfo["path"] = path;
				apiInfo["name"] = apiPaths[path][method].operationId;
				apiInfo["summary"] = apiPaths[path][method].summary;
			}
			return apiInfo;
		}
	
		/*
		var restInfo = {};
		
		function getApiInfo(url, method) {
			
			if (restBasePath && restBasePath.length > 0) {
				var index = url.indexOf(restBasePath);
				if (index != -1) {
					index = index + restBasePath.length;
					url = url.substring(index);
				}
			}
			
			var method = method.toLowerCase();
			var apiInfo = {};
			
			var urlParts = url.split("/");
			var apiPaths = swaggerData.paths;
			for(var path in apiPaths) {
				var pathArr = path.split("/");
				if (urlParts.length == pathArr.length) {
					var startIndex = 0;
					var endIndex = pathArr.length -1;
					while(startIndex <= endIndex) {
						var frontElm = pathArr[startIndex];
						var rearElm = pathArr[endIndex];
						if (frontElm == urlParts[startIndex] || frontElm[0] == "{" ) {
							if (rearElm == urlParts[endIndex] || rearElm[0] == "{" ) {
								startIndex++;
								endIndex--;
							} else {
								break;
							}
						} else {
							break;
						}
					}
					
					if (startIndex > endIndex && apiPaths[path][method])  {
						apiInfo["path"] = path;
						apiInfo["name"] = apiPaths[path][method].operationId;
						apiInfo["summary"] = apiPaths[path][method].summary;
						return apiInfo;
					}
				}
			} 
			return apiInfo;
		}
		
		*/
		
		/*	function downloadApiDoc() {
				var baseUrl = window.location.protocol + "//" + window.location.host;
				baseUrl = baseUrl.replace("manager","provider");
				var swagUrl = baseUrl + "/" + "com.fico.dmp.swagger/Swagger/manager/DMP%20manager/swagger.json";
				
				var xhr = new XMLHttpRequest();
				xhr.open("GET", swagUrl, true);
				xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
				xhr.onload = function () {
					console.log(xhr.responseText);
				};
				xhr.send();
			}
		 */
	}
	ApiDoc.getInstance = function () {
        if (!ApiDoc.instance) {
            ApiDoc.instance = new ApiDoc();
        }
        return ApiDoc.instance;
    };
})();
(function() {

	REST_EXT.ApiNode = ApiNode;
	function ApiNode(name, type) {
		var objRef = this;

		var name = name;
		var type = type;
		var data = null;
		var fixedChildren = [];
		var dynamicChildren = [];

		objRef.getName = getName;
		objRef.getType = getType;
		objRef.getData = getData;
		objRef.getFixedChildren = getFixedChildren;
		objRef.getDynamicChildren = getDynamicChildren;
		objRef.setData = setData;
		objRef.addChild = addChild;

		function getName() {
			return name;
		}

		function getType() {
			return type;
		}

		function getData() {
			return data;
		}

		function getFixedChildren() {
			return fixedChildren;
		}

		function getDynamicChildren() {
			return dynamicChildren;
		}

		function addChild(node) {
			if (node.getType() == 1) {
				fixedChildren.push(node);
			} else {
				dynamicChildren.push(node);
			}
		}

		function setData(nodeData) {
			data = nodeData;
		}

	}

})();

(function() {

	REST_EXT.ApiTree = ApiTree;
	function ApiTree() {
		var objRef = this;
		
		var apiTreeRoot;
		
		var ROOT_NODE 			= 0;
		var FIXED_API_NODE 		= 1;
		var DYNAMIC_API_NODE 	= 2;
	
		objRef.buildApiTree = _buildApiTree;
		objRef.addApiToTree = _addApiToTree;
		objRef.findMatchingApi = _findMatchingApi;
		
		var ApiNode = REST_EXT.ApiNode;
		
		init();
		
		function init() {
			apiTreeRoot = new ApiNode("root", ROOT_NODE);
		}

		function _buildApiTree(apiList) {
			for (var i = 0; i < apiList.length; i++) {
				var path = apiList[i];
				var node = _addApiToTree(path);
				node.setData(path);
			}
		}

		function _findMatchingApi(dynUrl) {
			var urlFields = dynUrl.split("/");
			if (urlFields[0] == "") {
				urlFields.shift();
			}
			var api = null;
			var node = _searchApi(apiTreeRoot, urlFields, -1);
			if (node != null && node.getData() != null) {
				api = node.getData();
			}
			
			if (api != null) {
				api = api.trim();
				if (api.indexOf("{") == 1 && api.indexOf("}") == api.length - 1) {
					api = null;
				}
			}
			
			return api;
		}

		function _addApiToTree(api) {
			var node = apiTreeRoot;
			
			api = api.trim();
			var apiFields = api.split("/");
			if (apiFields[0] == "") {
				apiFields.shift();
			}
			
			while (apiFields.length > 0) {
				var field = apiFields[0];
				var type = (field[0] == "{" && field[field.length - 1] == "}") ? DYNAMIC_API_NODE
						: FIXED_API_NODE;
				if (type == 2) {
					field = field.slice(1, -1);
				}

				var tempNode = null;
				var children = null;
				if (type == FIXED_API_NODE) {
					children = node.getFixedChildren();
				} else {
					children = node.getDynamicChildren();
				}

				for (var i = 0; i < children.length; i++) {
					var childNode = children[i];
					if (childNode.getName() == field) {
						tempNode = childNode;
						break;
					}
				}

				if (tempNode == null) {
					tempNode = new ApiNode(field, type);
					node.addChild(tempNode);
				}

				node = tempNode;
				apiFields.shift();
			}

			return node;
		}

		function _searchApi(node, apiFieldsArr, index) {
			if (node == null) {
				return node;
			}

			if (node.getType() == FIXED_API_NODE && node.getName() != apiFieldsArr[index]) {
				return null;
			}

			if (index == apiFieldsArr.length - 1) {
				return node;
			}

			var tempNode = null;

			var children = node.getFixedChildren();
			for (var i = 0; i < children.length; i++) {
				var childNode = children[i];
				tempNode = _searchApi(childNode, apiFieldsArr, index + 1);
				if (tempNode != null) {
					return tempNode;
				}
			}

			if (tempNode == null) {
				children = node.getDynamicChildren();
				for (var i = 0; i < children.length; i++) {
					var childNode = children[i];
					tempNode = _searchApi(childNode, apiFieldsArr, index + 1);
					if (tempNode != null) {
						return tempNode;
					}
				}
			}
			return tempNode;
		}

	}

})();

( function()
{
	REST_EXT.ApiSettings = ApiSettings;
	
	function ApiSettings() {
		var objRef = this;
		
		var currentPage;

		var ApiFilter = REST_EXT.ApiFilter.getInstance();
	
		objRef.render = render;
		
		var localSwaggerData = null;
		
		_init();
		
		function _init() {
			currentPage = "filter";
			_initListeners();
		}
	
		function _initListeners() 
		{
			$("#apiSettingsOption").on('change', handleSettingsSelection);
			$("#apiSettingsContainer #saveBtn").click(_saveSettings);
			$("#downloadSwagger").click(downloadSwaggerDoc);
			document.getElementById('uploadSwaggerJson').addEventListener('change', handleSwaggerFileSelect, false);
		}
		
		function handleSettingsSelection() {
			var e = document.getElementById("apiSettingsOption");
			currentPage = e.options[e.selectedIndex].value;
			render();
		}
		
		function render() {
			if (currentPage == "filter") {
				$('#apiFilterContainer').show();
			    $('#swaggerDataContainer').hide();
				ApiFilter.render();
			} else {
				$('#apiFilterContainer').hide();
			    $('#swaggerDataContainer').show();
				_showSwaggerPage();
			}
		}
		
		function _showSwaggerPage() {
			var swaggerData = ApiFilter.getSwaggerData();
			var swaggerBtn = document.getElementById("downloadSwagger");
			if (swaggerData) {
				$(swaggerBtn).show();
			} else {
				$(swaggerBtn).hide();
			}
		}
		
		function handleSwaggerFileSelect(evt) {
		    var files = evt.target.files; 
		    f = files[0];

		    var reader = new FileReader();
		    reader.onload = (function(theFile) {
		        return function(e) {
		          var swaggerDataStr = e.target.result;
		          
		          localSwaggerData = null;
		          try {
		        	  localSwaggerData = JSON.parse(swaggerDataStr);
		          } catch(exception) {
		        	  
		          }
		          
		          if (localSwaggerData == null) {
		        	  alert("Invalid/Empty JSON found !");
		        	  return;
		          }
		          
		        };
		     })(f);
		    
		     reader.readAsText(f);
		 }
		

		function downloadSwaggerDoc() {
			var swaggerData = ApiFilter.getSwaggerData();

			if (!swaggerData) {
				alert("No Swagger data available to download !");
				return;
			}

			var fileData = JSON.stringify(swaggerData);
			var fileName = "swagger.json";
			var pom = document.createElement('a');
			pom.setAttribute('href', 'data:json;charset=utf-8,'
					+ encodeURIComponent(fileData));
			pom.setAttribute('download', fileName);

			if (document.createEvent) {
				var event = document.createEvent('MouseEvents');
				event.initEvent('click', true, true);
				pom.dispatchEvent(event);
			} else {
				pom.click();
			}

		}
		
		function _saveSettings() {
			if (currentPage == "filter") {
				ApiFilter.saveFilterData();
			} else {
				if (localSwaggerData) {
					ApiFilter.setSwaggerData(localSwaggerData);
				}
				ApiFilter.saveSwaggerData();
				
				localSwaggerData = null;
				_showSwaggerPage();
			}
		}
	}
	
	ApiSettings.getInstance = function () {
        if (!ApiSettings.instance) {
        	ApiSettings.instance = new ApiSettings();
        }
        return ApiSettings.instance;
    };
	
})();

(function() {
	var isApiRecordingOn = false;
	var apiRecorder = null;
	var networkUtil = null;
	
	var ApiRecorder = REST_EXT.ApiRecorder;
	var NetworkUtil = REST_EXT.NetworkUtil;
	var ApiDoc = REST_EXT.ApiDoc;
	
	init();
	
	function init() {
		if (!isJqueryLoaded()) {
			loadJquery();
		} else {
			$ = jQuery.noConflict();
			initUI();
		}
	}
	
	function initUI() {
		addApiRecordPanel();
		addPanelListeners();
	}
	
	function isJqueryLoaded() {
		if(typeof jQuery=='undefined') {
			return false;
		}
		$ = jQuery.noConflict();
		return true;
	}
	
	function loadJquery() {
		  var headTag = document.getElementsByTagName("head")[0];
		  var jqTag = document.createElement('script');
		  jqTag.type = 'text/javascript';
		  jqTag.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
		  jqTag.onload = initUI;
		  headTag.appendChild(jqTag);
	}
	
	function startRecording() {
		isApiRecordingOn = true;
		
		$("#apiPause").show();
		$("#apiStart").hide();
		$("#apiDownload").show();
		$(".apiInfoContainer").show();
		
		apiRecorder = new ApiRecorder();
		networkUtil = new NetworkUtil(apiRecorder);
		networkUtil.setRunning(true);
		
		$(".restApiPanel .status").removeClass("stopped");
		$(".restApiPanel .status").addClass("running");
	}
	
	function pauseRecording() {
		$("#apiPause").hide();
		$("#apiResume").show();
		networkUtil.setRunning(false);
		
		$(".restApiPanel .status").removeClass("running");
		$(".restApiPanel .status").addClass("paused");
	}
	
	function resumeRecording() {
		$("#apiPause").show();
		$("#apiResume").hide();
		networkUtil.setRunning(true);
		
		$(".restApiPanel .status").removeClass("paused");
		$(".restApiPanel .status").addClass("running");
	}
	
	function downloadApiRecord() {
		apiRecorder.download();
	}
	
	function addApiCalls() {
		apiRecorder.saveApiCalls();
	}
	
	function togglePanelSize(){    
		$('#apiPanelBody').toggleClass("apiPanelBody-min" );
	}
	
	function openSettingsPanel() {
		$('#apiRecordPanel').hide();
		$('#apiSettingsContainer').show();
		$('.restApiPanel #settings').hide();
		REST_EXT.ApiSettings.getInstance().render();
	}
	
	function showHomePanel() {
		$('#apiRecordPanel').show();
		$('#apiSettingsContainer').hide();
		$('.restApiPanel #settings').show();
	}
	
	function addApiRecordPanel() {
		var html = API_PANEL_HTML;
				   
		var apiPanelCss = API_PANEL_CSS + " " + API_POPUP_CSS;
			
		$(document.body).append(html);
		
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = apiPanelCss;
		document.body.appendChild(css);
		
		
		$(".apiInfoContainer").hide();
		$("#apiDownload").hide();
		
		addSettingsPanel();
	}
	
	function addSettingsPanel() {
		var settingsHtml = API_SETTINGS_HTML;
			
		var settingsCss = API_SETTINGS_CSS;
			
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = settingsCss;
		document.body.appendChild(css);
		
		$("#apiSettingsContainer").html(settingsHtml);
		$("#apiSettingsContainer").hide();
	}
	
	function addPanelListeners() {
		$("#apiPause").hide();
		$("#apiResume").hide();
	
		$(".restApiPanel #apiStart").click(startRecording);
		$(".restApiPanel #apiPause").click(pauseRecording);
		$(".restApiPanel #apiResume").click(resumeRecording);
		$(".restApiPanel #apiDownload").click(downloadApiRecord);
		$(".restApiPanel #apiAddBtn").click(addApiCalls);
		
		$('.apipanel-minus').click(togglePanelSize);
		
		$('.restApiPanel #homeBtn').click(showHomePanel);
		$('.restApiPanel #settings').click(openSettingsPanel);
	}
	
})();

