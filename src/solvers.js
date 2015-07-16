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

window.findNRooksSolution = function(n) {
  var solution;
  var b = new Board();
  b.initialize({'n' : n});
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
      var row = b.get(currentRow);
      row[columnNumber] = 1;
      b.set(currentRow, row);
      remainingColBits -= freeSpotBit;
      currentRow++;
      if(placeARook(freeColBits-freeSpotBit)) {
        currentRow--;
        return true;
      }
      var row = b.get(currentRow);
      row[columnNumber] = 0;
      b.set(currentRow, row);
    }
    currentRow--;
    return false;
  }
  placeARook(Math.pow(2, n)-1);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(b));
  b.n = n;
  return b;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

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
