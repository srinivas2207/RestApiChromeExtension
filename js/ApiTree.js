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
