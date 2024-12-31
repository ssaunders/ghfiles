//~~~~ MARX CUSTOMIZATION ~~~~//

/* TODO: 

    /**  1  WORKING ON **
    // TODO: Have the "keyup" on SSN & MBI remove the "-", fix it in Ctrl+V
    // TODO: Have Ctrl+Enter work in SSN lookup
    // TODO: Have the Ctrl + V just drop out the -, format DOB
    // TODO: Make changeMaxLengthOnInputs (make them a lot larger)

    /**  2  PRIORITY   **
    // TODO: Add in the MX object
        // TODO: Change all ref's for doc vars to be MX vars (ranSetup, etc)
        // TODO: Add the listener to put the mx object into the iframe
        // TODO: Change Setup fn to standardized format
    // TODO: Get auto-nav to work with the first part of MARx
    
    /**  3  BACKLOG    **
    // TODO: Session-Refresher
        // TODO: Fix MARx refresher -- have it pick up the "stay" button
        // TODO: set up Session-Refresher to auto-click button every 5 minutes. Does it have to be in an active tab?
        // TODO: Set it up so that searching updates the 4 hour log out timer back to 4 hours
    // TODO: figure out why i have to hit the shortcut buttons twice
    // TODO: Style v> button
    // TODO: Make the autonav insert do a settimeout if it doesn't find what it's looking for

 //DONE 

    /**** Post Version Release ****

    // TODO: Have the Ctrl + Shift + V show cu table if hidden
    // TODO: Have the Ctrl + Shift + V paste info into the search section/s
    // TODO: Make the "interpret JSON failed" be less monstrous when I accidentally past the whole body o/code
    // TODO: Fix the div that's supposed to be hidden showing up
    // TODO: Make Ctrl+shift+E for Enrollment info to copy the top section
        // TODO: Create a button div, so I can extend the screenshot functionality
        // TODO: connect shortcut
        // TODO: write fn to hmtl2canvas the 4 divs I need
    // TOOD: Add auto-navigator
        // TODO: Make it auto-step
        // TODO: make it so that if the MX button is pushed, it'll still go
        // TODO: Have it delay the addition of the stuff until the end
        // TODO: beneficiaries
        // TODO: eligibility
    // TODO: pageCopy logic--get it to copy
    // TODO: pageCopy logic--get it to auto-download
    // TODO: pageCopy logic testing
    // TODO: import jspdf
    // TODO: make shortcut to pageCopy
    // TODO: Make a setup fn, to be called from auto nav
    // TODO: Make unloadMx fn
    // TODO: Add timestamp to "tried it"
    // TODO: Rework hideShowFn > name better
    // TODO: Fix setUpKeyboardShortcuts to use addEventListener
    // TODO: Rework addscript > break into two, doc is optional
    // TODO: Fix it so it doesn't run if it sees the button already there.
    // TODO: actually use getIframe in code ?
    // TODO: Add shortcuts? 
        // TODO: Add MARx refresher
        // TODO: Add focus to top el?
        // > Focus to Ben ID search (Ctrl+Shift+S)
        // TODO: Remove the two things (highlight and +) at top?

*/

/*************
* FUNCTIONS
**************/

