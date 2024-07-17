//~~~~ AE CUSTOMIZATION ~~~~//

// TODO: 

	// 1  working on

	// 2 priority

	// 3 backlog
		// TODO: 
		// TODO: Auto-copy Mcd id (mutator, probably)
		// TODO: Make Ctrl+Enter 
		// TODO: Make getters for all fields
			// TODO: Make getter for State
			// TODO: Make getter for Gender
		// TODO: Make setters for all fields
			// TODO: Make setter for Gender
			// TODO: Make setter for State
	
	/** DONE **/
		// TODO: Make getters for all fields
			// TODO: Make getter for First name
			// TODO: Make getter for last name
			// TODO: Make getter for DOB
			// TODO: Make getter for MBI
			// TODO: Make getter for Mcd #
			// TODO: Make getter for SSN

		// TODO: Make setters for all fields
			// TODO: Make setter for First name
			// TODO: Make setter for last name
			// TODO: Make setter for DOB
			// TODO: Make setter for MBI
			// TODO: Make setter for Mcd #
			// TODO: Make setter for SSN


/* Function function_name
   NOTES_ON_FN */
function function_name(argument) {
	// body...
}

/*************
* DATABASES
**************/
//// GENERAL ////

   /*** ALLOWED STATES DB ***/
   allowedStatesDB = {
      _DB: {
         allowedStates: [ "AL", "AR", "CA", "CO", "CT", "FL", "GA", "KS", "KY", 
         					  "LA", "MD", "MI", "MO", "MS", "NC", "NV", "NY", "OH", 
         					  "PA", "SC", "SD", "TX", "WV" ]
      },
      isStateAllowed: function(state) {
         // state = stateNameToAbbrDB.getAbbr(state);
         return this._getDB().includes(state.toUpperCase());
      }, 
      _getDB: function() {return this._DB.allowedStates}
   }


/*************
* FUNCTIONS
**************/

/*** LIBRARY ***/

	/* Function alreadyPresent
		alerts that the code already exists */
	function alreadyPresent() {
		console.warn(">> AE Code already present");
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
			console.warn(">> Nothing to copy");
			return;
		}

		navigator.clipboard.writeText(string).then(() => {
		  console.log('>> Content copied to clipboard');
		},() => {
		  console.error('>> Failed to copy');
		});
	}

	/* Function copyElToClipboard
		Copies the content of an el to the computer clipboard */
	function copyElToClipboard(htmlEl) {
		if(htmlEl == null) {
			console.warn(">> Nothing to copy");
			return;
		}

	    var range = document.createRange();
	    var sel = document.getSelection();

	    sel.removeAllRanges();
	    range.selectNodeContents(htmlEl);
		sel.addRange(range);
		document.execCommand("Copy");
	}

	/* Function addCssEl
		Adds the passed in CSS text to the document body */
	function addCssEl(cssText, doc) {
		doc = (doc == null || doc == undefined) ? document : doc;

		if (cssText!=null) {
			const css_el = doc.createElement("style");
			css_el.textContent = cssText;
			doc.childNodes[1].appendChild(css_el);
		}
	}

	/* Function addJsScript
		Adds the passed in script text to the document body */
	function addJsScript(scriptText, doc) {
		doc = (doc == null || doc == undefined) ? document : doc;

		if (scriptText!=null) {
			const js_el = doc.createElement("script");
			js_el.textContent = scriptText;
			doc.childNodes[1].appendChild(js_el);
		}
	}

   /* Function addJsFromURL
      Adds the passed in script text to the document body */
   function addJsFromURL(url, doc) {
      doc = (doc == null || doc == undefined) ? document : doc;

      if (url!=null) {
         var js_el = doc.createElement("script");
         js_el.src = url;
         doc.head.appendChild(js_el);
      }

      return js_el;
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
		document.addEventListener("keyup", initiateSearch);      // CTRL + Enter // b/c it's a common submit shortcut
		document.addEventListener("keyup", pasteInSearchInfo);   // CTRL + SHIFT + V // V b/c it's paste
		console.warn(">> set up shortcuts");
	}

	/* Function unload
	   Removes the keyboard listeners from the page */
	function unload() {
		document.removeEventListener("keyup", initiateSearch);
		document.removeEventListener("keyup", pasteInSearchInfo);
		console.log(">> removed shortcuts");
		ae.ranSetup = false;
	}

	/* Function hideMailingStateDiv
	   Hides the Mailing state div */
	function hideMailingStateDiv() {
		addCssEl(`
			.page-wrapper ion-row:nth-child(4) {
				display:none;
			}
		`)
	}


