//~~~~ AE CUSTOMIZATION ~~~~//

/* TODO: 

   /**  1  WORKING ON **
      // TODO: Figure this out. Didn't paste mcd id https://gohealth.zendesk.com/agent/tickets/17850535
      // TODO: Sometimes it isn't auto-searching
      // TODO: Figure out what to do if there are mult messages: Mcd id and LTC
      // TODO: Make message that says "inactive doesn't mean inactive"
      // TODO: Add "Ctrl S" for state select
      // TODO: Add "Ctrl Enter" > Submit

   /**  2  PRIORITY   **
      // TODO: Make the "no dual" pop-up work w/enter

   /**  3  BACKLOG    **
      // TODO: Make a clear form button
      // TODO: Make it so that Ctrl + V doesn't happen
      // TODO: Figure out how to set the Gender/state to ""
      // TODO: Figure out how to tell if you need to log back in (when you search, but nothing happens)
      // TODO: Make a "pasted" notification

   /** DONE **
      // Made Mcd # detection case-insensitive, so it doesn't throw errors incorrectly

      /**** Post Version Release ****

      // Added a message about LTC when pasting in for a state that has LTC
      // Fixed an issue w/DOB pasting w/incorrect format
      // Added ME
      // TODO: Prevent fill fields if the state doesn't work
      // Create a "message" section
         // TODO: Notify if the state doesn't work
         // TODO: Notify if the id doesn't match the state (not for SSN);
      // TODO: Fix when pasting in, but search didn't happen >> right now it grabs the lead id.
      // TODO: Make a "fake MBI button" that will auto-populate a fake MBI when there isn't one
      // TODO: Fixed level not showing up
      // TODO: Autosubmit
      // TODO: Creating autonav (gets to next spot)
      // TODO: Added in a "Fake MBI" option
      // TODO: Make shortcut submit lock, so that you don't search twice
      // TODO: Auto-copy Mcd id (mutator, probably)
      // TODO: Make Ctrl+Enter 
      // TODO: Make getters for all fields
         // TODO: Make getter for First name
         // TODO: Make getter for last name
         // TODO: Make getter for DOB
         // TODO: Make getter for MBI
         // TODO: Make getter for Mcd #
         // TODO: Make getter for SSN 
         // TODO: Make getter for Gender
         // TODO: Make getter for State

      // TODO: Make setters for all fields
         // TODO: Make setter for State
         // TODO: Make setter for Gender
         // TODO: Make setter for First name
         // TODO: Make setter for last name
         // TODO: Make setter for DOB
         // TODO: Make setter for MBI
         // TODO: Make setter for Mcd #
         // TODO: Make setter for SSN
*/

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
      _DB: {   //ADD STATES HERE
         allowedStates: [ "AL", "AR", "CA", "CO", "CT", "FL", "GA", 
                          "IA", "KS", "KY", "LA", "MD", "ME", "MI", 
                          "MO", "MS", "NC", "NE", "NJ", "NV", "NY", 
                          "OH", "PA", "SC", "SD", "TX", "VA", "WV"]
      },
      isStateAllowed: function(state) {
         return this._getDB().includes(state.toUpperCase());
      }, 
      _getDB: function() {return this._DB.allowedStates}
   }


   /*** STATE DB ***/
   stateDB = {
      _DB: {
         stateInfo:{
            AK: {
               stateCode:'AK',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            AL: {
               stateCode:'AL',
               mcdIdFormat:'13 characters, #\'s only',
               mcdIdExample:'1234567890123',
               format: '\\d{13}',
               ltcWaiver: '',
               usesInactive: 'x',
               fbdeRaises: '',
               keyWords: 'AID= / Plan Coverage Description: ',
               npi: '1376156240'
            },
            AR: {
               stateCode:'AR',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Plan Coverage Description: / Qualified Medicare Beneficiary / Specified Low-income Medicare Beneficiaries / Medicaid thru Supplemental Security Income / Long Term Care',
               npi: ''
            },
            AZ: {
               stateCode:'AZ',
               mcdIdFormat:'9 characters, letters and #\'s. Starts with A',
               mcdIdExample:'A23456789',
               format: 'A\\d{8}',
               ltcWaiver: 'x',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '- SLMB / - QMB / - SSI / - TANF / - AHC / - ADULT / - NEWLY / - SOBRA / - QI1 / - MN/MI / - KIDS / LTC / Long Term Care',
               npi: '1679759989'
            },
            CA: {
               stateCode:'CA',
               mcdIdFormat:'9 or 14 characters, letters and #\'s. 9th character a letter',
               mcdIdExample:'12345678A01234 OR 12345678A',
               format: '\\d{8}[A-Z](\\d{5})?',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Primary Aid Code / 2nd Special Aid Code / 8C / Remaining',
               npi: ''
            },
            CO: {
               stateCode:'CO',
               mcdIdFormat:'7 characters, letters and #\'s. 1st character is letter.',
               mcdIdExample:'A234567',
               format: '[A-Z]\\d{6}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            CT: {
               stateCode:'CT',
               mcdIdFormat:'9 characters, #\'s only',
               mcdIdExample:'123456789',
               format: '\\d{9}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Plan Coverage Description: / Medicare Covered Services Only / Qualified Medicare Beneficiary / Husky / Medicare Covered Services Only ',
               npi: ''
            },
            DC: {
               stateCode:'DC',
               mcdIdFormat:'8 characters, #\'s only',
               mcdIdExample:'12345678',
               format: '\\d{8}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            DE: {
               stateCode:'DE',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            FL: {
               stateCode:'FL',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: 'x',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Plan Coverage Description: / SLMB / QMB / Long-Term Care',
               npi: ''
            },
            GA: {
               stateCode:'GA',
               mcdIdFormat:'12 characters, #\'s only',
               mcdIdExample:'123456789012',
               format: '\\d{12}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Plan Coverage Description: / Qualified Medicare Beneficiary / Spec. Low Income Mcre Benefic',
               npi: ''
            },
            HI: {
               stateCode:'HI',
               mcdIdFormat:'10 characters, letters and #\'s. 2nd character is letter.',
               mcdIdExample:'1A34567890',
               format: '\\d[A-Z]\\d{7}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            IA: {
               stateCode:'IA',
               mcdIdFormat:'8 characters, letters and #\'s. 1st character is letter.',
               mcdIdExample:'A2345678',
               format: '[A-Z]\\d{7}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            ID: {
               stateCode:'ID',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            IL: {
               stateCode:'IL',
               mcdIdFormat:'9 characters, #\'s only',
               mcdIdExample:'123456789',
               format: '\\d{9}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: ' Plan Coverage Description: / QMB only',
               npi: '1417114836'
            },
            IN: {
               stateCode:'IN',
               mcdIdFormat:'12 characters, #\'s only',
               mcdIdExample:'123456789012',
               format: '\\d{12}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: ' Plan Coverage Description: / Medicaid: / Qualified Medicare Beneficiary / Full Medicaid / Specified Low Income Medicare Beneficiary',
               npi: ''
            },
            KY: {
               stateCode:'KY',
               mcdIdFormat:'11 characters, #\'s only',
               mcdIdExample:'12345678901',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: 'memberProgramCode / memberStatusCode',
               npi: ''
            },
            KS: {
               stateCode:'KS',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{11}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            LA: {
               stateCode:'LA',
               mcdIdFormat:'13 characters, #\'s only',
               mcdIdExample:'1234567890123',
               format: '\\d{13}',
               ltcWaiver: '',
               usesInactive: 'x',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            MA: {
               stateCode:'MA',
               mcdIdFormat:'12 characters, #\'s only',
               mcdIdExample:'123456789012',
               format: '\\d{12}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            MD: {
               stateCode:'MD',
               mcdIdFormat:'11 characters, #\'s only',
               mcdIdExample:'12345678901',
               format: '\\d{11}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            ME: {
               stateCode:'ME',
               mcdIdFormat:'None',
               mcdIdExample:'None',
               format: '',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            MI: {
               stateCode:'MI',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            MN: {
               stateCode:'MN',
               mcdIdFormat:'8 characters, #\'s only',
               mcdIdExample:'12345678',
               format: '\\d{8}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            MO: {
               stateCode:'MO',
               mcdIdFormat:'8 characters, #\'s only',
               mcdIdExample:'12345678',
               format: '\\d{8}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Medical Assist. Cat.: / Qualified Medicare Beneficiary',
               npi: ''
            },
            MS: {
               stateCode:'MS',
               mcdIdFormat:'9 characters, #\'s only',
               mcdIdExample:'123456789',
               format: '\\d{9}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Medicaid State Plan / Plan Coverage Description: / Qualified Medicare Beneficiary / Specified Low Income Medicare Beneficiaries',
               npi: ''
            },
            MT: {
               stateCode:'MT',
               mcdIdFormat:'7 characters, #\'s only',
               mcdIdExample:'1234567',
               format: '\\d{7}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            NC: {
               stateCode:'NC',
               mcdIdFormat:'10 characters, letters and #\'s. Ends with a letter',
               mcdIdExample:'123456789A',
               format: '\\d{9}[A-Z]',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: 'COE',
               npi: ''
            },
            ND: {
               stateCode:'ND',
               mcdIdFormat:'9 characters, letters and #\'s. Starts with ND',
               mcdIdExample:'ND3456789',
               format: 'ND\\d{7}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            NE: {
               stateCode:'NE',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            NH: {
               stateCode:'NH',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            NJ: {
               stateCode:'NJ',
               mcdIdFormat:'12 characters, #\'s only',
               mcdIdExample:'123456789012',
               format: '\\d{12}',
               ltcWaiver: 'x',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'PROGRAM / QMB PLUS / Long Term Care / MSP / Qualified Medicare Beneficiary / MLTSS',
               npi: ''
            },
            NM: {
               stateCode:'NM',
               mcdIdFormat:'14 characters, #\'s only',
               mcdIdExample:'12345678901234',
               format: '\\d{14}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            NV: {
               stateCode:'NV',
               mcdIdFormat:'11 characters, #\'s only',
               mcdIdExample:'12345678901',
               format: '\\d{11}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            NY: {
               stateCode:'NY',
               mcdIdFormat:'8 characters, letters and #\'s. 1st, 2nd & 8th characters are letters.',
               mcdIdExample:'AB34567C',
               format: '[A-Z]{2}\\d{5}[A-Z]',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Plan Coverage Description: / ABDQMB / ABD',
               npi: ''
            },
            OH: {
               stateCode:'OH',
               mcdIdFormat:'12 characters, #\'s only',
               mcdIdExample:'123456789012',
               format: '\\d{12}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: 'Plan Coverage Description: / Medicaid FFS| /  MCE | / | SLMB',
               npi: ''
            },
            OK: {
               stateCode:'OK',
               mcdIdFormat:'9 characters, #\'s only',
               mcdIdExample:'123456789',
               format: '\\d{9}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            OR: {
               stateCode:'OR',
               mcdIdFormat:'8 characters, letters and #\'s. 1st, 2nd, 6th & 8th characters are letters.',
               mcdIdExample:'AB345C7D',
               format: '[A-Z]{2}\\d{4}[A-Z]{3}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            PA: {
               stateCode:'PA',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            RI: {
               stateCode:'RI',
               mcdIdFormat:'None',
               mcdIdExample:'None',
               format: '',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            SC: {
               stateCode:'SC',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: 'PCAT ## / Qualified Medicare Beneficiary',
               npi: ''
            },
            SD: {
               stateCode:'SD',
               mcdIdFormat:'9 characters, #\'s only',
               mcdIdExample:'123456789',
               format: '\\d{9}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            TN: {
               stateCode:'TN',
               mcdIdFormat:'11 characters, letters and #\'s. Starts with TD',
               mcdIdExample:'TD345678901',
               format: 'TD\\d{9}',
               ltcWaiver: 'x',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Qualified Medicare Beneficiary / Medicaid / -TITLE 19 MEDICAID / Inactive / Special Low Income Medicare Beneficiary / -Medicaid / CHOICES',
               npi: ''
            },
            TX: {
               stateCode:'TX',
               mcdIdFormat:'9 characters, #\'s only',
               mcdIdExample:'123456789',
               format: '\\d{9}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: 'Plan Coverage Description: / MAO, / SSI, / Medical Assistance / TANF / 41 Pregnant Women',
               npi: ''
            },
            UT: {
               stateCode:'UT',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            VA: {
               stateCode:'VA',
               mcdIdFormat:'12 characters, #\'s only',
               mcdIdExample:'123456789012',
               format: '\\d{12}',
               ltcWaiver: 'x',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: 'Long Term Care',
               npi: ''
            },
            VT: {
               stateCode:'VT',
               mcdIdFormat:'7 characters, #\'s only',
               mcdIdExample:'1234567',
               format: '\\d{7}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            WA: {
               stateCode:'WA',
               mcdIdFormat:'11 characters, letters and #\'s. Ends with WA',
               mcdIdExample:'123456789WA',
               format: '\\d{9}WA',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: ' Plan Coverage Description: / RAC=',
               npi: ''
            },
            WI: {
               stateCode:'WI',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: 'Plan Coverage Description:',
               npi: ''
            },
            WV: {
               stateCode:'WV',
               mcdIdFormat:'11 characters, #\'s only',
               mcdIdExample:'12345678901',
               format: '\\d{11}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: '',
               npi: ''
            },
            WY: {
               stateCode:'WY',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '\\d{10}',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            }
         }
      },
      isValidMcdNum: function(stateAbbr,mcdNum) {
         // !!! stateAbbr is not validated
         var tester, 
             stateInfo = this.getStateInfo(stateAbbr);

         if(stateInfo != undefined) {
            tester = new RegExp(stateInfo.format, "i");
         } else {
            throw "Input given is not a valid state: "+stateAbbr;
         }

         return tester.test(mcdNum);
      },
      getStateInfo: function(stateAbbr) {
         return this._getDB()[stateAbbr];
      }, 
      _getDB: function() {return this._DB.stateInfo}
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

      return navigator.clipboard.writeText(string)
         .then(() => {
           console.log('>> Content copied to clipboard');
         },() => {
           console.error('>> Failed to copy');
         });
   }

   /* Function copyElToClipboard
      Copies the content of an el to the computer clipboard */
   function copyElToClipboard(htmlEl) {
      if(htmlEl == null) {
         console.warn("Nothing to copy");
         return;
      }

      //JQuery Strip
      if(htmlEl.get != undefined) {
         htmlEl = htmlEl.get(0);
      }

      var range = document.createRange();
      var sel = document.getSelection();

      sel.removeAllRanges();
      range.selectNodeContents(htmlEl);
      sel.addRange(range);
      document.execCommand("Copy");
   }

   /* Function getClipboard
      Gets the contents of the clipboard, w/o Ctrl + V */
   function getClipboard(callback,errorCallback) {
      var promise = navigator.clipboard
         .readText()
         .then(callback);
      if(errorCallback != undefined) {
         promise.error(errorCallback);
      }

      return promise;
   }

   /* Function addCssEl
      Adds the passed in CSS text to the document body */
   function addCssEl(cssText, doc=document) {
      // doc = (doc == null || doc == undefined) ? document : doc;

      const css_el = doc.createElement("style");

      if (cssText!=null) {
         css_el.textContent = cssText;
         doc.head.appendChild(css_el);
      }
      
      return css_el;
   }

   /* Function addJsScript
      Adds the passed in script text to the document body */
   function addJsScript(scriptText, doc) {
      doc = (doc == null || doc == undefined) ? document : doc;
      
      const js_el = doc.createElement("script");

      if (scriptText!=null) {
         js_el.textContent = scriptText;
         doc.head.appendChild(js_el);
      }

      return js_el;
   }

   /* Function addJsFromURL
      Adds the passed in script text to the document body */
   function addJsFromURL(url, doc) {
      doc = (doc == null || doc == undefined) ? document : doc;

      const js_el = doc.createElement("script");

      if (url!=null) {
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

   /* Function addMutationObs
      Adds a mutation observer to targetEl. Returns the observer. 
      The fn passed in will receive these arguments: */
   function addMutationObs(targetEl, fn, options) {
      if(typeof fn != "function") {
         fn = () => console.log("ran mutationObserver for ",targetEl);
      }
      if(typeof options != "object") {
         options = {childList:true, subtree:true};
      }
      if(targetEl.val) { // strip out the jQuery object
         targetEl = targetEl[0];
      }

      var mutationObs = new MutationObserver(fn);
      mutationObs.observe(targetEl, options);

      return mutationObs;
   }

   String.prototype.toProper = function (txt) {
      var properized = this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
      return properized;
   }

   evt = { // For debugging/testing
      ctrlKey:true,
      shiftKey:true,
      which:70
   }

   /* Function fnLogger
      Pre-made logger for when I'm trying to figure out what a fn that takes a fn does */
   function fnLogger(a,b,c) {
      console.log(a,b,c);
   }

   /* Function standardizeFullDateString
      Takes in 4-8 numbers, in day-mon-year order, w/ or w/out delimiters. Requires 19XX or 20XX. 
      Returns xx/xx/xxxx
      Fixes DOB formatting (- or " " or . vs /) and 0 pads Month/Day */
   function standardizeFullDateString(fullDate) {
      var moddedDate = fullDate.replaceAll(/[\.\- ]/g,"/"),
          partsAry;

      if(/(0?[0-9]|1[0-2])\/?(0?[1-9]|[12][0-9]|3[01])(19|20)\d{2}/.test(moddedDate)) {
         // If it has a 4-digit year, not preceded by a /
         moddedDate = moddedDate.replace(/^(0?[0-9]|1[0-2])\/?(0?[1-9]|[12][0-9]|3[01])\/?((19|20)?\d{2})$/,"$1/$2/$3");
         // if you want to default to another century, do "+defaultCentury+" on the line above
      } else if(/(0?[0-9]|1[0-2])\/?(0?[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}/.test(moddedDate)) {
         // If it has a 4-digit year, preceded by a /
         moddedDate = moddedDate.replace(/^(0?[0-9]|1[0-2])\/?(0?[1-9]|[12][0-9]|3[01])\/?((19|20)\d{2})$/,"$1/$2/$3");
         // if you want to default to another century, do "+defaultCentury+" on the line above
      } else if(/(0?[0-9]|1[0-2])\/?(0?[1-9]|[12][0-9]|3[01])\/?\d{2}/.test(moddedDate)) {
         // If it has a 2-digit year, preceded by a /
         moddedDate = moddedDate.replace(/^(0?[0-9]|1[0-2])\/?(0?[1-9]|[12][0-9]|3[01])\/?(\d{2})$/,"$1/$2/19$3");
         // if you want to default to another century, do "+defaultCentury+" on the line above
      } 

      // Split it into parts, so that you can 0 pad
      partsAry = moddedDate.match(/^(0?[0-9]|1[0-2])\/?(0?[1-9]|[12][0-9]|3[01])\/(\d{4})$/);
      if(partsAry == null ) {
         console.warn("~~ full date", fullDate);
      }

      return ("0"+partsAry[1]).slice(-2) + "\/" + ("0"+partsAry[2]).slice(-2) + "\/" + ("19"+partsAry[3]).slice(-4);
   }

   /* Function convertColonListToJsonObj
      Takes a text string, which is a list of info divided by colons,
      and converts it to a JSON obj. Pass in the list, and true if it 
      has a header, or a string, if you want to check.
      DOES NOT standardize the keys. */
   function convertColonListToJsonObj(colonList, hasHeader=false) {
      var logStuff = false;
          emptyValProtection = colonList.replaceAll(/:\s*\r?\n/g,": -\n"),
          tabAfterColon = emptyValProtection.replaceAll(/:[ \t]+/g,":\t"),
          infoAry = tabAfterColon.split(/\s*\r?\n|:\s*/g),
          listDividers = tabAfterColon.match(/\r?\n|:?\t/g), // if starts w/ \r\n >> has header, if :?\t >> list
          returnObj = {},
          iter = 0;

          console.warn("ran convertColonListToJsonObj");

      if(typeof colonList != "string") {
         console.warn("Could not convert colon list: ", colonList.slice(0,15));
         return returnObj;
      }

      // Skip the header
      if(hasHeader === true || /\r?\n/.test(listDividers[0])){
         iter++;
      }

      for (iter; iter < infoAry.length; iter+=2) {
         // if(infoAry[iter] == "DOB" || infoAry[iter] == "Date of Birth" || infoAry[iter] == "Birth Date"){
         //    returnObj.dob =infoAry[iter+1];
         // } else if(infoAry[iter] == "MBI" || infoAry[iter] == "MBI Number"){
         //    returnObj.mbi =infoAry[iter+1];
         // } else {
            returnObj[infoAry[iter]]=infoAry[iter+1];
         // }
         if(logStuff) {
            console.log(">>",infoAry[iter],infoAry[iter+1]);
         }
      }
      return returnObj;
   }

   /* Function firstCommentPreProcessing
      Puts new lines into the first comment from an RFI, so that it can be processed by convertColonListToJsonObj
      */
   function firstCommentPreProcessing(copiedText="") {
      var terms = /(Customer Name|DOB|Agent Name|Agent W.*\/SAN|Agent.*?ID|Medicare ID|Sub Date|Eff Date|Due Date|Case.*?United\*\)|Policy.*ID|Reason)\s*:\s*/g,
          dateFix = /(\d\d\d\d)-(\d\d)-(\d\d)/g;
      return copiedText.replaceAll(terms,"\n$1:").replaceAll(dateFix,"$2/$3/$1");
   }

   /* Function getObjFromCopiedText
      Also calls standardizeCuInfo, which is specific to cu info, 
      but I'm including it b/c it's simpler than knowing you have 
      to always pair the two fn's.
      CALLS standardizeCuInfo TO STANDARDIZE THE INPUT FOR MCD LOOKUPS
      */
   function getObjFromCopiedText(copiedText="", hasHeaderOrHeaderString=false) {
      var data;
      try {
         data = JSON.parse(copiedText);
      } catch(error) {
         if(/DOB: ?[\d-]+ Agent Name/.test(copiedText)){
            data = convertColonListToJsonObj(firstCommentPreProcessing(copiedText), true);
         } else if(typeof hasHeaderOrHeaderString == "boolean") {
            data = convertColonListToJsonObj(copiedText, hasHeaderOrHeaderString);
         } else {
            data = convertColonListToJsonObj(copiedText, copiedText.search(hasHeaderOrHeaderString) >= 0);
         }
      }

      return standardizeCuInfo(data);
   }

   /* Function standardizeCuInfo
      Takes cu input from wherever I have copied it, in whatever format,
      and standardizes the data names.
      */
   function standardizeCuInfo(cuInfoObj) {
      var newCuInfoObj = cuInfoObj, namePartsFirst, namePartsSecond;

      newCuInfoObj.state = (cuInfoObj.state || cuInfoObj.State);
      if(newCuInfoObj.state == undefined || newCuInfoObj.state == "") {
         stateFromAddr = (cuInfoObj["Cust Addr"] || "").match(/.* ([A-Z][A-Z]) \d{5}/)
         newCuInfoObj.state = stateFromAddr != null && stateFromAddr.length >= 0 ? stateFromAddr[1].toUpperCase() : "";
      } 
      
      newCuInfoObj.dob = cuInfoObj.dob || cuInfoObj.DOB || cuInfoObj["Date of Birth"] || cuInfoObj["Birth Date"] || "";
      newCuInfoObj.sex = cuInfoObj.sex || cuInfoObj.Gender || "";
      newCuInfoObj.mbi = cuInfoObj.mbi || cuInfoObj["Medicare ID"] || cuInfoObj["MBI Number"] || cuInfoObj.MBI || "";
      newCuInfoObj.mcdId = (cuInfoObj.mcdId || cuInfoObj["Medicaid ID"] || "").split(" / ")[0];
      if(newCuInfoObj.mcdId == "-") {
         newCuInfoObj.mcdId = "";
      }

      nameParts = (cuInfoObj["Customer Name"] || cuInfoObj["Cust Name"] || cuInfoObj["Cu Name"] || "").match(/([a-z]+( [a-z]+)?)( [a-z]\.?)? ([a-z]+( [a-z]+)?)/i);
      if(nameParts != null) {
         namePartsFirst = nameParts[1];
         namePartsSecond = nameParts[4];
      }
      newCuInfoObj.firstName = cuInfoObj.firstName || namePartsFirst || "";
      newCuInfoObj.lastName = cuInfoObj.lastName || namePartsSecond || "";

     return newCuInfoObj;
   }


/*** UTILITY ***/

   /* Function debounceFn
      Debounces a fn */
   function debounce(func, delay=0, timing={'leading': false,'trailing': true}) {
      console.log("debounce called with delay ", delay, " for ",func.name);
      let debounceTimer;

      if(timing.trailing) {
         return function () {
             const context = this
             const args = arguments
             clearTimeout(debounceTimer)
             debounceTimer = setTimeout(() => func.apply(context, args), delay)
         }
      } else {
        return function debouncedFn() {
          const context = this
          const args = arguments
          if (Date.now() - debounceTimer > delay) {
            func.apply(context, args);
          }
          debounceTimer = Date.now();
        };
      }
   }

   /* Function setUpKeyboardShortcuts
      Sets up the keyboard listeners to the page */
   function setUpKeyboardShortcuts() {
      document.addEventListener("keyup", initiateSearch);      // CTRL + Enter // b/c it's a common submit shortcut
      document.addEventListener("keyup", pasteInSearchInfo);   // CTRL + SHIFT + V // V b/c it's paste
      document.addEventListener("keyup", copyMcdId);           // CTRL + SHIFT + X // X b/c it's copy (I know)
      console.warn(">> set up shortcuts");
   }

   /* Function removeKeyboardShortcuts
      Sets up the keyboard listeners to the page */
   function removeKeyboardShortcuts() {
      document.removeEventListener("keyup", initiateSearch);
      document.removeEventListener("keyup", pasteInSearchInfo);
      document.removeEventListener("keyup", copyMcdId);
      console.log(">> removed shortcuts");
   }

   var mutatorArray = [];
   /* Function setUpMutators
      Sets up the mutators on the page */
   function setUpMutators() {
      mutatorArray.push(setUpAutoCopyMcdID());
   }

   /* Function removeMutators
      Remove the mutators on the page */
   function removeMutators() {
      mutatorArray.map((muta) => {
         muta.disconnect();
      });
   }

   /* Function unload
      Removes the keyboard listeners from the page */
   function unload() {
      removeKeyboardShortcuts();
      removeMutators();
      removeFakeMbiCheckbox();
      removeMessageEl();
      ae.ranSetup = false;
   }

   /* Function hideMailingStateDiv
      Hides the Mailing state div */
   function hideMailingStateDiv() {
      var checkBoxEl = $('.page-wrapper ion-row.md.hydrated:nth-child(4)')[0];
      $(checkBoxEl).addClass('hide-me');

      addCssEl(`
         .hide-me {
            display:none;
         }`);
   }

   /* Function getSubmitBtn
      Returns the submit button */
   function getSubmitBtn(evt) {
      return $('.submitButton');
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
      var el = getFirstNameField();

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
      var el = getLastNameField();

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
      var moddedVal, el = getDOBField();

      if(!/(\d\d?[\/\.\-]\d\d?[\/\.\-](\d{4}))/.test(val)){
         moddedVal = val.replaceAll(/[\.\-]/g,"/")
                        .replace(/^(\d\d?\/\d\d?\/)(\d\d)$/,"$119$2");
      } else {
         moddedVal = val;
      }

      el.val(moddedVal);
      el[0].dispatchEvent(new Event('input'));

      return getDOBField().val() == moddedVal;
   }

   // MBI //
   /* Function getMBIField
      Gets the First Name field */
   function getMBIField() {
      return $('#mat-input-3');
   }

   /* Function setMBIField
      Sets the First Name field */
   function setMBIField(val="") {
      var el = getMBIField(),
          modifiedVal;

      if(val != "") {
         modifiedVal = val.toUpperCase().replaceAll(/\-| /g,"");
      } else if(useFakeMBI == true) {
         modifiedVal = "1AC2DE4FG56";
      }

      el.val(modifiedVal);
      el[0].dispatchEvent(new Event('input'));

      return getMBIField().val() == modifiedVal;
   }

   // GENDER //
   /* Function getGenderField
      Gets the First Name field */
   function getGenderField() {
      var el = $($('.mat-mdc-select-min-line.ng-star-inserted')[0]);
      el.val = function(){
         return this[0].innerHTML;
      }

      return el;
   }

   /* Function setGenderField
      Sets the First Name field */
   function setGenderField(val) {   // TODO: How to figure out how to get this set to ""
      if(typeof val != "string") {
         return;
      }

      if(val.toUpperCase() == "M" ){
         val = "Male";
      } else if(val.toUpperCase() == "F" ){
         val = "Female";
      }

      selectEl = $('mat-form-field mat-select')[0];
      selectEl.click();
      optionEl = $('.cdk-overlay-container span:contains("'+val+'")');
      optionEl.click();

   }

   // MEDICAID ID //
   /* Function getMedicaidIDField
      Gets the medicaid id field */
   function getMedicaidIDField() {
      return $('#mat-input-4');
   }

   /* Function setMedicaidIDField
      Sets the medicaid id field */
   function setMedicaidIDField(val, alt, state) {
      var el = getMedicaidIDField();

      if(val == "" || typeof val == undefined) {
         if(typeof alt == "string") {
            newVal = alt.replaceAll(/\-/g,"");
         } else {
            // called w/empty string or undefined info
            newVal = "";
         }
      } else {
         newVal = val;

         if(state != undefined) {
            if(!stateDB.isValidMcdNum(state, newVal)) {
               sendMessage("Mcd ID does not match format: \n"+stateDB.getStateInfo(state).mcdIdFormat, 
                  MESSAGE_TYPE.WARNING, 4000);
            }
         }
      }
      
      el.val(newVal);
      el[0].dispatchEvent(new Event('input'));

      return getMedicaidIDField().val() == newVal;
   }

   // SSN //
   /* Function getSSNField
      Gets the SSN field */
   function getSSNField() {
      return $('#mat-input-5');
   }

   /* Function setSSNField
      Sets the SSN field */
   function setSSNField(val) {
      var el = getSSNField()

      el.val(val);
      el[0].dispatchEvent(new Event('input'));

      return getSSNField().val() == val;
   }

   // State //
   /* Function getStateField
      Gets the State field */
   function getStateField() {
      var el = $($('.mat-mdc-select-min-line.ng-star-inserted')[1]);
      el.val = function(){
         return this[0].innerHTML;
      }

      return el;
   }

   /* Function setStateField
      Sets the First Name field */
   function setStateField(val) {
      if(typeof val != "string" || !allowedStatesDB.isStateAllowed(val)) {
         return;
      }

      if(stateDB.getStateInfo(val).ltcWaiver == "x"){
         sendMessage("State uses an LTC waiver", MESSAGE_TYPE.WARNING, 60000);
      }

      selectEl = $('mat-form-field mat-select')[1];
      selectEl.click();
      optionEl = $('.cdk-overlay-container span:contains("'+val+'")');
      optionEl.click();

      return getStateField().val() == val;
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
   debouncedInitiateSearch = debounce(()=> {
      console.log(">> 3 ran initiateSearch");
      var submitButton = getSubmitBtn();
      if(submitButton != null) {    
         submitButton.click();
      }
   },3000,{leading:true});

   /* Function initiateSearch
      Triggers the search */
   function initiateSearch(evt) {
      // CTRL + Enter // b/c it's a common submit shortcut
      if (evt.ctrlKey && evt.which == 13) {
         console.log("ran initiateSearch");
         debouncedInitiateSearch();
      }
   }


/*** CLEAR FORM ***/

   /* Function clearForm
      Empties the search form */
   // function clearFormShortcut(evt) {
   //    // CTRL + Enter // b/c it's a common submit shortcut
   //    if (evt.ctrlKey && evt.which == 13) {
   //       clearForm();
   //    }
   // }

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

      // TODO: Add to the dom

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
      addCssEl(cssText, "clear_form_css");
   }


/*** FAKE MBI BUTTON ***/

   var useFakeMBI = true;

   /* Function addFakeMbiCheckbox
      Empties the search form */
   function addFakeMbiCheckbox() {
      // TODO: add the check so it doesn't duplicate
      // if(getFakeMbiCheckbox() != null) return;

      var ionItemEl = $("ion-grid ion-row:nth-child(6) ion-item");

      // Make the label 
      const fakeMbiLabel = document.createElement('label');
      fakeMbiLabel.innerHTML = 'Use Fake MBI on Paste:';
      fakeMbiLabel.htmlFor="fake_MBI_checkbox"
      fakeMbiLabel.classList.add("fake-mbi-label");

      // Make the checkbox 
      const fakeMbiCheckbox = document.createElement('input');
      fakeMbiCheckbox.type='checkbox';
      fakeMbiCheckbox.id="fake_MBI_checkbox";
      fakeMbiCheckbox.checked=true;
      fakeMbiCheckbox.classList.add("fake-mbi-checkbox");
      fakeMbiCheckbox.onchange = (evt) => {useFakeMBI = evt.target.checked};

      // Make the CSS
      const cssText = `
         .fake-mbi-label {
            padding-top: 5px;
         }
         .fake-mbi-checkbox {
            width: 28px;
            height: 15px;
         }`;

      // Insert into page
      cssEl = addCssEl(cssText);
      cssEl.id = "fake_mbi_css";

      ionItemEl.append(fakeMbiLabel, fakeMbiCheckbox);
   }

   /* Function removeFakeMbiCheckbox
      Removes the elements */
   function removeFakeMbiCheckbox() {
      $(".fake-mbi-label")[0].remove();
      $(".fake-mbi-checkbox")[0].remove();
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
               var cuInfoObj = getObjFromCopiedText(clipText), 
                   fillSuccessful;

               /// THIS v SHOLD WORK IN standardizeCuInfo

               //Translations from 
               // cuInfoObj.state = cuInfoObj.state || cuInfoObj.State;
               // cuInfoObj.dob = cuInfoObj.dob || cuInfoObj.DOB;
               // cuInfoObj.sex = cuInfoObj.sex || cuInfoObj.Gender;

               // TODO: Make this work w/first & last name
               // cuInfoObj.sex = cuInfoObj.sex || cuInfoObj.Gender;
               // cuInfoObj.sex = cuInfoObj.sex || cuInfoObj.Gender;

               // cuInfoObj.state = cuInfoObj.state.toUpperCase(); /// needed?

               clearForm();
               fillSuccessful = fillFields(cuInfoObj);
               if(fillSuccessful) submitIfComplete();
            });
      }

   }

   /* Function fillFields
      Adds info from data object provided to every field */
   function fillFields(data) {
      if(typeof data != "object") {
         console.warn("Could not fill fields. Data is not an object");
         return false;
      }

      if(data.state != "" && data.state != undefined) {
         if(!allowedStatesDB.isStateAllowed(data.state)) {
            sendMessage("State not availble in ThinkAgent", MESSAGE_TYPE.WARNING, 3500);
            return false;
         }

         setStateField(data.state);
      }

      if(data.firstName != "" && data.firstName != undefined) {
         setFirstNameField(data.firstName);
      }
      
      if(data.lastName != "" && data.lastName != undefined) {
         setLastNameField(data.lastName);
      }
      
      if(data.dob != "" && data.dob != undefined) { 
         setDOBField(data.dob);
      }
      
      if(data.sex != "" && data.sex != undefined) {
         setGenderField(data.sex);
      }
      
      if(data.mbi != "" && data.mbi != undefined) {
         setMBIField(data.mbi);
      }
      
      if((data.mcdId != "" || data.ssn != "") && (data.mcdId != undefined || data.ssn != undefined)) {
         setMedicaidIDField(data.mcdId, data.ssn, data.state);
      }
      
      if(data.ssn != "" && data.ssn != undefined) {
         setSSNField(data.ssn.replaceAll(/\-/g,""));
      }

      return true;
   }

   /*** SUBMIT IF COMPLETE ***/

   /* Function formIsComplete
      Checks if all required fields have been filled, and if so, it submits the search */
   function formIsComplete() {
      var isValid = false,
          firstName = getFirstNameField().val(),
          lastName  = getLastNameField().val(),
          dob = getDOBField().val(),
          mbi = getMBIField().val(),
          gender = getGenderField().val(),
          state = getStateField().val(),
          mcdId = getMedicaidIDField().val(),
          ssn = getSSNField().val();

      // these are the states that require Mcd/SSN
      if("NY|WV|CT".search(state) > -1){
         if(mcdId == "" && ssn == "") {
            console.log("Auto submit failed -- SSN/mcdId");
            return false;
         }
      }

      isValid = firstName != "" && lastName != "" && dob != "" && mbi != "" 
               && (gender != "" && gender   != "Select Gender") 
               && (state  != "" && state    != "Select State" );

      console.log("Auto submit " + (isValid ? "succeeded" : "failed"), 
         "firstName", firstName != "", "lastName", lastName != "", "dob", dob != "", "mbi", mbi != "",
         "gender",   (gender != "" && gender != "Select Gender"),
         "state",    (state  != "" && state  != "Select State" ));

      return isValid;
   }

   /* Function submitIfComplete
      Checks if all required fields have been filled, and if so, it submits the search */
   function submitIfComplete() {
      console.log(">> 1 attempted submit");
      if(formIsComplete()) {
         // todo: fix this. Something's weird
         console.log(">> 2 attempted debounced initiateSearch", debouncedInitiateSearch, "<< fn");
         debouncedInitiateSearch();
      }
   }


/*** KEYBOARD SHORTCUTS ***/

  /** COPY MCD ID **/

   /* Function copyMcdId
      Copies the medicaid id from the page */
   function getMcdIdFromPage() {
      var parentEl = $(".ng-star-inserted.md.hydrated");
      
      if(parentEl.length != 0) {
         mcdId = parentEl[2].children[2].children[0].innerHTML;
         copyStringToClipboard(mcdId);
      }      
   }

   /* Function copyMcdId
      Copies the medicaid id from the page */
   function copyMcdId(evt) {
      // CTRL + SHIFT + X // x b/c it's like copy
      if (evt.ctrlKey && evt.shiftKey && evt.which == 88) {
         getMcdIdFromPage();
      }
   }

   /* Function setUpAutoCopyMcdID
      Copies the mcd id, once the search is done--determined by the mask div disappearing */
   function setUpAutoCopyMcdID() {
      var watchFn = function (mutaRecordAry) {
            // if the "searching" screen has  disappeared
            if(mutaRecordAry[0].removedNodes.length>0) {
               getMcdIdFromPage();
            }
          }
          el = $("ion-app"),
          config = {childList:true},
          muta = new MutationObserver(watchFn);

      muta.observe(el[0], config);

      return muta;
   }


/*** FAKE MBI BUTTON ***/
   MESSAGE_TYPE = {}
   MESSAGE_TYPE.WARNING = "warning";
   MESSAGE_TYPE.SUCCESS = "success";
   MESSAGE_TYPE.NOTICE = "notice";

   /* Function getMessageEl */
   function getMessageEl() {
      return $('.message').get(0);
   }

   /* Function addMessageEl
      Adds the el used for messages */
   function addMessageEl() {
      if(getMessageEl() != undefined) return;

      var ionRowEl = $("ion-grid ion-row:nth-child(3)").get(0);

      // Make the parent ion-col 
      const parentEl = document.createElement('ion-col');

      // Message containing div
      const containerDiv = document.createElement('div');
      containerDiv.classList.add("message-wrap");

      // Make the message div 
      const messageDiv = document.createElement('div');
      messageDiv.classList.add("message","first");

      // Make the CSS
      const cssText = `
         /* .hide-me {
            // defined above
         } */ 
         .message.warning {
            color: #4b4b4b;
            background-color: #ffc409;
         }
         .message.notice {
            color: #4b4b4b;
            background-color: yellow;
         }
         .message.success {
            color: white;
            background-color: green;
         }
         .message {
            width: 70%;
            margin-left: 15%;
            padding: 5px 2px 1px 2px;
            border-radius: 8px;
         }
         .message-wrap {
            margin-top: 15px;
            width: 100%;
            text-align: center;
         }`;

      // Insert into page
      cssEl = addCssEl(cssText);
      cssEl.id = "message_css";

      containerDiv.append(messageDiv);
      parentEl.append(containerDiv);
      ionRowEl.append(parentEl);
   }

   /* Function sendMessage
      Changes the message text and unhides the message for a certain span of time */
   function sendMessage(msg="Default message", msgClass=MESSAGE_TYPE.WARNING, secondsVisible=3000) {
      var messageEl = getMessageEl();

      messageEl.innerHTML = msg;
      messageEl.classList.remove("hide-me");
      messageEl.classList.add(msgClass);
      setTimeout(() => {
         messageEl.classList.add("hide-me");
         messageEl.classList.remove(msgClass);  
      }, secondsVisible);
   }

   /* Function clearMessage
      Changes the message text and unhides the message for a certain span of time */
   function clearMessage() {
      var messageEl = getMessageEl();

      messageEl.classList.add("hide-me");
      messageEl.classList.remove(MESSAGE_TYPE.WARNING, MESSAGE_TYPE.NOTICE, MESSAGE_TYPE.SUCCESS);  
   }

   /* Function removeMessageEl
      Removes the elements */
   function removeMessageEl() {
      var messageEl = getMessageEl();

      if(messageEl != undefined) {
         messageEl.parentElement.parentElement.remove();
      }
   }


/*************
* LOGIC
**************/
var firstBtn = $('.ta-btn.btn-red.button');
var secondBtn = $('.primary-regular-button.mx-auto.d-block');
if(firstBtn.length != 0) {
   firstBtn.click();
} else if(secondBtn.length != 0) {
   secondBtn.click();
   // set timeout and nav to https://app.thinkagent.com/home-tabs/tabs/medicaid-eligibility  ?
} else {
   if(typeof ae == "undefined") {
      window.ae = {
         ranSetup: false
      };
      hideMailingStateDiv();
   }
   if(ae.ranSetup != true) {
      setUpKeyboardShortcuts();
      setUpMutators();
      // Set up additional els
      addFakeMbiCheckbox();
      addMessageEl();

      ae.ranSetup = true;
      ae.unload = unload;
      ae.alreadyPresent = alreadyPresent;
      ae.mydebug = mydebug;

      console.log(">> Inserted AE logic");
   } else {
      ae.alreadyPresent();
   }
}
