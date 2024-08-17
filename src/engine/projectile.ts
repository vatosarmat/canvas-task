import { Circle, type Point, type Direction } from "./circle";
import { CANVAS_SIZE, PROJECTILE_RADIUS } from "./const";

export class Projectile extends Circle {
  constructor(
    color: string,
    center: Point,
    private readonly moveSpeed: number,
    private readonly moveDirection: Direction
  ) {
    super(PROJECTILE_RADIUS, color, center);
  }

  animateXMovement(durationMs: number) {
    const delta = (this.moveSpeed * this.moveDirection * durationMs) / 1000;
    this.center.x += delta;
  }

  isOutOfCanvas() {
    //all sides of the rect are visible
    //ctx.strokeRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
    return (
      this.rightEdge.x < 0 ||
      this.leftEdge.x > CANVAS_SIZE.width ||
      this.topEdge.y > CANVAS_SIZE.height ||
      this.bottomEdge.y < 0
    );
  }
}
