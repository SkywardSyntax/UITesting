import { useCallback, useState, FC } from 'react'
import Button from './Button'
import GlassChip from './GlassChip'

const ClickCount: FC = () => {
  const [count, setCount] = useState<number>(0)
  const increment = useCallback(() => {
    setCount((v) => v + 1)
  }, [setCount])

  return (
    <GlassChip>
      <Button onClick={increment}>Clicks: {count}</Button>
    </GlassChip>
  )
}

export default ClickCount
