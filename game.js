/*global Stick*/

// global game constants

const MAX_HAX_SPEED = 20;
const MAX_SPEED = 4;
const WORLD_W = 2905;
const WORLD_H = 2905;

// game variables

var gold_x = 50;
var gold_y = 50;
var gold_size_x = 24;
var gold_size_y = 24;
var stick = new Image();
var gold_img = new Image();
gold_img.src = "img/gold.png";

var aSticks = [];
var aBullets = [];
var aTrees = [];
var aFences = [];

var gamecore = new GameCore();
var world = new World(WORLD_W,WORLD_H);
var p1 = gamecore.CreateStick(0, 0, "nameless stick", false);

//var p1 = new Stick(0, 0, "nameless stick", false);
var enemy = new Stick(400, 20, "enemey blazeit", true);
aSticks.push(p1);
aSticks.push(enemy);

//networking (multiplayer) STOPPED NETWORKING
//var socket = io.connect("http://localhost:3000");

function UpdateAllPlayers()
{
    for (var i = 0; i < aSticks.length; i++)
    {
        aSticks[i].Update();
    }
}

function GameLoop()
{
    DrawFrame(p1);
    //PumpNetwork(); //stopped network dev function is defined in client/network.js
    gamecore.OnTick();
    requestAnimationFrame(GameLoop);
}

requestAnimationFrame(GameLoop);


