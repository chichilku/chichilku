class GameCore
{
    constructor()
    {
        this.NextID = 0;
        this.scrollX = 0; // used to center the stick and move around in the world
        this.scrollY = 0; // used to center the stick and move around in the world
        this.broadcast_msg = "";
        this.broadcast_state = 0;
    }
    
    CreateStick(x, y, name, IsBot)
    {
        this.NextID++;
        var stick = new Stick(x,y,name,IsBot, this.NextID);
        aSticks.push(stick);
        return stick;
    }
    
    DrawObject(texture, x, y, w, h)
    {
        ctx.drawImage(texture, x + gamecore.scrollX, y + gamecore.scrollY, w, h);
    }
    
    GetStickByID(id)
    {
        for (var i = 0; i < aSticks.length; i++)
        {
            if (aSticks[i].ID == id)
            {
                return aSticks[i];
            }
        }
        return null;
    }
    
    Broadcast(msg)
    {
        this.broadcast_msg = msg;
        this.broadcast_state = 200;
    }
    
    RenderBroadcast()
    {
        ctx.font = "bold 42px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(this.broadcast_msg, canvas.width / 2, canvas.height * 0.3);
    }
    
    OnTick()
    {
        if (this.broadcast_state > 0)
        {
            this.broadcast_state--;
            this.RenderBroadcast();
        }
        
        UpdateAllPlayers();
        UpdateAllBullets();
        world.OnTick();
        
        //TODO: add a slowtick to cleanup stuff
        //RemoveDeadTrees();
    }
}