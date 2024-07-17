//~~~~ BO CUSTOMIZATION ~~~~//

// TODO: 

// working on vvv
	// priority vvv
	// TODO: BO CT+SH+X PULLING WRONG INFO ON 121679558
	// TODO: BO CT+SH+X PULLING WRONG INFO ON 126980663

	// TODO: Shortcut to add new PIP
		// TODO: Have it add default values



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
**************/

/*** LIBRARY ***/

	/* Function alreadyPresent
		Alerts that the code already exists */
	function alreadyPresent() {
		console.warn(">> BO Code already present");
	}

	/* Function DEBUG FUNCTIONS
		tests for/starts/stops debug */
	mydebug = {
		isDebugging: false,
		isDB: function () {
			return this.isDebugging;
		},
		startDB: function() {
			this.isDebugging = true;
		},
		endDB: function() {
			this.isDebugging = false;	
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
	document.addEventListener("keyup", copyAppInfo);
	console.log("set up shortcuts");
}

/* Function unloadBO
	Removes the keyboard listeners from the page */
function unloadBO() {
	document.removeEventListener("keyup", copyAppInfo);
	console.log("removed shortcuts");
	document.ranSetup = false;
}

/* Function loadPlanInfoTab
	TODO: Make this a promise....
	Checks to see if the submitting agent is a T3 */
function loadPlanInfoTab() {
	if(this.loaded != true) {
		this.loaded = true;
		var targetTab = $$('#planInfoTab')[0]
		var activeTab = $$('.activeTab')[0];
		targetTab.click();
		activeTab.click();
	}
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
		if(bo.mydebug.isDB()) {
			console.warn(">> debug: at getMostRecentSalePip");
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
		if(bo.mydebug.isDB()) {
			console.warn(">> debug: at getMostRecentDtcPip");
		}

		var dtcPip = $$('#appInfoContainer div:contains("DTC Transfer")');
		if(dtcPip[0] == undefined) {
			console.warn("Could not find DTC PIP");
			return undefined;
		}

		return dtcPip[0];
	}

	//// GET INFO FROM PIP'S ////

	/* Function isSubmittingAgentT3
		Checks to see if the submitting agent is a T3 */
	function isSubmittingAgentT3() {
		if(this.result != undefined) {
			return this.result;
		}

		var dtcPIP = getMostRecentDtcPip();

		loadCommHistTab();

		if(dtcPIP != undefined) {
			this.result = true;
		} else if(getT2UsernameFromCommHistory() != "-") {
			this.result = true;
		} else {
			this.result = false;
		}

		return this.result;
	}


	/* Function loadCommHistTab
		TODO: Make this a promise....
		Checks to see if the submitting agent is a T3 */
	function loadCommHistTab() {
		if(this.loaded != true) {
			this.loaded = true;
			var commHistTab = $$('#communicationHistoryTab')[0]
			var activeTab = $$('.activeTab')[0];
			commHistTab.click();
			activeTab.click();
			console.log("loaded Comm tab");
		}
	}


	/* Function getAORsNameFromPIP
		Gets the T2 agent's name from the DTC PIP or the sales PIP */
	function getAORsNameFromPIP(pip) {
		if (pip == undefined) return "-";

		var agentName = pip.querySelector('div[data-testid="agent-of-record"]').innerHTML;

		return agentName.replace(/(.*) \(\d+\)/,"$1");
	}

	/* Function getT2AgentName
		Gets the T2 agent's name from the DTC PIP or the sales PIP */
	function getT2AgentName() {
		var planPIP;

		if(isSubmittingAgentT3()) {
			planPIP = getMostRecentDtcPip();
		} else {
			planPIP = getMostRecentSalePip();
		}

		if(planPIP != undefined) {
			return getAORsNameFromPIP(planPIP);
		} else {
			return getT2UsernameFromCommHistory();
		}
	}

	/* Function getT3AgentName
		Gets the T3 agent's name from the sale PIP */
	function getT3AgentName() {
		var salePIP;

		if (isSubmittingAgentT3()) {
			salePIP = getMostRecentSalePip();
			return getAORsNameFromPIP(salePIP);
		} else {
			return "-";
		}

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

	/* Function getSubDatePadded
		Gets the T2 Agent's Name from the sale PIP, padded w/0's */
	function getSubDatePadded() {
		var subDate = getSubDate();
		var paddedDate = new Date(subDate);
		var options = {
		    day: "2-digit",
		    month: "2-digit",
		    year: "numeric"
		}

		return paddedDate.toLocaleString("en-US",options);
	}

	/* Function getEffDate
		Gets the plan's effective date from the sale PIP */
	function getEffDate() {
		// TODO: check for just one page...or a page w/o a Medicare Advantage

		var salePIP = getMostRecentSalePip(),
			effDate;
		if (salePIP == undefined) 
			return "";

		var effDate = salePIP.querySelector('td[data-testid="requested-effective-date"] > div').innerHTML;
		
		return effDate;
	}

	/* Function getT2UsernameFromCommHistory
		Gets the username from the Comm history tab */
	function getT2UsernameFromCommHistory() {
		/* Considerations:
			0. 99% of the time, the DTC call is on the same day as
				the enrollment
			1. The T3 sometimes has to hunt down the person, 
				so the app is done on a later date than the T2 agent
				talks to the cu
			2. Sometimes the T2 person puts "App Submitted"
			x 3. We can usually find the UserID for the T3 agent by
				manipulating their name
			4. What if the T2 person from the call log...is 
				the sales person. Then you'd have a dup.

			note: T1 shows their transfer as "Transfer - Tier 2",
			which means I may be able to differentiate from a
			VConnect transfer/know it's a T2 person

			planInfoTab/contactInfoTab << tab names
		*/
		var t3Name, subDate;

		loadCommHistTab();

		// find every entry matching the sub date, filter out unimportant
		subDate = getSubDatePadded();
		callRecordAry = $$('#lead-communication tr:contains('+subDate+')');
		callRecordAry = callRecordAry.filter((el) => {
			console.log(el.children[5]);
			return el.children[5].innerHTML == "Application Submitted" 
			    || el.children[5].innerHTML == "DTC Transfer";
			    //|| el.children[5].innerHTML == "Transfer - Tier 2" 
		});

		if(callRecordAry.length == 1) {
			// 1 - T2 only? VConnect, etcA
			alert("Check comm history. Only one record");
			return "-";
		} else if(callRecordAry.length == 2) {
			// Most likely a T2/T3 pair
			if(callRecordAry[1].children[5].innerHTML == "DTC Transfer") {
				return callRecordAry[1].children[3].innerHTML;

			} else if(callRecordAry[0].children[5].innerHTML == "DTC Transfer") {
				return callRecordAry[0].children[3].innerHTML;

			} else if(callRecordAry[0].children[5].innerHTML == "Application Submitted"
					 && callRecordAry[1].children[5].innerHTML == "Application Submitted") {
				//if you're getting the T2 username from the comm history,
				//the Sale PIP is from the T3 agent
				t3Name = getAORsNameFromPIP(getMostRecentSalePip());
				t3UserNameIsh = t3Name.toLowerCase().replace(/([a-z])([a-z]+ )([a-z]+)/,"$1$3");

				if(callRecordAry[0].children[3].innerHTML.search(t3UserNameIsh) == 0){
					return callRecordAry[1].children[3].innerHTML;
				} else {
					return callRecordAry[0].children[3].innerHTML;
				}

			} else {
				alert("Something went wrong");
				console.warn("Something went wrong");
				return "-";
			}
		} else if(callRecordAry.length > 2) {
			// 3+- uh...not sure
			alert("Check comm history. More than two records");
			return "-";
		}
		
	}


	//// ADDR STUFF ////

		// /* Function getCuInfoPg
		// 	Gets the cu's info page */
		// function getCuInfoPg() {
		// 	return $$('#contact-info-2')[0];
		// }

		/* Function getCurrAddr
			Gets the cu's address or '' */
		function getCurrAddr() {
			var addr = $$('#address_1_street1')[0].innerHTML.replaceAll("&nbsp;","");
			if(addr.slice(0,6).toUpperCase() == "PO BOX") {
				return "";
			}
			return addr;
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
			var addr = getCurrAddr();
			if(addr == "") {
				return getCity()+", "+getState()+" "+getZip();
			} else {
				return addr+", "+getCity()+", "+getState()+" "+getZip();
			}

		}


	//// PUT IT TOGETHER ////

	/*  Function copyAppInfo
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
	function copyAppInfo(evt) {
		// CTRL + SHIFT + X
		if (evt.ctrlKey && evt.shiftKey && evt.which == 88) {
			if(bo.mydebug.isDB()) {
				console.warn(">> debug: at copyAppInfo");
			}

			var finalString = 
				"T2 Agent:\t"+getT2AgentName()+"\n"+
				"T3 Agent:\t"+getT3AgentName()+"\n"+
				"Plan:\t"+getPlanData()+"\n"+
				"SEP:\t"+getSep()+"\n"+
				"Sub Date:\t"+getSubDate()+"\n"+
				"Eff Date:\t"+getEffDate()+"\n"+
				"Alt Address:\t"+getAltAddr();

			copyStringToClipboard(finalString);

			return;
		}
	}


/*************
* LOGIC
**************/
if(typeof bo == "undefined") {
	window.bo = {
		ranSetup: false
	};
}
if(bo.ranSetup != true) {
	setUpKeyboardShortcuts();
	loadCommHistTab();
	loadPlanInfoTab();

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

//*
function isPipTabLoaded() {
	return $$('.tbl-form.applicantsTable').length != 0;
}
function isCommTabLoaded() {
	return  $$('#communicationHistoryTable table').length != 0;	
}
console.log("PIP: ",isPipTabLoaded());
console.log("Comm: ",isCommTabLoaded());
/**/
