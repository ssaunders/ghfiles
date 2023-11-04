// TODO: 

// TODO: Style v> button
// TOOD: Add auto-navigator
	// TODO: logon w/Sel role
	// TODO: beneficiaries
	// TODO: eligibility
	// TODO: make it so that if the MX button is pushed, it'll still go


//DONE 
// TODO: Fix setUpKeyboardShortcuts to use addEventListener
	// TODO: Fix it so it doesn't run if it sees the button already there.
	// TODO: actually use getIframe in code ?
	// TODO: Add shortcuts? 
		// TODO: Add MARx refresher
		// TODO: Add focus to top el?
		// > Focus to Ben ID search (Ctrl+Shift+S)
		// TODO: Remove the two things (highlight and +) at top?

/*************
 * FUNCTIONS
 *************/

/*** UTILITY ***/

/*  Function alreadyPresent
	alerts that the code already exists */
function alreadyPresent() {
	console.warn(">> MARx Code already present");
}

/*  Function DEBUG FUNCTIONS
	tests for/starts/stops debug */
function isDB() {
	return document.mxdebug;
}
function startDB() {
	document.mxdebug = true;
}
function endDB() {
	document.mxdebug = false;	
}

//Executed on main doc, outside o/iframe
function getIframe() {
	if(this.iframe == undefined) {
        this.iframe = document.querySelectorAll("iframe")[0];
    }
    return this.iframe;    
}

function getIframeDoc() {
	return getIframe().contentDocument;   
}

/*  Function setUpKeyboardShortcuts
	Selects the top part of the MARx page */
function setUpKeyboardShortcuts() {
	if(isDB()) {
		console.warn(">> debug on");
	}

	var doc = getIframeDoc();
	doc.addEventListener("keyup", selectCuInfo);
	doc.addEventListener("keyup", selectSearchBox);
	console.log(">> set up shortcuts");
}

/*  Function setUpLoadListeners
	Sets up all the load listeners */
function setUpLoadListeners() {
	if(isDB()) {
		console.warn(">> debug on");
	}
	var iframe = getIframe();

	/*** Add Button to Hide/Show Search ***/
	iframe.addEventListener("load", hideShowFn);
	hideShowFn();

	/*** Add Auto-refresh Attempt Functionality ***/
	iframe.addEventListener("load", autoRefresher);
	autoRefresher();

	/*** Add Shortcut Functionality ***/
	iframe.addEventListener("load", setUpKeyboardShortcuts);
}

/*  Function addScript
	Adds the passed in script text and CSS text to the document body */
function addScript(doc, scriptText, cssText) {
	if(isDB()) {
		console.warn(">> debug on");
	}

	/*Add style element*/
	if (cssText!=null) {
		const css_el = doc.createElement("style");
		css_el.textContent = cssText;
		doc.childNodes[1].appendChild(css_el);
	}

	/*Add js element*/
	if (scriptText!=null) {
		const js_el = doc.createElement("script");
		js_el.textContent = scriptText;
		doc.childNodes[1].appendChild(js_el);
	}
}

/*** SET UP TOGGLE BUTTON ***/

/*  Function setUpToggleBtn
	Creates and adds the toggle button and its logic. We can use "document" here b/c of the context it's running in */
function setUpToggleBtn () {
	/* if(isDB()) {
	 	console.warn("debug on");
	   }*/

	document
		.querySelectorAll('.eligTable4 tr:nth-child(2)')[0]
		.classList.toggle('disp-none');
	const toggleFSHideBtn = document.createElement('button');
	toggleFSHideBtn.innerHTML = '>';
	toggleFSHideBtn.type='button';
	toggleFSHideBtn.id='toggleBtn';
	toggleFSHideBtn.onclick=function () {
		var wasHidden = document.querySelectorAll('.eligTable4 tr:nth-child(2)')[0].classList.toggle('disp-none');
		if (wasHidden) {
			this.innerHTML = '>';
		} else {
			this.innerHTML = 'v';
		}
	};
	document.querySelectorAll('.eligTable4 tr:first-child td:first-child')[0].appendChild(toggleFSHideBtn);
}

/*  Function hideShowFn
	Creates and adds the css/script elements needed to format/execute the button logic */