/*** LIBRARY ***/

    /*  Function alreadyPresent
        alerts that the code already exists */
    function alreadyPresent() {
        console.warn(">> MARx Code already present");
    }

    /*  Function DEBUG FUNCTIONS
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
    function copyElToClipboard(htmlEl, doc=document) {
        if(htmlEl == null) {
            console.warn("Nothing to copy");
            return;
        }

        var range = doc.createRange();
        var sel = doc.getSelection();

        sel.removeAllRanges();
        range.selectNodeContents(htmlEl);
        sel.addRange(range);
        doc.execCommand("Copy");
    }

    /*  Function addCssEl
        Adds the passed in CSS text to the document body */
    function addCssEl(cssText, doc=document) {
        if (cssText!=null) {
            const cssEL = doc.createElement("style");
            cssEL.textContent = cssText;
            doc.childNodes[1].appendChild(cssEL);
        }
    }

    /*  Function addJsScript
        Adds the passed in script text to the document body */
    function addJsScript(scriptText, doc=document) {
        if (scriptText!=null) {
            const jsEl = doc.createElement("script");
            jsEl.textContent = scriptText;
            doc.childNodes[1].appendChild(jsEl);
        }
    }

    /*  Function getCurrentTimestamp
        Returns a string of the current timestamp */
    function getCurrentTimestamp() {
        return new Date().toLocaleString('en-us',{hour:'numeric',minute:'numeric',second:'numeric'});
    }

   /* Function addMutationObs
      Adds a mutation observer to targetEl. Returns the observer. */
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
         if(typeof hasHeaderOrHeaderString == "boolean") {
            data = convertColonListToJsonObj(copiedText, hasHeaderOrHeaderString);
         } else if(/DOB: ?[\d-]+ Agent Name/.test(copiedText)){
            data = convertColonListToJsonObj(firstCommentPreProcessing(copiedText), true);
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

    /*  Function setUpKeyboardShortcuts
        Sets up the listeners for the keyboard shortcuts */
    function setUpKeyboardShortcuts() {
        if(isDB()) {
            console.warn(">> debug on");
        }

        // commented out for now. Not sure why I needed this before
        // it prevents things, now
        // if(document.ranSetup) {
        //  return;
        // }

        const doc = getIframeDoc();
        doc.addEventListener("keyup", selectCuInfo);
        doc.addEventListener("keyup", pasteCuInfo);
        doc.addEventListener("keyup", selectSearchBox);
        doc.addEventListener("keyup", pageCopy);
        doc.addEventListener("keyup", enrollInfoCopy);
        console.log(">> set up shortcuts "+getCurrentTimestamp());
    }

    /*  Function removeKeyboardShortcuts
        Remove the listeners for the keyboard shortcuts */
    function removeKeyboardShortcuts() {
        const doc = getIframeDoc();
        doc.removeEventListener("keyup", selectCuInfo);
        doc.removeEventListener("keyup", pasteCuInfo);
        doc.removeEventListener("keyup", selectSearchBox);
        doc.removeEventListener("keyup", pageCopy);
        doc.removeEventListener("keyup", enrollInfoCopy);
        console.log(">> set up shortcuts "+getCurrentTimestamp());
    }

    /*  Function setUpLoadListeners
        Sets up all the load listeners, so that when site loads new cu, logic is re-added */
    function setUpLoadListeners() {
        if(isDB()) {
            console.warn(">> debug on");
        }
        var iframe = getIframe();
        iframe.addEventListener("load", addToggleBtn);
        iframe.addEventListener("load", setUpKeyboardShortcuts);
        iframe.addEventListener("load", setUpPgCopy);
        iframe.addEventListener("load", setUpEnrollInfoCopy);
        iframe.addEventListener("load", setUpSessionRefresher);
        iframe.addEventListener("load", showTableIfHasContent);

        // iframe.addEventListener("load", addMXtoIframe);

        /*** Libraries ***/
        iframe.addEventListener("load", addHtml2Canvas);
    }

    /*  Function removeLoadListeners
        Removes all the load listeners */
    function removeLoadListeners() {
        if(isDB()) {
            console.warn(">> debug on");
        }
        var iframe = getIframe();
        iframe.removeEventListener("load", addToggleBtn);
        iframe.removeEventListener("load", setUpKeyboardShortcuts);
        iframe.removeEventListener("load", setUpPgCopy);
        iframe.removeEventListener("load", setUpEnrollInfoCopy);
        iframe.removeEventListener("load", setUpSessionRefresher);
        iframe.removeEventListener("load", showTableIfHasContent);

        // iframe.removeEventListener("load", addMXtoIframe);

        /*** Libraries ***/
        iframe.removeEventListener("load", addHtml2Canvas);
    }

    /*  Function unloadMx
        Removes the keyboard listeners from the page */
    function unloadMx() {
        removeKeyboardShortcuts();
        removeLoadListeners();

        console.log("removed shortcuts");
        document.ranSetup = false;
    }

    /*  Function addHtml2Canvas
        Sets up all the load listeners, so that when site loads new cu, logic is re-added */
    function addHtml2Canvas() {
        const doc = getIframeDoc();
        // doc = document;
        const jsEl = doc.createElement("script");
        // jsEl.src="https://github.com/niklasvh/html2canvas/releases/download/v1.4.1/html2canvas.min.js";
        jsEl.src="https://html2canvas.hertzen.com/dist/html2canvas.js"
        jsEl.crossorigin="anonymous";

        doc.childNodes[1].appendChild(jsEl);
    }


   /*** CANVAS COPY CONTAINER ****/

    /* Function makeCanvasContainer 
        Puts the canvasContainer into the DOM. Returns a ref to it. */
    function makeCanvasContainer() {
        const doc = getIframeDoc();
        const div = doc.createElement('div');
        div.id="canvasContainer";
        div.style="visibility:hidden; display:none;";

        //inner btn div
        const btnDiv = doc.createElement('div');

        doc.childNodes[1].appendChild(div).appendChild(btnDiv);
        return div;
    }

    /* Function getCanvasContainer
        Returns the canvasContainer. Cerates it if it doesn't exist. 
        Can execute inside iframe context, or main window context */
    function getCanvasContainer() {
        // handle working in two different contexts
        var jquery;
        try {
            jquery = getIframeJqry;
        } catch {
            jquery = $;
        }

        var canvasContainer = jquery('#canvasContainer')[0];
        if(canvasContainer == undefined) {
            canvasContainer = makeCanvasContainer();
        }
        return canvasContainer;
    }

    /* Function addBtnToCanvasContainer
        Adds a button that can be clicked to the canvas
        the first div holds the buttons */
    function addBtnToCanvasContainer(btn) {
        getCanvasContainer().children[0].appendChild(btn);
    }

        /* IMBEDDED TO IFRAME */

    /* Function copyCanvasToClipboard
        This executes in the context of the iframe, where 
        document is the iframe doc. Important, b/c styling issues
        
        Copies canvas to clipboard */
    function copyCanvasToClipboard(canvas) {
        canvas.toBlob(function (blob) {
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]); 
        })
    }

    /* Function saveNewCanvas (iframe embedded)
        This executes in the context of the iframe, where 
        document is the iframe doc. Important, b/c styling issues
        
        Removes old canvas, saves the new canvas to the DOM */
    function saveNewCanvas(canvas) {
        var canvasContainer = getCanvasContainer();
        //delete old canvas, if it exists
        if(canvasContainer.children.length > 1) {
            canvasContainer.removeChild(canvasContainer.children[1]);
        }

        //save new canvas into hidden el
        canvasContainer.appendChild(canvas);

        return canvas;
    }

    
   /*** FIELD & IFRAME GETTERS/SETTERS ***/

    /*  Function getIframe
        Gets the iframe that contains the MARx cu lookup
        Executed on main doc, outside o/iframe */
    function getIframe() {
        if(this.iframe == undefined) {
            this.iframe = document.getElementById("obj_marxaws_wab_application");
            console.log("doc", document,this.iframe, this.iframe != null && this.iframe.contentDocument);
            var l = document.getElementsByClassName("cms-vertical-object ng-star-inserted");
            console.log("doc", document,l, l != null && l.contentDocument);
        }
        return this.iframe;
    }

    /*  Function getIframeDoc
        Gets the document belonging to the cu lookup iframe */
    function getIframeDoc() {
        var iframe = getIframe();
        return iframe == undefined ? undefined : iframe.contentDocument;   
    }

    /*  Function getSubmitBtn */
    function getSubmitBtn() {
        return getIframeJqry()('[name=submitBtn]');
    }

    // FIELDS //

    /*  Function getMBI */
    function getMBI() {
        return getIframeDoc().getElementById('claimNumber');
    }

    /*  Function setMBI */
    function setMBI(newVal) {
        var el = getMBI();

        newVal = newVal.replaceAll(/( |-)/g,"/");

        el.value = newVal;
        return el.value == newVal;
    }

    /*  Function getFirstName */
    function getFirstName() {
        return getIframeDoc().getElementById('fName');
    }

    /*  Function setFirstName */
    function setFirstName(newVal) {
        var el = getFirstName();

        el.value = newVal;
        return el.value == newVal;
    }

    /*  Function getLastName */
    function getLastName() {
        return getIframeDoc().getElementById('lName');
    }

    /*  Function setLastName */
    function setLastName(newVal) {
        var el = getLastName();
        el.value = newVal;
        return el.value == newVal;
    }

    /*  Function getDOB */
    function getDOB() {
        return getIframeDoc().getElementById('dob');
    }

    /*  Function setDOB */
    function setDOB(newVal) {
        var el = getDOB();

        newVal = newVal.replaceAll(/( |-)/g,"/");
        // if()

        el.value = newVal;
        return el.value == newVal;
    }

    /*  Function getSSN */
    function getSSN() {
        return getIframeDoc().getElementById('ssn');
    }

    /*  Function setSSN */
    function setSSN(newVal) {
        var el = getSSN();

        newVal = newVal.replaceAll(/[^\d]/gi,"");
        el.value = newVal;
        return el.value == newVal;
    }

    // TODO: These two are incomplete. Not sure how I'm going to do these
    /*  Function getPartialMBI */
    function getPartialMBI() {
        // TODO: Add a "getvalue" to the returned el. 
        return getIframeDoc().getElementById('prtMbiDiv');
    }

    /*  Function setPartialMBI */
    function setPartialMBI() {
        return getIframeDoc().getElementById('claimNumber');
    }


