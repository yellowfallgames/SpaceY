class Rocket {
    constructor(scene, x, y) {

        this.obj = scene.add.image(x, y, "rocket");
        this.obj.setOrigin(0.5, 3);
        this.obj.setScale(0.8);
        this.goLand = false;

        this.val = 0;
    }

    TakeOff() {

        this.val += 0.004;
        this.obj.setOrigin(0.5, 3+this.val);

        if (this.val > 2.5) {

            estacionTransporte.isSending = false;
            estacionTransporte.location = 1;
            this.goLand = true;

            console.log("ADIOH");
        }
    }

}