// program
	// TODO: Given a list of numbers, pull a number n out, and 0 out the nth item in the array
// input
	// TODO: pull elements from the comment into a list of numbers
	// TODO: export the list in CSV, to do analysis

// DONE:
	// TODO: Generate list of 500 filled w/ 1's


/*** CONSTANTS ***/
const HIGHEST_NUMBER = 20

/*** BUSINESS LOGIC ***/

	/* Function makeEmptyList
			*/
	function makeEmptyList() {
		var ary = [];
		ary.length = HIGHEST_NUMBER+1; // b/c the guesses are 1 based, not 0 based
		ary.fill(1);
		return ary;
	}

	/* Function markGuesses
		Run through the already guessed array, and 0 out the entry in that index.
		*/
	function markGuesses(guessAry,numAry) {
		// Not using the 0th position, b/c guesses are 1 indexed
		numAry[0]=0;

		guessAry.forEach(function (guess) {
			numAry[guess] = 0;
		});

		console.log(">> numAry: ",numAry);
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
		mostRecentNumber = top;
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

	/* Function getNumsFromPage
		*/
	function getNumsFromPage() {
		var listOfNums = [1,3,15,6,10];

		return listOfNums;
	}

	function alertGuess(guess) {
		//generate alert on page for guess
		console.log(guess)
	}

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
	var guessAry, numAry;

	// makeEmptyList
	console.assert(makeEmptyList().length == HIGHEST_NUMBER,"Did not make a size 500 list");
	console.assert(makeEmptyList()[HIGHEST_NUMBER-1]!=1,"Did not make a list of 1's");

	// markGuesses
	guessAry = [1,7,9,10];
	numAry = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	console.assert(markGuesses(guessAry,numAry),"");

	// TESTS TO WRITE:
	// what if the highest number is guessed?
	// what if the highest number isn't guessed?
	// what if the lowest number isn't guessed?
	// what if the lowest number isn't guessed?

}


/* [1, 2, 3, 4, 5, 6, 7, 8, 9, 19] */
