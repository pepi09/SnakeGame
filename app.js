    var
        c = document.getElementById("canvas"),
        ctx = c.getContext("2d"),

        canvasWidth = $("#canvas").width(),
        canvasHeight = $("#canvas").height(),
        background = new Image();

background.src = "./grass_background.jpg";
background.onload = function(){
    ctx.drawImage(background,0,0);
}

function Tile(x, y, size, ctx, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;

        this.print = function(){
            ctx.fillStyle = color;
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
            head = new Tile(4, 0, 10, ctx, "red");

        [1,2,3].forEach(function(i){
            tail.push(new Tile(i, 0, 10, ctx, "red"));
        })

        tail.push(head);

        this.print = function(){
            tail.forEach(function(point){
                point.print();
            })
        }

        this.move = function(dir){
            if (dir === "right"){
                var new_head = new Tile(head.x + 1, head.y, 10, ctx, "red");
            }
            if (dir === "left"){
                var new_head = new Tile(head.x - 1, head.y, 10, ctx, "red");
            }
            if (dir === "up"){
                var new_head = new Tile(head.x, head.y - 1, 10, ctx, "red");
            }
            if (dir === "down"){
                var new_head = new Tile(head.x, head.y + 1, 10, ctx, "red");
            }
            tail.push(new_head);
            tail.shift();
            head = new_head;
        }

        var tryEat = function() {
        if (head.x === window.food.position.x && head.y === window.food.position.y) {
            tail.push(food.position);
            food.place();
        }
        };
        return {
            print : print,
            move : move,
            tryEat : tryEat
        }
    }(ctx))

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
