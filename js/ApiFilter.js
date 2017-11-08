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
