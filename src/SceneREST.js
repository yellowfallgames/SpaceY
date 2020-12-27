

class SceneREST extends Phaser.Scene {

    constructor() {

        super("SceneREST");
    }

    create() {

        this.ItemButton = this.add.text(game.config.width/2, (game.config.height/8)*6, 'CREAR ITEM', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px' })
        .setInteractive()
        .on('pointerdown', () => RestCreateItem(this));
        //.on('pointerover', () => this.enterButtonHoverState(this.contactButton) )
        //.on('pointerout', () => this.enterButtonRestState(this.contactButton) );
        this.ItemButton.setOrigin(0.5);

        this.UserButton = this.add.text(game.config.width/2, (game.config.height/8)*4, 'CREAR USUARIO', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px' })
        .setInteractive()
        .on('pointerdown', () => RestCreateUser(this));
        //.on('pointerover', () => this.enterButtonHoverState(this.contactButton) )
        //.on('pointerout', () => this.enterButtonRestState(this.contactButton) );
        this.UserButton.setOrigin(0.5);

        this.MessageButton = this.add.text(game.config.width/2, (game.config.height/8)*2, 'ENVIAR MENSAJE', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px' })
        .setInteractive()
        .on('pointerdown', () => RestCreateMsg(this));
        //.on('pointerover', () => this.enterButtonHoverState(this.contactButton) )
        //.on('pointerout', () => this.enterButtonRestState(this.contactButton) );
        this.MessageButton.setOrigin(0.5);

        this.numPlayers = updateUsers(this);
        
        this.numPlayersTxt = this.add.text(game.config.width*1/4, (game.config.height/8)*7.5, "TOTAL USERS: "+this.numPlayers, { fill: '#FFFFFF',fontFamily:'menuFont',fontSize:'40px' });
        this.numPlayersTxt.setOrigin(0.5);
        
        this.numPlayersOnline;

        this.serverOnlineTxt = this.add.text(game.config.width*3.5/4, (game.config.height/8)*7.5, "SERVER¿?", { fill: '#FFFFFF',fontFamily:'menuFont',fontSize:'40px' });
        this.serverOnlineTxt.setOrigin(0.5);

        isServerOnline(this);

    }
    
}




function RestCreateMsg (scene) {

    var username = "VRS Blinks24";
    var content = "Soy la mejor sage de este juego";

    var msg = {
        userName: username,
        content: content,
    }

    createMsg(msg);
    isServerOnline(scene);
}
//Create user in server
function createMsg(msg) {
    $.ajax({
        method: "POST",
        url: urlServer+'/messages',
        data: JSON.stringify(msg),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (msg) {
        console.log("Message created: " + JSON.stringify(msg));
    })
}
//Load users from server
function loadMsgs() {
    $.ajax({
        url: urlServer+'/messages',

    }).done(function (msgs) {
        console.log('Messages loaded: ' + JSON.stringify(msgs));

        console.log('Historial mensajes: ');
        for (var i=0; i < msgs.length; i++) {

            console.log(msgs[i].userName + ": " + msgs[i].content);
        }
        
    })
}
//Show item in page
function showMsg(msg) {

    console.log("Mensajes: " + msg.content);
}


function RestCreateUser (scene) {

    var name = "PEPO";
    var pass = sha256("1234");

    var user = {
        name: name,
        password: pass,
        online: true
    }

    createUser(user);
    isServerOnline(scene);
}
//Create user in server
function createUser(user) {
    $.ajax({
        method: "POST",
        url: urlServer+'/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("User created: " + JSON.stringify(user));
    })
}
//Load users from server
function loadUsers() {
    $.ajax({
        url: urlServer+'/users'
    }).done(function (users) {
        console.log('Users loaded: ' + JSON.stringify(users));
    })
}
//
function CheckUser(name_, pass_) {
    console.log(name_ + "/"+ pass_);
    var name = name_;
    var pass = sha256(pass_);

    var user = {
        name: name,
        password: pass,
        online: false
    }

    $.ajax({
        method: "POST",
        url: urlServer+'/users/check',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function(){
            console.log("Correcto rest checkuser");
        },
        error: function(){
            console.log("Error rest checkuser");
        },
    }).done(function (b) {
        if (b) {
            console.log("EXISTES");
        }
        else {
            console.log("NO EXISTES");
        }
        //console.log("contraseña server: "+b);
    })
}




//JqueryItems
function RestCreateItem (scene) {

    var value = "HOLAM";

    var item = {
        description: value,
        checked: false
    }

    createItem(item, function (itemWithId) {
        //When item with id is returned from server
        showItem(itemWithId);
    });
    isServerOnline(scene);
}

//Load items from server
function loadItems(callback) {
    $.ajax({
        url: urlServer+'/items'
    }).done(function (items) {
        console.log('Items loaded: ' + JSON.stringify(items));
        callback(items);
    })
}

//Create item in server
function createItem(item, callback) {
    $.ajax({
        method: "POST",
        url: urlServer+'/items',
        data: JSON.stringify(item),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        console.log("Item created: " + JSON.stringify(item));
        callback(item);
    })
}

//Update item in server
function updateItem(item) {
    $.ajax({
        method: 'PUT',
        url: urlServer+'/items/' + item.id,
        data: JSON.stringify(item),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        console.log("Updated item: " + JSON.stringify(item))
    })
}

//Delete item from server
function deleteItem(itemId) {
    $.ajax({
        method: 'DELETE',
        url: urlServer+'/items/' + itemId
    }).done(function (item) {
        console.log("Deleted item " + itemId)
    })
}

//Show item in page
function showItem(item) {

    var checked = '';
    var style = '';

    if (item.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }

    $('#info').append(
        '<div id="item-' + item.id + '"><input type="checkbox" ' + checked + '><span ' + style + '>' + item.description +
        '</span> <button>Delete</button></div>')
}


function isServerOnline(scene) {
    $.ajax({
        url: urlServer+'/messages',
        success: function(){
            setOnline(scene, true);
        },
        error: function(){
            setOnline(scene, false);
        },

    }).done(function (msgs) {
        console.log('Messages loaded: ' + JSON.stringify(msgs));

        console.log('Historial mensajes: ');
        for (var i=0; i < msgs.length; i++) {

            console.log(msgs[i].userName + ": " + msgs[i].content);
        }
        
    })
}
function setOnline(scene, b) {

    if (b) {

        scene.serverOnlineTxt.setText("SERVER ONLINE");
    }
    else {

        scene.serverOnlineTxt.setText("SERVER OFFLINE");
    }
}

function updateUsers(scene) {

    $.ajax({
        url: urlServer+'/users/count'
    }).done(function (n) {

        setUsers(scene, n)
    })
}

function setUsers(scene, n) {

    scene.numPlayers = n;
    scene.numPlayersTxt.setText("TOTAL USERS: " + n);
}


$(document).ready(function () {

    loadItems(function (items) {
        //When items are loaded from server
        for (var i = 0; i < items.length; i++) {
            showItem(items[i]);
        }
    });

    loadMsgs(function (msgs) {
        //When items are loaded from server
        for (var i = 0; i < msgs.length; i++) {
            showMsgs(msgs[i]);
        }
    });

    /*
    var input = $('#value-input')
    var info = $('#info')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var itemDiv = elem.parent();
            var itemId = itemDiv.attr('id').split('-')[1];
            itemDiv.remove()
            deleteItem(itemId);
        }
    })

    //Handle items checkboxs
    info.change(function (event) {

        //Get page elements for item
        var checkbox = $(event.target);
        var itemDiv = checkbox.parent();
        var textSpan = itemDiv.find('span');

        //Read item info from elements
        var itemDescription = textSpan.text();
        var itemChecked = checkbox.prop('checked');
        var itemId = itemDiv.attr('id').split('-')[1];

        //Create updated item
        var updatedItem = {
            id: itemId,
            description: itemDescription,
            checked: itemChecked
        }

        //Update item in server
        updateItem(updatedItem);

        //Update page when checked
        var style = itemChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);

    })

    //Handle add button
    $("#add-button").click(function () {

        
    })*/
})

