function UpdateBot(bot)
{
    if (bot.IsBot == false) { return; }
    
    if (p1.x > bot.x)
    {
        //console.log("player is on the right");
        bot.IsRight = true;
        bot.IsLeft = false;
    }
    else
    {
        //console.log("player is on the left");
        //console.log("playerX: " + p1.x + " botX: " + bot.x);
        //console.log("player.x = " + p1.x + " i not bigger (>) than bot.x = " + bot.x);
        bot.IsLeft = true;
        bot.IsRight = false;
    }
    
    if (p1.y > bot.y)
    {
        bot.IsDown = true;
        bot.IsUp = false;
    }
    else
    {
        bot.IsDown = false;
        bot.IsUp = true;
    }
}