/*
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
        function Escena2(){
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
    width: 1024,
    height: 720,
    parent: 'Escenas',
    scene: [Escena1,Escena2]
};

var game = new Phaser.Game(config);


//*/
/*
var config = {
    width: 1024,
    height: 720,
    parent: "container",
    type: Phaser.AUTO,
    scene: [Escena1, Escena2],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0,
                debug: false
            }
        }
    }
}

var game = new Phaser.Game(config);
//*/

var directory = "./Resources/Game/";
//Objetos
var player;
var marte;
var terraformador;

//Recursos
var numMateriales = 0;
var objMateriales;
var MAX_MATERIALES = 100;
var materiales_color = Phaser.Display.Color.GetColor(57, 182, 188);

//Inputs
var key_left;
var key_right;
var key_interact;

function preload() {
    
    this.load.image("player", directory+"vulp_i1.png");
    this.load.image("marte", directory+"marte test.png");
    this.load.image("terraformador", directory+"componente test.png");
    this.load.image("barra", directory+"barra.png");
    
    this.load.spritesheet('vulpin_idle', directory+'vulpin.png', { frameWidth: 36, frameHeight: 36 });
    this.load.spritesheet('vulpin_walk', directory+'vulpin_walk.png', { frameWidth: 36, frameHeight: 36 });
}
function create() {
    
    marte = this.add.image(220, 650, "marte");
    terraformador = this.physics.add.sprite(220, 655, "terraformador");
    player = this.physics.add.sprite(220, 335, 'vulpin_idle');

    objMateriales = this.add.sprite(10, 50, "barra");
    objMateriales.setOrigin(0, 0.5);
    objMateriales.setScale(numMateriales/MAX_MATERIALES, 0.3);
    objMateriales.tint = materiales_color;//Math.random() * 0xffffff;
    console.log(objMateriales.tint);

    player.setScale(1.5);
    marte.setScale(1.5);
    terraformador.setOrigin(0.5, 7.4);
    terraformador.setRotation(0.5);

    //this.physics.add.overlap(player, terraformador, colliderInteract);

    //Animations
    this.anims.create({
        key: 'vulpin_idle',
        frames: this.anims.generateFrameNumbers('vulpin_idle', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 1,
    });

    this.anims.create({
        key: 'vulpin_walk',
        frames: this.anims.generateFrameNumbers('vulpin_walk', { start: 0, end: 10 }),
        frameRate: 10,
    });

    //Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
    key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    key_interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

    console.log(Phaser.Input.Keyboard.KeyCodes);
    console.log(marte);

    //this.input.keyboard.on("keydown_RIGHT", () => {
        //this.player.x++;
    //});
    //this.player.flipX = false;
    //this.player.setRotation(0);
    //this.player.setOrigin(0,1);

    //Físicas
    //this.player = this.physics.add.image(130, 100, "player");
    //this.player.setBounce(1);
    //this.player.setCollideWorldBounds(true);
    //this.player.setVelocity(20, 0);

    //console.log(this.player);
}
function update(time, delta) {
    
    //Inputs
    //Movimiento Marte
    if (key_left.isDown) {
        marte.rotation+=0.02;
        terraformador.rotation+=0.01;
        player.flipX = true;
        player.anims.play('vulpin_walk', true);
    }
    else if (key_right.isDown) {
        marte.rotation-=0.02;
        terraformador.rotation-=0.01;
        player.flipX = false;
        player.anims.play('vulpin_walk', true);
    }
    else {

        player.anims.play('vulpin_idle', true);
    }

    //Interaccionar
    if (key_interact.isDown) {

        if (terraformador.rotation > -0.15 && terraformador.rotation < 0.15) {
            if (numMateriales < MAX_MATERIALES) {

                numMateriales++;
                objMateriales.scaleX = numMateriales/MAX_MATERIALES;
            } 
        }
    }
}

//*/