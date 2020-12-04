class CommsMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)
        this.obj.setOrigin(0.5, 2.05);
        this.obj.setScale(0.75);
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

    update(){
        
    }

}