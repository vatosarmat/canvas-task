import styles from "./Slider.module.css";

export type SliderProps = {
  value: number;
  displayValue?: number;
  onValueChange: (v: number) => void;
  label: string;
  min: number;
  max: number;
  step: number;
};

export const Slider = ({
  label,
  value,
  displayValue = value,
  onValueChange,
  ...rangeProps
}: SliderProps) => {
  return (
    <div className={styles.slider}>
      <div className={styles.sliderLabel}>
        <div>{label}</div>
        <div>{displayValue}</div>
      </div>
      <input
        {...rangeProps}
        type="range"
        value={value}
        onChange={(evt) => {
          onValueChange(parseInt(evt.currentTarget.value));
        }}
      />
    </div>
  );
};
