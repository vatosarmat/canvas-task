import { HERO_COLOR } from "../../engine/const";

import { type UseGameCanvasValue } from "./GameCanvas.hook";
import styles from "./ScoreBar.module.css";

export const ScoreBar = ({
  leftScore,
  rightScore,
}: UseGameCanvasValue["scoreBarProps"]) => {
  return (
    <div className={styles.scoreBar}>
      <div className={styles.scoreBarScore} style={{ color: HERO_COLOR.left }}>
        {leftScore}
      </div>
      <div />
      <div className={styles.scoreBarScore} style={{ color: HERO_COLOR.right }}>
        {rightScore}
      </div>
    </div>
  );
};
