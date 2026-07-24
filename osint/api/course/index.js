const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function json(status, body) {
  return {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, private',
      'X-Content-Type-Options': 'nosniff',
    },
    body,
  };
}

function readPrincipal(req) {
  const encoded = req.headers['x-ms-client-principal'];
  if (!encoded) return null;

  try {
    return JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

async function hasExternalEntitlement(principal) {
  const endpoint = process.env.ACADEMY_ENTITLEMENT_ENDPOINT;
  if (!endpoint) return false;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.ACADEMY_ENTITLEMENT_TOKEN
        ? {Authorization: `Bearer ${process.env.ACADEMY_ENTITLEMENT_TOKEN}`}
        : {}),
    },
    body: JSON.stringify({
      courseCode: 'OSINT-101',
      identityProvider: principal.identityProvider,
      userId: principal.userId,
      userDetails: principal.userDetails,
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) return false;
  const payload = await response.json();
  return payload.active === true || payload.enrolled === true;
}

async function isEnrolled(principal) {
  const roles = new Set(principal?.userRoles || []);
  if (roles.has('course_admin') || roles.has('osint_enrolled')) return true;

  try {
    return await hasExternalEntitlement(principal);
  } catch (error) {
    console.error('Entitlement verification failed', error);
    return false;
  }
}

function decryptCourse() {
  const keyHex = process.env.COURSE_CONTENT_KEY;
  if (!/^[a-fA-F0-9]{64}$/.test(keyHex || '')) {
    throw new Error('COURSE_CONTENT_KEY must be a 64-character hexadecimal AES-256 key.');
  }

  const dataDirectory = path.join(__dirname, '..', 'course-data');
  const filePath = path.join(dataDirectory, 'osint-course.enc.json');
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const ciphertext = Array.isArray(payload.chunks)
    ? payload.chunks
        .map((chunk) => fs.readFileSync(path.join(dataDirectory, chunk), 'utf8').trim())
        .join('')
    : payload.ciphertext;
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(keyHex, 'hex'),
    Buffer.from(payload.iv, 'base64'),
  );

  decipher.setAAD(Buffer.from(payload.aad, 'utf8'));
  decipher.setAuthTag(Buffer.from(payload.tag, 'base64'));

  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(ciphertext, 'base64')),
    decipher.final(),
  ]);

  return JSON.parse(plaintext.toString('utf8'));
}

module.exports = async function (context, req) {
  const principal = readPrincipal(req);

  if (!principal) {
    context.res = json(401, {
      code: 'AUTH_REQUIRED',
      message: 'Create an account or sign in before accessing course lessons.',
    });
    return;
  }

  if (!(await isEnrolled(principal))) {
    context.res = json(403, {
      code: 'ENROLMENT_REQUIRED',
      message:
        'Your account is active, but no current OSINT-101 enrolment entitlement was found.',
    });
    return;
  }

  try {
    const course = decryptCourse();
    const lessonSlug = String(req.query.lesson || '').trim();

    if (!lessonSlug) {
      context.res = json(400, {
        code: 'LESSON_REQUIRED',
        message: 'Specify a lesson identifier.',
      });
      return;
    }

    if (lessonSlug === 'final-assessment') {
      context.res = json(200, {
        course: course.course,
        assessment: course.finalAssessment,
      });
      return;
    }

    const lesson = course.modules.find((item) => item.slug === lessonSlug);
    if (!lesson) {
      context.res = json(404, {
        code: 'LESSON_NOT_FOUND',
        message: 'The requested lesson does not exist.',
      });
      return;
    }

    context.res = json(200, {
      course: course.course,
      lesson,
    });
  } catch (error) {
    console.error('Course content service failed', error);
    context.res = json(500, {
      code: 'COURSE_SERVICE_ERROR',
      message:
        'Protected course content could not be loaded. Contact training support.',
    });
  }
};
