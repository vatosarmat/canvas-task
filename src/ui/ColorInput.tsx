import { forwardRef, type ForwardedRef } from "react";

import styles from "./ColorInput.module.css";

export type ColorInputProps = {
  value: string;
  onValueChange: (v: string) => void;
};

export const ColorInput = forwardRef(
  (
    { value, onValueChange }: ColorInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <div className={styles.remark}>
          Click on hero lane to show color input
        </div>
        <input
          className={styles.colorInput}
          ref={ref}
          type="color"
          value={value}
          onChange={(evt) => {
            const value = evt.currentTarget.value;
            console.log(`color value: ${value}`);
            onValueChange(value);
          }}
        />
      </div>
    );
  }
);
