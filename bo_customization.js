//~~~~ BO CUSTOMIZATION ~~~~//
// https://www.brokeroffice.com/leads/leadViewEdit.jsp?subscriber_id=55432&lead_id=118181466#

/* TODO: 

   /**  1  WORKING ON **
   // TODO: BO CT+SH+X PULLING WRONG INFO ON https://www.brokeroffice.com/leads/leadViewEdit.jsp?lead_id=121679558
   // TODO: BO CT+SH+X PULLING WRONG INFO ON https://www.brokeroffice.com/leads/leadViewEdit.jsp?lead_id=126980663
   // TODO: BO CT+SH+X PULLING WRONG INFO ON https://www.brokeroffice.com/leads/leadViewEdit.jsp?lead_id=133872433
   // TODO: Consider "Transfer to Tier 2" followed by "App submitted"
   // TODO: Picked up the people wrong: https://www.brokeroffice.com/leads/leadViewEdit.jsp?lead_id=130907103#plans1
   // TODO: How to handle AEP apps. Mult Ctrl X, w/a toast that shows which one's being copied?
   // TODO: Row stripe comm history
   // TODO: Highlight sub date calls in comm history
            // https://www.brokeroffice.com/leads/leadViewEdit.jsp?lead_id=100921491#plans0
   // TODO: Fix this one pulling agent name as T2 and T3
            // https://www.brokeroffice.com/leads/leadViewEdit.jsp?lead_id=100921491#plans0

   /**  2  PRIORITY   **
   // TODO: Highlight the dates called on the PIP in the Com Hist on insert
      // - Get list of PIP's
      // - Get list of full Comm lines, color them (only based on agent?)
      // - Gradient in blue? Or green? Or Orange? Transfer - Tier 2 > DTC > Application Submitted
      // - Highlight the ones that have the same date as the app date?
   // TODO: Paste into BO > Sets only blanks: address (PO box is second), birth date, sex, zip, city, state, 
   // TODO: Create a "Dr." highlighter for notes (light green) (C + S + H)
   // TODO: C + S + E = start note, Ctrl/Enter submits, Esc closes
   // TODO: Make it so that the Plan name is taken from the Title and put as the innerHTML

   /**  3  BACKLOG    **
   // TODO: Pipe dream--create page that wraps BO in an iframe, so I can keep my shortcuts/apply them auto on refresh
      //TODO: Make it so the bol search calls that page
      //TODO: Make it so the Start of Day shortcut works w/it
   // TODO: make tooltip that will show newlines
      // TODO: figure out how to get content w/new lines in it
      // TODO: add CSS styling
   // TODO: shortcut to add note
   // TODO: shortcut to submit note
   // TODO: Shortcut to add new PIP
      // TODO: Have it add default values

 /** DONE: **/
   // TODO: Allowed for getting PDP PIP's
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

/*************
* FUNCTIONS
**************/

