export class Vector {
    x: number;
    y: number;
  
    constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
    }
  
    set(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    add(vector: Vector) {
      this.x += vector.x;
      this.y += vector.y;
    }
  
    subtract(vector: Vector) {
      this.x -= vector.x;
      this.y -= vector.y;
    }
  
    multiply(scalar: number) {
      this.x *= scalar;
      this.y *= scalar;
    }
  
    magnitude() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  
    normalize() {
      const mag = this.magnitude();
      if (mag !== 0) {
        this.x /= mag;
        this.y /= mag;
      }
    }
  
    static fromAngle(angle: number) {
      return new Vector(Math.cos(angle), Math.sin(angle));
    }
  }
  