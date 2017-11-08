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
