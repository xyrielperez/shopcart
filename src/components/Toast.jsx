import { useEffect, useRef } from 'react'
import './Toast.css'

export default function Toast({ message, onClose }) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const t = setTimeout(() => onCloseRef.current(), 2500)
    return () => clearTimeout(t)
  }, [])

  return <div className="toast">✅ {message}</div>
}
