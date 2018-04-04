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
				$('#apiParamFilterContainer').hide();
				$('#apiFilterContainer').show();
			    $('#swaggerDataContainer').hide();
				ApiFilter.render();
			} else if (currentPage == "swagger") {
				$('#apiParamFilterContainer').hide();
				$('#apiFilterContainer').hide();
			    $('#swaggerDataContainer').show();
				_showSwaggerPage();
			} else {
				$('#apiFilterContainer').hide();
			    $('#swaggerDataContainer').hide();
			    $('#apiParamFilterContainer').show();
			    _showParamFilterPage();
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
		
		function _showParamFilterPage() {
			var paramFilterData = ApiFilter.getApiParamFilterData();
			if (paramFilterData) {
				document.getElementById("apiParamFilterInput").value = paramFilterData;
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
			} else if (currentPage == "swagger"){
				if (localSwaggerData) {
					ApiFilter.setSwaggerData(localSwaggerData);
				}
				ApiFilter.saveSwaggerData();
				
				localSwaggerData = null;
				_showSwaggerPage();
			} else {
				var data = document.getElementById("apiParamFilterInput").value;
				if (data) {
					ApiFilter.saveApiParamFilterData(data);
				}
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
