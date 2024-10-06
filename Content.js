$(document).ready(function() {


$("#back1").on("click",function(e){
    window.location.href = "Index.html";
});
});

$(document).ready(function() {

class Bird {
    constructor() {
        this.birdElement = $('#bird');
        this.positionY = $(window).height() / 2;
        this.gravity = 0;
        this.birdElement.css({ top: this.positionY });
        }
    fall() {
        this.gravity += 0.5; 
        this.positionY += this.gravity;  
        if (this.positionY >= $(window).height() - this.birdElement.height()) {
            this.positionY = $(window).height() - this.birdElement.height();
            this.gravity = 0;  
            }
        this.birdElement.css({ top: this.positionY });
    }
    jump() {
            this.gravity = -10;  
    }
}
class Pipe {
    constructor() {
    this.container = $('#gameContainer');
    this.width = $(window).width() * 0.1; 
    this.gapHeight = $(window).height() * 0.21; 
    this.pipeTop = $('<div class="pipe pipe-top"></div>');
    this.pipeBottom = $('<div class="pipe pipe-bottom"></div>');
    this.positionX = this.container.width();
    this.topHeight = Math.random() * (this.container.height() - this.gapHeight);
    this.bottomHeight = this.container.height() - this.topHeight - this.gapHeight;
    
    this.pipeTop.css({
        height: this.topHeight + 'px',
        left: this.positionX + 'px',
        width: this.width + 'px',
    });
    this.pipeBottom.css({
        height: this.bottomHeight + 'px',
        left: this.positionX + 'px',
        top: this.topHeight + this.gapHeight + 'px',
        width: this.width + 'px',
    });
    this.container.append(this.pipeTop);
    this.container.append(this.pipeBottom);
    }

move() {
    this.positionX -= 17;  
    if (this.positionX + this.width <= 0) {
        this.pipeTop.remove();
        this.pipeBottom.remove();
        } else {
            this.pipeTop.css({ left: this.positionX + 'px' });
            this.pipeBottom.css({ left: this.positionX + 'px' });
            }
        }
isOffScreen() {
    return this.positionX + this.width <= 0;
    }

checkCollision(bird) {
    const birdRect = bird.birdElement[0].getBoundingClientRect(); 
    const pipeTopRect = this.pipeTop[0].getBoundingClientRect(); 
    const pipeBottomRect = this.pipeBottom[0].getBoundingClientRect();
    if (
        birdRect.left < pipeTopRect.right &&
        birdRect.right > pipeTopRect.left &&
        (birdRect.top < pipeTopRect.bottom || birdRect.bottom > pipeBottomRect.top)
    ) {
        return true;  
        }
        return false; 
        }
    }
class Game {
    constructor() {
        this.bird = new Bird(); 
        this.pipes = [];  
        this.score = 0;  
        this.isGameOver = false;
        this.spawnPipeInterval = 0; 
        this.startGame();
        }

startGame() {
    $(document).on('keydown', (e) => {
        if (e.keyCode === 32) {  
            this.bird.jump();  
                }
            });
            this.gameLoop = setInterval(() => {
                this.update(); 
            }, 20);
        }

update() {
    this.bird.fall(); 
    if (this.spawnPipeInterval === 0) {
        this.pipes.push(new Pipe());  
        this.spawnPipeInterval = 100;  
        } else {
            this.spawnPipeInterval--;  
            }
            this.pipes = this.pipes.filter(pipe => {
                pipe.move();  
                if (pipe.checkCollision(this.bird)) {
                    this.endGame(); 
                }
                return !pipe.isOffScreen(); 
            });
            this.updateScore();
        }

endGame() {
    clearInterval(this.gameLoop);  
    this.isGameOver = true;  
    location.reload();  
    }
}
    new Game();
});


