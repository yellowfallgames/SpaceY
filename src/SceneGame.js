//import meteorito from './meteorito.js';

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
var flechasAmarillas;
var alertaMeteorito;
var alertaPeligroIz;
var alertaPeligroDc;
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
var cargaO2;
var cargaRocas;
var cargaComida;
var paqBase;
var paqBtnComida;
var paqBtnO2;
var paqBtnMat;
var paqBtnEnv;
var paqPasarela;
var ddrBase;
var ddrFlecha_0;
var ddrFlecha_1;
var ddrFlecha_2;
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
var pantallaPlano;

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
        
        
    }

    create() {
		// ui_M_bck
        fondoMarte = this.add.image(407, 450, "fondoMarte");

        //Inicialización planeta, máquinas y jugador
        marte = this.add.image(game.config.width/4, 1250, "marte");

        terraformador = this.physics.add.sprite(marte.x, marte.y, "componentes", 1);
        mina = this.physics.add.sprite(marte.x, marte.y, "componentes", 3);
        comunicaciones = this.physics.add.sprite(marte.x, marte.y, "componentes", 2);
        estacionTransporte = this.physics.add.sprite(marte.x, marte.y, "componentes", 0);
		
		// ui_T_bck
        fondoTierra = this.add.image(1202, 450, "fondoTierra");
		
		// ui_T_pantalla
		pantalla = this.add.image(1337, 250, "pantalla");
		
		// ui_T_Lanzadera
		lanzadera = this.add.image(963, 365, "lanzadera");
		
		// ui_M_hambre
		indHam = this.add.image(109, 74, "indicadorHambre");
		
		// ui_M_materiales
		indMat = this.add.image(109, 166, "indicadorMateriales");
		
		// ui_M_rocas
		indRocas = this.add.image(109, 256, "indicadorRocas");
		
		// ui_M_nubes
		nube = this.add.image(397, 369, "nube");
		nube.setOrigin(2, 2);   // *********************************************CAMBIARRRRRRR
		nube.visible = false;
		
		// ui_M_horas
		timerHoras = this.add.image(553, 97, "timeHoras");
		
		// ui_M_minutos
		timerMinutos = this.add.image(635, 97, "timerMinutos");
		
		// ui_M_segundos
		timerSegundos = this.add.image(716, 97, "timerSegundos");
		
		// ui_T_control_pannel
		controlBase = this.add.image(1447, 676, "controlBase");
		
		// ui_T_control_COM
		controlCom = this.add.image(1388, 549, "controlCom");
		
		// ui_T_control_MINA
		controlMina = this.add.image(1506, 549, "controlMina");
		
		// ui_T_control_ROCKET
		controlRocket = this.add.image(1388, 666, "controlRocket");
		
		// ui_T_control_TERR
		controlTerr = this.add.image(1506, 666, "controlTerr");
		
		// ui_T_control_key
		controlKey = this.add.image(1447, 760, "controlKey");
		
		// ui_T_control_pass
		controlPass = this.add.image(1447, 829, "controlPass");
		
		// ui_T_Paqueteria_contadores
		paqBase = this.add.image(1219, 674, "paqueteriaBase");
		
		// ui_T_DDR
		ddrBase = this.add.image(1055, 793, "ddrBase");
		
		// ui_T_Paqueteria_comida
		paqBtnComida = this.add.image(1167, 581, "paqueteriaBotonComida");
		
		// ui_T_DDR_comida
		ddrBtnComida = this.add.image(1075, 836, "ddrBotonComida");
		
		// ui_T_DDR_materiales
		ddrBtnMat = this.add.image(1114, 836, "ddrBotonMat");
		
		// ui_T_DDR_o2
		ddrBtnO2 = this.add.image(1153, 836, "ddrBotonO2");
		
		// ui_T_Paqueteria_materiales
		paqBtnMat = this.add.image(1220, 581, "paqueteriaBotonMat");
		
		// ui_T_Paqueteria_o2
		paqBtnO2 = this.add.image(1272, 581, "paqueteriaBotonO2");
		
		// ui_T_countdown
		lanzCtdn = this.add.image(956, 210, "lanzaderaCountdown");
		
		// ui_T_Lanzadera_door
		lanzPuerta = this.add.image(958, 83, "lanzaderaPuerta");
		
		// ui_M_actionbox
	    teclaAccion = this.add.image(marte.x, 500, "teclaAccion");
		
		// ui_T_pantalla_plano
		pantallaPlano = this.add.image(1337, 227, "pantallaMapa");
		
		// ui_T_Paqueteria_enviar
		paqBtnEnv = this.add.image(1220, 645, "paqueteriaBotonEnviar");
		
		// ui_M_dangerArrow
		alertaPeligroIz = this.add.image(665, 365, "alertaPeligro");
		
		// ui_M_dangerArrow_1
		alertaPeligroDc = this.add.image(144, 365, "alertaPeligro"); // *************************************************FLIP EJE VERTICAL!
        alertaPeligroDc.setScale(-1,1);
        
		// ui_T_rocket
		rocket = this.add.image(957, 455, "rocket");
		
		// ui_T_payload_materiales
        cargaMat = this.add.image(957, 599, "cargaMateriales");
        cargaO2 = this.add.image(957, 599, "carga02");
        cargaComida = this.add.image(957, 599, "cargaComida");
        cargaRocas = this.add.image(957, 599, "cargaRocas");
		
		// ui_M_terrafomlevel
		terraformLevel = this.add.image(401, 787, "terraformLevel");
		
		// ui_T_Paqueteria_pasarela
		paqPasarela = this.add.image(1056, 584, "paqueteriaPasarela");
		
		// ui_T_DDR_arrow
		ddrFlecha_0 = this.add.image(1076, 776, "ddrFlecha_0");
		
		// ui_T_DDR_arrow_1
		ddrFlecha_1 = this.add.image(1114, 776, "ddrFlecha_1");
		
		// ui_T_DDR_arrow_2
		ddrFlecha_2 = this.add.image(1153, 776, "ddrFlecha_2");
		
		// flechasAmarillas
		flechasAmarillas = this.add.image(393, 232, "FlechasAmarillas");

        //jugador
        player = this.physics.add.sprite(marte.x,marte.y-600, 'vulpin_idle');

        //this.add.image(3*game.config.width/4, game.config.height/2, "fondoTierra");
        
        player.setScale(3);
        marte.setScale(3);

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
        terraformador.setOrigin(0.5, 13.5);
        mina.setOrigin(0.5, 13.5);
        comunicaciones.setOrigin(0.5, 13.5);
        estacionTransporte.setOrigin(0.5, 13.5);

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

        //var m = new meteorito(0, 0, this);
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