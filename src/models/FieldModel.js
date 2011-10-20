  var FieldModel = function(x, y, filled) {

    /* VARS */

    this.x = x;
    this.y = y;

    /* if the field is part of the drawing (true), or is empty (false) */
    this.filled = filled;

    /* if the field was checked by the user. The user sayd that this field
       is a filled field. No further action can be done with this field.
       If he was right, the Playfield shows a "Filled" field, if not a
       check-mistake is shown.
       No field is checked at the beginning. */
    this.checked = false;

    /* if the field was marked by the user. Means that the user assumed
       that this field is filled or not filled, based on the user. The
       marking only changed the view, no further action is done. It helps
       the user to solve the puzzle */
    this.marked = false;

    /* EVENTS */

    this.events = new EventManager(this, [
        'onMarked',
        'onChecked'
      ])

    /* FUNCTIONS */

    this.getX = function() {
      return this.X;
    }

    this.getY = function() {
      return this.Y;
    }

    this.isFilled = function() {
      return this.filled;
    }

    this.isChecked = function() {
      return this.checked;
    }

    this.isMarked = function() {
      return this.marked;
    }

    this.setChecked = function() {
      /* you can not check a field two times */
      if (this.checked)
        return;

      this.checked = true;

      /* a field can only be checked or marked. Checking overwrittes marking */
      this.marked = false;

      this.events.trigger('onChecked');
    }

    this.setMarked = function(value) {
      /* you can not mark a checked field */
      if (this.checked)
        return;

      this.marked = value;

      this.events.trigger('onMarked', value);
    }

    this.toogleMarked = function() {
      this.setMarked(!this.marked);
    }
  }