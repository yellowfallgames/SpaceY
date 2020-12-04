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
        this.paqPasarela = scene.add.image(1056, 584, "paqueteriaPasarela");
    
        this.cargaPayloads = new Array(maxSize);
        this.payloadsPosX = 957;
        this.payloadsPosY = 599;
        this.maxSize = maxSize;
        this.size = 0;

        this.rocket = scene.add.image(957, -200, "rocket").setScale(1);
        this.rocketY = 455;

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
        this.ddrBtnComida = scene.add.image(1078, 836, "ddrBotonComida")
        .setInteractive()
        .on('pointerdown', () => this.StartTransform(this.ddrBtnComida) )
        .on('pointerup', () => this.Highlight(this.ddrBtnComida, true) )
        .on('pointerover', () => this.Highlight(this.ddrBtnComida, true) )
        .on('pointerout', () => this.Highlight(this.ddrBtnComida, false) );
        this.ddrBtnComida.depth = 2;

        this.ddrBtnMat = scene.add.image(1117, 836, "ddrBotonMat")
        .setInteractive()
        .on('pointerdown', () => this.StartTransform(this.ddrBtnMat) )
        .on('pointerup', () => this.Highlight(this.ddrBtnMat, true) )
        .on('pointerover', () => this.Highlight(this.ddrBtnMat, true) )
        .on('pointerout', () => this.Highlight(this.ddrBtnMat, false) );
        this.ddrBtnMat.depth = 2;

        
        //Botones para añadir elementos al envío
        this.paqBtnComida = scene.add.image(1167, 581, "paqueteriaBotonComida")
        .setInteractive()
        .on('pointerdown', () => this.tweenTube1On())//this.PutOn(this.paqBtnComida) )
        .on('pointerup', () => this.Highlight(this.paqBtnComida, true) )
        .on('pointerover', () => this.Highlight(this.paqBtnComida, true) )
        .on('pointerout', () => this.Highlight(this.paqBtnComida, false) );

        this.paqBtnMat = scene.add.image(1220, 581, "paqueteriaBotonMat")
        .setInteractive()
        .on('pointerdown', () => this.PutOn(this.paqBtnMat) )
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
        this.counterCom = 0;
        this.counterMat = 0;

        this.txtCounterRoc = scene.add.text(this.paqBtnComida.x+105, this.paqBtnComida.y-57, this.counterRoc,{
            fontSize:'35px',
            fill:'#ffffff',
        }).setOrigin(0.5);

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


    }

    //Descargar el cohete de rocas
    Unload() {

        var timeDelay = 0;
        for (var i=0; i < this.maxSize; i++) {

            this.cargaPayloads[i].UnloadFromRocket(timeDelay);
            timeDelay+= 100;
        }
    }

    PushFromMars() {

        for (var i=0; i < this.maxSize; i++) {

            this.cargaPayloads[i] = new Payload(this.scene, this.payloadsPosX, this.payloadsPosY - (i*35), 0);
        }
    }

    Update() {

        if (objCohete.goLand)
            controlTierra.Land();
    }

    Highlight(obj, b) {

        b ? obj.tint = Phaser.Display.Color.GetColor(139, 139, 139) : obj.tint = Phaser.Display.Color.GetColor(255, 255, 255);  
    }

    StartTransform(obj) {

        if (this.counterRoc > 0) {

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

            var that;
            if (that === undefined)
                this.scene.input.keyboard.createCombo(this.combokeys,{resetOnWrongKey: false});

            that = this;
            this.scene.input.keyboard.on('keycombomatch', function (event) {
                
                for (var i=0; i<3; i++) {
                    that.combokeys[i] = 0;
                    that.ddrFlechas[i].setVisible(false);
                    that.ddrFlechas[i].setRotation(0);
                }
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

    PutOn(obj) {

        obj.tint = Phaser.Display.Color.GetColor(255, 255, 255)

        if(obj === this.paqBtnComida) {

            this.counterCom = Math.max(0, this.counterCom-1);
            this.txtCounterCom.setText(this.counterCom);
            
        }
        else if(obj === this.paqBtnMat){

            this.counterMat = Math.max(0, this.counterMat-1);
            this.txtCounterMat.setText(this.counterMat);
        }
    }

    Send(obj) {

        obj.tint = Phaser.Display.Color.GetColor(255, 255, 255)
    }

    //Tweenings
    //Compuerta lanzadera entrada rocas
    tweenLanzPuertaIn() {

        if (this.cargaPayloads[0].obj.visible === true) {

            this.countLanz = 0;
            this.scene.tweens.add({
                targets: this.unloadRocketBtn,
                //x: this.unloadRocketBtn.x-220,
                rotation: -1.7,
                //scaleX: 0.1,
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

        this.scene.tweens.add({
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

}

