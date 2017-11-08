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
				/*	apiEditorDialog = new REST_EXT.ApiEditorDialog(selectedApi);
				buttonsArray = 
				{
					SAVE : function() {
						var data = apiEditorDialog.getData();
						apiCallRecorder.saveCallObj(data);
						_updateRow(data);
						apiEditorDialog.dispose();
					},
					CANCEL : function() {
						apiEditorDialog.dispose();
					}
				}
				apiEditorDialog.addButtons(buttonsArray);
				apiEditorDialog.show(); */
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
				$('#apiInfoTable > tbody > tr').eq(index-1).after(rowHtml);
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

	}
	
})();

