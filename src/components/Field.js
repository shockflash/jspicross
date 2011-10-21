  var Field = function(x, y, element, playfield, model) {

    /* VARS */

    this.x = x;
    this.y = y;
    this.element = element;
    this.model = model;
    this.playfield = playfield;

    /* EVENTS */

    this.events = new EventManager(this, [
        'onChecked',
      ])

    /* FUNCTIONS*/

    this.init = function() {
      this.element.addClass('empty');

      if (this.x % 5 == 0 && x < this.playfield.getModel().getColCount())
        this.element.addClass('fifthx');

      if (this.y % 5 == 0 && y < this.playfield.getModel().getRowCount())
        this.element.addClass('fifthy');

      /* add event listener */
      var self = this;

      this.model.events.bind('onChecked', function(event, model) {
        self.handleOnChecked(model);
      });

      this.model.events.bind('onMarked', function(event, model, value) {
        self.handleOnMarked(model, value);
      });

      element.mousedown(function(event) {
        /* see doc-comment of startMouseDown to understand what is done here */
        self.playfield.startMouseDown();
        self.handleClick(event);
      });

      element.mousemove(function(event) {
        if (self.playfield.getDrag())
          self.handleClick();
      });
    }

    this.getX = function() {
      return this.x;
    }

    this.getY = function() {
      return this.y;
    }

    this.handleOnChecked = function(model) {
      this.element.removeClass('empty marked mistake checked');
      if (model.isFilled())
      {
        this.element.addClass('checked');
        new Sound('filled');
      } else {
        this.element.addClass('mistake');
        new Sound('error');
      }
    }

    this.handleOnMarked = function(model, value) {
      this.element.removeClass('empty marked');

      if (value)
      {
        this.element.addClass('marked');
        new Sound('marked');
      } else {
        this.element.addClass('empty');
        new Sound('unmark');
      }
    }

    this.handleClick = function() {
      /* ignore any further clicks if playfield is solved or failed*/
      if (this.playfield.getModel().isSolved() || this.playfield.getModel().isFailed())
        return;

      if (this.playfield.getMode() == 'check')
        this.checked();

      if (this.playfield.getMode() == 'mark')
        this.marked();

    }

    this.checked = function() {
      /* you can not check a field two times */
      if (this.model.isChecked())
        return;

      this.model.setChecked();

      this.events.trigger('onChecked');
    }

    this.marked = function() {
      /* if mark is set in drag mode, we do a special handling */
      if (this.playfield.getDrag())
      {
        var mode = this.playfield.getDragMarkMode();

        if (mode == 'clear')
          this.model.setMarked(false);
        if (mode == 'set')
          this.model.setMarked(true);

        if (mode == '')
        {
          mode = 'set';
          if (this.model.isMarked())
            mode = 'clear';
          this.playfield.setDragMarkMode(mode);

          this.model.toogleMarked();
        }
      } else {
        this.model.toogleMarked();
      }
    }

    this.getModel = function() {
      return this.model;
    }

    this.init();
  }