class SceneMenu extends Phaser.Scene {

    constructor() {

        super("SceneMenu");
    }

    preload() {

        //this.load.image("player", directory+"vulp_i1.png");
        //this.load.spritesheet("button", "./Resources/Img/button.png", 185, 80);
        //this.load.image('background',"./Resources/Img/starfield.jpg");
    }

    

    //create(){
        //Botón con texto
    //    var texto;
    //    console.log('Creando escena menú');
        /*texto = this.add.text(game.config.width/2, game.config.height/2, 'JUGAR',{
            fontsize:'40 px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();
    

        texto.on('pointerdown',()=>{
            console.log('Cambiando a escena 2');
            this.scene.start('SceneGame');
        });
        */

        //Botón con sprite
        /*var btn;
        btn = this.add.image( "player");
        btn.setInteractive();

        btn.on('pointerdown',()=>{
            console.log('Cambiando a escena 2');
            this.scene.start('SceneGame');
        });*/
//---
/*
        background = this.add.tileSprite(0, 0, 800, 600, 'background');

        button = this.add.button(game.config.width/2 - 95, 400, 'button', actionOnClick, this, 1, 0, 2, 0);

        button.onInputOver.add(over, this);
        button.onInputOut.add(out, this);
        button.onInputUp.add(up, this);
        */
//---
//}
create() {

    this.clickButton = this.add.text(100, 100, 'Jugar', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => this.startGame() )
    .on('pointerover', () => this.enterButtonHoverState(this.clickButton) )
    .on('pointerout', () => this.enterButtonRestState(this.clickButton) );

    this.optionsButton = this.add.text(100, 150, 'Opciones', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => this.enterOptions() )
    .on('pointerover', () => this.enterButtonHoverState(this.optionsButton) )
    .on('pointerout', () => this.enterButtonRestState(this.optionsButton) );

    this.contactButton = this.add.text(100, 200, 'Contacto', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => this.enterContact() )
    .on('pointerover', () => this.enterButtonHoverState(this.contactButton) )
    .on('pointerout', () => this.enterButtonRestState(this.contactButton) );

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