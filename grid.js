function Grid(size){
    this.size = size;
    this.cells = this.makeEmptyBoard();
    this.numMoves = 0;
    this.insertRandom();
    this.insertRandom();

/*
    var row = Math.floor(Math.random() * this.size);
    var col = Math.floor(Math.random() * this.size);
    //var tile = new Tile(x,y,2);
    var tile1= new Tile(0,0,2);
    var tile2 = new Tile(0,3,2);
//    var tile3= new Tile(3,0,2);
//    var tile4= new Tile(3,3,2);
    //console.log("Tile value : " + tile.getValue());
    this.insertTile(tile1);
    this.insertTile(tile2);
//    this.insertTile(tile3);
//    this.insertTile(tile4);
*/
    this.printGrid();
    console.log("################");
}

Grid.prototype.makeEmptyBoard = function () {
  console.log("emptyBoard()");
  var cells = [];
  for(var col=0; col<this.size; col++){
    var column = cells[col] = [];
    for(var row=0; row<this.size; row++){
        column.push(EMPTY);
    }
  }
  return cells;
};

Grid.prototype.isPopulated = function(col, row){
  if (col >= this.size || col < 0 || row >= this.size || row < 0){
      return false;
  }
  if (this.cells[col][row] == EMPTY){
    return false;
  }
  console.log("POPULATED! [p] (" + col + "," + row +")" );
  return true;
}

Grid.prototype.isEmpty = function(col,row){
  if (row >= this.size || row < 0 || col >= this.size || col < 0){
      return false;
  }
  if (this.cells[col][row] != EMPTY){
    return false;
  }
  return true;
}

Grid.prototype.canMerge = function(colA, rowA, colB, rowB){
  if (this.cells[colA][rowA].justMerged() || this.cells[colB][rowB].justMerged()){
    return false;
  }
  return this.cells[colA][rowA].getValue() == this.cells[colB][rowB].getValue();
}

/*
Grid.prototype.getPopulatedCells = function (){
  var populatedCells = [];
  for (var x=0; x< GRID_SIZE; x++){
    for (var y=0; y< GRID_SIZE; y++){
      if (this.isPopulated(x,y)) populatedCells.push({x:x, y:y});
    }
  }
  return populatedCells;
}*/
Grid.prototype.unsetMergeFlag = function (){
  for (var col=0; col< GRID_SIZE; col++){
    for (var row=0; row< GRID_SIZE; row++){
      if (this.isPopulated(col,row)) this.cells[col][row].resetMerge();
    }
  }
}

Grid.prototype.getEmptyCells = function (){
  var emptyCells = [];
  for (var col=0; col< GRID_SIZE; col++){
    for (var row=0; row< GRID_SIZE; row++){
      if (this.isEmpty(col,row)) emptyCells.push({row:row, col:col});
    }
  }
  return emptyCells;
}

Grid.prototype.insertRandom = function (){
   //var emptyCell = this.getEmptyCells()[Math.floor(Math.random() * GRID_SIZE)];
   var emptyCells = this.getEmptyCells();
   var cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
   var value = Math.random() < 0.9 ? 2 : 4;
   var tile = new Tile(cell.col,cell.row, value);
   this.insertTile(tile);
}

Grid.prototype.moveTile = function (col, row, dcol, drow){
    // out of bounds checks during assignment
  //if (this.isPopulated(tile.x, tile.y)){
      console.log("MOVE TILE");
      console.log("col : " + col);
      console.log("row : " + row);
      console.log("delta col : " + dcol);
      console.log("delta row : " + drow);
      var tile = this.cells[col][row];
      console.log("PRE move : " + tile.col + "," + tile.row);
      this.removeTile(tile);
      //var newCol = ((tile.col + dcol >= this.size) || (tile.col + dcol > 0)) ? tile.col : tile.col + dcol;
      //var newRow = ((tile.row + drow >= this.size) || (tile.row + drow > 0)) ? tile.row : tile.row + drow;
      var newCol = tile.col + dcol;
      var newRow = tile.row + drow;
      console.log("newCol : " + newCol);
      console.log("newRow : " + newRow);
      tile.updatePosition({col:newCol, row:newRow});
      this.insertTile(tile);
      console.log("POST move : " + tile.col + "," + tile.row);
  //}
  this.printGrid();
}

