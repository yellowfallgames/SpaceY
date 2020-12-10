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
var key_repair;
var key_skipTutorial;

//Objetos
//Marte
var player;
var playerSpeed = 1;
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
var nComida_M = 100;
var objComida_M;
var MAX_COMIDA = 150;
var txtComida_M;

var nRocas_M = 100;
var objRocas_M;
var MAX_ROCAS = 200;
var txtRocas_M;

var nMaterial_M = 0;
var objMaterial_M;
var MAX_MATERIAL = 100;
var txtMaterial_M;

//Barra carga
var repairBar_color = Phaser.Display.Color.GetColor(160, 190, 55);
var repairBar_color2 = Phaser.Display.Color.GetColor(225, 164, 13);

//Recursos Tierra


var startSfxRun = false;
/////////////////////
/* =========================== */
/*      TUTORIAL               */
var posicionesTutorial;
var textMarte = [
    'Bienvenido a Space Y\n\nPulsa Y para continuar',
    '#',
    'Cohete',
    'Aqui aterriza y despega tu cohete, OBVIO',
    'Solo podrá despegar si está lleno de ROCAS',
    'Para lanzarlo pulsa H',
    '#',
    'Mina',
    'Desplázate usando A y D a tu izquierda',
    'Pulsa H para obtener ROCAS de la mina',
    'Se incrementan aqui',
    '#',
    'Terraformador',
    'Esta máquina permite la habitabilidad en Marte',
    'Convierte tus ROCAS en energía transformadora',
    'Conseguid el 100% para completar la misión',
    '#',
    'Comunicación',
    'Permite la comunicación con la Tierra',
    'Si se estropea, no podrán avisarte de TORMENTAS o METEORITOS',
    'Para reparar cualquier máquina pulsa TECLA',
    '#',
    'Pantalla de misión',
    'Aquí podrás ver el estado de la terraformación',
    'Sólo tu podrás ver si se acercan meteoritos o tormentas',
    'Avisa al Stelonauta para que pueda ponerse a cubierto',
    '#',
    'En caso de duda, CLICK en Post-IT',
    '$' //fin tutorial
];
//TEXTO EN TIERRA
var textTierra = [
    'Bienvenido a Space Y\n\nPulsa Y para continuar',
    '#',
    'Lanzadera',
    'Aqui aterriza y despega tu cohete, OBVIO',
    'Solo podrá despegar si no está lleno de recursos o vacio de rocas',
    'Para vaciarlo pulsa en la compuerta verde inferior',
    '#',
    'Conversor DDR',
    'Transforma un recurso pulsando las flechas',
    '1 roca = 1 de Comida o Materiales',
    'Si te equivocas, perderás el recurso',
    '#',
    'Sistema de Paquetería',
    'Este es tu almacen de Comida y Materiales',
    'Pulsa sobre comida/materiales para llenar el cohete en 1 unidad',
    'Cuando el cohete esté lleno podrás enviarlo pulsando aquí',
    '#',
    'Panel de Control',
    'Al pulsar sobre un botón aparecerá una combinación',
    'Introducirla correctamente permite ver el estado de las máquinas',
    'Comunica esto al Stelonauta para mantener el estado de la misión',
    '#',
    'Pantalla de misión',
    'Aquí podrás ver el estado de la terraformación',
    'Sólo tu podrás ver si se acercan meteoritos o tormentas',
    'Avisa al Stelonauta para que pueda ponerse a cubierto',
    '#',
    'En caso de duda, CLICK en Post-IT',
    '$' //fin tutorial
];

var currentLine;
var tutoPosIndex;
var tutofondo;
var tutotextMarte;
var tutotextTierra;
var maskMarte;
var tutorialEnded;

/////////////////////

var music;


//Particulas
var emitterStorm;
var emitterMachines = []; // 0 - Cohete || 1 - Radio || 2 - Mina || 3 - Terraformador

//POST ITS
var postIt;
var postItExp;
var isbig = false;
class SceneTutorial extends Phaser.Scene {
    
    constructor() {

        super("SceneTutorial");
    }

