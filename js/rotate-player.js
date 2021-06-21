AFRAME.registerComponent("rotateplayer", {
  init: function() {
    this.rotateplayer = document.querySelector(
      "[rotateplayer]"
    ).components.rotateplayer;
    var self = this;
  },

  schema: {
    hand: { type: "string", default: "right", oneOf: ["right", "left"] },
    angle: { type: "number", default: 45 },
    animated: { type: "boolean", default: true },
    duration: { type: "number", default: 100 },
    smooth: { type: "boolean", default: false },
    deadzone: { type: "number", default: 0.5 }
  },

  update: function() {
    self.rotateplayer = this.rotateplayer;
    var rotateplayer = self.rotateplayer;
    var rightHand = document.querySelector("#right-hand");
    var leftHand = document.querySelector("#left-hand");

    //Listen to the thumbstick moved event.components['gamepad-controls'])
    if (this.data.hand === "right") {
      rightHand.addEventListener("thumbstickmoved", rotateplayer.moveIt);
    } else {
      leftHand.addEventListener("thumbstickmoved", rotateplayer.moveIt);
    }

    leftHand.addEventListener("triggerdown", rotateplayer.leftTriggerDown);
    leftHand.addEventListener("triggerup", rotateplayer.leftTriggerUp);
  },

  moveIt: function(e) {
    //The rig itself
    var rig = document.querySelector("#cameraRig");
    var rotX = e.detail.x;
    var rotY = e.detail.y;

    //If smooth is selected (smooth:true)
    if (rig.components["rotateplayer"].data.smooth) {
      if (Math.abs(rotX) > rig.components["rotateplayer"].data.deadzone) {
        rig.setAttribute("rotation", {
          x: rig.getAttribute("rotation").x,
          y: rig.getAttribute("rotation").y - rotX * 2,
          z: rig.getAttribute("rotation").z
        });
      }
      //if tick is selected (smooth: false)
    } else {
      //When the thumbstick is right
      if (Math.abs(Math.round(rotX)) == 1) {
        if (canRotate) {
          if (!rig.components["rotateplayer"].data.animated) {
            rig.object3D.rotation.set(
              rig.getAttribute("rotation").x,
              rig.getAttribute("rotation").y + rig.components["rotateplayer"].data.angle,
              rig.getAttribute("rotation").z
            );
          } else {
            rig.setAttribute("animation", {
              property: "rotation",
              dur: rig.components["rotateplayer"].data.duration,
              autoPlay: "true",
              loop: false,
              to:
                rig.getAttribute("rotation").x +
                " " +
                (rig.getAttribute("rotation").y +
                  rig.components["rotateplayer"].data.angle *
                    Math.round(-rotX)) +
                " " +
                rig.getAttribute("rotation").z
            });
          }

          canRotate = false;
        }
      }

      //When the thumbstick is down
      if (Math.round(rotY) == 1) {
        if (canRotate) {
          if (!rig.components["rotateplayer"].data.animated) {
            rig.object3D.rotation.set(
              rig.getAttribute("rotation").x,
              rig.getAttribute("rotation").y - 180,
              rig.getAttribute("rotation").z
            );
          } else {
            rig.setAttribute("animation", {
              property: "rotation",
              dur: rig.components["rotateplayer"].data.duration * 2,
              autoPlay: "true",
              loop: false,
              to:
                rig.getAttribute("rotation").x + " " + (rig.getAttribute("rotation").y - 180) + " " + rig.getAttribute("rotation").z
            });
          }
          canRotate = false;
        }
      }

      //When the thumbstick is up
      if (Math.round(rotY) == -1) {
        if (canRotate) {
          canRotate = false;
          this.emit("teleportstart");
        }
      }

      if (Math.round(rotX) == 0 && Math.round(rotY) == 0) {
        canRotate = true;
        this.emit("teleportend");
      }
    }
  },
  
  leftTriggerUp: function() {
    this.emit("teleportend");
  },

  leftTriggerDown: function() {
    this.emit("teleportstart");
  }
});




/*AFRAME.registerComponent("rotateplayer", {
  schema: {
    hand: { default: "right", oneOf: ["right", "left"] }
  },
  update: function() {
    let data = this.data;
    let handSelect = "#" + data.hand + "-hand";
    //let controlinfo = this.el.sceneEl; //figure how to get the navigator.gamepads().id to work
    let playerGetter = document.querySelector("#cameraRig");
    let playerAffector = this.el.querySelector(handSelect);
    let y = playerGetter.getAttribute("rotation").y;
    let count = 0;
    this.el.addEventListener("abuttondown", function(evt1) {
      if (count == 0) {
        playerGetter.setAttribute("gamepad-controls", { controller: 0 });
        //  AFRAME.log("Movement Controller 0");
        count = 1;
      } else if (count == 1) {
        playerGetter.setAttribute("gamepad-controls", { controller: 1 });
        count = 0;
        //AFRAME.log("Movement Controller 1");
      } else {
        //AFRAME.log("Controller Error! DUNNO What");
      }
    });

    playerAffector.addEventListener("axismove", function(evt1) {
      //AFRAME.log(evt1.detail.axis);
      let stickMove = evt1.detail.axis[0];

      if (stickMove > 0.15 && stickMove < 0.9 ) {
        playerGetter.setAttribute("rotation", { x: 0, y: (y -= 1.5), z: 0 });
        if (y == 360) {
          y = 0;
        }
      } else if (stickMove >= 0.9) {
        playerGetter.setAttribute("rotation", { x: 0, y: (y -= 5), z: 0 });
        if (y == 360) {
          y = 0;
        }
      } else if (stickMove < -0.15 && stickMove > -0.9) {
        playerGetter.setAttribute("rotation", { x: 0, y: (y += 1.5), z: 0 });
        if (y == 360) {
          y = 0;
        }
      } 
      else if (stickMove <= -0.9) {
        playerGetter.setAttribute("rotation", { x: 0, y: (y += 5), z: 0 });
        if (y == -360) {
          y = 0;
        }
      }
    });
  }
});
*/