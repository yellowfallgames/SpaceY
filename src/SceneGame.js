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

//Barra cargamento cohete
var nCoheteMat = 0;
var objCoheteMat;
var MAX_COHETEMAT = 350;
var coheteMat_color = Phaser.Display.Color.GetColor(150, 103, 34);
var txtCoheteMat;
var spdCargarCohete = 0.2;

//Recursos Marte
var nComida_M = 75;
var objComida_M;
var MAX_COMIDA = 150;
var comida_color = Phaser.Display.Color.GetColor(44, 191, 238);
var txtComida_M;

var nMateriaP_M = 0;
var objMateriaP_M;
var MAX_MATERIAP = 200;
var materiaP_color = Phaser.Display.Color.GetColor(142, 203, 53);
var txtMateriaP_M;

var nChips_M = 0;
var objChips_M;
var MAX_CHIPS = 100;
var Chips_color = Phaser.Display.Color.GetColor(221, 38, 38);
var txtChips_M;


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
        objMateriaP_M = this.add.sprite(0, 45, "barra");
        objChips_M = this.add.sprite(0, 70, "barra");
        configBarra(objComida_M, nComida_M, MAX_COMIDA, 0.6, 0.3, comida_color);
        configBarra(objMateriaP_M, nMateriaP_M, MAX_MATERIAP, 0.6, 0.3, materiaP_color);
        configBarra(objChips_M, nChips_M, MAX_CHIPS, 0.6, 0.3, Chips_color);

        //Texto barras de recurso
        txtComida_M = this.add.text(2, objComida_M.y-7, 'COMIDA '+Math.round((nComida_M/MAX_COMIDA)*100)+'%',{
            fontsize:'40 px',
            fill: '#ffffff'
        });
        txtMateriaP_M = this.add.text(2, objMateriaP_M.y-7, 'MATERIA PRIMA '+Math.round((nMateriaP_M/MAX_MATERIAP)*100)+'%',{
            fontsize:'40 px',
            fill: '#ffffff'
        });
        txtChips_M = this.add.text(2, objChips_M.y-7, 'CHIPS '+Math.round((nChips_M/MAX_CHIPS)*100)+'%',{
            fontsize:'40 px',
            fill: '#ffffff'
        });
        
        //Barra de terraformación
        objTerraformación = this.add.sprite(game.config.width/2, 360, "barra");
        configBarra(objTerraformación, nTerraformacion, MAX_TERRAFORMACION, 0.3, 0.3, terraformación_color);
        objTerraformación.setRotation(1.57);

        //Barra cargamento cohete
        objCoheteMat = this.add.sprite(game.config.width/4 - 70, player.y + 10, "barra");
        configBarra(objCoheteMat, nCoheteMat, MAX_COHETEMAT, 0.5, 0.3, coheteMat_color);
        objCoheteMat.setRotation(-1.57);
        objCoheteMat.setVisible(false);
        txtCoheteMat = this.add.text(objCoheteMat.x-16, objCoheteMat.y-10, Math.round((nCoheteMat/MAX_COHETEMAT)*100)+'%',{
            fontsize:'40 px',
            fill: '#ffffff'
        }).setVisible(false);

        //Inicialización barra de carga
        barraCarga = this.add.sprite(player.x, player.y-50, "barra");
        barraCarga.setOrigin(0.5);
        barraCarga.setScale((nCarga/MAX_CARGA)*0.3, 0.1);

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
        //Visibilidad barra estación de transporte
        if (estacionTransporte.rotation > -0.15 && estacionTransporte.rotation < 0.15) {

            objCoheteMat.setVisible(true);
            txtCoheteMat.setVisible(true);
        }
        else {

            objCoheteMat.setVisible(false);
            txtCoheteMat.setVisible(false);
        }

        if (key_interact.isDown) {
            //Estación de transporte
            if (estacionTransporte.rotation > -0.15 && estacionTransporte.rotation < 0.15) {

                if (nMateriaP_M >= spdCargarCohete && nCoheteMat < MAX_COHETEMAT) {

                    nCoheteMat+=spdCargarCohete;
                    nMateriaP_M-=spdCargarCohete;

                    updateCoheteMat();
                    updateMateriales();
                }
            }

            //Mina
            if (mina.rotation > -0.15 && mina.rotation < 0.15) {

                if (nCarga < MAX_CARGA && nMateriaP_M < MAX_MATERIAP) {

                    nCarga++;
                    barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
                }
                else if (nCarga >= 1) {

                    nMateriaP_M += 5;
                    updateMateriales();

                    nCarga = 0;
                    barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
                }

            }
            else{

                nCarga = 0;
                barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
            }
        }

        if (key_interact.isUp) {

            if (mina.rotation > -0.15 && mina.rotation < 0.15) {

                nCarga = 0;
                barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
            }
            
        }

    }

    //Desgaste máquinas

}

function configBarra(that, n, MAX, largo, ancho, color) {

    that.setOrigin(0, 0.5);
    that.setScale((n/MAX)*largo, ancho, 0.3);
    if (color != -1)    that.tint = color;
}

function updateMateriales() {

    objMateriaP_M.scaleX = (nMateriaP_M/MAX_MATERIAP)*0.6;
    txtMateriaP_M.setText('MATERIA PRIMA '+Math.round((nMateriaP_M/MAX_MATERIAP)*100)+'%');
}

function updateCoheteMat() {

    objCoheteMat.scaleX = (nCoheteMat/MAX_COHETEMAT)*0.5;
    txtCoheteMat.setText(Math.round((nCoheteMat/MAX_COHETEMAT)*100)+'%');
}