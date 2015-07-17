/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

window.findNRooksSolution = function(n) {
  var solution;
  var b = makeEmptyMatrix(n);
  var currentRow = 0;
  var placeARook = function(freeColBits) {
    if(currentRow === n) {
      return true;
      //solved!
    }
    var remainingColBits = freeColBits;
    while(remainingColBits !== 0) {
      var freeSpotBit = freeColBits & -freeColBits;
      var columnNumber = Math.log(freeSpotBit) / Math.log(2);
      b[currentRow][columnNumber] = 1;
      remainingColBits -= freeSpotBit;
      currentRow++;
      if(placeARook(freeColBits-freeSpotBit)) {
        currentRow--;
        return true;
      }
      b[currentRow][columnNumber] = 0;
    }
    currentRow--;
    return false;
  }
  placeARook(Math.pow(2, n)-1);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(b));
  return b;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var currentRow = 0;

  var placeARook = function(freeColBits) {
    if(currentRow === n) {
      solutionCount++;
      currentRow--;
      return;
      //solved!
    }
    var remainingColBits = freeColBits;
    while(remainingColBits !== 0) {
      var freeSpotBit = remainingColBits & -remainingColBits;
      remainingColBits -= freeSpotBit;
      currentRow++;
      placeARook(freeColBits-freeSpotBit);
    }
    currentRow--;
  }
  placeARook(Math.pow(2, n)-1);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
