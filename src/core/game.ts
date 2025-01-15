import { Enemy } from "../entities/enemy";

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private enemies: Enemy[];
  private mousePositionX: number;
  private mousePositionY: number;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!;
    this.enemies = [];
    this.mousePositionX = 1;
    this.mousePositionY = 1;

    this.initializeEnemies();
    this.setupMouseListeners();
    this.gameUpdateLoop();
  }

  private initializeEnemies() {
    const width = 1;
    const height = 1;

    for (let i = 1; i < 10000; i++) {
      this.enemies.push(new Enemy(i, 0, Math.random() * 99  + 1, width, height));
      this.enemies.push(new Enemy(0, i, Math.random() * 99  + 1, width, height));
      this.enemies.push(
        new Enemy(i * -1, 0, Math.random() * 99  + 1, width, height)
      );
      this.enemies.push(
        new Enemy(0, i * -1, Math.random() * 99  + 1, width, height)
      );
    }
  }

  private setupMouseListeners() {
    this.canvas.addEventListener("mousemove", (event: MouseEvent) => {
      const canvasRect = this.canvas.getBoundingClientRect();
      this.mousePositionX = event.clientX - canvasRect.left;
      this.mousePositionY = event.clientY - canvasRect.top;
    });
  }

  private gameUpdateLoop = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let enemy of this.enemies) {
      enemy.updatePosition(this.mousePositionX, this.mousePositionY);
      enemy.drawEnemy(this.context);
    }

    requestAnimationFrame(this.gameUpdateLoop);
  };
}
