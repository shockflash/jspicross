var PuzzleModel = function(index, data) {

  this.index = index;
  this.data = data;

  this.init = function() {
    this.field = this.data['field'].split("\n");
  }

  this.getData = function() {
    return this.data;
  }

  this.getField = function() {
    return this.field;
  }

  this.getCols = function() {
    return this.field[0].length;
  }

  this.getRows = function() {
    return this.field.length;
  }

  this.isSolved = function() {
    var value = getCookie('puzzleSolved_' + this.index);

    if (value)
      return true;

    return false;
  }

  this.setSolved = function() {
    setCookie('puzzleSolved_' + this.index, 1);
  }

  this.init();
}