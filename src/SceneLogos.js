var logo1, logo2;
var timer; 
var value;
var musica = undefined;
var sfx = undefined;

class SceneLogos extends Phaser.Scene {

    constructor() {

        super("SceneLogos");
    }

    preload(){
        //SceneLogos//
        this.load.image("logo1", directory+"Concept_space_y_3.png");
        this.load.image("logo2", directory+"logo.png");

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
        //Fanfare
        this.load.audio('SfxWin', ['./Resources/Audio/SFX/Fanfare/win.ogg']);
        this.load.audio('SfxLose', ['./Resources/Audio/SFX/Fanfare/lose.ogg']);
    }

    create() {
        musica = this.sound.add('MusicMenu');
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
                        this.sound.add('SfxLanding')
                    ]
        };

        sfx.sounds.forEach(element => {
            element.volume = sfx.volume;
        });

        sfx.sounds[2].loop = sfx.loop;
        sfx.sounds[3].loop = sfx.loop;

        logo1 = this.add.image(game.config.width/2, game.config.height/2, "logo1");
        logo2 = this.add.image(game.config.width/2, 2*game.config.height/6, "logo2");

        timer = this.time.delayedCall(5000, startScene, [this]);
    }

    
    update(delta) {

        value = Phaser.Math.Clamp(Phaser.Math.Easing.Cubic.Out(timer.getOverallProgress()*2), 0, 1);
        logo2.setScale(value);
    }
}

function startScene(that){
    
    that.scene.start('SceneMenu');
}