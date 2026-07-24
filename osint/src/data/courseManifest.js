const courseManifest = {
  "code": "OSINT-101",
  "title": "OSINT Investigation Methodology",
  "subtitle": "Finding What Is Already There",
  "level": "Foundation to practitioner",
  "estimatedHours": 12,
  "passMark": 80,
  "version": "2026.07",
  "guardrail": "Public sources only — no unauthorised access, credential testing, evasion, harassment, doxxing or republication of sensitive personal data.",
  "learningOutcomes": [
    "Explain the difference between data, information and intelligence.",
    "Apply a repeatable OSINT workflow from tasking to reporting.",
    "Identify legal, ethical and evidential boundaries.",
    "Evaluate sources, corroboration and confidence.",
    "Deliver a defensible intelligence product."
  ],
  "modules": [
    {
      "slug": "orientation",
      "number": 0,
      "title": "Orientation, guardrails and the analyst contract",
      "durationMinutes": 30,
      "objectives": [
        "State the legal, ethical and evidential boundaries of the course.",
        "Distinguish passive public-source observation from access, authentication, evasion or exploitation.",
        "Apply the four-part collection test before any pivot.",
        "Set up a defensible investigation workspace and learning log."
      ]
    },
    {
      "slug": "foundations",
      "number": 1,
      "title": "OSINT foundations and the intelligence cycle",
      "durationMinutes": 40,
      "objectives": [
        "Differentiate data, information and intelligence.",
        "Explain what OSINT is and is not.",
        "Place OSINT within the intelligence cycle.",
        "Recognise why collection without tasking produces noise."
      ]
    },
    {
      "slug": "requirements",
      "number": 2,
      "title": "Requirements, scope, authority and decision gates",
      "durationMinutes": 45,
      "objectives": [
        "Translate a broad request into IRs, PIRs and SIRs.",
        "Define collection boundaries and exclusions.",
        "Document authority, legal review and escalation conditions.",
        "Use a decision gate before collection begins."
      ]
    },
    {
      "slug": "baseline-query-design",
      "number": 3,
      "title": "Baseline research and query engineering",
      "durationMinutes": 55,
      "objectives": [
        "Establish a factual baseline from authoritative sources.",
        "Design repeatable keyword, date and entity queries.",
        "Use variants and negative terms to control precision.",
        "Record exact queries and dead ends."
      ]
    },
    {
      "slug": "source-strategy",
      "number": 4,
      "title": "Source strategy and platform collection",
      "durationMinutes": 55,
      "objectives": [
        "Select source classes based on the SIR.",
        "Use platform-specific collection without confusing tool output with proof.",
        "Evaluate source access, reliability and independence.",
        "Maintain controlled collection depth."
      ]
    },
    {
      "slug": "metadata-timelines",
      "number": 5,
      "title": "Timestamps, metadata and timeline reconstruction",
      "durationMinutes": 50,
      "objectives": [
        "Normalise timestamps and time zones.",
        "Extract useful metadata without overclaiming.",
        "Build an event chronology with provenance.",
        "Identify clock, archive and reposting limitations."
      ]
    },
    {
      "slug": "monitoring-breach",
      "number": 6,
      "title": "Event monitoring and breach-exposure assessment",
      "durationMinutes": 50,
      "objectives": [
        "Monitor authorised public channels during an event window.",
        "Assess breach exposure without validating credentials.",
        "Classify exposure categories and aggregation risk.",
        "Apply safe handling to active-threat material."
      ]
    },
    {
      "slug": "identity-footprints",
      "number": 7,
      "title": "Identity pivots and digital-footprint mapping",
      "durationMinutes": 55,
      "objectives": [
        "Use identifiers proportionately and safely.",
        "Separate observed associations from identity judgements.",
        "Map public footprint evidence with confidence labels.",
        "Prevent misidentification and collateral harm."
      ]
    },
    {
      "slug": "media-docs-geospatial",
      "number": 8,
      "title": "Media, documents and geospatial context",
      "durationMinutes": 55,
      "objectives": [
        "Validate public images, video and documents.",
        "Use geospatial context without exposing unnecessary location data.",
        "Identify manipulation, reuse and context loss.",
        "Document media provenance and limitations."
      ]
    },
    {
      "slug": "evidence-handling",
      "number": 9,
      "title": "Evidence logging, provenance, redaction and retention",
      "durationMinutes": 55,
      "objectives": [
        "Create an auditable investigation record.",
        "Preserve provenance and context.",
        "Apply redaction and need-to-know handling.",
        "Use hashes, filenames and retention rules correctly."
      ]
    },
    {
      "slug": "verification-confidence",
      "number": 10,
      "title": "Verification, corroboration and confidence",
      "durationMinutes": 60,
      "objectives": [
        "Evaluate source reliability and information credibility.",
        "Distinguish leads, findings and assessments.",
        "Test source independence.",
        "Express confidence and caveats precisely."
      ]
    },
    {
      "slug": "analysis-reporting",
      "number": 11,
      "title": "Analysis, synthesis, reporting and expert consultation",
      "durationMinutes": 60,
      "objectives": [
        "Structure analysis around SIRs and decision needs.",
        "Build a finding matrix.",
        "Write concise, caveated intelligence judgements.",
        "Know when specialist review is required."
      ]
    },
    {
      "slug": "case-study",
      "number": 12,
      "title": "Controlled case study: public claim of email compromise",
      "durationMinutes": 75,
      "objectives": [
        "Apply the complete workflow to a breach-claim scenario.",
        "Assess accessibility and sensitivity without amplifying personal data.",
        "Separate confirmed baseline, public claims and unknowns.",
        "Produce a three-row finding matrix."
      ]
    },
    {
      "slug": "capstone",
      "number": 13,
      "title": "Capstone assessment and operational playbook",
      "durationMinutes": 90,
      "objectives": [
        "Plan and execute a controlled OSINT investigation.",
        "Produce an evidence-ready report and audit trail.",
        "Demonstrate confidence calibration and safe handling.",
        "Create a reusable personal operating playbook."
      ]
    }
  ]
};

export default courseManifest;
