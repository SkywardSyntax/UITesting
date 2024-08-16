import React from 'react';
import styles from './GlassChip.module.css';

const GlassChip = ({ children }) => {
  return <div className={styles.glassChip}>{children}</div>;
};

export default GlassChip;