/*** SET UP TOGGLE BUTTON ***/

    /*  Function getToggleBtn */
    function getToggleBtn() {
        return getIframeDoc().getElementById('toggleBtn');
    }

    /*  Function setUpToggleBtn
        Creates and adds to the DOM the toggle button and its logic. 
        We can use "document" here b/c it's running inside the iframe */
    function setUpToggleBtn() {
        // Get the parent el, where we'll put the button.
        document
            .querySelectorAll('.eligTable4 tr:nth-child(2)')[0]
            .classList.toggle('disp-none');

        // Make the button 
        const toggleFSHideBtn = document.createElement('button');
        toggleFSHideBtn.innerHTML = '>';
        toggleFSHideBtn.type='button';
        toggleFSHideBtn.id='toggleBtn';
        toggleFSHideBtn.onclick=function() {
            // Toggle (hide/show) display:none, get resulting state, store in wasHidden
            var wasHidden = document.querySelectorAll('.eligTable4 tr:nth-child(2)')[0].classList.toggle('disp-none');
            if (wasHidden) {
                this.innerHTML = '>';
            } else {
                this.innerHTML = 'v';
            }
        };

        // Append button
        document.querySelectorAll('.eligTable4 tr:first-child td:first-child')[0].appendChild(toggleFSHideBtn);
    }

    /*  Function addToggleBtn
        Creates and adds the css/script elements needed to format/execute the button logic */
    function addToggleBtn(evt) {
        if(isDB()) {
            console.warn(">> debug on");
        }
        var iframeDoc = getIframeDoc();

        // Early escape if button already exists
        if(getToggleBtn() != null) {
            return;
        }

        // Make style content 
        var cssContent = `
            .eligTable4 .disp-none { 
                display:none;
            }`;

        // Make the button creation auto-executing upon add
        var jsContent = "("+setUpToggleBtn.toString()+")();";

        addJsScript(jsContent, iframeDoc);
        addCssEl(cssContent, iframeDoc)
    }

   /*** SHOW TABLE IF HAS CONTENT ***/

    /*  Function isCuInfoTableHidden
        Returns true if the search table has info used to search in it */
    function isCuInfoTableHidden() {
        return getIframeJqry()('.eligTable4 tr:nth-child(2)')[0].classList.contains('disp-none');
    }

    /*  Function searchTableHasContent
        Returns true if the search table has info used to search in it */
    function searchTableHasContent() {
        var firstName = getFirstName().value,
            lastName = getLastName().value,
            dob = getDOB().value,
            ssn = getSSN().value;

        return firstName != ""
            || lastName != ""
            || dob != "" 
            || ssn != "";
    }

    /*  Function showTableIfHasContent
        Clicks the "hide/show" button if the table has content in it */
    function showTableIfHasContent() {
        var toggleBtn = getToggleBtn();

        if(searchTableHasContent() && toggleBtn != null) {
            toggleBtn.click();
        }
    }


