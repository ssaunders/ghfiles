//~~~~ MARX CUSTOMIZATION ~~~~//

// TODO: 

// TODO: Have search table expand if there is content in it
// TODO: Make Ctrl+shift+E for Enrollment info to copy the top section
	// TODO: Create a button div, so I can extend the screenshot functionality
	// TODO: connect shortcut
	// TODO: write fn to hmtl2canvas the 4 divs I need
// TODO: figure out why i have to hit the shortcut buttons twice
// TODO: Style v> button
// TOOD: Add auto-navigator
	// TODO: Make it auto-step
	// TODO: make it so that if the MX button is pushed, it'll still go
		

//DONE 
	// TOOD: Add auto-navigator
	// TODO: Have it delay the addition of the stuff until the end
		// TODO: beneficiaries
		// TODO: eligibility
	// TODO: pageCopy logic--get it to copy
	// TODO: pageCopy logic--get it to auto-download
	// TODO: pageCopy logic testing
	// TODO: import jspdf
	// TODO: make shortcut to pageCopy
	//TODO: Make a setup fn, to be called from auto nav
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
** FUNCTIONS
**************/

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
			const cssEL = doc.createElement("style");
			cssEL.textContent = cssText;
			doc.childNodes[1].appendChild(cssEL);
		}
	}

	/*  Function addJsScript
		Adds the passed in script text to the document body */
	function addJsScript(scriptText, doc=document) {
		if (scriptText!=null) {
			const jsEl = doc.createElement("script");
			jsEl.textContent = scriptText;
			doc.childNodes[1].appendChild(jsEl);
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

		// commented out for now. Not sure why I needed this before
		// it prevents things, now
		// if(document.ranSetup) {
		// 	return;
		// }

		const doc = getIframeDoc();
		doc.addEventListener("keyup", selectCuInfo);
		doc.addEventListener("keyup", selectSearchBox);
		doc.addEventListener("keyup", pageCopy);
		doc.addEventListener("keyup", enrollInfoCopy);
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

		/*** Add Shortcut Functionality ***/
		iframe.addEventListener("load", setUpKeyboardShortcuts);

		/*** Add Libraries ***/
		// iframe.addEventListener("load", addJsPDF);
		iframe.addEventListener("load", addHtml2Canvas);

		/*** Add Canvas for PageCopy Functionality ***/
		iframe.addEventListener("load", setUpPgCopy);
		iframe.addEventListener("load", setUpEnrollInfoCopy);
	}

	/*  Function addHtml2Canvas
		Sets up all the load listeners, so that when site loads new cu, logic is re-added */
	function addHtml2Canvas() {
		const doc = getIframeDoc();
		// doc = document;
		const jsEl = doc.createElement("script");
		// jsEl.src="https://github.com/niklasvh/html2canvas/releases/download/v1.4.1/html2canvas.min.js";
		jsEl.src="https://html2canvas.hertzen.com/dist/html2canvas.js"
		jsEl.crossorigin="anonymous";

		doc.childNodes[1].appendChild(jsEl);
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
		const doc = getIframeDoc();
		doc.removeEventListener("keyup", selectCuInfo);
		doc.removeEventListener("keyup", selectSearchBox);
		doc.removeEventListener("keyup", pageCopy);
		doc.removeEventListener("keyup", enrollInfoCopy);

		console.log("removed shortcuts");
		document.ranSetup = false;
	}


	/*** CANVAS COPY CONTAINER ****/

	/* Function makeCanvasContainer	
		Puts the canvasContainer into the DOM. Returns a ref to it. */
	function makeCanvasContainer() {
		const doc = getIframeDoc();
		const div = doc.createElement('div');
		div.id="canvasContainer";
		// div.style="visibility:hidden; display:none;";

		//inner btn div
		const btnDiv = doc.createElement('div');

		doc.childNodes[1].appendChild(div).appendChild(btnDiv);
		return div;
	}

	/* Function getCanvasContainer
		Returns the canvasContainer. Cerates it if it doesn't exist. 
		Can execute inside iframe context, or main window context */
	function getCanvasContainer() {
		// handle working in two different contexts
		var jquery;
		try {
			jquery = getIframeJqry;
		} catch {
			jquery = $;
		}

		var canvasContainer = jquery('#canvasContainer')[0];
		if(canvasContainer == undefined) {
			canvasContainer = makeCanvasContainer();
		}
		return canvasContainer;
	}

	/* Function addBtnToCanvasContainer
		Adds a button that can be clicked to the canvas
		the first div holds the buttons */
	function addBtnToCanvasContainer(btn) {
		getCanvasContainer().children[0].appendChild(btn);
	}

		/* IMBEDDED TO IFRAME */

	/* Function copyCanvasToClipboard
		This executes in the context of the iframe, where 
		document is the iframe doc. Important, b/c styling issues
		
		Copies canvas to clipboard */
	function copyCanvasToClipboard(canvas) {
		canvas.toBlob(function (blob) {
			const item = new ClipboardItem({ "image/png": blob });
			navigator.clipboard.write([item]); 
		})
   }

	/* Function saveNewCanvas (iframe embedded)
		This executes in the context of the iframe, where 
		document is the iframe doc. Important, b/c styling issues
		
		Removes old canvas, saves the new canvas to the DOM */
	function saveNewCanvas(canvas) {
		//delete old canvas
		var canvasContainer = getCanvasContainer();
		if(canvasContainer.children.length > 1) {
			canvasContainer.removeChild(canvasContainer.children[1]);
		}

		//save new canvas into hidden el
		canvasContainer.appendChild(canvas);

		return canvas;
	}


/*** SET UP TOGGLE BUTTON ***/

	/*  Function searchTableHasContent
		Returns true if the search table has info used to search in it*/
	function searchTableHasContent () {
		return false;
	}

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

	/* Function removeAutoNavListener
		Removes the autonav logic when we have arrived, to prevent issues when reloading */
	function removeAutoNavListener() {
		console.log(">> removed autonav");
		getIframe().removeEventListener("load", autoNav);
	}

	/* Function addAutoNavListener
		Removes the autonav logic when we have arrived, to prevent issues when reloading.
		Calling this fn multiple times isn't an issue, 
		as it won't cause multiple runs, since the signature 
		is the same. */
	function addAutoNavListener() {
		var iframe = getIframe();
		if(iframe != undefined) {
			iframe.addEventListener("load", autoNav);
		} else {
			console.error("Could not add AutoNav listener. Iframe not defined");
		}
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

	/* Function getCurrStepNum
		Searches for specific elements on the DOM to decide the current step the nave is at. */
	function getCurrStepNum() {
		var iFrameJqry = getIframeJqry();
		const doc = getIframeDoc();

		if ($("#cms-marxaws-tile") != null && $("#cms-marxaws-tile").length != 0) { // no iframe on this step
			return 1;
		} else if (doc != undefined && doc.querySelector('.pageTitle').children[0].innerHTML == 'User Security Role Selection (M002)') {
			return 2;
		} else if(iFrameJqry != undefined) {
			if (iFrameJqry('.pageTitle').children()[0].innerHTML == 'Welcome (M101)') {
				return 3;
			} else if (iFrameJqry('#pgTtle').children()[0].innerHTML == 'Beneficiaries: Find (M201)') {
				return 4;
			} else if (iFrameJqry('#pgTtle').children()[0].innerHTML == 'Beneficiary: Eligibility (M232)') {
				return 5;
			}
		}

		console.warn("returned 0");
		return 0;
	}

	/* Function autoNav
		Navigates from wherever you are in the "get to MARx" process to the next step in MARX. 
		Utilizes "Load" even to decide where to go. 
		Executed in context of main frame AND in context iframe.
		Uses '$' when in main frame, uses iFrameJqry when in iframe.
	*/
	function autoNav(){
		var iFrameJqry = getIframeJqry(); // so I can use "contains"
		var iframeDoc = getIframeDoc();

		/*
		 step 1 does something weird. The full page doesn't re-render, 
		 just the bottom part, replacing it with an iframe. So I need a 
		 different listener, or need to put one on a different element.
		 the remaining steps should be fine 
		*/

		// adding the same listener mult times won't cause it to fire mult times
		switch(getCurrStepNum()) {
			default: 
				console.warn('Failed AutoNav');
				break;
			case 1: 
				$('#cms-marxaws-tile').click();
				$('.cms-myapps-link')[0].click()
				break;
			case 2: 
				addAutoNavListener();

				//for some reason, can't get iframe's jquery here
		 		iframeDoc.querySelector('#userRole').click();
				break;
			case 3: 
				addAutoNavListener();

		 		iFrameJqry('a:contains("Beneficiaries")')[0].click();
				break;
			case 4: 
				addAutoNavListener();

		 		iFrameJqry('a:contains("Eligibility")')[0].click();
				break;
			case 5: //we have arrived, run the usual stuff, stop auto-nav
				removeAutoNavListener();

				if(!document.ranSetup) {
					setup();
				}
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


/*** ENROLLMENT/TOP INFO COPY ***/
	/* This section is more than a bit convoluted. Because the
		the functions usually run in the context of the *main* 
		document, the CSS inside the iframe won't apply (proably
		due to XSS stuff). So we create a button inside the 
		iframe so the fns run from inside the iframe, to 
		preserve the context.
	*/

	/* Function getEnrollInfoCopyBtn
		Gets the button we need to click in order to trigger the copy logic */
	function getEnrollInfoCopyBtn() {
		return getIframeJqry()('#enrollInfoCopyButton')[0];
	}

	/* Function enrollInfoCopy_iFrame (iframe embedded)
		This executes in the context of the iframe, where 
		document is the iframe doc. Important, b/c styling issues.

		Gets the el to copy, calls html2canvas, saves it to the
		clipboard */
	function enrollInfoCopy_iFrame() {
		var marxTBody = $('.eligTable5 > tbody')[0];
		if(marxTBody == undefined) {
			console.warn('Could not find MARx main tbody');
			return;
		}

		var first =  marxTBody.children[1];
		var second = marxTBody.children[2];
		var third =  marxTBody.children[3];
		var fourth =  marxTBody.children[4];

		var config = {
			ignoreElements: function(el){
				if(el.contains(marxTBody.children[2]) 
					|| fourth.contains(el)
					|| third.contains(el)
					|| second.contains(el)
					|| first.contains(el)
					|| el.nodeName == 'HEAD'
					|| el.nodeName == 'LINK'
					|| el.nodeName == 'STYLE') {
					return false;
				} else {
					return true;
				}
			}
		}

		html2canvas(marxTBody,config)
			.then(saveNewCanvas)
			.then(copyCanvasToClipboard)
			.catch(function () {
				console.warn("Failed to copy MARx enrollment info");
			});
	}

	/* Function enrollInfoCopy
		Refers the event to the function inside of the iframe */
	function enrollInfoCopy(evt) {
		// CTRL + SHIFT + 'E' // 'E' b/c "enroll"
		if (evt.ctrlKey && evt.shiftKey && evt.which == 69) {
			if(isDB()) {
				console.warn("debug on");
			}

			getEnrollInfoCopyBtn().click();
		}

	}

	/* Function enrollInfoCopyBtnSetup (embeded in iframe)
		Adds the onclick to the copy button. Needs to do this 
		later, as it needs to refer to a fn native to the iframe */
	function enrollInfoCopyBtnSetup() {
		$('#enrollInfoCopyButton')[0].onclick = enrollInfoCopy_iFrame;
		// TODO: Try out just adding this fn, w/o embedding it
	}

	/* Function setUpEnrollInfoCopy
		Adds the canvas container div and copy button to the 
		iframe. Injects the scripts into the iframe as native
		functions */
	function setUpEnrollInfoCopy() {
		const doc = getIframeDoc();

		// make button to click on, add it to canvasContainer
		const enrollInfoCopyBtn = doc.createElement('button');
		enrollInfoCopyBtn.type='button';
		enrollInfoCopyBtn.id='enrollInfoCopyButton';
		addBtnToCanvasContainer(enrollInfoCopyBtn);

		// Add the "take a picture" functionality directly into the iframe's context
		// This has to happen this way, as the button must refer to a 
		// fn already in the iframe, for formatting
		var scriptText = 
			"enrollInfoCopy_iFrame = "+enrollInfoCopy_iFrame.toString()+";\n"+
			"("+enrollInfoCopyBtnSetup.toString()+")();";
		addJsScript(scriptText,doc);
	}

	/* Leave for future debugging. Simple way to check what's being rendered
	html2canvas(temp1).then(function (canvas) {
   	document.body.appendChild(canvas);
	});
	*/


/*** PAGE COPY ***/
	/* This section is more than a bit convoluted. Because the
		the functions usually run in the context of the *main* 
		document, the CSS inside the iframe won't apply (proably
		due to XSS stuff). So we create a button inside the 
		iframe so the fns run from inside the iframe, to 
		preserve the context.
	*/

	/* Function getPageCopyButton
		Gets the button we need to click in order to trigger the copy logic */
	function getPageCopyButton() {
		return getIframeJqry()('#pageCopyButton')[0];
	}

	/* Function pageCopy_iFrame
		This executes in the context of the iframe, where 
		document is the iframe doc. Important, b/c styling issues.

		Gets the el to copy, calls html2canvas, saves it to the
		clipboard */
	function pageCopy_iFrame() {
		var marxTBody = $('.eligTable5 > tbody')[0];
		if(marxTBody == undefined) {
			console.warn('Could not find the MARx main tbody');
			return;
		}
		html2canvas(marxTBody)
			.then(saveNewCanvas)
			.then(copyCanvasToClipboard)
			.catch(function () {
				console.warn("Failed to copy MARx main tbody");
			});
	}

	/* Function pageCopy
		Refers the event to the function inside of the iframe */
	function pageCopy(evt) {
		// CTRL + SHIFT + '/' // '/' b/c it's near enter
		if (evt.ctrlKey && evt.shiftKey && evt.which == 220) {
			if(isDB()) {
				console.warn("debug on");
			}

			getPageCopyButton().click();
		}

	}

	/* Function pageCopyBtnOnClickSetUp
		Adds the onclick to the copy button. Needs to do this 
		later, as it needs to refer to a fn native to the iframe */
	function pageCopyBtnOnClickSetUp() {
		$('#pageCopyButton')[0].onclick = pageCopy_iFrame;
	}

	/* Function setUpPgCopy
		Adds the canvas container div and copy button to the 
		iframe. Injects the scripts into the iframe as native
		functions */
	function setUpPgCopy() {
		const doc = getIframeDoc();

		// make button to click on
		const pageCopyButton = doc.createElement('button');
		pageCopyButton.type='button';
		pageCopyButton.id='pageCopyButton';
		addBtnToCanvasContainer(pageCopyButton);

		// Add the "take a picture" functionality directly into the iframe's context
		 		// TODO: Move these two fn's into their own place.
		var scriptText = 
			"pageCopy_iFrame = "+pageCopy_iFrame.toString()+";\n"+
			"saveNewCanvas = "+saveNewCanvas.toString()+";\n"+
			"copyCanvasToClipboard = "+copyCanvasToClipboard.toString()+";\n"+
			"getCanvasContainer = "+getCanvasContainer.toString()+";\n"+
			"("+pageCopyBtnOnClickSetUp.toString()+")();";
		addJsScript(scriptText,doc);
	}

	/* Leave for future debugging. Simple way to check what's being rendered
	html2canvas(temp1).then(function (canvas) {
   	document.body.appendChild(canvas);
	});
	*/


/*************
 * LOGIC
 *************/
// Set up 
function setup() {
	var doc = document;

	if(!doc.ranSetup) {
		doc.mxdebug = false;

		setUpLoadListeners();
		setUpKeyboardShortcuts();
		addToggleBtn();
		// addJsPDF();
		addHtml2Canvas();
		// setupCanvasContainer();
		setUpPgCopy();
		setUpEnrollInfoCopy();

		doc.ranSetup = true;
		doc.unloadMX = unloadMx;
		doc.alreadyPresent = alreadyPresent;
	} else {
		doc.alreadyPresent();
	}
}

/*** Run auto-nav ***/

/*** Add AutoNav Functionality ***/
// need to add the listener, so it starts the loop for the navigation until we arrive
// this is only important if you enter when there is an iframe
var iframe = getIframe();
if(iframe != undefined) {
	iframe.addEventListener("load", autoNav);
}

autoNav();
document.addEventListener('load',k)
var k = function () {
	console.log(">> loaded");
}
