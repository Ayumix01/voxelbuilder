AFRAME.registerComponent("achanger", {
  schema: {
    listenTo: { default: "" },
    changeTo: { default: "" }
  },
  init: function() {
    data = this.data;
    var el = this.el; // Reference to the component's entity.

    el.addEventListener(data.listenTo, function() {
      el.setAttribute("animation-mixer", {clip: data.changeTo });
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
