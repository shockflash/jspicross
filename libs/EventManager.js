  /**
   * Used as event manager in all classes. Every class has an own instance
   * of it. Accepts only events that are given on init.
   */
  var EventManager = function(obj, events) {
    /* allowed events of this event manager */
    this.events = events;

    /* the object related to this event handler */
    this.obj = obj;

    this.checkEvent = function(event) {
      if ($.inArray(event, this.events) == -1)
      {
        throw("Unknown event " + event);
        return false;
      }

      return true;
    }

    this.bind = function(event, func) {
      if (!this.checkEvent(event))
        return;

      $(this).bind(event, func);
    }

    this.trigger = function(event, param1, param2, param3, param4) {
      if (!this.checkEvent(event))
        return;

      $(this).trigger(event, [this.obj, param1, param2, param3, param4]);
    }
  };