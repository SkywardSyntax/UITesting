import { useCallback, useState, FC } from 'react'
import Button from './Button'

const ClickCount: FC = () => {
  const [count, setCount] = useState<number>(0)
  const increment = useCallback(() => {
    setCount((v) => v + 1)
  }, [setCount])

  return <Button onClick={increment}>Clicks: {count}</Button>
}

export default ClickCount
