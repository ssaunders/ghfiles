// TODO: 

// TODO: Add the name of T3 AOR, for non-standard RFI's
// TODO: Add the effective date, for non-standard RFI's
// TODO: Make it so that an Alt Addr is created, attached to the bottom of the copy fn. City, ST Zip
// TODO: Pipe dream--create page that wraps BO in an iframe, so I can keep my shortcuts/apply them auto on refresh
	//TODO: Make it so the bol search calls that page
	//TODO: Make it so the Start of Day shortcut works w/it
// TODO: make tooltip that will show newlines
	// TODO: figure out how to get content w/new lines in it
	// TODO: add CSS styling
// TODO: shortcut to add note
// TODO: shortcut to submit note

/** DONE: **/
	// TODO: The one shortcut to rule them all: have it copy the AOR, sub date, plan name and #, and wrap it into a single copy command
		// TODO: shortcut to copy AOR name (not number)
		// TODO: shortcut to copy sub date
		// TODO: shortcut to copy plan name
		// TODO: Figure out if can return just plain text.
	// TODO: Make unloadBO fn



/* Function DEFAULT
	NOTES_ON_FN */

/*************
 * FUNCTIONS
 *************/

/*** LIBRARY ***/

	/* Function alreadyPresent
		alerts that the code already exists */
	function alreadyPresent() {
		console.warn(">> MARx Code already present");
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


/*** UTILITY ***/

/* Function setUpKeyboardShortcuts
	Sets up the keyboard listeners to the page */
function setUpKeyboardShortcuts() {
	document.addEventListener("keyup", selectAppInfo);
	console.log("set up shortcuts");
}

/* Function unloadBO
	Sets up the keyboard listeners to the page */
function unloadBO() {
	document.removeEventListener("keyup", selectAppInfo);
	console.log("removed shortcuts");
	document.ranSetup = false;
}


/*** TOOLTIP SETUP ***/
	// ??? Should I just make the note el change on hover?

	// <span class="tooltip">This is my tooltip</span>

	// const myDiv = document.getElementById("myDiv");
	// myDiv.addEventListener("mouseover", showTooltip);
	// myDiv.addEventListener("mouseout", hideTooltip);

	// function showTooltip() {
	//    const tooltip = document.querySelector(".tooltip");
	//    tooltip.style.display = "block";
	// }
	// function hideTooltip() {
	// 	//get through "target?"
	//    const tooltip = document.querySelector(".tooltip");
	//    tooltip.style.display = "none";
	// }

	// .tooltip {
	//    display: none;
	//    background-color: yellow;
	//    color: black;
	// }


	// get all note div's
		// lead-notes-1 > div > table
		// foreach
			//skip first
			// get second tr > td of tbody
			// get element's innerHTML
			// make it the content of a tooltip (template?)
			// add mouseover fn to tr to show tooltip
			// add mouseout fn to tr to hide tooltip


/*** PLAN INFO SELECT ***/

/* Function getT2MAPip
	gets the Medicare Advantage PIP, if there is one to get. */
function getT2MAPip() {
	// TODO: check for just one page...or a page w/o a Medicare Advantage

	var maPip = $$('#appInfoContainer div:contains("Medicare Advantage")');
	if(maPip[0] == undefined) {
		console.warn("Could not find PIP");
		return undefined;
	}

	return maPip[0];
}

/* Function getT3MAPip
	gets the Medicare Advantage PIP, if there is one to get. */
function getT3MAPip() {
	// TODO: check for just one page...or a page w/o a Medicare Advantage

	var maPip = $$('#appInfoContainer div:contains("Medicare Advantage")');
	if(maPip[0] == undefined) {
		console.warn("Could not find PIP");
		return undefined;
	}

	return maPip[0];
}

/* Function getMostRecentDtcPip
	gets the DTC PIP, if there is one to get. */
function getMostRecentDtcPip() {
	// TODO: check for just one page...or a page w/o a DTC

	var dtcPip = $$('#appInfoContainer div:contains("DTC Transfer")');

	return dtcPip[0];
}

/* Function getT2AgentName
	gets the T2 agent Name, if there is one to get. */
function getT2AgentName() {
	// TODO: check for just one page...or a page w/o a DTC

	//get the DTC page
	var dtcPip = getMostRecentDtcPip();
	if (dtcPip == undefined) 
		return "-";

	var t2AgentData = dtcPip.querySelector('div[data-testid="agent-of-record"]').innerHTML;

	return t2AgentData.replace(/(.*) \(\d+\)/,"$1");
}

/* Function getPlanData
	gets the plan's name and code, if there is one to get. */
function getPlanData() {
	// TODO: check for just one page...or a page w/o a Medicare Advantage

	//get the Medicare Advantage page
	var MAPip = getT2MAPip();
	if (MAPip.length == 0) 
		return "";

	var planName = MAPip.querySelector('div[data-testid="plan-name"]').title;
	var planId = MAPip.querySelector('div[data-testid="plan-id"]').innerHTML.replace(/(\s+)(.*)(\s+)/,"$2");

	return planName + " " + planId;
}

/* Function getSep
	gets the SEP, if there is one to get. */
function getSep() {
	// TODO: check for just one page...or a page w/o a Medicare Advantage

	//get the Medicare Advantage page
	var MAPip = getT2MAPip();
	if (MAPip.length == 0) 
		return "";

	var subDate = MAPip.querySelector('td[data-testid="sep-code"]').children[0].innerHTML;
	
	return subDate.replace(/(\s+)(.*)(\s+)/,"$2");
}

/* Function getSubDate
	gets the T2 agent Name, if there is one to get. */
function getSubDate() {
	// TODO: check for just one page...or a page w/o a Medicare Advantage

	//get the Medicare Advantage page
	var MAPip = getT2MAPip();
	if (MAPip.length == 0) 
		return "";

	var subDate = MAPip.querySelector('div[data-testid="date-created"]').innerHTML;
	
	return subDate.replace(/([\d\/]+) (.*)/,"$1");
}

/* Function getPlanStartDate
	gets the T2 agent Name, if there is one to get. */
function getPlanStartDate() {
	// TODO: check for just one page...or a page w/o a Medicare Advantage

	//get the Medicare Advantage page
	var MAPip = getT2MAPip();
	if (MAPip.length == 0) 
		return "";

	var subDate = MAPip.querySelector('div[data-testid="date-created"]').innerHTML;
	
	return subDate.replace(/([\d\/]+) (.*)/,"$1");
}

/* Function selectAppInfo
	Event function that selects and copies the correct node containing the cu's processed and formatted info 

	OUTPUT:
		T2 Agent:
		T3 Agent:
		Plan:
		SEP:
		Sub Date:
		Eff Date:
		Alt Address:
	*/
function selectAppInfo(evt) {
	// CTRL + SHIFT + X
	if (evt.ctrlKey && evt.shiftKey && evt.which == 88) {
		if(document.bodebug == true) {
			console.warn("debug on");
		}

		var finalString = 
			"T2 Agent:\t"+getT2AgentName()+
			"T3 Agent:\t"+getT3AgentName()+
			"\nPlan:\t"+getPlanData()+
			"\nSEP:\t"+getSep()+
			"\nSub Date:\t"+getSubDate();
			"\nEff Date:\t"+getSubDate();
			"\nAlt Address:\t"+getSubDate();

		navigator.clipboard.writeText(finalString).then(() => {
		  console.log('Content copied to clipboard');
		},() => {
		  console.error('Failed to copy');
		});

		return;
	}
}


/*************
 * LOGIC
 *************/
document.bodebug = false; // TODO: Make this survive minif.
if(document.ranSetup != true) {
	setUpKeyboardShortcuts();

	document.ranSetup = true;
	document.unloadBO = unloadBO;
	document.alreadyPresent = alreadyPresent;
	evt = { // For debugging/testing
		ctrlKey:true,
		shiftKey:true,
		which:70
	}
} else {
	document.alreadyPresent();
}




