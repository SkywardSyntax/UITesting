import styles from './Button.module.css'
import GlassChip from './GlassChip'

export default function Button(props) {
  return (
    <GlassChip>
      <button type="button" className={styles.btn} {...props} />
    </GlassChip>
  )
}
