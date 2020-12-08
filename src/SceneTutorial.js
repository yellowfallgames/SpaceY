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
var key_skipTutorial;
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
var meteoritos;

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


/* =========================== */
/*      TUTORIAL               */

var textMarte = [
    'Bienvenido a Space Y',

    'Cohete',
    'Aqui aterriza y despega tu cohete, OBVIO',
    'Solo podrá despegar si está lleno de ROCAS',
    'Para lanzarlo pulsa H',


    'Mina',
    'Pulsa X para obtener ROCAS de la mina',
    'Se incrementan aqui',

    'Terraformador',
    'Esta máquina permite la habitabilidad en Marte',
    'Convierte tus ROCAS en energía transformadora',
    'Conseguid el 100% para completar la misión',
    
    'Comunicación',
    'Permite la comunicación con la Tierra',
    'Si se estropea, no podrán avisarte de TORMENTAS o METEORITOS',
    'Para reparar cualquier máquina pulsa TECLA',

    'Pantalla de misión',
    'Aquí podrás ver el estado de la terraformación',
    'Sólo tu podrás ver si se acercan meteoritos o tormentas',
    'Avisa al Stelonauta para que pueda ponerse a cubierto',
];
//TEXTO EN TIERRA
var textTierra = [
    'Bienvenido a Space Y',

    'Lanzadera',
    'Aqui aterriza y despega tu cohete, OBVIO',
    'Solo podrá despegar si no está lleno de recursos o vacio de rocas',
    'Para vaciarlo pulsa en la compuerta verde inferior',
    
    'Conversor DDR',
    'Transforma pulsando las flechas 1 roca en 1 de Comida o Materiales',
    'Si te equivocas, perderás el recurso',

    'Sistema de Paquetería',
    'Este es tu almacen de Comida y Materiales',
    'Pulsa sobre comida/materiales para llenar el cohete en 1 unidad',
    'Cuando el cohete esté lleno podrás enviarlo pulsando aquí',
    
    'Panel de Control',
    'Al pulsar sobre un botón aparecerá una combinación',
    'Introducirla correctamente permite ver el estado de las máquinas',
    'Comunica esto al Stelonauta para mantener el estado de la misión',

    'Pantalla de misión',
    'Aquí podrás ver el estado de la terraformación',
    'Sólo tu podrás ver si se acercan meteoritos o tormentas',
    'Avisa al Stelonauta para que pueda ponerse a cubierto',
];
var posTuto = {
    tierra : [
        new Phaser.Math.Vector2 (),
        new Phaser.Math.Vector2 (),
        new Phaser.Math.Vector2 (),
        new Phaser.Math.Vector2 (),
        new Phaser.Math.Vector2 (),
        new Phaser.Math.Vector2 (),
        new Phaser.Math.Vector2 (),
        new Phaser.Math.Vector2 (),
    ],
    marte: []
};
var currentLine = 0;
var tutofondo;
var maskMarte;
var maskTierra;
//Recursos Tierra


//Musica
var musica;

var startSfxRun = false;
/////////////////////

var music;

class SceneTutorial extends Phaser.Scene {
    
    constructor() {

        super("SceneTutorial");
    }

