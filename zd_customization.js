//~~~~ ZD CUSTOMIZATION ~~~~//

// TODO: 


// TODO: Make a " - XX" addition for state for Subj C+S+T
// TODO: Fix DNE copy to handle Devoted RFI's
// TODO: Make Ctrl+Shift+E also work for Dev RFI'S
// TODO: Make view refresher that sends me a notification if certain views have stuff available.
// TODO: make shortcut to focus on internal note 
// TODO: Make a subject sorter...for just the page.
	// (needs to ignore !)
	// (sort groups of things seperately)

/** DONE **/
// TODO: Make Ctrl+Shift+S also focus search bar
	// TODO: TEST to see if HM email copy fn actually filters out correct plans
	// TODO: Make "focus to subject" shortcut C+S+... ('s'? used already)
	// TODO: Make Ct+Sh+x get PI header, too
	// TODO: Make it so that I can copy HM email directly from the ticket
	// TODO: Make shortcut for DNE (name, email, first)
	// TODO: Figure out why the debug isn't working
	// TODO: Figure out why there are multiple div's w/Cu/Agent Info...and how to fix it. (Lead ID: XX?)
	// TODO: Make shortcut to pull first comment. use "Agent Name:" ?
	// TODO: get key binding that won't interfere
	// TODO: Figure out what to do if multiple fit
	// TODO: Figure out how to get/select/copy the particular element containing the thing
	// TODO: Make an unload fn

/* Function DEFAULT
   NOTES_ON_FN */

/** Random notes:
 {{ticket.requester.customfields.state}} 
 {{ticket.requester.customfields.carrier}}
 {{ticket.title}}
**/


/*************
 * FUNCTIONS
 *************/

/*** LIBRARY ***/

	/* Function alreadyPresent
		alerts that the code already exists */
	function alreadyPresent() {
		console.warn(">> ZD Code already present");
	}

	/* Function DEBUG FUNCTIONS
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

	/* Function copyStringToClipboard
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

	/* Function copyElToClipboard
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

	/*  Function addCssEl
		Adds the passed in CSS text to the document body */
	function addCssEl(cssText, doc) {
		doc = (doc == null || doc == undefined) ? document : doc;

		if (cssText!=null) {
			const css_el = doc.createElement("style");
			css_el.textContent = cssText;
			doc.childNodes[1].appendChild(css_el);
		}
	}

	/*  Function addJsScript
		Adds the passed in script text to the document body */
	function addJsScript(scriptText, doc) {
		doc = (doc == null || doc == undefined) ? document : doc;

		if (scriptText!=null) {
			const js_el = doc.createElement("script");
			js_el.textContent = scriptText;
			doc.childNodes[1].appendChild(js_el);
		}
	}

	/* Function getCurrentTimestamp
		Returns a string of the current timestamp */
	function getCurrentTimestamp() {
		return new Date().toLocaleString('en-us',{hour:'numeric',minute:'numeric',second:'numeric'});
	}

	evt = { // For debugging/testing
		ctrlKey:true,
		shiftKey:true,
		which:70
	}


/*** UTILITY ***/

	/* Function setUpKeyboardShortcuts
	   Sets up the keyboard listeners to the page */
	function setUpKeyboardShortcuts() {
		document.addEventListener("keyup", selectTicketInfo);
		document.addEventListener("keyup", selectComment);
		document.addEventListener("keyup", selectDNEInfo);
		document.addEventListener("keyup", selectHumEmailInfo);
		document.addEventListener("keyup", subjectFocus);
		document.addEventListener("keyup", searchBoxFocus);
		console.warn("set up shortcuts");
	}

	/* Function unloadZD
	   Removes the keyboard listeners from the page */
	function unloadZD() {
		document.removeEventListener("keyup", selectTicketInfo);
		document.removeEventListener("keyup", selectComment);
		document.removeEventListener("keyup", selectDNEInfo);
		document.removeEventListener("keyup", selectHumEmailInfo);
		document.removeEventListener("keyup", subjectFocus);
		document.removeEventListener("keyup", searchBoxFocus);
		console.log("removed shortcuts");
		document.ranSetup = false;
	}

	/* Function isCarrierPlan
	   Copies "Not a HM Plan" to the clipboard */
	function isCarrierPlan(cuInfo,carrierName) {
		if(carrierName == undefined || carrierName == null) return false;
		var regExp = new RegExp("Plan Name:\\s+"+carrierName);
		return cuInfo.innerHTML.replaceAll("&nbsp;"," ").search(regExp) != -1;
	}


