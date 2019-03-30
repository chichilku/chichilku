const BULLET_LIFETIME = 400;
const BULLET_VEL = 10;
const BULLET_SIZE = 10;

class Bullet
{
    constructor(x,y,dx,dy, StickID)
    {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.state = 0;
        this.StickID = StickID;
    }
    
    Update()
    {
        this.x += this.dx;
        this.y += this.dy;
        this.state++;
        this.CollisionCheck();
    }
    
    CollisionCheck()
    {
        // Players
        for (var i = 0; i < aSticks.length; i++)
        {
            if (aSticks[i].IsAlive == false) { continue; }
            if (this.StickID == aSticks[i].ID) { continue; } // no selfdamage
            if (IsCollide(this.x, this.y, BULLET_SIZE, BULLET_SIZE, aSticks[i].x, aSticks[i].y, aSticks[i].size_x, aSticks[i].size_y))
            {
                aSticks[i].Die();
                this.state = BULLET_LIFETIME; //hacky way to destory bullet
            }
        }
        
        // Trees
        for (var i = 0; i < aTrees.length; i++)
        {
            if (!aTrees[i].IsAlive) { continue; }
            if (IsCollide(this.x, this.y, BULLET_SIZE, BULLET_SIZE, aTrees[i].x, aTrees[i].y, aTrees[i].size_x, aTrees[i].size_y))
            {
                aTrees[i].TakeDamage(this.StickID);
                this.state = BULLET_LIFETIME; //hacky way to destory bullet
            }
        }
    }
    
    Draw()
    {
        ctx.beginPath()
        ctx.rect(this.x + gamecore.scrollX, this.y + gamecore.scrollY, BULLET_SIZE, BULLET_SIZE);
        ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
        ctx.fill();
        ctx.closePath();       
        //console.log("drawin bullerino at (" + this.x + "|" + this.y + ")");
    }
}

function UpdateAllBullets()
{
    for (var i = 0; i < aBullets.length; i++)
    {
        aBullets[i].Update();
        aBullets[i].Draw();
        if (aBullets[i].state >= BULLET_LIFETIME)
        {
            aBullets.splice(i, 1);
        }
    }
}