    preload() {
        
        posicionesTutorial = {
            tierra : [
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //welcome
                new Phaser.Math.Vector2 (963,365), //lanzadera
                new Phaser.Math.Vector2 (1108,793), // ddr
                new Phaser.Math.Vector2 (1219,574), //paqueteria
                new Phaser.Math.Vector2 (1447,676), //panel control
                new Phaser.Math.Vector2 (1337,250), //pantalla mision
                new Phaser.Math.Vector2 (game.config.width-90,100), //POST-IT
                new Phaser.Math.Vector2 (game.config.width/2,game.config.height/2) //fin tutorial
            ],
            marte: [
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //welcome
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //cohete
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //mina
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //terraformador
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //comunicacion
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //pantalla de mision
                new Phaser.Math.Vector2 (game.config.width-90,100), //POST-IT
                new Phaser.Math.Vector2 (game.config.width/2,game.config.height/2) //fin tutorial
            ],
            rotOrden:
            [
                0,  //welcome
                0,  //cohete
                Phaser.Math.PI*2,   //mina
                Phaser.Math.PI*-1,  //terraformador
                Phaser.Math.PI,     //comunicacion
                0,  //pantalla de mision
                0,  //post it
                0,  //fin tutorial


            ]
        };
    }

    create() {

	    tutorialEnded = false;  //utorial acabado
        currentLine = 0;

        sfx.sounds[2].loop = sfx.loop;
        sfx.sounds[3].loop = sfx.loop;
        sfx.sounds[8].loop = true;
        sfx.sounds[14].loop = true;
        sfx.sounds[12].volume = 0.3;
        sfx.sounds[2].volume = 0;
        sfx.sounds[8].volume = 0;
        
        soundtrack.pistas[0].stop();
        soundtrack.pistas[1].play();
        soundtrack.pistas[3].play();

        //PLAY a los sonidos de las máquinas
        sfx.sounds[2].play();
        sfx.sounds[8].play();

        //Animaciones
        this.anims.create({
            key: 'stelonauta_idle',
            frames: this.anims.generateFrameNumbers('stelonauta_idle', { start: 0, end: 59 }),
            frameRate: 18,
            //repeat: 1,
        });

        this.anims.create({
            key: 'stelonauta_run',
            frames: this.anims.generateFrameNumbers('stelonauta_run', { start: 0, end: 20 }),
            frameRate: 30,
        });

        this.anims.create({
            key: 'movimientoTerraformador',
            frames: this.anims.generateFrameNumbers('movimientoTerraformador', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'movimientoAntena',
            frames: this.anims.generateFrameNumbers('movimientoAntena', { start: 0, end: 10 }),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: 'movimientoMina',
            frames: this.anims.generateFrameNumbers('movimientoMina', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'movimientoCohete',
            frames: this.anims.generateFrameNumbers('movimientoCohete', { start: 0, end: 8 }),
            frameRate: 15,
            repeat: 0,
        });
        this.anims.create({
            key: 'movimientoCoheteReverse',
            frames: this.anims.generateFrameNumbers('movimientoCohete', { start: 8, end: 0 }),
            frameRate: 15,
            repeat: 0,
        });
        

        //MARTE
		// ui_M_bck
        fondoMarte = this.add.image(407, 450, "fondoMarte").setDepth(-2);

        //Inicialización planeta
        marte = this.add.image(game.config.width/4, 1250, "marte").setScale(3).setDepth(-2);

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
            
        }

        //
        meteoritos = new Array();

        //TIERRA
        controlTierra = new EarthControl(this, 0, 0, 8);
        //controlTierra.PushFromMars();
		
		
		
		
		// ui_M_actionbox: Tecla de acción
        //
		
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
        objCoheteMat = new Bar(this, game.config.width/4 - 120, player.y - 100, nCoheteMat, MAX_COHETEMAT, 0.5, 0.5, coheteMat_color, true);
        objCoheteMat.obj.setRotation(-1.57);

        //Barra de carga
        barraCarga = new Bar(this, player.x-40, player.y-50, nCarga, MAX_CARGA, 0.3, 0.1, -1, false);        

        //Input events
        this.cursors = this.input.keyboard.createCursorKeys();
        key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        key_interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        key_repair = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        key_skipTutorial = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

        
        //Genera meteoritos cada x ms (TESTING)
        //var timedEvent = this.time.addEvent({ delay: 3000, callback: genMeteors, callbackScope: this, loop: true });


        //PARTÍCULAS TORMENTA
        emitterStorm = this.add.particles('spark').createEmitter({
            x: {min: 0, max: 1500},
            y: 0,
            blendMode: 'COLOR',
            scale: { start: 0.2, end: 0 },
            tint: 0x50ff6a00,
            speedX: { min: -500, max: -900 },
            speedY: { min: 500, max: 1500 },
            quantity: 100,
            on: false
        });

        

        //Cohete        [0]
        emitterMachines[0] = this.add.particles('smoke');
        emitterMachines[0].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });
        
