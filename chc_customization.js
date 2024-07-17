//~~~~ CHC CUSTOMIZATION ~~~~//


// working on vvv
   // RESULTS
   // TODO: Double check the + levels for states I'm unsure of: TN, WA, GA, WI, FL
   // TODO: Fix the detect state to handle states that don't have a ST abbr at the beginning, w/o relying on addr

   // SEARCH
   // TODO: create a preference list, so that can change Search Option to whatever needs be
   // TODO: CTL+Enter doesn't always send?
   // TODO: figure out what happens if I save it as a webpage that loads things
   // TODO: ctrl + shift + v => Figures out if DOB or name, insert into appropriate field
         // TODO: Have it auto-select the Search Option when pasting, for a format that works

         // TODO: Have it focus on Gender, when the field is active and not filled out
         // TODO: Have it immediately search, if it fits all criteria
         // TODO: if a MARx copy/paste, make sure the state/address state match
   // TODO: Fix Search section not doing Ctrl+enter
   // TODO: Change the file to have a CHC object that is put on the top, always
   // TODO: Make it so that when you change the Search Option, it preserves your data
      // TODO: make an object that keeps the data when selectOption changes

 /* RESULTS PAGE */ 
   
   // TODO: TOAST message Results page
      // TODO: make toast that shows state detected
      // TODO: make toast that shows how many highlights detected
      // should include a little note if it didn't find anything to highlight
   // TODO: allow for jumping between highlights
   // TODO: shortcut to gather info into a single copy/pastable
   // TODO: try to figure out a way to have it persist through refreshes (if added to main CHC);
   // TODO: Have a word highlighter that people can type in, that highlights on page
   
   // TODO: Problem states: TN? AZ-4 digit code, but no clear flag on where it is, no label
   // FL QMB+/FBDE - IN SLMB/+, QMB+, FBDE - GA QMB+/FBDE - AR FBDE/QMB+/slmb - GA QMB+
   // which states have LTC?

 /* SEARCH PAGE */
   // TODO: Make Ctrl + S change between the filters > Site > Payer > search option > forms on Tier 2
   // TODO: TOAST message Search page
   // TODO: Mark somewhere that the "look for" isn't for every level
   // TODO: css for increasing input size of things

