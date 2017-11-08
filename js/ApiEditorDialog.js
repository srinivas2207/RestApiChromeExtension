( function()
{
	REST_EXT.ApiEditorDialog = ApiEditorDialog;

	function ApiEditorDialog(apiCallData)
	{
		var objRef = this;

		/* private */
		var _dlg;
		
		/* public */
		objRef.addButtons = addButtons;
		objRef.show = show;
		objRef.dispose = dispose;
		objRef.getData = _getData;
		
		var _data = apiCallData;
		
		_initDialog(); 
		
		function _initDialog()
		{
			var dialog = $(document.getElementById('apiEditorDialog')).dialog({
				//dialogClass : "myChatContainer",
				resizable : false,
				autoOpen : false,
				modal : true,
				height : 500,
				width : 600
			});
			
			 $(".ui-dialog-titlebar-close").on("click", function() {
				 objRef.dispose();
			 });
			
			_dlg =  dialog;
			_setHeader("Api Call Info");
			_setBody(_getEditorHtml());
		}
		
		function _setHeader(heading)
		{
			_dlg.dialog('option', 'title', heading);
		}

		function _setBody(content)
 		{
			_dlg.html(content);	
		}
		
		function addButtons(buttonsArray)
		{
			_dlg.dialog('option', 'buttons', buttonsArray);
		}

		
		function show()
		{
			// open the dialog
			_dlg.dialog('open');
			
			$("#apiEditName").val(_data.apiName);
			$("#apiEditRequest").val(_data.request);
			$("#apiEditResponse").val(_data.response);
		}

		function dispose()
		{
			_dlg.dialog('close');
			_dlg.dialog('destroy');
		}

		function _getEditorHtml() {
			return "<div class = 'apiEditorContainer'> <label><b>Name</b> </label> <input id = 'apiEditName' type='text' name='Comment'></input> <br><br> <label><b>Request</b> </label><br> <textarea id = 'apiEditRequest' class = 'apiEditTA'> </textarea> <br><br> <label><b>Response</b> </label><br> <textarea id = 'apiEditResponse' class = 'apiEditTA'> </textarea> </div>";
		}
	
	
		function _getData() {
			_data.apiName =  $("#apiEditName").val();
			_data.request = $("#apiEditRequest").val();
			_data.response=  $("#apiEditResponse").val();
			return _data;
		}
	}
})();
