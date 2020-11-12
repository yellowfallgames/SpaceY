//Variables
//Directorio imágenes
var directory = "./Resources/Game/";

//Misceláneo
var nCarga = 0;
var barraCarga;
var MAX_CARGA = 100;

//Interfaz
var movTxt = 2;    //Píxeles que se mueve el texto al hacer hovering

//Inputs
var key_left;
var key_right;
var key_up;
var key_down;
var key_interact;

//Objetos
//Marte
var player;
var marte;
var fondoMarte;
var nube;
var teclaAccion;
var terraformador;
var mina;
var comunicaciones;
var estacionTransporte;
var desgaste_terraformador;
var desgaste_mina
var desgaste_comunicaciones;
var desgaste_estacionTransporte;
var alertaMeteorito;
var alertaPeligro;
var terraformLevel;
var timerSegundos;
var timerMinutos;
var timerHoras;
var indRocas;
var indO2;
var indMat;
var indHam;

//Tierra
var fondoTierra;
var lanzadera;
var rocket;
var lanzPuerta;
var lanzCtdn;
var cargaMat;
var paqBase;
var paqBtnComida;
var paqBtnO2;
var paqBtnMat;
var paqBtnEnv;
var paqPasarela;
var ddrBase;
var ddrFlechaDown;
var ddrBtnMat;
var ddrBtnO2;
var ddrBtnComida;
var controlBase;
var controlKey;
var controlPass;
var controlTerr;
var controlMina;
var controlRocket;
var controlCom;
var pantalla;
var pantallaMapa;
var pantallaAux;

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

var nRocas_M = 100;
var objRocas_M;
var MAX_ROCAS = 200;
var rocas_color = Phaser.Display.Color.GetColor(142, 203, 53);
var txtRocas_M;

