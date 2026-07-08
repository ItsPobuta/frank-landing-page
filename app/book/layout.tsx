import type { Metadata } from 'next'

const title = 'frank. — The Care Navigator Book'
const description = 'The most comprehensive book on senior care ever written.'
const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/book-img-v4.webp`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/book`,
    images: [{ url: imageUrl, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [{ url: imageUrl, width: 1200, height: 630 }],
  },
}

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
