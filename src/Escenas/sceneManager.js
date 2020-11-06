//import { game } from './src/init.js';

var Escena1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Escena1(){
            Phaser.Scene.call(this, {key: 'Escena1'});
        },
    create(){
        console.log('Creando escena 1');
        texto = this.add.text(game.config.width/2, game.config.height/2, 'Esta es la escena PRIMERA.',{
            fontsize:'40 px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();
    

       texto.on('pointerdown',()=>{
            console.log('Cambiando a escena 2');
            this.scene.start('Escena2');
        });

    }
})

var Escena2 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Escena1(){
            Phaser.Scene.call(this, {key: 'Escena2'});
        },
    create(){
        console.log('Creando escena 2');
        texto = this.add.text(game.config.width/2, game.config.height/2, 'Esta es la escena SEGUNDA.',{
            fontsize:'40 px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        texto.on('pointerdown',()=>{
            console.log('Cambiando a escena 1');
            this.scene.start('Escena1');
        });
    }
})

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: 'Escenas',
    scene: [Escena1,Escena2]
};

var game = new Phaser.Game(config);