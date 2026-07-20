'use client'

import { useOnlineStatus } from '@schleegleixner/react-statamic-api'

export default function OfflineBanner() {
  const is_online = useOnlineStatus()

  if (is_online) {
    return null
  }

  return (
    <div className="inset-x-0 top-0 z-50 bg-amber-500 px-4 py-1.5 text-center text-sm font-medium text-white shadow">
      Offline – die angezeigten Daten sind möglicherweise veraltet.
    </div>
  )
}
