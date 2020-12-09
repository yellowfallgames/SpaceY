class KeyIndicator {
    constructor(scene, x, y, k) {

        this.obj = scene.add.image(x, y, "teclaAccion").setVisible(false).setDepth(3);
        this.key = k;

        this.txt = scene.add.text(this.obj.x, this.obj.y-45, this.key,{
            fontSize:'35px',
            fill:'#ffffff',
            fontStyle:'bold',
        }).setOrigin(0.5).setDepth(4);
    }

    setVisible(b) {

        this.obj.setVisible(b);
        this.txt.setVisible(b);
    }

    changeKey(k) {

        this.key = k;
        this.txt.setText(this.key);
    }
}