/*** AUTONAV ***/

    /* Function removeAutoNavListener
        Removes the autonav logic when we have arrived, to prevent issues when reloading */
    function removeAutoNavListener() {
        console.log(">> removed autonav");
        getIframe().removeEventListener("load", autoNav);
    }

    /* Function addAutoNavListener
        Removes the autonav logic when we have arrived, to prevent issues when reloading.
        Calling this fn multiple times isn't an issue, 
        as it won't cause multiple runs, since the signature 
        is the same. */
    function addAutoNavListener() {
        var iframe = getIframe();
        if(iframe != undefined) {
            iframe.addEventListener("load", autoNav);
        } else {
            console.error("Could not add AutoNav listener. Iframe not defined");
        }
    }

    // TODO: move this to getters
    /*  Function getIframeJqry
        Searches for specific elements on the DOM to decide the current step the nave is at. */
    function getIframeJqry() {
        var iframeDoc = getIframeDoc(),
             el;
        this.iFrameJqry = undefined;

        if (iframeDoc != undefined) {
            el = iframeDoc.querySelector('#pgTtle') != null ? iframeDoc.querySelector('#pgTtle') : iframeDoc.querySelector('.pageTitle');
            this.iFrameJqry = el.ownerDocument.defaultView.$;
        }

        return this.iFrameJqry;
    }

    /* Function getCurrStepNum
        Searches for specific elements on the DOM to decide the current step the nave is at. */
    function getCurrStepNum() {
        var iFrameJqry = getIframeJqry();
        const doc = getIframeDoc();

        if ($("#cms-marxaws-tile") != null && $("#cms-marxaws-tile").length != 0) { // no iframe on this step
            return 1;
        } else if (doc != undefined && doc.querySelector('.pageTitle').children[0].innerHTML == 'User Security Role Selection (M002)') {
            return 2;
        } else if(iFrameJqry != undefined) {
            if (iFrameJqry('.pageTitle').children()[0].innerHTML == 'Welcome (M101)') {
                return 3;
            } else if (iFrameJqry('#pgTtle').children()[0].innerHTML == 'Beneficiaries: Find (M201)') {
                return 4;
            } else if (iFrameJqry('#pgTtle').children()[0].innerHTML == 'Beneficiary: Eligibility (M232)') {
                return 5;
            }
        }

        console.warn("returned 0");
        return 0;
    }

    /* Function autoNav
        Navigates from wherever you are in the "get to MARx" process to the next step in MARX. 
        Utilizes "Load" even to decide where to go. 
        Executed in context of main frame AND in context iframe.
        Uses '$' when in main frame, uses iFrameJqry when in iframe.
    */
    function autoNav(){
        var iFrameJqry = getIframeJqry(); // so I can use "contains"
        var iframeDoc = getIframeDoc();

        /*
         step 1 does something weird. The full page doesn't re-render, 
         just the bottom part, replacing it with an iframe. So I need a 
         different listener, or need to put one on a different element.
         the remaining steps should be fine 
        */

        // adding the same listener mult times won't cause it to fire mult times
        switch(getCurrStepNum()) {
            default: 
                console.warn('Failed AutoNav');
                break;
            case 1: 
                $('#cms-marxaws-tile').click();
                $('.cms-myapps-link')[0].click()
                break;
            case 2: 
                addAutoNavListener();

                //for some reason, can't get iframe's jquery here
                iframeDoc.querySelector('#userRole').click();
                break;
            case 3: 
                addAutoNavListener();

                iFrameJqry('a:contains("Beneficiaries")')[0].click();
                break;
            case 4: 
                addAutoNavListener();

                iFrameJqry('a:contains("Eligibility")')[0].click();
                break;
            case 5: //we have arrived, run the usual stuff, stop auto-nav
                removeAutoNavListener();

                if(!document.ranSetup) {
                    setup();
                }
                break;
        }
    }