/*** GETTERS & SETTERS ***/

	// FIRST NAME //
	/* Function getFirstNameField
	   Gets the First Name field */
	function getFirstNameField() {
		return $('#mat-input-0');
	}

	/* Function setFirstNameField
	   Sets the First Name field */
	function setFirstNameField(val) {
		var el = getFirstNameField()

		el.val(val);
		el[0].dispatchEvent(new Event('input'));

		return getFirstNameField().val() == val;
	}

	// LAST NAME //
	/* Function getLastNameField
	   Gets the First Name field */
	function getLastNameField() {
		return $('#mat-input-1');
	}

	/* Function setLastNameField
	   Sets the First Name field */
	function setLastNameField(val) {
		var el = getLastNameField()

		el.val(val);
		el[0].dispatchEvent(new Event('input'));

		return getLastNameField().val() == val;
	}

	// DOB //
	/* Function getDOBField
	   Gets the First Name field */
	function getDOBField() {
		return $('#mat-input-2');
	}

	/* Function setDOBField
	   Sets the First Name field */
	function setDOBField(val) {
		var el = getDOBField()

		el.val(val);
		el[0].dispatchEvent(new Event('input'));

		return getDOBField().val() == val;
	}

	// MBI //
	/* Function getMBIField
	   Gets the First Name field */
	function getMBIField() {
		return $('#mat-input-3');
	}

	/* Function setMBIField
	   Sets the First Name field */
	function setMBIField(val) {
		var el = getMBIField()

		el.val(val);
		el[0].dispatchEvent(new Event('input'));

		return getMBIField().val() == val;
	}

	// GENDER //
	/* Function getGenderField
	   Gets the First Name field */
	function getGenderField() {

	}

	/* Function setGenderField
	   Sets the First Name field */
	function setGenderField(val) {

	}

	// MEDICAID ID //
	/* Function getMedicaidIDField
	   Gets the First Name field */
	function getMedicaidIDField() {
		return $('#mat-input-4');
	}

	/* Function setMedicaidIDField
	   Sets the First Name field */
	function setMedicaidIDField(val) {
		var el = getMedicaidIDField()

		el.val(val);
		el[0].dispatchEvent(new Event('input'));

		return getMedicaidIDField().val() == val;
	}

	// SSN //
	/* Function getSSNField
	   Gets the First Name field */
	function getSSNField() {
		return $('#mat-input-5');
	}

	/* Function setSSNField
	   Sets the First Name field */
	function setSSNField(val) {
		var el = getSSNField()

		el.val(val);
		el[0].dispatchEvent(new Event('input'));

		return getSSNField().val() == val;
	}

	// State //
	/* Function getStateField
	   Gets the First Name field */
	function getStateField() {

	}

	/* Function setStateField
	   Sets the First Name field */
	function setStateField(val) {

	}

	function checkGetters() {
		console.log("getFirstNameField", getFirstNameField());
		console.log("getLastNameField", getLastNameField());
		console.log("getDOBField", getDOBField());
		console.log("getMBIField", getMBIField());
		console.log("getGenderField", getGenderField());
		console.log("getMedicaidIDField", getMedicaidIDField());
		console.log("getSSNField", getSSNField());
		console.log("getStateField", getStateField());
	}

	function checkSetters() {
		console.log("setFirstNameField", setFirstNameField("123"));
		console.log("setLastNameField", setLastNameField("123"));
		console.log("setDOBField", setDOBField("123"));
		console.log("setMBIField", setMBIField("123"));
		console.log("setGenderField", setGenderField("123"));
		console.log("setMedicaidIDField", setMedicaidIDField("123"));
		console.log("setSSNField", setSSNField("123"));
		console.log("setStateField", setStateField("123"));
	}


/*** AUTOSUBMIT ***/

   /* Function initiateSearch
      Triggers the search */
   function initiateSearch(evt) {
      // CTRL + Enter // b/c it's a common submit shortcut
      if (evt.ctrlKey && evt.which == 13) {
         console.log("ran initiateSearch");
         var submitButton = $('.submitButton'); // TODO: get the submit button
         if(submitButton != null) {    
            submitButton.click();
         }
      }
   }


/*** CLEAR FORM ***/

   /* Function clearForm
      Empties the search form */
   function clearFormShortcut(evt) {
      // CTRL + Enter // b/c it's a common submit shortcut
      if (evt.ctrlKey && evt.which == 13) {
         clearForm();
		}
   }

   /* Function clearForm
      Empties the search form */
   function clearForm(evt) {
      setFirstNameField("");
      setLastNameField("");
      setDOBField("");
      setMBIField("");
      setMedicaidIDField("");
      setSSNField("");
   }


