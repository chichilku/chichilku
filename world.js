class World
{
    constructor(w,h)
    {
        this.InitWorld(w,h);
    }
    
    InitWorld(w,h)
    {
        var TREE_AMOUNT = 100;
        for (var i = 0; i < TREE_AMOUNT; i++)
        {
            this.CreateTree(ChillerRand(0,w), ChillerRand(0,h));
        }
    }
    
    CreateTree(x, y)
    {
        aTrees.push(new Tree(x, y));
    }
    
    CreateFence(x,y)
    {
        aFences.push(new Fence(x,y));
    }
    
    DrawBorder()
    {
        //TOP
        ctx.beginPath();
        ctx.rect(0 + gamecore.scrollX, 0 + gamecore.scrollY, WORLD_W, 10);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        
        //BOTTOM
        ctx.beginPath();
        ctx.rect(0 + gamecore.scrollX, WORLD_H + gamecore.scrollY, WORLD_W, 10);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        
        //LEFT
        ctx.beginPath();
        ctx.rect(0 + gamecore.scrollX, 0 + gamecore.scrollY, 10, WORLD_H);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        
        //RIGHT
        ctx.beginPath();
        ctx.rect(WORLD_W + gamecore.scrollX, 0 + gamecore.scrollY, 10, WORLD_H);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
    
    OnTick()
    {
        this.DrawBorder();
    }
}