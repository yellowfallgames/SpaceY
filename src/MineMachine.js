class MineMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)
        this.obj = scene.add.image(x, y, "mina");
        this.obj.setOrigin(0.5, 2.2);
        this.obj.setScale(0.75);
    }

    update(){
        
        if (this.canInteract()) {
            //
            //Visibilidad on
            teclaAccion.setVisible(true);

            //Picar en la mina
            //
            if (key_interact.isDown) {

                if (barraCarga.n < barraCarga.max && indRocas.size < indRocas.maxSize) {

                    barraCarga.n++;
                    barraCarga.Update();
                }
                else if (barraCarga.n >= 1) {

                    indRocas.size += 10;
                    indRocas.Update();

                    barraCarga.n = 0;
                    barraCarga.Update();
                }
            }
            else{
                //Si deja de picar
                barraCarga.n = 0;
                barraCarga.Update();
            }

        }
        else{

            //La barra de carga se desactiva
            barraCarga.n = 0;
            barraCarga.Update();
        }
    }

}