//~~~~ BO CUSTOMIZATION ~~~~//

// TODO: 

// TODO: BO CT+SH+X PULLING WRONG INFO ON 121679558
// TODO: Pipe dream--create page that wraps BO in an iframe, so I can keep my shortcuts/apply them auto on refresh
	//TODO: Make it so the bol search calls that page
	//TODO: Make it so the Start of Day shortcut works w/it
// TODO: make tooltip that will show newlines
	// TODO: figure out how to get content w/new lines in it
	// TODO: add CSS styling
// TODO: shortcut to add note
// TODO: shortcut to submit note

/** DONE: **/
	// TODO: TEST to see if it actually works on mult pages 119212107 (it does)
	// TODO: TEST to see if it actually works on only one page 120577746 (it does)
	// TODO: Make it so that an Alt Addr is created, attached to the bottom of the copy fn. City, ST Zip
	// TODO: Add the name of T3 AOR, for non-standard RFI's
	// TODO: Add the effective date, for non-standard RFI's
		// TODO: The one shortcut to rule them all: have it copy the AOR, sub date, plan name and #, and wrap it into a single copy command
			// TODO: shortcut to copy AOR name (not number)
			// TODO: shortcut to copy sub date
			// TODO: shortcut to copy plan name
			// TODO: Figure out if can return just plain text.
		// TODO: Make unloadBO fn

/* Function DEFAULT
	NOTES_ON_FN */


// MAKE MACRO FOR FIVE9 TICKET
// MAKE MACRO FOR INTRO TO GH ticket
// (make sure tags are right)


/*************
 * FUNCTIONS
 *************/

/*** LIBRARY ***/

	/* Function alreadyPresent
		Alerts that the code already exists */
	function alreadyPresent() {
		console.warn(">> BO Code already present");
	}

	/* Function DEBUG FUNCTIONS
		tests for/starts/stops debug */
	mydebug = {
		isDB: function () {
			return document.bodebug;
		},
		startDB: function() {
			document.bodebug = true;
		},
		endDB: function() {
			document.bodebug = false;	
		}

	};

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
	Removes the keyboard listeners from the page */
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

//// GET PIP'S ////

/* Function getNumPIPs
	Gets the number PIP's.
	1 - expected a T2 sale
	2 - expected a DTC sale
	3+- expected mult sales // how to find most recent?
	*/
function getNumPIPs() {
	return $$('#appInfoContainer > *').length;
}

/* Function getMostRecentSalePip
	Gets the most recent sales PIP, if there is one to get. */
function getMostRecentSalePip() {
 /* T2 Agent:	Mitsuko Martindale
	T3 Agent:	LaWanda Wells
	Plan:	Anthem Dual Advantage (HMO D-SNP) H3447-030-0
	SEP:	AEP
	Sub Date:	10/31/2023
	Eff Date:	01/01/2024
	Alt Address:	- 
 */


	/* Could also use:
		$$('#appInfoContainer div:contains("Off-Exchange")');
		I don't remember why I didn't/changed it from this
	*/
	if(isDB()) {
		console.warn("debug on (getMostRecentSalePip)");
	}

	var salePIP = $$('#appInfoContainer div:contains("Medicare Advantage")');
	if(salePIP[0] == undefined) {
		console.warn("Could not find sale PIP");
		return undefined;
	}

	return salePIP[0];
}

/* Function getMostRecentDtcPip
	Gets the DTC PIP, if there is one to get. */
function getMostRecentDtcPip() {
	// TODO: check for just one page...or a page w/o a DTC
	if(isDB()) {
		console.warn("debug on (getMostRecentDtcPip)");
	}

	var dtcPip = $$('#appInfoContainer div:contains("DTC Transfer")');
	if(dtcPip[0] == undefined) {
		console.warn("Could not find DTC PIP");
		return undefined;
	}

	return dtcPip[0];
}

//// GET INFO FROM PIP'S ////

/* Function getT2AgentName
	Gets the T2 agent's name from the DTC PIP or the sales PIP */
function getT2AgentName() {
	var planPIP = getMostRecentDtcPip();
	if (planPIP == undefined) {
		planPIP = getMostRecentSalePip();
		if (planPIP == undefined) {
			return "-";
		}
	}

	var t2AgentData = planPIP.querySelector('div[data-testid="agent-of-record"]').innerHTML;

	return t2AgentData.replace(/(.*) \(\d+\)/,"$1");
}

