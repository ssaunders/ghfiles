// TODO: 

// TODO: Add timestamp to "tried it"
// TODO: Style v> button
// TOOD: Add auto-navigator
	// TODO: logon w/Sel role
	// TODO: beneficiaries
	// TODO: eligibility
	// TODO: make it so that if the MX button is pushed, it'll still go


//DONE 
	// TODO: Rework hideShowFn > name better
	// TODO: Fix setUpKeyboardShortcuts to use addEventListener
	// TODO: Rework addscript > break into two, doc is optional
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

/*** LIBRARY ***/

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

	/*  Function setUpKeyboardShortcuts
		Sets up the listeners for the keyboard shortcuts */
	function setUpKeyboardShortcuts() {
		if(isDB()) {
			console.warn(">> debug on");
		}

		var doc = getIframeDoc();
		doc.addEventListener("keyup", selectCuInfo);
		doc.addEventListener("keyup", selectSearchBox);
		console.log(">> set up shortcuts");
	}

	/*  Function copyStringToClipboard
		Copies a string to the computer clipboard */
	function copyStringToClipboard(string) {
		if(string == null) {
			console.warn("Nothing to copy");
			return;
		}

		navigator.clipboard.writeText(string).then(() => {
		  console.log('Content copied to clipboard');
		},() => {
		  console.error('Failed to copy');
		});
	}

	/*  Function copyElToClipboard
		Copies the content of an el to the computer clipboard */
	function copyElToClipboard(htmlEl) {
		if(htmlEl == null) {
			console.warn("Nothing to copy");
			return;
		}

	    var range = document.createRange();
	    var sel = document.getSelection();

	    sel.removeAllRanges();
	    range.selectNodeContents(htmlEl);
		sel.addRange(range);
		document.execCommand("Copy");
	}

/*** UTILITY ***/

/*  Function getIframe
	Gets the iframe that contains the MARx cu lookup
	Executed on main doc, outside o/iframe */
function getIframe() {
	if(this.iframe == undefined) {
        this.iframe = document.querySelectorAll("iframe")[0];
    }
    return this.iframe;    
}

/*  Function getIframe
	Gets the document belonging to the cu lookup iframe */
function getIframeDoc() {
	return getIframe().contentDocument;   
}

/*  Function setUpLoadListeners
	Sets up all the load listeners, so that when site loads new cu, logic is re-added */
function setUpLoadListeners() {
	if(isDB()) {
		console.warn(">> debug on");
	}
	var iframe = getIframe();

	/*** Add Button to Hide/Show Search ***/
	iframe.addEventListener("load", addToggleBtn);
	addToggleBtn();

	/*** Add Auto-refresh Attempt Functionality ***/
	iframe.addEventListener("load", autoRefresher);
	autoRefresher();

	/*** Add Shortcut Functionality ***/
	iframe.addEventListener("load", setUpKeyboardShortcuts);
}

/*  Function addScript
	Adds the passed in script text and CSS text to the document body */
function addCssEl(cssText, doc) {
	doc = (doc == null || doc == undefined) ? document : doc;

	if (cssText!=null) {
		const css_el = doc.createElement("style");
		css_el.textContent = cssText;
		doc.childNodes[1].appendChild(css_el);
	}
}
/*  Function addScript
	Adds the passed in script text and CSS text to the document body */
function addJsScript(scriptText, doc) {
	doc = (doc == null || doc == undefined) ? document : doc;

	if (scriptText!=null) {
		const js_el = doc.createElement("script");
		js_el.textContent = scriptText;
		doc.childNodes[1].appendChild(js_el);
	}
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
	Creates and adds to the DOM the toggle button and its logic. 
	We can use "document" here b/c it's running inside the iframe */
function setUpToggleBtn () {
	// Get the parent el, where we'll put the button.
	document
		.querySelectorAll('.eligTable4 tr:nth-child(2)')[0]
		.classList.toggle('disp-none');

	// Make the button 
	const toggleFSHideBtn = document.createElement('button');
	toggleFSHideBtn.innerHTML = '>';
	toggleFSHideBtn.type='button';
	toggleFSHideBtn.id='toggleBtn';
	toggleFSHideBtn.onclick=function () {
		// Toggle (hide/show) display:none, get resulting state, store in wasHidden
		var wasHidden = document.querySelectorAll('.eligTable4 tr:nth-child(2)')[0].classList.toggle('disp-none');
		if (wasHidden) {
			this.innerHTML = '>';
		} else {
			this.innerHTML = 'v';
		}
	};

	// Append button
	document.querySelectorAll('.eligTable4 tr:first-child td:first-child')[0].appendChild(toggleFSHideBtn);
}

/*  Function addToggleBtn
	Creates and adds the css/script elements needed to format/execute the button logic */
function addToggleBtn(evt) {
	if(isDB()) {
		console.warn(">> debug on");
	}

	var iframeDoc = getIframeDoc();

	// Early escape if button already exists
	if(iframeDoc.getElementById('toggleBtn') != null) {
		return;
	}

	// Make style content 
	var cssContent = "\
		.eligTable4 .disp-none { \
			display:none;\
		}";

    // Make the button creation auto-executing upon add
	var jsContent = "("+setUpToggleBtn.toString()+")();";

	// addScript(iframeDoc, jsContent, cssContent);
	addJsScript(jsContent, iframeDoc);
	addCssEl(cssContent, iframeDoc)
}

/*** AUTONAV ***/

/*  Function autoNav
	Navigates from wherever you are in the "get to MARx" process to MARx */
function autoNav(){
	//temporary don't screw things up escape
	return;

	var innerDoc = getIframeDoc();
	var currStepNum = getStep();

	switch(currStepNum || 1) {
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

/*  Function getSubmitBtn
	Gets the "Submit" button that sends off a request.*/
function getSubmitBtn() {
	if(this.submitBtn == undefined) {
        this.submitBtn = getIframeDoc().querySelectorAll("button[name='submitBtn']")[0];
    }
    return this.submitBtn;    
}

/*  Function autoRefresh
	Auto-refreshes the interation w/MARx by re-submitting search*/
function autoRefresher(evt){
	var iframeDoc = getIframeDoc();

	if(iframeDoc.refresherActive) {
		return;
	}

	console.log(">> started autoRefresher");
	// message to let me know it's going
	setInterval(function () {
		console.log(">> Refresher active");
	}, 10*60*1000);
	setInterval(function () {
		// click on "Find", so it reloads the iframe
		getSubmitBtn().click();
		console.log("<<< clicked submit button >>>");
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
	// CTRL + SHIFT + S // s for search
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

/*  Function getCuInfoTable 
	Gets the info HTML table that contains the cu's info */
function getCuInfoTable() {
	return getIframeDoc().getElementsByClassName('paraTitle alignR')[0].parentElement.parentElement;

}

/*  Function selectCuInfo
	Selects the top part of the MARx page */
function selectCuInfo(evt) {
	// CTRL + SHIFT + X // x b/c it's like copy
	if (evt.ctrlKey && evt.shiftKey && evt.which == 88) {
		if(isDB()) {
			console.warn("debug on");
		}

		var iframeDoc = getIframeDoc();
	    var range = iframeDoc.createRange();
	    var sel = iframeDoc.getSelection();

	    copyElToClipboard(getCuInfoTable());

	    // sel.removeAllRanges();
	    // range.selectNodeContents(getCuInfoTable());
		// sel.addRange(range);
		// iframeDoc.execCommand("Copy");
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
