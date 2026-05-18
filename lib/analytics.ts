'use client'

import { sendGAEvent } from '@next/third-parties/google'

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

export function isAnalyticsEnabled(): boolean {
  return process.env.NODE_ENV === 'production' && !!GA_MEASUREMENT_ID
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (!isAnalyticsEnabled()) return
  sendGAEvent('event', name, params)
}