/*** AUTO REFRESHER ***/

    const refreshCount = {
        refreshCount: 0,
        getValue: function() {
            if (this.refreshCount == undefined) this.refreshCount = 0;
            return this.refreshCount;
        },
        increment: function(){
            console.log("incremented refreshCount @ "+getCurrentTimestamp());
            return this.refreshCount++;
        }
    }

    /*  Function getContinueSessionBtn
        Gets the button on the modal that continues the session. 
        Runs on main page, so can use document */
    function getContinueSessionBtn() {
        if(this.continueBtn == undefined) {
            this.continueBtn = document.getElementById("cms-myprofile-session-xtend")[0];
        }
        return this.continueBtn;    
    }

    /*  Function setUpSessionRefresher
        Auto-refreshes the interation w/MARx by re-submitting search*/
    function setUpSessionRefresher(){
        // $('#cms-myprofile-session-xtend');
        // let it pass after 4 hours, use counter, check ever 1:45

        // Does this need to be in iframe or main page?
    
        var iframeDoc = getIframeDoc();     // TODO: Change this to MX.refresherActive | need to get window?

        if(iframeDoc.refresherActive) {
            console.log(">> sessionRefresher running, cutoff ("+refreshCount.getValue()+")");
            return;
        }

        console.log(">> started sessionRefresher ("+refreshCount.getValue()+") @ "+getCurrentTimestamp());

        // message to let me know it's going
        setInterval(function() {
            console.log(">> Refresher active ("+refreshCount.getValue()+")");
        }, 10*60*1000);

        setInterval(function() {
            // click on "Find", so it reloads the iframe
            var continueBtn = getContinueSessionBtn();

        // this didn't quite work... it didn't click. Also, the pop-up is on the main window
        // two approaches -- 
                // 1) catch it when visible (harder) 
                // 2) click on the existing button (exists/works even when not visible?)

            // temp1.checkVisibility()? to see if the el's visible. If so, the run thing. Otherwise no?
            // Make a listener for visibilty?
            // can totally click it, even if it's not visible

            if(continueBtn) {
                continueBtn.click();
                refreshCount.increment();
                console.log("<<< clicked submit button ("+refreshCount.getValue()+"/"+getCurrentTimestamp()+") >>>");
            } else {
                console.warn("couldn't find continueBtn");
            }
        }, 1.95*60*1000);
        iframeDoc.refresherActive = true;
    }


