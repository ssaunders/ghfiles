//~~~~ CHC CUSTOMIZATION ~~~~//

/* TODO: 
   // TODO: Make Library fn's an inserting JS script
   // TODO: Make the Tester script work as an inserting JS script
   // TODO: Make all the files an inserting script
   // TODO: Make a "master" script that detects the page, and then pulls in the right script.
   // TODO: Check out Ctrl+X in Results page

   // TODO: MAKE A SCRIPT THAT WILL DO THE REPLACEMENTS/RENAMING FOR ME to add in a new test info
    https://gohealth.zendesk.com/agent/tickets/17804937 >> Couldn't pick up when no-select CSX

      ~~ SEARCH PAGE ~~
   /**  1  WORKING ON **
   // TODO: Have an indicator for what info the cu object has stored. Top right
   // TODO: Make a "persistant search" > I.E, it searches until it gets a response. 
      // TODO: Make the toggle btn
      // TODO: Have it make a sound when it actually lands
      // TODO: Search twice, b/c it doesn't pop up a window when that happens

   /**  2  PRIORITY   **
   // TODO: Make customer object that persists until state changes, overwrite new data
      // TODO: Make the object
      // TODO: Connect it up to change of Search Option
      // TODO: Make it clear when new Name comes in?
      // TODO: When state changes, clear it
      // TODO: Make a "pasted" indicator

   /**  3  BACKLOG    **
   // TODO: Make a "Get current states list" that runs through the Site dd and adds the state names into an array
   // TODO: Create a message div
      // TODO: Message if the Mcd # stored in the cu's info matches the state's regex
   // TODO: Color the Search Option, so that it shows in green the parts that are searchable, given the curr cu info obj
   // TODO: Change the file to have a CHC object that is put on the top, always
   // TODO: Make it so the Ctrl + Enter doesn't open page after clicking link
   // TODO: Make it so that Ctrl + V doesn't happen
   // TODO: figure out what happens if I save it as a webpage that loads things
   // TODO: create a preference list, so that can change Search Option to whatever needs be
   // TODO: Make Ctrl + S change between the filters > Site > Payer > search option > forms on Tier 2
   // TODO: TOAST message Search page
   // TODO: Mark somewhere that the "look for" isn't for every level
   // TODO: css for increasing input size of things

      ~~ RESULTS PAGE ~~
   /**  1  WORKING ON **
   // TODO: this one didn't scroll down: https://gohealth.zendesk.com/agent/tickets/17853320
   // TODO: Make sure the highlighter works for the new states: 
         /* Need to check: DE, IA, KS, LA, MI, NV, PA, SC
            CHECKED: 
               MI - MA-M, but it was the second Plan covg
               OK - Missed S.L.M.B. Should that be a keyword?
               IA - tricky. no real consistency?
         */
   // TODO: Double check the + levels for states I'm unsure of: TN, WA, GA, WI, FL
   // TODO: Figuring out LTC recognition for FL in https://gohealth.zendesk.com/agent/tickets/17820081
   // TODO: Improve state detection for AR and NC. Address isn't reliable
   // TODO: Put in a "check for LTC" marker in top right under state


   /**  2  PRIORITY   **
   // TODO: TOAST message Results page
      // TODO: make toast that shows state detected
      // TODO: make toast that shows how many highlights detected
      // TODO: should include a little note if it didn't find anything to highlight
      // TODO: Should show if state is an LTC state AZ, FL, NJ, TN, VA

   /**  3  BACKLOG    **
   // TODO: Have the copy/paste add to the cu's info as long as 1. it's empty, and 2. it matches the data
   // TODO: allow for jumping between highlights
   // TODO: shortcut to gather info into a single copy/pastable
   // TODO: try to figure out a way to have it persist through refreshes (if added to main CHC);
   // TODO: Have a word highlighter that people can type in, that highlights on page
   
   // TODO: Problem states: TN? AZ-4 digit code, but no clear flag on where it is, no label
   // FL QMB+/FBDE - IN SLMB/+, QMB+, FBDE - GA QMB+/FBDE - AR FBDE/QMB+/slmb - GA QMB+
   // TODO: Highlight what Search Options are usable by the data copied

/** DONE **/
   // TODO: Make an auto-nav
   // Fixed issue where state wouldn't apply if it was lowercase
   // TODO: Highlight the MBI
   // TODO: Highlight the LTC indicator, sometimes
   // TODO: Fix "focusEl" having a length, now that highlighted els is just els

   /**** Post Version Release ****/

   // Fixed an issue w/DOB pasting w/incorrect format
   // Adjusted the IL, TN position in the site drop down
   // TODO: Add the new states to Change: DE, IA, KS, LA, MI, NV, OK, PA, SC
   // TODO: Make it so when you paste into SSN field, it pulls out stuff
   // TODO: Make it so when you paste into DOB field, it pulls out stuff
   // TODO: Put in a "check for LTC" marker in top right of the tier 1 portion
    // TODO: Make the "interpret JSON failed" be less monstrous when I accidentally past the whole body o/code
   // Fixed an issue w/detecting AZ in Results Page
   // TODO: Fix Search section not doing Ctrl+enter
   // TODO: Make AR and "home" multi-state ones work (use Name: ? )
   // TODO: Have the Ctrl+Enter include a number on top of the spinner
   // TODO: Figure out how to make SearchOption work (can't just have it select on load, needs to respond to payer...mutation obs?)
   // TODO: Ctrl + enter searches
   // TODO: Make a "state id validator" that will verify the id when copy/pasted in, based on the current state selected
   // TODO: Make shortcut to open a functional search from Results section below (C+Shift+S?)
   // TODO: Fix setting NPI. IL having issues
   // TODO: "don't add site values twice" is broken
   // TODO: siteField / Make sure the option exists before you select it
   // TODO: siteField / put stateAbbr through the state name interpretter
   // TODO: siteField / don't change it if it's already on the right state
   // TODO: Finish getAbbr
   // TODO: ctrl + shift + v => Figures out if DOB or name, insert into appropriate field
      // TODO: Have it auto-select the Search Option when pasting, for a format that works
      // TODO: Have it focus on Gender, when the field is active and not filled out
      // TODO: Add shortcut
      // TODO: Add "set" fn's
      // TODO: Make & test interpreter for : fields *only*
         // TODO: have it fix date issues > YY > YYYY
         // TODO: have it pull out - in SSN
         // TODO: have it start by standardizing things?
      // TODO: if a state is defined, have it autoselect the state, then add the info in
            // TODO: setFieldSite() > add one-time load listener to tier2 doc that drops the info in
      // TODO: Add a one-time load listener to paste in the cu data, IF it changes the state
      // TODO: Accept input from copied info from a RFI ticket
   // TODO: Make the paste data in shortcut also handle the DOB having a 2 digit year
   // TODO: Add Ctrl + Shift + S for jumping to Site DD
   // TODO: Make Site DD include the states that are combined
   // TODO: Have it get things set up, if Payer is blank
   // TODO: Get the NPI change working
   // TODO: How to undo autoselects for remove?
   // TODO: be able to set up each state when you change the top one, including which states are weird w/the NPI
   // TODO: Ctrl + Enter searches
   // TODO: copy the Mcd id after insert >> had issues, b/c writeText wasn't working. Has Clipboard permissions, so....?
   // TODO: Make the search scroll to the el that matters
   // TODO: Figure out how to get debounced fn's undone
   // TODO: make stateDB contain Regex to validate a person's mcd id
   // TODO: make allowedStatesDB
   // TODO: Create a "waiting" gif that can be used to show that Ctrl Enter worked / make a mutator that will listen, to hide it again
   // TODO: FIGURE OUT HOW TO MANAGE 4 different iframes
   // TODO: get all elements that have the important info, turn them yellow (check if it's been run before)
   // TODO: create the DB that tracks what's important for each state
   // TODO: Figure out the jquery on the page; no jquery, queryselector
   // TODO: get which state we are on (submitter?)
   // TODO: make logic to determine whether results page or search page
   // TODO: Create CSS for highlights
   // TODO: add notes section that tracks important info (like FBDE upper, LTC waiver)
   // TODO: figure out what to do if the address isn't there to verify (AZ, OH)
   // TODO: select payer
   // TODO: 

// function main() {