/*** FOCUS INTERNAL NOTE ***/

	/* Function getNoteEl
	   Selects the correct node that contains the cu's processed and formatted info */
	function getNoteEl() {
		// var firstInfoElList = $('div.zd-comment:contains("Agent Name:")');
		// var firstInfoElListLn = firstInfoElList.length;
		// if (firstInfoElListLn == 0) {
		// 	return null;
		// } else {
		// 	return firstInfoElList[firstInfoElListLn-1];
		// }
	}

	/* Function setFocusToNoteEl
	   Event function that selects and copies the correct node containing the cu's processed and formatted info */
	function setFocusToNoteEl(evt) {
		// CTRL + SHIFT + ?
		// if (evt.ctrlKey && evt.shiftKey && evt.which == 70) {
		// 	if(isDB()) {
		// 				console.warn("debug on");
		// 	}
		// 	var firstInfoEl = getFirstCommentEl(); 
		// 	if(firstInfoEl == null) {
		// 		console.log("Could not find an element containing 'Agent Name:'");
		// 		return;
		// 	}

		//     var range = document.createRange();
		//     var sel = document.getSelection();

		//     sel.removeAllRanges();
		//     range.selectNodeContents(firstInfoEl);
		// 	sel.addRange(range);
		// 	document.execCommand("Copy");
		// }
	}


/*** FOCUS SUBJECT LINE ***/

	/* Function getSubjLineEl
	   Gets the subject element */
	function getSubjLineEl() {
		var firstInfoElList = $('.fr-focus [placeholder="Subject"]');
		if (firstInfoElList.length == 0) {
			return null;
		} else {
			return firstInfoElList[0];
		}
	}

	/* Function subjectFocus
	   Event function that selects the Subject line, and focuses the cursor at the start */
	function subjectFocus(evt) {
		// CTRL + SHIFT + S //s for subject
		if (evt.ctrlKey && evt.shiftKey && evt.which == 83) {
			var subjLineEl = getSubjLineEl(); 
			if(subjLineEl == null) {
				console.log("Could not find a Subject line");
				return;
			}

			if(subjectIsFocused()) {
				addStateAbbr();
			} else {
				subjLineEl.focus();
				subjLineEl.selectionStart = 0;
				subjLineEl.selectionEnd = 0;
			}
		}
	}

	/**** ADD STATE ABBREVIATION ****/

	/* Function subjectIsFocused
	   Event function that selects the Subject line, and focuses the cursor at the start */
	function subjectIsFocused() {
		return document.activeElement === getSubjLineEl();
	}

	/* Function addStateAbbr
	   Event function that selects the Subject line, and focuses the cursor at the start */
	function addStateAbbr() {
		var subjLineEl = getSubjLineEl(),
			 ticketInfoEl = getTicketInfoEl(),
			 ticketInfo = ticketInfoEl.innerHTML,
			 stringPos = ticketInfo.search(/, ([A-Z]{2}) \d+/),
			 // extra space so that there is a keystroke that sets the value
			 stateAbbr = " - "+ticketInfo[stringPos+2]+ticketInfo[stringPos+3]+" ";

		// will this work?
		subjLineEl.value += stateAbbr;
	}


/*** FOCUS ACTIVE SEARCH ***/

	/* Function getSearchBox
	   Gets the search Box */
	function getSearchBox() {
		var searchBox = $('.search [data-garden-id="forms.faux_input"] input')[0];
		if (searchBox == undefined) {
			return null;
		} else {
			return searchBox;
		}
	}

	/* Function searchBoxFocus
	   Event fn that moves the focus to the active search box */
	function searchBoxFocus(evt) {
		// CTRL + SHIFT + S //s for Search
		if (evt.ctrlKey && evt.shiftKey && evt.which == 83) {
			var searchBoxEl = getSearchBox(); 
			if(searchBoxEl == null) {
				console.log("Could not find an active search box ",searchBoxEl);
				return;
			}

			searchBoxEl.focus();
			searchBoxEl.select();
		}
	}


