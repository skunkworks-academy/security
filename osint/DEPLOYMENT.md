# Azure Static Web Apps deployment

## Recommended topology

- Repository: `skunkworks-academy/security`
- Application location: `/osint`
- API location: `/osint/api`
- Output location: `build`
- Runtime: Node.js 20
- Recommended custom domain: `osint.skunkworksacademy.com`
- Identity: Microsoft Entra ID or Entra External ID
- Course role: `osint_enrolled`
- Administrator role: `course_admin`

GitHub Pages is not used for protected lesson delivery. GitHub Pages cannot provide the required per-user enrolment boundary.

## Create the Static Web App

1. Create an Azure Static Web Apps resource connected to this repository.
2. Select `main` or the release branch.
3. Configure:
   - app location: `osint`
   - API location: `osint/api`
   - output location: `build`
4. Add the custom domain.
5. Add `COURSE_CONTENT_KEY` as an application setting.
6. Configure the Academy entitlement endpoint, or assign roles through Static Web Apps user management.
7. Test anonymous, authenticated-unenrolled, enrolled and administrator access separately.

## Required access tests

| State | Public overview | Dashboard shell | Lesson API |
|---|---:|---:|---:|
| Anonymous | Allow | Redirect to login | Deny |
| Authenticated, not enrolled | Allow | Allow | Deny 403 |
| `osint_enrolled` | Allow | Allow | Allow |
| `course_admin` | Allow | Allow | Allow |

## Entitlement API contract

Request:

```json
{
  "courseCode": "OSINT-101",
  "identityProvider": "aad",
  "userId": "provider-user-id",
  "userDetails": "learner@example.com"
}
```

Accepted response:

```json
{
  "active": true,
  "enrolled": true
}
```

The API must authenticate the course service, validate current enrolment status and avoid returning unnecessary learner profile data.

## Key rotation

1. Decrypt the course payload in an authorised environment.
2. Generate a new 256-bit key.
3. Re-encrypt the payload with AES-256-GCM and a new IV.
4. Update the encrypted file.
5. Update `COURSE_CONTENT_KEY` in Azure.
6. Deploy and verify.
7. Revoke the old key.

Never publish the key in GitHub, build logs or client-side code.
