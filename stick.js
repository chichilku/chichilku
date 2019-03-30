class Stick
{
    constructor(x, y, name, IsBot, ID)
    {
        this.IsBot = IsBot;
        this.IsAlive = true;
        this.ID = ID;
        this.x = x;
        this.y = y;
        this.mouseX = 0;
        this.mouseY = 0;
        this.IsUp = false;
        this.IsDown = false;
        this.IsRight = false;
        this.IsLeft = false;
        this.IsCollidedX = false;
        this.IsCollidedY = false;
        this.x = 0;
        this.y = 0;
        this.new_x = x;
        this.new_y = y;
        this.dx = 0;
        this.dy = 0;
        this.hp = 0;
        this.gold = 0;
        this.wood = 0;
        this.size_x = 64;
        this.size_y = 64;
        this.name = name;
        this.texture_tick = 0;
        this.texture_state = 1;
        this.texture = new Image(); 
        this.texture.src = "img/stick1.png";
        
        //hacks
        this.SpeedHack = false;
    }
    
    WalkingAnimation()
    {
        var WalkingSpeed = 10 - Math.abs(this.dx);
        this.texture_tick++;
        if (this.texture_tick > WalkingSpeed)
        {
            this.texture_state++;
            this.texture_tick = 0;
            if (this.texture_state > 3)
            {
                this.texture_state = 1;
            }
        }
        
        if (this.dx > 0)
        {
            if (this.texture_state == 1)
            {
                this.texture.src = "img/stick_walk_right1.png";
            }
            else if (this.texture_state == 2)
            {
                this.texture.src = "img/stick_walk_right2.png";
            }
            else if (this.texture_state == 3)
            {
                this.texture.src = "img/stick_walk_right3.png";
            }
            else
            {
                this.texture.src = "img/stick1.png";
            }
        }
        else if (this.dx < 0)
        {
            if (this.texture_state == 1)
            {
                this.texture.src = "img/stick_walk_left1.png";
            }
            else if (this.texture_state == 2)
            {
                this.texture.src = "img/stick_walk_left2.png";
            }
            else if (this.texture_state == 3)
            {
                this.texture.src = "img/stick_walk_left3.png";
            }
            else
            {
                this.texture.src = "img/stick1.png";
            }
        }
        else // no speed
        {
            this.texture.src = "img/stick1.png";
        }
    }
    
    Update()
    {
        if (this.IsAlive == false) { return; }
        
        UpdateBot(this);
        this.WalkingAnimation();

        if (this.IsRight == true && this.IsLeft == false)
        {
            this.dx += 2;
        }
        else if (this.IsLeft == true && this.IsRight == false)
        {
            this.dx -= 2;
        }
        else
        {
            this.dx = 0;
        }

        if (this.IsDown == true && this.IsUp == false)
        {
            this.dy += 2;
        }
        else if (this.IsUp == true && this.IsDown == false)
        {
            this.dy -= 2;
        }
        else
        {
            this.dy = 0;
        }

        
        if (this.SpeedHack)
        {
            if (this.dx > MAX_HAX_SPEED) { this.dx = MAX_HAX_SPEED; }
            if (this.dx < -MAX_HAX_SPEED) { this.dx = -MAX_HAX_SPEED; }
            if (this.dy > MAX_HAX_SPEED) { this.dy = MAX_HAX_SPEED; }
            if (this.dy < -MAX_HAX_SPEED) { this.dy = -MAX_HAX_SPEED; }
        }
        else
        {
            if (this.dx > MAX_SPEED) { this.dx = MAX_SPEED; }
            if (this.dx < -MAX_SPEED) { this.dx = -MAX_SPEED; }
            if (this.dy > MAX_SPEED) { this.dy = MAX_SPEED; }
            if (this.dy < -MAX_SPEED) { this.dy = -MAX_SPEED; }
        }

        this.new_x = this.x + this.dx;
        this.new_y = this.y + this.dy;

        IsCollision(this);

        if (this.IsCollidedX == false) { this.x = this.new_x; }
        if (this.IsCollidedY == false) { this.y = this.new_y; }
        if (this.ID == p1.ID)
        {
            gamecore.scrollX = -this.x + canvas.width / 2;
            gamecore.scrollY = -this.y + canvas.height / 2;
        }
    }
    
    Attack() //for now only used to cut trees
    {
        var hit = 0;
        for (var i = 0; i < aTrees.length; i++)
        {
            if (IsCollide(this.x, this.y, this.size_x, this.size_y, aTrees[i].x, aTrees[i].y, aTrees[i].size_x, aTrees[i].size_y))
            {
                //aTrees.splice(i,1);
                //console.log("attacked tree sliced index: " + i);
                aTrees[i].TakeDamage(this.ID);
                console.log("name=" + this.name + " id=" + this.ID + " attacked tree");
                hit++;
            }
        }
        console.log("attack hits: " + hit);
    }
    
    FireBullet()
    {
        var velX = BULLET_VEL;
        var velY = BULLET_VEL;
        //relative to canvas center
        //if (this.mouseX < canvas.width / 2) { velX = -BULLET_VEL; }
        //if (this.mouseY < canvas.height / 2) { velY = -BULLET_VEL; }
        /*
        //unused relative to stick pos which was always pretty fucked because canvas pos and now since scrolling ripped af
        if (this.mouseX < this.x) { velX = -BULLET_VEL; }
        if (this.mouseY < this.y) { velY = -BULLET_VEL; }
        */
        
        /*
        //some random chiller ways (working okish)
        var dx = Math.abs((canvas.width / 2) - this.mouseX);
        var dy = Math.abs((canvas.height / 2) - this.mouseY);
        velX = ChillerMapNum(dx, 0, canvas.width, 0, BULLET_VEL);
        velY = ChillerMapNum(dy, 0, canvas.height, 0, BULLET_VEL);
        
        if (this.mouseX < canvas.width / 2) { velX = -velX; }
        if (this.mouseY < canvas.height / 2) { velY = -velY; }
        */
        
        //using brain and maths vectors
        velX = this.mouseX - canvas.width / 2;
        velY = this.mouseY - canvas.height / 2;
        
        var len = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2)); // abs of vector       
        //console.log("len raw: " + len)
        
        velX = velX / len; //normalize length
        velY = velY / len; //normalize length
        velX = velX * BULLET_VEL; //add default strength
        velY = velY * BULLET_VEL;
        
        var len = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2)); // abs of vector       
        //console.log("len normalized: " + len)
        
        
        aBullets.push(new Bullet(this.x + this.size_x / 2, this.y + this.size_y / 2, velX, velY, this.ID))
        //console.log("fired new bullet vel(" + velX + "|" + velY + "). (total " + aBullets.length + ")");
    }
    
    PlaceFence()
    {
        if (this.wood < 1)
        {
            gamecore.Broadcast("You don't have enough wood to place a fence");
            return false;
        }
        this.wood--;
        world.CreateFence(this.x + 128,this.y);
        return true;
    }
    
    Draw()
    {
        if (this.IsAlive == true)
        { 
            ctx.drawImage(this.texture, this.x + gamecore.scrollX, this.y + gamecore.scrollY, this.size_x, this.size_y);
            ctx.font = "bold 12px sans-serif";
            ctx.fillText(this.ID, this.x + gamecore.scrollX, this.y + gamecore.scrollY - 20);
            ctx.fillText(this.name, this.x + gamecore.scrollX, this.y + gamecore.scrollY);
        }
    }
    
    Die()
    {
        CreateBlood(this.x, this.y);
        this.IsAlive = false;
        
        if (this === p1)
        {
            gamecore.Broadcast("you died");
        }
    }
}