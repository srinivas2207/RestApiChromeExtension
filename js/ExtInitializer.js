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
