import { useEffect, useState } from 'react'

type Device = 'desktop' | 'tablet' | 'mobile'

function getDevice(width: number): Device {
  if (width > 1024) {
    return 'desktop'
  }
  if (width > 768) {
    return 'tablet'
  }
  return 'mobile'
}

export default function useDevice(): Device {
  const [device, setDevice] = useState<Device>(() =>
    typeof window === 'undefined' ? 'desktop' : getDevice(window.innerWidth),
  )

  useEffect(() => {
    const handleResize = () => setDevice(getDevice(window.innerWidth))
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return device
}
