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
        // ui_T_DDR
        this.ddrBase = scene.add.image(1055, 793, "ddrBase");
        // ui_T_countdown
		this.lanzCtdn = scene.add.image(956, 210, "lanzaderaCountdown");////
		// ui_T_Lanzadera_door
        this.lanzPuerta = scene.add.image(958, 83, "lanzaderaPuerta");
        // ui_T_pantalla_plano
        this.pantallaPlano = scene.add.image(1337, 227, "pantallaMapa");
        // ui_T_DDR_arrow
		this.ddrFlecha_0 = scene.add.image(1076, 776, "ddrFlecha_0");////
		// ui_T_DDR_arrow_1
		this.ddrFlecha_1 = scene.add.image(1114, 776, "ddrFlecha_1");////
		// ui_T_DDR_arrow_2
        this.ddrFlecha_2 = scene.add.image(1153, 776, "ddrFlecha_2");////
        // ui_T_Paqueteria_pasarela
        this.paqPasarela = scene.add.image(1056, 584, "paqueteriaPasarela");
    
        this.cargaPayloads = new Array(maxSize);
        this.payloadsPosX = 957;
        this.payloadsPosY = 599;
        this.maxSize = maxSize;
        this.size = 0;

        this.rocket = scene.add.image(957, -200, "rocket");
        this.rocketY = 455;

        //Botones para transformar
        this.ddrBtnComida = scene.add.image(1075, 836, "ddrBotonComida")
        .setInteractive()
        .on('pointerdown', () => this.Transform(this.ddrBtnComida) )
        .on('pointerup', () => this.Highlight(this.ddrBtnComida, true) )
        .on('pointerover', () => this.Highlight(this.ddrBtnComida, true) )
        .on('pointerout', () => this.Highlight(this.ddrBtnComida, false) );

        this.ddrBtnMat = scene.add.image(1114, 836, "ddrBotonMat")
        .setInteractive()
        .on('pointerdown', () => this.Transform(this.ddrBtnMat) )
        .on('pointerup', () => this.Highlight(this.ddrBtnMat, true) )
        .on('pointerover', () => this.Highlight(this.ddrBtnMat, true) )
        .on('pointerout', () => this.Highlight(this.ddrBtnMat, false) );

        
        //Botones para añadir elementos al envío
        this.paqBtnComida = scene.add.image(1167, 581, "paqueteriaBotonComida")
        .setInteractive()
        .on('pointerdown', () => this.PutOn(this.paqBtnComida) )
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
        this.counterCom = 10;
        this.counterMat = 10;

        this.txtCounterCom = scene.add.text(this.paqBtnComida.x, this.paqBtnComida.y-57, this.counterCom,{
            fontSize:'35px',
            fill:'#ffffff',
        }).setOrigin(0.5);
        this.txtCounterMat = scene.add.text(this.paqBtnMat.x, this.paqBtnMat.y-57, this.counterMat,{
            fontSize:'35px',
            fill:'#ffffff',
        }).setOrigin(0.5);
        

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

    Transform (obj) {

        obj.tint = Phaser.Display.Color.GetColor(255, 255, 255)

        if(obj === this.ddrBtnComida) {

            this.counterCom++;
            this.txtCounterCom.setText(this.counterCom);

            //toDestroy = this.cargaPayloads[0];
            this.cargaPayloads[0].obj.destroy();
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

}

