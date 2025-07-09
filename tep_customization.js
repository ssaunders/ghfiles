//~~~~ TEP CUSTOMIZATION ~~~~//

// TODO: 

   // 1  working on
      // TODO: Make toggle that shifts between workable options (no MBI, first two o/first/last, DOB | all info)
      // TODO: Auto-remove spaces/special characters (from MBI, first name, lead id, phone?, zip) on blur
      // TODO: Couldn't paste name from MP

         // copied from another file, may have done
      // TODO: Add a "remove extraneous chars" listener to the SSN/DOB on keyup

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
                  

   // 3 backlog

      // TODO: 
      // TODO: 
      // TODO: 

/** DONE **/

   /**** Post Version Release ****/
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

/*** LIBRARY ***/

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

   /* Function isPastingFromMARx
      Checks if the pasted string coming in is from MARx */
   function isPastingFromMARx(colonList){
      return /^Claim Number:\t +.*\r?\nMBI /.test(colonList);
   }

   /* Function convertColonListToJsonObj
      Takes a text string, which is a list of info divided by colons,
      and converts it to a JSON obj. Pass in the list, and true if it 
      has a header, or a string, if you want to check.
      DOES NOT standardize the keys. */
   function convertColonListToJsonObj(colonList, hasHeader) {
      var logStuff = false,
          pastedFromMARx = isPastingFromMARx(colonList),
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
      newCuInfoObj.dob = cuInfoObj.dob || cuInfoObj.DOB || cuInfoObj["Date of Birth"] || cuInfoObj["Birth Date"] || "";
      newCuInfoObj.sex = cuInfoObj.sex || cuInfoObj.Gender || "";
      newCuInfoObj.mbi = cuInfoObj.mbi || cuInfoObj["Medicare ID"] || cuInfoObj["MBI Number"] || cuInfoObj.MBI || "";
      newCuInfoObj.mcdId = (cuInfoObj.mcdId || cuInfoObj["Medicaid ID"] || "").split(" / ")[0];
      if(newCuInfoObj.mcdId == "-") {
         newCuInfoObj.mcdId = "";
      }
      newCuInfoObj.phoneNum = cuInfoObj.phone || cuInfoObj.Phone || cuInfoObj["Phone Number"] || cuInfoObj["Phone Num"] || "";
      newCuInfoObj.email = cuInfoObj.email || cuInfoObj.Email || cuInfoObj["Email Address"] || cuInfoObj["email address"] || "";
      newCuInfoObj.leadId = cuInfoObj.leadId || cuInfoObj.LeadID || cuInfoObj["Lead ID"] || cuInfoObj["Lead Id"] || cuInfoObj["lead id"] || "";

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
   jq = mtjQuery;

   /* Function setUpKeyboardShortcuts
      Sets up the keyboard listeners to the page */
   function setUpKeyboardShortcuts() {
      document.addEventListener("keyup", copyAppInfo);         // CTRL + SHIFT + X  // X b/c kind of like copy
      document.addEventListener("keyup", pasteInSearchInfo);   // CTRL + SHIFT + V // V b/c it's paste
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
      getMBIField().on("blur",mbiFieldOnBlurFilter);
      getFirstNameField().on("blur",firstNameFieldOnBlurFilter);
      getLastNameField().on("blur",lastNameFieldOnBlurFilter);
      // getDOBField().on("blur",dobFieldOnBlurFilter);
      getConfirmationNumField().on("blur",confNumFieldOnBlurFilter);
      getLeadIdField().on("blur",leadIdFieldOnBlurFilter);
      // getPhoneNumField().on("blur",phoneNumFieldOnBlurFilter);
      getEmailField().on("blur",emailFieldOnBlurFilter);
      getZipField().on("blur",zipFieldOnBlurFilter);
      console.warn(">> set up onblur listeners");
   }

   /* Function removeUpInputBlurListeners
      Remove the onblur listeners that run to remove special chars */
   function removeUpInputBlurListeners() {
      getMBIField().off("blur",mbiFieldOnBlurFilter);
      getFirstNameField().off("blur",firstNameFieldOnBlurFilter);
      getLastNameField().off("blur",lastNameFieldOnBlurFilter);
      // getDOBField().off("blur",dobFieldOnBlurFilter);
      getConfirmationNumField().off("blur",confNumFieldOnBlurFilter);
      getLeadIdField().off("blur",leadIdFieldOnBlurFilter);
      // getPhoneNumField().off("blur",phoneNumFieldOnBlurFilter);
      getEmailField().off("blur",emailFieldOnBlurFilter);
      getZipField().off("blur",zipFieldOnBlurFilter);
      console.log(">> removed onblur listeners");
   }
   /* Function unload
      Removes the keyboard listeners from the page */
   function unload() {
      // unloadManagedMutators();
      removeKeyboardShortcuts();
      removeUpInputBlurListeners();
      removeNextSearchButton();

      tep.ranSetup = false;
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
   // function setDDField(input, val) {
   //    var ddContainer = jq(".abyss-select-input-portal-container");
   // }

   // MBI //
   /* Function getMBIField
      Gets the First Name field */
   function getMBIField() {
      return jq('input[formcontrolname="medicareBeneficiaryIdentifier"]');
   }

   /* Function setMBIField
      Sets the First Name field */
   function setMBIField(val="") {
      var field = getMBIField(),
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
      setMBIField(getMBIField().val().replaceAll(/[^\da-zA-Z]/g,"").trim());
   }

   // FIRST NAME //
   /* Function getFirstNameField
      Gets the First Name field */
   function getFirstNameField() {
      return jq('input[formcontrolname="firstName"]');
   }

   /* Function setFirstNameField
      Sets the First Name field */
   function setFirstNameField(val) {
      var field = getFirstNameField();
      setInputField(field,val);
      return field.val() == val;
   }

   /* Function firstNameFieldOnBlurFilter
      Removes characters not allowed in the input */
   function firstNameFieldOnBlurFilter(){
      setFirstNameField(getFirstNameField().val().trim().replace(/ [a-zA-Z]\.?/,"").replaceAll(/[^a-zA-Z ]/g,""));
   }

   // LAST NAME //
   /* Function getLastNameField
      Gets the First Name field */
   function getLastNameField() {
      return jq('input[formcontrolname="lastName"]');
   }

   /* Function setLastNameField
      Sets the First Name field */
   function setLastNameField(val) {
      var field = getLastNameField();
      setInputField(field,val);
      return field.val() == val;
   }

   /* Function lastNameFieldOnBlurFilter
      Removes characters not allowed in the input */
   function lastNameFieldOnBlurFilter(){
      setLastNameField(getLastNameField().val().trim().replace(/ [a-zA-Z]\.?/,"").replaceAll(/[^a-zA-Z ]/g,""));
   }

   // DOB //
   /* Function getDOBField
      Gets the First Name field */
   function getDOBField() {
      return jq('input[formcontrolname="dateOfBirth"]');
   }

   /* Function setDOBField
      Sets the First Name field */
   function setDOBField(val) {
      var moddedVal = val.replaceAll(/[\.\-]/g,"/"),
          field = getDOBField();

      if(/\d{4}\/\d\d?\/\d\d?/.test(moddedVal)) {
         moddedVal = moddedVal.replace(/(\d{4})\/(\d\d?\/\d\d?)/,"$2/$1");
      } else if(!/(\d\d?\/\d\d?\/(\d{4}))/.test(moddedVal)){
         moddedVal = moddedVal.replace(/^(\d\d?\/\d\d?\/)(\d\d)$/,"$119$2");
      }

      field.val(moddedVal);
      field[0].dispatchEvent(new Event('input'));

      return getDOBField().val() == moddedVal;
   }

   /* Function dobFieldOnBlurFilter
      Removes characters not allowed in the input */
   // function dobFieldOnBlurFilter(){
   //    setDOBField(getDOBField().val().replaceAll(/[^a-z ]/g,"").trim());
   // }

   // CONF NUMBER //
   /* Function getConfirmationNumField */
   function getConfirmationNumField() {
      return jq('input[formcontrolname="confirmationNumber"]');
   }

   /* Function setConfirmationNumField
      Sets the First Name field */
   function setConfirmationNumField(val) {
      var field = getConfirmationNumField();
      setInputField(field,val);
      field[0].dispatchEvent(new Event('input'));
      return field.val() == val;
   }

   /* Function confNumFieldOnBlurFilter
      Removes characters not allowed in the input */
   function confNumFieldOnBlurFilter(){
      setConfirmationNumField(getConfirmationNumField().val().trim());
   }

   // Lead ID //
   /* Function getLeadIdField
      Gets the First Name field */
   function getLeadIdField() {
      return jq('input[formcontrolname="leadId"]');
   }

   /* Function setLeadIdField
      Sets the First Name field */
   function setLeadIdField(val) {
      var field = getLeadIdField();
      setInputField(field,val);
      field[0].dispatchEvent(new Event('input'));
      return field.val() == val;
   }

   /* Function leadIdFieldOnBlurFilter
      Removes characters not allowed in the input */
   function leadIdFieldOnBlurFilter(){
      setLeadIdField(getLeadIdField().val().replaceAll(/[^\d]/g,"").trim());
   }

   // PHONE NUM //
   /* Function getPhoneNumField
      Gets the First Name field */
   function getPhoneNumField() {
      return jq('input[formcontrolname="phoneNumber"]');
   }

   /* Function setPhoneNumField
      Sets the First Name field */
   function setPhoneNumField(val) {
      var field = getPhoneNumField();
      setInputField(field,val);
      field[0].dispatchEvent(new Event('input'));
      return field.val() == val;
   }

   /* Function phoneNumFieldOnBlurFilter
      Removes characters not allowed in the input */
   // function phoneNumFieldOnBlurFilter(){
   //    setPhoneNumField(getPhoneNumField().val().replaceAll(/[^a-z ]/g,"").trim());
   // }

   // EMAIL //
   /* Function getEmailField */
   function getEmailField() {
      return jq('input[formcontrolname="emailAddress"]');
   }

   /* Function setEmailField
      Sets the First Name field */
   function setEmailField(val) {
      var field = getEmailField();
      setInputField(field,val);
      field[0].dispatchEvent(new Event('input'));
      return field.val() == val;
   }

   /* Function emailFieldOnBlurFilter
      Removes characters not allowed in the input */
   function emailFieldOnBlurFilter(){
      setEmailField(getEmailField().val().trim());
   }

   // ZIP CODE //
   /* Function getZipField */
   function getZipField() {
      return jq('input[formcontrolname="zipCode"]');
   }

   /* Function setZipField */
   function setZipField(val) {
      var field = getZipField();
      setInputField(field,val);
      field[0].dispatchEvent(new Event('input'));
      return field.val() == val;
   }

   /* Function zipFieldOnBlurFilter
      Removes characters not allowed in the input */
   function zipFieldOnBlurFilter(){
      setZipField(getZipField().val().replaceAll(/[^\d]/g,"").trim());
   }

   function checkGetters() {
      console.log("getMBIField", getMBIField());
      console.log("getFirstNameField", getFirstNameField());
      console.log("getLastNameField", getLastNameField());
      console.log("getDOBField", getDOBField());
      console.log("getConfirmationNumField", getConfirmationNumField());
      console.log("getLeadIdField", getLeadIdField());
      console.log("getPhoneNumField", getPhoneNumField());
      console.log("getEmailField", getEmailField());
      console.log("getZipField", getZipField());
   }

   function checkSetters() {
      // console.log("setZipField", setZipField("28262"));
      // console.log("setFirstNameField", setFirstNameField("123"));
      // console.log("setLastNameField", setLastNameField("123"));
      // console.log("setDOBField", setDOBField("123"));
      // console.log("setMBIField", setMBIField("123"));
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

         var activeTab = getActiveTabName(),
             altAddr = "-", finalString;

         // if(activeTab == "Member") {
         //    altAddr = getAltAddr();
         // }

         if(activeTab != "Policy") {
            navToPolicyTab();
         }

         // TODO: make this a fn? TODO: Make it so that it searches through the policies 
         //       until it gets one w/the correct sub and eff date, *if* the current one doesn't match
         finalString =        
            "T2 Agent:\t"+"-"+"\n"+ 
            "T3 Agent:\t"+getT3AgentName()+"\n"+
            "Plan:\t"+getPlanData()+"\n"+
            "SEP:\t"+"-"+"\n"+   // TEP doesn't give an SEP. Boo
            "Sub Date:\t"+getSubDate()+"\n"+
            "Eff Date:\t"+getEffDate()+"\n"+
            "Alt Address:\t"+altAddr;

         copyStringToClipboard(finalString);

         return;
      }
   }

   /* Function getT3AgentName */
   function getT3AgentName() {
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
               cuData.load(cuInfoObj);
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
         setFirstNameField(data.firstName);
      }
      
      if(data.lastName != "" && data.lastName != undefined) {
         setLastNameField(data.lastName);
      }
      
      if(data.dob != "" && data.dob != undefined) { 
         setDOBField(data.dob);
      }
      
      
      if(data.mbi != "" && data.mbi != undefined) { 
         setMBIField(data.mbi);
      }
      
      return formIsComplete();
   }

   /*** SUBMIT IF COMPLETE ***/

   /* Function formIsComplete
      Checks if all required fields have been filled.
      TEP has several different criteria, so I'm just checking the most obvious ones */
   function formIsComplete() {
      var isValid = false,
          firstName = getFirstNameField().val(),
          lastName  = getLastNameField().val(),
          dob = getDOBField().val(),
          mbi = getMBIField().val(),
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
      cuData.clear();
      clearSearchFields();
      setSearchNumberVisual("-");
   }

   /* Function clearSearchFields
      Clears the customer data object and the fields, too */
   function clearSearchFields(){
      setMBIField("");
      setFirstNameField("");
      setLastNameField("");
      setDOBField("");
      setConfirmationNumField("");
      setLeadIdField("");
      setPhoneNumField("");
      setEmailField("");
      setZipField("");
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

/*** CU DATA MANAGEMENT ***/
   cuData = {
      _data: {}
   };

   /* Function load
      Loads the cu's data into the global cu data obj.
      Completely overwrites all the data. */
   cuData.load = function (data) {
      var myData = {};

      cuData.clear();

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

      cuData._data = myData;   
      console.log("loaded cu data", myData);   
   }
   /* Function get
      Updates the cu's data into the global cu data obj */
   cuData.get = function (key) {
      return cuData._data[key];
   }
   /* Function update
      Updates the cu's data into the global cu data obj */
   cuData.update = function (key, data) {
      
      console.log("updated cu data", myData);   
   }
   /* Function clear
      Updates the cu's data into the global cu data obj */
   cuData.clear = function (data) {
      cuData._data = {};
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
      setLeadIdField(cuDataObj.leadId); // TODO: Make sure this is the right spelling
   }
   /* Function fillSearchFormOpt2
      Fills the search form with the given option from the stored customer info.
      MBI and Date of Birth*/
   function fillSearchFormOpt2(cuDataObj){
      setMBIField(cuDataObj.mbi); 
      setDOBField(cuDataObj.dob);
   }
   /* Function fillSearchFormOpt3
      Fills the search form with the given option from the stored customer info.
      MBI and a minimum of the first 2 characters of the first name and first 2 characters of the last name*/
   function fillSearchFormOpt3(cuDataObj){
      setMBIField(cuDataObj.mbi); 
      setFirstNameField(cuDataObj.firstName.slice(2));
      setLastNameField(cuDataObj.lastName.slice(2));
   }
   /* Function fillSearchFormOpt3FullName
      Fills the search form with the given option from the stored customer info.
      MBI and a minimum of the first 2 characters of the first name and first 2 characters of the last name*/
   function fillSearchFormOpt3FullName(cuDataObj){
      setMBIField(cuDataObj.mbi); 
      setFirstNameField(cuDataObj.firstName);
      setLastNameField(cuDataObj.lastName);
   }
   /* Function fillSearchFormOpt4
      Fills the search form with the given option from the stored customer info.
      Email Address, Phone Number, Date of Birth, and first 2 characters of the last name*/
   function fillSearchFormOpt4(cuDataObj){
      setEmailField(cuDataObj.email);
      setPhoneNumField(cuDataObj.phoneNumber);
      setDOBField(cuDataObj.dob);
      setLastNameField(cuDataObj.lastName.slice(2));
   }
   /* Function fillSearchFormOpt4FullName
      Fills the search form with the given option from the stored customer info.
      Email Address, Phone Number, Date of Birth, and first 2 characters of the last name*/
   function fillSearchFormOpt4FullName(cuDataObj){
      setEmailField(cuDataObj.email);
      setPhoneNumField(cuDataObj.phoneNumber);
      setDOBField(cuDataObj.dob);
      setLastNameField(cuDataObj.lastName);
   }
   /* Function fillSearchFormOpt5
      Fills the search form with the given option from the stored customer info.
      Date of Birth, and a minimum of the first 2 characters of the first name and first 2 characters of the last name*/
   function fillSearchFormOpt5(cuDataObj){
      setDOBField(cuDataObj.dob);
      setFirstNameField(cuDataObj.firstName.slice(2));
      setLastNameField(cuDataObj.lastName.slice(2));
   }
   /* Function fillSearchFormOpt5FullName
      Fills the search form with the given option from the stored customer info.
      Date of Birth, and a minimum of the first 2 characters of the first name and first 2 characters of the last name*/
   function fillSearchFormOpt5FullName(cuDataObj){
      setDOBField(cuDataObj.dob);
      setFirstNameField(cuDataObj.firstName);
      setLastNameField(cuDataObj.lastName);
   }
   /* Function fillSearchFormOpt6
      Fills the search form with the given option from the stored customer info.
      Phone Number, Zip Code and Date of Birth*/
   function fillSearchFormOpt6(cuDataObj){
      setPhoneNumField(cuDataObj.phoneNumber);
      setZipField(cuDataObj.address);
      setDOBField(cuDataObj.dob);
   }
   /* Function fillSearchFormOpt7
      Fills the search form with the given option from the stored customer info.
      Phone Number and Date of Birth*/
   function fillSearchFormOpt7(cuDataObj){
      setPhoneNumField(cuDataObj.phoneNumber);
      setDOBField(cuDataObj.dob);
   }
   /* Function fillSearchFormOpt8
      Fills the search form with the given option from the stored customer info.
      Enrollment Confirmation Number and Date of Birth*/
   function fillSearchFormOpt8(cuDataObj){
      setConfirmationNumField(cuDataObj.confirmationNum);
      setDOBField(cuDataObj.dob);
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
   if(typeof tep == "undefined") {
      window.tep = {
         ranSetup: false
      };
      window.cuData = cuData;
      jq(".walkme-custom-icon-outer-div:contains('Walk Me Through')").hide();
      addCssEl("a.benefits-summary__wrapper.ng-star-inserted { width: 200px; }");
      getMBIField().attr("placeholder","1AC2DE4FG56");
   }
   if(tep.ranSetup != true) {
      setUpKeyboardShortcuts();
      setUpInputBlurListeners();

      tep.ranSetup = true;
      tep.unload = unload;
      tep.alreadyPresent = alreadyPresent;
      tep.mydebug = mydebug;

      console.log(">> Inserted TEP logic");
   } else {
      tep.alreadyPresent();
   }
// }
