//~~~~ MARKETPLACE CUSTOMIZATION ~~~~//

// TODO: 
   /**  1  WORKING ON **
   // TODO: make data-testid="universal-navigation-view-profile" be aria-disabled=false
   // TODO: make it so that "MBI DATA" is automatically clicked after Ctrl + V'ing things
   // TODO: make it so that a space is not able to be input into the MBI field
   // TODO: BUG Make it so that this lead gets the Medicaid info right: 140449595
   // TODO: Make a "jump to plan" link in "current plan" option
   // TODO: Make a "add to comparison" link in "current plan" option

   /**  2  PRIORITY   **
   // TODO: Make stepper for part 2 of marketplace. Or....can I manipulate the URL to jump to the end?
      https://www.gomedicarequotes.com/repeat-caller/guide/CALLBACK_PERMISSION?sid=703201d77b6a11efb6c3631f102d09b4&applicant_id=self
      https://www.gomedicarequotes.com/repeat-caller/guide/SCOPE_OF_APPOINTMENT?sid=703201d77b6a11efb6c3631f102d09b4&applicant_id=self
      https://www.gomedicarequotes.com/guided-sales/guide/INTRODUCTION/COLLECT_EMAIL?applicant_id=self&sid=703201d77b6a11efb6c3631f102d09b4
      https://www.gomedicarequotes.com/quotes?applicant_id=self&filter_visible=false&origin=guidedsales&selected_product=MEDICARE_ADVANTAGE&sid=703201d77b6a11efb6c3631f102d09b4&user_filter_interaction=false

   /**  3  BACKLOG    **
   // TODO: Had a third line in the address...? https://www.brokeroffice.com/leads/leadViewEdit.jsp?lead_id=131860900#0
   // TODO: Handle the "Lookup" option for opening MARx sidebar

/** DONE **/

   /**** Post Version Release ****/
   // TODO: Make the copy refresh the MBI data
   // TODO: Incorporate if(today == getLastMARxRefreshDate()) skip; so it doesn't try to get it every time it's added to the page
   // TODO: Copy MARx data
   // TODO: Open/close/test MARx tab
   // TODO: Open/close/test Personal Info tab
   // TODO: Make autonav for Mkplc
   // TODO: If inserted in BO, then open MP


/* Function function_name
   NOTES_ON_FN */
function function_name(argument) {
   // body...
}


/*************
* FUNCTIONS
**************/

