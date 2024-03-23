const canvas  = document.getElementById('myCanvas');
const ctx     = canvas.getContext('2d');
const playBtn = document.getElementById('runBtn');
let interval;

let ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    r: 10,
    dx: 2,
    dy: -2,
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgb(76 136 76)';
        ctx.fill();
        ctx.closePath();
        this.x += this.dx;
        this.y += this.dy;

        
        if ((this.x + this.dx) < 0 || (this.x + this.dx) > canvas.width) {
            this.dx = this.dx * -1;
        }

        if (this.y + this.dy < this.r) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > canvas.height - (this.r / 2)) {
            alert('GAME OVER');
            document.location.reload();
            clearInterval(interval);
        }
    }
}

let paddle = {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2,
    y: canvas.height - 10,
    dx: 7,
    rightPressed: false,
    leftPressed: false,
    draw: function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'rgb(76 136 76)';
        ctx.fill();
        ctx.closePath();

        if (this.rightPressed) {
            this.x = Math.min(this.x + this.dx, canvas.width - this.width);
        } else if (this.leftPressed) {
            this.x = Math.max(this.x - this.dx, 0);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    paddle.draw();
}

function startGame() {
    interval = setInterval(draw, 10);
    console.log(`Interval: ${interval}`);
}

playBtn.addEventListener('click', () => {
    startGame();
    playBtn.disabled = true;
    playBtn.classList.add('disabled');
});

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.leftPressed = false;
    }
}

