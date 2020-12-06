class TerraformMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)
        
        this.obj.setOrigin(0.5, 2.6);
        this.obj.setScale(0.5);
    }

    update(){
        
        //Interacción
        if (this.canInteract()) {

            //Visibilidad on
            teclaAccion.setVisible(true);

            //Aumentar carga del cohete
            if (key_up.isDown) {

                if (indMat.size >= spdCargarCohete && indTerra.size < indTerra.maxSize) {

                    indTerra.size+=spdCargarCohete;
                    indMat.size-=spdCargarCohete;

                    indTerra.Update();
                    indMat.Update();

                    //Comprobar que se cumple la condición de victoria
                    if (indTerra.size >= indTerra.maxSize)
                        VictoryCondition();
                }
            }

        }
        else {

            //Visibilidad off
            teclaAccion.setVisible(false);
        }

    }


}