/*** LIBRARY ***/

   /* Function alreadyPresent
      alerts that the code already exists */
   function alreadyPresent() {
      console.warn(">> MP Code already present");
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
   function copyStringToClipboard(string, printResult) {
      if(string == null) {
         console.warn(">> Nothing to copy");
         return;
      }

      return navigator.clipboard.writeText(string)
         .then((data) => {
            console.log('>> Content copied to clipboard');
            if(printResult) {
               console.log("Copied: ", data)
            }
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
         if(/DOB: ?[\d-]+ Agent Name/.test(copiedText)){ // first comment in an RFI
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
  /*** PAGE SETUP ***/
   mpjq = "";
   if(typeof mtjQuery == "undefined") {
      setTimeout(()=>mpjq = mtjQuery,1000);
   } else {
      mpjq = mtjQuery;
   }

   /* Function setUpKeyboardShortcuts
      Sets up the keyboard listeners to the page */
   function setUpKeyboardShortcuts() {
      document.addEventListener("keyup", triggerMARxRefresh);     // CTRL + SHIFT + F  // F for reFresh
      document.addEventListener("keyup", triggerCopyMARxView);    // CTRL + SHIFT + B  // B for MBI
      document.addEventListener("keyup", triggerEnrollInfoCopy);  // CTRL + SHIFT + E  // E for Enrollment
      document.addEventListener("keyup", pasteInSearchInfo);      // CTRL + SHIFT + V // V b/c it's paste
      console.warn(">> set up shortcuts");
   }

   /* Function clearKeyboardShortcuts
      Sets up the keyboard listeners to the page */
   function clearKeyboardShortcuts() {
      document.removeEventListener("keyup", triggerMARxRefresh);
      document.removeEventListener("keyup", triggerCopyMARxView);
      document.removeEventListener("keyup", triggerEnrollInfoCopy);
      document.removeEventListener("keyup", pasteInSearchInfo);
      console.log(">> removed shortcuts");
   }

   /* Function unload
      Removes the keyboard listeners from the page */
   function unload() {
      //remove mutation obsv
      clearKeyboardShortcuts();
      mp.ranSetup = false;
   }

  /*** SIDEBARS AND NAV ***/

   /* Function openProfileSidebar */
   function openProfileSidebar() {
      console.log("opened profile");
      mpjq("[data-testid='universal-navigation-view-profile']").click();
   }

   /* Function closeProfileSidebar */
   function closeProfileSidebar() {
      mpjq('[data-testid="profile-pane-close-button"]').click();
   }

   /* Function isProfileSidebarOpen */
   function isProfileSidebarOpen() {
      return mpjq(":contains('MBI Lookup')").length > 0;
   }


   /* Function openMARxSidebar 
      You don't need to test if it's open, b/c the opening link only opens*/
   function openMARxSidebar() {
      openProfileSidebar();
      var k = mpjq(".medicareEligibilityLookupControl-wrapper__dialog-view");
      if(k.length == 0) {
         k = getByDataTestId("medicareEligibilityLookupControl-viewButton");
      }
      console.log(">> Opened MARx sidebar", k);
      k.click();
   }

   /* Function openMARxSidebarEdit 
      You don't need to test if it's open, b/c the opening link only opens*/
   function openMARxSidebarEdit() {
      openProfileSidebar();
      var k = mpjq(".medicareEligibilityLookupControl-wrapper__dialog-view");
      if(k.length == 0) {
         k = getByDataTestId("medicareEligibilityLookupControl-editButton");
      }
      console.log(">> Opened MARx sidebar", k);
      k.click();
   }

   /* Function closeMARxSidebar */
   function closeMARxSidebar() {
      getByDataTestId("medicareEligibilityModal-closeButton").click();
   }

   /* Function isMARxSidebarOpen */
   function isMARxSidebarOpen() {
      console.log(">> is MARx Open:",mpjq("h2:contains('MBI Lookup')"))
      // return mpjq(":contains('MBI Lookup /')").length > 0;
      return getByDataTestId("medicareEligibilityModal-modalContent")
             .find("h2:contains('MBI Lookup /')").length > 0;
   }

  /*** SELECTORS AND QUERIES ***/

   /* Function getByDataTestId
      Most of Marketplace */
   function getByDataTestId(val) {
      if(typeof val == "string") {
         return mpjq("[data-testid='"+val+"']");
      } else {
         return null;
      }
   }

   
/*** AUTONAV ***/

   /* Function getElToListenTo
      Removes the autonav logic when we have arrived, to prevent 
      issues when reloading */
   function getElToListenTo() {
      return qs('[aria-disabled="false"]');
   }

   /* Function removeAutoNavMutObsv
      Removes the autonav logic when we have arrived, to prevent 
      issues when reloading */
   function removeAutoNavMutObsv() {
      console.log(">> removed autonav");
      getElToListenTo().removeEventMutObsv("load", autoNav);
   }

   /* Function addAutoNavMutObsv
      Adds the autonav logic when.
      Calling this fn multiple times isn't an issue, 
      as it won't cause multiple runs, since the signature 
      is the same. */
   function addAutoNavMutObsv() {      
      var el = getElToListenTo()
      var obsv = new MutationObserver(() => console.log(">> something happened 2"));
      obsv.observe(el, {childList:true});
   }

   /* Function getCurrStepNum
      Searches for specific elements on the DOM to decide the current step the nave is at. */
   function getCurrStepNum() {
      if (getElByID('section.agenda.guidance.button.submit') != null) {
         return 1;
      } else if (getByDataTestId("medicare-disclaimer-section-submitButton").length != 0) {
         return 2;
      } else if(getByDataTestId("permission-to-call-back-button-yes").length != 0) {
         return 3;
      } else if (getByDataTestId("scope-of-appointment-section-submitButton").length != 0) {
         return 4;
      } else if (getByDataTestId("id-proof-submit-button").length != 0) {
         console.log("step 5");
         return 5;
      } else if (getElByID('callerReview.guidance.button.submit') != null) {
         console.log("step 6");
         return 6;
      } else if (qs('button > span') != null) {
         console.log("step 7");
         return 7;
      } else if (getByDataTestId("preview-available-plans-button")) {
         return 15;
      }

      console.warn("returned 0");
      return 0;
   }

   /* Function autoNavSetup
      Sets up the MutationObserver
   */
   function autoNavSetup(){
      var el = getElToListenTo()
      var obsv = new MutationObserver(autoNav);
      obsv.observe(el, {childList:true});    
   }

   /* Function autoNav
      Navigates from wherever you are in the "get to MARx" process to the next step in MARX. 
      Utilizes "Load" even to decide where to go. 
      Executed in context of main frame AND in context iframe.
      Uses '$' when in main frame, uses iFrameJqry when in iframe.
   */
   function autoNav(){
      // adding the same listener mult times won't cause it to fire mult times
      switch(getCurrStepNum()) {
         default: 
            console.warn('!! Failed AutoNav');
            break;
         // THESE ARE FOR THE "REPEAT CALLER" SECTION, WHEN NO LEAD ID EXIST FOR THE CU
         // EACH STEP IS ITS OWN PAGE
         case 1: 
            console.log("++ AutoNav: Step 1");
            getElByID('section.agenda.guidance.button.submit').click();
            break;
         case 2: 
            console.log("++ AutoNav: Step 2");
            getByDataTestId("medicare-disclaimer-section-submitButton").click();
            break;
         case 3: 
            console.log("++ AutoNav: Step 3");
            //Permission to Call Back
            getByDataTestId("permission-to-call-back-button-yes").click();
            break;
         case 4: 
            console.log("++ AutoNav: Step 4");
            getByDataTestId("scope-of-appointment-section-submitButton").click();
            break;
         case 5:
            console.log("++ AutoNav: Step 5");
            getByDataTestId("id-proof-submit-button").click();
            break;
         case 6:
            console.log("++ AutoNav: Step 6");
            getElByID('callerReview.guidance.button.submit').click();
            break;
         case 7:
            console.log("++ AutoNav: Step 7");
            qs('button > span').click();
            break;
         case 8:
            console.log("++ AutoNav: Step 8");
            removeAutoNavListener();
            break;

         case 15:
            console.log("++ AutoNav: Step 1");
            getByDataTestId("preview-available-plans-button").click();
            break;


         // TODO: Add check checkers. If checked, skip
         // setTimeout(() => {var c = getElByID('section.agenda.guidance.button.submit'); if(c!=null){c.click();}},5);
         // setTimeout(() => {var c = getElByID('section.medicareDisclaimer.guidance.button.submit'); if(c!=null){c.click();}},10);
         // setTimeout(() => {var c = getElByID('section.callbackPermission.guidance.button.yes'); if(c!=null){c.click();}},100);
         // setTimeout(() => {var c = getElByID('section.soa.guidance.button.submit'); if(c!=null){c.click();}},20);
         // getElByID('').click();

      }
   }


/*** ENABLE VIEW PROFILE ***/

   /* Function enableViewProfile
       */
   function enableViewProfile() {
      var disabledViewProfileLink = mpjq("span[aria-disabled='true']:contains('View Profile')");
      if(disabledViewProfileLink.length > 0 ) {
         disabledViewProfileLink.attr("aria-disabled",false);
      }
   }


/*** OPEN MARKETPLACE VIEW ***/

   /* Function openMarketplace
       */
   function openMarketplace() {
      window.open(document.querySelector('#marketplaceV2MedicareLink').href);
   }


/*** JUMP TO END ***/

   /* Function getSidFromURL */
   function getSidFromURL() {
      var params = new URLSearchParams(window.location.search);
      return params.get("sid");
   }

   /* Function jumpToTheEnd
      Takes in an SID, and nav's to the plan page */
   function jumpToTheEnd(sid) {
      window.location.assign("https://www.gomedicarequotes.com/quotes?applicant_id=self&filter_visible=false&origin=guidedsalesselected_product=MEDICARE_ADVANTAGE&selected_sort_keys=planFitRank&sid="+sid+"&user_filter_interaction=false");
   }

   /* Function addJumpToEndEl
      Adds in the link element that gets you to the plan page */
   function addJumpToEndEl() {
      var universalNavEl = getByDataTestId("universal-navigation-consumer-info"),
          viewProfileEl = universalNavEl.next(),
          jumpEl = document.createElement("span"),
          cssEl, cssContent;

      // if we're already at the end, or if it already exists, don't put it up.
      if(getCurrStepNum() != 7 && mpjq("#jump_el").length == 0) {
         jumpEl.classList.add(...viewProfileEl.attr("class").split(" "));
         jumpEl.innerHTML = "Jump to Plans";
         jumpEl.id = "jump_el";
         jumpEl.addEventListener("click",() => jumpToTheEnd(getSidFromURL()));
         mpjq(jumpEl).insertAfter(viewProfileEl);
      }

      console.log("yo yo");
   }

   /* Function removeJumpToEndEl
      Adds in the link element that gets you to the plan page */
   function removeJumpToEndEl() {

   }


/*** REFRESH MARX DATA ***/

   /* Function triggerMARxRefresh */
   function triggerMARxRefresh(evt) {
      if (evt.ctrlKey && evt.shiftKey && evt.which == 70) { // Ctrl + Shift + F for reFresh
         if(mp.mydebug.isDB()) {
            console.warn(">> debug on");
         }
         refreshMARxData();
      }
   }

   /* Function refreshMARxData
      Gets the Cu's info in the format, like in the MARx file */
   function refreshMARxData(data=null) {
      var lookupContainer, dateRefreshed, dateRefreshedEl, timeSinceRefreshed,
          threeDays = 3 * 24 * 60 * 60 * 1000,
          closeSidebarAtEnd = !isMARxSidebarOpen(),
          cuDataEl = getByDataTestId("personalInfo-subsection");
      
      openMARxSidebar();

      // Last Refreshed check. Don't refresh on the same day
      dateRefreshedEl = mpjq("span:contains('Last MBI Lookup')");
      dateRefreshed = new Date(dateRefreshedEl.children().html());
      if(new Date() - dateRefreshed < threeDays && data == null) {
         console.log(">> Skipping refresh. Refreshed on",dateRefreshed.toString().slice(0,15));
         if(closeSidebarAtEnd) {
            closeMARxSidebar();
            closeProfileSidebar();
         }
         return;
      } else {
         console.log(">> Doing refresh. Refreshed on",dateRefreshed.toString().slice(0,15));         
      }

      getByDataTestId("mbiResultsModal-refreshMbi").click();
      getByDataTestId("medicareEligibilityLookupControl-editButton").click();
      mpjq("label:contains('Yes')").click();

      if(data != null) {
         fillMbiLookup(data);
      }

      getByDataTestId("eligibilityLookupForm-submitButton").click();

      lookupContainer = getByDataTestId("medicareBeneficiaryIdentifier-lookup-callout");

      addMutationObs(lookupContainer.get(0),(a,b) => {
         var viewMbiDataBtn = getByDataTestId("medicareEligibilityLookupModal-lookupResult-success-button");

         if(viewMbiDataBtn.length != 0) {
            viewMbiDataBtn.click()

            if(closeSidebarAtEnd) {
               closeMARxSidebar();
               closeProfileSidebar();
            }

            console.warn(">> Refreshed MARx data!");
         }
      },{childList:true, subtree: true});

   }


/*** COPY MARX VIEW ***/

   /* Function triggerCopyMARxView */
   function triggerCopyMARxView(evt) {
      if (evt.ctrlKey && evt.shiftKey && evt.which == 66) { // Ctrl + Shift + B for MBI
         if(mp.mydebug.isDB()) {
            console.warn(">> debug on");
         }
         var closeSidebarAtEnd = !isMARxSidebarOpen();
         openMARxSidebar();
         copyMARxData().then(() => {
            console.log(">> is sidebar: ",isMARxSidebarOpen());
            if(closeSidebarAtEnd) {
               closeMARxSidebar();
               closeProfileSidebar();
            }
         });
      }
   }

   /* Function copyMARxData
      Gets the Cu's info in the format, like in the MARx file */
   function copyMARxData() {
      if(!isMARxSidebarOpen()) {
         console.warn(">> MARx sidebar not open to copy");
         // copyStringToClipboard("Sidebar not open");
         // return copyStringToClipboard("Sidebar not open");
      }

      var cuDataEl = getByDataTestId("personalInfo-subsection");

      copyElToClipboard(cuDataEl[0]);
      return getClipboard().then((cuData) => {
         var cuAddress, cuAddressEl, cuAddressParts, marxLikeString,
             header = cuData.split("\n")[0],
             cuDataObj = getObjFromCopiedText(cuData.replaceAll(/:\r?\n/g,":"),true);

            cuAddressEl = mpjq("div span:contains('Verified')")
                           .parent()
                           .siblings()[0];
            if(cuAddressEl == undefined) {
               console.log("nope");
               cuAddressEl = mpjq("div:contains('Verified')")
                              .last()
                              .siblings()[0]
            }
            cuAddressParts = cuAddressEl.innerHTML.split(/<br>|\r?\n/);
            console.log(cuAddressParts);
            if(cuAddressParts.length == 3) {
               cuAddress = cuAddressParts[0] + " " + cuAddressParts[1] + "\n" +
                           cuAddressParts[2];
            } else {
               cuAddress = cuAddressParts[0] + "\n" +
                           cuAddressParts[1];
            }

             marxLikeString = 
               header + "\n" +
               "MBI Number:\t" + cuDataObj.mbi + "\n" +
               "Name:\t" + cuDataObj.Name + "\n" +
               "Birth Date:\t" + (cuDataObj["Date of Birth"] || cuDataObj.dob) + "\n" +
               "Date of Death: -" + "\n" +
               "Sex:\t" + cuDataObj.Gender + "\n" +
               "Address:\t" + cuAddress + "\n" +
               "Most recent State:\t" + cuDataObj.State + "\n" +
               "Most recent County:\t" + cuDataObj.County + "\n" +
               "Medicaid:\t" + copyMedicaidInfoFromSideBar(); 
                     // canwork? where would show need Mcd...?>> TODO: Put a "isDNSP()" here to blank this out if not applicable

         copyStringToClipboard(marxLikeString.replaceAll(/  +/g,""));
      });
   }

   //// SUB: GET MCD INFO////

   /* Function openMedicareInfoSideBar
      Takes the info copied from ZD and pastes it into the correct fields */
   function openMedicareInfoSideBar() {
      openProfileSidebar();
      getByDataTestId("profile-pane-link-medicareInfo").click();
   }

   /* Function copyMedicaidInfoFromSideBar
      Takes the info copied from ZD and pastes it into the correct fields */
   function copyMedicaidInfoFromSideBar() {
      var mcdId, mcdLvl;
      openMedicareInfoSideBar();

      mcdId = getByDataTestId("medicareInfoPane.medicaidId").html().replace("<b>Medicaid ID:</b> ","");
      mcdLvl = getByDataTestId("medicareInfoPane.medicaidLevel").html().replace("<b>Medicaid Level:</b> ","");

      return (mcdId || "-") + " / " + mcdLvl;
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

               // refreshMARxData(cuInfoObj);
               fillMbiLookup(cuInfoObj);

               // clearForm();
               // fillSuccessful = fillMbiLookup(cuInfoObj);
               // if(fillSuccessful) submitLookupIfComplete();
            });
      }

   }


   /* Function fillMbiLookup
      Adds the info from data object provided to every field */
   function fillMbiLookup(data=null) {
      var mbiField, dobField;

      // EligibilityLookupFormDateOfBirthField
      // MedicareEligibilityLookupControllerApiFp / lookupMedicareEligibility / queryKey: ["medicareEligibilityLookup", r, n],
      // MedicareEligibilityLookupQuery
      // (\([^):{]+,)\n( +) >> for the regext to make it more readable
         // also do ? : on separate lines
         // for(...,\n ...) is really annoying
         // }\n, is annoying


      /* imported from refreshMARxData */
      var lookupContainer, dateRefreshed, dateRefreshedEl, timeSinceRefreshed,
          threeDays = 3 * 24 * 60 * 60 * 1000,
          closeSidebarAtEnd = !isMARxSidebarOpen(),
          cuDataEl = getByDataTestId("personalInfo-subsection");
      
      openMARxSidebar();

      // Last Refreshed check. Don't refresh on the same day
      dateRefreshedEl = mpjq("span:contains('Last MBI Lookup')");
      dateRefreshed = new Date(dateRefreshedEl.children().html());
      // if(new Date() - dateRefreshed < threeDays) {
      //    console.log(">> Skipping refresh. Refreshed on",dateRefreshed.toString().slice(0,15));
      //    if(closeSidebarAtEnd) {
      //       closeMARxSidebar();
      //       closeProfileSidebar();
      //    }
      //    return;
      // } else {
      //    console.log(">> Doing refresh. Refreshed on",dateRefreshed.toString().slice(0,15));         
      // }

      getByDataTestId("mbiResultsModal-refreshMbi").click();
      getByDataTestId("medicareEligibilityLookupControl-editButton").click();
      mpjq("label:contains('Yes')").click();

      /* end */



      if(typeof data != "object") {
         console.warn("Could not fill fields. Data is not an object");
         return false;
      }

      if(data.dob != "" && data.dob != undefined) {
         setDOBField(data.dob);         
      }
      
      if(data.mbi != "" && data.mbi != undefined) {
         setMBIField(data.mbi);
      }
      
      return lookupFormIsComplete();
   }


   /* Function getDOBField */
   function getDOBField(val="") {
      return getByDataTestId("consumerDateOfBirth-input");
   }

   /* Function setDOBField */
   function setDOBField(val="") {
      var moddedVal, field = getDOBField();

      if(!/(\d\d?[\/\.\-]\d\d?[\/\.\-](\d{4}))/.test(val)){
         moddedVal = val.replaceAll(/[\.\-]/g,"/")
                        .replace(/^(\d\d?\/\d\d?\/)(\d\d)$/,"$119$2");
      } else {
         moddedVal = val;
      }

      field.val(moddedVal);
      field[0].dispatchEvent(new Event('input'));

      return field.val() == moddedVal;
   }

   /* Function getMBIField */
   function getMBIField(val="") {
      return getByDataTestId("consumerMedicareBeneficiaryIdentifierNumber-input");
   }

   /* Function setMBIField */
   function setMBIField(val="") {
      var field = getMBIField();
          moddedVal = "";

      if(val != "") {
         moddedVal = val.toUpperCase().replaceAll(/\-| /g,"");
      }

      field.val(moddedVal);
      field[0].dispatchEvent(new Event('input'));

      return field.val() == moddedVal;
   }


   /*** SUBMIT IF COMPLETE ***/

   /* Function lookupFormIsComplete
      Checks if all required fields have been filled, and if so, it submits the search */
   function lookupFormIsComplete() {
      var isValid = false,
          dob = getDOBField().val(),
          mbi = getMBIField().val();

      isValid = dob != "" && mbi != "";

      console.log("Auto submit " + (isValid ? "succeeded" : "failed"), "dob", dob != "", "mbi", mbi != "");

      return isValid;
   }

   /* Function submitLookupIfComplete
      Checks if all required fields have been filled, and if so, it submits the search */
   function submitLookupIfComplete() {
      console.log(">> 1 attempted submit");
      if(lookupFormIsComplete()) {
         // todo: fix this. Something's weird
         console.log(">> 2 attempted debounced initiateSearch", debouncedInitiateSearch, "<< fn");
         debouncedInitiateSearch();
      }
   }

   /* Function initiateSearch
      Triggers the search */
   debouncedInitiateSearch = debounce(()=> {
      console.log(">> 3 ran initiateSearch");
      var submitButton = getSubmitBtn();
      if(submitButton != null) {    
         submitButton.click();
      }
   },3000,{leading:true});


/*** CANVAS COPY CONTAINER ****/

    /*  Function addHtml2Canvas
        Sets up all the load listeners, so that when site loads new cu, logic is re-added */
    function addHtml2Canvas() {
        const jsEl = document.createElement("script");
        jsEl.src="https://html2canvas.hertzen.com/dist/html2canvas.js"
        jsEl.crossorigin="anonymous";

        document.childNodes[1].appendChild(jsEl);
    }

    /* Function getEnrollInfoCopyBtn
        Gets the button we need to click in order to trigger the copy logic */
    function getEnrollInfoCopyBtn() {
        return mpjq('#enrollInfoCopyButton');
    }

    /* Function makeCanvasContainer 
        Puts the canvasContainer into the DOM. Returns a ref to it. */
    function makeCanvasContainer() {
        const div = document.createElement('div');
        div.id="canvasContainer";
        div.style="visibility:hidden; display:none;";

        //inner btn div
        const btnDiv = document.createElement('div');

        const enrollInfoCopyBtn = document.createElement('button');
        enrollInfoCopyBtn.type='button';
        enrollInfoCopyBtn.id='enrollInfoCopyButton';
        enrollInfoCopyBtn.onclick = enrollInfoCopy;

        // piece them together
        btnDiv.appendChild(enrollInfoCopyBtn)
        document.childNodes[1].appendChild(div).appendChild(btnDiv);

        return div;
    }

    /* Function getCanvasContainer
        Returns the canvasContainer. Cerates it if it doesn't exist. 
        Can execute inside iframe context, or main window context */
    function getCanvasContainer() {
        // handle working in two different contexts
        var canvasContainer = mpjq('#canvasContainer');
        if(canvasContainer.length == 0) {
            canvasContainer = makeCanvasContainer();
        }
        return canvasContainer;
    }

    /* Function copyCanvasToClipboard */
    function copyCanvasToClipboard(canvas) {
      canvas.toBlob(function (blob) {
         const item = new ClipboardItem({ "image/png": blob });
         navigator.clipboard.write([item]); 
      });
    }

    /* Function saveNewCanvas
        Removes old canvas, saves the new canvas to the DOM */
    function saveNewCanvas(canvas) {
         var canvasContainer = getCanvasContainer();
         //delete old canvas, if it exists
         if(canvasContainer.children().length > 1) {
            canvasContainer.children("canvas").remove();
         }

         //save new canvas into hidden el
         canvasContainer.append(canvas);

         return canvas;
    }


   /*** ENROLLMENT INFO EL COPY ****/

    /* Function enrollInfoCopy
        Gets the el to copy, calls html2canvas, saves it to the
        clipboard */
    function enrollInfoCopy() {
      console.log("yo");
      var enrollmentInfoEl, closeSidebarAtEnd = true,
          closeSidebar = () => { if(closeSidebarAtEnd) { closeMARxSidebar(); closeProfileSidebar(); } };
      if(isMARxSidebarOpen()) {
         closeMARxSidebar = false
      }
      openMARxSidebar();
      enrollmentInfoEl = getByDataTestId("enrollmentInfo-subsection");
      if(enrollmentInfoEl.length == 0) {
         console.warn('Could not find Enrollment Info');
         return;
      }

      var config = {
         // ignoreElements: function(el){
         //     if(el.contains(enrollmentInfoEl.children[2]) 
         //         || fourth.contains(el)
         //         || third.contains(el)
         //         || second.contains(el)
         //         || first.contains(el)
         //         || el.nodeName == 'HEAD'
         //         || el.nodeName == 'LINK'
         //         || el.nodeName == 'STYLE') {
         //         return false;
         //     } else {
         //         return true;
         //     }
         // }
      }

      html2canvas(enrollmentInfoEl[0],config)
         .then(saveNewCanvas)
         .then(copyCanvasToClipboard)
         .then(closeSidebar)
         .catch(function() {
            if(closeSidebarAtEnd){ closeMARxSidebar(); closeProfileSidebar(); }
             console.warn("Failed to copy enrollment info");
         });
   }

   /* Function triggerEnrollInfoCopy
      Refers the event to the function inside of the iframe */
   function triggerEnrollInfoCopy(evt) {
      // CTRL + SHIFT + 'E' // 'E' b/c "enroll"
      if (evt.ctrlKey && evt.shiftKey && evt.which == 69) {
         if(mp.mydebug.isDB()) {
            console.warn("debug on");
         }

            getEnrollInfoCopyBtn().click();
        }

   }


/*************
* LOGIC
**************/
if(location.href.includes("broker")){ // set up so it's easy to open MP
   var state = $$('#address_1_state')[0].innerHTML;
   var statesIServe = `AL|AR|AZ|CA|CO|CT|DE|FL|GA|IA|IL|IN|KS|KY|LA|MD|ME|MI|
                       MN|MN|MO|MS|MT|NC|NE|NH|NJ|NM|NV|NY|OH|OK|OR|PA|SC|TN|
                       TX|UT|VA|WA|WI|WV`;
   if(statesIServe.search(state) != -1) {
      $("marketplaceV2MedicareLink").click();
   } else {
      $$("#address_1_state")[0].style.color = "red"
      window.open("https://www.brokeroffice.com/leads/"+location.search.slice(9)+"/marketplaceV2/MEDICARE.do?call_type=OUTBOUND");
   }
} else {

   if(typeof mp == "undefined") {
      window.mp = {
         ranSetup: false
      };
      qs = (expr) => document.querySelector(expr);
      qsAll = (expr) => document.querySelectorAll(expr);
      getElByID = (expr) => document.getElementById(expr);
   }

   function main() {
      if(mp.ranSetup != true) {
         setUpKeyboardShortcuts();  // TODO: Should I restrict certain things to certain pages?
         autoNavSetup();
         addHtml2Canvas();
         makeCanvasContainer();
         refreshMARxData();
         enableViewProfile();
         addJumpToEndEl();

         mp.ranSetup = true;
         mp.unload = unload;
         mp.alreadyPresent = alreadyPresent;
         mp.mydebug = mydebug;
      } else {
         mp.alreadyPresent();
      }

      /*** Add AutoNav Functionality ***/
      // need to add the listener upon code insert to page, 
      // so it starts the loop for the navigation.
      // autoNav();

      console.log("ran setup");
   }

   if(typeof mpjq == "undefined") {
      setTimeout(main,1500);
   } else {
      main();
   }

}
