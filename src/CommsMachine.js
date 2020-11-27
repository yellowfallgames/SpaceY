class CommsMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)
        this.obj = scene.add.image(x, y, "antena");
        this.obj.setOrigin(0.5, 2.2);
        this.obj.setScale(0.75);
        
    }

    update(){
        
    }

}