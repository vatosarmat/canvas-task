import { useRef, useState, type ComponentPropsWithRef } from "react";

import { Hero } from "../../engine/hero";
import { type GameEvent, Game } from "../../engine/game";
import { CANVAS_SIZE } from "../../engine/const";

export const useGameCanvas = (
  leftHero: Hero,
  rightHero: Hero,
  onHeroClick: (which: "left" | "right") => void
) => {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  const gameRef = useRef(
    new Game(leftHero, rightHero, (event: GameEvent) => {
      console.log(event);
      switch (event.type) {
        case "opponent_hit": {
          if (event.source === "left") {
            setLeftScore((v) => v + event.count);
          } else if (event.source === "right") {
            setRightScore((v) => v + event.count);
          }
          break;
        }
        case "mouse_click": {
          onHeroClick(event.source);
          break;
        }
      }
    })
  );

  const canvasRef = useRef<HTMLCanvasElement>();

  const canvasCb = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || canvasRef.current) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    canvasRef.current = canvas;

    gameRef.current.run(ctx);
  };

  type CanvasProps = ComponentPropsWithRef<"canvas">;

  return {
    scoreBarProps: { leftScore, rightScore },
    canvasProps: {
      width: CANVAS_SIZE.width,
      height: CANVAS_SIZE.height,
      ref: canvasCb,
      onClick: (evt) => {
        const rect = evt.currentTarget.getBoundingClientRect();
        gameRef.current.mouseClickPoint = {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top,
        };
      },
      onMouseEnter: (evt) => {
        const rect = evt.currentTarget.getBoundingClientRect();
        gameRef.current.mouseHoverPoint = {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top,
        };
      },
      onMouseMove: (evt) => {
        const rect = evt.currentTarget.getBoundingClientRect();
        gameRef.current.mouseHoverPoint = {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top,
        };
      },
      onMouseLeave: () => {
        gameRef.current.mouseHoverPoint = null;
      },
    } satisfies CanvasProps,
    gameRef,
  };
};

export type UseGameCanvasValue = ReturnType<typeof useGameCanvas>;
