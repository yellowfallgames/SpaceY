class StationMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)
    }

    update(){
        
        if (this.canInteract()) {
            //Visibilidad on
            objCoheteMat.setVisible(true);

            //Aumentar carga del cohete
            if (key_up.isDown) {

                if (indRocas.size >= spdCargarCohete && objCoheteMat.n < objCoheteMat.max) {

                    objCoheteMat.n+=spdCargarCohete;
                    indRocas.size-=spdCargarCohete;

                    objCoheteMat.Update();
                    indRocas.Update();
                }
            }

            //Recoger/Enviar recursos del cohete
            if (key_interact.isDown) {

                //Enviar a la Tierra (...)
            }

        }
        else {
            //Visibilidad off
            objCoheteMat.setVisible(false);
        }
    }

}