function IsCollideWorld(player)
{
    var IsCollided = false;
    if (player.new_x < 0)
    {
        player.Die();
    }
    else if (player.new_x + player.size_x > WORLD_W)
    {
        player.Die();
    }
    else if (player.new_y + player.size_y > WORLD_H)
    {
        player.Die();
    }
    else if (player.new_y < 0)
    {
        player.Die();
    }
    
    
    /*
    //old static world
    var IsCollided = false;
    player.IsCollidedX = false;
    player.IsCollidedY = false;
    if (player.new_x < 0)
    {
        player.dx = 0;
        player.IsCollidedX = true;
        IsCollided = true;
    }
    else if (player.new_x + player.size_x > canvas.width)
    {
        player.dx = 0;
        player.IsCollidedX = true;
        IsCollided = true;
    }
    if (player.new_y < 0)
    {
        player.dy = 0;
        player.IsCollidedY = true;
        IsCollided = true;
    }
    else if (player.new_y + player.size_y > canvas.height)
    {
        player.dy = 0;
        player.IsCollidedY = true;
        IsCollided = true;
    }
    return IsCollided;
    */
}

function IsCollideItems(player)
{
    var IsCollided = false;
    if (player.new_x < gold_x + gold_size_x && player.new_x + player.size_x > gold_x && player.new_y + player.size_y > gold_y && player.new_y < gold_y + gold_size_y)
    {
        player.gold += 1;
        gold_x = ChillerRand(gold_size_x, canvas.width - gold_size_x)
        gold_y = ChillerRand(gold_size_y, canvas.height - gold_size_y)
        IsCollided = true;
    }
    return IsCollided;
}

/*
//unused old func (moved to bullet side check i think)
function IsCollideBullet(player)
{
    for (var i = 0; i < aBullets.length; i++)
    {
        if (aBullets[i].StickID == player.ID) { continue; } //can't harm with own bullets
        if (IsCollide(player.x, player.y, player.size_x, player.size_y, aBullets[i].x, aBullets[i].y, BULLET_SIZE, BULLET_SIZE))
        {
            aBullets[i].state = BULLET_LIFETIME; //hacky way to destory bullet
            player.Die();
        }
    }
}
*/

function IsClollideFence(player)
{
    for (var i = 0; i < aFences.length; i++)
    {
        /*
        if (IsCollide(player.new_x, player.new_y, player.size_x, player.size_y, aFences[i].x, aFences[i].y, aFences[i].size_x, aFences[i].size_y))
        if (IsCollideV2(player, aFences[i]))
        {
            player.dx = 0;
            player.dy = 0;
            player.IsCollidedX = true;
            player.IsCollidedY = true;
        }
        */
        IsCollideV2(player, aFences[i])
    }
}

function IsCollideV2(obj1, obj2)
{
    /**********************************
    *                                 *
    *        IsCollideV2              *
    *                                 *
    ***********************************
    
    Parameter:
        Two objects with x, y, size_x, size_y attributes
        obj1 also needs new_x, new_y, dx, dy and IsCollideX, IsCollideY
        obj1 should be the object of interest the moving thing (player, bullet, etc)
        
    Return:
        bool if collided or not
        
    Side effect:
        it sets obj1 vel on collided side (x or y or both on error) to zer0
        
    ***********************************/
    
    if (IsCollide(obj1.new_x, obj1.new_y, obj1.size_x, obj1.size_y, obj2.x, obj2.y, obj2.size_x, obj2.size_y))
    {
        var CollisionFound = false;
        if (obj1.x + obj1.size_x < obj2.x + 1) //obj1 on the left
        {
            //console.log("obj1 left");
            obj1.dx = 0;
            obj1.IsCollidedX = true;
            CollisionFound = true;
        }
        else if (obj2.x + obj2.size_x < obj1.x + 1) //obj1 on the right
        {
            //console.log("obj1 right");
            obj1.dx = 0;
            obj1.IsCollidedX = true;
            CollisionFound = true;
        }
        else if (obj1.y + obj1.size_y < obj2.y + 1) //obj1 on top
        {
            //console.log("obj1 top");
            obj1.dy = 0;
            obj1.IsCollidedY = true;
            CollisionFound = true;
        }
        else if (obj2.y + obj2.size_y < obj1.y + 1) //obj1 on bottom
        {
            //console.log("obj1 bottom");
            obj1.dy = 0;
            obj1.IsCollidedY = true;
            CollisionFound = true;
        }
        
        if (!CollisionFound) //no side detected --> block everything
        {
            obj1.dx = 0;
            obj1.dy = 0;
            obj1.IsCollidedX = true;
            obj1.IsCollidedY = true;
            console.log("warning no collison side detected obj1X+size: " + (obj1.x + obj1.size_x) + " obj2X: " + obj2.x);
        }
        return true;
    }
    return false;
}
    
function IsCollide(x1,y1,w1,h1,x2,y2,w2,h2)
{
    if (x1 < x2 + w2 && x1 + w1 > x2 && y1 + h1 > y2 && y1 < y2 + h2)
    {
        return true;
    }
    return false;
}

function IsCollision(player)
{
    player.IsCollidedX = false;
    player.IsCollidedY = false;
    IsCollideItems(player);
    //IsCollideBullet(player);
    IsClollideFence(player);
    IsCollideWorld(player);
}