/* Function getT3AgentName
	Gets the T3 agent's name from the sale PIP */
function getT3AgentName() {
	// check for a DTC PIP, to know there is a seperate sale PIP
	var dtcPip = getMostRecentDtcPip();
	if (dtcPip == undefined) 
		return "-";

	var salePIP = getMostRecentSalePip();
	var t2AgentData = salePIP.querySelector('div[data-testid="agent-of-record"]').innerHTML;

	return t2AgentData.replace(/(.*) \(\d+\)/,"$1");
}

/* Function getPlanData
	Gets the plan's name and code from the sale PIP */
function getPlanData() {
	//get the Medicare Advantage page
	var salePIP = getMostRecentSalePip();
	if (salePIP == undefined) 
		return "";

	var planName = salePIP.querySelector('div[data-testid="plan-name"]').title;
	var planId = salePIP.querySelector('div[data-testid="plan-id"]').innerHTML.replace(/(\s+)(.*)(\s+)/,"$2");

	return planName + " " + planId;
}

/* Function getSep
	Gets the SEP used from the sale PIP */
function getSep() {
	// TODO: check for just one page...or a page w/o a Medicare Advantage

	//get the Medicare Advantage page
	var salePIP = getMostRecentSalePip();
	if (salePIP == undefined) 
		return "";

	var subDate = salePIP.querySelector('td[data-testid="sep-code"]').children[0].innerHTML;
	
	return subDate.replace(/(\s+)(.*)(\s+)/,"$2");
}

/* Function getSubDate
	Gets the T2 Agent's Name from the sale PIP */
function getSubDate() {
	// TODO: check for just one page...or a page w/o a Medicare Advantage

	//get the Medicare Advantage page
	var salePIP = getMostRecentSalePip();
	if (salePIP == undefined) 
		return "";

	var subDate = salePIP.querySelector('div[data-testid="date-created"]').innerHTML;
	
	return subDate.replace(/([\d\/]+) (.*)/,"$1");
}

/* Function getEffDate
	Gets the plan's effective date from the sale PIP */
function getEffDate() {
	// TODO: check for just one page...or a page w/o a Medicare Advantage

	var salePIP = getMostRecentSalePip();
	if (salePIP == undefined) 
		return "";

	var effDate = salePIP.querySelector('td[data-testid="requested-effective-date"] > div').innerHTML;
	
	return effDate;
}

//// ADDR STUFF ////

/* Function getCuInfoPg
	Gets the cu's info page */
function getCuInfoPg() {
	return $$('#contact-info-2')[0];
}

/* Function getCurrAddr
	Gets the cu's address or '' */
function getCurrAddr() {
	return $$('#address_1_street1')[0].innerHTML;
} 

/* Function getCity
	Gets the city */
function getCity() {
	return $$('#address_1_city')[0].innerHTML;
}
/* Function getState
	Gets the state */
function getState() {
	return $$('#address_1_state')[0].innerHTML;
}
/* Function getZip
	Gets the zip */
function getZip() {
	return $$('#address_1_zip')[0].innerHTML;
}

/* Function getAltAddr
	Gets the alt address */
function getAltAddr() {
	if(getCurrAddr() == '') {
		return '-';
	}

	return getCity() +", "+getState()+" "+getZip();
}

//// PUT IT TOGETHER ////

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
		if(isDB()) {
			console.warn("debug on (selectAppInfo)");
		}

		var finalString = 
			"T2 Agent:\t"+getT2AgentName()+
			"\nT3 Agent:\t"+getT3AgentName()+
			"\nPlan:\t"+getPlanData()+
			"\nSEP:\t"+getSep()+
			"\nSub Date:\t"+getSubDate()+
			"\nEff Date:\t"+getEffDate()+
			"\nAlt Address:\t"+getAltAddr();

		copyStringToClipboard(finalString);

		return;
	}
}


/*************
 * LOGIC
 *************/
if(typeof bo == "undefined") {
	window.bo = {
		ranSetup: false
	};
}
if(bo.ranSetup != true) {
	setUpKeyboardShortcuts();

	bo.ranSetup = true;
	bo.unloadBO = unloadBO;
	bo.alreadyPresent = alreadyPresent;
	bo.mydebug = mydebug;
	evt = { // For debugging/testing
		ctrlKey:true,
		shiftKey:true,
		which:70
	}
} else {
	bo.alreadyPresent();
}
