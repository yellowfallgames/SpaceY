
class SceneGameEnd extends Phaser.Scene {

    constructor() {

        super("SceneGameEnd");
    }

    preload(){
        
    }

    create() {
        //Botón para enviar
        this.BtnBackToMenu = this.add.text(1000, 600, "VOLVER").setDepth(6)
        .setInteractive()
        .on('pointerdown', () => this.GoBack() )
        .on('pointerup', () => this.Highlight(this.BtnBackToMenu, true) )
        .on('pointerover', () => this.Highlight(this.BtnBackToMenu, true) )
        .on('pointerout', () => this.Highlight(this.BtnBackToMenu, false) );
    }

    update(delta) {

        
    }

    Highlight(obj, b) {

        b ? obj.tint = Phaser.Display.Color.GetColor(139, 139, 139) : obj.tint = Phaser.Display.Color.GetColor(255, 255, 255);  
    }

    GoBack() {

        this.scene.stop("SceneGame");
        this.scene.start("SceneMenu");
    }
}
