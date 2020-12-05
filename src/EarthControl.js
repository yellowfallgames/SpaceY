class EarthControl {//extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, maxSize) {

        this.scene = scene;

        //Elementos escenario
        // ui_T_bck
        this.fondoTierra = scene.add.image(1202, 450, "fondoTierra");
		// ui_T_pantalla
		this.pantalla = scene.add.image(1337, 250, "pantalla");
		// ui_T_Lanzadera
        this.lanzadera = scene.add.image(963, 365, "lanzadera");
        // ui_T_control_pannel
		this.controlBase = scene.add.image(1447, 676, "controlBase");
		// ui_T_control_COM
		this.controlCom = scene.add.image(1388, 549, "controlCom");		
		// ui_T_control_MINA
		this.controlMina = scene.add.image(1506, 549, "controlMina");		
		// ui_T_control_ROCKET
		this.controlRocket = scene.add.image(1388, 666, "controlRocket");		
		// ui_T_control_TERR
		this.controlTerr = scene.add.image(1506, 666, "controlTerr");		
		// ui_T_control_key
		this.controlKey = scene.add.image(1447, 760, "controlKey");		
		// ui_T_control_pass
        this.controlPass = scene.add.image(1447, 829, "controlPass");
        // ui_T_Paqueteria_contadores
        this.paqBase = scene.add.image(1219, 674, "paqueteriaBase");
        // ui_T_Paqueteria_contadores_tubo
        this.paqBaseTubo = scene.add.image(1239, 775, "paqueteriaBaseTubo");//Tubo 2
        // ui_T_DDR2
        this.ddrBaseTubo = scene.add.image(980, 793, "ddrBaseTubo");/////tubo 1
        this.ddrBaseTubo.depth = 1;
        // ui_T_DDR1
        this.ddrBase = scene.add.image(1058, 793, "ddrBase");
        this.ddrBase.depth = 1;
        // ui_T_countdown
		this.lanzCtdn = scene.add.image(956, 210, "lanzaderaCountdown");////
		// ui_T_Lanzadera_door
        this.lanzPuertaOut = scene.add.image(958, 83, "lanzaderaPuerta");
        // ui_T_pantalla_plano
        this.pantallaPlano = scene.add.image(1337, 227, "pantallaMapa");
        // ui_T_Paqueteria_pasarela
        this.paqPasarela = scene.add.image(1056, 590, "paqueteriaPasarela");////Tubo3
    
        this.cargaPayloads = new Array();// = new Array(maxSize);
        this.payloadsPosX = 957;
        this.payloadsPosY = 599;
        this.maxSize = maxSize;
        this.size = 0;

        this.rocket = scene.add.image(957, -600, "rocket").setScale(1);
        this.rocketY = 455;
        this.goTakeOff = false;
        this.typeOfLoad = 0; //0->Roca, 1->Comida/material

        //Botón para descargar rocas
        this.countLanz = 0;
        this.unloadRocketBtn = scene.add.image(870, 665, "lanzaderaPuerta")
        .setInteractive()
        .on('pointerdown', () =>  this.tweenLanzPuertaIn())//this.Unload(this.unloadRocketBtn)
        .on('pointerup', () => this.Highlight(this.unloadRocketBtn, true) )
        .on('pointerover', () => this.Highlight(this.unloadRocketBtn, true) )
        .on('pointerout', () => this.Highlight(this.unloadRocketBtn, false) );
        this.unloadRocketBtn.setOrigin(0.1, 0.5);
        this.unloadRocketBtn.depth = 1;

        //Botones para transformar
        this.nObj = 0;
        this.ddrBtnComida = scene.add.image(1078, 836, "ddrBotonComida")
        .setInteractive()
        .on('pointerdown', () => this.StartTransform(0) )
        .on('pointerup', () => this.Highlight(this.ddrBtnComida, true) )
        .on('pointerover', () => this.Highlight(this.ddrBtnComida, true) )
        .on('pointerout', () => this.Highlight(this.ddrBtnComida, false) );
        this.ddrBtnComida.depth = 2;

        this.ddrBtnMat = scene.add.image(1117, 836, "ddrBotonMat")
        .setInteractive()
        .on('pointerdown', () => this.StartTransform(1) )
        .on('pointerup', () => this.Highlight(this.ddrBtnMat, true) )
        .on('pointerover', () => this.Highlight(this.ddrBtnMat, true) )
        .on('pointerout', () => this.Highlight(this.ddrBtnMat, false) );
        this.ddrBtnMat.depth = 2;

        
        //Botones para añadir elementos al envío
        this.paqBtnComida = scene.add.image(1167, 581, "paqueteriaBotonComida")
        .setInteractive()
        .on('pointerdown', () => this.PutOn(1, this.paqBtnComida))
        .on('pointerup', () => this.Highlight(this.paqBtnComida, true) )
        .on('pointerover', () => this.Highlight(this.paqBtnComida, true) )
        .on('pointerout', () => this.Highlight(this.paqBtnComida, false) );

        this.paqBtnMat = scene.add.image(1220, 581, "paqueteriaBotonMat")
        .setInteractive()
        .on('pointerdown', () => this.PutOn(2, this.paqBtnMat))
        .on('pointerup', () => this.Highlight(this.paqBtnMat, true) )
        .on('pointerover', () => this.Highlight(this.paqBtnMat, true) )
        .on('pointerout', () => this.Highlight(this.paqBtnMat, false) );

        //Botón para enviar
        this.paqBtnEnv = scene.add.image(1220, 645, "paqueteriaBotonEnviar")
        .setInteractive()
        .on('pointerdown', () => this.Send(this.paqBtnEnv) )
        .on('pointerup', () => this.Highlight(this.paqBtnEnv, true) )
        .on('pointerover', () => this.Highlight(this.paqBtnEnv, true) )
        .on('pointerout', () => this.Highlight(this.paqBtnEnv, false) );

        //Contadores de recursos
        this.counterRoc = 0;
        this.counterCom = 8;
        this.counterMat = 0;

        this.txtCounterRoc = scene.add.text(this.ddrBtnComida.x+78, this.ddrBtnComida.y+1, this.counterRoc,{
            fontSize:'35px',
            fill:'#ffffff',
        }).setOrigin(0.5);
        this.txtCounterRoc.depth = 1;

        this.txtCounterCom = scene.add.text(this.paqBtnComida.x, this.paqBtnComida.y-57, this.counterCom,{
            fontSize:'35px',
            fill:'#ffffff',
        }).setOrigin(0.5);
        this.txtCounterMat = scene.add.text(this.paqBtnMat.x, this.paqBtnMat.y-57, this.counterMat,{
            fontSize:'35px',
            fill:'#ffffff',
        }).setOrigin(0.5);

        //Flechas pantalla trasnformaciones
        this.ddrFlechas = new Array(3);
        // ui_T_DDR_arrow
        this.ddrFlechas[0] = scene.add.image(1076, 776, "ddrFlecha_0").setVisible(false);
        this.ddrFlechas[0].depth = 1;
		// ui_T_DDR_arrow_1
        this.ddrFlechas[1] = scene.add.image(1114, 776, "ddrFlecha_0").setVisible(false);
        this.ddrFlechas[1].depth = 1;
		// ui_T_DDR_arrow_2
        this.ddrFlechas[2] = scene.add.image(1153, 776, "ddrFlecha_0").setVisible(false);
        this.ddrFlechas[2].depth = 1;

        //Combos
        this.combokeys = new Array(3);
        this.that;

        //Misc
        this.zPayL;
        this.wait = false;
        this.newPayloadType = 0;
    }

    Land() {

        this.rocket.y += 7;
        if (this.rocket.y >= this.rocketY) {

            this.rocket.y = this.rocketY;
            this.PushFromMars();
            objCohete.goLand = false;
        }
    }

    TakeOff() {

        this.rocket.y -= 3;
        if (this.rocket.y <= -600) {

            this.rocket.y = -600;
            this.goTakeOff = false;
            estacionTransporte.isComing = true;
            estacionTransporte.loadOfEarth = true;
        }
    }

    //Descargar el cohete de rocas
    Unload() {

        var timeDelay = 0;
        for (var i=0; i < this.maxSize; i++) {

            this.cargaPayloads[i].UnloadFromRocket(timeDelay);
            timeDelay+= 100;
        }
        this.cargaPayloads.splice(i, this.size);
        this.typeOfLoad = 1;
        this.size = 0;
    }

    PushFromMars() {

        for (var i=0; i < this.maxSize; i++) {

            this.cargaPayloads[i] = new Payload(this.scene, this.payloadsPosX, this.payloadsPosY - (i*35), 0);
        }
        this.typeOfLoad = 0;
        this.size = this.maxSize;
    }

    Update() {

        if (objCohete.goLand)
            controlTierra.Land();
        
        if (this.goTakeOff)
            controlTierra.TakeOff();
    }

    Highlight(obj, b) {

        b ? obj.tint = Phaser.Display.Color.GetColor(139, 139, 139) : obj.tint = Phaser.Display.Color.GetColor(255, 255, 255);  
    }

    StartTransform(n) {

        if (this.counterRoc > 0) {

            if(n === 0) {

                this.nObj = 0;
            }
            else {

                this.nObj = 1;
            }
            

            this.counterRoc--;
            this.txtCounterRoc.setText(this.counterRoc);

            var nrand;
            for (var i=0; i<3; i++) {

                nrand = Phaser.Math.Between(0,3);
                this.ddrFlechas[i].setVisible(true);

                switch(nrand) {

                    //UP
                    case 0:
                        this.ddrFlechas[i].setRotation(Math.PI);
                        this.combokeys[i] = 38;
                    break;
                    //RIGHT
                    case 1:
                        this.ddrFlechas[i].setRotation(-Math.PI/2);
                        this.combokeys[i] = 39;
                    break;
                    //DOWN
                    case 2:
                        this.ddrFlechas[i].setRotation(0);
                        this.combokeys[i] = 40;
                    break;
                    //LEFT
                    case 3:
                        this.ddrFlechas[i].setRotation(Math.PI/2);
                        this.combokeys[i] = 37;
                    break;
                    
                }
                
            }

            var combo = this.scene.input.keyboard.createCombo(this.combokeys,{resetOnWrongKey: false, deleteOnMatch: true});

            var that = this;
            var z = 0;
            this.scene.input.keyboard.on('keycombomatch', function () {
                
                for (var i=0; i<3; i++) {
                    that.combokeys[i] = 0;
                    that.ddrFlechas[i].setVisible(false);
                    that.ddrFlechas[i].setRotation(0);
                }

                if (z == 0)
                    that.tweenTube2On(this.nObj);
                z++;
            });
        }
        
    }

    Transform (obj) {

        obj.tint = Phaser.Display.Color.GetColor(255, 255, 255)

        if(obj === this.ddrBtnComida) {

            this.counterCom++;
            this.txtCounterCom.setText(this.counterCom);

            //toDestroy = this.cargaPayloads[0];
            //this.cargaPayloads[0].obj.destroy();
        }
        else if(obj === this.ddrBtnMat){

            this.counterMat++;
            this.txtCounterMat.setText(this.counterMat);
        }
    }

    PutOn(n, obj) {

        if (n === 1) {

            var counter = this.counterCom;
        }
        else {

            var counter = this.counterMat;
        }

        if (!this.wait && this.size < this.maxSize && this.typeOfLoad === 1 && counter > 0) {

            obj.tint = Phaser.Display.Color.GetColor(255, 255, 255)
            this.newPayloadType = n;
            if (this.newPayloadType === 1) {

                objCohete.comLoad += MAX_COMIDA*0.05;
            }
            else{

                objCohete.matLoad += MAX_MATERIAL*0.05;
            }

            this.wait = true;
            this.tweenTube3On();
        }
        
    }

    //Añade un payload de comida o material al cohete
    AddToRocket() {

        this.zPayL = 0;
        if (this.size > 0) {

            for (var i = 0; i < this.size; i++) {
                
                this.cargaPayloads[i].MoveUp();
            }
        }
        else {

            this.CreateNewPayload();
        }
        
        
    }

    //
    CreateNewPayload() {
        if (this.zPayL === 0){
            var newPayload = new Payload(this.scene, this.payloadsPosX, this.payloadsPosY, this.newPayloadType);
            this.cargaPayloads.unshift(newPayload);
            this.size++;

            this.zPayL++;
            this.wait = false;
        }
        
    }

    Send(obj) {

        if (this.size === this.maxSize && this.typeOfLoad === 1 && !this.goTakeOff) {

            obj.tint = Phaser.Display.Color.GetColor(255, 255, 255)

            var delay = 0;
            for (var i = 0; i < this.size; i++) {

                this.cargaPayloads[i].Dissapear(delay, i, this.maxSize);
                delay += 100;
            }
            this.cargaPayloads.splice(i, this.size);
            this.size = 0;
            this.typeOfLoad = -1;

            this.tweenLanzPuertaExtIn()
        }
        
    }

    //Tweenings
    //Compuerta lanzadera salida exterior
    tweenLanzPuertaExtIn() {

        this.countLanz = 0;
        this.scene.tweens.add({
            targets: this.lanzPuertaOut,
            x: this.lanzPuertaOut.x+220,
            duration: 500,
            ease: 'Cubic.easeOut',
            repeat: 0,
            yoyo: false,

            onComplete: this.tweenLanzPuertaExtOut.bind(this)
        });
        
    }

    tweenLanzPuertaExtOut() {
        
        this.scene.tweens.add({
            targets: this.lanzPuertaOut,
            x: this.lanzPuertaOut.x-220,
            duration: 500,
            ease: 'Cubic.easeOut',
            repeat: 0,
            delay: 3500,
            yoyo: false,
        });  
    }

    //Compuerta lanzadera entrada rocas
    tweenLanzPuertaIn() {

        if (this.size === this.maxSize && this.typeOfLoad === 0) {

            this.countLanz = 0;
            this.scene.tweens.add({
                targets: this.unloadRocketBtn,
                rotation: -1.7,
                duration: 500,
                ease: 'Cubic.easeOut',
                repeat: 0,
                yoyo: false,

                onCompleteDelay: 150,
                onComplete: this.Unload.bind(this)
            });
        }
    }

    tweenLanzPuertaOut() {
        
        if (this.countLanz === 0) {

            this.scene.tweens.add({
                targets: this.unloadRocketBtn,
                //x: this.unloadRocketBtn.x+220,
                rotation: 0,
                //scaleX: 1,
                duration: 500,
                ease: 'Cubic.easeOut',
                repeat: 0,
                yoyo: false,
            });

            this.countLanz ++;
        }
            
    }

    //Tubería de rocas
    tweenTube1On() {

        this.counterRoc++;
        this.txtCounterRoc.setText(this.counterRoc);

        this.tweenT3 = this.scene.tweens.add({
            targets: this.ddrBaseTubo,
            scale: 1.3,
            duration: 100,
            ease: 'Elastic.easeOut',
            repeat: 0,
            yoyo: false,

            onComplete: this.tweenTube1Off.bind(this)
        });

        
    }

    tweenTube1Off() {
        this.scene.tweens.add({
            targets: this.ddrBaseTubo,
            scale: 1,
            duration: 1000,
            ease: 'Elastic.easeOut',
            repeat: 0,
            yoyo: false,

            onComplete: this.tweenLanzPuertaOut.bind(this)
        });
    }

    //Tuberia transformar rocas en mat/com
    tweenTube2On() {

        this.scene.tweens.add({
            targets: this.paqBaseTubo,
            scale: 1.3,
            duration: 300,
            ease: 'Expo.easeIn',
            repeat: 0,
            yoyo: false,

            onComplete: this.tweenTube2Off.bind(this),
        });

        
    }

    tweenTube2Off(n) {

        if (this.nObj === 0) {
            this.counterCom++;
            this.txtCounterCom.setText(this.counterCom);
        }
        else {
            this.counterMat++;
            this.txtCounterMat.setText(this.counterMat);
        }

        this.scene.tweens.add({
            targets: this.paqBaseTubo,
            scale: 1,
            duration: 1000,
            ease: 'Expo.easeOut',
            repeat: 0,
            yoyo: false,

            //onComplete: this.tweenLanzPuertaOut.bind(this)
        });
    }

    //Tubo pasarela
    tweenTube3On() {
        
        if (this.newPayloadType === 1) {

            this.counterCom--;
            this.txtCounterCom.setText(this.counterCom);
        }
        else {

            this.counterMat--;
            this.txtCounterMat.setText(this.counterMat);
        }
        

        this.scene.tweens.add({
            targets: this.paqPasarela,
            scale: 1.4,
            duration: 100,
            ease: 'Expo.easeIn',
            repeat: 0,
            yoyo: true,

            onComplete: this.tweenTube3Off.bind(this),
        });

        
    }

    tweenTube3Off() {
        console.log()
        this.AddToRocket();

        this.scene.tweens.add({
            targets: this.paqPasarela,
            scale: 1,
            duration: 600,
            ease: 'Expo.easeOut',
            repeat: 0,
            yoyo: false,

            //onComplete: this.tweenLanzPuertaOut.bind(this)
        });
    }
}

