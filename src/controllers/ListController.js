var ListController = function(main, content) {
  this.main = main;
  this.content = content;

  /* EVENTS */

  this.events = new EventManager(this, [
      'onLoad',
    ])

  this.init = function() {
    var self = this;

    this.content.addClass('index');

    var html = '<div class="previewlist">' +
               '  <h1>' + $.i18n._('choosepuzzle') + '</h1>' +
               '</div>' +
               '<div class="backbutton ' + $.i18n.getLanguage() + '"></div>';
    this.content.html(html);

    $('.backbutton', this.content).click(function() {
      self.main.switchController(SelectController, 'right');
    });

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
        self.main.switchController(PuzzleController, 'left', preview);
      });

      previews.push(pr);
    }

    this.events.trigger('onLoad');
  }

  this.destroy = function() {
    this.content.remove();
  }

  this.init();
}
