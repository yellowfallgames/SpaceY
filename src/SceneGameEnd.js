
class SceneGameEnd extends Phaser.Scene {

    constructor() {

        super("SceneGameEnd");
    }

    preload(){
        
    }

    create() {

        //Botón para volver al menú
        this.BtnBackToMenu = this.add.text(game.config.width/2, 2*game.config.height/3, "VOLVER",{fontSize:'60px',fill:'#ffffff',}).setDepth(6).setOrigin(0.5)
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
function GlowMe(scene,target,fadeOut){
    this.tweens.addCounter({
        targets: target,
        from: 255,
        to: 0,
        duration: 1000,
        duration: fadeOut,
        ease: 'Expo.easeInOut',
        yoyo: true,
        onUpdate: function (tween)
        {
            var value = Math.floor(tween.getValue());

            image.setTint(Phaser.Display.Color.GetColor(value, value, value));
        }
    });
    
}

/*
key_cleanV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
key_cleanB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

//PARA EL UPDATE 
if (Phaser.Input.Keyboard.JustDown (key_cleanV) && maquinasucia)
    {
        if (Phaser.Input.Keyboard.JustDown (key_cleanB))
        {
            //contador sucio -1
        }

    }
    if (Phaser.Input.Keyboard.JustDown (key_cleanB) && maquinasucia)
    {
        if (Phaser.Input.Keyboard.JustDown (key_cleanV))
        {
            //contador sucio -1
        }
    }
*/