/*** FIRST COMMENT SELECT ***/

	/* Function isT3Feedback
	   Decides if the el passed in is the first comment on a Dev RFI*/
	function isT3Feedback(el) {
		return el.innerHTML.search(/Hi Case Management/) != -1;
	}

	/* Function isDevotedRFI
	   Decides if the el passed in is the first comment on a Dev RFI*/
	function isDevotedRFI(el) {
		return el.innerHTML.search(/<table>/) == 0;
	}

	/* Function isRegularRFI
	   Decides if the el passed in is the first comment on a regular RFI */
	function isRegularRFI(el) {
		return el.innerHTML.search(/Agent Name\:/) == 14;
	}

	/* Function getFirstCommentEl
	   Selects the el that contains the cu's info, which is the first comment.
		Returns null if not in a format recognized */
	function getFirstCommentEl() {
		var firstInfoEl = $('.fr-focus div.zd-comment')[0];

		// Reg RFI vs Devoted one
		if(isDevotedRFI(firstInfoEl) || isRegularRFI(firstInfoEl) || isT3Feedback(firstInfoEl)) {
			return firstInfoEl;
		}

		console.warn("First comment does not look like for an RFI");
		return null;
	}

	/* Function processDevotedRFIComment
	   Processes the content of a Devoted RFI initial comment into the standardized format */
	function processDevotedRFIComment(el) {
		var rfiParts= el.innerHTML.replaceAll(/\<\/?(t|b)[rdba](ody|ble)?( rowspan=\"\d\")?\>/g,"!").split(/!+/g);

		var returnVal = "Agent Name: "+rfiParts[1]+
		" Agent NPN/Party ID: "+rfiParts[2]+
		" Agent Writing Number/SAN :"+
		" Medicare ID: "+rfiParts[8]+
		" Sub Date: "+rfiParts[5]+
		" Due Date:"+
		" Case Worker (Cigna*)/Broker Phone (Aetna/United*):"+
		" Case Number (Cigna*)/Broker Email (Aetna/United*):"+
		" Policy ID/Application ID:"+
		" Reason: "+rfiParts[10];

		return returnVal;
	}


	/* Function processT3FeedbackComment
	   Processes the content of a Devoted RFI initial comment into the standardized format */
	function processT3FeedbackComment(el) {
		var commentParts= el.innerHTML.replaceAll(/\<\/?strong\>/g,"").replaceAll(/(\<\/?(p|br|u)\>)|[\n]|(: )/g,"!").split(/!+/g);

		var returnVal = 
		"Cu Phone #:\t"+commentParts[5]+"\n"+
		"T3 Agent:\t"+commentParts[1].replace(/ has submitted.*/,"")+"\n"+
		"T3 Team Mgr:\t"+commentParts[13]+"\n"+
		"T3 Director:\t"+commentParts[15]+"\n"+
		"T2 Agent:\t"+commentParts[3].replace(/ \d+/,"")+"\n"+
		"T2 Team Mgr:\t"+"\n"+
		"T2 Director:\t"+"\n"+
		"Notes: \t"+commentParts[17];

		return returnVal;
	}

	/* Function selectComment
	   Event function that selects and copies the initial comment containing the RFI's info */
	function selectComment(evt) {
		// CTRL + SHIFT + F //(f for "first")
		if (evt.ctrlKey && evt.shiftKey && evt.which == 70) {
			if(isDB()) {
				console.warn("debug on");
			}
			var firstCommentEl = getFirstCommentEl();

			if(firstCommentEl == null) {
				return;
			} else if(isRegularRFI(firstCommentEl)) {
				copyElToClipboard(getFirstCommentEl());
			} else if(isDevotedRFI(firstCommentEl)) {
				copyStringToClipboard(processDevotedRFIComment(firstCommentEl));
			} else if(isT3Feedback(firstCommentEl)) {
				copyStringToClipboard(processT3FeedbackComment(firstCommentEl));
			}

		}
	}


/*** SELECT DNE INFO ***/

	/* Function getCuName
	   Get's the cu's name from the page */
	function getCuName() {
		var cuName = $('.fr-focus [data-test-id=essentials-header-title]');
	 	return cuName[0].innerHTML;
	}

	/* Function getLeadID
	   Get's the lead id from the page */
	function getLeadID() {
		var searchAry = $('.fr-focus div:contains("@gohealth.com")');
		var leadID = searchAry[searchAry.length-1].innerHTML;

		return leadID.replace('@gohealth.com','');
	}

	/* Function selectDNEInfo
	   Get's the info needed for a DNE from the page.
		Also formats it into a tabbed format and copies for pasting into a spreadsheet */
	function selectDNEInfo(evt) {
		// CTRL + SHIFT + E // (e for "engage")
		if (evt.ctrlKey && evt.shiftKey && evt.which == 69) {
			if(isDB()) {
				console.warn("debug on");
			}

			var finalString = 
				getCuName()+"\t"+
				getLeadID()+"\t"+
				getFirstCommentEl().children[0].innerHTML;

			copyStringToClipboard(finalString);

			return;
		}
	}


/*** SELECT HM EMAIL INFO ***/

	/* Function selectHumEmailInfo
	   Copies cu info and formats it to the HM Email format

		OUTPUT:
		Reason	Lead ID	Sub_Date	Agent_SAN	Client_Name	DOB	ZIP	MBI
	   */
	function selectHumEmailInfo(evt) {
		// CTRL + SHIFT + H // (h for "Humana")
		if (evt.ctrlKey && evt.shiftKey && evt.which == 72) {
			if(isDB()) {
				console.warn("debug on: selectHumEmailInfo");
			}

			//If not an RFI w/a cu el
			var cuInfo = getTicketInfoEl();
			if(cuInfo == undefined) {
				return;
			}
			if(!isCarrierPlan(cuInfo, "Humana")) {
				copyStringToClipboard("Not a Humana Plan");
				return;
			}

			parsedCuInfo = cuInfo.innerHTML.replace(/ ?\&nbsp\;/g,"").split("<br>");

			var leadID = parsedCuInfo[1].replace(/Lead ID: */,""),
				cuName = parsedCuInfo[2].replace(/Customer Name: */,""),
				cuDOB  = parsedCuInfo[3].replace(/DOB: */,""),
				cuZip  = parsedCuInfo[4].slice(-5),
				cuMBI  = parsedCuInfo[5].slice(-11),
				agentName = parsedCuInfo[9].replace(/Agent Name: */,""),
				agentSAN  = parsedCuInfo[11].slice(-7),
				reason = parsedCuInfo[13].replace(/Reason: */,""),
				subDt  = parsedCuInfo[17].replace(/Sub Date: */,"");

			var finalString = 
				reason + '\t' +
				leadID + '\t' +
				subDt + '\t' +
				agentName + '\t' +
				agentSAN + '\t' +
				cuName + '\t' +
				cuDOB + '\t' +
				cuZip + '\t' +
				cuMBI + '\t';

			copyStringToClipboard(finalString);

			return;
		}
	}


/*** CU INFO SELECT ***/

	/* Function getTicketInfoEl
	   Gets the most recent comment with the app's processed and formatted info */
	function getTicketInfoEl() {
		var cuInfoElList = $('.fr-focus div.zd-comment:contains("Cu/Agent Info")'),
			 cuInfoElListLn = cuInfoElList.length,
			 t3FirstComment;

		if (cuInfoElListLn == 0) {
			t3FirstComment = $('.fr-focus div.zd-comment:contains("Hi Case Management,")');
			if(t3FirstComment.length = 0) {
				console.warn("Could not find an element containing 'Cu/Agent Info' or T3 first comment");
				return null;
			} else {
				return t3FirstComment
			}
		} else {
			return cuInfoElList[cuInfoElListLn-1];
		}
	}

	/* Function selectTicketInfo
	   Event function that copies the most recent comment with the app's processed and formatted info */
	function selectTicketInfo(evt) {
		// CTRL + SHIFT + X  //x b/c convenient
		if (evt.ctrlKey && evt.shiftKey && evt.which == 88) {
			if(isDB()) {
						console.warn("debug on");
			}

			copyElToClipboard(getTicketInfoEl());
		}
	}


/*************
 * LOGIC
 *************/
if(document.ranSetup != true) {

	setUpKeyboardShortcuts();

	document.ranSetup = true;
	window.unloadZD = unloadZD;
	window.alreadyPresent = alreadyPresent;
	evt = { // For debugging/testing
	    ctrlKey:true,
	    shiftKey:true,
	    which:70
	}
} else {
	alreadyPresent();
}

// TODO: Make document hold ref's to all these things, so can test/call/replace
//document.zd.THING