var nMaterial_M = 0;
var objMaterial_M;
var MAX_MATERIAL = 100;
var material_color = Phaser.Display.Color.GetColor(221, 38, 38);
var txtMaterial_M;


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
        
        //UI MARTE
        this.load.image("fondoMarte", directory+"ui_M_bck.png" );
        this.load.image("nube", directory+"ui_M_nubes.png" );
        this.load.image("teclaAccion", directory+"ui_M_actionbox.png" );
        this.load.image("alertaMeteorito", directory+"ui_M_meteorito.png" );
        this.load.image("terraformLevel", directory+"ui_M_terrafomlevel.png" );
        this.load.image("alertaPeligro", directory+"ui_M_dangerArrow.png" );
        this.load.image("timerSegundos", directory+"ui_M_segundos.png" );
        this.load.image("timerMinutos", directory+"ui_M_minutos.png" );
        this.load.image("timeHoras", directory+"ui_M_horas.png" );
        this.load.image("indicadorRocas", directory+"pngs/ui_M_rocas.png" );
        this.load.image("indicadorO2", directory+"ui_M_o2.png" );
        this.load.image("indicadorMateriales", directory+"ui_M_materiales.png" );
        this.load.image("indicadorHambre", directory+"ui_M_hambre.png" );
        
        //UI TIERRA
        this.load.image("fondoTierra", directory+"ui_T_bck.png" );
        this.load.image("lanzadera", directory+"ui_T_Lanzadera.png" );
        this.load.image("rocket", directory+"ui_T_rocket.png" );
        this.load.image("lanzaderaPuerta", directory+"ui_T_Lanzadera_door.png" );
        this.load.image("lanzaderaCountdown", directory+"ui_T_countdown.png" );
        this.load.image("cargaMateriales", directory+"ui_T_payload_materiales.png" );
        this.load.image("paqueteriaBase", directory+"ui_T_Paqueteria_contadores.png" );
        this.load.image("paqueteriaBotonComida", directory+"ui_T_Paqueteria_comida.png" );
        this.load.image("paqueteriaBotonO2", directory+"ui_T_Paqueteria_o2.png" );
        this.load.image("paqueteriaBotonMat", directory+"ui_T_Paqueteria_materiales.png" );
        this.load.image("paqueteriaBotonEnviar", directory+"ui_T_Paqueteria_enviar.png" );
        this.load.image("paqueteriaPasarela", directory+"ui_T_Paqueteria_pasarela.png" );
        this.load.image("ddrBase", directory+"ui_T_DDR.png" );
        this.load.image("ddrFlechaAbajo", directory+"ui_T_DDR_arrow.png" );
        this.load.image("ddrBotonMat", directory+"ui_T_DDR_materiales.png" );
        this.load.image("ddrBotonO2", directory+"ui_T_DDR_o2.png" );
        this.load.image("ddrBotonComida", directory+"ui_T_DDR_comida.png" );
        this.load.image("controlBase", directory+"ui_T_control_pannel.png" );
        this.load.image("controlKey", directory+"ui_T_control_key.png" );
        this.load.image("controlPass", directory+"ui_T_control_pass.png" );
        this.load.image("controlTerr", directory+"ui_T_control_boton4.png" );
        this.load.image("controlMina", directory+"ui_T_control_boton3.png" );
        this.load.image("controlRocket", directory+"ui_T_control_boton2.png" );
        this.load.image("controlCom", directory+"ui_T_control_boton1.png" );
        this.load.image("pantalla", directory+"ui_T_pantalla.png" );
        this.load.image("pantallaMapa", directory+"ui_T_pantalla_plano.png" );
        this.load.image("pantallaAux", directory+"ui_T_pantalla_aux.png" );
        
    }

    create() {
        //UI MARTE
        //************************************ */
        /*fondoMarte = this.add.image(481.0, 540.0,"fondoMarte");   //Fondo marte
        nube = this.add.image(481.0, 439.9,"nube"); //nubes
        teclaAccion = this.add.image(481.0, 620.4,"teclaAccion");
        alertaMeteorito = this.add.image(481.0, 181.0,"alertaMeteorito");
        terraformLevel = this.add.image(481.0, 940.2,"terraformLevel");
        alertaPeligro = this.add.image(798.2, 433.4,"alertaPeligro");
        timerHoras = this.add.image(715.2, 100.5,"timerHoras");
        timerMinutos = this.add.image(887.2, 100.5,"timerMinutos");
        timerSegundos = this.add.image(801.2, 100.5,"timerSegundos");
        //indicadores
        indRocas = this.add.image(105.3, 414.4,"indicadorRocas");
        indO2 = this.add.image(105.3, 197.5,"indicadorO2");
        indMat = this.add.image(105.3, 306.0,"indicadorMat");
        indHam = this.add.image(105.3, 89.0,"indicadorHambre");

        //UI Tierra
        //************************************ */
        /*fondoTierra = this.add.image(1441.7, 540.0,"fondoTierra");
        //Lanzadera
        lanzadera = this.add.image(1150.0, 439.9,"lanzadera");
        rocket = this.add.image(1150.0, 543.9,"rocket");
        lanzPuerta = this.add.image(1150.0, 81.5,"lanzaderaPuerta");
        lanzCtdn = this.add.image(1150.0, 214.1,"lanzaderaCountdown");
        cargaMat = this.add.image(1150.0, 709.4,"cargaMateriales");
        //Envio de Paquetes
        paqBase = this.add.image(1458.4, 784.9,"paqueteriaBase");
        paqBtnComida = this.add.image(1395.9, 670.9,"paqueteriaBotonComida");
        paqBtnO2 = this.add.image(1520.9, 670.9,"paqueteriaBotonO2");
        paqBtnMat = this.add.image(1459.4, 670.9,"paqueteriaBotonMat");
        paqBtnEnv = this.add.image(1458.4, 742.4,"paqueteriaBotonEnviar");
        paqPasarela = this.add.image(1278.0, 641.9,"paqueteriaPasarela");
        //DDR
        ddrBase = this.add.image(1260.9, 940.2,"ddrBase");
        ddrFlechaDown = this.add.image(1281.9, 919.2,"ddrFlechaAbajo");
        ddrBtnMat = this.add.image(1284.9, 997.5,"ddrBotonMat");
        ddrBtnO2 = this.add.image(1332.9, 997.5,"ddrBotonO2");
        ddrBtnComida = this.add.image(1380.9, 997.5,"ddrBotonComida");
        //Panel Control Zonas
        controlBase = this.add.image(1730.8, 802.4,"controlBase");
        controlPass = this.add.image(1730.8, 928.7,"controlPass");
        controlKey = this.add.image(1730.8, 978.7,"controlKey");
        controlTerr = this.add.image(1801.7, 781.5,"controlTerr");
        controlMina = this.add.image(1659.9, 781.5,"controlMina");
        controlRocket = this.add.image(1801.7, 647.3,"controlRocket");
        controlCom = this.add.image(1659.9, 647.3,"controlCom");
        //Pantalla
        pantalla = this.add.image(1599.8, 289.4,"pantalla");
        pantallaMapa = this.add.image(1589.4, 272.9,"pantallaMapa");
        pantallaAux = this.add.image(1808.3, 108.4,"pantallaAux");*/

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
        objRocas_M = this.add.sprite(0, 45, "barra");
        objMaterial_M = this.add.sprite(0, 70, "barra");
        configBarra(objComida_M, nComida_M, MAX_COMIDA, 0.6, 0.3, comida_color);
        configBarra(objRocas_M, nRocas_M, MAX_ROCAS, 0.6, 0.3, rocas_color);
        configBarra(objMaterial_M, nMaterial_M, MAX_MATERIAL, 0.6, 0.3, material_color);

        //Texto barras de recurso
        txtComida_M = this.add.text(2, objComida_M.y-7, 'COMIDA '+Math.round((nComida_M/MAX_COMIDA)*100)+'%',{
            fontsize:'40 px',
            fill: '#ffffff'
        });
        txtRocas_M = this.add.text(2, objRocas_M.y-7, 'ROCAS '+Math.round((nRocas_M/MAX_ROCAS)*100)+'%',{
            fontsize:'40 px',
            fill: '#ffffff'
        });
        txtMaterial_M = this.add.text(2, objMaterial_M.y-7, 'MATERIAL '+Math.round((nMaterial_M/MAX_MATERIAL)*100)+'%',{
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
        key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        key_interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        //console.log(Phaser.Input.Keyboard.KeyCodes);
        //console.log(marte);
    }
    update(time, delta) {
        
        //Inputs
        //Movimiento de Marte
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
        
        //////////////////////////////
        //Interaccionar con máquinas//
        //////////////////////////////
        //ESTACIÖN DE TRANSPORTE//
        if (canInteract(estacionTransporte)) {
            //Visibilidad on
            objCoheteMat.setVisible(true);
            txtCoheteMat.setVisible(true);

            //Aumentar carga del cohete
            if (key_up.isDown) {

                if (nRocas_M >= spdCargarCohete && nCoheteMat < MAX_COHETEMAT) {

                    nCoheteMat+=spdCargarCohete;
                    nRocas_M-=spdCargarCohete;

                    updateCoheteMat();
                    updateMateriales();
                }
            }

            //Recoger/Enviar recursos del cohete
            if (key_interact.isDown) {

                //Enviar a la Tierra (...)
            }

        }
        else {
            //Visibilidad off
            objCoheteMat.setVisible(false);
            txtCoheteMat.setVisible(false);
        }


        //MINA//
        if (canInteract(mina)) {

            //Picar en la mina
            //
            if (key_interact.isDown) {

                if (nCarga < MAX_CARGA && nRocas_M < MAX_ROCAS) {

                    nCarga++;
                    barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
                }
                else if (nCarga >= 1) {

                    nRocas_M += 5;
                    updateMateriales();

                    nCarga = 0;
                    barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
                }
            }
            else{
                //Si deja de picar
                nCarga = 0;
                barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
            }

        }
        else{

            //La barra de carga se desactiva
            nCarga = 0;
            barraCarga.scaleX = (nCarga/MAX_CARGA)*0.3;
        }


        //MÄQUINA DE TERRAFORMACIÖN//


        //COMUNICACIONES//
    


        /////////////
        //Desgastes//
        /////////////

        //Desgaste máquinas//
        

        //Desgaste hambre//
    }

}

function configBarra(that, n, MAX, largo, ancho, color) {

    that.setOrigin(0, 0.5);
    that.setScale((n/MAX)*largo, ancho, 0.3);
    if (color != -1)    that.tint = color;
}

function updateMateriales() {

    objRocas_M.scaleX = (nRocas_M/MAX_ROCAS)*0.6;
    txtRocas_M.setText('ROCAS '+Math.round((nRocas_M/MAX_ROCAS)*100)+'%');
}

function updateCoheteMat() {

    objCoheteMat.scaleX = (nCoheteMat/MAX_COHETEMAT)*0.5;
    txtCoheteMat.setText(Math.round((nCoheteMat/MAX_COHETEMAT)*100)+'%');
}

function canInteract(maquina) {

    if (maquina.rotation > -0.15 && maquina.rotation < 0.15) {
        
        return true;
    }
    return false;
}