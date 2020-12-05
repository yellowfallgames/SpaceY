//import meteorito from './meteorito.js';

//const { default: Machine } = require("./Machine");

//Variables
//Directorio imágenes
var directory = "./Resources/Game/";

//Misceláneo
var nCarga = 0;
var barraCarga;
var MAX_CARGA = 100;

var toDestroy;

//Interfaz
var movTxt = 2;    //Píxeles que se mueve el texto al hacer hovering
var counter;

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
var nubes;
var N_NUBES = 5;
var teclaAccion;
var maquinas;
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
var controlTierra;

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
var nTerraformacion = 0;
var indTerra;
var MAX_TERRAFORMACION = 1000;
var txtTerraformacion;

//Barra cargamento cohete
var objCohete;
var nCoheteMat = 330;
var objCoheteMat;
var MAX_COHETEMAT = 350;
var txtCoheteMat;
var spdCargarCohete = 0.25;
var coheteMat_color = Phaser.Display.Color.GetColor(150, 103, 34);

//Recursos Marte
var nComida_M = 75;
var objComida_M;
var MAX_COMIDA = 150;
var txtComida_M;

var nRocas_M = 100;
var objRocas_M;
var MAX_ROCAS = 200;
var txtRocas_M;

var nMaterial_M = 20;
var objMaterial_M;
var MAX_MATERIAL = 100;
var txtMaterial_M;


//Recursos Tierra

/////////////////////

var music;

class SceneGame extends Phaser.Scene {
    
    constructor() {

        super("SceneGame");
    }

    preload() {
        ///*
        //SceneGame//
        this.load.image("player", directory+"vulp_i1.png");
        this.load.image("marte", directory+"marte test.png");
        this.load.image("barra", directory+"barra.png");
        
        this.load.spritesheet('componentes', directory+'componente test.png', { frameWidth: 93, frameHeight: 46 });
        this.load.spritesheet('stelonauta_idle', directory+'spritesheet_idle.png', { frameWidth: 361, frameHeight: 361 });
        this.load.spritesheet('stelonauta_run', directory+'spritesheet_run.png', { frameWidth: 361, frameHeight: 361 });


        
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
        //this.load.image("indicadorRocas", directory+"ui_M_rocas.png" );
        //this.load.image("indicadorO2", directory+"ui_M_o2.png" );
        //this.load.image("indicadorMateriales", directory+"ui_M_materiales.png" );
        //this.load.image("indicadorHambre", directory+"ui_M_hambre.png" );
        this.load.spritesheet("indicadores", directory+"M_indicators.png", { frameWidth: 145, frameHeight: 145 });
        this.load.image("flechasAmarillas", directory+"FlechasAmarillas.png" );
        
        //UI TIERRA
        this.load.image("fondoTierra", directory+"ui_T_bck.png" );
        this.load.image("lanzadera", directory+"ui_T_Lanzadera.png" );
        this.load.image("lanzaderaPuerta", directory+"ui_T_Lanzadera_door.png" );
        this.load.image("lanzaderaCountdown", directory+"ui_T_countdown.png" );
        /*this.load.image("cargaMateriales", directory+"ui_T_payload_materiales.png" );
        this.load.image("cargaRocas", directory+"ui_T_payload_rocas.png" );
        this.load.image("cargaO2", directory+"ui_T_payload_o2.png" );
        this.load.image("cargaComida", directory+"ui_T_payload_comida.png" );*/
        this.load.spritesheet("payloads", directory+"ui_T_payloads.png", { frameWidth: 52, frameHeight: 37 });
        this.load.image("paqueteriaBase", directory+"ui_T_Paqueteria_contadores.png" );
        this.load.image("paqueteriaBaseTubo", directory+"ui_T_Paqueteria_contadores_tubo.png" );
        this.load.image("paqueteriaBotonComida", directory+"ui_T_Paqueteria_comida.png" );
        this.load.image("paqueteriaBotonO2", directory+"ui_T_Paqueteria_o2.png" );
        this.load.image("paqueteriaBotonMat", directory+"ui_T_Paqueteria_materiales.png" );
        this.load.image("paqueteriaBotonEnviar", directory+"ui_T_Paqueteria_enviar.png" );
        this.load.image("paqueteriaPasarela", directory+"ui_T_Paqueteria_pasarela.png" );
        this.load.image("ddrBaseTubo", directory+"ui_T_DDR1.png" );
        this.load.image("ddrBase", directory+"ui_T_DDR2.png" );
        this.load.image("ddrFlecha_0", directory+"ui_T_DDR_arrow.png" );
        this.load.image("ddrFlecha_1", directory+"ui_T_DDR_arrow.png" );
        this.load.image("ddrFlecha_2", directory+"ui_T_DDR_arrow.png" );
        this.load.image("ddrBotonMat", directory+"ui_T_DDR_materiales.png" );
        this.load.image("ddrBotonO2", directory+"ui_T_DDR_o2.png" );
        this.load.image("ddrBotonComida", directory+"ui_T_DDR_comida.png" );
        this.load.image("controlBase", directory+"ui_T_control_pannel.png" );
        this.load.image("controlKey", directory+"ui_T_control_key.png" );
        this.load.image("controlPass", directory+"ui_T_control_pass.png" );
        this.load.image("controlTerr", directory+"ui_T_control_TERR.png" );
        this.load.image("controlMina", directory+"ui_T_control_MINA.png" );
        this.load.image("controlRocket", directory+"ui_T_control_ROCKET.png" );
        this.load.image("controlCom", directory+"ui_T_control_COM.png" );
        this.load.image("pantalla", directory+"ui_T_pantalla.png" );
        this.load.image("pantallaMapa", directory+"ui_T_pantalla_plano.png" );
        this.load.image("rocket", directory+"ui_T_rocket.png" );
        this.load.image("antena", directory+"antena.png" );
        this.load.image("mina", directory+"mina.png" );
        this.load.image("terraformador", directory+"terraformador.png" );
    
        //*/
    }

