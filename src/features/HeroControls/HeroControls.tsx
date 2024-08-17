import { Slider } from "../../ui/Slider";
import { ColorInput } from "../../ui/ColorInput";
import {
  HERO_SPEED,
  PROJECTILES_RATE_SCALED,
  PROJECTILE_SPEED,
} from "../../engine/const";

import { type UseHeroValue } from "./HeroControls.hook";
import styles from "./HeroControls.module.css";

export const HeroControls = ({
  moveSpeed,
  setMoveSpeed,
  projectilesRateScaled,
  setProjectilesRateScaled,
  projectileMoveSpeed,
  setProjectileMoveSpeed,
  // colorMenuVisible,
  colorInputRef,
  projectileColor,
  setProjectileColor,
}: UseHeroValue["controlsProps"]) => {
  return (
    <div className={styles.heroControls}>
      <Slider
        min={HERO_SPEED.min}
        step={HERO_SPEED.step}
        max={HERO_SPEED.max}
        label={"Move speed"}
        value={moveSpeed}
        onValueChange={setMoveSpeed}
      />
      <Slider
        min={PROJECTILES_RATE_SCALED.min}
        step={PROJECTILES_RATE_SCALED.step}
        max={PROJECTILES_RATE_SCALED.max}
        label={"Projectiles rate"}
        value={projectilesRateScaled}
        displayValue={projectilesRateScaled / PROJECTILES_RATE_SCALED.scale}
        onValueChange={setProjectilesRateScaled}
      />
      <Slider
        min={PROJECTILE_SPEED.min}
        step={PROJECTILE_SPEED.step}
        max={PROJECTILE_SPEED.max}
        label={"Projectile move speed"}
        value={projectileMoveSpeed}
        onValueChange={setProjectileMoveSpeed}
      />
      <ColorInput
        ref={colorInputRef}
        value={projectileColor}
        onValueChange={setProjectileColor}
      />
    </div>
  );
};
