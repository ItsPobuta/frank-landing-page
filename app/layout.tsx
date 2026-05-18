import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  axes: ['opsz'],
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: "frank. — Senior Care's Credentialed Trust Infrastructure",
  description:
    'Frank is the institutional trust layer senior care has never had. A governed credentialing standard, built from the board out.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(dmSans.variable, dmSerifDisplay.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  )
}
