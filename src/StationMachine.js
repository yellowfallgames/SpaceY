class StationMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)

        this.animation = false;
        this.isSending = false;
        this.location = 0; //0 -> MARTE, 1 -> TIERRA
    }

    update(){

        if (this.location === 0 && !this.isSending) {

            if (this.canInteract()) {
                //Visibilidad on
                objCoheteMat.setVisible(true);
                teclaAccion.setVisible(true);
    
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
                if (key_interact.isDown && objCoheteMat.n === objCoheteMat.max && !this.isSending) {
    
                    //Enviar a la Tierra (...)
                    objCoheteMat.n = 0;
                    this.isSending = true;

                    objCoheteMat.setVisible(false);
                    teclaAccion.setVisible(false);
                }
    
            }
            else {
                //Visibilidad off
                objCoheteMat.setVisible(false);
                teclaAccion.setVisible(false);
            }
        }
        
        if (this.isSending)
            objCohete.TakeOff();
    }

}