import { Vector } from "../utils/vector";

export class Enemy {
  position: Vector;
  movementSpeed: number;
  color: string;
  width: number;
  height: number;
  direction: Vector;

  constructor(
    initialX: number,
    initialY: number,
    speed: number,
    width: number,
    height: number
  ) {
    this.position = new Vector(initialX, initialY);
    this.movementSpeed = speed;
    this.width = width;
    this.height = height;
    this.color = "Blue";
    this.direction = new Vector();
  }

  updatePosition(targetX: number, targetY: number) {
    this.direction.set(targetX - this.position.x, targetY - this.position.y);
    this.direction.normalize();
    this.direction.multiply(this.movementSpeed);
    this.position.add(this.direction);
  }

  drawEnemy(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
