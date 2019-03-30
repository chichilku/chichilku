var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
    p1.mouseX = mousePos.x;
    p1.mouseY = mousePos.y;
}, false);

//onmousemove = function(e) { p1.mouseX = e.clientX; p1.mouseY = e.clientY; } //nice oneliner mouse move but didn't give pos relative to canvas
onclick = function(e) { p1.FireBullet(); }

/*
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e)
{
    if (e.keyCode == 68) // D
    {
        p1.IsRight = true;
    }
    else if (e.keyCode == 65) // A
    {
        p1.IsLeft = true;
    }
    
    if (e.keyCode == 83) // S
    {
        p1.IsDown = true;
    }
    else if (e.keyCode == 87) // W
    {
        p1.IsUp = true;
    }
    console.log("name: " + p1.name);    
}

function keyUpHandler(e)
{
    if (e.keyCode == 68) // D
    {
        p1.IsRight = false;
    }
    else if (e.keyCode == 65) // A
    {
        p1.IsLeft = false;
    }
    
    if (e.keyCode == 83) // S
    {
        p1.IsDown = false;
    }
    else if (e.keyCode == 87) // W
    {
        p1.IsUp = false;
    }
}
*/

/*

W - 87
A - 65
S - 83
D - 68

LEFT_ARROW - 37
RIGHT_ARROW - 39
DOWN_ARROW - 40
UP_ARROW - 38

*/

// Keypresses v2 hopefully better with multiple keys at once (actually no difference how it seems)


var keymap = {}; 
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keymap[e.keyCode] = e.type == 'keydown';
    
    //if (keymap[87] == true) // W
    //{
    //    IsUp = true;
    //}
    //else if (keymap[83] == true) // S
    //{
    //    IsDown = true;
    //}
    
    p1.IsUp = Boolean(keymap[87]); // W
    p1.IsDown = Boolean(keymap[83]); // S
    p1.IsRight = Boolean(keymap[68]); // D
    p1.IsLeft = Boolean(keymap[65]); // A
    if (Boolean(keymap[32])) // SPACE
    {
        gamecore.CreateStick(p1.x,p1.y, "haxx0r", true);
        p1.PlaceFence();
    }
    else if (Boolean(keymap[84])) // T
    {
        //test key
        gamecore.Broadcast("test");
        //p1.Attack();
        socket.emit("join", p1);
    }
    else if (Boolean(keymap[72])) // H
    {
        p1.SpeedHack ^= true;
    }
}

