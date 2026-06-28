export type Entry =
  | { type: 'checkbox'; text: string; note?: string }
  | { type: 'field'; label: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; text: string }

export type Section = {
  title?: string
  entries: Entry[]
}

export type Checklist = {
  id: string
  title: string
  subtitle: string
  headerFields?: string[]
  sections: Section[]
}

export type Group = {
  id: string
  label: string
  checklists: Checklist[]
}

export const groups: Group[] = [
  {
    id: 'tour',
    label: 'Tour Checklists',
    checklists: [
      {
        id: 'pre-tour',
        title: 'Pre-Tour Data Review',
        subtitle:
          'Complete this before every tour. Takes 20 minutes. Saves families from facilities they would have regretted.',
        headerFields: ['Facility Name', 'Date of Review'],
        sections: [
          {
            title: 'Step 1 — Frank Trust Index (whatsfrank.com)',
            entries: [
              {
                type: 'checkbox',
                text: 'FTI overall score noted',
                note: 'If below 35, stop here and consider alternatives',
              },
              {
                type: 'checkbox',
                text: 'FTI sub-score weaknesses identified',
                note: 'Note which factors are low: staffing, inspections, penalties',
              },
            ],
          },
          {
            title: 'Step 2 — CMS Care Compare (medicare.gov/care-compare)',
            entries: [
              {
                type: 'checkbox',
                text: 'Special Focus Facility (SFF) status checked',
                note: 'If SFF or SFF Candidate: hard stop, do not proceed',
              },
              {
                type: 'checkbox',
                text: 'Abuse icon status checked',
                note: 'Active abuse icon: disqualifying',
              },
              {
                type: 'checkbox',
                text: 'Overall star rating and three component ratings recorded',
              },
              {
                type: 'checkbox',
                text: 'Health Inspection star rating noted separately',
              },
              {
                type: 'checkbox',
                text: 'Staffing star rating noted separately',
              },
              {
                type: 'checkbox',
                text: 'Quality Measure star rating noted separately',
              },
            ],
          },
          {
            title: 'Step 3 — Staffing Data',
            entries: [
              {
                type: 'checkbox',
                text: 'RN hours per resident per day recorded and compared to state average',
              },
              {
                type: 'checkbox',
                text: 'Total nurse staffing hours per resident per day recorded',
              },
              {
                type: 'checkbox',
                text: 'Weekend staffing ratio noted and compared to weekday',
                note: 'Significant gap = staffing problem',
              },
              { type: 'checkbox', text: 'Nurse staff turnover rate recorded' },
            ],
          },
          {
            title: 'Step 4 — Penalties and Fines',
            entries: [
              {
                type: 'checkbox',
                text: 'Number of fines in last 3 years recorded',
              },
              {
                type: 'checkbox',
                text: 'Total dollar amount of fines recorded',
              },
              {
                type: 'checkbox',
                text: 'Any active payment suspensions noted',
              },
            ],
          },
          {
            title: 'Step 5 — Inspection Report',
            entries: [
              {
                type: 'checkbox',
                text: 'Most recent standard survey downloaded and read',
              },
              {
                type: 'checkbox',
                text: 'Any F600-series citations (abuse/neglect) noted',
                note: 'F600s: read the full narrative',
              },
              {
                type: 'checkbox',
                text: 'Any F725-730 citations (staffing violations) noted',
                note: 'Federal minimum staffing floor violations',
              },
              {
                type: 'checkbox',
                text: 'Any F686-690 citations (pressure injury) noted',
              },
              {
                type: 'checkbox',
                text: 'Recurring deficiencies across multiple surveys identified',
                note: 'Same deficiency 2+ cycles = systemic, not isolated',
              },
              {
                type: 'checkbox',
                text: 'Plan of correction reviewed for specificity',
              },
            ],
          },
          {
            title: 'Step 6 — ProPublica Cross-Reference',
            entries: [
              {
                type: 'checkbox',
                text: 'Facility looked up at projects.propublica.org/nursing-homes',
              },
              {
                type: 'checkbox',
                text: 'Any additional context or discrepancies noted',
              },
            ],
          },
          {
            title: 'Questions to Bring to the Tour',
            entries: [
              {
                type: 'checkbox',
                text: '3–5 specific questions drafted from data findings',
                note: 'Write them now, before you walk in',
              },
              { type: 'field', label: 'Question 1' },
              { type: 'field', label: 'Question 2' },
              { type: 'field', label: 'Question 3' },
            ],
          },
        ],
      },
      {
        id: 'nursing-home-tour',
        title: 'Nursing Home Tour',
        subtitle:
          'Print this page. Bring it on your tour. Check every item as you observe or confirm it.',
        headerFields: ['Facility Name', 'Tour Date', 'Name of Staff Member'],
        sections: [
          {
            title: 'First Impressions — First 60 Seconds',
            entries: [
              {
                type: 'checkbox',
                text: 'No persistent urine or fecal odor in common areas',
                note: 'If present: leave. No further evaluation needed.',
              },
              {
                type: 'checkbox',
                text: 'Residents dressed and up in common areas during daytime hours',
              },
              {
                type: 'checkbox',
                text: 'Staff appear engaged and purposeful, not clustered at nursing station',
              },
              {
                type: 'checkbox',
                text: 'Call lights answered within a reasonable time frame',
              },
              {
                type: 'checkbox',
                text: 'Hallways clear of hazards and well-lit',
              },
            ],
          },
          {
            title: 'Staffing',
            entries: [
              {
                type: 'checkbox',
                text: 'Current nurse aide-to-resident ratio on day shift confirmed',
                note: 'Write it down:',
              },
              {
                type: 'checkbox',
                text: 'Current nurse aide-to-resident ratio on evening shift confirmed',
              },
              {
                type: 'checkbox',
                text: 'Current nurse aide-to-resident ratio on overnight shift confirmed',
              },
              {
                type: 'checkbox',
                text: 'RN on site (not just on call) overnight confirmed',
              },
              {
                type: 'checkbox',
                text: 'Staff turnover rate in past 12 months asked',
                note: 'Write it down:',
              },
              {
                type: 'checkbox',
                text: 'Backup coverage policy for call-outs explained specifically',
              },
              {
                type: 'checkbox',
                text: 'Weekend staffing model compared to weekday',
              },
            ],
          },
          {
            title: 'The Wing Where Your Parent Would Actually Live',
            entries: [
              {
                type: 'checkbox',
                text: 'Visited the specific wing/unit — not just the model room',
              },
              {
                type: 'checkbox',
                text: 'Wing appearance consistent with common areas',
              },
              {
                type: 'checkbox',
                text: 'Residents in wing appear cared for and attended to',
              },
            ],
          },
          {
            title: 'Quality and Compliance',
            entries: [
              {
                type: 'checkbox',
                text: 'FTI score reviewed before visit at whatsfrank.com',
              },
              {
                type: 'checkbox',
                text: 'Most recent inspection report reviewed',
              },
              {
                type: 'checkbox',
                text: 'No active CMS Special Focus (SFF) designation',
              },
              { type: 'checkbox', text: 'No abuse icon on CMS Care Compare' },
              {
                type: 'checkbox',
                text: 'Any federal fines in past 24 months asked about directly',
              },
            ],
          },
          {
            title: 'Financial',
            entries: [
              {
                type: 'checkbox',
                text: 'Base private pay daily rate confirmed in writing',
                note: 'Write it down($/day):',
              },
              {
                type: 'checkbox',
                text: 'Full ancillary fee schedule received in writing',
              },
              {
                type: 'checkbox',
                text: 'Bed hold policy confirmed',
                note: 'Write it down($/day, maximum ____ days):',
              },
              {
                type: 'checkbox',
                text: 'Medicaid acceptance confirmed',
                note: 'Do they accept Medicaid? Current Medicaid bed availability?',
              },
              {
                type: 'checkbox',
                text: 'Payer source change policy confirmed',
                note: 'Will resident be allowed to stay when payer changes to Medicaid?',
              },
            ],
          },
          {
            title: 'Culture and Fit',
            entries: [
              {
                type: 'checkbox',
                text: 'Staff address residents by name in your presence',
              },
              {
                type: 'checkbox',
                text: 'Dining room observed — atmosphere warm and social',
              },
              {
                type: 'checkbox',
                text: 'Activity calendar reviewed and matches resident interests',
              },
              {
                type: 'checkbox',
                text: 'Residents spoke with without staff chaperone',
              },
            ],
          },
          {
            title: 'Next Steps',
            entries: [
              {
                type: 'checkbox',
                text: 'Unannounced return visit scheduled',
                note: 'Date/time:',
              },
              {
                type: 'checkbox',
                text: 'Specific follow-up questions noted from this visit',
              },
            ],
          },
        ],
      },
      {
        id: 'snf-tour',
        title: 'SNF / Short-Stay Rehab Tour',
        subtitle:
          'Use this when evaluating a skilled nursing facility for short-term rehabilitation following a hospitalization.',
        headerFields: ['Facility Name', 'Tour Date / Discharge Deadline'],
        sections: [
          {
            title: 'Before You Tour',
            entries: [
              {
                type: 'checkbox',
                text: 'Qualifying 3-day inpatient hospital stay confirmed',
                note: 'NOT observation status — confirmed inpatient',
              },
              {
                type: 'checkbox',
                text: 'FTI score reviewed at whatsfrank.com',
              },
              {
                type: 'checkbox',
                text: 'Inspection report reviewed on CMS Care Compare',
              },
              { type: 'checkbox', text: 'No SFF designation, no abuse icon' },
            ],
          },
          {
            title: 'Therapy Program',
            entries: [
              {
                type: 'checkbox',
                text: 'Physical therapy offered 5–7 days per week confirmed',
              },
              {
                type: 'checkbox',
                text: 'Occupational therapy available on site',
              },
              {
                type: 'checkbox',
                text: 'Speech therapy available on site if relevant to diagnosis',
              },
              {
                type: 'checkbox',
                text: 'Therapy gym observed — equipment modern and well-maintained',
              },
              {
                type: 'checkbox',
                text: 'Average therapy hours per patient per day for this diagnosis confirmed',
                note: 'Write it down (hrs/day):',
              },
              {
                type: 'checkbox',
                text: 'Discharge-to-home rate requested',
                note: 'Write it down: ____%. A good SNF is proud of this number.',
              },
            ],
          },
          {
            title: 'Medicare and Financial',
            entries: [
              {
                type: 'checkbox',
                text: 'Private pay daily rate after Medicare ends confirmed in writing',
                note: 'Write it down ($/day):',
              },
              {
                type: 'checkbox',
                text: 'Medicare Advantage prior authorization confirmed if applicable',
              },
              { type: 'checkbox', text: 'NOMNC appeal process explained' },
              { type: 'checkbox', text: 'Appeal rights to BFCC-QIO explained' },
              {
                type: 'checkbox',
                text: 'Bed hold policy confirmed for potential hospitalization during stay',
              },
            ],
          },
          {
            title: 'Medical Oversight',
            entries: [
              {
                type: 'checkbox',
                text: 'Attending physician visit frequency confirmed',
                note: 'How often will a physician see my parent?',
              },
              {
                type: 'checkbox',
                text: 'After-hours medical coverage explained — physician or NP available?',
              },
              {
                type: 'checkbox',
                text: 'Specialist access confirmed if diagnosis requires it',
              },
              {
                type: 'checkbox',
                text: 'Pharmacy and medication delivery process explained',
              },
            ],
          },
          {
            title: 'Staffing and Safety',
            entries: [
              {
                type: 'checkbox',
                text: 'RN on site 24 hours per day confirmed (not just on call)',
              },
              {
                type: 'checkbox',
                text: 'Nurse aide-to-resident ratio on all three shifts confirmed',
              },
              {
                type: 'checkbox',
                text: 'Staff turnover rate in past 12 months asked',
              },
              {
                type: 'checkbox',
                text: 'Infection control protocols confirmed current',
              },
            ],
          },
          {
            title: 'Discharge Planning',
            entries: [
              {
                type: 'checkbox',
                text: 'Discharge planning process explained — begins at admission?',
              },
              {
                type: 'checkbox',
                text: 'Social worker or case manager assigned at admission',
              },
              {
                type: 'checkbox',
                text: 'Home health or outpatient therapy to be arranged as part of discharge plan',
              },
              {
                type: 'checkbox',
                text: 'Family included in all discharge planning conversations — confirmed',
              },
            ],
          },
        ],
      },
      {
        id: 'assisted-living-tour',
        title: 'Assisted Living Tour',
        subtitle:
          'The base rate is never the actual rate. Get the fee schedule before you fall in love with the place.',
        headerFields: [
          'Facility Name',
          'Tour Date',
          'Base Monthly Rate Quoted',
        ],
        sections: [
          {
            title: 'Before You Tour',
            entries: [
              {
                type: 'checkbox',
                text: 'Ancillary fee schedule requested in writing before visit',
              },
              {
                type: 'checkbox',
                text: 'State inspection records reviewed — found at state licensing agency or ncal.org',
              },
              {
                type: 'checkbox',
                text: 'Complaint history for past 3 years reviewed if available',
              },
            ],
          },
          {
            title: 'First Impressions',
            entries: [
              { type: 'checkbox', text: 'No persistent odor in common areas' },
              {
                type: 'checkbox',
                text: 'Residents dressed, engaged, and social',
              },
              {
                type: 'checkbox',
                text: 'Staff interaction with residents warm and by name',
              },
              {
                type: 'checkbox',
                text: 'Common areas and dining room welcoming and active',
              },
            ],
          },
          {
            title: 'Visited the Actual Wing/Unit',
            entries: [
              {
                type: 'checkbox',
                text: 'Specific wing where parent would live visited — not just model room',
              },
              {
                type: 'checkbox',
                text: 'Wing quality consistent with common areas',
              },
            ],
          },
          {
            title: 'Staffing and Care',
            entries: [
              {
                type: 'checkbox',
                text: 'Resident-to-aide ratio on day and evening shifts confirmed',
              },
              {
                type: 'checkbox',
                text: 'Nurse availability overnight: LPN or RN on site vs. on-call only',
              },
              {
                type: 'checkbox',
                text: 'Staff turnover rate in past 12 months asked',
              },
              {
                type: 'checkbox',
                text: 'Backup coverage policy for call-outs explained',
              },
            ],
          },
          {
            title: 'Level of Care and Billing — The Critical Section',
            entries: [
              {
                type: 'checkbox',
                text: 'Base monthly rate confirmed in writing',
              },
              {
                type: 'checkbox',
                text: 'Level-of-care assessment process fully explained',
                note: 'Who conducts it? How often? What triggers reassessment?',
              },
              {
                type: 'checkbox',
                text: 'Complete ancillary fee schedule received in writing',
              },
              {
                type: 'checkbox',
                text: 'Maximum possible monthly cost at highest care level modeled',
                note: 'This is the number that actually matters. Write it ($/month): ',
              },
              {
                type: 'checkbox',
                text: 'Rate increase history for past 3 years confirmed',
              },
            ],
          },
          {
            title: 'Medicaid and Long-Term Planning',
            entries: [
              {
                type: 'checkbox',
                text: 'Whether facility accepts Medicaid confirmed',
              },
              {
                type: 'checkbox',
                text: 'Medicaid bed availability and any waiting list confirmed',
              },
              {
                type: 'checkbox',
                text: 'What happens if private pay assets are exhausted — will parent be allowed to stay?',
              },
            ],
          },
          {
            title: 'The Critical Question',
            entries: [
              {
                type: 'checkbox',
                text: "At what point would my parent's needs exceed what this community can provide?",
                note: 'Get a specific answer. This is the most important question on this tour.',
              },
              {
                type: 'checkbox',
                text: 'What notice period is provided and what transition support is offered?',
              },
            ],
          },
          {
            title: 'State Regulation',
            entries: [
              { type: 'checkbox', text: 'State licensing status confirmed' },
              {
                type: 'checkbox',
                text: 'Most recent state inspection report reviewed — or location confirmed',
              },
              {
                type: 'checkbox',
                text: 'Ownership and any recent ownership changes confirmed',
              },
            ],
          },
          {
            title: 'Culture and Fit',
            entries: [
              {
                type: 'checkbox',
                text: 'Dining experience observed — warmth, engagement, food quality',
              },
              {
                type: 'checkbox',
                text: 'Activity calendar reviewed and matches ability and interests',
              },
              {
                type: 'checkbox',
                text: 'Outdoor space available and accessible',
              },
              {
                type: 'checkbox',
                text: 'Residents spoken with without staff chaperone',
              },
            ],
          },
          {
            title: 'Next Steps',
            entries: [
              {
                type: 'checkbox',
                text: 'Unannounced return visit scheduled',
                note: 'Weekend evening strongly recommended. Date:',
              },
            ],
          },
        ],
      },
      {
        id: 'memory-care-tour',
        title: 'Memory Care Tour',
        subtitle:
          'A locked hallway is not memory care. Use this checklist to find out what is actually behind the label.',
        headerFields: [
          'Facility Name',
          'Tour Date',
          'Is this a standalone memory care facility or a unit within a larger facility?',
        ],
        sections: [
          {
            title: 'The Environment — Is This Genuinely Specialized?',
            entries: [
              {
                type: 'checkbox',
                text: 'Unit is dedicated and secured — not a general wing with a locked door',
              },
              {
                type: 'checkbox',
                text: 'Layout is circular or allows safe walking without dead ends',
              },
              {
                type: 'checkbox',
                text: 'Exit doors secured or disguised appropriately',
              },
              {
                type: 'checkbox',
                text: 'Visual and sensory cues used intentionally throughout the space',
                note: 'Familiar objects, clear wayfinding, calming colors',
              },
              {
                type: 'checkbox',
                text: 'Dedicated outdoor space confirmed — secured and accessible',
              },
              {
                type: 'checkbox',
                text: 'Lighting adequate — natural light prioritized',
              },
            ],
          },
          {
            title: 'Staffing — The Most Critical Factor',
            entries: [
              {
                type: 'checkbox',
                text: 'Resident-to-aide ratio on this unit specifically confirmed',
                note: 'Not the facility overall — this unit',
              },
              {
                type: 'checkbox',
                text: 'Staff assigned consistently to same residents across shifts confirmed',
                note: 'Consistent caregivers = familiarity for dementia residents',
              },
              {
                type: 'checkbox',
                text: 'Staff dementia-specific training confirmed and recency asked',
              },
              {
                type: 'checkbox',
                text: 'Staffing on late afternoon/evening (sundowning window) confirmed',
                note: 'Does staffing increase during 3–9pm? It should.',
              },
              {
                type: 'checkbox',
                text: 'Staff turnover rate on this unit specifically asked',
              },
            ],
          },
          {
            title: 'Programming and Daily Life',
            entries: [
              {
                type: 'checkbox',
                text: 'Daily programming observed or described in detail',
              },
              {
                type: 'checkbox',
                text: 'Programming designed for dementia residents — not general activities adapted',
              },
              {
                type: 'checkbox',
                text: 'Music therapy or music programming confirmed',
              },
              {
                type: 'checkbox',
                text: 'Outdoor time incorporated into daily schedule',
              },
              {
                type: 'checkbox',
                text: 'Mealtime support for residents who need assistance observed or described',
              },
            ],
          },
          {
            title: 'Medications — The Antipsychotic Question',
            entries: [
              {
                type: 'checkbox',
                text: 'Antipsychotic medication rate for this unit asked',
                note: 'Compare to state and national averages on CMS Care Compare',
              },
              {
                type: 'checkbox',
                text: 'Protocol for managing behavioral symptoms without medication explained',
                note: 'Staff response to agitation, wandering, resistance to care',
              },
              {
                type: 'checkbox',
                text: 'Medical director involvement in behavioral care confirmed',
              },
            ],
          },
          {
            title: 'Communication and Family',
            entries: [
              {
                type: 'checkbox',
                text: 'Family communication protocol explained — who calls, how quickly',
              },
              {
                type: 'checkbox',
                text: 'Care plan meeting process for memory care residents explained',
              },
              {
                type: 'checkbox',
                text: 'What happens when dementia progresses beyond what unit can manage?',
                note: 'Specific answer required. Vague answers are information.',
              },
            ],
          },
          {
            title: 'Financial',
            entries: [
              {
                type: 'checkbox',
                text: 'Base monthly rate confirmed in writing',
              },
              {
                type: 'checkbox',
                text: 'Memory care premium above standard AL or nursing home confirmed',
                note: 'Write it ($/month additional):',
              },
              {
                type: 'checkbox',
                text: 'Medicaid memory care beds available — and will resident stay if payer changes?',
              },
            ],
          },
          {
            title: 'Next Steps',
            entries: [
              {
                type: 'checkbox',
                text: 'Unannounced return visit scheduled on a different day and time',
              },
              {
                type: 'checkbox',
                text: 'Staff members spoken with directly — ask how long they have worked on this unit',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'agency',
    label: 'Agency Evaluations',
    checklists: [
      {
        id: 'home-care',
        title: 'Home Care & Home Health Agency',
        subtitle:
          'Home care and home health are not the same thing. One is covered by Medicare. One is not. Use the right checklist for the right service.',
        sections: [
          {
            title: 'Home Care Agency — Non-Medical Personal Care',
            entries: [
              {
                type: 'checkbox',
                text: 'Agency employs caregivers directly — not independent contractors',
                note: 'Ask directly. Get the answer in writing.',
              },
              {
                type: 'checkbox',
                text: 'Background checks confirmed for all caregivers',
              },
              {
                type: 'checkbox',
                text: "Liability insurance and workers' compensation coverage confirmed",
              },
              {
                type: 'checkbox',
                text: 'Backup coverage policy: who calls when scheduled aide cannot come? How quickly?',
              },
              {
                type: 'checkbox',
                text: 'Supervision model: how often does a supervisor observe caregiver work?',
              },
              {
                type: 'checkbox',
                text: 'Caregiver consistency: will same aide come regularly, or rotate?',
                note: 'Consistency matters especially for dementia and anxiety',
              },
              {
                type: 'checkbox',
                text: 'After-hours contact: direct number, not voicemail only',
              },
              {
                type: 'checkbox',
                text: 'References from current or recent families offered',
              },
            ],
          },
          {
            title: 'Home Care — Services and Costs',
            entries: [
              {
                type: 'checkbox',
                text: 'Complete list of included and excluded services confirmed in writing',
              },
              {
                type: 'checkbox',
                text: 'Hourly rate and minimum hours per visit confirmed in writing',
                note: 'Write it ($/hour, minimum hrs):',
              },
              {
                type: 'checkbox',
                text: 'Weekend and holiday rate premium confirmed',
              },
              { type: 'checkbox', text: 'Cancellation policy confirmed' },
              {
                type: 'checkbox',
                text: 'Live-in care rate confirmed if applicable',
                note: 'Write it down($/day):',
              },
            ],
          },
          {
            title: 'Home Health Agency — Medicare-Certified Skilled Care',
            entries: [
              {
                type: 'checkbox',
                text: 'Medicare certification status confirmed at medicare.gov/care-compare',
              },
              {
                type: 'checkbox',
                text: 'Quality data reviewed on Home Health Compare — hospitalization rate, mobility improvement',
              },
              {
                type: 'checkbox',
                text: 'Any compliance deficiencies in past 3 years reviewed',
              },
              {
                type: 'checkbox',
                text: 'Physician order confirmed or will be obtained',
              },
              {
                type: 'checkbox',
                text: 'Homebound status criteria met and documented',
              },
              {
                type: 'checkbox',
                text: 'Specific disciplines available: RN, PT, OT, speech therapy',
              },
              {
                type: 'checkbox',
                text: 'Frequency of skilled nursing visits confirmed',
              },
              {
                type: 'checkbox',
                text: 'After-hours on-call coverage: nurse employed by agency, not answering service',
              },
              {
                type: 'checkbox',
                text: 'Aide services included alongside skilled care confirmed',
              },
              {
                type: 'checkbox',
                text: 'When Medicare ends: what ongoing help will my parent still need?',
                note: 'Ask before Medicare ends, not after',
              },
            ],
          },
        ],
      },
      {
        id: 'hospice',
        title: 'Hospice Agency Evaluation',
        subtitle:
          "The agency you choose will be present for some of the most intimate hours of your family's life. This decision deserves care.",
        headerFields: ['Agency Name', 'Date of Evaluation'],
        sections: [
          {
            title: 'The 2am Question — Ask This First',
            entries: [
              {
                type: 'checkbox',
                text: 'Who calls me at 2am if something goes wrong?',
                note: 'The answer must be: a nurse employed by this agency. Not an answering service.',
              },
              {
                type: 'checkbox',
                text: 'Average response time for an after-hours home visit confirmed',
              },
            ],
          },
          {
            title: 'Staffing and Availability',
            entries: [
              {
                type: 'checkbox',
                text: 'Specific RN case manager named and introduction offered',
              },
              {
                type: 'checkbox',
                text: "RN case manager's typical patient caseload confirmed",
                note: 'Write it: ____ patients. Under 15 is good.',
              },
              {
                type: 'checkbox',
                text: 'Coverage when assigned nurse is unavailable: who covers and how is handoff handled?',
              },
              {
                type: 'checkbox',
                text: 'Aide visit frequency confirmed and consistent with care needs',
              },
              {
                type: 'checkbox',
                text: 'Staff turnover rate asked — consistent team matters at this stage',
              },
            ],
          },
          {
            title: 'Clinical Capability',
            entries: [
              {
                type: 'checkbox',
                text: "Agency experience with patient's specific diagnosis confirmed",
              },
              {
                type: 'checkbox',
                text: 'Inpatient facility or hospice house location identified before needed',
              },
              {
                type: 'checkbox',
                text: 'Crisis care / continuous home care protocol explained — 24-hour nursing during acute symptoms',
              },
              {
                type: 'checkbox',
                text: 'Pharmacy and medication delivery process confirmed — how quickly for urgent meds?',
              },
              {
                type: 'checkbox',
                text: 'Medical director involvement in day-to-day care confirmed',
              },
            ],
          },
          {
            title: 'Agency Background',
            entries: [
              {
                type: 'checkbox',
                text: 'Medicare certification confirmed at medicare.gov/care-compare',
              },
              {
                type: 'checkbox',
                text: 'Hospice Compare quality data reviewed — timely pain and symptom management rates',
              },
              {
                type: 'checkbox',
                text: 'Any compliance citations or survey findings reviewed',
              },
              {
                type: 'checkbox',
                text: 'Ownership structure confirmed: nonprofit, for-profit, hospital-affiliated',
              },
              {
                type: 'checkbox',
                text: 'Informal reference from hospital social worker or discharge planner obtained',
                note: 'They know which agencies are actually good.',
              },
            ],
          },
          {
            title: 'The Full Care Team',
            entries: [
              {
                type: 'checkbox',
                text: 'Social worker introduction offered — request early meeting, do not wait',
              },
              {
                type: 'checkbox',
                text: 'Chaplain services confirmed: available regardless of religious affiliation',
              },
              {
                type: 'checkbox',
                text: 'Volunteer program confirmed and coordinator identified',
              },
              {
                type: 'checkbox',
                text: 'Bereavement program described: what it includes and for how long after death',
                note: 'Medicare covers 13 months. Confirm the agency provides it.',
              },
            ],
          },
          {
            title: 'Communication and Support',
            entries: [
              {
                type: 'checkbox',
                text: 'Family communication plan confirmed — who calls, under what circumstances, how quickly',
              },
              {
                type: 'checkbox',
                text: 'Advance directive and POLST reviewed with care team',
              },
              {
                type: 'checkbox',
                text: 'Family caregiver education offered — accept it',
              },
            ],
          },
        ],
      },
      {
        id: 'ccrc',
        title: 'CCRC Financial Due Diligence',
        subtitle:
          'Before writing a check with multiple zeros, do this work. The $500 you spend on an elder law attorney to review these documents is the most valuable $500 in this entire process.',
        headerFields: [
          'Community Name',
          'Contract Type Being Considered (Type A / Type B / Type C)',
        ],
        sections: [
          {
            title: 'The Contract — Read This First',
            entries: [
              {
                type: 'checkbox',
                text: 'Exact refundability terms identified and written down',
                note: 'Is it 90% refundable? Declining? Contingent on resale?',
              },
              {
                type: 'checkbox',
                text: 'Entry fee amount confirmed',
                note: 'Write it down: $',
              },
              {
                type: 'checkbox',
                text: 'Refundable amount at death or departure',
                note: 'Write it down: $',
              },
              {
                type: 'checkbox',
                text: 'If declining refundability: reaches zero after',
                note: 'Write it down (months/years):',
              },
              {
                type: 'checkbox',
                text: 'Monthly fee at independent living level confirmed',
                note: 'Write it down ($/month): ',
              },
              {
                type: 'checkbox',
                text: 'Monthly fee at highest care level modeled',
                note: 'Write it down ($/month): ',
              },
              {
                type: 'checkbox',
                text: 'Contract reviewed by an elder law attorney who does NOT represent the community',
              },
            ],
          },
          {
            title: 'Financial Health of the Community',
            entries: [
              {
                type: 'checkbox',
                text: 'Most recent audited financial statements requested and received',
              },
              {
                type: 'checkbox',
                text: 'Audited statements reviewed by a CPA or elder law attorney',
              },
              {
                type: 'checkbox',
                text: 'Current occupancy rate confirmed',
                note: 'Write it down (below 80% is a concern):',
              },
              {
                type: 'checkbox',
                text: 'Occupancy rate trend for past 3 years confirmed: trending up / flat / declining',
                note: 'Circle/underline: trending  up, flat or declining',
              },
              { type: 'checkbox', text: 'Long-term debt load reviewed' },
              {
                type: 'checkbox',
                text: 'Operating margin trend for past 3 years reviewed',
              },
              { type: 'checkbox', text: 'Reserve fund adequacy reviewed' },
            ],
          },
          {
            title: 'Ownership and History',
            entries: [
              {
                type: 'checkbox',
                text: 'Ownership structure confirmed: for-profit / nonprofit / hospital-affiliated',
              },
              {
                type: 'checkbox',
                text: 'Has ownership changed in past 5 years?',
                note: 'If yes, why?:',
              },
              {
                type: 'checkbox',
                text: 'Has community ever filed for bankruptcy or been placed under state receivership?',
              },
              {
                type: 'checkbox',
                text: 'Has community ever failed to fully refund an entry fee?',
              },
              {
                type: 'checkbox',
                text: 'License ever suspended or placed on probation?',
              },
              {
                type: 'checkbox',
                text: 'CARF accreditation status confirmed — positive signal, not a guarantee',
              },
            ],
          },
          {
            title: 'Care Continuity',
            entries: [
              {
                type: 'checkbox',
                text: 'All levels of care available on campus confirmed: IL, AL, memory care, SNF',
              },
              {
                type: 'checkbox',
                text: 'Contract guarantees access to all care levels — no waiting list risk',
              },
              {
                type: 'checkbox',
                text: 'What happens if care needs exceed what campus can provide?',
              },
              {
                type: 'checkbox',
                text: 'Couples policy: what happens when one spouse needs higher level of care?',
                note: 'Write it down:',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'reference',
    label: 'Reference Cards',
    checklists: [
      {
        id: 'medicare',
        title: 'Medicare Quick Reference',
        subtitle:
          'Print this. Keep it accessible during any hospitalization. These three pages have saved families thousands of dollars.',
        sections: [
          {
            title:
              'The Observation Status Script — Ask This at Every Hospitalization',
            entries: [
              {
                type: 'callout',
                text: '"Is my parent formally admitted as an inpatient, or are they on observation status?"',
              },
              {
                type: 'checkbox',
                text: 'Asked: is my parent inpatient or on observation status?',
              },
              {
                type: 'checkbox',
                text: 'MOON notice received (required if on observation status)',
              },
              {
                type: 'checkbox',
                text: 'Requested conversion to inpatient status if appropriate',
              },
              {
                type: 'checkbox',
                text: 'Attending physician supports inpatient status in documentation',
              },
            ],
          },
          {
            title: 'The 100-Day SNF Benefit — Day by Day',
            entries: [
              {
                type: 'table',
                headers: ['Days', 'Your Cost', 'Notes'],
                rows: [
                  ['Days 1–20', '$0 out of pocket', 'Medicare pays 100%'],
                  [
                    'Days 21–100',
                    '~$204/day coinsurance (2026)',
                    'Medigap may cover',
                  ],
                  ['Day 101+', '100% private pay', 'Medicare ends'],
                ],
              },
            ],
          },
          {
            title: 'When Medicare Ends Early — The NOMNC Appeal',
            entries: [
              { type: 'checkbox', text: 'NOMNC received and dated' },
              {
                type: 'checkbox',
                text: 'Appeal requested by noon of day before coverage scheduled to end',
                note: "Call your BFCC-QIO at qioprogram.org — find your state's QIO",
              },
              {
                type: 'checkbox',
                text: 'Parent remains in facility during appeal — do not pack up the room',
              },
              {
                type: 'checkbox',
                text: 'Appeal decision received within 1 business day — free of charge',
              },
            ],
          },
          {
            title: 'Medicare Advantage — Call Before Any SNF Admission',
            entries: [
              {
                type: 'checkbox',
                text: 'Does this SNF require prior authorization from my plan?',
              },
              {
                type: 'checkbox',
                text: 'Is this SNF in-network for my specific plan?',
              },
              {
                type: 'checkbox',
                text: 'What is my daily cost-sharing structure?',
              },
              {
                type: 'checkbox',
                text: 'What is the internal appeal process if coverage is denied?',
              },
            ],
          },
        ],
      },
      {
        id: 'resident-rights',
        title: 'Resident Rights Reference',
        subtitle:
          'Every resident of a Medicare or Medicaid certified nursing home has these rights under federal law. They are not suggestions. They are enforceable.',
        sections: [
          {
            title: 'The Ten Rights',
            entries: [
              {
                type: 'checkbox',
                text: 'The right to be treated with dignity and respect',
                note: 'Protected from abuse, neglect, humiliation, and exploitation. Regardless of cognitive status.',
              },
              {
                type: 'checkbox',
                text: 'The right to participate in their own care',
                note: 'Informed of medical condition. Involved in care planning. Right to refuse any treatment or medication.',
              },
              {
                type: 'checkbox',
                text: 'The right to access their own information',
                note: 'Medical records within 24 hours of request. Copies within 2 business days.',
              },
              {
                type: 'checkbox',
                text: 'The right to privacy and confidentiality',
                note: 'Staff must knock. Mail cannot be opened without consent. Phone calls are private.',
              },
              {
                type: 'checkbox',
                text: 'The right to manage their own finances',
                note: 'Facility must maintain separate accounts and provide quarterly statements.',
              },
              {
                type: 'checkbox',
                text: 'The right to voice grievances without retaliation',
                note: 'Cannot be discharged, threatened, or penalized for complaining.',
              },
              {
                type: 'checkbox',
                text: 'The right to be free from unnecessary restraints',
                note: 'Physical and chemical restraints require physician order, clinical justification, and consent.',
              },
              {
                type: 'checkbox',
                text: 'The right to remain in the facility',
                note: '30 days written notice required. Valid discharge reasons are limited. Right to appeal.',
              },
              {
                type: 'checkbox',
                text: 'The right to make advance directives',
                note: 'Facility must honor living will, healthcare proxy, and POLST.',
              },
              {
                type: 'checkbox',
                text: 'The right to organize',
                note: 'Right to form and participate in a Resident Council.',
              },
            ],
          },
          {
            title: 'If a Right Is Violated',
            entries: [
              {
                type: 'checkbox',
                text: 'Document what happened: date, time, what was observed, who was present',
              },
              {
                type: 'checkbox',
                text: 'Raise it with the Director of Nursing or Administrator: specific, factual, with documentation',
              },
              {
                type: 'checkbox',
                text: 'Contact the Long-Term Care Ombudsman if facility response is inadequate',
                note: 'Eldercare Locator: 1-800-677-1116 · eldercare.acl.gov · Free service',
              },
              {
                type: 'checkbox',
                text: 'File a complaint with the state survey agency if problem persists',
                note: 'Can file at medicare.gov/care-compare or by calling state agency · Can file anonymously',
              },
              {
                type: 'checkbox',
                text: 'Call 911 for any situation involving immediate danger to your parent',
                note: 'Safety first. Paperwork after.',
              },
            ],
          },
        ],
      },
      {
        id: 'financial-planning',
        title: 'Financial Planning Guide',
        subtitle:
          'The families who plan early protect more. The ones who discover the rules when the money is running out have fewer options.',
        sections: [
          {
            title: 'Immediate Actions — Do These Now',
            entries: [
              {
                type: 'checkbox',
                text: 'Locate all insurance policies: long-term care, life, annuities',
              },
              {
                type: 'checkbox',
                text: 'Identify whether parent is a veteran or surviving spouse of a veteran',
                note: 'Research VA Aid and Attendance eligibility at va.gov/pension/aid-attendance-housebound',
              },
              {
                type: 'checkbox',
                text: 'Identify whether parent has a long-term care insurance policy',
                note: 'Locate the policy. Verify it is current. Identify benefit triggers and elimination period.',
              },
              {
                type: 'checkbox',
                text: 'Review advance directives, healthcare proxy, and financial POA — do they exist?',
              },
            ],
          },
          {
            title: 'Before Choosing Any Facility',
            entries: [
              {
                type: 'checkbox',
                text: 'Complete ancillary fee schedule requested in writing',
              },
              {
                type: 'checkbox',
                text: 'Maximum possible monthly cost at highest care level modeled',
              },
              {
                type: 'checkbox',
                text: 'Bed hold policy and daily rate confirmed in writing',
              },
              {
                type: 'checkbox',
                text: 'Medicaid acceptance and Medicaid bed availability confirmed if applicable',
              },
              {
                type: 'checkbox',
                text: 'Payer source change policy confirmed: will parent be allowed to stay?',
              },
            ],
          },
          {
            title: 'If Medicaid May Be Needed Within 5 Years',
            entries: [
              {
                type: 'checkbox',
                text: 'Elder law attorney consultation scheduled',
                note: 'Find one at naela.org. Two hours now protects decades of savings.',
              },
              {
                type: 'checkbox',
                text: 'Countable vs. exempt assets identified with attorney guidance',
              },
              {
                type: 'checkbox',
                text: 'Community Spouse Resource Allowance (CSRA) calculated for married couples',
              },
              {
                type: 'checkbox',
                text: 'Any asset transfers in past 5 years reviewed for look-back implications',
                note: 'Do not move any assets before this conversation',
              },
              {
                type: 'checkbox',
                text: 'Medicaid eligibility timeline projected',
              },
            ],
          },
          {
            title: 'Long-Term Care Insurance — If Policy Exists',
            entries: [
              {
                type: 'checkbox',
                text: 'Policy located and current premium payment confirmed',
              },
              {
                type: 'checkbox',
                text: 'Benefit triggers identified: ____ ADLs or cognitive impairment',
              },
              {
                type: 'checkbox',
                text: 'Elimination period confirmed: ____ days',
              },
              {
                type: 'checkbox',
                text: 'Daily or monthly benefit amount confirmed: $____',
              },
              {
                type: 'checkbox',
                text: 'Benefit period confirmed: ____ years or lifetime',
              },
              {
                type: 'checkbox',
                text: 'Inflation protection confirmed: yes / no',
              },
              {
                type: 'checkbox',
                text: 'Covered settings confirmed: home care / AL / nursing home / memory care',
              },
              {
                type: 'checkbox',
                text: 'Claim filed immediately when benefit triggers are met',
                note: 'Do not wait. Elimination period does not start until claim is filed.',
              },
            ],
          },
          {
            title: 'Veterans Benefits',
            entries: [
              {
                type: 'checkbox',
                text: 'Wartime military service confirmed: conflict era ____',
              },
              { type: 'checkbox', text: 'Honorable discharge confirmed' },
              {
                type: 'checkbox',
                text: 'Aid and Attendance application initiated through a VSO — free of charge',
                note: 'VSOs: American Legion, VFW, DAV · Do not pay a third party to file',
              },
            ],
          },
          {
            title: 'Family Financial Conversation',
            entries: [
              {
                type: 'checkbox',
                text: 'Full family conversation about financial capacity held honestly',
              },
              {
                type: 'checkbox',
                text: 'Realistic private pay runway calculated: approximately ____ months/years',
              },
              {
                type: 'checkbox',
                text: 'Plan for when private pay resources are exhausted discussed',
              },
              {
                type: 'checkbox',
                text: 'SNF social worker consulted: given this situation, what is the realistic financial trajectory?',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'know-my-parent',
    label: 'Know My Parent',
    checklists: [
      {
        id: 'know-my-parent',
        title: 'Know My Parent',
        subtitle:
          'A one-page human profile for the care team. Not a medical summary — a profile of a person. New staff who read this before first contact will provide better care.',
        sections: [
          {
            title: 'Who This Person Is',
            entries: [
              { type: 'field', label: 'Name they prefer to be called' },
              { type: 'field', label: 'Profession or career' },
              { type: 'field', label: 'Hometown / where they grew up' },
              {
                type: 'field',
                label: 'Family: spouse, children, grandchildren',
              },
              {
                type: 'field',
                label: 'Faith or spiritual background if relevant',
              },
            ],
          },
          {
            title: 'What Brings Them Joy',
            entries: [
              { type: 'field', label: 'Music they love' },
              { type: 'field', label: 'Activities, hobbies, interests' },
              { type: 'field', label: 'Topics they love to talk about' },
              {
                type: 'field',
                label: 'TV shows, sports teams, things they follow',
              },
              {
                type: 'field',
                label: 'Favorite foods and how they like their coffee or tea',
              },
            ],
          },
          {
            title: 'What Helps Them Feel Safe and Calm',
            entries: [
              {
                type: 'field',
                label: 'What to do if they are anxious or confused',
              },
              { type: 'field', label: 'What words or phrases comfort them' },
              {
                type: 'field',
                label: 'What they most need when they are frightened',
              },
              { type: 'field', label: 'Who they ask for when distressed' },
            ],
          },
          {
            title: 'What to Know About Their Care',
            entries: [
              {
                type: 'field',
                label: 'Things that upset them or they strongly dislike',
              },
              { type: 'field', label: 'Routines that matter to them' },
              {
                type: 'field',
                label: 'How they communicate if language is limited',
              },
              {
                type: 'field',
                label:
                  'Anything that has helped or not helped in prior care settings',
              },
            ],
          },
          {
            title: 'How to Reach the Family',
            entries: [
              {
                type: 'field',
                label: 'Primary family contact and relationship',
              },
              { type: 'field', label: 'Phone number' },
              { type: 'field', label: 'Second contact and phone number' },
              { type: 'field', label: 'Best times to call' },
            ],
          },
        ],
      },
    ],
  },
]