        emitterMachines[0].posX = emitterMachines[0].x;
        emitterMachines[0].posY = emitterMachines[0].y;

        //emitterMachines[0].startFollow(player);
///*
        //Radio         [1]
        emitterMachines[1] = this.add.particles('smoke');
        emitterMachines[1].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });
        
        emitterMachines[1].posX = emitterMachines[1].x;
        emitterMachines[1].posY = emitterMachines[1].y;
    

        //Mina          [2]
        emitterMachines[2] = this.add.particles('smoke');
        emitterMachines[2].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });
        
        emitterMachines[2].posX = emitterMachines[2].x;
        emitterMachines[2].posY = emitterMachines[2].y;
    

        //Terraformador [3]
        emitterMachines[3] = this.add.particles('smoke');
        emitterMachines[3].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });
        
        emitterMachines[3].posX = emitterMachines[3].x;
        emitterMachines[3].posY = emitterMachines[3].y;

        emitterMachines.forEach(element => {
            element.setDepth(-1);
        });

        //POST IT
        postIt = this.add.image(game.config.width-90,100, "postIt").setDepth(7)
        .setInteractive()
        .on('pointerdown', () => OpenPostIt(postIt,this))
        .on('pointerup', () => HighlightPostIt(postIt, true))
        .on('pointerover', () => HighlightPostIt(postIt, true))
        .on('pointerout', () => HighlightPostIt(postIt, false));	
        
        postItExp = this.add.image(game.config.width-100,100, "postItExp")
        .setDepth(7)
        .setScale(0.2)
        .setInteractive()
        .setVisible(false)
        .on('pointerdown', () => OpenPostIt(postItExp,this))
        .on('pointerup', () => HighlightPostIt(postItExp, true))
        .on('pointerover', () => HighlightPostIt(postItExp, true))
        .on('pointerout', () => HighlightPostIt(postItExp, false));
        
        
    //*/
        /*
        this.input.on('pointerDown', function (pointer) {
            //emitter.setPosition(Phaser.Math.Between(0, game.config.width), 0)
            emitterStorm.emitZoneIndex = 1;
            emitterStorm.active = false;
            console.log("APAGA");
        });
        //*/
    
        /*
        this.input.on('pointerdown', function (pointer) {
            emitZoneIndex = (emitZoneIndex + 1) % emitZones.length;
            emitter.setEmitZone(emitZones[emitZoneIndex]);
            emitter.explode();
        });
        //*/
    
        //emitter.setEmitZone(emitZones[emitZoneIndex]); 
        initTutorial(this);
    
    }
    update(time, delta) {

        //*************************************** */
        //          UPDATE TUTORIAL
        //*********************************** */
        if (Phaser.Input.Keyboard.JustDown (key_skipTutorial)) {
            if(!tutorialEnded)
            {
                //Pasa una linea en ambas partes del tutorial y actualiza la posicion de las mascaras
                currentLine ++;
                if(textMarte[currentLine] == '#' || textTierra[currentLine] == '#')
                {
                    tutoPosIndex++;//avanzamos en la siguiente posicion de marte
                    currentLine ++; //avanzamos en lineas de tutorial
                }
                
                tutotextMarte.destroy();
                tutotextTierra.destroy();
                tutotextMarte = this.add.text (50,game.config.height-200,textMarte[currentLine],{ fill: '#ffffff',fontFamily:'textFont',fontSize: '16px'}).setDepth(10);
                tutotextTierra = this.add.text (game.config.width/2,game.config.height-200,textTierra[currentLine],{ fill: '#ffffff',fontFamily:'textFont',fontSize: '16px'}).setDepth(10)
                
                //Aqui indicamos que tipo de máscara se va a usar y en que punto
                CrearMascara(this,
                    posicionesTutorial.marte[tutoPosIndex].x,
                    posicionesTutorial.marte[tutoPosIndex].y,
                    'c',

                    posicionesTutorial.tierra[tutoPosIndex].x,
                    posicionesTutorial.tierra[tutoPosIndex].y,
                    'c');
                // TWEENING de la máscara
                moverMascara(tutofondo.mask,this);
                if(textMarte[currentLine] == '$' || textTierra[currentLine] == '$')
                {
                    endTutorial(this,tutotextMarte,tutotextTierra,2000); //escena, texto 1, texto 2, t fade
                    tutorialEnded = true;
                }
            }
            
            
        }
        controlTierra.pantallaPlano.rotation+=delta/16000;
        //DEBUG PARTICULAS
        /*if (key_left.isDown) {
            //Apaga
            emitterStorm.on = false;
        }
        else if (key_right.isDown) {
            //Enciende
            emitterStorm.on = true;
        }*/

        //emitter.setPosition(Phaser.Math.Between(0, game.config.width), 0)
        //MARTE
        //Inputs
        //Movimiento de Marte

        if (key_left.isDown) {

            //Rotación de los elementos de Marte
            updateRotations(1, delta);
            //marte.rotation += 1*delta/1500*playerSpeed;
            //Cohete
            emitterMachines[0].posX = marte.x + 700 * Math.cos(-1.57 + marte.rotation);
            emitterMachines[0].posY = marte.y + 700 * Math.sin(-1.57 + marte.rotation);
            //Terraformador
            emitterMachines[1].posX = marte.x + 700 * Math.cos(3.14 + marte.rotation);
            emitterMachines[1].posY = marte.y + 700 * Math.sin(3.14 + marte.rotation);
            //Comunicaciones
            emitterMachines[2].posX = marte.x + 570 * Math.cos(marte.rotation);
            emitterMachines[2].posY = marte.y + 570 * Math.sin(marte.rotation);
            //Mina
            emitterMachines[3].posX = marte.x + 870 * Math.cos(1.57 + marte.rotation);
            emitterMachines[3].posY = marte.y + 870 * Math.sin(1.57 + marte.rotation);
            //emitterMachines[0].emitParticleAt(emitterMachines[0].posX, emitterMachines[0].posY);
        }
        else if (key_right.isDown) {
            
            //Rotación de los elementos de Marte
            updateRotations(-1, delta);
            //marte.rotation += -1*delta/1500*playerSpeed;
            //Cohete
            emitterMachines[0].posX = marte.x + 700 * Math.cos(-1.57 + marte.rotation);
            emitterMachines[0].posY = marte.y + 700 * Math.sin(-1.57 + marte.rotation);
            //Terraformador
            emitterMachines[1].posX = marte.x + 700 * Math.cos(3.14 + marte.rotation);
            emitterMachines[1].posY = marte.y + 700 * Math.sin(3.14 + marte.rotation);
            //Comunicaciones
            emitterMachines[2].posX = marte.x + 570 * Math.cos(marte.rotation);
            emitterMachines[2].posY = marte.y + 570 * Math.sin(marte.rotation);
            //Mina
            emitterMachines[3].posX = marte.x + 870 * Math.cos(1.57 + marte.rotation);
            emitterMachines[3].posY = marte.y + 870 * Math.sin(1.57 + marte.rotation);
            //emitterMachines[0].emitParticleAt(emitterMachines[0].posX, emitterMachines[0].posY);
        }
        else {

            player.anims.play('stelonauta_idle', true);
            
        }
        //if(maquina[i].isRota == true)
        /*  emitterMachines[0].emitParticleAt(emitterMachines[0].posX, emitterMachines[0].posY);
          emitterMachines[1].emitParticleAt(emitterMachines[1].posX, emitterMachines[1].posY);
          emitterMachines[2].emitParticleAt(emitterMachines[2].posX, emitterMachines[2].posY);
          emitterMachines[3].emitParticleAt(emitterMachines[3].posX, emitterMachines[3].posY);
        */
        //console.log("Pos X: " + emitterMachines[0].posX + "\nPos Y: " + emitterMachines[0].posY);
        

        if ((key_left.isDown || key_right.isDown) && !startSfxRun) {
            startSfxRun = true;
            sfx.sounds[3].play();
        }
        if (key_left.isUp && key_right.isUp) {
            startSfxRun = false;
            sfx.sounds[3].stop();
        }

        //Meteoritos
        for(var i=0; i < meteoritos.length; i++) {
 
            meteoritos[i].Update();
        }
        
        //////////////////////////////
        //Interaccionar con máquinas//
        //////////////////////////////
        //Mostrar tecla interacción
        /*if (!(maquinas[0].canInteract() || maquinas[1].canInteract() || maquinas[2].canInteract() || maquinas[3].canInteract()) && maquinas[0].isSending) {

            teclaAccion.setVisible(false);
        }*/

        //Acciones de cada máquina
        for(i = 0; i < 4; i++) {

            maquinas[i].update(delta);
            if(maquinas[i].isBroken == true)
                emitterMachines[i].emitParticleAt(emitterMachines[i].posX, emitterMachines[i].posY);
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
            DefeatCondition(this);


        //TIERRA
        controlTierra.Update(delta);

        if (key_left.isDown) {

            DefeatCondition(this);
        }
        if (key_right.isDown) {

            VictoryCondition(this);
        }
    }

    
}

