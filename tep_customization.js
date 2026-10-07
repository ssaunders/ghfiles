//~~~~ TEP CUSTOMIZATION ~~~~//

// TODO:

   // 1  working on
      // TODO: Save the phone number/address to a global var that updates whenever a search happens. Have the mutator obs be created within the object's creation (create as a class?)

      // TODO: Make toggle that shifts between workable options (no MBI, first two o/first/last, DOB | all info)
      // TODO: Add a "remove single managed mutator" fn
               // remove how? Based on index? gets messy
               // return an id? Add an ID to the mutator << best option
      // TODO: Add a "smart search" option, which runs through everything (puts back all info at the end, have a "continue" btn?)

         // copied from another file, may have done
      // TODO: Add a "remove extraneous chars" listener to the SSN/DOB on keyup
      // TODO: After a search, see if you can grab the lead id from the search drop down, so that the copy can pick it up

   // 2 priority
      // TODO: Create a button that cycles through available info. Or should I have a num pad that lets you pick?
            // or should it just keep changing until it gets something?
            /* Minimum combination of fields required to Search for a Member:
               1. Lead ID
               2. MBI and Date of Birth
               3. MBI and a minimum of the first 2 characters of the first name and first 2 characters of the last name
               4. Email Address, Phone Number, Date of Birth, and first 2 characters of the last name
               5. Date of Birth, and a minimum of the first 2 characters of the first name and first 2 characters of the last name
               6. Phone Number, Zip Code and Date of Birth
               7. Phone Number and Date of Birth
               8. Enrollment Confirmation Number and Date of Birth */
         // TODO: Detect when there's a (recurring) search error
      // TODO: Create a "Lead ID" entry on the left side, get it when search lands (what about when it's clicked?)


   // 3 backlog
      // TODO: Make an option in "add Managed Mutation Obs" that says it's a one-time thing
      // TODO: Add a "None" in the location of the MBI, when no MBI is there
      // TODO: Change the Tab order to be reasonable
      // TODO:

/** DONE **/
   // BUGFIX: Pasting from MP now works
   // TODO: Make a "copy" button next to the phone #
   // TODO: Add "EOC doc link" for certain carriers
   // TODO: Auto-remove spaces/special characters (from MBI, first name, lead id, phone?, zip) on blur

   /**** Post Version Release ****/
   // TODO: Refactor getter names/wrap them in an obj
   // TODO: Make it break up "Marvin Lane II/Jr./etc"
   // TODO: When it pastes a name, remove middle initials
   // TODO: Add getter/setter for Zip
   // TODO: Add the getters for buttons
   // TODO: Add Ctrl + Shift + V shortcut
   // TODO: Write shortcut logic fn
   // TODO: Add the getters/setters for fields
   // TODO: Make sure it inserts into page correctly
   // TODO: Figure out what kind of jquery/$ it uses
   // TODO: Change the placeholders in the file for the TP, TEP,


/* Function function_name
   NOTES_ON_FN */
function function_name(argument) {
   // body...
}


/*************
* FUNCTIONS
**************/

