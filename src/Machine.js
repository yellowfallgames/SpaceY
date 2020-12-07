class Machine {//extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, nMachine) {

        //this.obj = scene.add.image(x, y, "componentes", nMachine);
        //this.obj.setOrigin(0.5, 13.5);

        //Colocar elementos alrededor de marte
        switch(nMachine) {

            case 0:
                //Estación de transporte
                this.obj = scene.add.image(x, y, "rocket");
                this.obj.setRotation(0);
            break;
            case 1:
                //Terraformador
                this.obj = scene.add.image(x, y, "terraformador");
                this.obj.setRotation(-1.57);
            break;
            case 2:
                //Comunicaciones
                this.obj = scene.add.image(x, y, "antena");
                this.obj.setRotation(1.57);
            break;
            case 3:
                //Mina
                this.obj = scene.add.image(x, y, "mina");
                this.obj.setRotation(3.14);
            break;
            
        }
        this.area = 0.15;

        this.maxWear = 100;
        this.wear = this.maxWear;
        this.wearPerc = 1;
        var rand = Phaser.Math.Linear(5000, 15000, Phaser.Math.Between(0,100)/100.0);
        this.eventWear = scene.time.addEvent({ delay: rand, callback: this.updateWear, callbackScope: this, loop: true });
        this.isBroken = false;

        this.repairCost = MAX_MATERIAL*0.2;
        this.repairBar = new Bar(scene, marte.x-40, marte.y-670, nCarga, MAX_CARGA, 0.3, 0.1, repairBar_color, false);

        this.delta;
    }

    setRotation(n){

        this.obj.rotation = n;
    }

    canInteract() {

        if (this.obj.rotation > -0.15 && this.obj.rotation < 0.15) {
            
            return true;
        }
        return false;
    }

    updateWear() {
        
        var delta = this.delta;
        //Desgaste
        var rand = Phaser.Math.Linear(delta, delta/1000, Phaser.Math.Between(0,100)/100.0)*this.wearPerc;
        this.wear = Phaser.Math.Clamp(this.wear - rand, 0, 100);

        if (this.wear <= 0) {

            this.isBroken = true;
            //Cambiar sprite
            this.eventWear.paused = true;
        }
        else {

            this.eventWear.delay = Phaser.Math.Linear(5000, 15000, Phaser.Math.Between(0,100)/100.0);
        }
    }

    Repair() {

        var n;
        if (this.isBroken) {

            n = 1;
        }
        else {

            n = 0.5;
        }

        indMat.size = Math.max(0, indMat.size - this.repairCost*n);
        indMat.Update();

        this.isBroken = false;
        this.wear = 100;
        this.eventWear.paused = false;
    }
}