/*** SEARCH BOX SELECT ***/

    /*  Function selectSearchBox
        Event listener to focus the MARx search box */
    function selectSearchBox(evt) {
        // CTRL + SHIFT + S // s for search
        if (evt.ctrlKey && evt.shiftKey && evt.which == 83) {
            if(isDB()) {
                console.warn(">> debug on");
            }

            var mbiEl = getMBI();
            mbiEl.focus({focusVisible:true});
            mbiEl.select();
        }
    }


/*** CU INFO SELECT ***/

    // TODO: move this to getters
    /*  Function getCuInfoTable 
        Gets the info HTML table that contains the cu's info */
    function getCuInfoTable() {
        return getIframeDoc().getElementsByClassName('paraTitle alignR')[0].parentElement.parentElement;

    }

    /*  Function selectCuInfo
        Selects the top part of the MARx page */
    function selectCuInfo(evt) {
        // CTRL + SHIFT + X // x b/c it's like copy
        if (evt.ctrlKey && evt.shiftKey && evt.which == 88) {
            if(isDB()) {
                console.warn("debug on");
            }

            copyElToClipboard(getCuInfoTable(), getIframeDoc());
        }
    }


/*** ENROLLMENT/TOP INFO COPY ***/
    /* This section is more than a bit convoluted. Because the
        the functions usually run in the context of the *main* 
        document, the CSS inside the iframe won't apply (proably
        due to XSS stuff). So we create a button inside the 
        iframe so the fns run from inside the iframe, to 
        preserve the context.
    */

    /* Function getEnrollInfoCopyBtn
        Gets the button we need to click in order to trigger the copy logic */
    function getEnrollInfoCopyBtn() {
        return getIframeJqry()('#enrollInfoCopyButton')[0];
    }

    /* Function enrollInfoCopy_iFrame (iframe embedded)
        This executes in the context of the iframe, where 
        document is the iframe doc. Important, b/c styling issues.

        Gets the el to copy, calls html2canvas, saves it to the
        clipboard */
    function enrollInfoCopy_iFrame() {
        var marxTBody = $('.eligTable5 > tbody')[0];
        if(marxTBody == undefined) {
            console.warn('Could not find MARx main tbody');
            return;
        }

        var first =  marxTBody.children[1];
        var second = marxTBody.children[2];
        var third =  marxTBody.children[3];
        var fourth =  marxTBody.children[4];

        var config = {
            ignoreElements: function(el){
                if(el.contains(marxTBody.children[2]) 
                    || fourth.contains(el)
                    || third.contains(el)
                    || second.contains(el)
                    || first.contains(el)
                    || el.nodeName == 'HEAD'
                    || el.nodeName == 'LINK'
                    || el.nodeName == 'STYLE') {
                    return false;
                } else {
                    return true;
                }
            }
        }

        html2canvas(marxTBody,config)
            .then(saveNewCanvas)
            .then(copyCanvasToClipboard)
            .catch(function() {
                console.warn("Failed to copy MARx enrollment info");
            });
    }

    /* Function enrollInfoCopy
        Refers the event to the function inside of the iframe */
    function enrollInfoCopy(evt) {
        // CTRL + SHIFT + 'E' // 'E' b/c "enroll"
        if (evt.ctrlKey && evt.shiftKey && evt.which == 69) {
            if(isDB()) {
                console.warn("debug on");
            }

            getEnrollInfoCopyBtn().click();
        }

    }

    /* Function enrollInfoCopyBtnSetup (embeded in iframe)
        Adds the onclick to the copy button. Needs to do this 
        later, as it needs to refer to a fn native to the iframe */
    function enrollInfoCopyBtnSetup() {
        $('#enrollInfoCopyButton')[0].onclick = enrollInfoCopy_iFrame;
        // TODO: Try out just adding this fn, w/o embedding it
    }

    /* Function setUpEnrollInfoCopy
        Adds the canvas container div and copy button to the 
        iframe. Injects the scripts into the iframe as native
        functions */
    function setUpEnrollInfoCopy() {
        const doc = getIframeDoc();

        // make button to click on, add it to canvasContainer
        const enrollInfoCopyBtn = doc.createElement('button');
        enrollInfoCopyBtn.type='button';
        enrollInfoCopyBtn.id='enrollInfoCopyButton';
        addBtnToCanvasContainer(enrollInfoCopyBtn);

        // Add the "take a picture" functionality directly into the iframe's context
        // This has to happen this way, as the button must refer to a 
        // fn already in the iframe, for formatting
        var scriptText = 
            "enrollInfoCopy_iFrame = "+enrollInfoCopy_iFrame.toString()+";\n"+
            "("+enrollInfoCopyBtnSetup.toString()+")();";
        addJsScript(scriptText,doc);
    }

    /* Leave for future debugging. Simple way to check what's being rendered
    html2canvas(temp1).then(function (canvas) {
    document.body.appendChild(canvas);
    });
    */


