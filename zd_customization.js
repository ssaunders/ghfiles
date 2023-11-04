// TODO: 

// TODO: Make view refresher that sends me a notification if certain views have stuff available.
// TODO: Make "focus to subject" shortcut C+S+... ('s'? used already)
// TODO: make shortcut to focus on internal note 
// TODO: Make a subject sorter...for just the page.

/** DONE **/
	// TODO: Make it so that I can copy HM email directly from the ticket
	// TODO: Make shortcut for DNE (name, email, first)
	// TODO: Figure out why the debug isn't working
	// TODO: Figure out why there are multiple div's w/Cu/Agent Info...and how to fix it. (Lead ID: XX?)
	// TODO: Make shortcut to pull first comment. use "Agent Name:" ?
	// TODO: get key binding that won't interfere
	// TODO: Figure out what to do if multiple fit
	// TODO: Figure out how to get/select/copy the particular element containing the thing
	// TODO: Make an unload fn

/*  Function DEFAULT
	NOTES_ON_FN */

/** Random notes:
 {{ticket.requester.customfields.state}} 
 {{ticket.requester.customfields.carrier}}
 {{ticket.title}}
**/



/*************
 * FUNCTIONS
 *************/

/*** UTILITY ***/

/*  Function alreadyPresent
	alerts that the code already exists */
function alreadyPresent() {
	console.warn("ZD Code already present");
}

/*  Function DEBUG FUNCTIONS
	tests for/starts/stops debug */
function isDB() {
	return document.zddebug;
}
function startDB() {
	document.zddebug = true;
}
function endDB() {
	document.zddebug = false;	
}

/*  Function addScript
	Adds the passed in script text and CSS text to the document body */
function addScript(scriptText, cssText) {
	/*Add style element*/
	if (cssText!=null) {
		const css_el = document.createElement("style");
		css_el.textContent = cssText;
		document.childNodes[1].appendChild(css_el);
	}

	/*Add js element*/
	if (scriptText!=null) {
		const js_el = document.createElement("script");
		js_el.textContent = scriptText;
		document.childNodes[1].appendChild(js_el);
	}
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

/*  Function setUpKeyboardShortcuts
	Sets up the keyboard listeners to the page */
function setUpKeyboardShortcuts() {
	document.addEventListener("keyup", selectCuInfo);
	document.addEventListener("keyup", selectComment);
	document.addEventListener("keyup", selectDNEInfo);
	document.addEventListener("keyup", selectHumEmailInfo);
	document.addEventListener("keyup", subjectFocus);
	console.warn("set up shortcuts");
}


/*  Function unloadZD
	Sets up the keyboard listeners to the page */
function unloadZD() {
	document.removeEventListener("keyup", selectCuInfo);
	document.removeEventListener("keyup", selectComment);
	document.removeEventListener("keyup", selectDNEInfo);
	document.removeEventListener("keyup", selectHumEmailInfo);
	document.removeEventListener("keyup", subjectFocus);
	console.log("removed shortcuts");
	document.ranSetup = false;
}


/*** FOCUS INTERNAL NOTE ***/

/*  Function getNoteEl
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

/*  Function setFocusToNoteEl
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

/*  Function getSubjLineEl
	Selects the correct node that contains the cu's processed and formatted info */
function getSubjLineEl() {
	var firstInfoElList = $('.fr-focus [placeholder="Subject"]');
	if (firstInfoElList.length == 0) {
		return null;
	} else {
		return firstInfoElList[0];
	}
}

/*  Function subjectFocus
	Event function that selects the Subject line */
function subjectFocus(evt) {
	// CTRL + SHIFT + S //s for subject
	if (evt.ctrlKey && evt.shiftKey && evt.which == 83) {
		var subjLineEl = getSubjLineEl(); 
		if(subjLineEl == null) {
			console.log("Could not find a Subject line");
			return;
		}

		subjLineEl.focus();
		subjLineEl.selectionStart = 0;
		subjLineEl.selectionEnd = 0;
	}
}

/*** FIRST COMMENT SELECT ***/

/*  Function isDevotedRFI
	Decides if the el passed in is the first comment on a Dev RFI*/
function isDevotedRFI(el) {
	return el.innerHTML.search(/<table>/) == 0;
}

/*  Function isRegularRFI
	Decides if the el passed in is the first comment on a regular RFI */
function isRegularRFI(el) {
	return el.innerHTML.search(/Agent Name\:/) == 14;
}

/*  Function getFirstCommentEl
	Selects the correct node that contains the cu's processed and formatted info */
function getFirstCommentEl() {
	var firstInfoElList = $('.fr-focus div.zd-comment')[0];

	// Reg RFI vs Devoted one
	if(isDevotedRFI(firstInfoElList) || isRegularRFI(firstInfoElList)) {
		return firstInfoElList;
	}

	console.warn("First comment does not look like for an RFI");
	return null;

}

/*  Function processDevotedRFIComment
	Event function that selects and copies the correct node containing the cu's processed and formatted info */
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

/*  Function selectComment
	Event function that selects and copies the correct node containing the cu's processed and formatted info */
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
		}

	}
}

