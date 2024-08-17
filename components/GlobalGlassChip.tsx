import React, { FC } from 'react';
import styles from './GlobalGlassChip.module.css';

const GlobalGlassChip: FC = ({ children }) => {
  return <div className={styles.globalGlassChip}>{children}</div>;
};

export default GlobalGlassChip;
