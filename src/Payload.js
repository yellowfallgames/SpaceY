class Payload extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, n) {

        super(scene, x, y, "payloads", n);
        this.obj = scene.add.image(x, y, "payloads");
        //this.obj = scene.add.image(x, y, "payloads", n);
        //super(scene, marte.x, marte.y, "marte");

    }
}

