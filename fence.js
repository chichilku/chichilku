class Fence
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.size_x = 64;
        this.size_y = 64;
        this.hp = 10;
        this.IsAlive = true;
        //console.log("created fence at (" + this.x + "|" + this.y + ")");
    }
    
    Die()
    {
        console.log("wood at (" + this.x "|" + this.y + ") died");
        this.IsAlive = false;
    }

    TakeDamage()
    {
        if (!this.IsAlive) { return; }
        this.hp--;
        if (this.hp < 1)
        {
            this.Die();
        }
    }

    Draw()
    {
        if (!this.IsAlive) { return; }
        ctx.beginPath();
        ctx.rect(this.x + gamecore.scrollX, this.y + gamecore.scrollY, this.size_x, this.size_y);
        ctx.fillStyle = "brown";
        ctx.fill();
        ctx.closePath();
    }
}
