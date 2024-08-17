import React, { FC } from 'react';
import styles from './GlassChip.module.css';

const GlassChip: FC = ({ children }) => {
  return <div className={styles.glassChip}>{children}</div>;
};

export default GlassChip;
