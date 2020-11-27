class TerraformMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)
        this.obj = scene.add.image(x, y, "terraformador");
        this.obj.setOrigin(0.5, 2.05);
        this.obj.setScale(0.75);
    }

    update(){
        
        
    }

}