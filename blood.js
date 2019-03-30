class Blood
{
    constructor(x,y,dx,dy)
    {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.state = 1;
        this.size_x = ChillerRand(2,8);
        this.size_y = ChillerRand(2,8);
        this.alpha = ChillerFloat(0.1, 0.9);
    }
    Update()
    {
        this.state++;
        this.x += this.dx;
        this.y += this.dy;
        this.dy += 1;
        if (this.dy > MAX_SPEED) { this.dy = MAX_SPEED; }
    }
    Draw()
    {
        ctx.beginPath()
        ctx.rect(this.x + gamecore.scrollX, this.y + gamecore.scrollY, this.size_x, this.size_y);
        ctx.fillStyle = "rgba(255, 0, 0, " + this.alpha + ")";
        ctx.fill();
        ctx.closePath();
    }
}

var aBlood = [];
const BLOOD_DURATION = 20;

function CreateBlood(x,y)
{
    for (var i = 0; i < 15; i++) { aBlood.push(new Blood(x,y, ChillerRand(-10, 10), ChillerRand(-10, 10))); }
}

function DrawAllBlood()
{
    for (var i = 0; i < aBlood.length; i++)
    {
        aBlood[i].Update();
        aBlood[i].Draw();
        if (aBlood[i].state > BLOOD_DURATION)
        {
            aBlood.splice(i, 1);
        }
    }
}

/*
function DrawBlood() //OLD SHITTY BLOOD
{
    for (var i = 0; i < aBlood.length; i++)
    {
        ctx.beginPath()
        ctx.rect(aBlood[i].x + aBlood[i].state, aBlood[i].y + aBlood[i].state, 10, 10);
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fill();
        ctx.closePath();
        
        ctx.beginPath()
        ctx.rect(aBlood[i].x - aBlood[i].state, aBlood[i].y + aBlood[i].state, 10, 10);
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fill();
        ctx.closePath();
        
        if (aBlood[i].state < BLOOD_DURATION / 4)
        {
            ctx.beginPath()
            ctx.rect(aBlood[i].x + aBlood[i].state, aBlood[i].y - aBlood[i].state, 10, 10);
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fill();
            ctx.closePath();

            ctx.beginPath()
            ctx.rect(aBlood[i].x - aBlood[i].state, aBlood[i].y - aBlood[i].state, 10, 10);
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fill();
            ctx.closePath();
        }
    }
}
*/