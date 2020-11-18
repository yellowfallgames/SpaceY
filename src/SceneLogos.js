var timer = 0;
var MAX_TIME = 10;
var logo1, logo2;

var value;

class SceneLogos extends Phaser.Scene {

    constructor() {

        super("SceneLogos");
    }

    preload(){
        this.load.image("logo1", directory+"Concept_space_y_3.png");
        this.load.image("logo2", directory+"logo.png");
    }

    create() {

        logo1 = this.add.image(game.config.width/2, game.config.height/2, "logo1");
        logo2 = this.add.image(game.config.width/2, 2*game.config.height/6, "logo2");
    }

    update() {

        timer += 1/60;
        console.log(timer);

        value = Phaser.Math.Clamp(Phaser.Math.Easing.Cubic.Out(timer/(MAX_TIME/2)), 0, 1);
        logo2.setScale(value);
        
        
        if (timer > MAX_TIME) {

            this.scene.start('SceneMenu');
        }
    }
}