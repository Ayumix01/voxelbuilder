AFRAME.registerComponent("input", {
  init: function() {
    let el = this.el; // Reference to the component's entity.
    let saber = this.el.querySelector(".saber");
    saber.isOn = false;
    saber.setAttribute("scale", { x: 0, y: 0, z: 0 });

    el.addEventListener("xbuttondown", function(evt1) {});
    el.addEventListener("abuttondown", function(evt1) {});
    el.addEventListener("bbuttondown", function(evt1) {});
    el.addEventListener("ybuttondown", function(evt1) {});
    el.addEventListener("triggerdown", function(evt1) {});
    el.addEventListener("thumbstickdown", function(evt1) {});

    el.addEventListener("gripdown", function(evt1) {
      if (!saber.isOn) {
        saber.setAttribute("sound", { src: "#saberOpen" });
        saber.components.sound.playSound();
        saber.setAttribute("scale", { x: 1, y: 1, z: 1 });
        saber.isOn = true;
      }
    });
    el.addEventListener("gripup", function(evt1) {
      if (saber.isOn) {
        saber.setAttribute("sound", { src: "#saberClose" });
        saber.components.sound.playSound();
        saber.setAttribute("scale", { x: 0, y: 0, z: 0 });
        saber.isOn = false;
      }
    });
    saber.addEventListener("sound-ended", function(evt1) {
      if (saber.isOn) {
        saber.setAttribute("sound", { src: "#saberOn" });
        saber.components.sound.playSound();
      }
    });
  }
});
