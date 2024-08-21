import { FC, ChangeEvent } from 'react';
import styles from './ToggleButtonOptions.module.css';

interface ToggleButtonOption {
  label: string;
  value: string;
}

interface ToggleButtonOptionsProps {
  options: ToggleButtonOption[];
  selectedValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ToggleButtonOptions: FC<ToggleButtonOptionsProps> = ({ options, selectedValue, onChange }) => {
  return (
    <div className={styles.toggleButtonOptions}>
      {options.map((option) => (
        <label key={option.value} className={styles.toggleButton}>
          <input
            type="radio"
            name="toggleButtonOption"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default ToggleButtonOptions;
