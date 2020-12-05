class StationMachine extends Machine {
    constructor(scene, x, y) {

        super(scene, x, y, 0)

        this.scene = scene;
        this.animation = false;
        this.isSending = false;
        this.isComing = false;
        this.location = 0; //0 -> MARTE, 1 -> TIERRA
        this.loadOfEarth = false;
    }

    update(){
        
        if (this.location === 0 && !this.isSending) {

            if (this.canInteract()) {

                //Cargar y enviar
                if (!this.loadOfEarth) {

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
        
                    //Enviar recursos del cohete
                    if (key_interact.isDown && objCoheteMat.n === objCoheteMat.max && !this.isSending) {
        
                        //Enviar a la Tierra (...)
                        objCoheteMat.n = 0;
                        objCoheteMat.Update();
                        this.isSending = true;

                        objCoheteMat.setVisible(false);
                        teclaAccion.setVisible(false);
                    }
        
                }
                else {

                    //Visibilidad on
                    teclaAccion.setVisible(true);

                    //Recoger elementos de la tierra
                    if (key_interact.isDown) {
                        
                        indHam.size = Math.min(indHam.size + objCohete.comLoad, MAX_COMIDA);
                        indMat.size = Math.min(indMat.size + objCohete.matLoad, MAX_MATERIAL);
                        indHam.Update();
                        indMat.Update();

                        objCohete.comLoad = 0;
                        objCohete.matLoad = 0;
                        this.loadOfEarth = false;
                    }
                    
                }
                
            
            }
            else {
                //Visibilidad off
                objCoheteMat.setVisible(false);
                teclaAccion.setVisible(false);
            }
            
                
        }
        
        //Update despegar/aterrizar
        if (this.isSending)
            objCohete.TakeOff();

        if (this.isComing)
            objCohete.Land();
    }

}