/*** PAGE COPY ***/
    /* This section is more than a bit convoluted. Because the
        the functions usually run in the context of the *main* 
        document, the CSS inside the iframe won't apply (proably
        due to XSS stuff). So we create a button inside the 
        iframe so the fns run from inside the iframe, to 
        preserve the context.
    */

    /* Function getPageCopyButton
        Gets the button we need to click in order to trigger the copy logic */
    function getPageCopyButton() {
        return getIframeJqry()('#pageCopyButton')[0];
    }

    /* Function pageCopy_iFrame
        This executes in the context of the iframe, where 
        document is the iframe doc. Important, b/c styling issues.

        Gets the el to copy, calls html2canvas, saves it to the
        clipboard */
    function pageCopy_iFrame() {
        var marxTBody = $('.eligTable5 > tbody')[0];
        if(marxTBody == undefined) {
            console.warn('Could not find the MARx main tbody');
            return;
        }
        html2canvas(marxTBody)
            .then(saveNewCanvas)
            .then(copyCanvasToClipboard)
            .catch(function() {
                console.warn("Failed to copy MARx main tbody");
            });
    }

    /* Function pageCopy
        Refers the event to the function inside of the iframe */
    function pageCopy(evt) {
        // CTRL + SHIFT + '/' // '/' b/c it's near enter
        if (evt.ctrlKey && evt.shiftKey && evt.which == 220) {
            if(isDB()) {
                console.warn("debug on");
            }

            getPageCopyButton().click();
        }

    }

    /* Function pageCopyBtnOnClickSetUp
        Adds the onclick to the copy button. Needs to do this 
        later, as it needs to refer to a fn native to the iframe */
    function pageCopyBtnOnClickSetUp() {
        $('#pageCopyButton')[0].onclick = pageCopy_iFrame;
    }

    /* Function setUpPgCopy
        Adds the canvas container div and copy button to the 
        iframe. Injects the scripts into the iframe as native
        functions */
    function setUpPgCopy() {
        const doc = getIframeDoc();

        // make button to click on
        const pageCopyButton = doc.createElement('button');
        pageCopyButton.type='button';
        pageCopyButton.id='pageCopyButton';
        addBtnToCanvasContainer(pageCopyButton);

        // Add the "take a picture" functionality directly into the iframe's context
                // TODO: Move these two fn's into their own place.
        var scriptText = 
            "pageCopy_iFrame = "+pageCopy_iFrame.toString()+";\n"+
            "saveNewCanvas = "+saveNewCanvas.toString()+";\n"+
            "copyCanvasToClipboard = "+copyCanvasToClipboard.toString()+";\n"+
            "getCanvasContainer = "+getCanvasContainer.toString()+";\n"+
            "("+pageCopyBtnOnClickSetUp.toString()+")();";
        addJsScript(scriptText,doc);
    }

    /* Leave for future debugging. Simple way to check what's being rendered
    html2canvas(temp1).then(function (canvas) {
    document.body.appendChild(canvas);
    });
    */


/*** PASTE SEARCH INFO***/

    /*  Function fillFields 
        Sets the info via MBI/Cu Info Table, then searches, if valid */
    function fillFields(cuInfoObj) {
        if(cuInfoObj.mbi != "") {
            setMBI(cuInfoObj.mbi);
            setFirstName("");
            setLastName("");
            setDOB("");
            setSSN("");
        } else {
            if(isCuInfoTableHidden() == true ) {
                getToggleBtn().click();
            }
            setMBI(""); // needed to not cause issues w/search
            setFirstName(cuInfoObj.firstName);
            setLastName(cuInfoObj.lastName);
            setDOB(cuInfoObj.dob);
            setSSN(cuInfoObj.ssn);
        }
    }


   /* Function submitIfComplete
      Checks if all required fields have been filled, and if so, it submits the search */
   function submitIfComplete() {
      console.log(">> attempted submit")
      if(isSearchFormValid()) {
         debouncedInitiateSearch();
      }
   }


    /*  Function isSearchFormValid 
        Sets the info via MBI/Cu Info Table, then searches, if valid */
    function isSearchFormValid() {
        var firstName = getFirstName().value,
            lastName = getLastName().value,
            dob = getDOB().value,
            ssn = getSSN().value,
            mbi = getMBI().value,
            mbiSearchValid, cuInfoSearchValid;

        cuInfoSearchValid = firstName != ""
            && lastName != ""
            && dob != "" && /\d\d\/\d\d\/\d\d\d\d/.test(dob)
            && ssn != "" && /\d{9}/.test(ssn)
            && mbi == "";

        mbiSearchValid = firstName == ""
            && lastName == ""
            && dob == ""
            && ssn == ""
            && mbi != "";

        return cuInfoSearchValid || mbiSearchValid;
    }
    
    /*  Function pasteCuInfo
        Selects the top part of the MARx page */
    function pasteCuInfo(evt) {
        // CTRL + SHIFT + V // v b/c it's like paste
        if (evt.ctrlKey && evt.shiftKey && evt.which == 86) {
            console.log(">> ran pasteInSearchInfo");
            navigator.clipboard
                .readText()
                .then((clipText) => {
                    var cuInfoObj;
                    try {
                        cuInfoObj = JSON.parse(clipText);
                    } catch(exception) {
                        console.warn("Failed to parse clipText: ", clipText.slice(0,100));
                        return;
                    }

                   fillFields(cuInfoObj);
                   submitIfComplete();
                });
        }
    }