function genMeteors() {

    //var delay = 0;
    for(var i=0; i < 3; i++) {
 
        meteoritos[i] = new Meteor(this);
    }
}
function updateRotations(sign, delta) {

    for(var i=0; i<N_NUBES; i++) {
        nubes[i].obj.rotation += sign*delta/1000*playerSpeed;
    }
    for(var i=0; i < meteoritos.length; i++) {
        meteoritos[i].obj.rotation += sign*delta/1500*playerSpeed;
    }
    
    marte.rotation+=sign*delta/1500*playerSpeed;
    objCohete.obj.rotation+=sign*delta/1500*playerSpeed;

    for (i=0; i<4; i++) {

        maquinas[i].obj.setRotation(maquinas[i].obj.rotation + sign*delta/1500*playerSpeed);
        //Update sonidos
        var beta = maquinas[i].obj.rotation < 0 ? maquinas[i].obj.rotation * -1: maquinas[i].obj.rotation ;
        if(beta < 0.8)
        {
            var volumen = (0.8 - beta)/0.8;
            if(volumen<0.02)
                volumen = 0;
            switch(i)
            {
                case 0: //Cohete

                    break;
                case 1: //Terraformador
                case 3: //Mina
                    sfx.sounds[2].volume = volumen;
                    break;
                case 2: //Comunicaciones
                    sfx.sounds[8].volume = volumen;
                    break;
            }
            
        }
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
function VictoryCondition(that){
    sfx.sounds.forEach(element => {
        element.stop();
    });

    sfx.sounds[4].play();

    soundtrack.pistas[1].stop();
    soundtrack.pistas[3].stop();
    
    that.scene.launch('SceneGameEnd');
    that.scene.pause('SceneGame');
    
}

function DefeatCondition(that){
    sfx.sounds.forEach(element => {
        element.stop();
    });

    sfx.sounds[5].play();

    soundtrack.pistas[1].stop();
    soundtrack.pistas[3].stop();

    that.scene.launch('SceneGameEnd');
    that.scene.pause('SceneGame');
}

function HighlightPostIt(obj, b) {

    b ? obj.tint = Phaser.Display.Color.GetColor(139, 139, 139) : obj.tint = Phaser.Display.Color.GetColor(255, 255, 255);  
    //if (!b) obj.add.image(game.config.width/2, game.config.height/2, "postIt");
}
function OpenPostIt(obj,scene) {

    switch(obj)
    {
        case postIt : 
        scene.tweens.add({
            targets: obj,
            scaleX: 10,
            scaleY: 10,
            duration: 50,
            ease: 'Expo.easeIn',
            onComplete: function ()
            {
                postIt.setVisible(false);
                postItExp.setVisible(true);
                postItExp.setScale(0.2);
                postItExp.setPosition(game.config.width/2, game.config.height/2);
            }
        });
        break;
        case postItExp : 
        scene.tweens.add({
            targets: obj,
            x:postIt.x,
            y:postIt.y,
            scaleX: 0,
            scaleY: 0,
            duration: 50,
            ease: 'Expo.easeIn',
            onComplete: function ()
            {
                postItExp.setVisible(false);
                postIt.setVisible(true);
            }
        });
        break;
    }
    if(isbig)
    {
        console.log('no soy grande');
        isbig = false;
        scene.tweens.add({
            targets: obj,
            scaleX: 0,
            scaleY: 0,
            duration: 50,
            ease: 'Expo.easeIn',
            onComplete: function ()
            {
                
            }
        });
    }
    else if (!isbig)
    {
        isbig = true;
        scene.tweens.add({
            targets: obj,
            scaleX: 1,
            scaleY: 1,
            duration: 50,
            ease: 'Expo.easeOut',
            onComplete: function ()
            {
                
            }
        });
    }
    
}

/*=============================== */
/*          TUTORIAL         */
/*=============================== */
function initTutorial(scene){
    //añadimos la pantalla negra
    tutoPosIndex = 0;
    tutofondo = scene.add.image(0,0,'tutoBck'); //añadimos capa grisalla
    tutofondo.setAlpha(0.8).setScale(2,2).setDepth(8);  //configuramos su visibilidad
    
    //Mostramos textos iniciales del tutorial
    tutotextMarte = scene.add.text (posicionesTutorial.marte[currentLine].x,posicionesTutorial.marte[currentLine].y,textMarte[currentLine],{ fill: '#ffffff',fontFamily:'textFont',fontSize: '16px'}).setDepth(10);
    tutotextTierra = scene.add.text (posicionesTutorial.tierra[currentLine].x,posicionesTutorial.tierra[currentLine].y,textTierra[currentLine],{ fill: '#ffffff',fontFamily:'textFont',fontSize: '16px'}).setDepth(10);

}
function endTutorial(scene,textM, textT,fadeOut)
{
    sfx.sounds.forEach(element => {
        element.stop();
    });
    

    textM.destroy();
    textT.destroy();
    tutofondo.clearMask();

    scene.tweens.add({
        targets: tutofondo,
        delay: 100,
        alpha:1,
        duration: fadeOut,
        ease: 'Expo.easeInOut',
        onComplete: scene.time.addEvent({ delay: fadeOut, callback: function(){scene.scene.start('SceneMenu'); soundtrack.pistas[2].stop();soundtrack.pistas[0].play();}, callbackScope: this})
    });
}
function CrearMascara(scene,posXM,posYM,tipoM, posXT,posYT,tipoT){

    maskMarte = scene.make.graphics();  //dibujamos un grafico compuesto de dos formas

    switch (tipoM){ //FORMA DE MARTE
        case 's':
            //Mascara cuadrada marte
            maskMarte.fillStyle(000000,1);  //color y alpha
            maskMarte.fillRect(posXM,posYM,100,100);  //x, y,width height
            break;
        case 'c':
            //Mascara circular marte
            maskMarte.fillStyle(000000,1);  //color y alpha
            maskMarte.fillCircle(posXM,posYM,100);  //x, y, radio
            break;
    }
    maskMarte.moveTo(posXT,posYT);  //NOS DESPLAZAMOS PARA DIBUJAR

    switch (tipoT)  //FORMA EN TIERRA
    {   
        case 's':
            //mascara cuadrada tierra
            maskMarte.fillStyle(000000,1);  //color y alpha
            maskMarte.fillRect(posXT,posYT,100,100);  //x, y,width height
            console.log('letsgo');
            break;
        case 'c':
            //mascara circular  tierra
            maskMarte.fillStyle(000000,1);  //color y alpha
            maskMarte.fillCircle(posXT,posYT,100);  //x, y, radio
            break;
    }
    
    //Aplicamos sobre el fondo tutorfondo la mascara creada
    tutofondo.mask = new Phaser.Display.Masks.GeometryMask(scene, maskMarte);   //enmascaramos
    tutofondo.mask.setInvertAlpha (true);   //invertimos alpha para mostrar todo menos area indicada

}

function moverMascara(mask,scene) //x fposX, y = fposYcmask o smask
{
    scene.tweens.add({
        targets: mask,
        scaleX: 1.2,
        scaleY: 1.2,
        delay: 100,
        duration: 1000,
        ease: 'Expo.easeInOut',
        repeat: -1,
        yoyo: true,
        //delay:delay,
        //onComplete: this.EnterOnMachine.bind(this)
    });
}



 
        
