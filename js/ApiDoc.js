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