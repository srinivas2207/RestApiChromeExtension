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
		var body = "<div id = 'apiEditorContainer' class = 'apiEditorContainer'> <label class='apiEditorLabel'> <b>API_TEST</b> </label> <input id = 'apiName' type='text' class='apiEditorInput'/> <br> <br> <label class='apiEditorLabel'> <b>API_URL</b> </label> <input id = 'apiUrl' type='text' class='apiEditorInput'/> <br> <br> <label class='apiEditorLabel'> <b>API_METHOD</b> </label> <select id = 'apiHttpMethod'> <option value='GET'>GET</option> <option value='POST'>POST</option> <option value='DELETE'>DELETE</option> <option value='PUT'>PUT</option> </select> <br> <br> <label> <b>API_REQUEST</b> </label> <br> <textarea id = 'apiRequest' class = 'editorTA'> </textarea> <br> <br> <label> <b>API_RESPONSE</b> </label> <br> <textarea id = 'apiResponse' class = 'editorTA'> </textarea> <br> <br> <label class='apiEditorLabel'> <b>API_STATUS</b> </label> <input id = 'apiStatus' type='text'/> <br> <br> <hr style='border: 1px dashed black;' /><br> <label class='apiEditorLabel'> <b>API_POLL</b> </label> <input type='checkbox' id= 'apiPoll'/> <br> <br> <label class='apiEditorLabel'> <b>COMPARE_RESPONSE</b> </label> <input type='checkbox' id= 'compareResponse'/> <br> <br> <label> <b>TEST_VARS</b> </label> <br> <textarea id = 'testVars' class = 'editorTA'> </textarea> <br> <br> <label> <b>TEST_CONDITION</b> </label> <br> <textarea id = 'testCondition' class = 'editorTA'> </textarea> <br> <br> </div><div class='dialogButtonContainer'><button id='cancelApiDialog'>Cancel</button> <button id='saveApiDialog'>Save</button></div>";
		
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