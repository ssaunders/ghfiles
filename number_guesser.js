// program
	// TODO: Given a list of numbers, pull a number n out, and 0 out the nth item in the array
// input
	// TODO: pull elements from the comment into a list of numbers
	// TODO: export the list in CSV, to do analysis

// DONE:
	// TODO: Generate list of 500 filled w/ 1's


(function guesser() {
	function makeEmptyList() {
		var ary = [];
		ary.length = 500;
		ary.fill(1);
		return ary;
	}

	function zeroOut(inAry,numAry) {
		inAry.foreach((element) => numAry[element]=0);
		return numAry;
	}


	function getNumsFromPage() {
		var listOfNums = [];

		return listOfNums;
	}

	function generateGuess(numAry) {
		// calc largest hole in numAry
	}

	function outputInput() {
		consle.log();
	}

	function main() {
		var numAry = makeEmptyList();
		var inAry = getNumsFromPage();


	}

	this.tester = function() {
		console.assert(makeEmptyList().length = 500,"Did not make a size 500 list");
		console.assert(makeEmptyList()[499]!=1,"Did not make a list of 1's");

	}

})();


/* [1, 2, 3, 4, 5, 6, 7, 8, 9, 19] */
