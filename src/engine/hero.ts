import { Projectile } from "./projectile";
import { Circle, type Point, type Direction } from "./circle";
import { HERO_RADIUS, CANVAS_SIZE } from "./const";

export class Hero extends Circle {
  private readonly projectileDirection: Direction;
  private projectileReady = 0;
  private projectiles: Set<Projectile> = new Set();

  public projectileColor: string;
  public moveDirection: Direction;
  constructor(
    color: string,
    side: "left" | "right",
    public moveSpeed: number,
    public projectileMoveSpeed: number,
    public projectilesRate: number
  ) {
    super(
      HERO_RADIUS,
      color,
      {
        left: { x: HERO_RADIUS, y: HERO_RADIUS },
        right: {
          x: CANVAS_SIZE.width - HERO_RADIUS,
          y: CANVAS_SIZE.height - HERO_RADIUS,
        },
      }[side]
    );
    this.projectileColor = color;

    if (side === "left") {
      this.projectileDirection = 1;
      this.moveDirection = 1;
    } else {
      this.projectileDirection = -1;
      this.moveDirection = -1;
    }

    this.castProjectile();
  }

  private castProjectile() {
    this.projectiles.add(
      new Projectile(
        this.projectileColor,
        {
          ...this.center,
          x: this.center.x + this.projectileDirection * this.radius,
        },
        this.projectileMoveSpeed,
        this.projectileDirection
      )
    );
  }

  private getOutOfMouse(mousePoint: Point | null) {
    if (!mousePoint) {
      return;
    }

    if (!this.hasIntersectionWithPoint(mousePoint)) {
      return;
    }

    if (this.center.y < mousePoint.y) {
      this.center.y = mousePoint.y - this.radius;
      this.moveDirection = -1;
    } else {
      this.center.y = mousePoint.y + this.radius;
      this.moveDirection = 1;
    }
  }

  private getOutOfCanvasBorder() {
    if (this.bottomEdge.y > CANVAS_SIZE.height) {
      const overmove = this.bottomEdge.y - CANVAS_SIZE.height;
      this.center.y -= overmove * 2;
      this.moveDirection = this.moveDirection === 1 ? -1 : 1;
    } else if (this.topEdge.y < 0) {
      const overmove = 0 - this.topEdge.y;
      this.center.y += overmove * 2;
      this.moveDirection = this.moveDirection === 1 ? -1 : 1;
    }
  }

  private animateProjectiles(durationMs: number) {
    for (const proj of this.projectiles) {
      proj.animateXMovement(durationMs);
    }

    const delta = (this.projectilesRate * durationMs) / 1000;
    this.projectileReady += delta;

    if (this.projectileReady > 1) {
      // console.log(this.projectileReady);
      this.castProjectile();
      this.projectileReady %= 1;
    }
  }

  private animateYMovement(durationMs: number, mouseHoverPoint: Point | null) {
    this.getOutOfMouse(mouseHoverPoint);

    if (this.moveSpeed > 0) {
      const delta =
        ((this.moveSpeed * this.moveDirection * durationMs) / 1000) %
        CANVAS_SIZE.height;
      this.center.y += delta;
    }

    this.getOutOfCanvasBorder();
  }

  public wasHit() {
    this.blinkFrames = 3;
  }

  animate(durationMs: number, mouseHoverPoint: Point | null) {
    this.animateYMovement(durationMs, mouseHoverPoint);
    return this.animateProjectiles(durationMs);
  }

  updateProjectiles(opponent: Circle) {
    const result = { opponentHitsCount: 0 };

    const removeSet = new Set<Projectile>();
    for (const proj of this.projectiles) {
      if (proj.hasIntersectionWithCircle(opponent)) {
        result.opponentHitsCount++;
        removeSet.add(proj);
      } else if (proj.isOutOfCanvas()) {
        removeSet.add(proj);
      }
    }

    for (const proj of removeSet) {
      this.projectiles.delete(proj);
    }

    return result;
  }

  render(ctx: CanvasRenderingContext2D) {
    super.render(ctx);
    for (const p of this.projectiles) {
      p.render(ctx);
    }
  }
}
