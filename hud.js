function ShowHUD(player)
{
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("wood: " + player.wood + " speedhack: " + player.SpeedHack, 20, canvas.height - 80);
    ctx.fillText("goldX: " + gold_x + " goldX: " + gold_y, 20, canvas.height - 60);
    ctx.fillText("pos (" + player.x + "|" + player.y + ") mouse (" + player.mouseX + "|" + player.mouseY + ")", 20, canvas.height - 40);
    ctx.fillText("hp: " + player.hp + " gold: " + player.gold, 20, canvas.height - 20);
    //ShowName(player); //draw with player
}
