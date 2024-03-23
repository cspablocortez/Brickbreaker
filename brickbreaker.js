const canvas  = document.getElementById('myCanvas');
const ctx     = canvas.getContext('2d');
const playBtn = document.getElementById('runBtn');

let ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    r: 10,
    dx: 2,
    dy: -2,
    draw: function() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgb(76 136 76)'
        ctx.fill()
        ctx.closePath()
        this.x += this.dx
        this.y += this.dy

        if ((this.y + this.dy) < 0 || (this.y + this.dy) > canvas.height) {
            this.dy = this.dy * -1
        }

        if ((this.x + this.dx) < 0 || (this.x + this.dx) > canvas.width) {
            this.dx = this.dx * -1
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
}

function startGame() {
    const interval = setInterval(draw, 10);
    console.log(`Interval: ${interval}`);
}

playBtn.addEventListener('click', () => {
    startGame();
    playBtn.disabled = true;
    playBtn.classList.add('disabled');
})