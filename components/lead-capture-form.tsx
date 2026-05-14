const ctaLinks = [
  {
    label: 'Governing Board',
    title: "I'm interested in a board seat",
    href: 'mailto:board@whatsfrank.com',
  },
  {
    label: 'Charter Membership',
    title: 'I want to get credentialed as a member',
    href: 'mailto:membership@whatsfrank.com',
  },
  {
    label: 'General Information',
    title: "I'd like to learn more and talk about it",
    href: 'mailto:info@whatsfrank.com',
  },
  {
    label: 'Families & Consumers',
    title: "I'm a family member looking for guidance",
    href: 'mailto:hello@whatsfrank.com',
  },
]

export function LeadCaptureForm() {
  return (
    <div className="flex flex-col gap-px">
      {ctaLinks.map(link => (
        <a
          key={link.label}
          href={link.href}
          className="group flex items-center justify-between py-[1.3rem] px-[1.6rem] bg-(--white) border border-(--rule) mb-2 text-(--black) no-underline transition-[background,border-color] duration-[200ms] hover:bg-(--bg) hover:border-(--mid)"
        >
          <div>
            <span className="text-[0.68rem] font-medium tracking-[0.13em] uppercase text-(--light) block mb-1">
              {link.label}
            </span>
            <span className="text-[0.95rem] font-medium tracking-[-0.01em] text-(--black)">
              {link.title}
            </span>
          </div>
          <span className="text-[1.1rem] text-(--light) transition-[color,transform] duration-[200ms] group-hover:text-(--black) group-hover:translate-x-[5px]">
            →
          </span>
        </a>
      ))}
    </div>
  )
}
