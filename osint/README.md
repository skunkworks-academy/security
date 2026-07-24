# OSINT Investigation Methodology — self-paced course

Docusaurus 3.10.2 learning application for **OSINT-101: Finding What Is Already There**.

## Access model

The repository remains suitable for a public Security hub because protected lesson bodies are not stored as plaintext or emitted into the Docusaurus build.

- Public: catalogue, curriculum metadata, enrolment page and blank templates.
- Authenticated: learning dashboard shell.
- Enrolled: decrypted lesson content and final assessment through `/api/course`.
- Entitlement: `osint_enrolled` / `course_admin` role, or an approved Academy entitlement endpoint.
- Hosting: Azure Static Web Apps with Microsoft Entra authentication.

Client-side route hiding is not treated as security. The API validates identity and enrolment before decrypting content.

## Local development

Requirements: Node.js 20 or later.

```bash
cd osint
npm install
npm run start
```

For authentication emulation:

```bash
npm install -g @azure/static-web-apps-cli
swa start http://localhost:3000 --api-location api
```

Set the content key for the API:

```bash
export COURSE_CONTENT_KEY="<64-character-hex-key>"
```

PowerShell:

```powershell
$env:COURSE_CONTENT_KEY = "<64-character-hex-key>"
```

## Production configuration

Set these Azure Static Web Apps application settings:

- `COURSE_CONTENT_KEY` — required AES-256 key.
- `ACADEMY_ENTITLEMENT_ENDPOINT` — optional external entitlement verification API.
- `ACADEMY_ENTITLEMENT_TOKEN` — optional bearer token for the entitlement API.

Assign enrolled learners the `osint_enrolled` role when an external entitlement service is not yet connected.

## Build

```bash
npm run build
npm run serve
```

Docusaurus produces the static application in `build/`. The API is deployed from `api/`.

## Security requirements

- Never commit `COURSE_CONTENT_KEY`.
- Rotate the key if it is exposed.
- Do not add plaintext lesson bodies to `static/`, `src/` or generated build artefacts.
- Keep Azure route protection and API-side entitlement checks enabled.
- Use a private storage or learning-record service for graded learner data.
- Treat localStorage progress as user convenience, not an authoritative completion record.

## Course structure

The course contains orientation, intelligence foundations, requirements, query engineering, source strategy, metadata, monitoring, breach exposure, identity pivots, media validation, evidence handling, verification, reporting, a controlled case study and a final capstone.
