import React, { FC, ReactNode } from 'react';
import styles from './GlassChip.module.css';

const GlassChip: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.glassChip}>{children}</div>;
};

export default GlassChip;