/*** CLEAR FORM BUTTON ***/

   /* Function addClearFormButton
      Empties the search form */
   function addClearFormButton() {

		// Make the button 
		const clearFormBtn = document.createElement('button');
		clearFormBtn.innerHTML = 'Clear Form';
		clearFormBtn.type='button';
		clearFormBtn.id='clearForm';
		clearFormBtn.onclick=clearForm;
      clearFormBtn.classList.add("clearFormBtn");

		// Make the CSS
		const cssText = `
         .clearFormBtn {
            background-color: #fff;
            font-size: 13px;
            border: thin solid #c00;
            border-radius: 17px;
            color: #c00;

            display: block;
            padding: 13px 25px 10px;
            width: 170px;
            cursor: pointer;
            margin-left: 10px;
         }`

		// Append button
		$(".page-wrapper ion-row:nth-child(6)").appendChild(clearFormBtn);
      addCssEl(cssText);
   }


/*** PASTE SEARCH INFO ***/

   /* Function pasteInSearchInfo
      Takes the info copied from ZD and pastes it into the correct fields */
   function pasteInSearchInfo(evt) {
      // CTRL + SHIFT + V // V b/c it's paste
      if (evt.ctrlKey && evt.shiftKey && evt.which == 86) {
         console.log(">> ran pasteInSearchInfo");
         navigator.clipboard
            .readText()
            .then((clipText) => {
               var cuInfoObj;
               try {
                  cuInfoObj = JSON.parse(clipText);
               } catch(exception) {
                  console.warn("Failed to parse clipText: ", clipText);
                  return;
               }

               clearForm();
               fillFields(cuInfoObj);
               submitIfComplete();
            });
      }

   }

   /* Function fillFields
      Adds info from data object provided to every  */
   function fillFields(data) {
   	var modifiedDOB;

      if(typeof data != "object") {
         console.warn("Could not fill fields. Data is not an object");
         return false;
      }

      if(data.firstName != "") {
         setFirstNameField(data.firstName);
      }
      
      if(data.lastName != "") {
         setLastNameField(data.lastName);
      }
      
      if(data.dob != "") {
         if(!/(\d\d?[\/\.\-]\d\d?[\/\.\-](\d{4}))/.test(data.dob)){
            modifiedDOB = data.dob.replaceAll(/\.\-/g,"/");
            modifiedDOB = modifiedDOB.replace(/^(\d\d?\/\d\d?\/)(\d\d)$/,"$119$2");
         }
         setDOBField(modifiedDOB != undefined ? modifiedDOB : data.dob);
      }
      
      if(data.sex != "") {
         setGenderField(data.sex);
      }
      
      if(data.mbi != "") {
         setMBIField(data.mbi);
      }
      
      if(data.mcdId != "") {
         setMedicaidIDField(data.mcdId);
      }
      
      if(data.ssn != "") {
         setSSNField(data.ssn.replaceAll(/\-/g,""));
      }

      if(data.state != "") {
         setStateField(data.state);
      }
   }

   /*** SUBMIT IF COMPLETE ***/

   /* Function getAllRequiredFields
      Checks if all required fields have been filled, and if so, it submits the search */
   function getAllRequiredFields() {
      var requiredMarkers = getTier2ElAll(".required");
      
      // last element is just the footnote
      // the second to last is probably not needed
   }

   /* Function formIsComplete
      Returns true if all required fields have been filled */
   function formIsComplete() {
      // get the Search Option, then check those particular fields
         // if(type 1) 
            // do stuff for all of them
   }

   /* Function submitIfComplete
      Checks if all required fields have been filled, and if so, it submits the search */
   function submitIfComplete() {
      // should I do this? what if the name isn't functional?

      // check the Search Option. Only certain Search Options are allowed to be immediately searched.
   }


/*** FEATURE NAME ***/

	/* Function exampleFn
	   DESCRIPTION */
	function exampleFn() {
		// var firstInfoElList = $('div.ae-comment:contains("Agent Name:")');
		// var firstInfoElListLn = firstInfoElList.length;
		// if (firstInfoElListLn == 0) {
		// 	return null;
		// } else {
		// 	return firstInfoElList[firstInfoElListLn-1];
		// }
	}

	/**** SUB FEATURE ****/

	/* Function subfeatureFn
	   DESCRIPTION */
	function subfeatureFn() {

	}


/*************
* LOGIC
**************/
if(typeof ae == "undefined") {
	window.ae = {
		ranSetup: false
	};
	hideMailingStateDiv();
}
if(ae.ranSetup != true) {
	setUpKeyboardShortcuts();

	ae.ranSetup = true;
	ae.unload = unload;
	ae.alreadyPresent = alreadyPresent;
	ae.mydebug = mydebug;
} else {
	ae.alreadyPresent();
}