function hideShowFn(evt) {
	if(isDB()) {
		console.warn(">> debug on");
	}

	var iframeDoc = getIframeDoc();

	// Early escape if button already exists
	if(iframeDoc.getElementById('toggleBtn') != null) {
		return;
	}

	/*Make style element*/
	var cssContent = "\
		.eligTable4 .disp-none { \
			display:none;\
		}";

	/*Make js element content
	  Strip new lines and tabs, to prevent interpreter errors */
	var jsContent = "("+setUpToggleBtn.toString()
		.replaceAll("\n","")
		.replaceAll("\t","")+")();";

	addScript(iframeDoc, jsContent, cssContent);
}

/*** AUTONAV ***/

/*  Function autoNav
	Creates and adds the toggle button and its logic */
function autoNav(){
	//temporary don't screw things up escape
	return;

	var innerDoc = getIframeDoc();

	switch(document.stepNumber || 1) {
		default: break;
		case 1: 
			document.stepNumber = 2;
			// nav to https://portal.cms.gov/myportal/wps/myportal/cmsportal/marxaws/verticalRedirect/application
			//allow cascade to 2 for now
		case 2: 
			innerDoc.getElementById('userRole').click();
			document.stepNumber = 3;
			break;
		case 3: 
			innerDoc.getElementsByClassName('navsm')[0].click();
			document.stepNumber = 4;
			break;
		case 4: 
			innerDoc.getElementsByClassName('navsm')[2].click();
			document.stepNumber = 5;
			break;
	}
	/*
	Test if things can be working in step1 by having a timer go off on the new page--actually, tie to onload
	*/
}

/*** AUTO REFRESHER ***/

/*  Function autoRefresh
	Creates and adds the toggle button and its logic */
function getSubmitBtn() {
	if(this.submitBtn == undefined) {
        this.submitBtn = getIframeDoc().querySelectorAll("button[name='submitBtn']")[0];
    }
    return this.submitBtn;    
}

/*  Function autoRefresh
	Creates and adds the toggle button and its logic */
function autoRefresher(evt){
	var iframeDoc = getIframeDoc();

	if(iframeDoc.refresherActive) {
		return;
	}

	console.log(">> started autoRefresher");
	//message to let me know it's going
	setInterval(function () {
		console.log(">> Refresher active");
	}, 10*60*1000);
	setInterval(function () {
		/* click on "Find", so it reloads the iframe */
		getSubmitBtn().click();
		console.log(">> !!!!!!!!!!!!!!!!!! Tried it!");
	}, 14.75*60*1000);
	iframeDoc.refresherActive = true;
}

/*** SEARCH BOX SELECT ***/

/*  Function getSearchBox */
function getSearchBox() {
	return getIframeDoc().getElementById('claimNumber');
}

/*  Function selectSearchBox
	Event listener to focus the MARx search box */
function selectSearchBox(evt) {
	if (evt.ctrlKey && evt.shiftKey && evt.which == 83) {
		if(isDB()) {
			console.warn(">> debug on");
		}

		var searchBox = getSearchBox();
		searchBox.focus({focusVisible:true});
        searchBox.select();
	}
}

/*** CU INFO SELECT ***/

/*  Function getCuInfoTable */
function getCuInfoTable() {
	return getIframeDoc().getElementsByClassName('paraTitle alignR')[0].parentElement.parentElement;

}

/*  Function selectCuInfo
	Selects the top part of the MARx page */
function selectCuInfo(evt) {
	if (evt.ctrlKey && evt.shiftKey && evt.which == 88) {
		if(isDB()) {
			console.warn("debug on");
		}

		var iframeDoc = getIframeDoc();
	    var range = iframeDoc.createRange();
	    var sel = iframeDoc.getSelection();

	    sel.removeAllRanges();
	    range.selectNodeContents(getCuInfoTable());
		sel.addRange(range);
		iframeDoc.execCommand("Copy");
	}
}



/*************
 * LOGIC
 *************/
/*** Run auto-nav ***/
// autoNav();

// Set up 
if(document.ranSetup != true) {
	document.mxdebug = false;

	setUpLoadListeners();
	setUpKeyboardShortcuts();

	document.ranSetup = true;
	document.alreadyPresent = alreadyPresent;
} else {
	document.alreadyPresent();
}

