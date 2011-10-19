var Main = function() {

  this.controller;

  this.switchController = function(controller, var1, var2, var3, var4) {
    this.controller = new controller(this, var1, var2, var3, var4);
  }

}