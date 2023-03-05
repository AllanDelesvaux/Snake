//Snake
window.onload=function(){
const block = 35;
let delay = 500;
let score = 0; 
let interval;
const body = document.querySelector('body');
const board = document.getElementById("board");

let snake = new Snake([6,6],'right', 3);
snake.draw();
let pomme = new Pomme();
pomme.draw();

function commencer(e) {
  if(e.key == " "){
    document.getElementById("Message").innerHTML = "";
    body.removeEventListener("keydown", commencer);
    partie();
  }
}

body.addEventListener("keydown", commencer);

function partie(){
    body.addEventListener("keydown",move);
    document.getElementById('Message').innerHTML = "Score : " + score;  
    interval = setInterval(refresh, delay);
}

function move(e){
    switch(e.key){
        case 'ArrowRight':
            snake.setDirec('right');
            break;
        case 'ArrowLeft':
            snake.setDirec('left');
            break;
        case 'ArrowUp':
            snake.setDirec('up');
            break;
        case 'ArrowDown':
            snake.setDirec('down');
            break;
    }
}

function refresh(){
    snake.addPosition();
    if(pomme.touchSnake()){
        score+=1;
        pomme.reload();
        delay*= 0.90;
        clearInterval(interval);
        interval = setInterval(refresh, delay); 
    }else{
        snake.supFirstPosition();
    }
    if(snake.exit() || snake.touchYs()){
        document.getElementById('Message').innerHTML=" Vous avez Perdu avec un score de : " + score ;
        score = 0;
        clearInterval(interval);
        return 0;
    }
    document.getElementById('Message').innerHTML = "Score : " + score;  
    snake.draw();
    pomme.draw();
}

function Snake(head, direc, taille){
    this.head = head;
    this.tabPosition = [];
    this.direc=direc;
    
    switch(this.direc){
        case 'right':
            for(let i=0;i<taille;i++){
                this.tabPosition.push([6-i,6]);
            }
            break;

        case 'left':
            for(let i=0;i<taille;i++){
                this.tabPosition.push([6+i,6]);
            }
            break;

        case 'up':
            for(let i=0;i<taille;i++){                  
                this.tabPosition.push([6,6+i]);
            }
            break;

        case 'down':
            for(let i=0;i<taille;i++){                    
                this.tabPosition.push([6,6-i]);
            }
            break;
    }

    this.setDirec = function(dir){
        this.direc=dir;
    }

    this.draw = function(){
        var ctx = board.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle="brown";
        for(let i = 0; i<this.tabPosition.length;i++){
            ctx.rect(this.tabPosition[i][0]*block, this.tabPosition[i][1]*block, block, block);  
            ctx.fill();
        }
    }

    this.addPosition = function(){
        
        let ancienne = this.head;

        switch(this.direc){
            case 'right':
                this.head = [ancienne[0]+1, ancienne[1]]; 
                break;
    
            case 'left':
                this.head = [ancienne[0]-1, ancienne[1]]; 
                break;
    
            case 'up':
                this.head = [ancienne[0], ancienne[1]-1]; 
                break;
    
            case 'down':
                this.head = [ancienne[0], ancienne[1]+1]; 
                break;
        }
        this.tabPosition.unshift(this.head);
        
    }

    this.exit = function(){
        if(this.head[0] > 19 || this.head[1] > 19 || this.head[0] < 0 || this.head[1] < 0){
            return true;
        }
        return false;
    }

    this.touchYs = function(){
        for(let i=1;i<this.tabPosition.length;i++){
            if(this.head[0] == this.tabPosition[i][0] && this.head[1] == this.tabPosition[i][1] ){
                return true;
            } 
        }
        return false;
    }

    this.supFirstPosition = function(){
        var ctx = board.getContext("2d");
        let last = this.tabPosition.pop();
        ctx.clearRect(last[0]*block,last[1]*block,block,block);
    }
}

function Pomme(){
    this.pos = [Math.round(Math.random()*19),Math.round(Math.random()*19)];

    this.draw = function(){
        var ctx = board.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle="green";
        ctx.arc(this.pos[0]*block + block/2, this.pos[1]*block + block/2, (block/2)-1, 0, 2*Math.PI);
        ctx.fill();
    }

    this.reload = function(){
        this.pos = [Math.round(Math.random()*19),Math.round(Math.random()*19)];
        this.draw();
    }

    this.touchSnake = function(){
        return snake.head[0]==this.pos[0] && snake.head[1]==this.pos[1]; 
    }
}
}