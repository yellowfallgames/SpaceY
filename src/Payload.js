class Payload extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, n) {

        super(scene, x, y, "payloads", n);
        this.scene = scene;
        this.obj = scene.add.image(x, y, "payloads");
        //this.obj.depth = -1;
        //this.obj = scene.add.image(x, y, "payloads", n);
        //super(scene, marte.x, marte.y, "marte");

    }

    UnloadFromRocket(delay) {

        this.scene.tweens.add({
            targets: this.obj,
            y: 793,
            duration: 500,
            ease: 'Back.easeIn',
            repeat: 0,
            yoyo: false,
            delay:delay,

            onComplete: this.EnterOnMachine.bind(this)
        });
    }

    EnterOnMachine() {

        //this.obj.y = 600;
        controlTierra.tweenTube1On();
        this.obj.setVisible(false);
        this.destroy();
    }
}

