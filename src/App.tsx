import { HERO_COLOR } from "./engine/const";
import { useHero, HeroControls } from "./features/HeroControls";
import { useGameCanvas, ScoreBar } from "./features/Game";

import styles from "./App.module.css";

export const App = () => {
  const leftHero = useHero(HERO_COLOR.left, "left");
  const rightHero = useHero(HERO_COLOR.right, "right");
  const gameCanvas = useGameCanvas(
    leftHero.ref.current,
    rightHero.ref.current,
    (side) => {
      if (side === "left") {
        leftHero.onHeroClick();
      } else {
        rightHero.onHeroClick();
      }
    }
  );

  return (
    <div className={styles.app}>
      <ScoreBar {...gameCanvas.scoreBarProps} />

      <HeroControls {...leftHero.controlsProps} />

      <div className={styles.canvasWrapper}>
        <canvas {...gameCanvas.canvasProps}>canvas not supported</canvas>
      </div>

      <HeroControls {...rightHero.controlsProps} />
    </div>
  );
};
