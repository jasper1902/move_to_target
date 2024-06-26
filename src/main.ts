import "./style.css";
const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const canvasContext = gameCanvas.getContext("2d");

class Enemy {
  posX: number;
  posY: number;
  movementSpeed: number;
  color: string;
  width: number;
  height: number;

  constructor(
    initialX: number,
    initialY: number,
    speed: number,
    width: number,
    height: number
  ) {
    this.posX = initialX;
    this.posY = initialY;
    this.movementSpeed = speed;
    this.width = width;
    this.height = height;
    this.color = "Blue";
  }

  updatePosition(targetX: number, targetY: number) {
    const center = {
      x: this.posX + this.width / 2,
      y: this.posY + this.height / 2,
    };
    const deltaX = targetX - center.x;
    const deltaY = targetY - center.y;
    const angle = Math.atan2(deltaY, deltaX);

    this.posX += Math.cos(angle) * this.movementSpeed;
    this.posY += Math.sin(angle) * this.movementSpeed;
  }

  drawEnemy(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.posX, this.posY, this.width, this.height);
  }
}

const enemyList: Enemy[] = [];
const width = 1;
const height = 1;
for (let i = 1; i < 10000; i++) {
  enemyList.push(new Enemy(i, 0, Math.random() * 3 + 1, width, height));
  enemyList.push(new Enemy(0, i, Math.random() * 3 + 1, width, height));
  enemyList.push(new Enemy(i * -1, 0, Math.random() * 3 + 1, width, height));
  enemyList.push(new Enemy(0, i * -1, Math.random() * 3 + 1, width, height));
}

let mousePositionX = 1;
let mousePositionY = 1;

const updateMousePosition = (event: MouseEvent) => {
  const canvasRect = gameCanvas.getBoundingClientRect();
  mousePositionX = event.clientX - canvasRect.left;
  mousePositionY = event.clientY - canvasRect.top;
};
gameCanvas.addEventListener("mousemove", updateMousePosition);

function gameUpdateLoop() {
  if (canvasContext) {
    canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    enemyList.forEach((enemy) => {
      enemy.updatePosition(mousePositionX, mousePositionY);
      enemy.drawEnemy(canvasContext);
    });
  }
  requestAnimationFrame(gameUpdateLoop);
}

requestAnimationFrame(gameUpdateLoop);
