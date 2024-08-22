import React, { FC, ReactNode } from 'react';
import styles from './GlobalGlassChip.module.css';

const GlobalGlassChip: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.globalGlassChip}>{children}</div>;
};

export default GlobalGlassChip;
