var HowToPlayController = function(main, content, returnController, returnPuzzle) {
  this.main = main;
  this.content = content;
  this.returnController = returnController;
  this.returnPuzzle = returnPuzzle; /* unset if not from PuzzleController */

  /* EVENTS */

  this.events = new EventManager(this, [
      'onLoad',
    ])

  this.init = function() {
     if (!this.returnController)
       this.returnController = SelectController;

     this.content.addClass('more');

     var html = '<div class="backbutton ' + $.i18n.getLanguage() + '"></div>' +
                '<p> How to play... whatever</p>';
     this.content.html(html);

     var self = this;
     $('.backbutton').click(function() {
       self.main.switchController(self.returnController, 'right', self.returnPuzzle);
     });

     /* we need to launch is separate, of jquery will not call the triggered
        event. I don't now why, but without the setTimeout, the event is not
        triggered by jQuery */
     window.setTimeout(function() {
       self.events.trigger('onLoad');
     }, 10);
  }

  this.destroy = function() {
    this.content.remove();
  }

  this.init();
}