/*************
* DATABASES
**************/
//// GENERAL ////

   /*** ALLOWED STATES DB ***/
   allowedStatesDB = {
      _DB: {   // OR, ME, NE, RI, HI not functional yet
         allowedStates: ["AL", "AR", "AZ", "CA", "CT", "DE", "FL", "GA", "IA", 
                         "IL", "IN", "KS", "KY", "LA", "MI", "MO", "MS", "NC", 
                         "NJ", "NV", "NY", "OH", "OK", "PA", "SC", "TN", "TX", 
                         "WA", "WI"]
      },
      isStateAllowed: function(state) {
         state = stateNameToAbbrDB.getAbbr(state);
         return this._getDB().includes(state);
      }, 
      _getDB: function() {return this._DB.allowedStates}
   }

   // SEARCH OPTION CONSTANTS
   const SEARCH_OPT_MEM_ID = 8;
   const SEARCH_OPT_SSN = 10;
   const SEARCH_OPT_SSN_NAME = 37;
   const SEARCH_OPT_SSN_DOB = 45;
   const SEARCH_OPT_NAME_DOB = 47;
   const SEARCH_OPT_SSN_MEM_ID = 52
   const SEARCH_OPT_MEMBER_ID_DOB = 53;
   const SEARCH_OPT_MEMBER_ID_NAME = 54;
   const SEARCH_OPT_CARD_NUM = 55;
   const SEARCH_OPT_NAME_DOB_GENDER = 56;
   const SEARCH_OPT_MEM_ID_NAME_DOB = 62;
   const SEARCH_OPT_SSN_NAME_DOB = 65;
   const SEARCH_OPT_CASEHEAD_ID_DOB = 93;
   const SEARCH_OPT_EXPANDED = 94;

   /*** PREFERRED SEARCH OPTION DB ***/
   preferredSearchOptionDB = {
      _DB: {
         searchOptionValue: { //ADD STATE HERE
            "AL":SEARCH_OPT_NAME_DOB,
            "AR":SEARCH_OPT_NAME_DOB,
            "AZ":SEARCH_OPT_NAME_DOB,
            "CA":-1,
            "CT":SEARCH_OPT_SSN_NAME_DOB,
            "DE":SEARCH_OPT_NAME_DOB, 
            "FL":SEARCH_OPT_NAME_DOB_GENDER,
            "GA":SEARCH_OPT_NAME_DOB_GENDER,
            "IA":SEARCH_OPT_NAME_DOB,
            "IL":SEARCH_OPT_NAME_DOB,
            "IN":SEARCH_OPT_NAME_DOB,
            "KS":SEARCH_OPT_NAME_DOB, 
            "KY":SEARCH_OPT_NAME_DOB_GENDER,
            "LA":SEARCH_OPT_NAME_DOB, 
            "MI":SEARCH_OPT_NAME_DOB, 
            "MO":SEARCH_OPT_NAME_DOB,
            "MS":SEARCH_OPT_NAME_DOB,
            "NC":SEARCH_OPT_NAME_DOB,
            "NJ":SEARCH_OPT_NAME_DOB,
            "NV":SEARCH_OPT_NAME_DOB, 
            "NY":SEARCH_OPT_MEM_ID,
            "OH":SEARCH_OPT_NAME_DOB,
            "OK":SEARCH_OPT_NAME_DOB,
            "PA":SEARCH_OPT_NAME_DOB, 
            "SC":SEARCH_OPT_NAME_DOB,
            "TN":SEARCH_OPT_NAME_DOB,
            "TX":SEARCH_OPT_NAME_DOB,
            "WA":SEARCH_OPT_NAME_DOB,
            "WI":SEARCH_OPT_NAME_DOB
         }
      },
      getPreference: function(state) {
         return this._getDB()[state];
      }, 
      _getDB: function() {return this._DB.searchOptionValue}
   }

   /*** SITE SELECT VALUE DB ***/
   siteFieldValueDB = {
      _DB: {
         stateValue: {  //ADD STATE HERE
            "AL": "BP00286802",
            "AR": "BP00277137",
            "AZ": "BP00243685",
            "CA": "BP00285700",
            "CT": "BP00277123",
            "DE": "BP00314119",
            "FL": "BP00277121",
            "GA": "BP00246036",
            "IA": "BP00321512",
            "IL": "BP00277137",
            "IN": "BP00246185",
            "KS": "BP00248330",
            "KY": "BP00280354",
            "LA": "BP00249413",
            "MI": "BP00311701",
            "MO": "BP00246038",
            "MS": "BP00246211",
            "NC": "BP00277123",
            "NJ": "BP00277120",
            "NV": "BP00249431",
            "NY": "BP00277119",
            "OH": "BP00245655",
            "OK": "BP00306248",
            "PA": "BP00245494",
            "SC": "BP00278102",
            "TN": "BP00277137",
            "TX": "BP00248831",
            "WA": "BP00312367",
            "WI": "BP00246046"
         }
      },
      getSiteFieldValue: function(state) {
         return this._getDB()[state];
      }, 
      _getDB: function() {return this._DB.stateValue}
   }

   /*** STATE NAME TO ABBR DB ***/
   stateNameToAbbrDB = {
      _DB: {
         nameToAbbr: {
            "Alabama": "AL",
            "Alaska": "AK",
            "Arizona": "AZ",
            "Arkansas": "AR",
            "California": "CA",
            "Colorado": "CO",
            "Connecticut": "CT",
            "Delaware": "DE",
            "District of Columbia": "DC",
            "Florida": "FL",
            "Georgia": "GA",
            "Guam": "GU",
            "Hawaii": "HI",
            "Idaho": "ID",
            "Illinois": "IL",
            "Indiana": "IN",
            "Iowa": "IA",
            "Kansas": "KS",
            "Kentucky": "KY",
            "Louisiana": "LA",
            "Maine": "ME",
            "Maryland": "MD",
            "Massachusetts": "MA",
            "Michigan": "MI",
            "Minnesota": "MN",
            "Mississippi": "MS",
            "Missouri": "MO",
            "Montana": "MT",
            "Nebraska": "NE",
            "Nevada": "NV",
            "New Hampshire": "NH",
            "New Jersey": "NJ",
            "New Mexico": "NM",
            "New York": "NY",
            "North Carolina": "NC",
            "North Dakota": "ND",
            "Ohio": "OH",
            "Oklahoma": "OK",
            "Oregon": "OR",
            "Pennsylvania": "PA",
            "Rhode Island": "RI",
            "South Carolina": "SC",
            "South Dakota": "SD",
            "Tennessee": "TN",
            "Texas": "TX",
            "Utah": "UT",
            "Vermont": "VT",
            "Virgin Islands": "VI",
            "Virginia": "VA",
            "Washington": "WA",
            "West Virginia": "WV",
            "Wisconsin": "WI",
            "Wyoming": "WY"
         }
      },
      getAbbr: function(stateFullName) {
         if(typeof stateFullName != "string") {
            return "";
         }

         var stateAbbr = this._getDB()[stateFullName.toProper()];

         // If we were passed an abbreviation
         if(stateAbbr == undefined && this.isStateAbbr(stateFullName)) {
            stateAbbr = stateFullName.toUpperCase();
         }

         return stateAbbr;
      }, 
      isStateAbbr: function(abbr) {
         return typeof abbr == "string" && this._stateAbbrListRegex.test(abbr);
      },
      _getDB: function() {return this._DB.nameToAbbr},
      _stateAbbrListRegex: /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$/i
   }

   /*** STATE DB ***/
   stateDB = { // ADD STATE HERE: NEED TO DOUBLE CHECK THE RESULTS SEARCH KEYS
      _DB: {
         stateInfo: {
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
               keyWords: 'Plan Coverage Description:  ',
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
               keyWords: 'Plan Coverage Description: / SLMB / QMB / Long-Term Care / Medicaid:',
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
               keyWords: 'Plan Coverage Description:  ',
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
               keyWords: ' Plan Coverage Description: / QMB only / QMB ONLY',
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
               keyWords: ' Plan Coverage Description: / Medicaid: / Qualified Medicare Beneficiary / Full Medicaid / Specified Low Income Medicare Beneficiary / PARTIAL',
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
               keyWords: 'Plan Coverage Description: / TITLE XIX (MEDICAID)',
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
            LA: {
               stateCode:'LA',
               mcdIdFormat:'13 characters, #\'s only',
               mcdIdExample:'1234567890123',
               format: '\\d{13}',
               ltcWaiver: '',
               usesInactive: 'x',
               fbdeRaises: 'x',
               keyWords: 'Special Low Income Medicare Beneficiary / Qualified Medicare Beneficiary',
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
               keyWords: 'Plan Coverage Description:',
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
               keyWords: 'Plan Coverage Description:',
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
         var tester, 
             verifiedAbbr = stateNameToAbbrDB.getAbbr(stateAbbr),
             state = this._getDB()[verifiedAbbr];

         if(state != undefined) {
            tester = new RegExp(state.format);
         } else {
            throw "Input given is not a valid state: "+stateAbbr;
         }

         return tester.test(mcdNum);
      },
      getNPI: function (stateAbbr) {
         var verifiedAbbr = stateNameToAbbrDB.getAbbr(stateAbbr),
             state = this._getDB()[verifiedAbbr];

         if(state != undefined) {
            return state.npi;
         } else {
            throw "Input given is not a valid state: "+stateAbbr;
         }
      },
      getStateInfo: function(stateAbbr) {
         var verifiedAbbr = stateNameToAbbrDB.getAbbr(stateAbbr);
         return this._getDB()[verifiedAbbr];
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
      console.warn(">> CHC Code already present");
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
           console.log(">> Content copied to clipboard");
         },(a,b,c,d) => {
            //TODO: handle if a.message.contains "Failed to execute 'writeText' on 'Clipboard': Document is not focused."
           console.error(">> Failed to copy");
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

   //TODO: Decide what to do here. Should I throw an error if not added?
   // have a return val? Need to indicate if it wasn't added

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

   /* Function listenToAllEvents
      Listens to all the events on an el. For debugging. Doesn't currently work*/
   function listenToAllEvents(el) { // limitScroll/Mouse/Key, userFn
      var eventFilter;
      // Options: animation*, on*, mouse*, pointer*, transistion*, click, blur, dblclick, scroll*
      // eventFilter = /^on(key|mouse)/     // just for onkey* or onmouse*
      eventFilter = /^on/                // gets all events
      Object.keys(el).forEach(key => {
          if (eventFilter.test(key)) {
              el.addEventListener(key.slice(2), event => {
                  console.log(event);
              });
          }
      });
   }

   /* Function listenToAllEvents
      Listens to all the events on an el. For debugging. 
      eventFilter is ....
      { pointer: true, mouse: false, event: "onMouseIn", eventList: ["mouse", "pointer"], excludeList: ["",""]}
      "mouse"
      // Options: animation*, on*, mouse*, pointer*, transition*, click, blur, dblclick, scroll*
      */
   function listenToAllEvents(el, eventFilter=/^on/, fn=(a,b,c)=>console.log("Got ",a,b,c)) {
      var eventTypes, regexString, filterToUse;
         
         eventFilter = /^on(?!.*(mouse|pointer|animation|transition)).*$/i
      // Figure out if it's a string event name, a regex, or an obj
      if(typeof eventFilter == "string") {
         filterToUse = eventFilter;
      } else if(typeof eventFilter == "object") {
         if(eventFilter.test == undefined) {
            eventTypes =
               eventFilter.mouse      ? "|mouse" : "" +
               eventFilter.click      ? "|click" : "" +
               eventFilter.pointer    ? "|pointer" : "" +
               eventFilter.animation  ? "|animation" : "" +
               eventFilter.transition ? "|transition" : "" +
               eventFilter.key        ? "|key" : "";
            regexString = eventFilter.exclude ? "^on(?!.*("+eventTypes.slice(1)+").*$" : "^on.*("+eventTypes.slice(1)+").*$"
            filterToUse = new RegExp(regexString);
         } else { // eventFilter is a regex
            filterToUse = eventFilter
         }
      } else {
         console.warn("Failed to listen to events. Could not recognize filter");
      }

      for (var key in el) {
         if (key.search(filterToUse) === 0) {
            console.log("added to ",key)
            el.addEventListener(key.slice(2), fn)
         }
      }

      return {
         removeListeners: () => {
            for (var key in el) {
               if (key.search(filterToUse) === 0) {
                  console.log("removed from",key)
                  el.removeEventListener(key.slice(2), fn)
               }
            }
         }
      }
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
   /* Possible formats: */
      tstAry = [
    /* std:            */  "01/01/1954" , "01.01.1954" , "01-01-1954" , "01 1 1954" , "01011954" ,  
    /* No 0-pad day    */  "01/1/1954"  , "01.1.1954"  , "01-1-1954"  , "01 1 1954" , "0111954"  ,  
    /* No 0-pad mon    */  "1/01/1954"  , "1.01.1954"  , "1-01-1954"  , "1 01 1954" , "1011954"  ,
    /* No 0-pad day/Mon*/  "1/1/1954"   , "1.1.1954"   , "1-1-1954"   , "1 1 1954"  , "111954"   ,

    // 2-char year
    /* std:            */  "01/01/54"   ,  "01.01.54"  ,  "01-01-54"  ,  "01 1 54"  ,  "010154" ,       
    /* No 0-pad day    */  "01/1/54"    ,  "01.1.54"   ,  "01-1-54"   ,  "01 1 54"  ,  "01154"  , 
    /* No 0-pad mon    */  "1/01/54"    ,  "1.01.54"   ,  "1-01-54"   ,  "1 01 54"  ,  "10154"  , 
    /* No 0-pad day/Mon*/  "1/1/54"     ,  "1.1.54"    ,  "1-1-54"    ,  "1 1 54"   ,  "1154"   ,
               
    // Messy
      "1/11954" ,     "11/1954" ,    "11/54" ,      "1/154" ,
      "1.11954" ,     "11.1954" ,    "11.54" ,      "1.154" ,
      "1-11954" ,     "11-1954" ,    "11-54" ,      "1-154" ,
      "1 11954" ,     "11 1954" ,    "11 54" ,      "1 154" ,
      ];

      // Cases:
         // missing first /
         // missing second /
         // has both /'s
         // missing first 0
         // missing second 0
         // has both 0's
         // two digit year
         // four digit year

      // Assumptions:
         // 4 yr vs 2 yr date
         // month vs day is full

      // 
      tstAry.forEach((a) => {b = standardizeFullDateString(a); if(b!="01/01/1954"){console.log(b=="01/01/1954",a," > ",b,)}});

   function randDate() {
      var delimters = [" ","/",".","-",""],
          pads = ["0",""],
          yearPrefixes = ["19","20",""],

          month = (pads[Math.floor(Math.random()*pads.length)] + Math.floor(Math.random()*12+1)).slice(-2), 
          day = (pads[Math.floor(Math.random()*pads.length)] + Math.floor(Math.random()*12+1)).slice(-2), 
          delimiterOne = delimters[Math.floor(Math.random()*delimters.length)],
          delimiterTwo = delimters[Math.floor(Math.random()*delimters.length)],
          yearPrefix = yearPrefixes[Math.floor(Math.random()*yearPrefixes.length)]
          yearPostfix = ("0"+Math.floor(Math.random()*100)).slice(-2);

      return month + delimiterOne + day + delimiterTwo + yearPrefix + yearPostfix;
   }
   for (var i = 10; i >= 0; i--) {
      randDt = randDate();
      console.log(">> randDt: ",randDt," -> ",standardizeFullDateString(randDt));
   }

   function standardizeFullDateString(fullDate) {
      if(typeof fullDate != "string") {
         return fullDate;
      }

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
  //~~~ GENERAL UTILTY ~~~//
   /* Function unload
      Removes the keyboard listeners from the page and undoes everything in runSetup */
   function unload() {
      chc.ranSetup = false;
   }

   /* Function isSearchPage
      Returns the keywords for the state detected on the page. */
   function isSearchPage() {
      return (window.top.location.pathname == "/ws_portal/portal.action" 
         || window.top.location.pathname == "/ws_portal/sentinel_login.action");
   }

  //~~~ SEARCH PAGE SETUP ~~~//

   /* Needed b/c we have 4+ frames on the page, some of which reload */
   var shortcutFnArray = [];
   var mutatorArray = [];

   /* Function setUpSearchPageMutators
      Sets up the keyboard listeners to the page */
   function setUpSearchPageMutators() {
      mutatorArray.push(searchOptionAutoSelect());
      mutatorArray.push(npiAutoSelect());

      console.warn(">> set up mutators");
   }

   /* Function addShortcutToSearchPage
      Since a shortcut has to run on ever iframe, this adds a single debounced fn that all 
      frames call. Returns the debounced fn, for use in page cleanup. */
   function addShortcutToSearchPage(fn, delay, options) {
      console.log("added shortcut: ",fn.name);
      var debouncedFn = debounce(fn, delay, options);
      getMainPageDoc().addEventListener("keyup", debouncedFn);
      getAppFrameDoc().addEventListener("keyup", debouncedFn);
      getTier1Doc().addEventListener("keyup", debouncedFn);
      getTier2Doc().addEventListener("keyup", debouncedFn);
      getRequestReviewDoc().addEventListener("keyup", debouncedFn);

      return debouncedFn;
   }

   /* Function setUpSearchPageKeyboardShortcuts
      Sets up the keyboard listeners to the page */
   function setUpSearchPageKeyboardShortcuts() {
      var searchInit = addShortcutToSearchPage(initiateSearch, 100, {leading:true});     // CTRL + ENTER       // b/c standard
      var pasteInfo = addShortcutToSearchPage(pasteInSearchInfo, 300, {leading:true});   // CTRL + SHIFT + V   // V b/c paste
      var focusSite = addShortcutToSearchPage(focusSiteEl, 300, {leading:true});         // CTRL + SHIFT + S   // S b/c Site
      
      shortcutFnArray.push({name:"initiateSearch", fn:searchInit});
      shortcutFnArray.push({name:"pasteInSearchInfo", fn:pasteInfo});
      shortcutFnArray.push({name:"focusSiteEl", fn:focusSite});

      console.warn(">> set up shortcuts");
   }

   /* Function addShortcutsOnTier2Load
      Sets up the keyboard listeners again when the Tier 2 iframe is reloaded */
   function addShortcutsOnTier2Load() {
      var debouncedFn;
      for (var iter = shortcutFnArray.length - 1; iter >= 0; iter--) {
         debouncedFn = shortcutFnArray[iter].fn;
         getTier2Doc().addEventListener("keyup", debouncedFn);
      }
   }
   /* Function addShortcutsOnRequestReviewLoad
      Sets up the keyboard listeners to the page */
   function addShortcutsOnRequestReviewLoad() {
      var debouncedFn;
      for (var iter = shortcutFnArray.length - 1; iter >= 0; iter--) {
         debouncedFn = shortcutFnArray[iter].fn;
         getRequestReviewDoc().addEventListener("keyup", debouncedFn);
      }
   }

   /* Function setUpSearchPageListeners
      Sets up the keyboard listeners to the page */
   function setUpSearchPageListeners() {
      getFieldSite().on('change',onSiteChange);
      // getFieldPayer().on('change',onPayerChange); << done w/mutator instead

      //iframe re-intiating CHC fn's
      getAppFrame().addEventListener("load",addChcRefToAppFrame);
      getTier1Frame().addEventListener("load",addChcRefToTier1Frame);
      getTier2Frame().addEventListener("load",addChcRefToTier2Frame);
      getRequestReviewFrame().addEventListener("load",addChcRefToRequestReviewFrame);
      //functionality listeners
      // getTier2Frame().addEventListener("load",addPersistentSearchBtn);
      getTier2Frame().addEventListener("load",addSearchSpinner);
      getTier2Frame().addEventListener("load",addSpinnerRevealOnSubmit);
      getRequestReviewFrame().addEventListener("load",hideSearchSpinner);
      getTier2Frame().addEventListener('load',setUpFixItFns);
      //shortcut re-establishers. B/c these frames reload
      getTier2Frame().addEventListener("load",addShortcutsOnTier2Load);
      getRequestReviewFrame().addEventListener("load",addShortcutsOnRequestReviewLoad);
   }

   //--- ADD CHC REF'S ---//
   /* Function addChcRefToAppFrame
      Adds a ref to the CHC object on the top window. Helpful when the iframe refreshes */
   function addChcRefToAppFrame() {
      getAppFrameWindow().chc = window.top.chc;
   }
   /* Function addChcRefToTier1Frame
      Adds a ref to the CHC object on the top window. Helpful when the iframe refreshes */
   function addChcRefToTier1Frame() {
      getTier1Window().chc = window.top.chc;
   }
   /* Function addChcRefToTier2Frame
      Adds a ref to the CHC object on the top window. Helpful when the iframe refreshes */
   function addChcRefToTier2Frame() {
      getTier2Window().chc = window.top.chc;
   }
   /* Function addChcRefToRequestReviewFrame
      Adds a ref to the CHC object on the top window. Helpful when the iframe refreshes */
   function addChcRefToRequestReviewFrame() {
      getRequestReviewWindow().chc = window.top.chc;
   }

  //~~~ SEARCH PAGE TAKE DOWN ~~~//

   /* Function unloadSearchPageMutators
      Removes the keyboard listeners from the page and undoes everything in runSetup */
   function unloadSearchPageMutators() {
      mutatorArray.map((muta) => {
         muta.disconnect();
      });
      mutatorArray = [];
   }

   /* Function unloadSearchPageShortcuts
      Removes the keyboard listeners from the page and undoes everything in runSetup */
   function unloadSearchPageShortcuts() {
         // todo: Make this functional? W/map
      var debouncedFn;
      for (var iter = shortcutFnArray.length - 1; iter >= 0; iter--) {
         debouncedFn = shortcutFnArray[iter].fn;
         getMainPageDoc().removeEventListener("keyup", debouncedFn);
         getAppFrameDoc().removeEventListener("keyup", debouncedFn);
         getTier1Doc().removeEventListener("keyup", debouncedFn);
         getTier2Doc().removeEventListener("keyup", debouncedFn);
         getRequestReviewDoc().removeEventListener("keyup", debouncedFn);         
      }
   }

   /* Function unloadSearchPageListeners
      Removes the keyboard listeners from the page and undoes everything in runSetup */
   function unloadSearchPageListeners() {
      getFieldSite().off('change',onSiteChange);
      getFieldPayer().off('change',onPayerChange);
      
      //iframe re-intiating CHC fn's
      getAppFrame().removeEventListener("load",addChcRefToAppFrame);
      getTier1Frame().removeEventListener("load",addChcRefToTier1Frame);
      getTier2Frame().removeEventListener("load",addChcRefToTier2Frame);
      getRequestReviewFrame().removeEventListener("load",addChcRefToRequestReviewFrame);     
      //functionality listeners
      getTier1Frame().removeEventListener("load",npiAutoSelect);
      // getTier2Frame().removeEventListener("load",addPersistentSearchBtn);
      getTier2Frame().removeEventListener("load",addSearchSpinner);
      getTier2Frame().removeEventListener("load",addSpinnerRevealOnSubmit);
      getRequestReviewFrame().removeEventListener("load",hideSearchSpinner);
      //shortcut re-establishers. B/c these frames reload
      getTier2Frame().removeEventListener("load",addShortcutsOnTier2Load);
      getRequestReviewFrame().removeEventListener("load",addShortcutsOnRequestReviewLoad);
   }

   /* Function unloadSearchPage
      Removes the keyboard listeners from the page and undoes everything in runSetup */
   function unloadSearchPage() {
      unload();
      unloadSearchPageShortcuts();
      unloadSearchPageListeners();
      unloadSearchPageMutators();

      removePersistentSearchBtn();
      removeSearchSpinner();
      // TODO: pull off the listeners on Site and payer
   }

  //~~~ RESULTS PAGE SETUP ~~~//

   /* Function setUpResultsPageKeyboardShortcuts
      Sets up the keyboard listeners to the page */
   function setUpResultsPageKeyboardShortcuts() {
      document.addEventListener("keyup", copyMcdId);
      console.warn(">> set up shortcuts");
   }

  //~~~ RESULTS PAGE TAKEDOWN ~~~//
   /* Function unloadResultsPage
      Removes the keyboard listeners from the page and undoes everything in runSetup */
   function unloadResultsPage() {
      unload();
      console.log(">> removed Results Page shortcuts");

      delete chc.allowedStatesDB;
      delete chc.stateDB;
      // TODO: add other DB's

      document.removeEventListener("keyup", copyMcdId);

      document.head.removeChild($('#highlight_css')[0]);
      unHighlightEls();
   }

   //--- OTHER UTILITY FN'S ---//
   /*  Function insertHighlightCSS
      Creates and adds the css element for the highlights*/
   function insertHighlightCSS() {
      console.log('ran insertHighlightCSS');
      var cssEl,
          cssContent = `
            .secondary > *, .secondary {
               background-color: #FFFDD0 !important;
               color: black !important;
            }
            .primary > *, .primary {
               background-color: #9FE2BF !important;
            }
            .mbi-highlight > *, .mbi-highlight {
               background-color: #D0DAFF !important;
            }
            .ltc-highlight > *, .ltc-highlight {
               background-color: #ffd0f5 !important;
            }`;

      cssEl = addCssEl(cssContent);
      cssEl.id = 'highlight_css';
   }

   /* Function getStateInfo
      Returns the info listed for the state detected on the page. */
   function getStateInfo() {
      var stateAbbr = getState();
      if(stateAbbr != undefined) {
         return stateDB.getStateInfo(stateAbbr);
      }

      return null;
   }

   /* Function getStateKeyWords
      Returns the keywords for the state detected on the page. */
   function getStateKeyWords() {
      var info = getStateInfo();
      if(info != undefined) {
         return info.keyWords;
      }

      return null;      
   }


//// SEARCH PAGE ////

   /* Function getThingsStarted
      Runs if Payer is empty when the CHC object is inserted into the page. 
      JQuery isn't loaded at this time */
   function getThingsStarted() {
      var payerID = getFieldPayer().getSelected();

      if(payerID == undefined) {
         onSiteChange(); // pretend Site changed
      }
   }

   /* Function insertNewSiteOptions
      Runs if Payer is empty when the CHC object is inserted into the page */
   function insertNewSiteOptions() {
      var jQ = getMainPageWindow().$,
          siteField = getFieldSite(),
          tnOption = jQ('<option value="BP00277137" title="Name: TN - HARMONY HEALTH PLAN, INC">TN - HARMONY HE...</option>'),
          ilOption = jQ('<option value="BP00277137" title="Name: IL - HARMONY HEALTH PLAN, INC">IL - HARMONY HE...</option>'),
          ctOption = jQ('<option value="BP00277123" title="Name: CT - WELLCARE HEALTH PLAN, INC.">CT - WELLCARE HE...</option>');

      // insert in reverse alphabetical so that inserting won't cause the insert positions to change
      siteField[0].add(tnOption[0],29);
      siteField[0].add(ilOption[0],10);
      siteField[0].add(ctOption[0],4);
   }

   /* The search page is a mess of several iframes. The important part is here:
      main page
         iframe #appFrame
            frameset #minibatch-frameset
               iframe iframe_tier1 -- control 
               iframe iframe_tier2 -- search
      This means that every interaction with parts of the page has to navigate these iframes. The getters/setters are 
   */


/*** FIELD & IFRAME GETTERS/SETTERS ***/
  // IFRAME GETTERS
   /* Function getMainPageDoc
      Gets doc of the Main Page */
   function getMainPageDoc() {
      return window.top.document;
   }
   /* Function getMainPageWindow
      Gets window of the Main Page */
   function getMainPageWindow() {
      return window.top;
   }

   /* Function getAppFrameFrame
      Gets the #appFrame iframe */
   function getAppFrame() {
      return window.top.$('#appFrame')[0];
   }
   /* Function getAppFrameDoc
      Gets doc of the #appFrame iframe */
   function getAppFrameDoc() {
      return window.top.$('#appFrame').contents()[0];
   }
   /* Function getAppFrameWindow
      Gets window of the #appFrame iframe */
   function getAppFrameWindow() {
      // don't know why this doesn't work: window.top.$('#appFrame').contentWindow;
      return window.top.document.querySelector('#appFrame').contentWindow;
   }

   /* Function getTier1Frame
      Gets the #iframe_tier1 iframe */
   function getTier1Frame() {
      return getAppFrameDoc().querySelector('#iframe_tier1');
   }
   /* Function getTier1Doc
      Gets doc of the #iframe_tier1 iframe */
   function getTier1Doc() {
      return getAppFrameDoc().querySelector('#iframe_tier1').contentWindow.document;
   }
   /* Function getTier1Window
      Gets window of the #iframe_tier1 iframe */
   function getTier1Window() {
      return getAppFrameDoc().querySelector('#iframe_tier1').contentWindow;
   }

   /* Function getTier2Frame
      Gets the #iframe_tier2 iframe */
   function getTier2Frame() {
      return getAppFrameDoc().querySelector('#iframe_tier2');
   }
   /* Function getTier2Doc
      Gets doc of the #iframe_tier2 iframe */
   function getTier2Doc() {
      return getAppFrameDoc().querySelector('#iframe_tier2').contentWindow.document;
   }
   /* Function getTier2Window
      Gets window of the #iframe_tier2 iframe */
   function getTier2Window() {
      return getAppFrameDoc().querySelector('#iframe_tier2').contentWindow;
   }

   /* Function getRequestReviewFrame
      Gets the #iframe_requestReview iframe */
   function getRequestReviewFrame() {
      return getAppFrameDoc().querySelector('#iframe_requestReview');
   }
   /* Function getRequestReviewDoc
      Gets doc of the #iframe_requestReview iframe */
   function getRequestReviewDoc() {
      return getAppFrameDoc().querySelector('#iframe_requestReview').contentWindow.document;
   }
   /* Function getRequestReviewWindow
      Gets window of the #iframe_requestReview iframe */
   function getRequestReviewWindow() {
      return getAppFrameDoc().querySelector('#iframe_requestReview').contentWindow;
   }

  // FIELD GETTERS/SETTERS: TIER 2
   /* Function getTier2El
      Shorthand to get a Tier 2 el. Since it doesn't have jquery in the iframe, we have to use querySelector*/
   function getTier2El(selector) {
      return getTier2Doc().querySelector(selector);
   }
   /* Function getTier2ElAll
      Shorthand to get a Tier 2 el. Since it doesn't have jquery in the iframe, we have to use querySelector*/
   function getTier2ElAll(selector) {
      return getTier2Doc().querySelectorAll(selector);
   }

   /* Function getFieldFirstName
      Gets the first name field */
   function getFieldFirstName() {
      return getTier2Doc().querySelector('#subscriberFirstName');
   }
   /* Function setFieldFirstName
      Sets the first name field */
   function setFieldFirstName(firstName=null) {
      var firstNameField = getTier1Window().$(getFieldFirstName());

      if(typeof firstName != 'string' ) {
         console.warn("Failed to set First Name _"+firstName+"_");
         return false;
      }

      firstNameField.val(firstName);

      return firstNameField.val() == firstName;
   }

   /* Function getFieldLastName
      Gets the last name field */
   function getFieldLastName() {
      return getTier2Doc().querySelector('#subscriberLastName');
   }
   /* Function setFieldLastName
      Sets the last name field */
   function setFieldLastName(lastName=null) {
      var lastNameField = getTier1Window().$(getFieldLastName());

      if(typeof lastName != 'string' || lastNameField == null) {
         console.warn("Failed to set Last Name _"+lastName+"_");
         return false;
      }

      lastNameField.val(lastName);

      return lastNameField.val() == lastName;
   }

   /* Function getFieldDOB
      Gets the DOB field */
   function getFieldDOB() {
      return getTier2Doc().querySelector('[name="dob"], #dob');
   }
   /* Function setFieldDOB
      Sets the DOB field */
   function setFieldDOB(dob=null) {
      var moddedDOB, dobField = getTier1Window().$(getFieldDOB());

      if(dobField == null) {
         console.warn("Failed to set DOB _"+dob+"_");
         return false;
      }

      moddedDOB = standardizeFullDateString(dob);

      dobField.val(moddedDOB);

      return dobField.val() == moddedDOB;
   }

   /* Function getFieldSSN
      Gets the SSN field */
   function getFieldSSN() {
      return getTier2Doc().querySelector('#subscriberSSN');
   }
   /* Function setFieldSSN
      Sets the SSN field */
   function setFieldSSN(ssn=null) {
      var selectedStateAbbr = getFieldPayer().getSelected(),
          ssnField = ( selectedStateAbbr == "CA" ? getTier1Window().$(getFieldMcdId()) : getTier1Window().$(getFieldSSN()) );

      if(ssnField == null || selectedStateAbbr == null) {
         return false;
      }

      if(typeof ssn == "string" && !/^\d{3}(-| )?\d{2}(-| )?\d{4}$/.test(ssn)){
         console.warn("Failed to set SSN (string) _"+ssn+"_");
         return false;
      } else if(typeof ssn != "string") {
         console.warn("Failed to set SSN (unrecognized) _"+ssn+"_");
         return false;
      }

      ssnField.val(ssn.replaceAll(/( |-)/g,""));

      return ssnField.val() == ssn;
   }

   /* Function getFieldMcdId
      Gets the Mcd ID field */
   function getFieldMcdId() {
      return getTier2Doc().querySelector('#subscriberId');
   }
   /* Function setFieldMcdId
      Sets the Mcd ID field */
   function setFieldMcdId(id) {
      var mcdIdField = getTier1Window().$(getFieldMcdId());

      if(mcdIdField == null) {
         console.warn("Failed to set Medicaid Id _"+id+"_");
         return false;
      }

      mcdIdField.val(id);

      return mcdIdField.val() == id;
   }

   /* Function getFieldGender
      Gets the gender field */
   function getFieldGender() {
      return getTier2Doc().querySelector('#gender');
   }
   /* Function setFieldGender
      Sets the gender field */
   function setFieldGender(gender=null) {
      var genderField = getTier1Window().$(getFieldGender());

      if (genderField == null) {
         return false;
      }

      if(gender == "Male") {
         gender = "M";
      } else if(gender == "Female") {
         gender = "F"
      }

      if(gender == "M" || gender == "F") {
         genderField.val(gender);
      } else {
         console.warn("Failed to set Gender: _"+gender+"_");
         return false;
      }

      return genderField.val() == gender;
   }

   /* Function getFieldCardIssueDate
      Gets the card issue date field */
   function getFieldCardIssueDate() {
      return getTier2Doc().querySelector('#cardIssueDate');
   }
   /* Function setFieldCardIssueDate
      Sets the card issue date field */
   function setFieldCardIssueDate(date=null) {
      var cardIssueDateField = getTier1Window().$(getFieldCardIssueDate());

      if(cardIssueDateField == null) {
         return false;
      }

      if(false) {// TODO: if not /\d\d/\d\d/\d\d, etc
         console.warn("Failed to set Card Issue Date _"+date+"_");
         return false;
      }

      cardIssueDateField.val(date);

      return cardIssueDateField.val() == date;
   }

  // FIELD GETTERS/SETTERS: TIER 1
   /* Function getTier1El
      Shorthand to get a Tier 1 el. */
   function getTier1El(selector) {
      return getTier1Window().$(selector);
   }

   /// SITE ///
   /* Function getFieldSite
      Gets the Site field. */
   function getFieldSite() {
      var siteField = getTier1Window().$('#select_site');
      if(siteField.length > 0) {
         siteField.search = searchSelectEl;
         siteField.getSelected = getSelected;
      }
      return siteField;
   }
   /* Function setFieldSite
      Sets the Site field. */
   function setFieldSite(stateAbbr=null) {
      if(typeof stateAbbr != "string" || !allowedStatesDB.isStateAllowed(stateAbbr)) {
         console.warn("Failed to set Site  _"+stateAbbr+"_");
         return false;
      }

      var optionToSelect,
          siteField = getFieldSite(),
          verifiedAbbr = stateNameToAbbrDB.getAbbr(stateAbbr),
          siteFieldValue = siteFieldValueDB.getSiteFieldValue(verifiedAbbr); 

      // don't re-set it if it's already there
      if(siteField.getSelected().text().substr(0,2) == stateAbbr) {
         return true;
      }
      // don't set it if it doesn't exist // moot b/c aren't using it?
      if(siteFieldValue == undefined) {
         return false;
      }

      // set the select's value
      // select has options w/duplicate values/text. Need to add the - to catch the correct one
      optionToSelect = siteField.search("Name: "+stateAbbr);
      if(optionToSelect.length != 0) {
         optionToSelect[0].selected = true;
         siteField[0].dispatchEvent(new Event('change'));
      } else {
         return false;
      }

      return siteField.getSelected().text().substr(0,2) == stateAbbr;
   }

   /* Function onSiteChange
      Sets it up so that when Site changes, it automatically changes the Payer field */
   function onSiteChange() {
      console.warn("-------- onSiteChange fired -------- ");
      var stateAbbr = getFieldSite().getSelected().text().slice(0,2),
          stateInfo = stateDB.getStateInfo(stateAbbr);

      // console.log("selectedOption",selectedOption);
      // console.log("optionText",optionText);
      // console.log("stateAbbr",stateAbbr);
      // console.log("stateInfo",stateInfo);

      if(stateInfo.ltcWaiver == "x") {
         addLtcWarningEl();
         showLtcWarning();
      } else {
         hideLtcWarning();
      }

      /* we don't have to set the NPI, b/c npiAutoSelect handles it 
         through an observer. The NPI select is recreated each time */

      console.log("ran setFieldPayer w ", stateAbbr);
      setFieldPayer(stateAbbr);
      // if(stateInfo.usesLtcWaiver) {showLtcEL()} else { hideLtcEl() }
      console.warn("-------- onSiteChange end -------- ");
   }

   /// PAYER ///
   /* Function getFieldPayer
      Gets the payer field--determines which state is being looked up, and the fields you can use to search.
      It's special  */
   function getFieldPayer() {
      var payerField = getTier1Window().$('#payerdropdown');

      payerField.getSelected = getFieldPayerSelectedState;

      return payerField;
   }
   /* Function getFieldPayerSelect
      Gets the select element of the payer field. The field determines which state is being looked up, and the fields you can use to search.
      It's special  */
   function getFieldPayerSelectedState() {
      var selectedLI = getAppFrameWindow().$("li[aria-selected='true']"),
          payerID = selectedLI.children()[2];

      return selectedLI.length == 0 ? undefined : payerID.innerHTML.substr(2,2);
   }
   /* Function setFieldPayer
      Sets the payer field. B/c it has some searching behavior, sometimes required to do a settimeout 
      so the info is there when we attempt to select it. */
   function setFieldPayer(state) {
      if(state == null || state == "") {
         console.warn("Failed to set Payer _"+state+"_");
         return false;
      }

      var appFrameDoc = getAppFrameDoc(), tier1Doc, payerData, payerDD, payerDDEl,
          targetStateIcon = appFrameDoc.querySelector('[id*=icon-SK'+state+']');

      // the targetStateIcon is the star. We want the actual name element
      if(targetStateIcon != null) {
         console.log("clicking the el next to the star");
        targetStateIcon.nextElementSibling.click();
      } else {
         console.log("have to go get data");
         // Have to go get the state data info
         payerDD = getFieldPayer();
         if(payerDD.data == undefined) {
            payerDD.click(); // open it, cause it to load
            payerDD.click(); // close it, so it doesn't show up
            console.log(">> loading data. Pay attention");
            // payerDDEl = getTier1El('.k-widget.k-dropdown');
            // payerDDEl.click(); // open it, cause it to load
            // payerDDEl.click(); // close it, so it doesn't show up
         }
         payerData = payerDD.data('kendoDropDownList');

            // observer attempt
            var fn = function (mutationList, observer) {
               console.log("one-time observer fired");
               payerData.select(1);
               payerData.trigger('change');
               getTier1Window().loadPayerInfo(payerData.dataItem(1).id);

               observer.disconnect(); // this makes it one-time
            }
            payerDDEl = getAppFrameWindow().$("#tier1HackDiv .k-list-scroller");            
            addMutationObs(payerDDEl,fn,{childList:true, subtree:true});

         payerData.search('SK'+state);
         payerData.close();

         // OLD TIMEOUT ATTEMPT. KEPT B/C TESTING OBSERVER. I PREFER A LISTENER, BUT BEGGARS CAN'T BE CHOOSERS
         // Give the DD a moment to get the data // replace w/a listener if you can
         // setTimeout(function () {
         //    console.log("timeout fn fired");
         //    payerData.select(1);
         //    payerData.trigger('change');
         //    getTier1Window().loadPayerInfo(payerData.dataItem(1).id);
         // },300);
      }
   }

   /* Function onPayerChange
      Fires after the Payer field changes.  */
   function onPayerChange() {
      console.warn("onPayerChange fired");
      var searchOption = getFieldSearchOption(),
          delay = 0;
      if(searchOption.length == 0 ) {
         delay = 800;
      }
      changeSearchOptionToPreferredOption(delay);
   }

   /// SEARCH OPTION ///
   /* Function getFieldSearchOption
      Gets the Search Option field--determines info used in search: SSN, DOB, Name, etc */
   function getFieldSearchOption() {
      var searchOption = getTier1Window().$('#select_searchOption');
      if(searchOption.length > 0) {
         searchOption.search = searchSelectEl;
         searchOption.getSelected = getSelected;
      }
      // TODO: Make sure the option exists before you select it
      return searchOption;
   }

   /* Function setFieldSearchOption
      Gets the Search Option field--determines info used in search: SSN, DOB, Name, etc */
   function setFieldSearchOption(optionCode) {
      if(typeof optionCode != "number") {
         console.warn("Failed to set Search Option _"+optionCode+"_");
         return false;
      }

      var searchOption = getFieldSearchOption();
      if(searchOption.search(optionCode).length == 0) {
         return false;
      } else {
         searchOption.val(optionCode);
         searchOption[0].dispatchEvent(new Event('change'));
         return true;
      }
   }

   /* Function changeSearchOptionToPreferredOption
      Gets the Search Option field--determines info used in search: SSN, DOB, Name, etc */
   function changeSearchOptionToPreferredOption(delay) {
      console.log("changeSearchOptionToPreferredOption fired w/delay of ", delay);
      if(delay == undefined || delay == 0) {
         // Setter returns false if not set. This will cut off the 
         // first time there is a successful setting.
         setFieldSearchOption(SEARCH_OPT_NAME_DOB) || setFieldSearchOption(SEARCH_OPT_NAME_DOB_GENDER);
      } else {
         setTimeout(changeSearchOptionToPreferredOption(0),delay);
      }
   }

   /* Function onSearchOptionChange
       */
   // function onSearchOptionChange() {
   //    doing a mutation observer instead
   // }

   /// NPI ///
   /* Function getFieldNPI
      Gets the NPI field--determines the provider ID used for search */
   function getFieldNPI() {
      var npiSelect = getTier1Window().$('#selectSiteNPI');
      if(npiSelect.length > 0) {
         npiSelect.search = searchSelectEl;
         npiSelect.getSelected = getSelected;
      }

      return npiSelect;
   }

   /* Function setFieldNPI
      Gets the NPI field--determines the provider ID used for search. True if it successfully sets */
   function setFieldNPI(npi) {
      console.log("setFieldNPI got called");
      var npiField = getFieldNPI();

      if(npiField.search(npi)) {
         npiField.val(npi);
         npiField[0].dispatchEvent(new Event('change'));
         return true;
      } else {
         return false;
      }
   }

   function checkGetters() {
      console.log("--- top ---")
      console.log("getFieldSite():",getFieldSite());
      console.log("getFieldPayer():",getFieldPayer());
      console.log("getFieldSearchOption():",getFieldSearchOption());  
      console.log("getFieldNPI():",getFieldNPI());  
      console.log("--- bottom ---")
      console.log("getFieldFirstName():",getFieldFirstName());
      console.log("getFieldLastName():",getFieldLastName());
      console.log("getFieldDOB():",getFieldDOB());
      console.log("getFieldSSN():",getFieldSSN());
      console.log("getFieldMcdId():",getFieldMcdId());
      console.log("getFieldGender():",getFieldGender());
      console.log("getFieldCardIssueDate():",getFieldCardIssueDate());
   }


/*** SELECTOR LOGIC ***/
   // The HTML Selectors don't have logic behind them, so I have to add this in

   /* Function getSelected
      Attaches to an HTML select, to add the functionality to get the selected value. */
   function getSelected() {
      return this.contents().filter(":selected");
   }

   /* Function getIndexOfOption
       */
   function getIndexOfOption(input, equalityFn) {
      var selectElNodes = this[0] != undefined ? this[0].contents() : this.contents();

      for (var iter = 0; iter < selectElNodes.length; iter++) {
         if(equalityFn != undefined && equalityFn(selectElNodes[iter])) {
            return iter;
         } else {
            if (selectElNodes[iter].value == input){
               return iter;
            }
            if (selectElNodes[iter].title.search(input) != -1) {
               return iter;
            }
         }
      }
      return undefined;
   }

   /* Function searchSelectEl
      Returns all options inside a HTML select that matches the value passed in.
      "Matches" means equal, if value is a #, contains, if value is a string */
   function searchSelectEl(value) {
      return this.contents().filter((pos,option)=>{
         var option = $(option),
             optionVal = option.val(),
             title = option.attr('title'),
             innerText = option.text(),
             matchFound = false;

         matchFound = optionVal.search(value) >= 0;

         if(!matchFound && typeof title != 'undefined') {
            matchFound = title.search(value) >= 0;
         }

         if(!matchFound) {
            matchFound = innerText.search(value) >= 0;
         }

         return matchFound;
      });
   }

   
/*** TOAST MESSAGE ***/


/*** NPI/SEARCH OPTION AUTOSELECT ***/
      // Callback function to execute when mutations are observed
      callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "childList") {
            console.log("A child node has been added or removed.");
          } else if (mutation.type === "attributes") {
            console.log(`The ${mutation.attributeName} attribute was modified.`);
          }
        }
      };

   /*
      typeof mutaSelect != "undefined" ? mutaSelect.disconnect() : "";
      typeof mutaSelectPar != "undefined" ? mutaSelectPar.disconnect() : "";
      typeof mutaSelectParPar != "undefined" ? mutaSelectParPar.disconnect() : "";

      mutaSelect = new MutationObserver(()=> console.log("select"));
          config = {childList:true, subtree:true};
      mutaSelect.observe(temp1, config);

      mutaSelectPar = new MutationObserver(()=> console.log("parent"));
          config = {childList:true, subtree:true};
      mutaSelectPar.observe(temp2, config);

      mutaSelectParPar = new MutationObserver(()=> console.log("parent parent"));
          config = {childList:true, subtree:true};
      mutaSelectParPar.observe(temp3, config);
   */


   /* Function setSearchOptionFromStateInfo
      Attached to the tier1 load, this gets the NPI from the state info and selects it */
   function setSearchOptionFromStateInfo() {
      var stateAbbr = getFieldPayer().getSelected();
          preferredOption = preferredSearchOptionDB.getPreference(stateAbbr);

      if(preferredOption != "") {
         setFieldSearchOption(preferredOption)
      }
   }

   /* Function searchOptionAutoSelect
      Attached to the tier1 load, this gets the NPI from the state info and selects it */
   function searchOptionAutoSelect() {
      // TODO: have this grab the data object, and determine which option is best given the data
      // TODO: change the preferredSearchOptionDB to have an *array*, in preferred order
      var searchOptionParentObserver = new MutationObserver(setSearchOptionFromStateInfo),
                                           config = {childList:true},
                                           searchOptionSelectParent = getTier1El("#td_searchOption");

      searchOptionParentObserver.observe(searchOptionSelectParent[0], config);
      // console.log("searchOptionAutoSelect", searchOptionSelectParent[0], config);

      return searchOptionParentObserver;
   }

   /* Function setNpiFromStateInfo
      Attached to the tier1 load, this gets the NPI from the state info and selects it */
   function setNpiFromStateInfo() {
      console.warn("setNpiFromStateInfo");
      var stateAbbr = getFieldSite().getSelected().text().substr(0,2),
          npi = stateDB.getNPI(stateAbbr);

      if(npi != "") {
         setFieldNPI(npi)
      }
   }

   /* Function npiAutoSelect
      Attached to the tier1 load, this gets the NPI from the state info and selects it */
   function npiAutoSelect() {
      console.warn("npiAutoSelect");
      var npiParentObserver = new MutationObserver(setNpiFromStateInfo),
          config = {childList:true},
          npiSelectParent = getTier1El("#td_siteNPI");

      npiParentObserver.observe(npiSelectParent[0], config);

      return npiParentObserver;
   }


/*** KEYBOARD SHORTCUTS ***/

   /* Function initiateSearch
      Triggers the search */
   function initiateSearch(evt) {
      // CTRL + Enter // b/c it's a common submit shortcut
      if (evt.ctrlKey && evt.which == 13) {
         console.log("ran initiateSearch");
         var submitButton = getTier2El('#submit-button');
         if(submitButton != null) {    
            submitButton.click();
         }
      }
   }

   /* Function focusSiteEl
      Triggers the search */
   function focusSiteEl(evt) {
      // CTRL + SHIFT + S // b/c it's like "search" or "start". This where the search begins
      if (evt.ctrlKey && evt.shiftKey && evt.which == 83) {
         var siteField = getFieldSite();
         siteField.focus();
         siteField[0].showPicker();
      }
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
               var cuInfoObj = getObjFromCopiedText(clipText,"Cu/Agent Info ");

               if(cuInfoObj.state != "" && cuInfoObj.state != undefined 
                  && allowedStatesDB.isStateAllowed(cuInfoObj.state)) {
                  // If the state is the same as the site, just paste in the info
                  if(getFieldSite().getSelected().attr('title').substr(6,2) == cuInfoObj.state) {
                        fillFields(cuInfoObj);
                        submitIfComplete();
                  } else {
                     // Don't have to worry about setting anything else, b/c it auto-cascades
                     if(setFieldSite(cuInfoObj.state)) {
                        getTier1Window().$(getTier2Frame()).one("load",function () {
                           fillFields(cuInfoObj);
                           submitIfComplete();
                        });
                     }
                  }
               } else {
                  fillFields(cuInfoObj);
                  submitIfComplete();
               }

               // TODO: make this smart
               // customer.load(cuInfoObj);
            });
      }

   }

   /* Function fillFields
      Adds info from data object provided to every  */
   function fillFields(data) {
      if(typeof data != "object") {
         console.warn("Could not fill fields. Data is not an object");
         return false;
      }

      var currState;

      currState = getFieldPayer().getSelected();

      if(data.firstName != "" && data.firstName != undefined) {
         setFieldFirstName(data.firstName);
      }
      
      if(data.lastName != "" && data.lastName != undefined) {
         setFieldLastName(data.lastName);
      }
      
      if(data.dob != "" && data.dob != undefined) {
         setFieldDOB(data.dob);
         if(currState == "CA") {
            setFieldCardIssueDate(data.dob);
         }
      }
      
      if(data.ssn != "" && data.ssn != undefined) {
         setFieldSSN(data.ssn.replaceAll(/\-/g,""));
         if(currState == "CA") {
            setFieldMcdId(data.ssn.replaceAll(/\-/g,""));
         }
      }
      
      if(data.mcdId != "" && data.mcdId != undefined) {
         setFieldMcdId(data.mcdId);
      }
      
      if(data.sex != "" && data.sex != undefined) {
         setFieldGender(data.sex);
      }

      // TODO: set focus to the first element in the thingy
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
   

/*** CUSTOMER INFO OBJECT ***/
   customer = {
      _data: {
         "fullName": "",
         "firstName": "",
         "lastName": "",
         "dob": "",
         "ssn": "",
         "sex": "",
         "mcdId": ""
      },

      /* Function load
         Takes in a data object and fills the fields out */
      load: function(data) {
         this._data.fullName  = (data.fullName  != "" ? data.fullName : "");
         this._data.firstName = (data.firstName != "" ? data.firstName : "");
         this._data.lastName  = (data.lastName  != "" ? data.lastName : "");
         this._data.dob       = (data.dob       != "" ? data.dob : "");
         this._data.ssn       = (data.ssn       != "" ? data.ssn : "");
         this._data.sex       = (data.sex       != "" ? data.sex : "");
         this._data.mcdId     = (data.mcdId     != "" ? data.mcdId : "");
      },

      /* Function load
         Takes in a data object and fills the fields out.
         Adds to things, if the name, etc matches */
      smartLoad: function(data) {
         // state is ""
         // state matches
         // state *doesn't* match
         // full name matches

         // if the state matches, and the name matches, or if the name and state don't exist
         if((data.state == this._data.state && data.fullName == this._data.fullName)
            || (data.state == "" && data.fullName == ""))


         this._data.dob       = (data.dob       != "" ? data.dob : "");
         this._data.sex       = (data.sex       != "" ? data.sex : "");
         this._data.mcdId     = (data.mcdId     != "" ? data.mcdId : "");
         this._data.ssn       = (data.ssn       != "" ? data.ssn : "");
         this._data.fullName  = (data.fullName  != "" ? data.fullName : "");
         this._data.firstName = (data.firstName != "" ? data.firstName : "");
         this._data.lastName  = (data.lastName  != "" ? data.lastName : "");
      },
   
      /* Function clear
         Erases all data in the object */
      clear: function() {
         this._data = {
            "fullName": "",
            "firstName": "",
            "lastName": "",
            "dob": "",
            "ssn": "",
            "sex": "",
            "mcdId": ""
         }
      },
   
      /* Function get
         Returns the value of the given key*/
      get: function(key) {
         if(typeof key != "string") {
            return undefined;
         }

         return this._data[key];
      },
      
      /* Function fill
         Fills out the available form elements */
      fillFields: function() {
         if(this._data.dob       != "") {setFieldDOB(this._data.dob)}
         if(this._data.sex       != "") {setFieldGender(this._data.sex)}
         if(this._data.mcdId     != "") {setFieldMcdId(this._data.mcdId)}
         if(this._data.ssn       != "") {setFieldSSN(this._data.ssn)}
         if(this._data.firstName != "") {setField(this._data.firstName)}
         if(this._data.lastName  != "") {setField(this._data.lastName)}
      }
   }


/*** SEARCH SPINNER ***/
   searchCounter = 0;

   /* Function getSearchCounter
      Returns the search counter el*/
   function getSearchCounter() {
      return getTier2Doc().getElementsByClassName('search-counter')[0];
   }

   /* Function getSearchSpinner
      Returns the search spinner img el*/
   function getSearchSpinner() {
      return getTier2Doc().getElementsByClassName('search-spinner')[0];
   }

   /* Function getSubmitButton
      Returns the submit button */
   function getSubmitButton() {
      return getTier2Doc().getElementById("submit-button");
   }

   /* Function addSearchSpinner
      Adds the search spinner el, which starts hidden */
   function addSearchSpinner() {
      var tier2Doc = getTier2Doc(),
          spinnerEl = tier2Doc.createElement("img"),
          counterEl = tier2Doc.createElement("span"),
          submitButton = getSubmitButton(),
          cssEl, cssContent;

      if(getSubmitButton() != undefined && getSearchSpinner() == undefined) {   
         // add the counter so it shows up on top
         counterEl.classList.add("search-counter","hidden");
         counterEl.innerHTML = searchCounter;
         submitButton.parentElement.prepend(counterEl);

         spinnerEl.src = "https://media1.tenor.com/m/BPhklqWg14cAAAAC/spinning-spin.gif";
         spinnerEl.classList.add("search-spinner","hidden");
         submitButton.parentElement.prepend(spinnerEl);
      }  

      if(tier2Doc.getElementById('spinner_css') == null) {
         cssContent = `
            .search-counter {
               margin-left: -14px;
               padding-right: 8px;
            }

            .search-spinner {
               height: 22px;
               vertical-align: inherit;
               padding-bottom: 4px;
            }
            .hidden {
               display: none;
            }`;
            
         cssEl = addCssEl(cssContent, tier2Doc);
         cssEl.id = 'spinner_css';
      }

   }

   /* Function addSpinnerRevealOnSubmit
      Adds a listener to the submit button that shows the search spinner*/
   function addSpinnerRevealOnSubmit() {
      var submitButton = getSubmitButton()
      if(submitButton != null) {
         submitButton.addEventListener("click",showSearchSpinner);
      }
   }

   /* Function removeSpinnerRevealOnSubmit();
      Adds a listener to the submit button that shows the search spinner*/
   function removeSpinnerRevealOnLoad() {
      var submitButton = getSubmitButton()
      if(submitButton != null) {
         submitButton.removeEventListener("click",showSearchSpinner);
      }
   }

   /* Function showSearchSpinner
      Shows the search spinner */
   function showSearchSpinner() {
      var searchCounterEl;
      if(getTier2El("#error_div").children.length == 0) {
         getSearchSpinner().classList.remove('hidden');
         searchCounter++;

         if(searchCounter > 1) {
            searchCounterEl = getSearchCounter()
            searchCounterEl.innerHTML = searchCounter;
            searchCounterEl.classList.remove('hidden');
         }
      }
   }

   /* Function hideSearchSpinner
      Hides the search spinner */
   function hideSearchSpinner() {
      getSearchSpinner().classList.add('hidden');
      getSearchCounter().classList.add('hidden');
      searchCounter = 0;
   }

   /* Function removeSearchSpinner
      Hides the search spinner */
   function removeSearchSpinner() {
      var spinner = getSearchSpinner(),
          counter = getSearchCounter();

      spinner != undefined ? spinner.remove() : "";
      counter != undefined ? counter.remove() : "";
   }


/*** CHC CONTEXT ***/
   // The HTML Selectors don't have logic behind them, so I have to add this in

   /* Function getContext
      Figures out which of the 4 iframes the CHC code was inserted into */
   function getContext(windowObj) {
      if (executesOnMainPage(windowObj)) {
         return "Main Page";
      } else if (executesOnTier1(windowObj)) {
         return "Tier 1";
      } else if (executesOnTier2(windowObj)) {
         return "Tier 2";
      } else if (executesOnAppFrame(windowObj)) {
         return "App Frame";
      } else {
         console.warn("Context not recognized", window);
         return "Unidentified";
      }
   }

   /* Function executesOnMainPage
      Returns if the fn executes on the Main Page */
   function executesOnMainPage(windowObj) {
      if(windowObj != undefined) { return windowObj.name == ""; }
      else { return window.name == ""; }
   }
   /* Function executesOnTier1
      Returns if the fn executes in the context of the Tier 1 iframe */
   function executesOnTier1(windowObj) {
      if(windowObj != undefined) { return windowObj.name == "iframe_tier1"; }
      else { return window.name == "iframe_tier1"; }
   }
   /* Function executesOnTier2
      Returns if the fn executes in the context of the Tier 2 iframe */
   function executesOnTier2(windowObj) {
      if(windowObj != undefined) { return windowObj.name == "iframe_tier2"; }
      else { return window.name == "iframe_tier2"; }
   }
   /* Function executesOnAppFrame
      Figures out which of the 4 iframes the CHC code was inserted into */
   function executesOnAppFrame(windowObj) {
      if(windowObj != undefined) { return windowObj.name == "appFrame"; }
      else { return window.name == "appFrame"; }
   }


/*** PERSISTENT SEARCH ***/

   var numSearches = 0;
   var persistentSearchIsOn = false;

   // TODO: Make a "Persistent Search" button
      // TODO: Make a red/green stying, with # of searches showing
      // TODO: It searches, then adds a load listener to the results section
      // TODO: once it loads, it checks if there is a not "rejected" entry
         // if no, re-click search
         // if yes, stop. 
            // if active, click the link
      // TODO: ADD A counter that zeros out whenever it is turned off (find something, new search/state
      // TODO: have it auto click the link that works? >> only if it is active
      // TODO: have it make a sound
      // TODO: have it cut off after 20

   // DONE

   /* Function getPersistentSearchBtn
      Returns the persistent search button el*/
   function getPersistentSearchBtn() {
      return getTier2Doc().getElementsByClassName("persistent-search-btn")[0];
   }
   
   /* Function addPersistentSearchBtn
      Adds the persistent search el 
      Has 3 states: 
         Off     - the logic does not run 
         Active  - the logic will run when a search happens, but no current search
         Running - the logic is being used, as there is a current search running */
   function addPersistentSearchBtn() {

      var tier2Doc = getTier2Doc(),
          persistentSearchBtn = tier2Doc.createElement("button"),
          submitButton = getSubmitButton(),
          cssEl, cssContent;

      // May need to do this as an input....

      if(getPersistentSearchBtn() == undefined) {   
         persistentSearchBtn.classList.add("persistent-search-btn","secondary_btn","flip");
         persistentSearchBtn.innerHTML = "⭮";
         persistentSearchBtn.onclick = togglePersistentSearch;
         persistentSearchBtn.type = "button";
         submitButton.after(persistentSearchBtn); // TODO: Set it up *after* the Submit button
      }  

      if(tier2Doc.getElementById('persistent_search_styling') == null) {
         cssContent = `
            .persistent-search-btn.flip {
               transform: rotate(-180deg);
            }
            .persistent-search-btn {
               font-size: large;
               color: white;
               background: #c72121; /* red */
               border: #c72121;

               /* Since this is rotated, the padding, etc is flipped*/
               margin-left: 21.5px;
               margin-right: 8.5px;
               padding: 0 10px 3px 10px;
               width: 42px;
            }

            .persistent-search-btn.active.secondary_btn:hover {
               background: #24b530;
               color: white;
               border: #2e8d16;
            }
            .persistent-search-btn.active {
               font-size: medium;
            }

            .persistent-search-btn.running {
               background: #2e8d16;
               border: #2e8d16;
            }`;
            
         cssEl = addCssEl(cssContent, tier2Doc);
         cssEl.id = 'persistent_search_styling';
      }

   }

   /* Function removePersistentSearchBtn
      Removes the persistent search el and functionality*/
   function removePersistentSearchBtn() {
      var persistentSearchBtn = getPersistentSearchBtn();
      
      if(persistentSearchBtn != undefined) {
         persistentSearchBtn.remove();
      }
   }

   /* Function togglePersistentSearch
      Turns the function on or off */
   function togglePersistentSearch(e) {
      var persistBtn = getPersistentSearchBtn();

      persistentSearchIsOn = !persistentSearchIsOn;
      if(persistentSearchIsOn) {
         numSearches = 0;
         changePersistentSearchBtnText(numSearches);
         persistBtn.classList.add("active");
         persistBtn.classList.remove("flip", );
         // set up listener on Tier 2 for thingy
      } else {
         numSearches = 0;
         changePersistentSearchBtnText("⭮");
         persistBtn.classList.add("flip");
         persistBtn.classList.remove("active");
      }
   }

   /* Function changePersistentSearchBtnText
      Changes the text shown on the search button*/
   function changePersistentSearchBtnText(val) {
      var persistentSearchBtn = getPersistentSearchBtn();
      
      if(persistentSearchBtn != undefined) {
         persistentSearchBtn.innerHTML = val;
      }
   }

   /* Function setUpPersistentSearch
      Sets up the listener */
   function setUpPersistentSearch(windowObj) {
      
   }

   /* Function removePersistentSearch
      Sets up the listener */
   function removePersistentSearch(windowObj) {
      
   }


/*** LTC WARNING ***/

   /* Function getLtcWarningEl
      Returns the el containing the LTC warning */
   function getLtcWarningEl() {
      var el = getTier1El("#ltc_warning")
      return el.length > 0 ? el[0] : undefined;
   }

   /* Function addLtcWarningEl
      Adds the search spinner el, which starts hidden */
   function addLtcWarningEl() {
      var tier1Doc = getTier1Doc(),
          warning = tier1Doc.createElement("span"),
          // parentEl = tier1Doc.getElementById("td_provider_npi"), << gets reset?
          parentEl = tier1Doc.getElementsByClassName("billingProviderRow")[0],
          cssEl, cssContent;

      if(getLtcWarningEl() == undefined) {   
         warning.classList.add("ltc-warning","hidden");
         warning.innerHTML = "State uses LTC waiver";
         warning.id = "ltc_warning";
         parentEl.append(warning);
      }  

      if(tier1Doc.getElementById('warning_css') == null) {
         cssContent = `
            .ltc-warning {
               color: red;
               display: block;
               width: 140px;
               padding: 3px;
               font-weight:bold;
            }

            .hidden {
               display: none;
            }`;
            
         cssEl = addCssEl(cssContent, tier1Doc);
         cssEl.id = 'warning_css';
      }

   }

   /* Function hideLtcWarning 
      Removes the LTC warning el */
   function hideLtcWarning () {
      var warning = getLtcWarningEl()
      warning != undefined ? warning.classList.add("hidden") : "";
   }

   /* Function showLtcWarning 
      Removes the LTC warning el */
   function showLtcWarning () {
      var warning = getLtcWarningEl()
      warning != undefined ? warning.classList.remove("hidden") : "";
   }

   /* Function removeLtcWarningEl 
      Removes the LTC warning el */
   function removeLtcWarningEl () {
      var warning = getLtcWarningEl()
      warning != undefined ? warning.remove() : "";
   }


/*** FIXIT FUNCTIONS: SSN, DOB ***/

   /* Function setUpFixItFns
      Adds the fix-it fn's to the frame*/
   function setUpFixItFns(evt) {
      var ssnField = getFieldSSN(),
          dobField = getFieldDOB();

      $(ssnField).on("focusout",fixSSN);
      $(dobField).on("focusout",fixDOB);
   }

   /* Function fixSSN
      Triggers when the SSN input loses focus. Fixes the formatting for it */
   function fixSSN(evt) {
      setFieldSSN(evt.target.value);
   }

   /* Function fixDOB
      Triggers when the SSN input loses focus. Fixes the formatting for it */
   function fixDOB(evt) {
      setFieldDOB(evt.target.value);
   }
   

//// RESULTS PAGE ////

/*** TOAST ***/
   //TODO: Add toast els
   //TODO: Add toast event
   //TODO: Add toast CSS
   //TODO: Items to include: version, state notes, Ex Mc #, 

   /* Function exampleFn
      DESCRIPTION */
   function exampleFn() {
      // var firstInfoElList = $('div.chc-comment:contains("Agent Name:")');
      // var firstInfoElListLn = firstInfoElList.length;
      // if (firstInfoElListLn == 0) {
      //    return null;
      // } else {
      //    return firstInfoElList[firstInfoElListLn-1];
      // }
   }

   /**** SUB FEATURE ****/

   /* Function subfeatureFn
      DESCRIPTION */
   function subfeatureFn() {

   }


/*** KEYWORD HIGHLIGHTER ***/

   /* Function getState
      Gets the state we are currently on */
   function getState() {
      var addressTxt, apparentState, matches, addressEl,
          submitterEl = $('#submitter-info caption')[0];
          
      // See if we can get the state from the "Submitter" Section title
      if(submitterEl!=undefined) {
         submitterTxt = submitterEl.innerHTML;
         matches = submitterTxt.match(/:\s+([A-Z]{2})(\s|-)/);
         if(matches != null && matches.length >= 2) {
            apparentState=matches[1]
         }
      }

      // TODO: Use the blue thing on top to figure out our state
      if(apparentState == undefined || apparentState == "NC" || apparentState == "AR") {
         // AR, TN, IL, NC, CT
         addressEl = $('#patient-info tr:contains("Address")');

         if($('div:contains("MEDI-CAL")').length > 0){
            apparentState = "CA";
         } else if($('div:contains("AHCCCS")').length > 0){
            apparentState = "AZ";
         } else if($('div:contains("TENNESSEE MEDICAID")').length > 0){
            apparentState = "TN";
         } else if($('div:contains("ILLINOIS MEDICAID")').length > 0){
            apparentState = "IL";
         } else if($('div:contains("HP/CTMAP")').length > 0){
            apparentState = "CT";
         } else if($('div:contains("NCTRACKS")').length > 0){
            apparentState = "NC";
         } else if($('div:contains("ARKANSAS MEDICAID")').length > 0){
            apparentState = "AR";
         } else if(addressEl.length != 0) {
            addressTxt = addressEl[0].nextSibling.childNodes[1].innerHTML;
            apparentState=addressTxt.match(/,\s+([A-Z]{2})/)[1];
         } else {
            console.warn("Could not find state");
         }

      } 

      console.log("Got "+apparentState+" for state");

      return apparentState;
   }
   
   /* Function wrapInfoInElWithSpan
      Wraps the important info in the element with a span */
   function wrapInfoInElWithSpan() {
      //TODO: create span w/primary or secondary info class
      //TODO: refill element w/data, but added span
   }
   
   /* Function getMbiEl
      Gets the MBI el to highlight. Returns an element  */
   function getMbiEl() {
      // HIC Number#:
      // Other Number:
      // Group/Policy Number:  
      var selectedEls=[], mbi;
      var mbiRegex =/[0-9][AC-HJKMNP-RT-Y][0-9AC-HJKMNP-RT-Y][0-9]\-?[AC-HJKMNP-RT-Y][0-9AC-HJKMNP-RT-Y][0-9]\-?[AC-HJKMNP-RT-Y]{2}[0-9]{2}/gi;

      mbiSearchResult = mbiRegex.exec(document.body.innerText);
      if(mbiSearchResult != null) {
         mbi = mbiSearchResult[0];
         selectedEls = $(".generalSection td:contains('"+mbi+"')");
         if(selectedEls.length==0) {
            selectedEls = $(".general-info-column td:contains('"+mbi+"')");
            if(selectedEls.length==0) {
               selectedEls = $$("tr:contains('"+mbi+"')");
               if(selectedEls.length==0) {
                  selectedEls = $$("tr:contains('"+mbi+"')");
               }
            }
         }
      }
      
      console.log(">>", selectedEls);
      return selectedEls[0];
   }
   
   /* Function getLtcEl
      Gets the LTC el to highlight. Returns an element  */
   function getLtcEl() {
      var selectedEls;
      
      selectedEls = $(".coverage-grid td:contains('Long-Term Care')");
      // if(selectedEls.length==0) {
      //    selectedEls = $("th:contains('')");
      //    if(selectedEls.length==0) {
      //       selectedEls = $("th:contains('')");
      //       if(selectedEls.length==0) {
      //          selectedEls = $("th:contains('')");
      //       }
      //    }
      // }
      console.log(">>", selectedEls);
      return selectedEls[0];
   }

   /* Function highlightImportantEls
      Gets all the els to highlight. Returns an array of the highlighted els */
   function highlightImportantEls() {
      console.log('ran highlightImportantEls');
      const primaryClassName = "primary",
            secondaryClassName = "secondary",
            mbiClassName = "mbi-highlight",
            ltcClassName = "ltc-highlight";
      var elAry =[], keyWord, selectedEls, tempEl, classToAdd, mbiEl,
          focusEl = null, highlightedEls = [],
          highlightParentEl = true;
          state = getState(),
          stateInfo = stateDB.getStateInfo(state),
          keyWords = stateInfo.keyWords.split("/");

      /* Debugging examples: 
         GA - Plan Coverage Description: / COE
         KY - memberProgramCode / memberStatusCode
         CA - Primary Aid Code / 2nd Special Aid Code
         TN - ...a problem child
      */

      //Inactive is always something we want to search for
      keyWords.push("Inactive");
      keyWords.push("Spenddown");
      keyWords.push("Spend Down");
      if(state == "LA") {
         keyWords.push("Active");
      }

      // search for each key word
      for (var pos = 0; pos < keyWords.length; pos++) {
         selectedEls = "";
         keyWord = keyWords[pos].trim();
         classToAdd = pos == 0 ? primaryClassName : secondaryClassName;
         highlightParentEl = true;

         switch(keyWord){
            // This group is keywords that show up as values, but should always be marked primary
            case "- SLMB":
            case "- QMB":
            case "- SSI":
            case "- TANF":
            case "- AHC":
            case "- ADULT":
            case "- NEWLY":
            case "- SOBRA":
            case "- QI1":
            case "- MN/MI":
            case "- KIDS":
            case "Special Low Income Medicare Beneficiary":
            case "Specified Low Income Medicare Beneficiary":
               selectedEls = $('#general-eli-info td:contains("'+keyWord+'")');
               if(selectedEls.length==0) {
                  selectedEls = $('.coverage-grid td:contains("'+keyWord+'")');
               }

               if(selectedEls.length!=0) {
                  tempEl = selectedEls[0];
                  tempEl.parentNode.classList.add(primaryClassName);
                  highlightedEls.push(tempEl);
               } 

               if(focusEl != null) {
                  focusEl = tempEl;
               }

               break; 

            // This group is for keywords that show up as values
            case "-Medicaid":
            case "-TITLE 19 MEDICAID":
            case "TITLE XIX (MEDICAID)":
            case "41 Pregnant Wome":
            case "8C":
            case "ABD":
            case "ABDQMB":
            case "AID=":
            case "COE":
            case "CHOICES":
            case "Full Medicaid":
            case "Husky":
            case "Inactive":
            case "Long Term Care":
            case "MAO,":
            case "Medicaid FFS|":
            case "Medicaid State Plan":
            case "Medicaid thru Supplemental Security Income":
            case "Medical Assistance":
            case "Medicare Covered Services Only":
            case "memberProgramCode":
            case "MSP":
            case "PARTIAL":
            case "PROGRAM":
            case "QMB":
            case "Qualified Medicare Beneficiary":
            case "Remaining":
            case "SLMB":
            case "Spec. Low Income Mcre Benefic":
            case "Specified Low Income Medicare Beneficiary":
            case "Spend Down":  // TODO: These are sometimes not highlighting-MI
            case "Spenddown":
            case "SSI,":
            case "TANF":
            case "| SLMB":
               selectedEls = $('#general-eli-info td:contains("'+keyWord+'")');
               if(selectedEls.length==0) {
                  selectedEls = $('span:contains("'+keyWord+'")');
                  if(selectedEls.length==0) {
                     selectedEls = $('.generalSection td:contains("'+keyWord+'")');
                     if(selectedEls.length==0) {
                        selectedEls = $('.coverage-grid td:contains("'+keyWord+'")');
                        highlightParentEl = false;
                     }
                  }
               }

               if(selectedEls.length!=0) {
                  tempEl = selectedEls[0]
                  if(highlightParentEl) {
                     tempEl.parentNode.classList.add(classToAdd);
                  } else {
                     tempEl.classList.add(classToAdd);
                  }
                  highlightedEls.push(tempEl);
               }

               if(focusEl != null) {
                  focusEl = tempEl;
               }
               break;
            // This group is for keywords that show up in labels
            case "Medicaid:":
            case "Medical Assist. Cat.:":
            case "PCAT":
            case "QMB only":
            case "Insurance Type:":
            case "Plan Coverage Description:":
               selectedEls = $('th:contains("'+keyWord+'")');
               if(selectedEls.length!=0) {
                  if(state == "MI" && selectedEls.length != 1) {
                     // MI only uses Plan Coverage Description, but sometimes 
                     // needs it to be the second entry, not the first
                     selectedEls[0].parentNode.classList.add(primaryClassName);
                     highlightedEls.push(tempEl);
                     
                     tempEl = selectedEls[1];
                  } else {
                     tempEl = selectedEls[0];
                  }
                  tempEl.parentNode.classList.add(classToAdd);
                  highlightedEls.push(tempEl);
               }

               if(focusEl != null) {
                  focusEl = tempEl;
               }
               break;
            // This group is down in the bottom section
            case "Primary Aid Code":
            case "PRIMARY AID CODE":
            case "QMB ONLY":
               selectedEls = $('.coverage-grid td:contains("'+keyWord.toUpperCase()+'")');

               if(selectedEls.length!=0) {
                  tempEl = selectedEls[0];
                  tempEl.classList.add(classToAdd);
                  highlightedEls.push(tempEl);
               }

               if(focusEl != null) {
                  focusEl = tempEl;
               }
               break;

            default: 
               console.warn("Didn't find keyword "+keyWord);
            // medicaid 
            // 2nd Special Aid Code
            // Prior Insurance Carrier: 
         }

         // This group is keywords that as values, and show up as the second element, not the first
         switch(keyWord){
            case "RAC=":
               // this one is weird. It sometimes has a | in the first "Plan", and sometimes doesn't, 
               // so the highlight jumps to the third one
            case "MCE |": 
               selectedEls = $('#general-eli-info td:contains("'+keyWord+'")');

               if(selectedEls.length>1) {
                  tempEl = selectedEls[1];
                  tempEl.parentNode.classList.add(classToAdd);
                  highlightedEls.push(tempEl);
               }

               break;
            default:
               break;
         }

      }

      if(focusEl != null){
         focusEl.scrollIntoViewIfNeeded({block: "center"});
      }

      mbiEl = getMbiEl();
      if (mbiEl != undefined) {
         mbiEl.parentNode.classList.add(mbiClassName);
         highlightedEls.push(mbiEl);
      }

      ltcEl = getLtcEl();
      if (ltcEl != undefined) {
         ltcEl.parentNode.classList.add(ltcClassName);
         highlightedEls.push(ltcEl);
      }

      return highlightedEls;

      //TODO: Alert how many things found
      //TODO: make it so that it alerts when it didn't find any of the el's
      //TODO: Make it so that if the text is inside of a text, it pulls it into a span.
   }

   /* Function unHighlightEls
      Gets all the els to highlight */
   function unHighlightEls() {
      $('.primary,.secondary,.mbi-highlight,.ltc-highlight').each((iter, el) => {
         el.classList.remove('primary');
         el.classList.remove('secondary');
         el.classList.remove('mbi-highlight');
         el.classList.remove('ltc-highlight');
      });
   }
   

/*** STATE INFO DROP DOWN ***/
   //TODO: make it toast "state detected"
   //TODO: background red?
   //TODO: have it contain the important info in stateDB


/*** KEYBOARD SHORTCUTS ***/

  /** COPY MCD ID **/

   /* Function copyMcdId
      Copies the medicaid id from the page */
   function getMcdIdFromPage() {
      var el = $('#patient-info tr:contains("Medicaid Recipient ID")');
      
      if(el.length == 0) {
         el = $('#patient-info tr:contains("Member ID")');
      }
      
      if(el.length > 0) {
         copyStringToClipboard(el.children()[1].innerHTML);
      } else {
         copyStringToClipboard("none");
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

/*************
* LOGIC
**************/
   var firstStepLink = (typeof $ != "undefined") ? firstStepLink = $(".ohid") : firstStepLink = null;
   var secondStepBtn = document.getElementById('btnLogin');

   if(firstStepLink != null && firstStepLink.length != 0) {
      firstStepLink[0].click();
   } else if(secondStepBtn != null && secondStepBtn.length != 0) {
      secondStepBtn.click();
   } else if(isSearchPage()) {
      // debugger;
      console.log(">> Search Page Detected", window);
      var topWindow = window.top;
      var p;
      if(typeof topWindow.chc == "undefined") {
         topWindow.chc = {
            ranSetup: false,
         };

         addChcRefToAppFrame();
         addChcRefToTier1Frame();
         addChcRefToTier2Frame();
         addChcRefToRequestReviewFrame();

         p = getTier1El('.k-widget.k-dropdown');
         console.log("p", p, getTier1El('#payerdropdown'));
         p.click();
         p.click();
      }

      // chc now refers to a local reference to the chc object created on the top page
      if(chc.ranSetup != true) {
         chc.context = getContext();
         chc.whatsMyContext = getContext;

         addJsFromURL("https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js",getAppFrameDoc());

         // tier 1
         chc.getFieldSite = getFieldSite;
         chc.getFieldPayer = getFieldPayer;
         chc.getFieldNPI = getFieldNPI;
         chc.getFieldSearchOption = getFieldSearchOption;
         chc.getTier1Window = getTier1Window;
         // tier2
         chc.getFieldDOB = getFieldDOB;
         chc.getFieldSSN = getFieldSSN;
         chc.getFieldGender = getFieldGender;
         chc.getFieldFirstName = getFieldFirstName;
         chc.getFieldLastName = getFieldLastName;
         chc.getFieldMcdId = getFieldMcdId;
         chc.getTier2Window = getTier2Window;

         // set up Site listener here. SearchOption doesn't exist until Payer has been called. Add onChange to payer to check
         setUpSearchPageListeners();
         setUpSearchPageKeyboardShortcuts();
         setUpSearchPageMutators();
         setTimeout(getThingsStarted,300);
         if(getFieldSite().search("CT").length < 2) {
            insertNewSiteOptions();
         }

         chc.unloadSearchPage = unloadSearchPage;
         chc.alreadyPresent = alreadyPresent;
         chc.mydebug = mydebug;
         chc.ranSetup = true;
      } else {
         chc.alreadyPresent();
      }
   } else { // is results page
      console.log(">> Results Page Detected");
      // This is meant to be done just once, even if called multiple times. Why? Because.
      if(typeof chc == "undefined") {
         window.chc = {
            ranSetup: false,
         };
         addJsFromURL("https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
      }
      if(chc.ranSetup != true) {
         insertHighlightCSS();
         highlightImportantEls();
         setUpResultsPageKeyboardShortcuts();
         getMcdIdFromPage();

         chc.allowedStatesDB = allowedStatesDB;
         chc.getStateInfo = getStateInfo;
         chc.getStateKeyWords = getStateKeyWords;
         chc.highlightImportantEls = highlightImportantEls;

         chc.unloadResultsPage = unloadResultsPage;
         chc.alreadyPresent = alreadyPresent;
         chc.mydebug = mydebug;
         chc.ranSetup = true;

         console.log(">> Inserted CHC logic");
      } else {
         chc.alreadyPresent();
      }
   }
// } // END OF MAIN -- an attempt to put all the fn's in the context of the top window
// 
// main.apply(window.top);
