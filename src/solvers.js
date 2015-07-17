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
      currentRow--;
      return true;
      //solved!
    }
    var remainingColBits = freeColBits;
    while(remainingColBits !== 0) {
      var freeSpotBit = remainingColBits & -remainingColBits;
      var columnNumber = Math.log(freeSpotBit) / Math.log(2);
      remainingColBits -= freeSpotBit;
      currentRow++;
      if(placeARook(freeColBits-freeSpotBit)) {
        b[currentRow][columnNumber] = 1;
        currentRow--;
        return true;
      }
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
  var b = makeEmptyMatrix(n);
  var currentRow = 0;
  //this function takes the free column bits, and free minor and major diagonal bits
  var placeAQueen = function(freeColBits, freeMinorBits, freeMajorBits) {
    if(currentRow === n) {
      currentRow--;
      return true;
      //solved!
    }
    var remainingColBits = freeColBits;
    var remainingMinorBits = freeMinorBits;
    var remainingMajorBits = freeMajorBits;

    //we're using the n most sighificant bits of the majors
    //and n least significant of the minors,
    //to get the correct behaviour after shifting
    freeBits = remainingColBits&freeMinorBits&(freeMajorBits>>(n-1));

    while(freeBits !== 0) {
      var freeSpotBit = freeBits & -freeBits;
      var columnNumber = Math.log(freeSpotBit) / Math.log(2);
      remainingColBits -= freeSpotBit;
      remainingMinorBits -= freeSpotBit;
      //shift the free spot to subtract the correct bit
      remainingMajorBits -= (freeSpotBit << (n-1));
      currentRow++;
      //shift the minor and major data, since different subsets of diagonals are needed for the new row
      if(placeAQueen(freeColBits-freeSpotBit, (freeMinorBits-freeSpotBit)>>1, (freeMajorBits-(freeSpotBit<<(n-1)))<<1)) {
        b[currentRow][columnNumber] = 1;
        currentRow--;
        return true;
      }
      //calculate new set of free bits
      freeBits = remainingColBits&freeMinorBits&(freeMajorBits>>(n-1));
    }
    currentRow--;
    return false;
  }
  //number of diagonals is 2n-1
  placeAQueen(Math.pow(2, n)-1,Math.pow(2,n+n-1)-1,Math.pow(2,n+n-1)-1);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(b));
  return b;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var currentRow = 0;
  //this function takes the free column bits, and free minor and major diagonal bits
  var placeAQueen = function(freeColBits, freeMinorBits, freeMajorBits) {
    if(currentRow === n) {
      solutionCount++;
      currentRow--;
      return;
      //solved!
    }
    var remainingColBits = freeColBits;
    var remainingMinorBits = freeMinorBits;
    var remainingMajorBits = freeMajorBits;

    //we're using the n most sighificant bits of the majors
    //and n least significant of the minors,
    //to get the correct result of bitwise & after shifting them
    freeBits = remainingColBits&freeMinorBits&(freeMajorBits>>(n-1));

    while(freeBits !== 0) {
      var freeSpotBit = freeBits & -freeBits;
      var columnNumber = Math.log(freeSpotBit) / Math.log(2);
      remainingColBits -= freeSpotBit;
      remainingMinorBits -= freeSpotBit;
      //shift the free spot to subtract the correct bit
      remainingMajorBits -= (freeSpotBit << (n-1));
      currentRow++;
      //shift the minor and major data, since different subsets of diagonals are needed for the new row
      placeAQueen(freeColBits-freeSpotBit, (freeMinorBits-freeSpotBit)>>1, (freeMajorBits-(freeSpotBit<<(n-1)))<<1);
      //calculate new set of free bits
      freeBits = remainingColBits&freeMinorBits&(freeMajorBits>>(n-1));
    }
    currentRow--;
  }
  //number of diagonals is 2n-1
  placeAQueen(Math.pow(2, n)-1,Math.pow(2,n+n-1)-1,Math.pow(2,n+n-1)-1);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
