var PuzzleListModel = function() {

  this.list = [];

  this.init = function() {
  }

  /**
   * Gets the list of puzzles. Since this is a asyncronous request, we need to
   * use a callback
   */
  this.getListReq = function(callback) {
    var self = this;

    $.getJSON('puzzles/list.json', function(data) {
        $.each(data, function(k, v) {
            self.list.push(new PuzzleModel(k, v));
        })

        callback(self.list);
    })
  }

  this.init();
}