/*** AUTOSUBMIT ***/

   /* Function initiateSearch
      Triggers the search */
   debouncedInitiateSearch = debounce(()=> {
      var submitButton = getSubmitBtn();
      if(submitButton.length > 0) {    
         submitButton[0].click();
      }
   },3000,{leading:true});

   /* Function initiateSearch
      Triggers the search */
   function initiateSearch(evt) {
      // CTRL + Enter // b/c it's a common submit shortcut
      if (evt.ctrlKey && evt.which == 13) {
         debouncedInitiateSearch();
      }
   }


/*** KEY UP CORRECTORS***/

    /*  Function setUpCorrectors 
        Hooks up the correctors below to their respective fields. */
    function setUpCorrectors() {
        $(getDOB()).on("blur",correctDOB);
        $(getSSN()).on("blur",correctSSN);
        $(getMBI()).on("blur",correctMBI);
    }

    /*  Function correctDOB 
        Hooked to the onkeyup for DOB field. Removes invalid chars and formats. */
    function correctDOB(evt) {
        setDOB(evt.target.value.trim());
    }


    /*  Function correctMBI 
        Hooked to the onkeyup for DOB field. Removes invalid chars and formats. */
    function correctMBI(evt) {
        setMBI(evt.target.value.trim());
    }

    /*  Function correctSSN 
        Hooked to the onkeyup for SSN field. Removes invalid chars. */
    function correctSSN(evt) {
        setSSN(evt.target.value.trim());
    }


/*************
* LOGIC
**************/
// Set up 

    /*  Function restoreConsoleLog
        MARx for some reason removes the console.log functionality.
        Not used now, just in case I need this in the future.
        https://stackoverflow.com/questions/7089443/restoring-console-log */
    function restoreConsoleLog(doc) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        window.console = iframe.contentWindow.console;
        // with Chrome 60+ don't remove the child node
        // iframe.parentNode.removeChild(iframe);
    }


function setup() {
    // this stuff is the new format to put it in. When I have time

    // if(typeof mx == "undefined") {
    //  window.mx = {
    //      ranSetup: false
    //  };
    // }

    // if(mx.ranSetup != true) {
    //  setUpKeyboardShortcuts();

    //  mx.ranSetup = true;
    //  mx.unload = unload;
    //  mx.alreadyPresent = alreadyPresent;
    //  evt = { // For debugging/testing
    //       ctrlKey:true,
    //       shiftKey:true,
    //       which:70
    //  }
    //  mx.mydebug = mydebug;

    // } else {
    //  mx.alreadyPresent();
    // }


    var doc = document;

    if(!doc.ranSetup) {
        //reinstating the log, b/c they killed it
        if(console.log.toString() != 'function log() { [native code] }') {
            console.log = getIframe().contentWindow.console.log;
        }

        doc.mxdebug = false;
        console.log("ran setup");

        // Environment set up
        setUpLoadListeners();
        setUpKeyboardShortcuts();
        setUpCorrectors();
        addToggleBtn();
        addHtml2Canvas();
        setUpPgCopy();
        setUpEnrollInfoCopy();
        setUpSessionRefresher();
        // changeMaxLengthOnInputs(); // TODO

        doc.ranSetup = true;
        doc.unloadMX = unloadMx;
        doc.alreadyPresent = alreadyPresent;
    } else {
        doc.alreadyPresent();
    }
}

/*** Add AutoNav Functionality ***/
// need to add the listener, so it starts the loop for the navigation until we arrive
// this is only important if you enter when there is an iframe
var iframe = getIframe();
if(iframe != undefined) {
    iframe.addEventListener("load", autoNav);
}

autoNav();
document.addEventListener('load',k)
var k = function() {
    console.log(">> loaded");
}