/*** LIBRARY: TEP ***/

   /* Function alreadyPresent
      alerts that the code already exists */
   function alreadyPresent() {
      console.warn(">> TEP Code already present");
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

  /// CLIPBOARD ///

   /* Function copyStringToClipboard
      Copies a string to the computer clipboard */
   function copyStringToClipboard(string) {
      if(string == null) {
         console.warn(">> Nothing to copy");
         return;
      }

      navigator.clipboard.writeText(string)
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

   //// MUTATORS ////

   mutatorArray = [];

   /* Function addManagedMutationObs
      Adds a mutation observer to targetEl. Returns the observer.
      The fn passed in will receive these arguments:
      mutationList - the list of changes.
      observer - The observer instance.
      https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

      See addMutationObs for details on options.
      */
   function addManagedMutationObs(targetEl, fn, options) {
      var mutaObs = addMutationObs(targetEl, fn, options);

      mutaObs.target = targetEl;
      mutaObs.managedId = Math.round(Math.random()*9000+1000);
      mutaObs.managedDisconnect = () => {unloadManagedMutator(mutaObs.managedId)};
      mutatorArray.push(mutaObs);

      return mutaObs;
   }

   /* Function unloadManagedMutator
      Removes the specific mutation observer from mutatorArray */
   function unloadManagedMutator(managedId) {
      var idx = mutatorArray.findIndex((mutaObs) => {
         if(mutaObs.managedId == managedId) {
            return true;
         }
      });

      if (idx == -1) {
         console.warn("Tried to delete a managed observer that didn't exist:", managedId);
         return false;
      }

      mutatorArray[idx].disconnect();

      mutatorArray = mutatorArray.toSplice(idx,1);

      return true;
   }

   /* Function unloadAllManagedMutators
      Removes the keyboard listeners from the page and undoes everything in runSetup */
   function unloadAllManagedMutators() {
      mutatorArray.map((muta) => {
         muta.disconnect();
      });
      mutatorArray = [];
   }

   /* Function addMutationObs
      Adds a mutation observer to targetEl. Returns the observer.
      The fn passed in will receive these arguments:
      mutationList - the list of changes.
      observer - The observer instance.
      https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
      */
   function addMutationObs(targetEl, fn=fnLogger, options={childList:true}) {
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

   ///

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
   
   /* Function isPastingFromMARx
      Checks if the pasted string coming in is from MARx */
   function isPastingFromMARx(colonList){
      return /^Claim Number:\t +.*\r?\nMBI /.test(colonList);
   }

   /* Function isPastingFromMP
      Checks if the pasted string coming in is from MARx */
   function isPastingFromMP(colonList){
      return /^Personal Info\r?\nMBI /.test(colonList);
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
      var logStuff = false,
          pastedFromMARx = isPastingFromMARx(colonList),
          pastedFromMP = isPastingFromMP(colonList),
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

      // Handle the MARx Address issue
      if(pastedFromMARx) {
         infoAry[13]+=infoAry[14];
         infoAry.splice(14,1);
      }

      // Handle the MP Address issue
      if(pastedFromMP) {
         infoAry[12]+=infoAry[13];
         infoAry.splice(13,1);
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
          killBadDate = /1900-01-00/g,
          dateFix = /(\d\d\d\d)-(\d\d)-(\d\d)/g;
      return copiedText.replaceAll(terms,"\n$1:").replaceAll(killBadDate,"-").replaceAll(dateFix,"$2/$3/$1");
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
      var newCuInfoObj = cuInfoObj, cuName, namePartsFirst, namePartsSecond;

      // ADDRESS INFO
      var custAddress = cuInfoObj["Cust Addr"] || cuInfoObj.address || cuInfoObj.Address || ""

      newCuInfoObj.state = (cuInfoObj.state || cuInfoObj.State)
      if(newCuInfoObj.state == undefined || newCuInfoObj.state == "") {
         stateFromAddr = (cuInfoObj["Cust Addr"] || "").match(/.* ([A-Z][A-Z]) \d{5}/)
         newCuInfoObj.state = stateFromAddr != null && stateFromAddr.length >= 0 ? stateFromAddr[1].toUpperCase() : "";
      }
      newCuInfoObj.zip = custAddress == "" ? "" : custAddress.match(/(\d{5})(-\d+)?$/)[1];

      // CU INFO
      newCuInfoObj.leadId = cuInfoObj.leadId || cuInfoObj.LeadID || cuInfoObj["Lead ID"] || cuInfoObj["Lead Id"] || cuInfoObj["lead id"] || "";


      newCuInfoObj.dob = cuInfoObj.dob || cuInfoObj.DOB || cuInfoObj["Date of Birth"] || cuInfoObj["Birth Date"] || "";
      newCuInfoObj.sex = cuInfoObj.sex || cuInfoObj.Gender || "";
      newCuInfoObj.mbi = cuInfoObj.mbi || cuInfoObj["Medicare ID"] || cuInfoObj["MBI Number"] || cuInfoObj.MBI || "";
      newCuInfoObj.mcdId = (cuInfoObj.mcdId || cuInfoObj["Medicaid ID"] || "").split(" / ")[0];
      if(newCuInfoObj.mcdId == "-") {
         newCuInfoObj.mcdId = "";
      }
      newCuInfoObj.phoneNum = cuInfoObj.phone || cuInfoObj.Phone || cuInfoObj["Phone Number"] || cuInfoObj["Phone Num"] || "";
      newCuInfoObj.email = cuInfoObj.email || cuInfoObj.Email || cuInfoObj["Email Address"] || cuInfoObj["email address"] || "";

      // NAME (cuInfoObj.Name is to get it from MARx )
      cuName = (cuInfoObj["Customer Name"] || cuInfoObj["Cust Name"] || cuInfoObj["Cu Name"] || cuInfoObj.Name || "")
                  .replace(/ [JS]r\.?| (I+|IV)/,"")   // get rid of Jr, etc
                  .replace(/ [A-Z]\.? /," ");         // remove middle initials
      nameParts = cuName.match(/([a-z]+( [a-z]+)?)( [a-z]\.?)? ([a-z]+( [a-z]+)?)/i);
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
   jq = typeof mtjQuery != "undefined" ? mtjQuery : jQuery;

   /* Function setUpKeyboardShortcuts
      Sets up the keyboard listeners to the page */
   function setUpKeyboardShortcuts() {
      document.addEventListener("keyup", copyAppInfo);         // CTRL + SHIFT + X  // X b/c kind of like copy
      document.addEventListener("keyup", pasteInSearchInfo);   // CTRL + SHIFT + V  // V b/c it's paste
      console.warn(">> set up shortcuts");
   }

   /* Function removeKeyboardShortcuts
      Removes up the keyboard listeners to the page */
   function removeKeyboardShortcuts() {
      document.removeEventListener("keyup", copyAppInfo);
      document.removeEventListener("keyup", pasteInSearchInfo);
      console.log(">> removed shortcuts");
   }

   /* Function addBlurObserver
      Adds a blur observer to an element, with input stripping given via the
      filter regex */
   function addBlurObserver(el, filter){
      if(typeof filter == "object" && filter.test){
         return
      }
   }
   /* Function setUpInputBlurListeners
      Sets up the onblur listeners that run to remove special chars */
   function setUpInputBlurListeners() {
      searchBarOps.getMBIField().on("blur",mbiFieldOnBlurFilter);
      searchBarOps.getFirstNameField().on("blur",firstNameFieldOnBlurFilter);
      searchBarOps.getLastNameField().on("blur",lastNameFieldOnBlurFilter);
      // searchBarOps.getDOBField().on("blur",dobFieldOnBlurFilter);
      searchBarOps.getConfirmationNumField().on("blur",confNumFieldOnBlurFilter);
      searchBarOps.getLeadIdField().on("blur",leadIdFieldOnBlurFilter);
      // searchBarOps.getPhoneNumField().on("blur",phoneNumFieldOnBlurFilter);
      searchBarOps.getEmailField().on("blur",emailFieldOnBlurFilter);
      searchBarOps.getZipField().on("blur",zipFieldOnBlurFilter);
      console.warn(">> set up onblur listeners");
   }

   /* Function removeUpInputBlurListeners
      Remove the onblur listeners that run to remove special chars */
   function removeUpInputBlurListeners() {
      searchBarOps.getMBIField().off("blur",mbiFieldOnBlurFilter);
      searchBarOps.getFirstNameField().off("blur",firstNameFieldOnBlurFilter);
      searchBarOps.getLastNameField().off("blur",lastNameFieldOnBlurFilter);
      // searchBarOps.getDOBField().off("blur",dobFieldOnBlurFilter);
      searchBarOps.getConfirmationNumField().off("blur",confNumFieldOnBlurFilter);
      searchBarOps.getLeadIdField().off("blur",leadIdFieldOnBlurFilter);
      // searchBarOps.getPhoneNumField().off("blur",phoneNumFieldOnBlurFilter);
      searchBarOps.getEmailField().off("blur",emailFieldOnBlurFilter);
      searchBarOps.getZipField().off("blur",zipFieldOnBlurFilter);
      console.log(">> removed onblur listeners");
   }
   /* Function unload
      Removes the keyboard listeners from the page */
   function unload() {
      unloadAllManagedMutators();
      removeKeyboardShortcuts();
      removeUpInputBlurListeners();
      removeNextSearchButton();

      tep.ranSetup = false;
   }

   /* Function addPageEls
      Adds the custom page elements that increase the functionality */
   function addPageEls(){
      recreateCopyPhoneBtn();
      addCopyPhoneButton();

      recreateEocDocLink();
      addEocDocLink();
   }

  /*** MISC ***/

   /* Function getByDataTestSel */
   function getByDataTestSel(val, el=null) {
      if(typeof val == "string") {
         if(el != null) {
            return jq(el).find("[data-test-selector='"+val+"']");
         } else {
            return jq("[data-test-selector='"+val+"']");
         }
      } else {
         return null;
      }
   }

   /* Function isCustomerLoaded
      Returns if there is a current customer loaded into the view */
   function isCustomerLoaded(){
      var appEl =  jq("app-member")
      return appEl == null ? false : appEl.length > 0;
   }


/*** GETTERS & SETTERS ***/

   // GENERAL SETTER FN'S //

   /* Function setInputField
      Generic setter for all input fields */
   function setInputField(input, val) {
      var evtConfig = {
         bubbles: true,
         cancelBubble: false,
         cancelable: false,
         composed: true,
         currentTarget: null,
         data: val,
         dataTransfer: null,
         defaultPrevented: false,
         inputType: "insertText",
         srcElement: input,
         target: input,
         type: "input"
      }

      if(input.val != undefined) {
         input.val(val);
         input[0].dispatchEvent(new Event('input',evtConfig));
      } else {
         input.value = val;
         input.dispatchEvent(new Event('input',evtConfig));
      }
   }

   /* Function setDDField
      Gets the First Name field */
   // function searchBarOps.setDDField(input, val) {
   //    var ddContainer = jq(".abyss-select-input-portal-container");
   // }

  // SEARCH BAR GETTERS/SETTERS //

   /* An object that collects all the getters/setters for the search bar */
   searchBarOps = {};

   // MBI //
   /* Function getMBIField
      Gets the First Name field */
   searchBarOps.getMBIField = function() {
      return jq('input[formcontrolname="medicareBeneficiaryIdentifier"]');
   }

   /* Function setMBIField
      Sets the First Name field */
   searchBarOps.setMBIField = function (val="") {
      var field = searchBarOps.getMBIField(),
          modifiedVal;

      if(val != "") {
         modifiedVal = val.toUpperCase().replaceAll(/\-| /g,"");
      }

      setInputField(field,modifiedVal);
      return field.val() == modifiedVal;
   }

   /* Function mbiFieldOnBlurFilter
      Removes characters not allowed in the input */
   function mbiFieldOnBlurFilter(){
      searchBarOps.setMBIField(searchBarOps.getMBIField().val().replaceAll(/[^\da-zA-Z]/g,"").trim());
   }

   // FIRST NAME //
   /* Function getFirstNameField
      Gets the First Name field */
   searchBarOps.getFirstNameField = function () {
      return jq('input[formcontrolname="firstName"]');
   }

   /* Function setFirstNameField
      Sets the First Name field */
   searchBarOps.setFirstNameField = function (val) {
      var field = searchBarOps.getFirstNameField();
      setInputField(field,val);
      return field.val() == val;
   }

   /* Function firstNameFieldOnBlurFilter
      Removes characters not allowed in the input */
   function firstNameFieldOnBlurFilter(){
      searchBarOps.setFirstNameField(searchBarOps.getFirstNameField().val().trim().replace(/ [a-zA-Z]\.?/,"").replaceAll(/[^a-zA-Z ]/g,""));
   }

   // LAST NAME //
   /* Function getLastNameField
      Gets the First Name field */
   searchBarOps.getLastNameField = function () {
      return jq('input[formcontrolname="lastName"]');
   }

   /* Function setLastNameField
      Sets the First Name field */
   searchBarOps.setLastNameField = function (val) {
      var field = searchBarOps.getLastNameField();
      setInputField(field,val);
      return field.val() == val;
   }

   /* Function lastNameFieldOnBlurFilter
      Removes characters not allowed in the input */
   function lastNameFieldOnBlurFilter(){
      searchBarOps.setLastNameField(searchBarOps.getLastNameField().val().trim().replace(/ [a-zA-Z]\.?/,"").replaceAll(/[^a-zA-Z ]/g,""));
   }

   // DOB //
   /* Function getDOBField
      Gets the First Name field */
   searchBarOps.getDOBField = function () {
      return jq('input[formcontrolname="dateOfBirth"]');
   }

   /* Function setDOBField
      Sets the First Name field */
   searchBarOps.setDOBField = function (val) {
      var moddedVal = val.replaceAll(/[\.\-]/g,"/"),
          field = searchBarOps.getDOBField();

      if(/\d{4}\/\d\d?\/\d\d?/.test(moddedVal)) {
         moddedVal = moddedVal.replace(/(\d{4})\/(\d\d?\/\d\d?)/,"$2/$1");
      } else if(!/(\d\d?\/\d\d?\/(\d{4}))/.test(moddedVal)){
         moddedVal = moddedVal.replace(/^(\d\d?\/\d\d?\/)(\d\d)$/,"$119$2");
      }

      field.val(moddedVal);
      field[0].dispatchEvent(new Event('input'));

      return searchBarOps.getDOBField().val() == moddedVal;
   }

   /* Function dobFieldOnBlurFilter
      Removes characters not allowed in the input */
   // function dobFieldOnBlurFilter(){
   //    searchBarOps.setDOBField(searchBarOps.getDOBField().val().replaceAll(/[^a-z ]/g,"").trim());
   // }

   // CONF NUMBER //
   /* Function getConfirmationNumField */
   searchBarOps.getConfirmationNumField = function () {
      return jq('input[formcontrolname="confirmationNumber"]');
   }

   /* Function setConfirmationNumField
      Sets the First Name field */
   searchBarOps.setConfirmationNumField = function (val) {
      var field = searchBarOps.getConfirmationNumField();
      setInputField(field,val);
      field[0].dispatchEvent(new Event('input'));
      return field.val() == val;
   }

   /* Function confNumFieldOnBlurFilter
      Removes characters not allowed in the input */
   function confNumFieldOnBlurFilter(){
      searchBarOps.setConfirmationNumField(searchBarOps.getConfirmationNumField().val().trim());
   }

   // Lead ID //
   /* Function getLeadIdField
      Gets the First Name field */
   searchBarOps.getLeadIdField = function () {
      return jq('input[formcontrolname="leadId"]');
   }

   /* Function setLeadIdField
      Sets the First Name field */
   searchBarOps.setLeadIdField = function (val) {
      var field = searchBarOps.getLeadIdField();
      setInputField(field,val);
      field[0].dispatchEvent(new Event('input'));
      return field.val() == val;
   }

   /* Function leadIdFieldOnBlurFilter
      Removes characters not allowed in the input */
   function leadIdFieldOnBlurFilter(){
      searchBarOps.setLeadIdField(searchBarOps.getLeadIdField().val().replaceAll(/[^\d]/g,"").trim());
   }

   // PHONE NUM //
   /* Function getPhoneNumField
      Gets the First Name field */
   searchBarOps.getPhoneNumField = function () {
      return jq('input[formcontrolname="phoneNumber"]');
   }

   /* Function setPhoneNumField
      Sets the First Name field */
   searchBarOps.setPhoneNumField = function (val) {
      var field = searchBarOps.getPhoneNumField();
      setInputField(field,val);
      field[0].dispatchEvent(new Event('input'));
      return field.val() == val;
   }

   /* Function phoneNumFieldOnBlurFilter
      Removes characters not allowed in the input */
   // function phoneNumFieldOnBlurFilter(){
   //    searchBarOps.setPhoneNumField(searchBarOps.getPhoneNumField().val().replaceAll(/[^a-z ]/g,"").trim());
   // }

   // EMAIL //
   /* Function getEmailField */
   searchBarOps.getEmailField = function () {
      return jq('input[formcontrolname="emailAddress"]');
   }

   /* Function setEmailField
      Sets the First Name field */
   searchBarOps.setEmailField = function (val) {
      var field = searchBarOps.getEmailField();
      setInputField(field,val);
      field[0].dispatchEvent(new Event('input'));
      return field.val() == val;
   }

   /* Function emailFieldOnBlurFilter
      Removes characters not allowed in the input */
   function emailFieldOnBlurFilter(){
      searchBarOps.setEmailField(searchBarOps.getEmailField().val().trim());
   }

   // ZIP CODE //
   /* Function getZipField */
   searchBarOps.getZipField = function () {
      return jq('input[formcontrolname="zipCode"]');
   }

   /* Function setZipField */
   searchBarOps.setZipField = function (val) {
      var field = searchBarOps.getZipField();
      setInputField(field,val);
      field[0].dispatchEvent(new Event('input'));
      return field.val() == val;
   }

   /* Function zipFieldOnBlurFilter
      Removes characters not allowed in the input */
   function zipFieldOnBlurFilter(){
      searchBarOps.setZipField(searchBarOps.getZipField().val().replaceAll(/[^\d]/g,"").trim());
   }

   /*** CURRENT CUSTOMER GETTERS/SETTES (ON PAGE) ***/
   /* Function getMbi */
   // function getMbi(){
   //    var mbiField;
   //    if(getActiveTabName() == "Member") {
   //       return 
   //    }
   // }

   /* Function getFirstName */
   function getFirstName(){
      if(getActiveTabName() == "Member") {
         return jq("member-info-form text-input[label='First Name'] .readonly-value").html().trim();
      } else if(getActiveTabName() == "Policy") {
         console.warn("implement this");
      } else {
         return "";
      }
   }
   
   /* Function getLastName */
   function getLastName(){
      if(getActiveTabName() == "Member") {
         return jq("member-info-form text-input[label='Last Name'] .readonly-value").html().trim();
      } else if(getActiveTabName() == "Policy") {
         console.warn("implement this");
      } else {
         return "";
      }
   }
   
   /* Function getDob */
   // function getDob(){
   //    var nameField;
   //    if(getActiveTabName() == "Member") {
   //       return searchBarOps.getFirstNameField().val() + " " + searchBarOps.getLastNameField();
   //    }
   // }
   
   /* Function getPhoneNum */
   function getPhoneNum(){
      var nameField;
      if(getActiveTabName() == "Member") {
         return jq('button.readonly-button.icon-wrapper span').html().replace(/[-\(\) ]/g,"");
      } else {
         return "";
      }
   }
   
   /* Function getEmail */
   // function getEmail(){
   //    var nameField;
   //    if(getActiveTabName() == "Member") {
   //       return searchBarOps.getFirstNameField().val() + " " + searchBarOps.getLastNameField();
   //    }
   // }
   
   /* Function getAddress */
   function getAddress(){
      var mainContent = jq('.left-column').next();
      if(getActiveTabName() == "Member") {
         streetAddr = mainContent.find("text-input[label='Primary Address 1'] .readonly-value").html().trim();
         city = mainContent.find("text-input[label='City'] .readonly-value").html().trim();
         state = mainContent.find("dropdown-input[label='State'] .readonly-value").html().trim();
         zip = getZip();
         return streetAddr+' '+city+', '+state+" "+zip;
      }
   }
   
   /* Function getZip */
   function getZip(){
      var nameField;
      if(getActiveTabName() == "Member") {
         return jq('.left-column').next().find("text-input[label='ZIP'] .readonly-value").html().trim();
      }
   }
   
   // FULL NAME //
   /* Function getCuFullName
      Gets the full name of the customer. If it's on the Member page vs Policy page, it gets them differently */
   function getCuFullName() {
      var nameField;
      if(getActiveTabName() == "Member") {
         return searchBarOps.getFirstNameField().val() + " " + searchBarOps.getLastNameField();
      } else if(getActiveTabName() == "Policy") {
         nameField = jq(".labeled-icon").filter(":contains('Issued To')").find(".ng-star-inserted");
         return nameField.html();
      } else {
         return "";
      }
   }

   function checkGetters() {
      console.log("getMBIField", searchBarOps.getMBIField());
      console.log("getFirstNameField", searchBarOps.getFirstNameField());
      console.log("getLastNameField", searchBarOps.getLastNameField());
      console.log("getDOBField", searchBarOps.getDOBField());
      console.log("getConfirmationNumField", searchBarOps.getConfirmationNumField());
      console.log("getLeadIdField", searchBarOps.getLeadIdField());
      console.log("getPhoneNumField", searchBarOps.getPhoneNumField());
      console.log("getEmailField", searchBarOps.getEmailField());
      console.log("getZipField", searchBarOps.getZipField());
   }

   function checkSetters() {
      // console.log("setZipField", searchBarOps.setZipField("28262"));
      // console.log("setFirstNameField", searchBarOps.setFirstNameField("123"));
      // console.log("setLastNameField", searchBarOps.setLastNameField("123"));
      // console.log("setDOBField", searchBarOps.setDOBField("123"));
      // console.log("setMBIField", searchBarOps.setMBIField("123"));
   }

   //// NAVIGATION ////
   /* Function getMemberTab */
   function getMemberTab() {
      var memberTab = jq(".mat-tab-links").children().first().children();
      return memberTab;
   }

   /* Function navToMemberTab */
   function navToMemberTab() {
      getMemberTab().get(0).click();
   }

   /* Function getPolicyTab */
   function getPolicyTab() {
      var policyTab = jq(".mat-mdc-tab-links").children().get(1);
      return jq(policyTab).children();
   }

   /* Function navToPolicyTab */
   function navToPolicyTab() {
      getPolicyTab().get(0).click();
   }

   /* Function getPlanInPolicyTab
      On the Policy tab, it returns the *last* tab (html ref), b/c that's the
      one that is most likely the most recent one. */
   function getPlanInPolicyTab(num = 0) {
      var planList = jq(".mat-tab-label-container .mat-tab-labels").children();
      return jq(planList.get(num));
   }

   /* Function getActiveTabName
      Returns the text label of the active tab */
   function getActiveTabName() {
      var activeTab = jq("a.mdc-tab--active.mdc-tab-indicator--active .mdc-tab__text-label").html().trim()
      return activeTab;
   }

   /* Function setActiveTab
      Sets the active tab based on the name of the tab */
   function setActiveTab(tabName="Member") {
      // var activeTab = jq("a.mat-tab-label-active").html().trim();
      // return activeTab;
   }

   /* Function getActivePolicyPlan */
   function getActivePolicyPlan() {
      // var activeTab = jq("a.mat-tab-label-active").html().trim();
      // return activeTab;
   }

   /* Function setActivePolicyPlan */
   function setActivePolicyPlan(tabName="") {
      // var activeTab = jq("a.mat-tab-label-active").html().trim();
      // return activeTab;
   }

   //// MISC ////

   // CU PHONE NUMBER //
   /* Function getCuPhoneNum
      Gets the cu's phone number */
   function getCuPhoneNum() {
      return jq('button.readonly-button.icon-wrapper span').html().replace(/[-\(\) ]/g,"");
   }


/*** CLICKABLE GETTERS & SETTERS ***/

   /* Function getSearchBtn */
   function getSearchBtn() {
      var el = jq("span.search");
      return el;
   }

   /* Function getSubmitBtn */
   function getSubmitBtn() {
      var el = jq("button.submit-button");
      return el;
   }


/*** PLAN INFO COPY ***/

   /*  Function copyAppInfo
      Event function that selects and copies the correct node containing the cu's processed and formatted info
      The assumption is that it's a vConnect sale, w/a T3 agent. B/c otherwise I'd get it from BO.

      OUTPUT:
         Lead Id: -
         Cu Name:
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
         if(tep.mydebug.isDB()) {
            console.warn(">> debug: at copyAppInfo");
         }

         var appInfo = appInfoGenerator();

         copyStringToClipboard(appInfo);

         return;
      }
   }

   /* Function appInfoGenerator
      Creates the app info string. */
   function appInfoGenerator(){
      var activeTab = getActiveTabName(),
          altAddr = "-", finalString;

      if(activeTab == "Member") {
         // altAddr = getAltAddr();
      }
      console.warn("Alt addr: ",altAddr);

      if(activeTab != "Policy") {
         navToPolicyTab();
      }

      // TODO: make this a fn? TODO: Make it so that it searches through the policies
      //       until it gets one w/the correct sub and eff date, *if* the current one doesn't match
      finalString =
         "Lead Id:\t-"+"\n"+
         "Cu Name:\t"+getCuFullName()+"\n"+
         "T2 Agent:\t"+getAorsName()+"\n"+
         "T3 Agent:\t"+"-"+"\n"+
         "Plan:\t"+getPlanData()+"\n"+
         "SEP:\t"+"-"+"\n"+   // TEP doesn't give an SEP. Boo
         "Sub Date:\t"+getSubDate()+"\n"+
         "Eff Date:\t"+getEffDate()+"\n"+
         "Alt Address:\t"+altAddr;

      return finalString;
   }

   /* Function getAorsName */
   function getAorsName() {
      var el = jq(".label:contains('Agent of Record')").next().children();
      return el.html();
   }

   /* Function getPlanData */
   function getPlanData() {
      var planName = jq(".label:contains('Received Plan')").next().children(),
          planId = jq(".label:contains('Plan Id')").next().children();
      return planName.html()+" "+planId.html().slice(0,9);
   }

   /* Function getSubDate */
   function getSubDate() {
      var el = jq(".label:contains('Enrollment Date')").next().children();
      return el.html();
   }

   /* Function getEffDate */
   function getEffDate() {
      var el = jq(".label:contains('Effective Date')").next().children();
      return el.html();
   }

   /* Function getAltAddr */
   function getAltAddr() {
      var currentTab, primaryAddr, city, state, zip;

      // get which tab I'm on in the policy tab
      currentTab = getActiveTabName()

      // switch to Member
      if(currentTab != "Member") {//we are not on the member tab
         navToMemberTab();
      }

      // get addr
      primaryAddr = jq('.readonly-content:contains("Primary Address 1")').find("span").get(1).innerHTML.trim();
      city = jq('.readonly-content:contains("City")').children().get(1).children[0].innerHTML.trim();
      state = jq('.readonly-content:contains("State")').children().get(1).innerHTML;
      zip = jq('.readonly-content:contains("ZIP")').children().get(1).children[0].innerHTML.trim();

      // switch back
      // setActiveTab(currentTab)

      return primaryAddr+", "+city+", "+state+" "+zip;
   }


/*** PASTE SEARCH INFO ***/
   /* Function clearForm
      Clears the Mcd form */
   // function clearForm() {
   //    getClearBtn().click();
   // }

   /* Function pasteInSearchInfo
      Takes the info copied from ZD and pastes it into the correct fields */
   function pasteInSearchInfo(evt) {
      // CTRL + SHIFT + V // V b/c it's paste
      if (evt.ctrlKey && evt.shiftKey && evt.which == 86) {
         console.log(">> ran pasteInSearchInfo");
         navigator.clipboard
            .readText()
            .then((clipText) => {
               if(searchIsHidden()) {
                  getSearchBtn().click();
               }
               var cuInfoObj = getObjFromCopiedText(clipText),
                   fillSuccessful;

               // clearForm(); // not needed, b/c it auto-clears
               cuSearchData.load(cuInfoObj);
               fillSuccessful = fillFields(cuInfoObj);
               if(fillSuccessful) submitIfComplete();
            });
      }

   }

   /* Function searchIsHidden
      Tells if the search options are visible or not*/
   function searchIsHidden() {
      return jq(".search-wrapper.hidden").length > 0;
   }

   /* Function fillFields
      Adds info from data object provided to MBI, name fields, and DOB.
      This is usually enough for most searches, and too much data could
      result in a failed search */
   function fillFields(data) {
      if(typeof data != "object") {
         console.warn("Could not fill fields. Data is not an object");
         return false;
      }

      if(data.firstName != "" && data.firstName != undefined) {
         searchBarOps.setFirstNameField(data.firstName);
      }

      if(data.lastName != "" && data.lastName != undefined) {
         searchBarOps.setLastNameField(data.lastName);
      }

      if(data.dob != "" && data.dob != undefined) {
         searchBarOps.setDOBField(data.dob);
      }


      if(data.mbi != "" && data.mbi != undefined) {
         searchBarOps.setMBIField(data.mbi);
      }

      return formIsComplete();
   }

   /*** SUBMIT IF COMPLETE ***/

   /* Function formIsComplete
      Checks if all required fields have been filled.
      TEP has several different criteria, so I'm just checking the most obvious ones */
   function formIsComplete() {
      var isValid = false,
          firstName = searchBarOps.getFirstNameField().val(),
          lastName  = searchBarOps.getLastNameField().val(),
          dob = searchBarOps.getDOBField().val(),
          mbi = searchBarOps.getMBIField().val(),
          isValidMBI = /[0-9][AC-HJKMNP-RT-Y][0-9AC-HJKMNP-RT-Y][0-9]\-?[AC-HJKMNP-RT-Y][0-9AC-HJKMNP-RT-Y][0-9]\-?[AC-HJKMNP-RT-Y]{2}[0-9]{2}/i.test(mbi);

      isValid = (firstName.length > 2 && lastName.length > 2 && mbi != "")
             // || (leadId != "")
             || (mbi != "" && dob != "");

      console.log("Auto submit " + (isValid ? "succeeded" : "failed"),
         "firstName", firstName != "", "lastName", lastName != "", "dob", dob != "", "mbi", mbi != "");

      return isValid;
   }

   /* Function submitIfComplete
      Checks if all required fields have been filled, and if so, it submits the search */
   function submitIfComplete() {
      console.log(">> 1 attempted submit");
      if(formIsComplete()) {
         console.log(">> 2 attempted debounced initiateSearch", debouncedInitiateSearch, "<< fn");
         debouncedInitiateSearch();
      }
   }

   /* Function debouncedInitiateSearch
      Triggers the search, but wrapped in front-ended debounce to prevent multiple clicks */
   debouncedInitiateSearch = debounce(()=> {
      console.log(">> 3 ran initiateSearch");
      var submitButton = getSubmitBtn();
      if(submitButton != null) {
         submitButton.click();
      }
   },3000,{leading:true});


/*** NEXT/PREV SEARCH BUTTON ***/
   /* Function addNextSearchBtnHtml
      Adds the search button. This button allows a user to cycle through
      the different search options by clicking on it*/
   function addNextSearchBtnHtml(){
      var cssText, cssEl, domEl, beforeEl;
      removeNextSearchButton();

      // CSS EL
      cssText = `
         .nextSearchContainer {
            background: linear-gradient(135deg, #0092FE, #0064FE);
            border-radius: 22px;
         }

         .specialSearchButton {
            /* size and positioning */
            height: 44px;
            width: 52px;
            padding: 0;

            /* text details */
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 0;
            line-height: 22px;
            text-align: center;
            color: var(--color-white);

            /* appearance */
            border: none;
            outline: 0;
            cursor: pointer;
            background: #11ffee00;
         }
         .specialSearchButton:hover {
            background: #00000040;
         }

         .prevSearchButton {
            border-radius: 22px 0px 0px 22px;
         }

         .searchNumDisplayButton {
            width: 28px;
         }

         .nextSearchButton {
         }

         .clearSearchButton.specialSearchButton {
            width: 48px;
            background: brown;
            padding-right: 5px;
            border-radius: 0px 22px 22px 0px;
         }
         .clearSearchButton.specialSearchButton:hover {
            background: #00000040; /* make it a kind of red */
         }`,
      cssEl = jq(addCssEl(cssText));
      cssEl.addClass("nextSearchContainerCss");

      // HTML EL
      domEl = jq(`
         <div class="nextSearchContainer">
            <button class="specialSearchButton prevSearchButton" onclick='prevSearchBtnOnClick()'>◄◄</button>
            <button class="specialSearchButton searchNumDisplayButton">-</button>
            <button class="specialSearchButton nextSearchButton" onclick='nextSearchBtnOnClick()'>►►</button>
            <button class="specialSearchButton clearSearchButton" onclick='clearSearch()'>🗙</button>
         </div>
         `);

      beforeEl = jq(".submit-button");
      domEl.insertBefore(beforeEl);
   }

   /* Function nextSearchBtnOnClick
      Increments the search # in the search option (including .5 options) */
   function nextSearchBtnOnClick(){
      var currentSearchNum = getSearchNumber();

      clearSearchFields();
      // get what the next search # is
      // get the fields needed
      // input the data into those fields
      // searchIfComplete? Give it a # to compare completeness?
      // highlight the validation? or the inputs used?
   }
   /* Function prevSearchBtnOnClick
      Decrements the search # in the search option (including .5 options) */
   function prevSearchBtnOnClick(){
      // update search #
      // clear the search
      // get what the next search # is
      // get the fields needed
      // input the data into those fields
      // searchIfComplete? Give it a # to compare completeness?
      // highlight the validation? or the inputs used?
   }

   /* Function clearSearch
      Clears the customer data object and the fields, too */
   function clearSearch(){
      cuSearchData.clear();
      clearSearchFields();
      setSearchNumberVisual("-");
   }

   /* Function clearSearchFields
      Clears the customer data object and the fields, too */
   function clearSearchFields(){
      searchBarOps.setMBIField("");
      searchBarOps.setFirstNameField("");
      searchBarOps.setLastNameField("");
      searchBarOps.setDOBField("");
      searchBarOps.setConfirmationNumField("");
      searchBarOps.setLeadIdField("");
      searchBarOps.setPhoneNumField("");
      searchBarOps.setEmailField("");
      searchBarOps.setZipField("");
   }

   /* Function setSearchNumberVisual
      Sets the number displayed in the search # el*/
   function setSearchNumberVisual(){

   }

   /* Function getSearchNumber
      Gets the number displayed in the search # el*/
   function getSearchNumber(){

   }

   /* Function removeNextSearchButton
      Removes the next search button set */
   function removeNextSearchButton(){
      jq(".nextSearchContainer").remove();
      jq(".nextSearchContainerCss").remove();
   }


/*** CU SEARCH DATA MANAGEMENT ***/
   cuSearchData = {
      _data: {}
   };

   /* Function load
      Loads the cu's data into the global cu data obj.
      Completely overwrites all the data. */
   cuSearchData.load = function (data) {
      var myData = {};

      cuSearchData.clear();

      if(data.mbi != "" && data.mbi != undefined) {
         myData.mbi = data.mbi;
      }

      if(data.firstName != "" && data.firstName != undefined) {
         myData.firstName = data.firstName;
      }

      if(data.lastName != "" && data.lastName != undefined) {
         myData.lastName = data.lastName;
      }

      if(data.dob != "" && data.dob != undefined) {
         myData.dob = data.dob;
      }

      if(data.confNum != "" && data.confNum != undefined) {
         myData.confNum = data.confNum;
      }

      if(data.leadId != "" && data.leadId != undefined) {
         myData.leadId = data.leadId;
      }

      if(data.phoneNum != "" && data.phoneNum != undefined) {
         myData.phoneNum = data.phoneNum;
      }

      if(data.email != "" && data.email != undefined) {
         myData.email = data.email;
      }

      if(data.zip != "" && data.zip != undefined) {
         myData.zip = data.zip;
      } else if(typeof data.address == "string") {
         myData.zip = data.zip.match(/\d{5}$/)[0]; // TODO: fix this?
      }

      cuSearchData._data = myData;
      console.log("loaded cu data", myData);
   }
   /* Function get
      Updates the cu's data into the global cu data obj */
   cuSearchData.get = function (key) {
      return cuSearchData._data[key];
   }
   /* Function update
      Updates the cu's data into the global cu data obj */
   cuSearchData.update = function (key, data) {

      console.log("updated cu data", myData);
   }
   /* Function clear
      Updates the cu's data into the global cu data obj */
   cuSearchData.clear = function (data) {
      cuSearchData._data = {};
   }


/*** CURRENT CU DATA MANAGEMENT ***/
   currCustData = {
      _data: {}
   };

   /* Function load
      Loads the cu's data into the global cu data obj.
      Completely overwrites all the data. */
   currCustData.load = function (data) {
      var myData = {};

      // Call load when page loads, and when changed to "Policy"

      currCustData.clear();

      if(data.mbi != "" && data.mbi != undefined) {
         myData.mbi = data.mbi;
      }

      if(data.firstName != "" && data.firstName != undefined) {
         myData.firstName = data.firstName;
      }

      if(data.lastName != "" && data.lastName != undefined) {
         myData.lastName = data.lastName;
      }

      if(data.dob != "" && data.dob != undefined) {
         myData.dob = data.dob;
      }

      if(data.confNum != "" && data.confNum != undefined) {
         myData.confNum = data.confNum;
      }

      if(data.leadId != "" && data.leadId != undefined) {
         myData.leadId = data.leadId;
      }

      if(data.phoneNum != "" && data.phoneNum != undefined) {
         myData.phoneNum = data.phoneNum;
      }

      if(data.email != "" && data.email != undefined) {
         myData.email = data.email;
      }

      if(data.address != "" && data.address != undefined) {
         myData.address = data.address;
      }

      if(data.zip != "" && data.zip != undefined) {
         myData.zip = data.zip;
      } else if(typeof data.address == "string") {
         myData.zip = data.zip.match(/\d{5}$/)[0]; // TODO: fix this?
      }

      currCustData._data = myData;
      console.log("loaded cu data", myData);
   }

   /* Function loadFromPage
      Loads the cu's data into the global cu data obj.
      Completely overwrites all the data. */
   currCustData.loadFromPage = function () {
      var myData = {};

      currCustData.clear();

      if(getActiveTabName() == "Member") {
         myData.mbi       = getMBI();
         myData.firstName = getFirstName();
         myData.lastName  = getLastName();
         myData.dob       = getDob();
         myData.phoneNum  = getPhoneNum();
         myData.email     = getEmail();
         myData.address   = getAddress();
         myData.zip       = getZip();
      } else if(getActiveTabName() == "Policy") {

      }



      currCustData._data = myData;
      console.log("loaded cu data", myData);
   }

   /* Function get
      Updates the cu's data into the global cu data obj */
   currCustData.get = function (key) {
      return currCustData._data[key];
   }
   /* Function update
      Updates the cu's data into the global cu data obj */
   currCustData.update = function (key, data) {

      console.log("updated cu data", myData);
   }
   /* Function clear
      Updates the cu's data into the global cu data obj */
   currCustData.clear = function (data) {
      currCustData._data = {};
   }


/*** NEXT SEARCH LOGIC ***/

   // TODO: Highlight which one we're on in the "minimum search criteria"
   // TODO: Reset cu's info on a successful paste
   // TODO: Reset cu's info on a keyup when typing in the box

   /* Function runNextSearch
      Runs the next search in the list.
      1. Lead ID
      2. MBI and Date of Birth
      3. MBI and a minimum of the first 2 characters of the first name and first 2 characters of the last name
      4. Email Address, Phone Number, Date of Birth, and first 2 characters of the last name
      5. Date of Birth, and a minimum of the first 2 characters of the first name and first 2 characters of the last name
      6. Phone Number, Zip Code and Date of Birth
      7. Phone Number and Date of Birth
      8. Enrollment Confirmation Number and Date of Birth
   */
   function runNextSearch() {

   }

   /* Function fillSearchForm
      Fills the search form with the given option from the stored customer info */
   function fillSearchForm(input){
      var stringedInput = input + "";

      switch(stringedInput) {
      case "1": fillSearchFormOpt1(); break;
      case "2": fillSearchFormOpt2(); break;
      case "3": fillSearchFormOpt3FullName(); break;
      case "3b": fillSearchFormOpt3(); break;
      case "4": fillSearchFormOpt4FullName(); break;
      case "4b": fillSearchFormOpt4(); break;
      case "5": fillSearchFormOpt5FullName(); break;
      case "5b": fillSearchFormOpt5(); break;
      case "6": fillSearchFormOpt6(); break;
      case "7": fillSearchFormOpt7(); break;
      case "8": fillSearchFormOpt8(); break;
      default: console.warn("Didn't find a search option based on input: ", input, "/ "+stringedInput);
      }
   }

   //// SEARCH FORM FILL METHODS ////

   /* Function fillSearchFormOpt1
      Fills the search form with the given option from the stored customer info.
      Lead ID*/
   function fillSearchFormOpt1(cuDataObj){
      searchBarOps.setLeadIdField(cuDataObj.leadId); // TODO: Make sure this is the right spelling
   }
   /* Function fillSearchFormOpt2
      Fills the search form with the given option from the stored customer info.
      MBI and Date of Birth*/
   function fillSearchFormOpt2(cuDataObj){
      searchBarOps.setMBIField(cuDataObj.mbi);
      searchBarOps.setDOBField(cuDataObj.dob);
   }
   /* Function fillSearchFormOpt3
      Fills the search form with the given option from the stored customer info.
      MBI and a minimum of the first 2 characters of the first name and first 2 characters of the last name*/
   function fillSearchFormOpt3(cuDataObj){
      searchBarOps.setMBIField(cuDataObj.mbi);
      searchBarOps.setFirstNameField(cuDataObj.firstName.slice(2));
      searchBarOps.setLastNameField(cuDataObj.lastName.slice(2));
   }
   /* Function fillSearchFormOpt3FullName
      Fills the search form with the given option from the stored customer info.
      MBI and a minimum of the first 2 characters of the first name and first 2 characters of the last name*/
   function fillSearchFormOpt3FullName(cuDataObj){
      searchBarOps.setMBIField(cuDataObj.mbi);
      searchBarOps.setFirstNameField(cuDataObj.firstName);
      searchBarOps.setLastNameField(cuDataObj.lastName);
   }
   /* Function fillSearchFormOpt4
      Fills the search form with the given option from the stored customer info.
      Email Address, Phone Number, Date of Birth, and first 2 characters of the last name*/
   function fillSearchFormOpt4(cuDataObj){
      searchBarOps.setEmailField(cuDataObj.email);
      searchBarOps.setPhoneNumField(cuDataObj.phoneNumber);
      searchBarOps.setDOBField(cuDataObj.dob);
      searchBarOps.setLastNameField(cuDataObj.lastName.slice(2));
   }
   /* Function fillSearchFormOpt4FullName
      Fills the search form with the given option from the stored customer info.
      Email Address, Phone Number, Date of Birth, and first 2 characters of the last name*/
   function fillSearchFormOpt4FullName(cuDataObj){
      searchBarOps.setEmailField(cuDataObj.email);
      searchBarOps.setPhoneNumField(cuDataObj.phoneNumber);
      searchBarOps.setDOBField(cuDataObj.dob);
      searchBarOps.setLastNameField(cuDataObj.lastName);
   }
   /* Function fillSearchFormOpt5
      Fills the search form with the given option from the stored customer info.
      Date of Birth, and a minimum of the first 2 characters of the first name and first 2 characters of the last name*/
   function fillSearchFormOpt5(cuDataObj){
      searchBarOps.setDOBField(cuDataObj.dob);
      searchBarOps.setFirstNameField(cuDataObj.firstName.slice(2));
      searchBarOps.setLastNameField(cuDataObj.lastName.slice(2));
   }
   /* Function fillSearchFormOpt5FullName
      Fills the search form with the given option from the stored customer info.
      Date of Birth, and a minimum of the first 2 characters of the first name and first 2 characters of the last name*/
   function fillSearchFormOpt5FullName(cuDataObj){
      searchBarOps.setDOBField(cuDataObj.dob);
      searchBarOps.setFirstNameField(cuDataObj.firstName);
      searchBarOps.setLastNameField(cuDataObj.lastName);
   }
   /* Function fillSearchFormOpt6
      Fills the search form with the given option from the stored customer info.
      Phone Number, Zip Code and Date of Birth*/
   function fillSearchFormOpt6(cuDataObj){
      searchBarOps.setPhoneNumField(cuDataObj.phoneNumber);
      searchBarOps.setZipField(cuDataObj.address);
      searchBarOps.setDOBField(cuDataObj.dob);
   }
   /* Function fillSearchFormOpt7
      Fills the search form with the given option from the stored customer info.
      Phone Number and Date of Birth*/
   function fillSearchFormOpt7(cuDataObj){
      searchBarOps.setPhoneNumField(cuDataObj.phoneNumber);
      searchBarOps.setDOBField(cuDataObj.dob);
   }
   /* Function fillSearchFormOpt8
      Fills the search form with the given option from the stored customer info.
      Enrollment Confirmation Number and Date of Birth*/
   function fillSearchFormOpt8(cuDataObj){
      searchBarOps.setConfirmationNumField(cuDataObj.confirmationNum);
      searchBarOps.setDOBField(cuDataObj.dob);
   }


/*** COPY PHONE NUM BUTTON ***/
   /* Function addCopyPhoneButton
      Inserts a button that lets people copy the phone number with a click*/
   function addCopyPhoneButton(){

      // ADD CSS
      cssText = `
         .phone-copy-button button.blue_filled {
            height: 26px;
            width: 26px;
            margin: -26px 0 0 25px;
            padding: 0px;
            min-width: 0;
            border-radius: 7px;
            line-height: 27px;
            position: absolute;
         }
         button.readonly-button.icon-wrapper {
            max-width: 56%;
         }
      `;

      if(jq("#phone_copy_btn_css").length == 0) {
         cssEl = addCssEl(cssText);
         cssEl.id = "phone_copy_btn_css";
      }

      // GET ANY INFO THAT IS NEEDED

      // CREATE ELEMENT
      copyBtn = jq(`
         <div id="phone_copy_btn" class="phone-copy-button rounded-button-container">
            <app-button type="button" class="blue_filled">
               <button type="button" class="blue_filled">
                  <div class="">⧉</div>
               </button>
            </app-button>
         <div>`);
      copyBtn.find("button").on("click",copyPhoneNumber);

      // GET REFERENCE ELEMENT/INSERTION POINT
      phoneNumEl = jq("button.readonly-button.icon-wrapper");

      // INSERT ELEMENTS
      phoneNumEl.after(copyBtn);
   }

   /* Function recreateCopyPhoneBtn
      When tabs change, btn disappears fix */
   function recreateCopyPhoneBtn(){
      if(typeof globalCopyPhoneMuta != "undefined") {    // TODO: Fix this awful hack
         globalCopyPhoneMuta.managedDisconnect();
      }

      console.log(jq(".mat-mdc-tab-links"));

      globalCopyPhoneMuta = addManagedMutationObs(
         jq(".mat-mdc-tab-links"),
         addCopyPhoneButton
      );

   }
   /* Function removeCopyPhoneButton
      Removes the button */
   function removeCopyPhoneButton(){
      jq("#phone_copy_btn_css").remove();
      jq("#phone_copy_btn").remove();
   }

   /* Function copyPhoneNumber
      Copies the cu's phone number into the clipboard.
      Returns a promise. */
   function copyPhoneNumber(){
      return copyStringToClipboard(getCuPhoneNum());
   }


/*** EOC LINK ***/

   /* Function addEocDocLink
      Adds the EOC link to the Policy page */
   function addEocDocLink(){
      var planIdNeighbor, planIdEl, planId,
          planNameNeighbor, planNameEl, carrier,
          docsLinkEl, cssText, cssEl;

         // TODO: Under construction
            // WHAT ABOUT MULT POLICY PAGES?

      activeTabName = getActiveTabName();

      if(activeTabName != "Policy") {
         return false;
      }

      // ADD CSS
      cssText = `
         a.benefits-eoc-link {
            width: 200px;
            display: flex;
            flex: 1 1 0;
            align-items: center;
            cursor: pointer;
            text-decoration: none;
         }

         a.benefits-eoc-link[disabled] {
            color: gray;
         }

         a.benefits-eoc-link[disabled] .st3 {
            fill: gray;
         }

         .eoc-link-label {
            flex: none;
            padding-left: 9px;
            color: var(--color-blue-100);
         }

         .doc-link-container {
            display: flex;
            flex-direction: row;
         }
      `;

      if(jq("#plan_docs_css").length == 0) {
         cssEl = addCssEl(cssText);
         cssEl.id = "plan_docs_css";
      }

      // ADD ELEMENTS
      planIdNeighbor = jq(".label:contains('Plan Id')");
      if(planIdNeighbor.length == 0) {
         console.error("Couldn't get contract id element");
      } else {
         planIdEl = planIdNeighbor.next().children();
         planId = planIdEl.html();
      }

      planNameNeighbor = jq(".label:contains('Received Plan')");
      if(planNameNeighbor.length == 0) {
         console.error("Couldn't get plan name element");
      } else {
         planNameEl = planNameNeighbor.next().children();
         carrier = planNameEl.html().replace(/ .*/,"");
      }

      docLink = createEocLink(planId, carrier);

      docsLinkEl = jq(`
      <div id="doc_link_container" class="doc-link-container">
         <a id="eoc_link" target="_blank" class="benefits-eoc-link ng-star-inserted" ${docLink === false ? 'disabled="true"':'href=\''+docLink+'\'"'}>
            <mat-icon role="img" svgicon="pdf" class="mat-icon notranslate benefits-summary__pdf-icon mat-icon-no-color" aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="pdf">
               <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable=">
                  <g id="XMLID_16_">
                     <polyline id="XMLID_19_" class="st0" points="404.25,1.26 404.11,1.26 505.95,107.45 505.95,510.74 125.81,510.74 125.81,512 507.21,512 507.21,108.71 404.25,1.26"></polyline>
                     <polyline id="XMLID_20_" class="st1" points="402.85,0 124.54,0 124.54,510.74 505.95,510.74 505.95,107.45 402.85,0"></polyline>
                     <polygon id="XMLID_39_" class="st2" points="121.74,27.35 4.89,27.35 4.89,152.2 121.74,152.2 372.41,152.2 372.41,27.35"></polygon>
                     <rect id="XMLID_30_" x="7.27" y="25.25" class="st3" width="367.1" height="124.98"></rect>
                     <g id="XMLID_2_">
                        <path id="XMLID_35_" class="st4" d="M125.53,88.23c-0.56,0-1.12,0-1.68,0V61.16h3.51c4.07,0,6.59,1.26,8.42,3.37
                           c2.24,2.52,3.37,7.01,3.37,10.24c0,4.49,0,8.56-4.07,11.5C132.96,87.81,129.45,88.23,125.53,88.23 M129.03,46.29
                           c-0.14,0-0.42,0-0.56,0c-1.82,0-3.09,0-3.79,0h-19.5v87.81h18.8v-29.6l4.21,0.28c4.35,0,8.28-0.98,11.78-2.1
                           c3.51-1.12,6.45-3.09,8.98-5.33c2.52-2.24,4.91-5.05,6.17-8.28c1.96-4.91,2.38-11.78,1.96-16.55c-0.56-4.77-0.7-8.7-2.1-11.78
                           c-1.4-3.09-3.23-5.61-5.33-7.57c-2.24-1.96-4.63-3.37-7.15-4.35c-2.67-0.98-5.05-1.54-7.57-1.96
                           C132.68,46.43,130.72,46.29,129.03,46.29"></path>
                        <path id="XMLID_38_" class="st4" d="M189.35,118.11c-0.56,0-1.12,0-1.82,0V62.14c0.14,0,0.14,0,0.28,0c3.79,0,8.56,0,10.94,1.96
                           c2.52,1.96,4.49,4.49,5.89,7.29c1.4,2.95,2.38,6.17,2.52,9.68c0.14,4.07,0,7.29,0,10.1c0,2.67,0,6.03-0.56,9.4
                           c-0.56,3.37-1.68,6.31-3.09,9.26c-1.54,2.81-4.21,4.77-6.59,6.59C194.82,117.69,192.3,118.11,189.35,118.11 M192.72,46.15
                           c-1.96,0-4.07,0.14-5.33,0.14c-2.38,0.14-3.79,0.14-4.35,0.14h-14.31v87.81h16.83c7.43,0,13.61-1.12,18.8-3.23
                           c5.19-2.1,9.26-5.19,12.48-8.98c3.09-3.79,5.47-8.42,6.87-13.75s2.1-11.08,2.1-17.39c0-8.14,0-14.45-1.54-20.62
                           c-1.4-5.61-4.35-10.1-7.43-13.47c-2.95-3.37-6.31-5.75-9.82-7.29s-6.87-2.67-10.1-3.23C195.52,46.15,194.12,46.15,192.72,46.15"></path>
                        <polyline id="XMLID_64_" class="st4" points="282.21,46.43 237.74,46.43 237.74,134.24 256.54,134.24 256.54,99.31 280.25,99.31
                           280.25,83.04 256.54,83.04 256.54,62.7 282.21,62.7 282.21,46.43"></polyline>
                     </g>
                     <path id="XMLID_28_" class="st3" d="M437.21,345.49c-0.14-1.68-1.68-22.02-37.87-21.18c-36.05,0.84-44.89,3.09-44.89,3.09
                        s-26.93-27.35-36.75-48.53c0,0,11.92-34.93,11.36-56.81c-0.56-21.88-5.75-34.51-22.58-34.37c-16.83,0.14-19.22,14.87-17.11,36.75
                        c1.96,19.64,12.2,42.78,12.2,42.78s-7.72,24.13-18.1,48.25c-10.24,24.13-17.25,36.75-17.25,36.75s-34.79,11.64-49.8,25.67
                        s-21.18,24.83-13.33,35.63c6.87,9.26,30.72,11.36,52.18-16.69c21.32-28.05,31-45.59,31-45.59s32.68-8.98,42.78-11.36
                        c10.1-2.38,22.44-4.35,22.44-4.35s29.74,30.02,58.49,28.9C438.76,363.31,437.35,347.18,437.21,345.49z M210.53,408.76
                        c-17.81-10.66,37.45-43.63,47.55-44.75C258.08,364.01,229.33,419.98,210.53,408.76z M295.54,216.58c0-17.39,5.61-22.02,9.96-22.02
                        c4.35,0,9.26,2.1,9.4,17.11c0.14,15.01-9.4,44.47-9.4,44.47C302.27,252.63,295.54,233.84,295.54,216.58z M318.68,335.4
                        c-17.96,4.35-26.93,8.98-26.93,8.98s0,0,7.29-16.41c7.29-16.41,14.87-38.86,14.87-38.86c10.1,18.94,30.3,41.24,30.3,41.24
                        S336.64,330.91,318.68,335.4z M361.75,333.85c0,0,58.35-10.52,58.35,9.4C420.1,363.03,383.91,354.89,361.75,333.85z"></path>
                     <polygon id="XMLID_44_" class="st0" points="401.44,1.4 401.44,108.85 504.55,108.85"></polygon>
                     <polygon id="XMLID_21_" class="st1" points="402.85,0 402.85,107.45 505.95,107.45"></polygon>
                     <g id="XMLID_23_">
                        <path id="XMLID_43_" class="st5" d="M124.12,86.83c-0.56,0-1.12,0-1.68,0V59.76h3.51c4.07,0,6.59,1.26,8.42,3.37
                           c2.24,2.52,3.37,7.01,3.37,10.24c0,4.49,0,8.56-4.07,11.5C131.56,86.41,128.05,86.83,124.12,86.83 M127.63,44.89
                           c-0.14,0-0.42,0-0.56,0c-1.82,0-3.09,0-3.79,0h-19.5v87.81h18.8v-29.6l4.21,0.28c4.35,0,8.28-0.98,11.78-2.1
                           c3.51-1.12,6.45-3.09,8.98-5.33c2.52-2.24,4.91-5.05,6.17-8.28c1.96-4.91,2.38-11.78,1.96-16.55c-0.56-4.77-0.7-8.7-2.1-11.78
                           c-1.4-3.09-3.23-5.61-5.33-7.57c-2.24-1.96-4.63-3.37-7.15-4.35c-2.67-0.98-5.05-1.54-7.57-1.96
                           C131.28,45.03,129.31,44.89,127.63,44.89"></path>
                        <path id="XMLID_32_" class="st5" d="M187.95,116.71c-0.56,0-1.12,0-1.82,0V60.74c0.14,0,0.14,0,0.28,0c3.79,0,8.56,0,10.94,1.96
                           c2.52,1.96,4.49,4.49,5.89,7.29c1.4,2.95,2.38,6.17,2.52,9.68c0.14,4.07,0,7.29,0,10.1c0,2.67,0,6.03-0.56,9.4
                           c-0.56,3.37-1.68,6.31-3.09,9.26c-1.54,2.81-4.21,4.77-6.59,6.59C193.42,116.29,190.89,116.71,187.95,116.71 M191.31,44.75
                           c-1.96,0-4.07,0.14-5.33,0.14c-2.38,0.14-3.79,0.14-4.35,0.14h-14.31v87.81h16.83c7.43,0,13.61-1.12,18.8-3.23
                           c5.19-2.1,9.26-5.19,12.48-8.98c3.09-3.79,5.47-8.42,6.87-13.75s2.1-11.08,2.1-17.39c0-8.14,0-14.45-1.54-20.62
                           c-1.4-5.61-4.35-10.1-7.43-13.47c-2.95-3.37-6.31-5.75-9.82-7.29s-6.87-2.67-10.1-3.23C194.12,44.75,192.72,44.75,191.31,44.75"></path>
                        <polyline id="XMLID_24_" class="st5" points="280.81,45.03 236.34,45.03 236.34,132.84 255.14,132.84 255.14,97.91 278.84,97.91
                           278.84,81.64 255.14,81.64 255.14,61.3 280.81,61.3 280.81,45.03"></polyline>
                     </g>
                  </g>
               </svg>
            </mat-icon>
            <span class="eoc-link-label">Evidence of Coverage</span>
         </a>
      <div>
      `);

      // Insert it after, b/c that's the right place. Then move it inside the element
      jq('.benefits-summary__wrapper').parent().append(docsLinkEl);
      jq('.benefits-summary__wrapper').prependTo(docsLinkEl);
   }

   /* Function createEocLink
      Creates the EOC link for a given carrier
      Returns false if a link cannot be created */
   function createEocLink(planId, carrier){
      var eocUrl, hasDocLink;

      switch(carrier) {
      case "Aetna":
         moddedPlanId = planId.replaceAll("-","_");   // url uses underscores
         eocUrl = ``;
         hasDocLink = false;
         break;

      case "Anthem":
      case "Wellpoint":
         moddedPlanId = planId.replaceAll("-","_");   // url uses underscores
         eocUrl = ``;
         hasDocLink = false;
         break;

      case "UHC":
      case "United":
         moddedPlanId = planId.replaceAll("-","_").replace(/0+(\d)$/,"$1");   // url uses underscores
         eocUrl = `https://cdn.gohealth.com/shopping/medicare-resources/2025/evidence-of-coverage-documents/560/${moddedPlanId}_evidence_of_coverage.pdf`;
         break;

      case "Cigna": // NOT WORKING?
         planIdAry = planId.match(/(\d+-\d+)|-(\d+)/g);
         moddedPlanId = "h"+planIdAry[0]+"-"+planIdAry[1].slice(1).padStart(3,"0");
         eocUrl = `https://www.cigna.com/static/www-cigna-com/docs/medicare/plans-services/2025/eoc-${moddedPlanId}.pdf`;
         // https://www.cigna.com/static/www-cigna-com/docs/medicare/plans-services/2025/sb-h7020-010-003.pdf
         // https://www.cigna.com/static/www-cigna-com/docs/medicare/plans-services/2025/eoc-h7020-010-003.pdf
         // https://www.cigna.com/static/www-cigna-com/docs/medicare/plans-services/2025/eoc-h7849-114-000.pdf
         break;

      case "HumanaChoice": // HUMANACHOICE
      case "Humana": // HUMANACHOICE
         planIdAry = planId.split("-");
         moddedPlanId = planIdAry[0]+planIdAry[1]+planIdAry[2].padStart(3,"0");
         eocUrl = `https://www.humana-medicare.com/BenefitSummary/2025PDFs/${moddedPlanId}EOC25.pdf`;
         break;

      case "Wellcare":
         moddedPlanId = planId.replaceAll("-","_");   // url uses underscores
         eocUrl = ``;
         hasDocLink = false;
         break;

      case "Zing":
         moddedPlanId = planId.replaceAll("-","_");   // url uses underscores
         eocUrl = `https://cdn.gohealth.com/shopping/medicare-resources/2025/evidence-of-coverage-documents/560/${moddedPlanId}_evidence_of_coverage.pdf`;
         break;
      }

      return eocUrl == "" ? hasDocLink : eocUrl;
   }

   /* Function recreateEocDocLink
      When tabs change, link disappears fix */
   function recreateEocDocLink(){
      // jq(".link-wrapper:contains('Policy')").on("click",() => {console.log("fired listener"); if(jq("#eoc_link").length == 0) setTimeout(addEocDocLink, 750)});

      if(typeof globalEocMuta !="undefined") {    // TODO: Fix this awful hack
         globalEocMuta.managedDisconnect();
      }

      globalEocMuta = addManagedMutationObs(
         jq(".mat-mdc-tab-links"),
         addEocDocLink
      );

   }

   /* Function removeEocDocLink
      Removes the CSS and element created for the EOC Doc links */
   function removeEocDocLink(){
      jq("#eoc_link").remove();
      jq("#plan_docs_css").remove();
   }


/*************
* LOGIC
**************/

// var firstBtn = jq('');
// var secondBtn = jq('');
// if(firstBtn.length != 0) {
//    //** AUTONAV 1 **//
//    firstBtn.click();
// } else if(secondBtn.length != 0) {
//    //** AUTONAV 2 **//
//    secondBtn.click();
//    // set timeout and nav to https://app.thinkagent.com/home-tabs/tabs/medicaid-eligibility  ?
// } else {
   //** PAGE LOGIC **//
   var onFirstLoadObserver;

   if(typeof tep == "undefined") {
      window.tep = {
         ranSetup: false
      };
      window.cuSearchData = cuSearchData;
      window.currCustData = currCustData;
      jq(".walkme-custom-icon-outer-div:contains('Walk Me Through')").hide();
      addCssEl("a.benefits-summary__wrapper.ng-star-inserted { width: 200px; }");
      searchBarOps.getMBIField().attr("placeholder","1AC2DE4FG56");
   }
   if(tep.ranSetup != true) {
      setUpKeyboardShortcuts();
      setUpInputBlurListeners();

      if(isCustomerLoaded()) {
         addPageEls();
      } else {
         onFirstLoadObserver = addManagedMutationObs($("app-root"), () => {
            console.log("did this fire?");
            onFirstLoadObserver.disconnect();
            addPageEls();

            currCustData.loadFromPage();
         });
      }

      tep.ranSetup = true;
      tep.unload = unload;
      tep.alreadyPresent = alreadyPresent;
      tep.mydebug = mydebug;

      console.log(">> Inserted TEP logic");
   } else {
      tep.alreadyPresent();
   }
// }
