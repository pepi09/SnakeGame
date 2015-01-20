    var
        c = document.getElementById("canvas"),
        ctx = c.getContext("2d"),

        canvasWidth = $("#canvas").width(),
        canvasHeight = $("#canvas").height(),
        background = new Image();
        eaten_fruits = -1;

background.src = "./grass_background.jpg";
background.onload = function(){
    ctx.drawImage(background,0,0);
}

function Tile(x, y, size, ctx, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.color = color || "red"

        this.print = function(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x * this.size,this.y * this.size, this.size, this.size);
        }
    }

var food = (function() {
   var place = function() {
        var x = Math.floor(Math.random() * canvasWidth / 10);
        var y = Math.floor(Math.random() * canvasHeight / 10);
        this.position = new Tile(x, y, 10, ctx, "yellow");
    };
   var print = function() {
        this.position.print();
    };

    return {
        place: place,
        print: print,
    };
}(ctx));

var snake = (function(){
        var tail = [],
            head = new Tile(4, 0, 10, ctx);

        [1,2,3].forEach(function(i){
            tail.push(new Tile(i, 0, 10, ctx));
        })

        tail.push(head);

        this.print = function(){
            tail.forEach(function(point){
                point.print();
            })
        }

        this.tryEat = function() {
        if (head.x === window.food.position.x && head.y === window.food.position.y) {
            food.place();
            tail.push(food.position);
            score();
        }
        };

        this.move = function(dir) {
            var newX = head.x,
                newY = head.y;
            if (dir === "right") {
                newX++;
            }
            if (dir === "left") {
                newX--;
            }
            if (dir === "up") {
                newY--;
            }
            if (dir === "down") {
                newY++;
            }

        // this allows the snake to appear on the other side of the cavnas
        // when it hits border
            newX = (newX + canvasWidth) % (canvasWidth / 10);
            newY = (newY + canvasHeight) % (canvasHeight / 10);

            var new_head = new Tile(newX, newY, 10, ctx);
            eatSelf(new_head);
            tail.push(new_head);
            tail.shift();
            head = new_head;
        }

        this.eatSelf = function(tile){
            tail.forEach(function(point){
                if(tile.x === point.x & tile.y === point.y){
                    console.log("aaaa");
                    alert("Game over!");
                    location.reload();
                }
            });
        }

    return {
        print: print,
        move: move,
        tryEat: tryEat,
    };
}(ctx));

score = function(){
    eaten_fruits += 1;
    $("#score").text("Your score: " + eaten_fruits);
}

    score();
    food.place();
    food.print();

    var direction = "right";
    setInterval(function(){

    $(document).keydown(function(event) {
        if (event.keyCode === 39 && direction != "left") {
            direction = "right";
        }

        if (event.keyCode === 37 && direction != "right") {
            direction = "left";
        }

        if (event.keyCode === 38 && direction != "down") {
            direction = "up";
        }

        if (event.keyCode === 40 && direction != "up") {
            direction = "down";
        }
    })

    ctx.drawImage(background,0,0);
    snake.move(direction);
    snake.tryEat();
    snake.print();

    food.print();
}, 100);
