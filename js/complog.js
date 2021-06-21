AFRAME.registerComponent("vrlog", {
  init: function() {
    //console.log("window console log");
    //console.log(this);
    //.el.querySelector("#cameraRig")
    
    AFRAME.log(
      "Virtual Reality logs. Cool!"
    );
    // AFRAME.log(el.querySelector('#cameraRig').getAttribute('rotation'));
  },
  update: function() {
    
    var el = this.el; // Reference to the component's entity.

    el.addEventListener("xbuttondown", function(evt1) {
      AFRAME.log("xButton Pressed");
    });
    el.addEventListener("abuttondown", function(evt1) {
      AFRAME.log("aButton Pressed");
    });
    el.addEventListener("bbuttondown", function(evt1) {
      AFRAME.log("bButton Pressed");
    });
    el.addEventListener("ybuttondown", function(evt1) {
      AFRAME.log("yButton Pressed");
    });
    el.addEventListener("gripdown", function(evt1) {
      AFRAME.log("gripButton Pressed");
    });
    el.addEventListener("triggerdown", function(evt1) {
      AFRAME.log("trigerButton Pressed");
    });
    el.addEventListener("thumbstickdown", function(evt1) {
      AFRAME.log("thumbstickButton Pressed");
    });
  }
});
