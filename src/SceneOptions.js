class SceneOptions extends Phaser.Scene {

    constructor() {

        super("SceneOptions");
    }

    create() {

        this.volumeButton = this.add.text(100, 100, 'Volumen on/off', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.startGame() )
        .on('pointerover', () => this.enterButtonHoverState(this.volumeButton) )
        .on('pointerout', () => this.enterButtonRestState(this.volumeButton) );

        this.sfxButton = this.add.text(100, 150, 'SFX on/of', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.enterOptions() )
        .on('pointerover', () => this.enterButtonHoverState(this.sfxButton) )
        .on('pointerout', () => this.enterButtonRestState(this.sfxButton) );

        this.backButton = this.add.text(game.config.width-200, game.config.height-100, 'Atrás', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.enterBack() )
        .on('pointerover', () => this.enterButtonHoverState(this.backButton) )
        .on('pointerout', () => this.enterButtonRestState(this.backButton) );

    }

    enterOptions() {
        //this.scene.start(SceneOptions);
    }

    enterContact() {
        //this.scene.start(SceneContact);
    }

    enterBack() {
        this.scene.start('SceneMenu');
    }

    enterButtonHoverState(boton) {
        boton.setStyle({ fill: '#ff0'});
        boton.x = boton.x+movTxt;
        boton.y = boton.y+movTxt;
    }
    
    enterButtonRestState(boton) {
        boton.setStyle({ fill: '#0f0' });
        boton.x = boton.x-movTxt;
        boton.y = boton.y-movTxt;
    }

}