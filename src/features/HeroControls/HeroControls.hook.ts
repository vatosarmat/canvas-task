import { useRef, useState } from "react";

import { Hero } from "../../engine/hero";
import {
  HERO_SPEED,
  PROJECTILES_RATE_SCALED,
  PROJECTILE_SPEED,
} from "../../engine/const";

export const useHero = (color: string, side: "left" | "right") => {
  const heroRef = useRef(
    new Hero(
      color,
      side,
      HERO_SPEED.default,
      PROJECTILE_SPEED.default,
      PROJECTILES_RATE_SCALED.default / PROJECTILES_RATE_SCALED.scale
    )
  );

  const [moveSpeed, _setMoveSpeed] = useState(HERO_SPEED.default);
  const [projectilesRateScaled, _setProjectilesRateScaled] = useState(
    PROJECTILES_RATE_SCALED.default
  );
  const [projectileMoveSpeed, _setProjectileMoveSpeed] = useState(
    PROJECTILE_SPEED.default
  );
  // const [colorMenuVisible, _setColorMenuVisible] = useState(false);

  const colorInputRef = useRef<HTMLInputElement>(null);

  const [projectileColor, _setProjectileColor] = useState(color);

  const setMoveSpeed = (moveSpeed: number) => {
    heroRef.current.moveSpeed = moveSpeed;
    _setMoveSpeed(moveSpeed);
  };

  const setProjectilesRateScaled = (projectilesRateScaled: number) => {
    heroRef.current.projectilesRate =
      projectilesRateScaled / PROJECTILES_RATE_SCALED.scale;
    _setProjectilesRateScaled(projectilesRateScaled);
  };

  const setProjectileMoveSpeed = (projectileMoveSpeed: number) => {
    heroRef.current.projectileMoveSpeed = projectileMoveSpeed;
    _setProjectileMoveSpeed(projectileMoveSpeed);
  };

  const onHeroClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
    // _setColorMenuVisible((v) => !v);
  };

  const setProjectileColor = (projectileColor: string) => {
    heroRef.current.projectileColor = projectileColor;
    _setProjectileColor(projectileColor);
  };

  return {
    controlsProps: {
      moveSpeed,
      projectilesRateScaled,
      projectileMoveSpeed,
      projectileColor,
      // colorMenuVisible,
      colorInputRef,

      setMoveSpeed,
      setProjectilesRateScaled,
      setProjectileMoveSpeed,
      setProjectileColor,
    },

    ref: heroRef,

    onHeroClick,
  };
};

export type UseHeroValue = ReturnType<typeof useHero>;