    preload() {
        ///*
        //SceneGame//
        this.load.image("player", directory+"vulp_i1.png");
        this.load.image("marte", directory+"marte test.png");
        this.load.image("barra", directory+"barra.png");
        
        this.load.spritesheet('componentes', directory+'componente test.png', { frameWidth: 93, frameHeight: 46 });
        this.load.spritesheet('stelonauta_idle', directory+'spritesheet_idle_repintado.png', { frameWidth: 361, frameHeight: 361 });
        this.load.spritesheet('stelonauta_run', directory+'spritesheet_run_repintado.png', { frameWidth: 361, frameHeight: 361 });


        
        //UI MARTE
        this.load.image("fondoMarte", directory+"ui_M_bck.png" );
        this.load.image("nube", directory+"ui_M_nubes.png" );
        this.load.image("teclaAccion", directory+"ui_M_actionbox.png" );
        this.load.image("alertaMeteorito", directory+"ui_M_meteorito.png" );
        this.load.image("Meteorito", directory+"meteorito.png");
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

        //TUTORIAL
        this.load.image('tutoBck', directory +'tutorial__bck.jpg');
    
        //*/
        //MUSICA
        this.load.audio('MusicMenu', ['./Resources/Audio/Music/space walk.ogg']);
        this.load.audio('MusicIngame', ['./Resources/Audio/Music/Pioneers meets Space.ogg']);
        this.load.audio('MusicTutorial', ['./Resources/Audio/Music/Roboxel - Space Music.ogg']);

        //Ambient noise
        this.load.audio('SfxTerraformer', ['./Resources/Audio/SFX/Mars/Machines/Terraformer.ogg']);
        this.load.audio('apolo11Ambient', ['./Resources/Audio/SFX/Common/apolo11Ambient.ogg']);

        //SFX
        this.load.audio('SfxWalk', ['./Resources/Audio/SFX/Mars/sfx_step_grass.ogg']);
        this.load.audio('SfxArrive', ['./Resources/Audio/SFX/Fanfare/arrive.ogg']);
        this.load.audio('SfxClick', ['./Resources/Audio/SFX/Common/click.ogg']);
        this.load.audio('SfxHover', ['./Resources/Audio/SFX/Common/hover.ogg']);
        this.load.audio('SfxLeave', ['./Resources/Audio/SFX/Fanfare/leave.ogg']);
        this.load.audio('SfxReceive', ['./Resources/Audio/SFX/Fanfare/receive.ogg']);
        this.load.audio('SfxSend', ['./Resources/Audio/SFX/Fanfare/send.ogg']);
        this.load.audio('SfxPipe', ['./Resources/Audio/SFX/Earth/pipe.ogg']);
        this.load.audio('SfxTakeOff', ['./Resources/Audio/SFX/Earth/space_ship.ogg']);
        this.load.audio('SfxLanding', ['./Resources/Audio/SFX/Mars/landing.ogg']);
        this.load.audio('SfxMeteorHit', ['./Resources/Audio/SFX/Mars/DeathFlash.ogg']);
        this.load.audio('SfxAlarm', ['./Resources/Audio/SFX/Mars/DeathFlash.ogg']);
        //Fanfare
        this.load.audio('SfxWin', ['./Resources/Audio/SFX/Fanfare/win.ogg']);
        this.load.audio('SfxLose', ['./Resources/Audio/SFX/Fanfare/lose.ogg']);
    }

