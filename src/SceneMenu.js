var isTutorial = false;
//is out
var chatBoxActive = false;
var loginOut = false;
var lobbyActive = false;
var registerOut = false;
var chatBoxOut = false;
//check active
var registerOn = false, loginOn = false;
var userName = "Anon";

var lineasChat = 0;

//posiciones
var chatPos;
var chatTween;
var regisPos;
var regisTween;
var loginPos;
var loginTween;

class SceneMenu extends Phaser.Scene {

    constructor() {

        super("SceneMenu");
    }

    preload() {
        
        //this.load.image("player", directory+"vulp_i1.png");
        //this.load.spritesheet("button", "./Resources/Img/button.png", 185, 80);
        //this.load.image('background',"./Resources/Img/starfield.jpg");

    //CHAT POSTITIONS BEFORE - AFTER
    var chtOffset = 1000;
   
    chatTween = [
        game.config.width - 625, game.config.height-200,    //icono
        game.config.width -300, game.config.height-380, //base
        game.config.width -300, game.config.height-380, //frame
        game.config.width -315, game.config.height-110, //write msg
        game.config.width -55, game.config.height-110,  //send
        game.config.width - 625, game.config.height-400,    //global
       
    ];
    chatPos = [
        game.config.width-100,  chatTween[1],    //icono
        chatTween[2]+chtOffset,  chatTween[3], //base
        chatTween[4]+chtOffset,  chatTween[5], //frame
        chatTween[6]+chtOffset,  chatTween[7], //write msg
        chatTween[8]+chtOffset,  chatTween[9],  //send
        game.config.width-100,  chatTween[11]  //global
    ];
    

     //LOGIN POSTITIONS BEFORE - AFTER
     var loginOffset = 4000
    
    loginTween = [
        660,70,    //login option
        320,80,    //box
        540,80,     //login dfault profile picture
        110,110,     //login bttn
        540,80,     //login profilepic
        340,110,     //regiter button
        110,115,     //field name
        365,115,     //field password
        110,100,     //Texto Login
        340,100,     //Texto Registro
        540,115,     //login confirm
        540,115     //login confirm text
    ];
    loginPos = [
        70,70,    //login option, 
        loginTween[2]-loginOffset, loginTween[3], //box
        loginTween[4]-loginOffset, loginTween[5], //login dfault profile picture
        loginTween[6]-loginOffset, loginTween[7], //login btn
        loginTween[8]-loginOffset, loginTween[9], //login profilepic
        loginTween[10]-loginOffset, loginTween[11], //regitro boton
        loginTween[12]-loginOffset, loginTween[13], //field name
        loginTween[14]-loginOffset, loginTween[15], //field pass
        loginTween[16]-loginOffset, loginTween[17], //Texto Login
        loginTween[18]-loginOffset, loginTween[19], //Texto Registro
        loginTween[20]-loginOffset, loginTween[21], //Texto confirm
        loginTween[21]-loginOffset, loginTween[22], //Texto acerptar login
        
        
    ];


    //REGISTER POSTITIONS BEFORE - AFTER
    var registerOffset = chtOffset;
   
     regisTween = [
        game.config.width/4,310,    //regisbox
        game.config.width/4+170,400, //btn nfirm
        game.config.width/4+240,340, //dech
        game.config.width/4+100,340, //izq
        110,200, //cerrar 
    ];
    regisPos = [
        regisTween[0]-registerOffset, regisTween[1],   //regisbox
       regisTween[2]-registerOffset, regisTween[3], //boton regustrarse
       regisTween[4]-registerOffset, regisTween[5], //dch
       regisTween[6]-registerOffset, regisTween[7], //izq
       regisTween[8]-registerOffset, regisTween[9], //cerrar
    ];
    
    }

create() {
    soundtrack.pistas[1].stop();
    soundtrack.pistas[3].stop();
    
    //FONDOS
    this.bckMenu = this.add.image(game.config.width/2,game.config.height/2,'bckMenu').setScale(0.3);

    var that = this;
    this.spaceYlogo = this.add.image(300,game.config.height-300,'spaceYlogo').setScale(0.2);
    this.tweens.add({
        targets: this.spaceYlogo,
        duration: 1500,
        y: this.spaceYlogo.y-25,
        ease: 'linear',
        yoyo: true,
        repeat: -1,
    });

    //ASIGNACION DE METODO
    this.playButton = this.add.text((game.config.width/8)*3, -1000, 'Play', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px'})
    .setInteractive()
    .on('pointerdown', () => this.startGame() )
    .on('pointerover', () => this.enterIconHoverState(this.playButton) )
    .on('pointerout', () => this.enterIconRestState(this.playButton) );
    this.playButton.setOrigin(0.5);
    this.easeMe(this.playButton, this, 1);

    this.tutorialButton = this.add.text((game.config.width/2)*4, -1000, 'Tutorial', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px'})
    .setInteractive()
    .on('pointerdown', () => this.enterTutorial() )
    .on('pointerover', () => this.enterIconHoverState(this.tutorialButton) )
    .on('pointerout', () => this.enterIconRestState(this.tutorialButton) );
    this.tutorialButton.setOrigin(0.5);
    this.easeMe(this.tutorialButton, this, 2);


    this.optionsButton = this.add.text(-1000, (game.config.height/8)*5, 'Options', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px' })
    .setInteractive()
    .on('pointerdown', () => this.enterOptions() )
    .on('pointerover', () => this.enterIconHoverState(this.optionsButton) )
    .on('pointerout', () => this.enterIconRestState(this.optionsButton) );
    this.optionsButton.setOrigin(0.5);
    this.easeMe(this.optionsButton, this, 3);
    

    this.contactButton = this.add.text(game.config.width + 1000, (game.config.height/8)*6, 'Contact', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px' })
    .setInteractive()
    .on('pointerdown', () => this.enterContact() )
    .on('pointerover', () => this.enterIconHoverState(this.contactButton) )
    .on('pointerout', () => this.enterIconRestState(this.contactButton) );
    this.contactButton.setOrigin(0.5);
    this.easeMe(this.contactButton, this, 4);


    //API REST
    this.apiButton = this.add.text((game.config.width/2), (game.config.height/8)*7, 'API REST', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px'})
    .setInteractive()
    .on('pointerdown', () => this.enterAPIREST() )
    .on('pointerover', () => this.enterIconHoverState(this.apiButton) )
    .on('pointerout', () => this.enterIconRestState(this.apiButton) );
    this.apiButton.setOrigin(0.5);



    var graphics = this.make.graphics();
    graphics.fillRect(game.config.width/6*4+10, game.config.height/5+1, game.config.width/6*4+300, game.config.height/5*3+5);
    var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

    //LOBBY
    this.lobbyContent = ["Connected User: "];
    //loadLobby(this);

    this.lobbyText = this.add.text(game.config.width/6*4+10, game.config.height/5+10, this.lobbyContent, { fontSize:"25px", fontFamily: 'menuFont', color: 'white', wordWrap: { width: 450 } }).setOrigin(0);
    this.lobbyText.setMask(mask).setVisible(false).setDepth(1000);

    //global icon
    this.globalbutton = this.add.image(chatPos[10], chatPos[11],'ChatBox_GlobalIcon') //CAMBIAR POR ChatBox_NewMsgIcon cuando haya nuevo mensaje
    .setScale(0.6);
    this.globalbutton.setInteractive()
    .on('pointerdown', () => this.MovinBoxes(this,0))
    .on('pointerover', () => this.enterIconHoverState(this.globalbutton))
    .on('pointerout', () => this.enterIconRestState(this.globalbutton))
    this.globalbutton.setOrigin(0.5);


    //CHATBOX
    //Chatbox icon
    this.chatbutton = this.add.image(chatPos[0], chatPos[1],'ChatBox_ChatIcon') //CAMBIAR POR ChatBox_NewMsgIcon cuando haya nuevo mensaje
    .setScale(0.6);
    this.chatbutton.setInteractive()
    .on('pointerdown', () => this.MovinBoxes(this ,1))
    .on('pointerover', () => this.enterIconHoverState(this.chatbutton))
    .on('pointerout', () => this.enterIconRestState(this.chatbutton))
    this.chatbutton.setOrigin(0.5);

    //chatbox base
    this.chatBase = this.add.image(chatPos[2], chatPos[3],'ChatBox_Base')
    .setScale(0.8);
    this.chatBase.setOrigin(0.5);

    //chatbox frame
    this.chatFrame= this.add.image(chatPos[4], chatPos[5],'ChatBox_Frame')
    .setScale(0.8);
    this.chatFrame.setOrigin(0.5);

    //chatbox write msg
    this.chatWritter = this.add.image(chatPos[6], chatPos[7],'ChatBox_MsgBox')
    .setScale(0.37);
    this.chatWritter.setOrigin(0.5);

    //chatbox send
    this.sendButton = this.add.image(chatPos[8], chatPos[9],'ChatBox_SendBtn')
    .setScale(0.4);
    this.sendButton.setInteractive()
    .on('pointerdown', () => RestCreateMsg(this, userName))
    .on('pointerover', () => this.enterIconHoverState(this.sendButton) )
    .on('pointerout', () => this.enterIconRestState(this.sendButton))
    this.sendButton.setOrigin(0.5);
    this.chatboxStuff = [this.chatbutton, this.chatBase, this.chatFrame, this.chatWritter,this.sendButton, this.globalbutton];

    //Chatbox code
    this.chatContent = [];
    loadMsgs(this);

    this.chatText = this.add.text(game.config.width/6*4+10, game.config.height/5+10, this.chatContent, { fontSize:"25px", fontFamily: 'menuFont', color: 'white', wordWrap: { width: 450 } }).setOrigin(0);

    this.chatText.setMask(mask).setVisible(false);

    var zone = this.add.zone(game.config.width/6*4+10, game.config.height/5+1, 320, game.config.height/5*3+5).setOrigin(0).setInteractive();
    var that = this;
    zone.on('pointermove', function (pointer) {

        if (pointer.isDown)
        {
            that.chatText.y += (pointer.velocity.y / 10);

            that.chatText.y = Phaser.Math.Clamp(that.chatText.y, (game.config.height/5+10)-(25*lineasChat), game.config.height/5+10);
        }

    });

    this.writeTextChat = this.add.dom(1280, 785).createFromCache('formChat').setVisible(false);

    //REGISTER
    //register box
    this.registerBox = this.add.image(regisPos[0], regisPos[1],'Register_Form')
    .setScale(0.4);
    this.registerBox.setOrigin(0.5);
    
    this.registerBox.setOrigin(0.5);
    //Register button
    this.registerBtn = this.add.image(regisPos[2], regisPos[3],'Register_Btn')
    .setScale(0.18);
    this.registerBtn.setInteractive()
    .on('pointerdown', () => this.goCreateUser())
    .on('pointerover', () => this.enterIconHoverState(this.registerBtn) )
    .on('pointerout', () => this.enterIconRestState(this.registerBtn))
    this.registerBtn.setOrigin(0.5);

    //Register next img
    this.nextImg = this.add.image(regisPos[4], regisPos[5],'Register_Arrow')
    .setScale(0.4);
    this.nextImg.setInteractive()
    //.on('pointerdown', () => this.MovinBoxes(this.nextImg, game.config.width , game.config.height, registerOut) )
    .on('pointerover', () => this.enterIconHoverState(this.nextImg) )
    .on('pointerout', () => this.enterIconRestState(this.nextImg))
    this.nextImg.setOrigin(0.5);

    //Register prev img
    this.prevImg = this.add.image(regisPos[6], regisPos[7],'Register_Arrow')
    .setScale(-0.4,0.4);
    this.prevImg.setInteractive()
    //.on('pointerdown', () => this.MovinBoxes(this.nextImg, game.config.width , game.config.height, registerOut) )
    .on('pointerover', () => this.enterIconHoverState(this.prevImg) )
    .on('pointerout', () => this.enterIconRestState(this.prevImg))
    this.prevImg.setOrigin(0.5);

    //register close
    this.registerClose = this.add.image(regisPos[8], regisPos[9],'Register_Close')
    .setScale(0.17);
    this.registerClose.setInteractive()
    .on('pointerdown', () => this.MovinBoxes(this ,3 ))
    .on('pointerover', () => this.enterIconHoverState(this.registerClose) )
    .on('pointerout', () => this.enterIconRestState(this.registerClose))
    
   
    this.registerStuff = [this.registerBox, this.registerBtn, this.nextImg, this.prevImg,this.registerClose];
    
    //LOGIN
    //login option
    //box
    //login dfault profile picture
    //login btn
    //login profilepic
    //registro iniciar

    //Login box
    this.loginBox = this.add.image(loginPos[2], loginPos[3],'Login_Box')
    .setScale(0.14);
    this.loginBox.setOrigin(0.5);

    //login opcion
    this.loginOption = this.add.image(loginPos[0], loginPos[1],'Login_Option')
    .setScale(0.7);
    this.loginOption.setOrigin(0.5);
    this.loginOption.setInteractive()
    .on('pointerdown', () => this.MovinBoxes(this,2) )
    .on('pointerover', () => this.enterIconHoverState(this.loginOption))
    .on('pointerout', () => this.enterIconRestState(this.loginOption))
    //login default picture
    this.loginDfPic = this.add.image(loginPos[4], loginPos[5],'Login_Default')
    .setScale(0.15);
    //login button to log in
    this.loginBtn = this.add.image(loginPos[6], loginPos[7],'Login_Btn')
    .setScale(0.18);
    this.loginBtn.setInteractive()
    .on('pointerdown', () =>this.ShowLoginFields(this,true))
    .on('pointerover', () => this.enterIconHoverState(this.loginBtn))
    .on('pointerout', () => this.enterIconRestState(this.loginBtn));

    this.logLoginText = this.add.text(loginPos[16], loginPos[17], 'LOGIN', { fill: '#000000',fontFamily:'menuFont',fontSize:'25px'})
    this.logLoginText.setOrigin(0.5);
    
    //login picture
    this.loginProfilepic = this.add.image(loginPos[8], loginPos[9],'Login_Profile')
    .setScale(0.15);
    //login botn regitrarse
    this.loginRegister = this.add.image(loginPos[10], loginPos[11],'Register_Btn')
    .setScale(0.18);
    this.loginRegister.setInteractive()
    .on('pointerdown', () => this.MovinBoxes(this,3) )
    .on('pointerover', () => this.enterIconHoverState(this.loginRegister))
    .on('pointerout', () => this.enterIconRestState(this.loginRegister));

    this.logRegText = this.add.text(loginPos[18], loginPos[19], 'REGISTER', { fill: '#000000',fontFamily:'menuFont',fontSize:'25px'})
    this.logRegText.setOrigin(0.5);
    
    //login field name base
    this.loginNameField = this.add.image(loginPos[12], loginPos[13],'Login_Field')
    .setScale(0.12).setVisible(false);
    //login field pass base
    this.loginPassField = this.add.image(loginPos[14], loginPos[15],'Login_Field')
    .setScale(0.12).setVisible(false);

    //Login send button
    this.loginSendButton = this.add.image(loginPos[20], loginPos[21],'Login_Btn')
    .setScale(0.14)
    .setInteractive()
    .on('pointerdown', () => this.goLogInText())
    .on('pointerover', () => this.enterIconHoverState(this.loginSendButton))
    .on('pointerout', () => this.enterIconRestState(this.loginSendButton))
    .setVisible(false);
    this.loginBtnText = this.add.text(loginPos[22], loginPos[23], 'Log in', { fill: '#000000',fontFamily:'menuFont',fontSize:'15px'})
    this.loginBtnText.setOrigin(0.5);

    this.loginStuff = [ this.loginOption,this.loginBox, this.loginDfPic, this.loginBtn, this.loginProfilepic, this.loginRegister, this.loginNameField, this.loginPassField,this.logLoginText,this.logRegText,this.loginSendButton,this.loginBtnText];


    //Login
    this.accountText = this.add.text(20, 52, 'Please enter in your account', {fill: 'white',fontFamily:'menuFont',fontSize:'35px'});
    this.accountText.setOrigin(0, 0.5).setVisible(false);

    this.accountLogin = this.add.dom(330, 110).createFromCache('nameform').setVisible(false);
    this.accountLogin.addListener('click');

    //Campos Registro
    this.regLogin = this.add.dom(275, 330).createFromCache('formReg').setVisible(false);
    //this.regLogin.addListener('click');
}

goLogInText() {

    var inputName = this.accountLogin.getChildByName('user');
    var inputPassword = this.accountLogin.getChildByName('password');

    //  Have they entered anything?
    if (inputName.value !== '' && inputPassword.value !== '')
    {

        CheckUserPasswordCorrect(this, inputName.value, inputPassword.value);
    }
    else {

        this.accountText.setColor("red");
        this.accountText.setText('User or password incomplete');
    }
}

goCreateUser() {

    var user = this.regLogin.getChildByName("user").value;
    var email = this.regLogin.getChildByName("email").value;
    var pass = this.regLogin.getChildByName("pass").value;
    var passConfirm = this.regLogin.getChildByName("passConfirm").value;

    if (user !== "" && email !== "" && pass !== "" && passConfirm !== "") {

        if (pass === passConfirm) {
            RestCreateUser(this, user, pass);
        }
        else {
    
            this.accountText.setColor("red");
            this.accountText.setText('Password doesnt match');
        }
    }
    else {

        this.accountText.setColor("red");
        this.accountText.setText('Please fill all fields');
    }
}

//INTERACTIVIDAD

enterButtonHoverState(boton) {
    boton.setStyle({ fill: '#FE6E00'});
    boton.x = boton.x+movTxt;
    boton.y = boton.y+movTxt;
}

enterButtonRestState(boton) {
    boton.setStyle({ fill: '#FEDEBE' });
    boton.x = boton.x-movTxt;
    boton.y = boton.y-movTxt;
}

enterIconHoverState(boton) {
    sfx.sounds[1].play();
    boton.x = boton.x+movTxt;
    boton.y = boton.y+movTxt;
}

enterIconRestState(boton) {

    boton.x = boton.x-movTxt;
    boton.y = boton.y-movTxt;
}

//click
startGame() {
    sfx.sounds[0].play();
    this.Rocketeing(this.playButton,this,game.config.width/2,900,2);
}
enterTutorial() {
    soundtrack.pistas[0].stop();
    sfx.sounds[0].play();
    this.tweens.add({
            targets: [this.playButton,this.optionsButton,this.tutorialButton,this.contactButton],
            //delay: 100,
            alpha:0,
            duration: 2000,
            ease: 'Expo.easeOut',
            onComplete: this.scene.start('SceneTutorial')
        });
    //fin transicion
    isTutorial = true;
}

enterOptions() {
    sfx.sounds[0].play();
    this.scene.start('SceneOptions');
}

enterContact() {
    sfx.sounds[0].play();
    this.scene.start('SceneContact');
}

enterAPIREST() {
    sfx.sounds[0].play();
    this.scene.start('SceneREST');
}



enterButtonHoverState(boton) {
    sfx.sounds[1].play();
    boton.setStyle({ fill: '#FE6E00'});
    boton.x = boton.x+movTxt;
    boton.y = boton.y+movTxt;
}

enterButtonRestState(boton) {
    boton.setStyle({ fill: '#FEDEBE' });
    boton.x = boton.x-movTxt;
    boton.y = boton.y-movTxt;
}

 //USALO COMO ES DEBIDO PEPE :D
 Rocketeing (object,scene, xPos, yPos, shake)
 {   
     var dir = 1;
     var loopTime = 10;
     var motion;    //landing - launching
     
    
     if(yPos<0){    //si está lanzandose
         motion = 'Expo.easeOut';
        }
    else{   //si aterriza
            motion = 'Expo.easeIn'
        }
     scene.tweens.add({
         targets: object,
         props: {
             x: { value: 
                     function () { 
                     return xPos + (dir*=-1 )*shake;
                     },
                 ease:'Linear',
                 duration : loopTime, //cuanto mas bajo más potente
                 yoyo: true,    //ida y vuelta
                 repeat:-1,  // que se repita en bucle este ease en x
                 },
 
             y: { 
                 value: function () { 
                     return object.y -= yPos; 
                 },
                 ease: motion,
                 duration: yPos  //que el ease en y dure 3s
                 },
         },
         duration:100,  //que todo el tween dure 
     });
     this.contactButton.setVisible(false);
     this.optionsButton.setVisible(false);
     this.tutorialButton.setVisible(false);
     isTutorial = false;
     var timedEvent = this.time.addEvent({ delay: yPos+500, callback: function(){this.scene.start('SceneGame'); isTutorial = false;}, callbackScope: this});
 }
//Show login fields
ShowLoginFields(scene,show)
{
    sfx.sounds[0].play();
    scene.loginBtn.setActive(!show);
    scene.loginBtn.setVisible(!show);

    scene.loginRegister.setActive(!show);
    scene.loginRegister.setVisible(!show);

    scene.logLoginText.setActive(!show);
    scene.logLoginText.setVisible(!show);

    scene.logRegText.setActive(!show);
    scene.logRegText.setVisible(!show);

    scene.loginNameField.setActive(show);
    scene.loginNameField.setVisible(show);

    scene.loginPassField.setVisible(show);
    scene.loginPassField.setActive(show);

    scene.loginSendButton.setVisible(show);
    scene.loginSendButton.setActive(show);

    scene.accountLogin.setVisible(show);
    scene.accountLogin.setActive(show);
}
CloseChat(scene){
    var nX = 0; var nY = 1; 
    scene.chatWritter.setVisible(false);
    scene.sendButton.setVisible(false);
    scene.chatText.setVisible(false);
    scene.writeTextChat.setVisible(false);
    scene.lobbyText.setVisible(false);
    for (let i = 0; i < scene.chatboxStuff.length; i++)
    {
        scene.tweens.add({
            targets: scene.chatboxStuff[i],
            x: chatPos[nX],
            y: chatPos[nY],
            //delay: 100,
            //aplha: {start: game.config.width / 2, to: game.config.width / 8},
            duration: 100,
            ease: 'Bounce.easeIn',
        });
        nX+=2;nY+=2;
    }
    chatBoxOut = false;
    chatBoxActive = false;
    lobbyActive = false;
}
OpenChat(scene)
{
  
   var nX = 0; var nY = 1;
        for (let i = 0; i < scene.chatboxStuff.length; i++)
        {
            scene.tweens.add({
                targets: scene.chatboxStuff[i],
                x: chatTween[nX],
                y: chatTween[nY],
                //delay: 100,
                //aplha: {start: game.config.width / 2, to: game.config.width / 8},
                duration: 100,
                ease: 'Bounce.easeOut',
            });
            nX+=2;nY+=2;
        }
        chatBoxOut = true;
    
}
ChatManager(scene)
{
    if(!chatBoxActive && chatBoxOut && !lobbyActive)
    {
        this.CloseChat(scene);
    }
    if(chatBoxActive && !chatBoxOut && !lobbyActive)    //abrimos chat
    {
        scene.chatWritter.setVisible(true);
        scene.sendButton.setVisible(true);
        scene.chatText.setVisible(true);
        scene.writeTextChat.setVisible(true);
        scene.lobbyText.setVisible(false);
        this.OpenChat(scene);
    }
    if(!chatBoxActive && !chatBoxOut && lobbyActive)    //abrimos lobby
    {
        scene.chatWritter.setVisible(false);
        scene.sendButton.setVisible(false);
        scene.chatText.setVisible(false);
        scene.writeTextChat.setVisible(false);
        scene.lobbyText.setVisible(true);
        this.OpenChat(scene);
    }
    if(chatBoxActive && chatBoxOut && lobbyActive)
    {
        scene.chatWritter.setVisible(true);
        scene.sendButton.setVisible(true);
        scene.chatText.setVisible(true);
        scene.writeTextChat.setVisible(true);
        scene.lobbyText.setVisible(false);
    }
    if(!chatBoxActive && chatBoxOut && lobbyActive)
    {
        scene.chatWritter.setVisible(false);
        scene.sendButton.setVisible(false);
        scene.chatText.setVisible(false);
        scene.writeTextChat.setVisible(false);
        scene.lobbyText.setVisible(true)
    }


}
//sacar el chat 
MovinBoxes(scene, id) 
{
    sfx.sounds[1].play();

    var nX = 0; var nY = 1;
    switch(id)
    {
        case 0: // Abrir cerrar lobby 
            lobbyActive = !lobbyActive;
            this.ChatManager(scene);
            break;
        case 1: //abrir cerrar chatbox chatbox
           
            chatBoxActive = !chatBoxActive;
            this.ChatManager(scene);

            break;
        case 2: //login loginBox,loginOption;
            
            if(loginOut)    //guardar lobby
            {
                this.accountText.setVisible(false);
                this.accountLogin.setVisible(false);

                for (let i = 0; i < scene.loginStuff.length; i++)
                {
                    scene.tweens.add({
                        targets: scene.loginStuff[i],
                        x: loginPos[nX],
                        y: loginPos[nY],
                        duration: 100,
                        ease: 'Bounce.easeOut',
                    });
                    nX+=2;nY+=2;
                }
                loginOut = false;
                loginOn = false;
                this.ShowLoginFields(scene,loginOn);
            }
            else if (!loginOut) //sacar lobby 
            {
                this.accountText.setVisible(true);
                //this.accountLogin.setVisible(true);

                for (let i = 0; i < scene.loginStuff.length; i++)

                {
                    scene.tweens.add({
                        targets: scene.loginStuff[i],
                        x: loginTween[nX],
                        y: loginTween[nY],
                        duration: 100,
                        ease: 'Bounce.easeOut',
                    });
                    nX+=2;nY+=2;
                }
                loginOut = true;
                loginOn = false
                this.ShowLoginFields(scene,loginOn);
            }
            
            break;
        case 3: //register registerBox, registerBtn, nextImg, prevImg;
            
            if(registerOut) //guardar register
            {
                this.regLogin.setVisible(false);
                this.accountText.setColor("white");
                this.accountText.setText('Please enter in your account');

                for (let i = 0; i<scene.registerStuff.length; i++)

                {
                    scene.tweens.add({
                        targets: scene.registerStuff[i],
                        x: regisPos[nX],
                        y: regisPos[nY],
                        duration: 100,
                        ease: 'Expo.easeOut',
                    });
                    nX+=2;nY+=2;
                }
                registerOut = false
                this.ShowRegisternFields(scene,registerOn);
            }
            else if(!registerOut) //sacar register
            {
                this.regLogin.setVisible(true);
                for (let i = 0; i < scene.registerStuff.length; i++)
                {
                    scene.tweens.add({
                        targets: scene.registerStuff[i],
                        x: regisTween[nX],
                        y: regisTween[nY],
                        duration: 100,
                        ease: 'Expo.easeOut',
                    });
                    nX+=2;nY+=2;
                }
                registerOut = true
                this.ShowRegisternFields(scene,registerOn);
            }
            
            break;
    }
        

       
    
}
//LOGIN

//EASINGS
easeMe(boton,scene,nOp){
    var endX;
    var endY;
    switch (nOp)
    {
        case 1: endX = game.config.width / 2; endY = (game.config.height/8)*3; break;
        case 2: endX = game.config.width / 2; endY = (game.config.height/8)*4; break;
        case 3: endX = game.config.width / 2; endY = (game.config.height/8)*5; break;
        case 4: endX = game.config.width / 2; endY = (game.config.height/8)*6; break;
        default: break;
    }
    scene.tweens.add({
        targets: boton,
        x: endX,
        y: endY,
        delay: nOp * 100,
        //aplha: {start: game.config.width / 2, to: game.config.width / 8},
        duration: 500,
        ease: 'Circ.easeOut',
        repeat: 0,
        yoyo: false,
        //delay:delay,

        //onComplete: this.EnterOnMachine.bind(this)
    });
}

}


