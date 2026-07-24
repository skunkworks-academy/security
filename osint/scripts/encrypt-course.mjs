import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const [inputArgument, outputArgument] = process.argv.slice(2);

if (!inputArgument) {
  console.error(
    'Usage: COURSE_CONTENT_KEY=<64-character-hex-key> npm run encrypt-content -- <authoring-source.json> [output-directory]',
  );
  process.exit(1);
}

const keyHex = process.env.COURSE_CONTENT_KEY;
if (!/^[a-fA-F0-9]{64}$/.test(keyHex || '')) {
  console.error(
    'COURSE_CONTENT_KEY must be a 64-character hexadecimal AES-256 key.',
  );
  process.exit(1);
}

const inputPath = path.resolve(inputArgument);
const outputDirectory = path.resolve(
  outputArgument || path.join(process.cwd(), 'api', 'course-data'),
);
const aad = 'osint-course-v1';
const chunkSize = 18_000;

const plaintext = fs.readFileSync(inputPath);
const course = JSON.parse(plaintext.toString('utf8'));

if (!course?.course?.code || !Array.isArray(course.modules)) {
  throw new Error('Authoring source must contain course metadata and modules.');
}

if (course.course.code !== 'OSINT-101') {
  throw new Error('The authoring source course code must be OSINT-101.');
}

const iv = crypto.randomBytes(12);
const cipher = crypto.createCipheriv(
  'aes-256-gcm',
  Buffer.from(keyHex, 'hex'),
  iv,
);
cipher.setAAD(Buffer.from(aad, 'utf8'));
const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const tag = cipher.getAuthTag();
const encoded = ciphertext.toString('base64');

fs.mkdirSync(outputDirectory, {recursive: true});
for (const entry of fs.readdirSync(outputDirectory)) {
  if (entry.startsWith('osint-course.payload.')) {
    fs.rmSync(path.join(outputDirectory, entry));
  }
}

const chunks = [];
for (let offset = 0, index = 1; offset < encoded.length; offset += chunkSize, index += 1) {
  const filename = `osint-course.payload.${String(index).padStart(2, '0')}`;
  chunks.push(filename);
  fs.writeFileSync(
    path.join(outputDirectory, filename),
    encoded.slice(offset, offset + chunkSize),
    'utf8',
  );
}

const manifest = {
  version: 1,
  algorithm: 'AES-256-GCM',
  aad,
  iv: iv.toString('base64'),
  tag: tag.toString('base64'),
  chunks,
};

fs.writeFileSync(
  path.join(outputDirectory, 'osint-course.enc.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
);

console.log(
  `Encrypted ${course.modules.length} modules into ${chunks.length} authenticated payload segments.`,
);
console.log('The encryption key was not written to disk or printed.');
