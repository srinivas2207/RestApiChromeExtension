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
            <span class='apipanel-close'>
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

	.apiEditorContainer {
	    width: 97%;
	    padding: 10px;
	}

	.apiEditTA {
	    width: 100%;
	    resize: none;
	    height: 100px;
	}

	#apiEditName {
	    width: 100%;
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