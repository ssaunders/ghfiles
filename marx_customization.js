//~~~~ MARX CUSTOMIZATION ~~~~//

// TODO: 

// TODO: Style v> button
// TOOD: Add auto-navigator
	// TODO: logon w/Sel role
	// TODO: beneficiaries
	// TODO: eligibility
	// TODO: make it so that if the MX button is pushed, it'll still go
		// TODO: Have it delay the addition of the stuff until the end
		

//DONE 
	//TODO: Make a setup fn, to be called from autonav
	// TODO: Make unloadMx fn
	// TODO: Add timestamp to "tried it"
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
	function copyElToClipboard(htmlEl, doc=document) {
		if(htmlEl == null) {
			console.warn("Nothing to copy");
			return;
		}

	    var range = doc.createRange();
	    var sel = doc.getSelection();

	    sel.removeAllRanges();
	    range.selectNodeContents(htmlEl);
		sel.addRange(range);
		doc.execCommand("Copy");
	}

	/*  Function addCssEl
		Adds the passed in CSS text to the document body */
	function addCssEl(cssText, doc=document) {
		if (cssText!=null) {
			const css_el = doc.createElement("style");
			css_el.textContent = cssText;
			doc.childNodes[1].appendChild(css_el);
		}
	}

	/*  Function addJsScript
		Adds the passed in script text to the document body */
	function addJsScript(scriptText, doc=document) {
		if (scriptText!=null) {
			const js_el = doc.createElement("script");
			js_el.textContent = scriptText;
			doc.childNodes[1].appendChild(js_el);
		}
	}

	/*  Function getCurrentTimestamp
		Returns a string of the current timestamp */
	function getCurrentTimestamp() {
		return new Date().toLocaleString('en-us',{hour:'numeric',minute:'numeric',second:'numeric'});
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

/*  Function getIframeDoc
	Gets the document belonging to the cu lookup iframe */
function getIframeDoc() {
	var iframe = getIframe();
	return iframe == undefined ? undefined : getIframe().contentDocument;   
}

/*  Function setUpKeyboardShortcuts
	Sets up the listeners for the keyboard shortcuts */
function setUpKeyboardShortcuts() {
	if(isDB()) {
		console.warn(">> debug on");
	}

	if(document.ranSetup) {
		return;
	}

	var doc = getIframeDoc();
	doc.addEventListener("keyup", selectCuInfo);
	doc.addEventListener("keyup", selectSearchBox);
	console.log(">> set up shortcuts "+getCurrentTimestamp());
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
	iframe.addEventListener("load", setUpAutoRefresher);
	setUpAutoRefresher();

	/*** Add Shortcut Functionality ***/
	iframe.addEventListener("load", setUpKeyboardShortcuts);
}

/*  Function unloadMx
	Removes the keyboard listeners from the page */
function unloadMx() {
	// remove load events
	var iframe = getIframe();
	iframe.removeEventListener("load", addToggleBtn);
	iframe.removeEventListener("load", setUpAutoRefresher);
	iframe.removeEventListener("load", setUpKeyboardShortcuts);

	// remove keyup events
	var doc = getIframeDoc();
	doc.removeEventListener("keyup", selectCuInfo);
	doc.removeEventListener("keyup", selectSearchBox);

	console.log("removed shortcuts");
	document.ranSetup = false;
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

	addJsScript(jsContent, iframeDoc);
	addCssEl(cssContent, iframeDoc)
}


/*** AUTONAV ***/

/*  Function endAutoNav
	Removes the autonav logic when we have arrived, to prevent issues when reloading */
function endAutoNav() {
	getIframeDoc().removeEventListener("load", autoNav);
}
/*  Function getIframeJqry
	Searches for specific elements on the DOM to decide the current step the nave is at. */
function getIframeJqry() {
	var iframeDoc = getIframeDoc(),
		 el;
	this.iFrameJqry = undefined;

	if (iframeDoc != undefined) {
		el = iframeDoc.querySelector('#pgTtle') != null ? iframeDoc.querySelector('#pgTtle') : iframeDoc.querySelector('.pageTitle');
		this.iFrameJqry = el.ownerDocument.defaultView.$;
	}

	return this.iFrameJqry;
}

/*  Function getCurrStepNum
	Searches for specific elements on the DOM to decide the current step the nave is at. */
function getCurrStepNum() {
	var iFrameJqry = getIframeJqry() || $;

	if ($("#cms-marxaws-tile") != null && $("#cms-marxaws-tile").length != 0) { // no iframe on this step
		console.log("returned 1");
		return 1;
	} else if ($('#userRole').length != 0) {
		console.log("returned 2");
		return 2;
	} else if (iFrameJqry('#pgTtle').children()[0].innerHTML == 'Welcome (M101)') {
		console.log("returned 3");
		return 3;
	} else if (iFrameJqry('#pgTtle').children()[0].innerHTML == 'Beneficiaries: Find (M201)') {
		console.log("returned 4");
		return 4;
	} else if (iFrameJqry('#pgTtle').children()[0].innerHTML == 'Beneficiary: Eligibility (M232)') {
		return 5;
	}

	console.log("returned 0");
	return 0;
}

/*  Function autoNav
	Navigates from wherever you are in the "get to MARx" process to the next step in MARX. 
	Utilizes "Load" even to decide where to go. 
	Executed in context of main frame AND in context iframe.
	Uses '$' when in main frame, uses iFrameJqry when in iframe.
*/
function autoNav(){
	var iFrameJqry = getIframeJqry();
	switch(getCurrStepNum()) {
		default: 
			break;
		// nav to https://portal.cms.gov/myportal/wps/myportal/cmsportal/marxaws/verticalRedirect/application
		case 1: 
			$("#cms-marxaws-tile").click();
			$('.cms-myapps-link')[0].click()
			break;
		case 2: 
	 		$('#userRole').click()
			break;
		case 3: 
	 		iFrameJqry('a:contains("Beneficiaries")')[0].click();
			break;
		case 4: 
	 		iFrameJqry('a:contains("Eligibility")')[0].click();
			break;
		case 5: //we have arrived, run the usual stuff
			setup();
			break;
	}
}


/*** AUTO REFRESHER ***/

const refreshCount = {
	refreshCount: 0,
	getValue: function() {
		if (this.refreshCount == undefined) this.refreshCount = 0;
		return this.refreshCount;
	},
	increment: function(){
		console.log("incremented refreshCount @ "+getCurrentTimestamp());
		return this.refreshCount++;
	}
}

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
function setUpAutoRefresher(){
	var iframeDoc = getIframeDoc();

	if(iframeDoc.refresherActive) {
		console.log(">> autoRefresher running, cutoff ("+refreshCount.getValue()+")");
		return;
	}

	console.log(">> started autoRefresher ("+refreshCount.getValue()+") @ "+getCurrentTimestamp());

	// message to let me know it's going
	setInterval(function () {
		console.log(">> Refresher active ("+refreshCount.getValue()+")");
	}, 10*60*1000);

	setInterval(function () {
		// click on "Find", so it reloads the iframe
		getSubmitBtn().click();
		refreshCount.increment();
		console.log("<<< clicked submit button ("+refreshCount.getValue()+"/"+getCurrentTimestamp()+") >>>");
	}, 14.5*60*1000);
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

		copyElToClipboard(getCuInfoTable(), getIframeDoc());
	}
}



/*************
 * LOGIC
 *************/
// Set up 
function setup(doc) {
	if(doc.ranSetup != true) {
		doc.mxdebug = false;

		setUpLoadListeners();
		setUpKeyboardShortcuts();

		doc.ranSetup = true;
		doc.unloadMX = unloadMX;
		doc.alreadyPresent = alreadyPresent;
	} else {
		doc.alreadyPresent();
	}
}

/*** Run auto-nav ***/

/*** Add AutoNav Functionality ***/
var iframeDoc = getIframeDoc();
if(iframeDoc != undefined) {
	// need to add the listener, so it starts the loop for the navigation until we arrive
	// this is only important if you enter when there is an iframe
	iframeDoc.addEventListener("load", autoNav);
}

autoNav();
