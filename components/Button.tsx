import { FC, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
import GlassChip from './GlassChip';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = (props) => {
  return (
    <GlassChip>
      <button type="button" className={styles.btn} {...props} />
    </GlassChip>
  );
};

export default Button;
