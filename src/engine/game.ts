import { type Point } from "./circle";
import { Hero } from "./hero";
import { HERO_RADIUS, CANVAS_SIZE } from "./const";

export type GameEvent =
  | {
      type: "opponent_hit";
      source: "left" | "right";
      count: number;
    }
  | {
      type: "mouse_click";
      source: "left" | "right";
    };

export class Game {
  private timestamp = Date.now();

  public mouseHoverPoint: Point | null = null;
  public mouseClickPoint: Point | null = null;

  constructor(
    readonly leftHero: Hero,
    readonly rightHero: Hero,
    readonly onEvent: (event: GameEvent) => void
  ) {}

  private render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

    // this.renderMouseHover(ctx);
    this.leftHero.render(ctx);
    this.rightHero.render(ctx);
  }

  private handleMouseClick() {
    const heroDiameter = 2 * HERO_RADIUS;
    if (this.mouseClickPoint) {
      if (
        0 <= this.mouseClickPoint.x &&
        this.mouseClickPoint.x <= heroDiameter
      ) {
        this.onEvent({
          type: "mouse_click",
          source: "left",
        });
      }

      if (
        CANVAS_SIZE.width - heroDiameter <= this.mouseClickPoint.x &&
        this.mouseClickPoint.x <= CANVAS_SIZE.width
      ) {
        this.onEvent({
          type: "mouse_click",
          source: "right",
        });
      }
    }

    this.mouseClickPoint = null;
  }

  run(ctx: CanvasRenderingContext2D) {
    console.log("Game.run");

    this.timestamp = Date.now();

    this.render(ctx);

    const animate = () => {
      const now = Date.now();
      const durationMs = now - this.timestamp;
      this.timestamp = now;

      this.handleMouseClick();

      this.leftHero.animate(durationMs, this.mouseHoverPoint);
      this.rightHero.animate(durationMs, this.mouseHoverPoint);

      const leftStatus = this.leftHero.updateProjectiles(this.rightHero);
      const rightStatus = this.rightHero.updateProjectiles(this.leftHero);

      if (leftStatus.opponentHitsCount > 0) {
        this.rightHero.wasHit();
        this.onEvent({
          type: "opponent_hit",
          source: "left",
          count: leftStatus.opponentHitsCount,
        });
      }

      if (rightStatus.opponentHitsCount > 0) {
        this.leftHero.wasHit();
        this.onEvent({
          type: "opponent_hit",
          source: "right",
          count: rightStatus.opponentHitsCount,
        });
      }

      this.render(ctx);

      window.requestAnimationFrame(animate);
    };

    animate();
  }
}
