import type { Metadata } from 'next'

const title = 'frank. — Free Senior Care Checklists & Guides'
const description =
  'Free, practical checklists for touring, evaluating, and choosing senior care — built from the same data as the Frank Trust Index.'
const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/guides-img.png`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/guides`,
    images: [{ url: imageUrl }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl],
  },
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
