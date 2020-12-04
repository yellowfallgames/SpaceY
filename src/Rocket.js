class Rocket {
    constructor(scene, x, y) {

        this.obj = scene.add.image(x, y, "rocket");
        this.obj.setOrigin(0.5, 2.5);
        this.obj.setScale(1);
        this.goLand = false;

        this.val = 0;

        this.comLoad = 0;
        this.matLoad = 0;
    }

    TakeOff() {

        this.val += 0.004;
        this.obj.setOrigin(0.5, 2.5+this.val);

        if (this.val > 2.5) {

            controlTierra.tweenLanzPuertaExtIn();
            estacionTransporte.isSending = false;
            estacionTransporte.location = 1;
            this.goLand = true;
        }
    }

    Land() {

        this.val -= 0.004;
        this.obj.setOrigin(0.5, 2.5+this.val);

        if (this.val <= 0) {

            this.val = 0;
            this.obj.setOrigin(0.5, 2.5+this.val);
            estacionTransporte.isComing = false;
            estacionTransporte.location = 0;
            estacionTransporte.loadOfEarth = true;
        }
    }

}