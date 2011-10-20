var IndexController = function(main) {
  this.main = main;

  this.init = function() {
    var self = this;

    $('body').removeClass().addClass('index');

    var html = '<div class="previewlist">' +
               '  <h1>Please select a puzzle to solve:</h1>' +
               '</div>';
    $('.content').html(html);

    var pl = new PuzzleListModel();

    pl.getListReq(function(list) {
      self.handleList(list);
    });
  }

  this.handleList = function(list) {
    var previews = []
    for (var i = 0; i <= list.length-1; i++)
    {
      var pr = new PuzzlePreview($('.previewlist'), list[i])

      pr.events.bind('onSelected', function(event, sender, preview) {
        self.main.switchController(PuzzleController, preview);
      });

      previews.push(pr);
    }
  }

  this.init();
}

