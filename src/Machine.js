class Machine {//extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, nMachine) {

        this.obj = scene.add.image(x, y, "componentes", nMachine);
        this.obj.setOrigin(0.5, 13.5);

        //Colocar elementos alrededor de marte
        switch(nMachine) {

            case 0:
                //Estación de transporte
                this.obj.setRotation(0);
            break;
            case 1:
                //Terraformador
                this.obj.setRotation(-1.57);
            break;
            case 2:
                //Comunicaciones
                this.obj.setRotation(1.57);
            break;
            case 3:
                //Mina
                this.obj.setRotation(3.14);
            break;
            
        }
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

}

