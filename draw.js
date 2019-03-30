var rainbow_r = 0;
var rainbow_g = 0;
var rainbow_b = 0;
var blood = 0;
var blood_x = 0;
var blood_y = 0;

function DrawFrame(player)
{
    //ctx.clearRect(0, 0, canvas.width, canvas.height); 
    canvas.width = canvas.width; // clears the canvas 
    ShowHUD(player);
    DrawAllSticks();
    DrawGold();
    DrawAllTrees();
    DrawAllBlood();
    DrawAllFences();
}

function DrawPlayer() //TODO: take care of this unused function
{
    ctx.beginPath();
    ctx.rect(x, y, 50, 50);
    //ctx.fillStyle = "#FF0000";
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.closePath();
}

function DrawAllFences()
{
    for (var i = 0; i < aFences.length; i++)
    {
        aFences[i].Draw();
    }
}

function DrawAllSticks()
{
    for (var i = 0; i < aSticks.length; i++)
    {
        aSticks[i].Draw();
    }
}

function DrawGold()
{
    ctx.drawImage(gold_img, gold_x + gamecore.scrollX, gold_y + gamecore.scrollY, gold_size_x, gold_size_y);
}

function DrawRainbowBall(x, y)
{
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI*2, false); //ctx.rect(x,y,w,h)
    var ball_color = "rgba(" + rainbow_r + ", " + rainbow_g + "," + rainbow_b + ", 0.5)"
    ctx.fillStyle = ball_color;
    ctx.fill();
    ctx.closePath();
    if (rainbow_g < 255)
    {
        rainbow_g += 1;
    }
    else
    {
        if (rainbow_b < 255)
        {
            rainbow_b += 1;
        }
        else
        {
            if (rainbow_r < 255)
            {
                rainbow_r += 1;
            }
            else
            {
                rainbow_r = 0;
                rainbow_g = 0;
                rainbow_b = 0;
            }
        }
    }
}