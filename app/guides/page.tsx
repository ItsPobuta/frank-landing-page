/** biome-ignore-all assist/source/organizeImports: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
'use client'

import { BookFooter } from '@/components/book-footer'
import { GuidesNav } from '@/components/guides-nav'
import { useState } from 'react'
import type { Checklist, Entry, Section } from './data'
import { groups } from './data'

// ── RENDERERS ─────────────────────────────────────────────────────────────────

function EntryRow({ entry }: { entry: Entry }) {
  if (entry.type === 'checkbox') {
    return (
      <div className="flex gap-3 py-2.5 border-b border-(--rule) last:border-b-0">
        <span className="shrink-0 mt-[0.15rem] w-4 h-4 border border-(--mid) inline-block print:border-black" />
        <div>
          <p className="text-[0.9rem] text-(--black) leading-[1.55]">
            {entry.text}
          </p>
          {entry.note && (
            <p className="text-[0.78rem] italic text-(--light) mt-0.5 leading-[1.4]">
              {entry.note}
            </p>
          )}
        </div>
      </div>
    )
  }

  if (entry.type === 'field') {
    return (
      <div className="py-3 border-b border-(--rule) last:border-b-0 print:border-b-0">
        <p className="text-[0.72rem] font-semibold tracking-widest uppercase text-(--light) mb-1">
          {entry.label}
        </p>
        <div className="hidden print:block w-full h-px bg-black mt-4" />
      </div>
    )
  }

  if (entry.type === 'table') {
    return (
      <div className="overflow-x-auto my-2">
        <table className="w-full text-[0.85rem] border-collapse">
          <thead>
            <tr className="border-b border-(--rule)">
              {entry.headers.map(h => (
                <th
                  key={h}
                  className="text-left py-2 pr-6 text-[0.72rem] font-semibold tracking-widest uppercase text-(--light)"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entry.rows.map((row, i) => (
              <tr key={i} className="border-b border-(--rule) last:border-b-0">
                {row.map((cell, j) => (
                  <td key={j} className="py-3 pr-6 text-(--mid) leading-normal">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (entry.type === 'callout') {
    return (
      <div className="border-l-2 border-(--black) pl-5 py-2 my-2">
        <p className="[font-family:var(--serif)] italic text-[1.05rem] text-(--black) leading-[1.6]">
          {entry.text}
        </p>
      </div>
    )
  }

  return null
}

function SectionBlock({ section }: { section: Section }) {
  return (
    <div className="mb-8">
      {section.title && (
        <h3 className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-(--light) mb-4 pb-2 border-b border-(--rule)">
          {section.title}
        </h3>
      )}
      <div>
        {section.entries.map((entry, i) => (
          <EntryRow key={i} entry={entry} />
        ))}
      </div>
    </div>
  )
}

function ChecklistView({
  checklist,
  onBack,
}: {
  checklist: Checklist
  onBack: () => void
}) {
  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between mb-10 print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="text-[0.72rem] font-medium tracking-widest uppercase text-(--mid) hover:text-(--black) transition-colors duration-150 flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-(--white) bg-(--black) py-[0.55rem] px-[1.3rem] border-0 cursor-pointer transition-opacity duration-200 hover:opacity-75"
        >
          Print this checklist
        </button>
      </div>

      {/* Print header */}
      <div className="hidden print:block mb-8">
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-(--light) mb-2">
          frank. — Free Checklist Toolkit · whatsfrank.com/guides
        </p>
        <div className="w-full h-px bg-black mb-4" />
      </div>

      {/* Title */}
      <div className="mb-10">
        <h2 className="font-bold text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-(--black) mb-3">
          {checklist.title}
        </h2>
        <p className="[font-family:var(--serif)] italic text-(--mid) text-[1.05rem] leading-[1.6] max-w-160">
          {checklist.subtitle}
        </p>
      </div>

      {/* Header fields */}
      {checklist.headerFields && checklist.headerFields.length > 0 && (
        <div className="grid grid-cols-1 gap-6 mb-10 max-w-120">
          {checklist.headerFields.map(f => (
            <div key={f}>
              <p className="text-[0.72rem] font-semibold tracking-widest uppercase text-(--light) mb-1">
                {f}
              </p>
              <div className="w-full h-px bg-(--mid) opacity-40 mt-4 print:opacity-100" />
            </div>
          ))}
        </div>
      )}

      {/* Sections */}
      <div>
        {checklist.sections.map((section, i) => (
          <SectionBlock key={i} section={section} />
        ))}
      </div>

      {/* Print footer */}
      <div className="hidden print:block mt-12 pt-4 border-t border-black">
        <p className="text-[0.65rem] tracking-[0.12em] uppercase text-(--light)">
          frank. The Care Navigator · whatsfrank.com · © 2026 frank.
        </p>
      </div>
    </div>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function GuidesPage() {
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0].id)
  const [selectedChecklistId, setSelectedChecklistId] = useState<string | null>(
    null
  )

  const selectedGroup = groups.find(g => g.id === selectedGroupId)!
  const selectedChecklist = selectedChecklistId
    ? (selectedGroup.checklists.find(c => c.id === selectedChecklistId) ?? null)
    : null

  function selectGroup(id: string) {
    setSelectedGroupId(id)
    setSelectedChecklistId(null)
  }

  function selectChecklist(id: string) {
    setSelectedChecklistId(id)
  }

  function handleBack() {
    setSelectedChecklistId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-(--bg)">
      <GuidesNav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-12 border-b border-(--rule) max-[900px]:pt-24 max-[900px]:pb-12 max-[900px]:px-6 print:hidden">
        <div className="max-w-300 mx-auto">
          <p className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-(--light) mb-6">
            For Families &nbsp;·&nbsp; Free Checklist Toolkit
          </p>
          <div className="w-full h-px bg-(--rule) mb-10" />
          <div className="grid grid-cols-2 gap-20 items-end max-[900px]:grid-cols-1 max-[900px]:gap-8">
            <h1 className="font-bold text-[clamp(2.2rem,5vw,3.5rem)] tracking-[-0.035em] leading-[0.96] text-(--black)">
              Print them.{' '}
              <em className="italic [font-family:var(--serif)] font-normal">
                Write all over them.
              </em>
            </h1>
            <p className="text-[0.95rem] font-light text-(--mid) leading-[1.8]">
              12 checklists and reference cards for every level of care —
              facility tours, agency evaluations, Medicare, finances, and
              resident rights. Select any checklist and print it. That&apos;s
              what they&apos;re for.
            </p>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE AREA ──────────────────────────────────────────────── */}
      <section className="px-12 py-16 md:min-h-[85vh] min-h-screen max-[900px]:px-6 max-[900px]:py-12">
        <div className="max-w-300 mx-auto">
          {/* Group tabs */}
          {!selectedChecklist && (
            <div className="flex flex-col md:flex-row border border-(--rule) mb-12 print:hidden md:w-fit">
              {groups.map(g => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => selectGroup(g.id)}
                  className={[
                    'px-6 py-3.5 text-[0.72rem] font-semibold tracking-widest uppercase text-left md:text-center border-b border-(--rule) last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 transition-colors duration-150 cursor-pointer bg-transparent',
                    selectedGroupId === g.id
                      ? 'bg-(--black) text-black'
                      : 'text-(--mid) hover:text-(--black) hover:bg-(--bg-warm2)',
                  ].join(' ')}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}

          {/* Checklist cards */}
          {!selectedChecklist && (
            <div className="grid grid-cols-2 gap-px bg-(--rule) border border-(--rule) max-[700px]:grid-cols-1">
              {selectedGroup.checklists.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => selectChecklist(c.id)}
                  className="bg-(--bg) px-8 py-8 text-left hover:bg-(--bg-warm2) transition-colors duration-150 cursor-pointer border-0"
                >
                  <h3 className="font-bold text-[1.05rem] tracking-[-0.01em] text-(--black) mb-2">
                    {c.title}
                  </h3>
                  <p className="text-[0.82rem] text-(--mid) leading-[1.55]">
                    {c.subtitle}
                  </p>
                  <p className="text-[0.72rem] font-semibold tracking-widest uppercase text-(--light) mt-5">
                    View &amp; Print →
                  </p>
                </button>
              ))}
            </div>
          )}

          {/* Checklist view */}
          {selectedChecklist && (
            <ChecklistView checklist={selectedChecklist} onBack={handleBack} />
          )}
        </div>
      </section>

      <div className="print:hidden">
        <BookFooter />
      </div>
    </div>
  )
}
