    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    var canvasWidth = $("#canvas").width();
    var canvasHeight = $("#canvas").height();

function Tile(x, y, size, ctx){
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;

        this.print = function(){
            ctx.fillStyle = "red";
            ctx.fillRect(this.x * this.size,this.y * this.size, this.size, this.size);
        }
    }

var food = (function() {
   var place = function() {
        var x = Math.floor(Math.random() * canvasWidth / 10);
        var y = Math.floor(Math.random() * canvasHeight / 10);
        this.position = new Tile(x, y, 10, ctx, "green");
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

        this.move = function(dir){
            if (dir === "right"){
                var new_head = new Tile(head.x + 1, head.y, 10, ctx);
            }
            if (dir === "left"){
                var new_head = new Tile(head.x - 1, head.y, 10, ctx);
            }
            if (dir === "up"){
                var new_head = new Tile(head.x, head.y - 1, 10, ctx);
            }
            if (dir === "down"){
                var new_head = new Tile(head.x, head.y + 1, 10, ctx);
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


    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    snake.move(direction);
    snake.tryEat();
    snake.print();

    food.print();



}, 100);