/*** SELECT DNE INFO ***/

/*  Function getCuName
	Selects the correct node that contains the cu's processed and formatted info */
function getCuName() {
	var cuName = $('.fr-focus [data-test-id=essentials-header-title]');
 	return cuName[0].innerHTML;
}

/*  Function getLeadID
	Selects the correct node that contains the cu's processed and formatted info */
function getLeadID() {
	var searchAry = $('.fr-focus div:contains("@gohealth.com")');
	var leadID = searchAry[searchAry.length-1].innerHTML;

	return leadID.replace('@gohealth.com','');
}

/*  Function selectDNEInfo
	Event function that selects and copies the correct node containing the cu's processed and formatted info */
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
/*  Function notAHMPlan
	Copies "Not a HM Plan" to the clipboard */
function notAHMPlan() {
	copyStringToClipboard("Not a Humana Plan");
}

/*  Function selectHumEmailInfo
	Copies cu info and formats it to the HM Email format*/
function selectHumEmailInfo(evt) {
	// CTRL + SHIFT + H // (h for "Humana")
	if (evt.ctrlKey && evt.shiftKey && evt.which == 72) {
		if(isDB()) {
			console.warn("debug on");
		}

		//If not an RFI w/a cu el
		var cuInfo = getCuInfoEl();
		if(cuInfo = null) {
			notAHMPlan();
			return;
		}

		// If the plan in the rfi isn't an HM plan
		cuInfo = cuInfo.innerHTML.replace(/ ?\&nbsp\;/g,"").split("<br>");
		if(cuInfo[15].replace(/Plan: */,"").slice(0,6) != "Humana"){
			notAHMPlan();
			return;
		}

		var leadID = cuInfo[1].replace(/Lead ID: */,""),
			cuName = cuInfo[2].replace(/Customer Name: */,""),
			cuDOB  = cuInfo[3].replace(/DOB: */,""),
			cuZip  = cuInfo[4].slice(-5),
			cuMBI  = cuInfo[5].slice(-11),
			agentName = cuInfo[9].replace(/Agent Name: */,""),
			agentSAN  = cuInfo[11].slice(-7),
			reason = cuInfo[13].replace(/Reason: */,""),
			subDt  = cuInfo[17].replace(/Sub Date: */,"");

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

/*  Function getCuInfoEl
	Selects the correct node that contains the cu's processed and formatted info */
function getCuInfoEl() {
	var cuInfoElList = $('.fr-focus div.zd-comment:contains("Cu/Agent Info")');
	var cuInfoElListLn = cuInfoElList.length;
	if (cuInfoElListLn == 0) {
		console.warn("Could not find an element containing 'Cu/Agent Info'");
		return null;
	} else {
		return cuInfoElList[cuInfoElListLn-1];
	}
}

/*  Function selectCuInfo
	Event function that selects and copies the correct node containing the cu's processed and formatted info */
function selectCuInfo(evt) {
	// CTRL + SHIFT + X
	if (evt.ctrlKey && evt.shiftKey && evt.which == 88) {
		if(isDB()) {
					console.warn("debug on");
		}

		copyElToClipboard(getCuInfoEl());
	}
}


/*************
 * LOGIC
 *************/
if(document.ranSetup != true) {

	setUpKeyboardShortcuts();

	document.ranSetup = true;
	document.unloadZD = unloadZD;
	document.alreadyPresent = alreadyPresent;
	evt = {
	    ctrlKey:true,
	    shiftKey:true,
	    which:70
	}
} else {
	document.alreadyPresent();
}

// TODO: Make document hold ref's to all these things, so can test/call/replace
//document.zd.THING

