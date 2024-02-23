// program
	// TODO: Given a list of numbers, pull a number n out, and 0 out the nth item in the array
// input
	// TODO: pull elements from the comment into a list of numbers
	// TODO: export the list in CSV, to do analysis

// DONE:
	// TODO: Generate list of 500 filled w/ 1's


/*** CONSTANTS ***/
const HIGHEST_NUMBER = getHighestNum();
verboseThisSection = false;

/*** BUSINESS LOGIC ***/

	/* Function makeEmptyList
			*/
	function makeEmptyList(len = HIGHEST_NUMBER) {
		var ary = [];
		ary.length = len; 
		ary.fill(1);
		return ary;
	}

	/* Function markGuesses
		Run through the array containing the numbers already guessed, 
      and 0 out the entry in that index. */
	function markGuesses(guessAry,numAry) {
      // Mark top and bottom as if they were guessed
      numAry[0] = 0;
      numAry[HIGHEST_NUMBER-1] = 0;

		guessAry.forEach(function (guess) {
			if(guess <= HIGHEST_NUMBER && guess > 0) {
				numAry[guess-1] = 0;
			}
		});

		if(verboseThisSection == true) console.log(">> numAry: ",numAry);
		return numAry;
	}

	/* Function getLargestGap
		Run through numAry, and add up all the non-guessed numbers between each gap, keeping the largest
		*/
	function getLargestGap(numAry) {
		var top = HIGHEST_NUMBER,
			 bottom,
			 mostRecentNumber = top,
			 largestGapSize = 0,
			 currGapSize = 0,
			 currPointer;

	   // starts 1 down from length, b/c we want to have distance from the two numbers
	   // *could* shortcut the loop--if largestGap > currpointer, but later, and who cares
		bottom = top - 1;
		for (currPointer = numAry.length - 2; currPointer > 0; currPointer--) { // >0 b/c we don't use 0
			if(numAry[currPointer] == 0) {
				console.log('found a #:',currPointer);
			 	currGapSize = mostRecentNumber - currPointer;
				if(currGapSize > largestGapSize) { // > vs >= means we always guess higher #'s
					largestGapSize = currGapSize;
					top = mostRecentNumber;
					bottom = currPointer; 
					currGapSize = 0;
				}
				mostRecentNumber = currPointer;
			} else {
				currGapSize += 1;
			}
		}
		return {
			top: top,
			bottom: bottom
		}
	}

	/* Function generateGuess
		Since ties are payed out to both people, ties are advantageous
		Guess in the middle
		*/
	function generateGuess(numAry) {
		var limits = getLargestGap(numAry);

		return Math.round((limits.top + limits.bottom) / 2);
	}

/*** WEBPAGE LOGIC ***/

	/* Function getNumValFromEl
		*/
	function getNumValFromEl() {
		// given an el, return a number or null, if it's not one to add
		// test if it's higher than HIGHEST_NUMBER
	}

	/* Function getNumsFromPage
		*** Currently a stubb *** 
      Gets the list of guesses from the page */
	function getNumsFromPage() {
		var listOfNums = [1,3,15,6,10];
		//$$('[data-testid="message-body-flex-wrapper"]')
		return listOfNums;
	}

	function alertGuess(guess) {
		//generate alert on page for guess
		console.log(guess)
	}


/*** TESTING FRAMEWORK ***/

   /* Function arrayEquals
      Checks if two arrays have an equal # of elemnts,
      and that each of their elements is equal */
   function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
   }

   /* Function getHighestNum
      Checks if two arrays have an equal # of elemnts,
      and that each of their elements is equal */
   function getHighestNum() {
      return 11;
   }
      // MOVE THIS LATER? ^^^^^

/*************
 * LOGIC START
 *************/

/* Function main
	*/
function main() {
	var guessAry = getNumsFromPage(),
		 emptyList = makeEmptyList(),
	    numAry = markGuesses(guessAry,emptyList)
	    guess = generateGuess(numAry);

	alertGuess(guess);
}

main();


function tests() {
   // const HIGHEST_NUMBER = 11; ???
	var guessAry, numAry;

   verboseThisSection = false;

  /***** makeEmptyList *****/
   verboseThisSection = false;
   console.log(">> Assertions for: makeEmptyList")
	console.assert(makeEmptyList().length == HIGHEST_NUMBER,"Test Fail: Did not make a size 500 list");
	console.assert(makeEmptyList()[HIGHEST_NUMBER-1]==1,"Test Fail: Did not make a list of 1's");
   console.assert(makeEmptyList(4).length == 4,"Test Fail: Did not make list of custom size");

  /***** markGuesses *****/
   verboseThisSection = false;
   console.log(">> Assertions for: markGuesses")

   //THESE TESTS ASSUME SIZE OF GUESS IS 11
   // Empty guess array
	guessAry = [];
   ansAry = [0,1,1,1,1,1,1,1,1,1,0];
	console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Empty guess array");

   // Guess array contains #'s in order
   guessAry = [2,7,9,10];
   ansAry = [0,0,1,1,1,1,0,1,0,0,0];
   console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Guess array contains #'s in order");

   // Guess array contains #'s in random order
   guessAry = [9,10,2,7];
   ansAry = [0,0,1,1,1,1,0,1,0,0,0];
   console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Guess array contains #'s in random order");

   // Guess array contains duplicate #'s
   guessAry = [2,2,7,9,10,2,2,2,7,10];
   ansAry = [0,0,1,1,1,1,0,1,0,0,0];
   console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Guess array contains duplicate #'s");

   // Guess array contains highest #
   guessAry = [2,7,9,11];
   ansAry = [0,0,1,1,1,1,0,1,0,1,0];
   console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Guess array contains highest #");

   // Guess array contains lowest #
   guessAry = [1,7,9,10];
   ansAry = [0,1,1,1,1,1,0,1,0,0,0];
   console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Guess array contains lowest #");

   // Guess array contains negative #
   guessAry = [2,-7,7,9,10];
   ansAry = [0,0,1,1,1,1,0,1,0,0,0];
   console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Guess array contains negative #");

   // Guess array contains # higher than HIGHEST_NUMBER
   guessAry = [2,7,9,10,12];
   ansAry = [0,0,1,1,1,1,0,1,0,0,0];
   console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Guess array contains # higher than HIGHEST_NUMBER");

   // Guess array contains 0
   guessAry = [0,2,7,9,10];
   ansAry = [0,0,1,1,1,1,0,1,0,0,0];
   console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Guess array contains 0");

   // Guess array contains more #'s than are guessable
   guessAry = [2,7,9,10,2,7,9,10,2,7,9,10,0,1,12,16,-1,30,2,7,9,10,11];
   ansAry = [0,0,1,1,1,1,0,1,0,0,0];
   console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Guess array contains more #'s than are guessable");

   // Guess array contains all #'s
   guessAry = [1,2,3,4,5,6,7,8,9,10,11];
   ansAry = [0,0,0,0,0,0,0,0,0,0,0];
   console.assert(arrayEquals(markGuesses(guessAry,makeEmptyList(11)),ansAry),
      "Test Fail: Guess array contains more all #'s");

  /***** generateGuess *****/
   verboseThisSection = true;
   // Empty guess array
   guessAry = [];
   numAry = markGuesses(guessAry,makeEmptyList(11));
   targetGuess = 6;
   console.assert(generateGuess(numAry)===targetGuess,
      "Test Fail: Empty guess array");

	// TESTS TO WRITE:
	// guess numbers that 

}
tests();

/* [1, 2, 3, 4, 5, 6, 7, 8, 9, 19] */