/*** LIBRARY ***/

   /* Function alreadyPresent
      Alerts that the code already exists */
   function alreadyPresent() {
      console.warn(">> BO code already present");
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
   
   //// ADD ELS ////

   /*  Function addCssEl
      Adds the passed in CSS text to the document body */
   function addCssEl(cssText, doc) {
      const css_el = doc.createElement("style");

      if (cssText!=null) {
         css_el.textContent = cssText;
         doc.head.appendChild(css_el);
      }
      
      return css_el;
   }

   /*  Function addJsScript
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

   //// MISC ////

   /* Function getCurrentTimestamp
      Returns a string of the current timestamp */
   function getCurrentTimestamp() {
      return new Date().toLocaleString('en-us',{hour:'numeric',minute:'numeric',second:'numeric'});
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

   /* Function debounce
      Debounces a fn */
   function debounce(callback, wait=0, timing={'leading': false,'trailing': true}) {
      console.log("debounce called with wait ", wait, " for ",callback.name);
      let debounceTimer = Date.now();

      if(timing.trailing) {
         return function debouncedFn() {
            const context = this
            const args = arguments
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => {
               callback.apply(context, args)
            }, wait)
         }
      } else { // leading
         return function debouncedFn() {
            const context = this
            const args = arguments
            if (Date.now() - debounceTimer > wait) {
               callback.apply(context, args);
            }
            debounceTimer = Date.now();
         };
      }
   }
   
   /* Function fnLogger
      Pre-made logger for when I'm trying to figure out what a fn that takes a fn does */
   function fnLogger(a,b,c) {
      console.log(a,b,c);
   }

   /* Function standardizeFullDateString
      Takes in 4-8 numbers, w/ or w/out delimiters. Requires 19XX or 20XX. 
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
   function convertColonListToJsonObj(colonList, hasHeader) {
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
      if(hasHeader === true || !/^.*:.*\r?\n/.test(colonList)){ // /\r?\n/.test(listDividers[0])){
         iter++;
      }

      for (iter; iter < infoAry.length; iter+=2) {
        returnObj[infoAry[iter]]=infoAry[iter+1];
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
   function getObjFromCopiedText(copiedText="", hasHeaderOrHeaderString) {
      var data;
      try {
         data = JSON.parse(copiedText);
      } catch(error) {
         if(/DOB: ?[\d-]+ Agent Name/.test(copiedText)){
            data = convertColonListToJsonObj(firstCommentPreProcessing(copiedText), true);
         } else if(typeof hasHeaderOrHeaderString == "boolean" || typeof hasHeaderOrHeaderString == "undefined") {
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

      newCuInfoObj.state = (cuInfoObj.state || cuInfoObj.State)
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
   jq = mtjQuery;

   /* Function setUpKeyboardShortcuts
      Sets up the keyboard listeners to the page */
   function setUpKeyboardShortcuts() {
      document.addEventListener("keyup", copyAppInfo);         // CTRL + SHIFT + X // X b/c it's like copy
      document.addEventListener("keyup", pasteInCustInfo);   // CTRL + SHIFT + V // V b/c it's paste
      console.log("set up shortcuts");
   }

   /* Function unload
      Removes the keyboard listeners from the page */
   function unload() {
      document.removeEventListener("keyup", copyAppInfo);
      document.removeEventListener("keyup", pasteInCustInfo);
      console.log("removed shortcuts");
      bo.ranSetup = false;
   }

   /* Function loadPlanInfoTab
      TODO: Make this a promise....
      Checks to see if the submitting agent is a T3 */
   function loadPlanInfoTab() {
      if(window.pipLoaded != true) {
         window.pipLoaded = true;
         var targetTab = $$('#planInfoTab')[0]; 
         var activeTab = $$('.activeTab')[0];
         targetTab.click();
         activeTab.click();
         console.log(">> Loaded PIP");
      }
   }

   /* Function scrollPlanInfoIntoView
      Scrolls the cu's info page into view */
   function scrollPlanInfoIntoView() {
      var messagesDiv = $$(".lead-guidance-message-wrapper")[0],
          planInfoParentDiv = $$("#form1")[0];
      (messagesDiv || planInfoParentDiv).scrollIntoView(true);
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
   //    //get through "target?"
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

   // TODO: Use this to grab when the Comm History loads, and pull the info from there.
   // https://gist.github.com/benjamingr/0433b52559ad61f6746be786525e97e8
   // After you've gotten the comm history, though, drop the listener?

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
      /* T2 Agent:   Mitsuko Martindale
         T3 Agent:   LaWanda Wells
         Plan: Anthem Dual Advantage (HMO D-SNP) H3447-030-0
         SEP:  AEP
         Sub Date:   10/31/2023
         Eff Date:   01/01/2024
         Alt Address:   - 
      */

      loadPlanInfoTab();

      /* Could also use:
         $$('#appInfoContainer div:contains("Off-Exchange")');
         I don't remember why I didn't/changed it from this
      */
      if(bo.mydebug.isDB()) {
         console.warn(">> debug: at getMostRecentSalePip");
      }

      var salePIP = $$('#appInfoContainer div:contains("Medicare Advantage")');
      if(salePIP[0] == undefined) {
         salePIP = $$('#appInfoContainer div:contains("Part D")');

         if(salePIP[0] == undefined) {         
            console.warn("Could not find sale PIP");
            return undefined;
         }
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

      loadPlanInfoTab();

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

      /* T3 if....
         DTC pip
         Comm Hist has a DTC record for the date of the PIP
            // get sales PIP
            // check for date
         Two PIP's, same date, both have App Sub'd

         TODO:Look at these examples-
         https://www.brokeroffice.com/leads/leadViewEdit.jsp?lead_id=113797963#plans0
      */

      var dtcPIP = getMostRecentDtcPip(),
          pip, subDate, callRecordAry;

      loadCommHistTab();

      if(dtcPIP != undefined) {
         this.result = true;
      } else {
         pip = getMostRecentSalePip(),
         subDate = getSubDatePadded(pip);
         callRecordAry = getCallRecordsFromCommHistory(subDate);
         callRecordAry = callRecordAry.filter((el) => {
            return el.children[5].innerHTML == "DTC Transfer";
         });

         if(callRecordAry.length !=0) {
            this.result = true;
         } else {
            // if the T2 agent dispo'd as "App Sub"
            callRecordAry = callRecordAry.filter((el) => {
               return el.children[5].innerHTML == "Application Submitted"
                  ||  el.children[5].innerHTML == "Transfer - Tier 2";
            });

            if(callRecordAry.length == 3) {
               this.result = true;
            } else {
               this.result = false;
            }
         }
      }

      return this.result;
   }


   /* Function loadCommHistTab
      TODO: Make this a promise....
      Checks to see if the submitting agent is a T3 */
   function loadCommHistTab() {
      if(window.commHistLoaded != true) {
         window.commHistLoaded = true;
         var commHistTab = $$('#communicationHistoryTab')[0]
         var activeTab = $$('.activeTab')[0];
         commHistTab.click();
         activeTab.click();
         console.log(">> Loaded Comm History Tab");
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

      /* The case of Charlie
         "Transferred to Charlie" needs more investigation. This one (135098891) was 
         only w/T3 for only a few minutes, as was this one 135371180. In both cases, 
         the T2 put "DTC transfer" as the status. So that might mean DTC Trasf has 
         multiple statuses.
      */

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
      Gets the the sale date from a PIP */
   function getSubDate(pip) {
      if (pip == undefined) 
         return null;

      var subDate = pip.querySelector('div[data-testid="date-created"]').innerHTML;
      
      return subDate.replace(/([\d\/]+) (.*)/,"$1");
   }

   /* Function getSubDatePadded
      Gets the T2 Agent's Name from the sale PIP, padded w/0's */
   function getSubDatePadded(pip) {
      var subDate = getSubDate(pip);
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

   /* Function getCallRecordsFromCommHistory
      Gets the username from the Comm history tab */
   function getCallRecordsFromCommHistory(targetDate) {
      loadCommHistTab();

      var options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          }

      paddedDate = new Date(targetDate).toLocaleString("en-US",options);

      return $$('#lead-communication tr:contains('+paddedDate+')');
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
      var t3Name, t2Name, callRecordAry,
          pip = getMostRecentSalePip(),
          subDate = getSubDatePadded(pip);

      loadCommHistTab();

      // find every entry matching the sub date, filter out unimportant
      callRecordAry = getCallRecordsFromCommHistory(subDate);
      callRecordAry = callRecordAry.filter((el) => {
         console.log(el.children[5]);
         return el.children[5].innerHTML == "Application Submitted" 
             || el.children[5].innerHTML == "Transfered to Charlie" // TODO: Test this - https://www.brokeroffice.com/leads/leadViewEdit.jsp?lead_id=135371180#plans
             || el.children[5].innerHTML == "DTC Transfer"
             || el.children[5].innerHTML == "Transfer - Tier 2";
      });

      if(callRecordAry.length == 0) {
         // 0 - Not sure
         alert("No call record found for sub date");
         t2Name = "-";

      } else if(callRecordAry.length == 1) {
         // 1 - If only 1 record, probably "App Sub", which means T3 only? Trans from VConnect, etc
         alert("Check comm history. Only one record");
         t2Name = "-";

      } else if(callRecordAry.length <= 3) {
         // 2 - Most likely a T2/T3 pair
         if(callRecordAry[1].children[5].innerHTML == "DTC Transfer") {
            // 2.1 - DTC transfer is a dead give-away that it's the T2
            t2Name = callRecordAry[1].children[3].innerHTML;

         } else if(callRecordAry[0].children[5].innerHTML == "DTC Transfer") {
            t2Name = callRecordAry[0].children[3].innerHTML;

         } else if(callRecordAry[0].children[5].innerHTML == "Application Submitted"
                && callRecordAry[1].children[5].innerHTML == "Application Submitted") {
            // T2 agent dispo'd as "App Sub" instead of "DTC Trans".
            // Since there's only one PIP, grab the T3 name, so you know which 
            // of the two Comm records is from the T2.
            t3Name = getAORsNameFromPIP(getMostRecentSalePip());
            t3UserNameIsh = t3Name.toLowerCase().replace(/([a-z])([a-z]+ )([a-z]+)/,"$1$3");

            if(callRecordAry[0].children[3].innerHTML.search(t3UserNameIsh) == 0){
               t2Name = callRecordAry[1].children[3].innerHTML;
            } else {
               t2Name = callRecordAry[0].children[3].innerHTML;
            }

         } else if(callRecordAry[0].children[5].innerHTML == "Application Submitted"
                && callRecordAry[1].children[5].innerHTML == "Transfer - Tier 2") {
            // we only have to worry about this case, since if there's a DTC, 
            // the case will be handled above.
            t2Name = callRecordAry[0].children[3].innerHTML;
         } else {
            alert("Something went wrong");
            console.warn("Something went wrong");
            t2Name = "-";
         }

      } else if(callRecordAry.length > 3) {
         // 4+- uh...not sure
         alert("Check comm history. More than two records for sub date");
         t2Name = "-";
      }
      
      return t2Name;
   }


   //// ADDR STUFF ////

      // /* Function getCuInfoPg
      //    Gets the cu's info page */
      // function getCuInfoPg() {
      //    return $$('#contact-info-2')[0];
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

      /* Function getCity */
      function getCity() {
         return $$('#address_1_city')[0].innerHTML;
      }
      /* Function getState */
      function getState() {
         return $$('#address_1_state')[0].innerHTML;
      }
      /* Function getZip */
      function getZip() {
         return $$('#address_1_zip')[0].innerHTML;
      }

      /* Function getAltAddr */
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

         copyStringToClipboard(getAppInfo());

         return;
      }
   }

   /* Function getAppInfo
      Gets the app info into a string that is easily copyable */
   function getAppInfo(){
      var returnStr = 
            "Lead Id:\t"+getLeadIdField().val()+"\n"+
            "Cu Name:\t"+getFirstNameField().val()+" "+getLastNameField().val()+"\n"+
            "T2 Agent:\t"+getT2AgentName()+"\n"+
            "T3 Agent:\t"+getT3AgentName()+"\n"+
            "Plan:\t"+getPlanData()+"\n"+
            "SEP:\t"+getSep()+"\n"+
            "Sub Date:\t"+getSubDate(getMostRecentSalePip())+"\n"+
            "Eff Date:\t"+getEffDate()+"\n"+
            "Alt Address:\t"+getAltAddr();

      return returnStr;
   }


/*** PASTE SEARCH INFO ***/

   /* Function pasteInCustInfo
      Takes the info copied from ZD and pastes it into the correct fields */
   function pasteInCustInfo(evt) {
      // CTRL + SHIFT + V // V b/c it's paste
      if (evt.ctrlKey && evt.shiftKey && evt.which == 86) {
         console.log(">> ran pasteInCustInfo");
         navigator.clipboard
            .readText()
            .then((clipText) => {
               var cuInfoObj = getObjFromCopiedText(clipText);

               fillFields(cuInfoObj);
            });
      }
   }

   /* NOTES:
      leadViewEditEIP.js > saveChanges


      TODo: this does not work vvvv
   */

   // saveChanges = new Function(["obj"],saveChanges.toString().slice(27,saveChanges.toString().length-1)+"console.log('I inserted!');");

   function insertOverOtherFn(fnName, message, paramsAry=[]) {
      var stringified = eval(fnName).toString(), 
          firstCurly = stringified.toString().search("{")+1,
          newFnBody = stringified.slice(firstCurly,stringified.length-1);
          console.log("new fn body", newFnBody+"; console.log('"+message.replaceAll("'","\\'")+"');");
      return new Function(paramsAry,newFnBody+"; console.log('"+message.replaceAll("'","\\'")+"');");
   }

   /* Function fillFields
      Adds info from data object provided to every field */
   function fillFields(data) {
      if(typeof data != "object") {
         console.warn(">> Could not fill fields. Data is not an object");
         return false;
      }
      console.log("filling fields");

      var counter = 0;


      // new Promise((resolve, reject) => { console.log(">> filling fields: ", data); resolve(); })
            // .then(() => {
               if(data.lastName != "" && data.lastName != undefined) {
                  setTimeout((data) => {
                     setLastNameField(data.lastName);
                     console.log("filling lastName")
                  }, initial + counter++ * delta, data);

                  console.log("filling lastName", initial + counter * delta);
               }
               if(data.firstName != "" && data.firstName != undefined) {
                  setTimeout((data) => {
                     setFirstNameField(data.firstName);
                     console.log("filling firstName")
                  }, initial + counter++ * delta, data);
                  console.log("filling firstName", initial + counter * delta);
               }
            // })      
            // .then(() => {
            // })
            // .then(() => {
               if(data.fullName != "" && data.fullName != undefined) {
                  setTimeout((data) => {
                     setNameFieldInPISection(data.fullName);
                     console.log("filling PI Name")
                  }, initial + counter++ * delta, data);
                  console.log("filling PI Name", initial + counter * delta);
               } else {
                  setTimeout((data) => {
                     setNameFieldInPISection(data.firstName + " " + data.lastName);
                     console.log("filling PI Name")
                  }, initial + counter++ * delta, data);
                  console.log("filling PI Name", initial + counter * delta);
               }
            // })
            // .then(() => {
               if(data.sex != "" && data.sex != undefined) {
                  setTimeout((data) => {
                     setGenderField(data.sex);
                     console.log("filling sex")
                  }, initial + counter++ * delta, data);
                  console.log("filling Gender", initial + counter * delta);
               }
            // })
            // .then(() => {
               if(data.dob != "" && data.dob != undefined) { 
                  setTimeout((data) => {
                     setDOBField(data.dob);
                     console.log("filling dob")
                  }, initial + counter++ * delta, data);
                  console.log("filling DOB", initial + counter * delta);
               }
            // })
            // .then(() => {
               if(data["Cust Addr"] != "" && data["Cust Addr"] != undefined) {
                  setTimeout((data) => {
                     setAddressField(data["Cust Addr"]);
                     console.log("filling Addr");
                  }, initial + counter++ * delta, data);
                  console.log("filling Addr", initial + counter * delta);
               }
            // });
   }

   /* Function clearFields
      For debugging. Sets everything to "" */
   function clearFields() {
      console.log("setFirstNameField", setFirstNameField(""));
      console.log("setLastNameField", setLastNameField(""));
      console.log("setDOBField", setDOBField(""));
      console.log("setGenderField", setGenderField(""));
      console.log("setStateField", setStateField(""));
      console.log("getCityField", setCityField(""));
      console.log("getZipField", setZipField(""));
   }


/*** GETTERS & SETTERS ***/

   // GENERAL SETTER FN'S //    
   /* Function setInputField 
      Sets an input field. Prevents data overwriting. */
   function setInputField(el, val="") {
      var input,
          inputVal = el.value || (el.val && el.val());
      if(val == "" || (inputVal != "" && inputVal != undefined)) { // don't overwrite existing data
         return false;
      }

      edit(el[0] || el); // THIS IS A NATIVE BO FN
      input = mtjQuery(el).next().children();
      input.val(val);
      saveChanges(el[0] || el); // THIS IS A NATIVE BO FN
   }

   /* Function setDDField 
      Sets a dropdown field. Prevents data overwriting. */
   function setDDField(el, val) {
      var input,
          inputVal = el.value || (el.val && el.val());
      if(val == "" || (inputVal != "" && inputVal != undefined)) { // don't overwrite existing data
         return false;
      }

      edit(el[0] || el); // THIS IS A NATIVE BO FN
      input = mtjQuery(el).next().children();
      input.val(val);
      saveChanges(el[0] || el); // THIS IS A NATIVE BO FN
   }   

   // LEAD ID //
   /* Function getLeadIdField */
   function getLeadIdField() {
      var el = jq("td.label:contains('Lead ID')").next();
      el.val = () => {return el.html();}
      return el;
   }

   // FIRST NAME //
   /* Function getFirstNameField */
   function getFirstNameField() {
      var el = jq('#firstName');
      el.val = () => {return el.html();}
      return el;
   }

   /* Function setFirstNameField
      WILL NOT set a field with data already in it */
   function setFirstNameField(val) {
      var el = getFirstNameField();
      if(el.val() == "") {
         setInputField(el, val);
      } else {
         setInputField(el, el.val().toProper());
      }
   }

   // LAST NAME //
   /* Function getLastNameField */
   function getLastNameField() {
      var el = jq('#lastName');
      el.val = () => {return el.html();}
      return el;
   }

   /* Function setLastNameField
      WILL NOT set a field with data already in it */
   function setLastNameField(val) {
      var el = getLastNameField();

      if(el.val() == "") {
         setInputField(el,val);
      } else {
         setInputField(el, el.val().toProper());
      }
   }

   // NAME IN PERSONAL INFO SECTION //
   /* Function getNameFieldInPISection */
   function getNameFieldInPISection() {
      var el = jq('#insured_1_name');
      el.val = () => {return el.html();}
      return el;
   }

   /* Function setNameFieldInPISection */
   function setNameFieldInPISection(val) {
      var el = getNameFieldInPISection();

      if(el.val() == "") {
         setInputField(el,val);
      } else {
         setInputField(el, el.val().toProper());
      }
   }

   // DOB //
   /* Function getDOBField */
   function getDOBField() {
      var el = jq('#insured_1_dob');
      el.val = () => {return el.html();}
      return el;
   }

   /* Function setDOBField
      WILL set a field with data already in it */
   function setDOBField(val) {
      var input, moddedVal, el = getDOBField();

      if(!/(\d\d?[\/\.\-]\d\d?[\/\.\-](\d{4}))/.test(val)){
         moddedVal = val.replaceAll(/[\.\-]/g,"/")
                        .replace(/^(\d\d?\/\d\d?\/)(\d\d)$/,"$119$2");
      } else {
         moddedVal = val;
      }

      // DOB is wrong a lot of the time. Just kill it.
      edit(el[0] || el); // THIS IS A NATIVE BO FN
      input = mtjQuery(el).next().children();
      input.val(val);
      saveChanges(el[0] || el); // THIS IS A NATIVE BO FN

      return el.val() == moddedVal;
   }

   // GENDER //
   /* Function getGenderField */
   function getGenderField() {
      var el = jq("#insured_1_gender");
      el.val = () => {return el.html();}
      return el;
   }

   /* Function setGenderField
      WILL NOT set a field with data already in it */
   function setGenderField(val) {
      var moddedVal, el = getGenderField();

      if(typeof val != "string") {
         return;
      }

      if(val.toUpperCase() == "MALE" ){
         moddedVal = "M";
      } else if(val.toUpperCase() == "FEMALE" ){
         moddedVal = "F";
      } else {
         moddedVal = val;
      }

      setInputField(el, moddedVal);

      return el.val() == moddedVal;
   }

   // Address Getters & Setters //

   // Address //
   /* Function getAddress
      This is already implemented above */
   // function getAddress() {}

   /* Function setAddressField 
      val comes in as an address string */
   function setAddressField(val) {
      // ideally, it's split on commas (gives street, city, ST/ZIP), then split on " " to get state and zip 

      console.log(">> setting address: ", val);

      var addressParts = val.split(", "),
          stateZip = addressParts[2].split(" ");

      new Promise(() => {
         setStreetField(addressParts[0]);
      })
         .then(() => setCityField(addressParts[1]))
         .then(() => setStateField(stateZip[0]))
         .then(() => setZipField(stateZip[1]));
   }

   // Street //
   /* Function getStreetField */
   function getStreetField() {
      var el = jq("#address_1_street1");
      el.val = () => {return el.html();}
      return el;
   }

   /* Function setStreetField 
      Puts PO Boxes in Address 2, if it's empty */
   function setStreetField(val) {
      var el = getStreetField(),
          address2 = jq("#address_1_street2");

      // if(is a PO Box) {
         // setInputField(address2,val);
      // } else {
         setInputField(el,val);
      // }
   }

   // City //
   /* Function getCityField */
   function getCityField() {
      var el = jq("#address_1_city");
      el.val = () => {return el.html();}
      return el;
   }

   /* Function setCityField */
   function setCityField(val) {
      var el = getCityField();

      setInputField(el,val);
   }

   // State //
   /* Function getStateField */
   function getStateField() {
      var el = jq("#address_1_state");
      el.val = () => {return el.html();}
      return el;
   }

   /* Function setStateField
      WILL NOT set a field with data already in it */
   function setStateField(val) {
      if(typeof val != "string") {
         return;
      }
      var el = getStateField();

      setDDField(el,val);
   }

   // Zip //
   /* Function getZipField */
   function getZipField() {
      var el = jq("#address_1_zip");
      el.val = () => {return el.html();}
      return el;
   }

   /* Function setZipField */
   function setZipField(val) {
      var el = getZipField();

      setInputField(el,val);
   }

   function checkGetters() {
      console.log("getFirstNameField", getFirstNameField());
      console.log("getLastNameField", getLastNameField());
      console.log("getDOBField", getDOBField());
      console.log("getGenderField", getGenderField());
      console.log("getStateField", getStateField());
      console.log("getCityField", getCityField());
      console.log("getZipField", getZipField());
      console.log("getLeadId", getLeadId());
   }

   function checkSetters() {
      console.log("setFirstNameField", setFirstNameField("123"));
      console.log("setLastNameField", setLastNameField("123"));
      console.log("setDOBField", setDOBField("123"));
      console.log("setGenderField", setGenderField("123"));
      console.log("setStateField", setStateField("123"));
      console.log("getCityField", setCityField("123"));
      console.log("getZipField", setZipField("123"));
   }



/*** SEARCH PAGE STUFF ***/

   function openAllLeadLinks() {
      jq("td>a").each((a,b)=> {b.target="_blank"; b.click()});
   }


/*************
* LOGIC
**************/
// if on BO search page
if(/advancedSearch/.test(window.location.href)) {
   openAllLeadLinks()
} else {

   if(typeof bo == "undefined") {
      bo = {
         ranSetup: false
      };
   }
   if(bo.ranSetup != true) {
      setUpKeyboardShortcuts();
      loadCommHistTab();
      loadPlanInfoTab();
      scrollPlanInfoIntoView();

      bo.ranSetup = true;
      bo.unload = unload;
      bo.alreadyPresent = alreadyPresent;
      bo.mydebug = mydebug;

   } else {
      bo.alreadyPresent();
   }

   // on regular page
   function isPipTabLoaded() {
      return $$('.tbl-form.applicantsTable').length != 0;
   }
   function isCommTabLoaded() {
      return  $$('#communicationHistoryTable table').length != 0; 
   }
   console.log("PIP: ",isPipTabLoaded());
   console.log("Comm: ",isCommTabLoaded());
   /**/
}