    create() {

        //MARTE
		// ui_M_bck
        fondoMarte = this.add.image(407, 450, "fondoMarte");

        //Inicialización planeta
        marte = this.add.image(game.config.width/4, 1250, "marte").setScale(3);

        //Cohete en Marte
        objCohete = new Rocket(this, marte.x, marte.y);

        //Inicialización máquinas
        maquinas = new Array(4);
        estacionTransporte = new StationMachine(this, marte.x, marte.y);
        terraformador = new TerraformMachine(this, marte.x, marte.y, 1);
        comunicaciones = new CommsMachine(this, marte.x, marte.y, 2);
        mina = new MineMachine(this, marte.x, marte.y, 3);
        maquinas[0] = estacionTransporte;
        maquinas[1] = terraformador;
        maquinas[2] = comunicaciones;
        maquinas[3] = mina;

        //Nubes
        nubes = new Array(N_NUBES);
        
        for(var i=0; i<N_NUBES; i++) {

            nubes[i] = new Cloud(this);
            /*var nrand = Phaser.Math.Between(0,0);
            switch(nrand) {
                
                //NUBE 1
                case 0:
                    nubes[i] = this.add.image(marte.x, marte.y, "nube");
                    var orig = Phaser.Math.Linear(6, 8, Phaser.Math.Between(0,100)/100.0);
                    nubes[i].setOrigin(0.5, orig);
                    nubes[i].rotation = Phaser.Math.Linear(0, 2*Math.PI, Phaser.Math.Between(0,100)/100.0); 
                break;
                //NUBE 2
                case 1:
                    nubes[i] = this.add.image(marte.x, marte.y, "nube");
                    nubes[i].setOrigin(0.5,7);
                    nubes[i].rotation = Phaser.Math.Between(-3.13,3.13);
                break;
                //NUBE 3
                case 2:
                    nubes[i] = this.add.image(marte.x, marte.y, "nube");
                    nubes[i].setOrigin(0.5, 8);
                    nubes[i].rotation = Phaser.Math.Between(-3.13,3.13);
                break;
            }*/
            
        }

        //TIERRA
        controlTierra = new EarthControl(this, 0, 0, 8);
        //controlTierra.PushFromMars();
		
		
		// ui_M_horas
		//timerHoras = this.add.image(553, 97, "timeHoras");
		
		// ui_M_minutos
		timerMinutos = this.add.image(635, 97, "timerMinutos");
		
		// ui_M_segundos
		timerSegundos = this.add.image(716, 97, "timerSegundos");
		
		// ui_M_actionbox: Tecla de acción
        teclaAccion = this.add.image(marte.x, 500, "teclaAccion").setVisible(false);
		
		// ui_M_dangerArrow
		alertaPeligroIz = this.add.image(665, 365, "alertaPeligro").setVisible(false);
		
		// ui_M_dangerArrow_1
		alertaPeligroDc = this.add.image(144, 365, "alertaPeligro").setScale(-1,1).setVisible(false); // *************************************************FLIP EJE VERTICAL!
    
        //Contador tiempo restante
        counter = new Counter(this, 10*60);
        
        

        //jugador
        player = this.physics.add.sprite(marte.x,marte.y-620, 'stelonauta_idle').setScale(0.6);

 
        //Indicadores recursos
        indTerra = new ResourceIndicator(this, 401, 787, 3, nTerraformacion, MAX_TERRAFORMACION);
        indHam = new ResourceIndicator(this, 109, 74, 0, nComida_M, MAX_COMIDA);
        indRocas = new ResourceIndicator(this, 109, 166, 1, nRocas_M, MAX_ROCAS);
        indMat = new ResourceIndicator(this, 109, 256, 2, nMaterial_M, MAX_MATERIAL);

        //Cargamento cohete
        objCoheteMat = new Bar(this, game.config.width/4 - 70, player.y + 10, nCoheteMat, MAX_COHETEMAT, 0.5, 0.5, coheteMat_color, true);
        objCoheteMat.obj.setRotation(-1.57);

        //Barra de carga
        barraCarga = new Bar(this, player.x-40, player.y-50, nCarga, MAX_CARGA, 0.3, 0.1, -1, false);

        //Animaciones
        this.anims.create({
            key: 'stelonauta_idle',
            frames: this.anims.generateFrameNumbers('stelonauta_idle', { start: 0, end: 19 }),
            frameRate: 18,
            //repeat: 1,
        });

        this.anims.create({
            key: 'stelonauta_run',
            frames: this.anims.generateFrameNumbers('stelonauta_run', { start: 0, end: 21 }),
            frameRate: 18,
        });

        //Input events
        this.cursors = this.input.keyboard.createCursorKeys();
        key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        key_interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        
    }
    update(time, delta) {
        
        //MARTE
        //Inputs
        //Movimiento de Marte
        if (key_left.isDown) {
            
            //Rotación de los elementos de Marte
            updateRotations(1);
        }
        else if (key_right.isDown) {

            //Rotación de los elementos de Marte
            updateRotations(-1);
        }
        else {

            player.anims.play('stelonauta_idle', true);
        }
        
        //////////////////////////////
        //Interaccionar con máquinas//
        //////////////////////////////
        //Mostrar tecla interacción
        if (!(maquinas[0].canInteract() || maquinas[1].canInteract() || maquinas[2].canInteract() || maquinas[3].canInteract()) && maquinas[0].isSending) {

            teclaAccion.setVisible(false);
        }

        //Acciones de cada máquina
        for(i = 0; i < 4; i++) {

            maquinas[i].update();
        }



        ///////////
        //Pasivas//
        ///////////

        //Nubes
        for(var i=0; i<N_NUBES; i++) {
            nubes[i].Update();
        }

        //Desgaste máquinas//(mejor en sus clases)
        

        //Desgaste hambre//
        indHam.size -= 0.00015;
        indHam.Update();

        if (indHam <= 0)
            DefeatCondition();


        //TIERRA
        controlTierra.Update();
    }

    
}


function updateRotations(sign) {

    for(var i=0; i<N_NUBES; i++) {
        nubes[i].obj.rotation += 0.01*sign;
    }
    marte.rotation+=0.02*sign;
    objCohete.obj.rotation+=0.007*sign;
    for (i=0; i<4; i++) {

        maquinas[i].obj.setRotation(maquinas[i].obj.rotation + 0.007*sign);
    }

    sign===1 ? player.flipX = false : player.flipX = true;
    player.anims.play('stelonauta_run', true);

    //Desgaste extra hambre
    indHam.size -= 0.0015;
    indHam.Update();
}

function DestroyOnScene(obj) {

    obj.destroy();
}

//Acciones condiciones victoria/derrota
function VictoryCondition(){

    console.log("HAS GANADO!!!");
}

function DefeatCondition(){

    console.log("HAS PERDIDO :c");
}
