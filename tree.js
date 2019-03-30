class Tree
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.size_x = 128;
        this.size_y = 128;
        this.texture = new Image(); 
        this.texture.src = "img/tree.png";
        this.maxHP = 8;
        this.hp = this.maxHP;
        this.IsAlive = true;
    }
    
    Draw()
    {
        if (this.IsAlive)
        {
            gamecore.DrawObject(this.texture, this.x, this.y, this.size_x, this.size_y);
        }
    }
    
    TakeDamage(attackID)
    {
        if (this.IsAlive == false) { return; }
        
        this.hp--;
        if (this.hp < 1)
        { 
            this.IsAlive = false;
            var attacker = gamecore.GetStickByID(attackID);
            if (attacker)
            {
                attacker.wood++;
                console.log("incremented wood for player: " + attacker.name);
            }
            else { console.log("warning tree killer with invalid id: " + attackID); }
            return;
        }
        
        var TreePics = 8 + 1;
        if (this.hp < TreePics)
        {
            var pic = TreePics - this.hp;
            //console.log("requesting pic: " + pic);
            this.texture.src = "img/tree" + pic + ".png";
        }
    }
}

function DrawAllTrees()
{
    for (var i = 0; i < aTrees.length; i++)
    {
        aTrees[i].Draw();
    }
}

function RemoveDeadTrees()
{
    for (var i = 0; i < aTrees.length; i++)
    {
        if (aTrees[i].IsAlive == false)
        {
            aTrees.splice(i,1);
        }
    }
}