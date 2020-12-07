class Meteor extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene, 0, 0, "payloads", 0);
        this.rotation = Phaser.Math.Linear(0, Math.PI*2, Phaser.Math.Between(0,100)/100.0);

        this.obj = scene.add.image(marte.x, marte.y, "Meteorito")
        this.obj.depth = -1;
        this.obj.rotation = this.rotation;
        this.obj.setOrigin(0.5, 6);
        this.incr = 0;
        this.areaCol = 0.1;


        this.scene = scene;

        scene.tweens.add({
            targets: this.obj,
            z:9,
            duration: 3000,
            ease: 'Quint.easeIn',
            repeat: 0,
            yoyo: false,
            delay: 0,

            onComplete: this.Explode.bind(this)
        });
    }

    Update() {
        this.incr = this.obj.z;
        this.obj.setOrigin(0.5, 15 - this.incr);
    }

    Explode() {

        //Play animation
        this.checkCollision();
        //this.obj.setVisible(false);
        this.obj.destroy();
        //this.destroy();
        
    }

    checkCollision() {

        //Colisión con el jugador
        if (this.obj.rotation < this.areaCol/2 && this.obj.rotation > -this.areaCol/2) {

            DefeatCondition();
        }

        //Colisión con máquinas
        for (var i=0; i < 4; i++) {

            var machPos = maquinas[i].obj.rotation;
            var machArea = maquinas[i].area;
            if (this.obj.rotation < machPos + machArea && this.obj.rotation > machPos - machArea) {

                //Aplicar rotura a la máquina
                maquinas[i].wear = Math.max(0, maquinas[i].wear - maquinas[i].maxWear*0.3);
                maquinas[i].isBroken = true;
                //console.log("ROTO");
            }
        }

        
    }
}
