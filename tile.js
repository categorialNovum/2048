function Tile(col, row, value){
    this.row = row;
    this.col = col;
    this.value = value || 2;
    this.previousPosition = null;
    this.mergeFlag = false;
}

Tile.prototype.updatePosition= function (position) {
  console.log("UPDATE POS : " + position.col + "," + position.row);
  this.previousPosition = {row: this.row, y: this.col};
  this.row = position.row;
  this.col = position.col;
};
Tile.prototype.updateValue = function (value) {
  this.value = value;
  this.mergeFlag =true;
};
Tile.prototype.getValue = function () {
  return this.value;
};
Tile.prototype.resetMerge = function () {
  this.mergeFlag = false;
};
Tile.prototype.justMerged = function () {
  return this.mergeFlag;
};