Grid.prototype.mergeTile = function (col, row, dcol, drow){
      console.log("Merge Tile");
      console.log("col : " + col);
      console.log("row : " + row);
      console.log("delta col : " + dcol);
      console.log("delta row : " + drow);
      var tile1 = this.cells[col][row];
      var val1 = tile1.getValue();
      var col2 = tile1.col + dcol;
      var row2 = tile1.row + drow;
      var tile2 = this.cells[col2][row2];
      var val2 = tile2.getValue();
      this.removeTile(tile1);
      tile2.updateValue(val1 + val2);
      //this.insertTile(tile);
//      console.log("POST move : " + tile.col + "," + tile.row);
  //}
  this.printGrid();
}

Grid.prototype.insertTile = function (tile) {
  console.log("insertTile()");
  console.log(tile);
  this.cells[tile.col][tile.row] = tile;
};
Grid.prototype.removeTile= function (position) {
  console.log("REMOVE -> " + position.col + "," + position.row);
  this.cells[position.col][position.row] = EMPTY;
};
Grid.prototype.getCell = function (col,row) {
  return this.cells[col][row];
};

Grid.prototype.moveUp = function(){
    for (var row = this.size-1; row >= 0; row--){
      for (var col = this.size-1; col >= 0; col--){
        if (this.isPopulated(col,row)){
          var cd = col;
          var rd = row-1;
          if (this.isEmpty(col, row-1)) {
            console.log("U");
            this.moveTile(col,row, 0,-1);
            this.numMoves++;
          }else if (this.isPopulated(col,row-1) && this.canMerge(col, row, cd, rd)) {
            console.log("uM");
            this.mergeTile(col,row, 0, -1);
            this.numMoves++;
          }
        }
      }
    }
    if (this.numMoves > 0){
      this.numMoves = 0;
      this.moveUp();
    }
    this.printGrid();
};
Grid.prototype.moveDown = function(){
    for (var row = 0; row < this.size; row++){
      for (var col = 0; col < this.size; col++){
        if (this.isPopulated(col,row)){
          var cd = col;
          var rd = row+1;
          if (this.isEmpty(col, row+1)){
            console.log("D");
            this.moveTile(col,row, 0, 1);
            this.numMoves++;
          }else if (this.isPopulated(col,row+1) && this.canMerge(col, row, cd, rd)) {
            console.log("LM");
            this.mergeTile(col,row, 0, 1);
            this.numMoves++;
          }
        }
      }
    }
    if (this.numMoves > 0){
      this.numMoves = 0;
      this.moveDown();
    }
    this.printGrid();
};
//
Grid.prototype.moveLeft = function(){
    for (var col = this.size-1; col >= 0; col--){
      for (var row = this.size-1; row >= 0; row--){
        if (this.isPopulated(col,row)) {
          var cd = col-1;
          var rd = row;
          if (this.isEmpty(col-1,row)) {
            console.log("L");
            this.moveTile(col,row, -1, 0);
            this.numMoves++;
          }else if (this.isPopulated(col-1,row) && this.canMerge(col, row, cd, rd)) {
            console.log("LM");
            this.mergeTile(col,row, -1, 0);
            this.numMoves++;
          }
        }
      }
    }
    if (this.numMoves > 0){
      this.numMoves = 0;
      this.moveLeft();
    }
  this.printGrid();
};
Grid.prototype.moveRight = function(){
    for (var col = 0; col < this.size; col++){
      for (var row = 0; row < this.size; row++){
        if (this.isPopulated(col,row)) {
          var cd = col+1;
          var rd = row;
          if (this.isEmpty(col+1,row)) {
            console.log("R");
            this.moveTile(col,row, 1, 0);
            this.numMoves++;
          }else if (this.isPopulated(col+1,row) && this.canMerge(col, row, cd, rd)) {
            console.log("LM");
            this.mergeTile(col,row, 1, 0);
            this.numMoves++;
          }
        }
      }
    }
    if (this.numMoves > 0){
      this.numMoves = 0;
      this.moveRight();
    }
    this.printGrid();
};

Grid.prototype.printGrid= function(){
    console.log("---------------------------");
    for (var col = 0; col < this.size; col++){
      console.log(this.cells[col])
    }
    console.log("---------------------------");
};
