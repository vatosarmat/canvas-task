export type Point = {
  x: number;
  y: number;
};

export type Direction = 1 | -1;

export class Circle {
  private renderCounter = 0;
  protected blinkFrames = 0;
  constructor(
    protected readonly radius: number,
    protected readonly color: string,
    protected center: Point
  ) {}

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    if (this.blinkFrames > 0 && this.renderCounter % 2 === 0) {
      ctx.fillStyle = "#ffffff";
      this.blinkFrames--;
    } else {
      ctx.fillStyle = this.color;
    }
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    this.renderCounter++;
  }

  get topEdge() {
    return { y: this.center.y - this.radius };
  }

  get leftEdge() {
    return { x: this.center.x - this.radius };
  }

  get bottomEdge() {
    return { y: this.center.y + this.radius };
  }

  get rightEdge() {
    return { x: this.center.x + this.radius };
  }

  hasIntersectionWithCircle(otherCircle: Circle) {
    const hypo = Math.sqrt(
      (this.center.x - otherCircle.center.x) ** 2 +
        (this.center.y - otherCircle.center.y) ** 2
    );

    return hypo < this.radius + otherCircle.radius;
  }

  hasIntersectionWithPoint(point: Point) {
    const hypo = Math.sqrt(
      (this.center.x - point.x) ** 2 + (this.center.y - point.y) ** 2
    );

    return hypo < this.radius;
  }
}
