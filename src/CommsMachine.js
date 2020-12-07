class CommsMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)
        this.obj.setOrigin(0.5, 2.05);
        this.obj.setScale(0.75);
    
        this.keyIndicator = new KeyIndicator(scene, marte.x, 400, "R");
    }

    update(delta){
        
        //Desgaste
        //this.updateWear(delta);
        this.delta = delta;

        if (this.canInteract()){

            if (this.isBroken) {

                this.keyIndicator.setVisible(true);

                //Reparar roto
                this.GoRepair(delta, 1);

            }
            else {
                this.keyIndicator.setVisible(false);
                
                //Reparar sin estar roto
                this.GoRepair(delta, 0.5);
                
            }
            
        }
        else {

            this.keyIndicator.setVisible(false);
        }
    }

    GoRepair(delta, n) {

        if (key_repair.isDown && this.wear < this.maxWear) {
            var spd;
            if (n === 0.5) {

                spd = delta/6;
            }
            else {

                spd = delta/10;
            }
            //Reparación rota
            //Si no tienes materiales, reparación lenta
            if (indMat.size < this.repairCost*0.5) {

                this.repairBar.SetColor(repairBar_color2);
                spd /= 6;
            }

            if (this.repairBar.n < this.repairBar.max) {

                this.repairBar.n += spd;
                this.repairBar.Update();
            }
            else if (this.repairBar.n >= 1) {

                this.keyIndicator.setVisible(false);
                this.Repair();

                this.repairBar.n = 0;
                this.repairBar.Update();
            }
        }
        else{
            //Si se deja de reparar
            this.repairBar.n = 0;
            this.repairBar.Update();
        }
    }

}