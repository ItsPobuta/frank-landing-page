export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-(--bg) flex items-center justify-center px-6">
      <div className="max-w-lg w-full border border-(--rule) bg-(--white) p-16 text-center">
        <p className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-(--light) mb-8">
          Frank Care Navigator &nbsp;·&nbsp; Purchase Confirmed
        </p>
        <div className="w-full h-px bg-(--rule) mb-10" />
        <h1 className="font-bold text-[2rem] tracking-[-0.03em] text-(--black) leading-tight mb-6">
          Thank you for your purchase.
        </h1>
        <p className="text-[0.9rem] font-light text-(--mid) leading-[1.8] mb-10">
          You will receive an email shortly with your download link. If you have
          any questions, reach us at{' '}
          <a
            href="mailto:hello@whatsfrank.com"
            className="text-(--black) underline underline-offset-2"
          >
            hello@whatsfrank.com
          </a>
          .
        </p>
        <a href="/" className="btn-primary">
          Return to Frank
        </a>
      </div>
    </div>
  )
}
