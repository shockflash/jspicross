  /**
   * Represantion of the header (cols or rows)
   */
  var Header = function(element, type, index, playFieldModel) {
    this.element = element;
    this.type = type; // col or row
    this.index = index; // col or row index of this header
    this.playFieldModel = playFieldModel;

    this.init = function() {
      this.element.addClass('header').addClass(this.type);
    }

    /**
     * Checks if a row or col is solved, so that the header
     * can mark this
     */
    this.check = function() {
      if (this.type == 'col')
        this.checkCol();
      else
        this.checkRow();
    }

    this.checkCol = function() {
      var done = true;

      var count = this.playFieldModel.getColCount();
      for (var y = 1; y <= count; y++)
      {
        var field = this.playFieldModel.getField(this.index, y);
        if (field.isFilled() && !field.isChecked())
          done = false;
      }

      if (done)
        this.element.addClass('done');
    }

    this.checkRow = function() {
      var done = true;

      var count = this.playFieldModel.getRowCount();
      for (var x = 1; x <= count; x++)
      {
        var field = this.playFieldModel.getField(x, this.index);
        if (field.isFilled() && !field.isChecked())
          done = false;
      }

      if (done)
        this.element.addClass('done');
    }

    this.init();
  }