    create() {
        //musica
        musica = this.sound.add('MusicMenu');
        musica.volume = 0.5;
        musica.loop = true;
        musica.play();
        sfx = {
            loop: true,
            volume: 1,
            sounds: [
                        this.sound.add('SfxClick'),     //[0]
                        this.sound.add('SfxHover'),
                        this.sound.add('SfxTerraformer'),
                        this.sound.add('SfxWalk'),
                        this.sound.add('SfxWin'),
                        this.sound.add('SfxLose'),      //[5]
                        this.sound.add('SfxArrive'),
                        this.sound.add('SfxLeave'),
                        this.sound.add('SfxReceive'),
                        this.sound.add('SfxSend'),
                        this.sound.add('SfxPipe'),      //[10]
                        this.sound.add('SfxTakeOff'),
                        this.sound.add('SfxLanding'),
                        this.sound.add('SfxMeteorHit'),
                        this.sound.add('SfxAlarm')
                    ]
        };

        sfx.sounds.forEach(element => {
            element.volume = sfx.volume;
        });

        sfx.sounds[2].loop = sfx.loop;
        sfx.sounds[3].loop = sfx.loop;
        sfx.sounds[12].volume = 0.3;

        //Musica
        let volumen;
        if(musica!=undefined){
            musica.stop();
            volumen = musica.volume;
        }
        musica = this.sound.add('MusicIngame');
        musica.loop = true;
        musica.volume = volumen;
        musica.play();
        musica = this.sound.add('apolo11Ambient');
        musica.loop = true;
        musica.volume = volumen;
        musica.play();


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

        //
        meteoritos = new Array();
        meteoritos[0] = new Meteor(this);

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
            frames: this.anims.generateFrameNumbers('stelonauta_idle', { start: 0, end: 59 }),
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
        key_skipTutorial = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

        initTutorial(this);
    }
    update(time, delta) {

        //*************************************** */
        //          TUTORIAL
        //*********************************** */
        if (Phaser.Input.Keyboard.JustDown (key_skipTutorial)) {
            //Pasa una linea en ambas partes del tutorial
            currentLine ++;
            tutotextMarte.destroy();
            tutotextTierra.destroy();
            tutotextMarte = this.add.text (100,100,textMarte[currentLine]).setDepth(10);
            tutotextTierra = this.add.text (100,300,textTierra[currentLine]).setDepth(10);
        }




        //MARTE
        //Inputs
        //Movimiento de Marte
        if (key_left.isDown) {
            //Rotación de los elementos de Marte
            updateRotations(1, delta);
        }
        else if (key_right.isDown) {
            //Rotación de los elementos de Marte
            updateRotations(-1, delta);
        }
        else {

            player.anims.play('stelonauta_idle', true);
        }

        if ((key_left.isDown || key_right.isDown) && !startSfxRun) {
            startSfxRun = true;
            sfx.sounds[3].play();
        }
        if (key_left.isUp && key_right.isUp) {
            startSfxRun = false;
            sfx.sounds[3].stop();
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

            maquinas[i].update(delta);
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
        indHam.size = Phaser.Math.Clamp(indHam.size - delta/2500, 0, indHam.maxSize); 
        indHam.Update();

        if (indHam.size <= 0)
            DefeatCondition();


        //TIERRA
        controlTierra.Update(delta);

        meteoritos[0].Update();
    }

    
}


function updateRotations(sign, delta) {

    for(var i=0; i<N_NUBES; i++) {
        nubes[i].obj.rotation += sign*delta/1000;
    }
    /*for(var i=0; i<nMeteoritos; i++) {
        nubes[i].obj.rotation += 0.01*sign;
    }*/
    meteoritos[0].obj.rotation += sign*delta/1500;
    marte.rotation+=sign*delta/1500;
    objCohete.obj.rotation+=sign*delta/1500;
    for (i=0; i<4; i++) {

        maquinas[i].obj.setRotation(maquinas[i].obj.rotation + sign*delta/1500);
    }

    sign===1 ? player.flipX = false : player.flipX = true;
    player.anims.play('stelonauta_run', true);

    //Desgaste extra hambre
    indHam.size = Phaser.Math.Clamp(indHam.size - delta/2500, 0, indHam.maxSize); 
    indHam.Update();
}

function DestroyOnScene(obj) {

    obj.destroy();
}

//Acciones condiciones victoria/derrota
function VictoryCondition(){
    sfx.sounds[4].play();
    console.log("HAS GANADO!!!");
}

function DefeatCondition(){
    sfx.sounds[5].play();
    console.log("HAS PERDIDO :c");
}

function initTutorial(scene){
    //añadimos la pantalla negra
    tutofondo = scene.add.image(0,0,'tutoBck');
    tutofondo.setAlpha(0.8).setScale(2,2).setDepth(8);
    
    //Mostramos textos
    tutotextMarte = scene.add.text (100,100,textMarte[currentLine]).setDepth(10);
    tutotextTierra = scene.add.text (100,300,textTierra[currentLine]).setDepth(10);
    
    TipoMask(scene,'s');
    moverMascara(500,500,maskMarte,scene);

}

function TipoMask(scene,tipo){
    maskMarte = scene.make.graphics();  //haz un grafico
    switch (tipo){
        case 's':
            maskMarte.fillStyle(000000,1);  //color y alpha
            maskMarte.fillCircle(300,0,100);  //x, y, radio
            maskMarte.moveTo(300, 500);
            maskMarte.fillStyle(000000,1);  //color y alpha
            maskMarte.fillCircle(300,500,100);  //x, y, radio
        case 'c':
    }
    tutofondo.mask = new Phaser.Display.Masks.GeometryMask(scene, maskMarte);
    tutofondo.mask.setInvertAlpha (true);

    
}

function moverMascara(fposX,fposY,mask,scene) //x fposX, y = fposYcmask o smask
{
    scene.tweens.add({
        targets: [mask],
        x: fposX,
        y: fposY,
        delay: 100,
        duration: 500,
        ease: 'Elastic.easeInOut',
        repeat: 0,
        yoyo: false,
        //delay:delay,

        //onComplete: this.EnterOnMachine.bind(this)
    });
    scene.tweens.add({
        targets: mask,
        scaleX: 1.2,
        scaleY: 1.2,
        delay: 100,
        duration: 500,
        ease: 'Expo.easeInOut',
        repeat: -1,
        yoyo: true,
        //delay:delay,

        //onComplete: this.EnterOnMachine.bind(this)
    });
}
/* TUTORIAL */
