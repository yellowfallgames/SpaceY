//Variables
//Directorio imágenes
var directory = "./Resources/Game/";

//Misceláneo
var nCarga = 0;
var barraCarga;
var MAX_CARGA = 100;

//Inputs
var key_left;
var key_right;
var key_interact;

//Objetos
var player;
var marte;
var terraformador;
var mina;
var comunicaciones;
var estacionTransporte;

//Barra terraformación
var nTerraformacion = 1000;
var objTerraformación;
var MAX_TERRAFORMACION = 1000;
var terraformación_color = Phaser.Display.Color.GetColor(184, 250, 88);

//Recursos Marte
var nComida_M = 50;
var objComida_M;
var MAX_COMIDA = 100;
var comida_color = Phaser.Display.Color.GetColor(44, 191, 238);

var nO2_M = 220;
var objO2_M;
var MAX_O2 = 300;
var O2_color = Phaser.Display.Color.GetColor(221, 38, 38);

var nMateriales_M = 170;
var objMateriales_M;
var MAX_MATERIALES = 200;
var materiales_color = Phaser.Display.Color.GetColor(142, 203, 53);

var txtComida_M;
var txtO2_M;
var txtMateriales_M;

//Recursos Tierra

/////////////////////


class SceneGame extends Phaser.Scene {

    constructor() {

        super("SceneGame");
    }

    preload() {
        this.load.image("player", directory+"vulp_i1.png");
        this.load.image("marte", directory+"marte test.png");
        this.load.image("barra", directory+"barra.png");
        this.load.image("fondoTierra", directory+"Fondo_Tierra.png");
        
        this.load.spritesheet('componentes', directory+'componente test.png', { frameWidth: 93, frameHeight: 46 });
        this.load.spritesheet('vulpin_idle', directory+'vulpin.png', { frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('vulpin_walk', directory+'vulpin_walk.png', { frameWidth: 36, frameHeight: 36 });
    }

    create() {

        //Inicialización planeta, máquinas y jugador
        marte = this.add.image(game.config.width/4, 900, "marte");

        terraformador = this.physics.add.sprite(marte.x, marte.y, "componentes", 1);
        mina = this.physics.add.sprite(marte.x, marte.y, "componentes", 3);
        comunicaciones = this.physics.add.sprite(marte.x, marte.y, "componentes", 2);
        estacionTransporte = this.physics.add.sprite(marte.x, marte.y, "componentes", 0);

        player = this.physics.add.sprite(marte.x,485, 'vulpin_idle');

        this.add.image(3*game.config.width/4, game.config.height/2, "fondoTierra");
        
        player.setScale(2);
        marte.setScale(2);

        //Inicialización barras de recursos y barra de terraformación
        objComida_M = this.add.sprite(0, 20, "barra");
        objComida_M.setOrigin(0, 0.5);
        objComida_M.setScale((nComida_M/MAX_COMIDA)*0.6, 0.3);
        objComida_M.tint = comida_color;

        objO2_M = this.add.sprite(0, 45, "barra");
        objO2_M.setOrigin(0, 0.5);
        objO2_M.setScale((nO2_M/MAX_O2)*0.6, 0.3);
        objO2_M.tint = O2_color;

        objMateriales_M = this.add.sprite(0, 70, "barra");
        objMateriales_M.setOrigin(0, 0.5);
        objMateriales_M.setScale((nMateriales_M/MAX_MATERIALES)*0.6, 0.3);
        objMateriales_M.tint = materiales_color;

        txtComida_M = this.add.text(2, objComida_M.y, 'COMIDA',{
            fontsize:'40 px',
            fill: '#ffffff'
        }).setOrigin(0, 0.5);
        txtO2_M = this.add.text(2, objO2_M.y, 'OXIGENO',{
            fontsize:'40 px',
            fill: '#ffffff'
        }).setOrigin(0, 0.5);
        txtMateriales_M = this.add.text(2, objMateriales_M.y, 'MATERIALES',{
            fontsize:'40 px',
            fill: '#ffffff'
        }).setOrigin(0, 0.5);

        objTerraformación = this.add.sprite(game.config.width/2, 360, "barra");
        objTerraformación.setOrigin(0.5, 0.5);
        objTerraformación.setRotation(1.57);
        objTerraformación.setScale((nTerraformacion/MAX_TERRAFORMACION)*0.3, 0.3);
        objTerraformación.tint = terraformación_color;

        //Colocar las máquinas en marte
        terraformador.setOrigin(0.5, 9.5);
        mina.setOrigin(0.5, 9.5);
        comunicaciones.setOrigin(0.5, 9.5);
        estacionTransporte.setOrigin(0.5, 9.5);

        estacionTransporte.setRotation(0); //Rotación con radianes -/+
        terraformador.setRotation(-1.57);
        comunicaciones.setRotation(1.57);
        mina.setRotation(3.14);

        //this.physics.add.overlap(player, terraformador, colliderInteract);

        //Inicialización barra de carga
        barraCarga = this.add.sprite(player.x, player.y-50, "barra"); //-45
        barraCarga.setOrigin(0.5); //0, 0.5
        barraCarga.setScale((nCarga/MAX_CARGA)*0.3, 0.1);

        //Animaciones
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

        //Input events
        this.cursors = this.input.keyboard.createCursorKeys();
        key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        key_interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        //console.log(Phaser.Input.Keyboard.KeyCodes);
        //console.log(marte);
    }
    update(time, delta) {
        
        //Inputs
        //Movimiento Marte
        if (key_left.isDown) {
            marte.rotation+=0.02;
            terraformador.rotation+=0.007;
            mina.rotation+=0.007;
            comunicaciones.rotation+=0.007;
            estacionTransporte.rotation+=0.007;
            player.flipX = true;
            player.anims.play('vulpin_walk', true);
        }
        else if (key_right.isDown) {
            marte.rotation-=0.02;
            terraformador.rotation-=0.007;
            mina.rotation-=0.007;
            comunicaciones.rotation-=0.007;
            estacionTransporte.rotation-=0.007;
            player.flipX = false;
            player.anims.play('vulpin_walk', true);
        }
        else {

            player.anims.play('vulpin_idle', true);
        }

        //Interaccionar con máquinas
        if (key_interact.isDown) {

            if (mina.rotation > -0.15 && mina.rotation < 0.15) {

                if (nCarga < MAX_CARGA && nMateriales_M < MAX_MATERIALES) {

                    nCarga++;
                    barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
                }
                else if (nCarga >= 1) {

                    nMateriales_M += 5;
                    objMateriales_M.scaleX = (nMateriales_M/MAX_MATERIALES)*0.6;

                    nCarga = 0;
                    barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
                }

            }
        }

        if (key_interact.isUp) {

            if (mina.rotation > -0.15 && mina.rotation < 0.15) {

                nCarga = 0;
                barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
            }
            
        }

    }

}