class SceneContact extends Phaser.Scene {

    constructor() {

        super("SceneContact");
    }

    create() {

        this.aButton = this.add.text(100, 100, './Itch.io', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.goItchio() )
        .on('pointerover', () => this.enterButtonHoverState(this.aButton) )
        .on('pointerout', () => this.enterButtonRestState(this.aButton) );

        this.bButton = this.add.text(100, 150, './Twitter', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.goTwitter() )
        .on('pointerover', () => this.enterButtonHoverState(this.bButton) )
        .on('pointerout', () => this.enterButtonRestState(this.bButton) );

        this.cButton = this.add.text(100, 200, './Github', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.goGithub() )
        .on('pointerover', () => this.enterButtonHoverState(this.cButton) )
        .on('pointerout', () => this.enterButtonRestState(this.cButton) );

        this.backButton = this.add.text(game.config.width-200, game.config.height-100, 'Atrás', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.enterBack() )
        .on('pointerover', () => this.enterButtonHoverState(this.backButton) )
        .on('pointerout', () => this.enterButtonRestState(this.backButton) );

    }

    goItchio() {
        sfx.sounds[0].play();
        window.open('https://yellowfall-fenix.itch.io/space-y', '_blank');
    }

    goTwitter() {
        sfx.sounds[0].play();
        window.open('https://twitter.com/SpaceYGame', '_blank');
    }

    goGithub() {
        sfx.sounds[0].play();
        window.open('https://github.com/Jacquesmeyns/SpaceY', '_blank');
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