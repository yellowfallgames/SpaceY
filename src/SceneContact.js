class SceneContact extends Phaser.Scene {

    constructor() {

        super("SceneContact");
    }

    create() {

        this.aButton = this.add.text(100, 100, 'blabluble', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.startGame() )
        .on('pointerover', () => this.enterButtonHoverState(this.aButton) )
        .on('pointerout', () => this.enterButtonRestState(this.aButton) );

        this.bButton = this.add.text(100, 150, 'bleblubliblo', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.enterOptions() )
        .on('pointerover', () => this.enterButtonHoverState(this.bButton) )
        .on('pointerout', () => this.enterButtonRestState(this.bButton) );

        this.cButton = this.add.text(100, 200, 'blublublablo', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.enterContact() )
        .on('pointerover', () => this.enterButtonHoverState(this.cButton) )
        .on('pointerout', () => this.enterButtonRestState(this.cButton) );

        this.backButton = this.add.text(game.config.width-200, game.config.height-100, 'Atrás', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.enterBack() )
        .on('pointerover', () => this.enterButtonHoverState(this.backButton) )
        .on('pointerout', () => this.enterButtonRestState(this.backButton) );

    }

    startGame() {
        sfx.sounds[0].play();
        //this.scene.start(SceneGame);
    }

    enterOptions() {
        sfx.sounds[0].play();
        //this.scene.start(SceneOptions);
    }

    enterContact() {
        sfx.sounds[0].play();
        //this.scene.start(SceneContact);
    }

    enterBack() {
        sfx.sounds[0].play();
        this.scene.start('SceneMenu');
    }

    enterButtonHoverState(boton) {
        sfx.sounds[1].play();
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