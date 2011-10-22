var PuzzleController = function(main, content, puzzle) {
  this.main = main;
  this.content = content;
  this.puzzle = puzzle;

  /* EVENTS */

  this.events = new EventManager(this, [
      'onLoad',
    ])

  this.init = function() {

     var fieldSizeClass = this.puzzle.getModel().getCols() + '_' + this.puzzle.getModel().getRows();

     this.content.addClass('puzzle').addClass('field' + fieldSizeClass);

     var html = '<div class="center">' +
                '  <table class="playfield" cellpadding="0" cellspacing="0"></table>' +
                '  <div class="timer"></div> '+
                '  <div class="modeswitch"> '+
                '    <div class="button active check"></div> ' +
                '    <div class="button mark"></div> ' +
                '  </div>' +
                '  <div class="backbutton ' + $.i18n.getLanguage() + '"></div>' +
                '</div>';
     this.content.html(html);

     var pfm = new PlayFieldModel();
     pfm.setData(this.puzzle.getModel().getData().field);

     pfm.events.bind('onSolved', function() {
       // small delay to give the browser a change to draw the result for the  last click
       window.setTimeout(function() {
           puzzle.getModel().setSolved(true);

           new Sound('solved');

           var solved = $('<div class="layer solved ' + $.i18n.getLanguage() + '"></div>');
           self.content.append(solved);
           solved.click(function() {
             self.main.switchController(ListController, 'right');
           });
         }, 100);
     });

     pfm.events.bind('onFailed', function() {
       // small delay to give the browser a change to draw the result for the  last click
       window.setTimeout(function() {
           new Sound('failed');

           var failed = $('<div class="layer failed ' + $.i18n.getLanguage() + '"></div>');
           self.content.append(failed);
           failed.click(function() {
             self.main.switchController(ListController, 'right');
           });
         }, 100);
     });

     var self = this;
     $('.backbutton').click(function() {
       self.main.switchController(ListController, 'right');
     });

     var tm = new TimerModel(pfm);

     var pf = new PlayField($('.playfield'), pfm);
     pf.draw();

     var timer = new Timer($('.timer'), tm, pfm);

     $('.modeswitch .mark').click(function() {
       $(this).addClass('active');
       $('.modeswitch .check').removeClass('active');

      pf.setMode('mark');
     });

     $('.modeswitch .check').click(function() {
       $(this).addClass('active');
       $('.modeswitch .mark').removeClass('active');

      pf.setMode('check');
     });

     /* show the "how-to-play" popup the first time a puzzle if opened.
        We open it half a second after the content is drawn, to wait for the
        animation and to make it look smoother. */
     if (!getCookie('howtoplay')) {
       window.setTimeout(function() {
         var popup = new Popup($.i18n._('showhowtoplay?'));
         popup.addButton($.i18n._('showhowtoplay_yes'), function() {
           popup.close();
           setCookie('howtoplay', 1);
           self.main.switchController(HowToPlayController, 'left', PuzzleController, self.puzzle);
         });
         popup.addButton($.i18n._('showhowtoplay_no'), function() {
           popup.close();
           setCookie('howtoplay', 1);
         });
       }, 500);
     }

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