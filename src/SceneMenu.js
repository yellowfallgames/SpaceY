class SceneMenu extends Phaser.Scene {

    constructor() {

        super("SceneMenu");
    }

    preload() {
        this.load.image("bck",directory+"vulp_i1.png" );
        //this.load.image("player", directory+"vulp_i1.png");
        //this.load.spritesheet("button", "./Resources/Img/button.png", 185, 80);
        //this.load.image('background',"./Resources/Img/starfield.jpg");
    }

create() {

    //ASIGNACION DE METODO
    this.clickButton = this.add.text(game.config.width/2, (game.config.height/8)*4, 'Jugar', { fill: '#0f0'})
    .setInteractive()
    .on('pointerdown', () => this.startGame() )
    .on('pointerover', () => this.enterButtonHoverState(this.clickButton) )
    .on('pointerout', () => this.enterButtonRestState(this.clickButton) );
    this.clickButton.setOrigin(0.5);

    this.optionsButton = this.add.text(game.config.width/2, (game.config.height/8)*5, 'Opciones', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => this.enterOptions() )
    .on('pointerover', () => this.enterButtonHoverState(this.optionsButton) )
    .on('pointerout', () => this.enterButtonRestState(this.optionsButton) );
    this.optionsButton.setOrigin(0.5);
    
    this.contactButton = this.add.text(game.config.width/2, (game.config.height/8)*6, 'Contacto', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => this.enterContact() )
    .on('pointerover', () => this.enterButtonHoverState(this.contactButton) )
    .on('pointerout', () => this.enterButtonRestState(this.contactButton) );
    this.contactButton.setOrigin(0.5);
}
//INTERACTIVIDAD

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


startGame() {
    this.scene.start('SceneGame');
}

enterOptions() {
    this.scene.start('SceneOptions');
}

enterContact() {
    this.scene.start('SceneContact');
}


}