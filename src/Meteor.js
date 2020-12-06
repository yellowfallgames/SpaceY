class Meteor{
    constructor(scene){

        this.rotation = 0;

        this.obj = scene.physics.add.image(marte.x, marte.y, "Meteorito")
        this.obj.rotation = this.rotation;
        this.obj.setOrigin(0.5, 6);
        this.explosion = -4;

        this.incr = 0;
        

        this.scene = scene;

        scene.tweens.add({
            targets: this.obj,
            z:9,
            duration: 3000,
            ease: 'Quint.easeIn',
            repeat: 0,
            yoyo: false,

            onComplete: this.Explode.bind(this)
        });
    }

    Update() {
        this.incr = this.obj.z;
        this.obj.setOrigin(0.5, 15 - this.incr);

        /*if (this.explosion != -4)
            if (this.explosion.body.touching)
                console.log("BOOM");*/

        //this.obj.body.debugBodyColor = this.obj.body.touching.none ? console.log("meh") : console.log("pf");
        //console.log(this.obj.body.touching.none);
    }

    Explode() {
        //console.log(this);
        //console.log("BOOM");
        
      /*  this.explosion = this.scene.add.image(marte.x, marte.y, "Meteorito").setRotation(this.obj.rotation)
        .setOrigin(0.5, this.obj.originY);

        scene.tweens.add({
            targets: this.explosion,
            size: 0,
            duration: 3000,
            ease: 'Quint.easeIn',
            repeat: 0,
            yoyo: false,

            onComplete: this.Explode.bind(this)
        });

        this.obj.setVisible(false);*/
    }

    checkCollision() {


    }
}