/** DONE **/

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
      _DB: {
         allowedStates: ["AL", "AR", "AZ", "CA", "CT", "FL", "GA", "IL", "IN", "KY", 
                         "MO", "MS", "NC", "NJ", "NY", "OH", "SC", "TN", "TX", "WA", "WI"]
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
         searchOptionValue: {
            "AL":SEARCH_OPT_NAME_DOB,
            "AR":SEARCH_OPT_NAME_DOB,
            "AZ":SEARCH_OPT_NAME_DOB,
            "CA":-1,
            "CT":SEARCH_OPT_SSN_NAME_DOB,
            "FL":SEARCH_OPT_NAME_DOB_GENDER,
            "GA":SEARCH_OPT_NAME_DOB_GENDER,
            "IL":SEARCH_OPT_NAME_DOB,
            "IN":SEARCH_OPT_NAME_DOB,
            "KY":SEARCH_OPT_NAME_DOB_GENDER,
            "MO":SEARCH_OPT_NAME_DOB,
            "MS":SEARCH_OPT_NAME_DOB,
            "NC":SEARCH_OPT_NAME_DOB,
            "NJ":SEARCH_OPT_NAME_DOB,
            "NY":SEARCH_OPT_MEM_ID,
            "OH":SEARCH_OPT_NAME_DOB,
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

   /*** PREFERRED SEARCH OPTION DB ***/
   siteFieldValueDB = {
      _DB: {
         stateValue: {
            "AL": "BP00286802",
            "AR": "BP00277137",
            "AZ": "BP00243685",
            "CA": "BP00285700",
            "CT": "BP00277123",
            "FL": "BP00277121",
            "GA": "BP00246036",
            "IL": "BP00277137",
            "IN": "BP00246185",
            "KY": "BP00280354",
            "MO": "BP00246038",
            "MS": "BP00246211",
            "NC": "BP00277123",
            "NJ": "BP00277120",
            "NY": "BP00277119",
            "OH": "BP00245655",
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
      _stateAbbrListRegex: /AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY/i
   }

   /*** STATE DB ***/
   stateDB = {
      _DB: {
         stateInfo:{
            AK: {
               stateCode:'AK',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '/\\d{10}/',
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
               format: '/\\d{13}/',
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
               format: '/\\d{10}/',
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
               format: '/A\\d{8}/',
               ltcWaiver: 'x',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '- SLMB / - QMB / - SSI / - TANF / - AHC / - ADULT / - NEWLY / - SOBRA / - QI1 / - MN/MI / - KIDS / LTC',
               npi: '1679759989'
            },
            CA: {
               stateCode:'CA',
               mcdIdFormat:'9 or 14 characters, letters and #\'s. 9th character a letter',
               mcdIdExample:'12345678A01234 OR 12345678A',
               format: '/\\d{8}[A-Z](\\d{5})?/',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Primary Aid Code / 2nd Special Aid Code / 80 / 8C / Remaining',
               npi: ''
            },
            CO: {
               stateCode:'CO',
               mcdIdFormat:'7 characters, letters and #\'s. 1st character is letter.',
               mcdIdExample:'A234567',
               format: '/[A-Z]\\d{6}/',
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
               format: '/\\d{9}/',
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
               format: '/\\d{8}/',
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
               format: '/\\d{10}/',
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
               format: '/\\d{10}/',
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
               format: '/\\d{12}/',
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
               format: '/\\d[A-Z]\\d{7}/',
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
               format: '/[A-Z]\\d{7}/',
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
               format: '/\\d{10}/',
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
               format: '/\\d{9}/',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: ' Plan Coverage Description: ',
               npi: '1417114836'
            },
            IN: {
               stateCode:'IN',
               mcdIdFormat:'12 characters, #\'s only',
               mcdIdExample:'123456789012',
               format: '/\\d{12}/',
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
               format: '/\\d{10}/',
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
               format: '/\\d{11}/',
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
               format: '/\\d{13}/',
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
               format: '/\\d{12}/',
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
               format: '/\\d{11}/',
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
               format: '/\\d{10}/',
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
               format: '/\\d{8}/',
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
               format: '/\\d{8}/',
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
               format: '/\\d{9}/',
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
               format: '/\\d{7}/',
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
               format: '/\\d{9}[A-Z]/',
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
               format: '/ND\\d{7}/',
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
               format: '/\\d{10}/',
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
               format: '/\\d{10}/',
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
               format: '/\\d{12}/',
               ltcWaiver: 'x',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'PROGRAM / QMB PLUS',
               npi: ''
            },
            NM: {
               stateCode:'NM',
               mcdIdFormat:'14 characters, #\'s only',
               mcdIdExample:'12345678901234',
               format: '/\\d{14}/',
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
               format: '/\\d{11}/',
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
               format: '/[A-Z]{2}\\d{5}[A-Z]/',
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
               format: '/\\d{12}/',
               ltcWaiver: '',
               usesInactive: '',
               fbdeRaises: 'x',
               keyWords: 'Plan Coverage Description: / Medicaid FFS| / MCE | / | SLMB',
               npi: ''
            },
            OK: {
               stateCode:'OK',
               mcdIdFormat:'9 characters, #\'s only',
               mcdIdExample:'123456789',
               format: '/\\d{9}/',
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
               format: '/[A-Z]{2}\\d{4}[A-Z]{3}/',
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
               format: '/\\d{10}/',
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
               format: '/\\d{10}/',
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
               format: '/\\d{9}/',
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
               format: '/TD\\d{9}/',
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
               format: '/\\d{9}/',
               ltcWaiver: '',
               usesInactive: 'x',
               fbdeRaises: '',
               keyWords: 'Plan Coverage Description: / MAO, / SSI, / Medical Assistance / TANF / 41 Pregnant Women',
               npi: ''
            },
            UT: {
               stateCode:'UT',
               mcdIdFormat:'10 characters, #\'s only',
               mcdIdExample:'1234567890',
               format: '/\\d{10}/',
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
               format: '/\\d{12}/',
               ltcWaiver: 'x',
               usesInactive: '',
               fbdeRaises: '',
               keyWords: '',
               npi: ''
            },
            VT: {
               stateCode:'VT',
               mcdIdFormat:'7 characters, #\'s only',
               mcdIdExample:'1234567',
               format: '/\\d{7}/',
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
               format: '/\\d{9}WA/',
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
               format: '/\\d{10}/',
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
               format: '/\\d{11}/',
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
               format: '/\\d{10}/',
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
            throw "Input give is not a state: "+stateAbbr;
         }

         return tester.test(mcdNum);
      },
      getNPI: function (stateAbbr) {
         var verifiedAbbr = stateNameToAbbrDB.getAbbr(stateAbbr),
             state = this._getDB()[verifiedAbbr];

         if(state != undefined) {
            return state.npi;
         } else {
            throw "Input give is not a state: "+stateAbbr;
         }
      },
      getStateInfo: function(stateAbbr) {
         var verifiedAbbr = stateNameToAbbrDB.getAbbr(stateAbbr)
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
   alreadyPresent = function () {
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
   copyStringToClipboard = function (string) {
      if(string == null) {
         console.warn(">> Nothing to copy");
         return;
      }

      navigator.clipboard.writeText(string)
         .then(() => {
           console.log(">> Content copied to clipboard");
         },() => {
           console.error(">> Failed to copy");
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
         var css_el = doc.createElement("style");
         css_el.textContent = cssText;
         doc.head.appendChild(css_el);
      }

      return css_el;
   }

   /* Function addJsScript
      Adds the passed in script text to the document body */
   function addJsScript(scriptText, doc) {
      doc = (doc == null || doc == undefined) ? document : doc;

      if (scriptText!=null) {
         var js_el = doc.createElement("script");
         js_el.textContent = scriptText;
         doc.head.appendChild(js_el);
      }

      return js_el;
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

   /* Function listenToAllEvents
      Listens to all the events on an el. For debugging. Doesn't currently work*/
   function listenToAllEvents(el) { // limitScroll/Mouse/Key, userFn
      var eventFilter;
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


/*** UTILITY ***/
  //~~~ GENERAL UTILTY ~~~//
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
      // getFieldPayer().on('change',onPayerChange);

      //iframe re-intiating CHC fn's
      getAppFrame().addEventListener("load",addChcRefToAppFrame);
      getTier1Frame().addEventListener("load",addChcRefToTier1Frame);
      getTier2Frame().addEventListener("load",addChcRefToTier2Frame);
      getRequestReviewFrame().addEventListener("load",addChcRefToRequestReviewFrame);
      //functionality listeners
      getTier2Frame().addEventListener("load",addSearchSpinner);
      getTier2Frame().addEventListener("load",addSpinnerRevealOnSubmit);
      getRequestReviewFrame().addEventListener("load",hideSearchSpinner);
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
      for (var iter = mutatorArray.length - 1; iter >= 0; iter--) {
         mutatorArray[iter].disconnect();
      }
   }

   /* Function unloadSearchPageShortcuts
      Removes the keyboard listeners from the page and undoes everything in runSetup */
   function unloadSearchPageShortcuts() {
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

      //pull off the listeners on Site and payer
      console.log(">> removed Search Page shortcuts & listeners");
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
          cssContent = "\
            .secondary > *, .secondary {\
               background-color: #FFFDD0 !important;\
               color: black !important;\
            }\
            .primary > *, .primary {\
               background-color: #9FE2BF !important;\
            }";

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
      siteField[0].add(tnOption[0],17);
      siteField[0].add(ilOption[0],8);
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
   function setFieldFirstName(firstName) {
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
   function setFieldLastName(lastName) {
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
   function setFieldDOB(dob) {
      var dobField = getTier1Window().$(getFieldDOB());

      //TODO: Make this handle the 1914 vs 14

      if(dobField == null) {
         console.warn("Failed to set DOB _"+dob+"_");
         return false;
      }

      dobField.val(dob);

      return dobField.val() == dob;
   }

   /* Function getFieldSSN
      Gets the SSN field */
   function getFieldSSN() {
      return getTier2Doc().querySelector('#subscriberSSN');
   }
   /* Function setFieldSSN
      Sets the SSN field */
   function setFieldSSN(ssn) {
      var selectedStateAbbr = getFieldPayer().getSelected(),
          ssnField = ( selectedStateAbbr == "CA" ? getTier1Window().$(getFieldMcdId()) : getTier1Window().$(getFieldSSN()) );

      if(ssnField == null || selectedStateAbbr == null) {
         return false;
      }

      if(typeof ssn == "string" && !/^\d{3}-?\d{2}-?\d{4}$/.test(ssn)){
         console.warn("Failed to set SSN (string) _"+ssn+"_");
         return false;
      } else if(typeof ssn != "string") {
         console.warn("Failed to set SSN (unrecognized) _"+ssn+"_");
         return false;
      }

      ssnField.val(ssn);

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
   function setFieldGender(gender) {
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
   function setFieldCardIssueDate(date) {
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
   function setFieldSite(stateAbbr) {
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

      /* we don't have to set the NPI, b/c npiAutoSelect handles it 
         through an observer. The NPI select is recreated each time */

      console.log("ran setFieldPayer w ", stateAbbr);
      setFieldPayer(stateAbbr);
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
      changeSearchOptionToNameDOB(delay);
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

   /* Function changeSearchOptionToNameDOB
      Gets the Search Option field--determines info used in search: SSN, DOB, Name, etc */
   function changeSearchOptionToNameDOB(delay) {
      console.log("changeSearchOptionToNameDOB fired w/delay of ", delay);
      if(delay == undefined || delay == 0) {
         // Setter returns false if not set. This will cut off the 
         // first time there is a successful setting.
         setFieldSearchOption(SEARCH_OPT_NAME_DOB) || setFieldSearchOption(SEARCH_OPT_NAME_DOB_GENDER);
      } else {
         setTimeout(changeSearchOptionToNameDOB(0),delay);
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
      var searchOptionParentObserver = new MutationObserver(setSearchOptionFromStateInfo),
          config = {childList:true},
          searchOptionSelectParent = getTier1El("#td_searchOption");

      searchOptionParentObserver.observe(searchOptionSelectParent[0], config);

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

      // var siteField = getFieldSite(),
      //       searchOptionField = getFieldSearchOption(), 
      //       payerField = getFieldPayer(),
      //       elToFocus;
      //   if(siteField.is(":focus")) {
      //      searchOption[0].showPicker();
      //      elToFocus = searchOptionField;
      //   // } else if(searchOptionField:is(":focus")) {
      //      // TODO: Make it so that it highlights the field, but doesn't change it. Need to store the state and put it back if skip over
      //   //    elToFocus = payerField;
      //   } else {
      //      siteField[0].showPicker();
      //      elToFocus = siteField;
      //   }
      //   elToFocus.focus();
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

               if(cuInfoObj.state != "" && allowedStatesDB.isStateAllowed(cuInfoObj.state)) {
                  // set it up to be a promise?

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

      var currState, modifiedDOB;

      currState = getFieldPayer().getSelected();

      if(data.firstName != "") {
         setFieldFirstName(data.firstName);
      }
      
      if(data.lastName != "") {
         setFieldLastName(data.lastName);
      }
      
      if(data.dob != "") {
         if(!/(\d\d?[\/\.\-]\d\d?[\/\.\-](\d{4}))/.test(data.dob)){
            modifiedDOB = data.dob.replaceAll(/\.\-/g,"/");
            modifiedDOB = modifiedDOB.replace(/^(\d\d?\/\d\d?\/)(\d\d)$/,"$119$2");
         }
         setFieldDOB(modifiedDOB != undefined ? modifiedDOB : data.dob);
         if(currState == "CA") {
            setFieldCardIssueDate(data.dob);
         }
      }
      
      if(data.ssn != "") {
         setFieldSSN(data.ssn.replaceAll(/\-/g,""));
         if(currState == "CA") {
            setFieldMcdId(data.ssn.replaceAll(/\-/g,""));
         }
      }
      
      if(data.mcdId != "") {
         setFieldMcdId(data.mcdId);
      }
      
      if(data.sex != "") {
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
   // .load(pasteInfo)
   // .clear()
   // .get('fieldName');
   // .fill()


/*** SEARCH SPINNER ***/
   searchCounter = 0;

   /* Function getSearchCounter
      Returns the search spinner img el*/
   function getSearchCounter() {
      return getTier2Doc().getElementsByClassName('search-counter')[0];
   }

   /* Function getSearchSpinner
      Returns the search spinner img el*/
   function getSearchSpinner() {
      return getTier2Doc().getElementsByClassName('search-spinner')[0];
   }

   /* Function getSubmitButton
      Returns the search spinner img el*/
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
          
      if(submitterEl!=undefined) {
         submitterTxt = submitterEl.innerHTML;
         matches = submitterTxt.match(/:\s+([A-Z]{2})\s/);
         if(matches != null && matches.length >= 2) {
            apparentState=matches[1]
         }
      }

      // Some "submitter" options have multiple state names in them. 
      // Use the address to verify the location...which is still incorrect.
      // Plan sponsor?
      if(apparentState == undefined || apparentState == "NC" || apparentState == "AR") {
         addressEl = $('#patient-info tr:contains("Address")');

         if(addressEl.length != 0) {
            addressTxt = addressEl[0].nextSibling.childNodes[1].innerHTML;
            apparentState=addressTxt.match(/,\s+([A-Z]{2})/)[1];
         } else if($('div:contains("MEDI-CAL")').length > 0){
            apparentState = "CA";
         } else {
            console.warn("Could not find state");
         }

         //TODO: what if the address state doesn't match? Do warning
      } 

      // alert("Detected "&apparentState);
      console.log("Got "+apparentState+" for state");

      return apparentState;
   }
   
   /* Function wrapInfoInElWithSpan
      Wraps the important info in the element with a span */
   function wrapInfoInElWithSpan() {
      //TODO: create span w/primary or secondary info class
      //TODO: refill element w/data, but added span
   }

   /* Function highlightImportantEls
      Gets all the els to highlight */
   function highlightImportantEls() {
      console.log('ran highlightImportantEls');
      const primaryClassName = "primary",
            secondaryClassName = "secondary";
      var elAry =[], keyWord, tempEl, classToAdd, focusEl = null,
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

      // search for each key word
      for (var pos = 0; pos < keyWords.length; pos++) {
         keyWord = keyWords[pos].trim();
         classToAdd = pos == 0 ? primaryClassName : secondaryClassName;

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
               tempEl = $('#general-eli-info td:contains("'+keyWord+'")');
               if(tempEl.length!=0) {
                  tempEl[0].parentNode.classList.add(primaryClassName);
               } 

               if(focusEl == undefined) {
                  focusEl = tempEl;
               }
               break; 

            // This group is for keywords that show up as values
            case "-Medicaid":
            case "-TITLE 19 MEDICAID":
            case "41 Pregnant Wome":
            case "80":
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
            case "PROGRAM":
            case "QMB":
            case "Qualified Medicare Beneficiary":
            case "Remaining":
            case "SLMB":
            case "Spec. Low Income Mcre Benefic":
            case "Spend Down":
            case "Spenddown":
            case "SSI,":
            case "TANF":
            case "| SLMB":
               tempEl = $('#general-eli-info td:contains("'+keyWord+'")');
               if(tempEl.length!=0) {
                  tempEl[0].parentNode.classList.add(classToAdd);
               } else {
                  tempEl = $('span:contains("'+keyWord+'")');
                  if(tempEl.length!=0) {
                     tempEl[0].parentNode.classList.add(classToAdd);
                  } else {
                     tempEl = $('.generalSection td:contains("'+keyWord+'")');
                     if(tempEl.length!=0) {
                        tempEl[0].parentNode.classList.add(classToAdd);
                     } else {
                        tempEl = $('.coverage-grid td:contains("'+keyWord+'")');
                        if(tempEl.length!=0) {
                           tempEl[0].classList.add(classToAdd);
                        }
                     }
                  }
               }

               if(focusEl == undefined) {
                  focusEl = tempEl;
               }
               break;
            // This group is for keywords that show up in labels
            case "Medicaid:":
            case "Medical Assist. Cat.:":
            case "PCAT":
            case "Insurance Type:":
            case "Plan Coverage Description:":
               tempEl = $('th:contains("'+keyWord+'")');
               if(tempEl.length!=0) {
                  tempEl[0].parentNode.classList.add(classToAdd);
               }

               if(focusEl == undefined) {
                  focusEl = tempEl;
               }
               break;
            // This group is down in the bottom section
            case "Primary Aid Code":
               tempEl = $('.coverage-grid td:contains("PRIMARY AID CODE")');
               if(tempEl.length!=0) {
                  tempEl[0].classList.add(classToAdd);
               }

               if(focusEl == undefined) {
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
               tempEl = $('#general-eli-info td:contains("'+keyWord+'")');
               if(tempEl.length>1) {
                  tempEl[1].parentNode.classList.add(classToAdd);
               }
               break;
            default:
               break;
         }

      }

      if(focusEl.length != 0){
         focusEl[0].scrollIntoViewIfNeeded({block: "center"});
      }

      return stateInfo;

      //TODO: Alert how many things found
      //TODO: make it so that it alerts when it didn't find any of the el's
      //TODO: Make it so that if the text is inside of a text, it pulls it into a span.
   }

   /* Function unHighlightEls
      Gets all the els to highlight */
   function unHighlightEls() {
      $('.primary,.secondary').each((iter, el) => {
         el.classList.remove('primary');
         el.classList.remove('secondary');
      });
   }
   

/*** STATE INFO DROP DOWN ***/
   //TODO: make it toast "state detected"
   //TODO: background red?
   //TODO: have it contain the important info in stateDB

/*** KEYBOARD SHORTCUTS ***/

   /* Function copyMcdId
      Copies the medicaid id from the page */
   function copyMcdId(evt) {
      // CTRL + SHIFT + X // x b/c it's like copy
      if (evt.ctrlKey && evt.shiftKey && evt.which == 88) {
         console.log("hey");
         var el = $('#patient-info tr:contains("Medicaid Recipient ID")');
         
         if(el.length == 0) {
            el = $('#patient-info tr:contains("Member ID")');
         }
         
         copyStringToClipboard(el.children()[1].innerHTML);
      }
   }

/*************
* LOGIC
**************/
   if(isSearchPage()) {
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
         copyMcdId({
            ctrlKey: true,
            shiftKey: true,
            which: 88
         });

         chc.allowedStatesDB = allowedStatesDB;
         chc.getStateInfo = getStateInfo;
         chc.getStateKeyWords = getStateKeyWords;
         chc.highlightImportantEls = highlightImportantEls;

         chc.unloadResultsPage = unloadResultsPage;
         chc.alreadyPresent = alreadyPresent;
         chc.mydebug = mydebug;
         chc.ranSetup = true;

      } else {
         chc.alreadyPresent();
      }
   }
// } // END OF MAIN -- an attempt to put all the fn's in the context of the top window
// 
// main.apply(window.top);
