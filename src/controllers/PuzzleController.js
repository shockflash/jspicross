var PuzzleController = function(main, puzzle) {
  this.main = main;
  this.puzzle = puzzle;

  this.init = function() {

     $('body').removeClass().addClass('puzzle');

     var html = '<table class="playfield" cellpadding="0" cellspacing="0">' +
        '</table> ' +
        '<div class="modeswitch"> '+
        '  <div class="button active check"></div> ' +
        '  <div class="button mark"></div> ' +
        '</div>' +
        '<div class="backbutton">Back</div>';
     $('.content').html(html);

     var pfm = new PlayFieldModel();
     pfm.setData(puzzle.getModel().getData().field);

     pfm.events.bind('onSolved', function() {
       // small delay to give the browser a change to draw the result for the  last click
       window.setTimeout(function() {
           puzzle.getModel().setSolved(true);

           var solved = $('<div class="layer solved"></div>');
           $('.content').append(solved);
           solved.click(function() {
             self.main.switchController(IndexController);
           });
         }, 100);
     });

     var self = this;
     $('.backbutton').click(function() {
       self.main.switchController(IndexController);
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
  }

  this.init();
}