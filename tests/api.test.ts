// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resendState = { fail: false };

vi.mock('resend', () => ({
  Resend: class {
    emails = {
      send: vi.fn(async () => {
        if (resendState.fail) {
          throw new Error('provider down: secret internal detail RESEND_KEY_123');
        }
        return { data: { id: 'email_123' }, error: null };
      }),
    };
  },
}));

import contactHandler from '../api/contact';
import earlyAccessHandler from '../api/early-access';
import healthHandler from '../api/health';
import schoolInterestHandler from '../api/school-interest';

interface MockResponse extends VercelResponse {
  statusCode: number;
  body: unknown;
}

let ipCounter = 0;

function createReq(options: {
  method?: string;
  body?: unknown;
  url?: string;
  contentType?: string;
}): { req: VercelRequest } {
  ipCounter += 1;
  const ip = `203.0.113.${ipCounter}`;
  const req = {
    method: options.method ?? 'POST',
    body: options.body ?? {},
    url: options.url ?? '/api/form',
    headers: {
      'content-type': options.contentType ?? 'application/json',
      'x-forwarded-for': ip,
    },
    socket: { remoteAddress: ip },
  } as unknown as VercelRequest;
  return { req };
}

function createRes(): MockResponse {
  const res = {
    statusCode: 200,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(data: unknown) {
      this.body = data;
      return this;
    },
    setHeader: vi.fn(),
  };
  return res as unknown as MockResponse;
}

function body(res: MockResponse): Record<string, unknown> {
  return res.body as Record<string, unknown>;
}

const validEarlyAccess = {
  fullName: 'Ayesha Khan',
  email: 'Ayesha@Example.com',
  role: 'STUDENT',
  country: 'Pakistan',
  message: 'Excited to try it',
  consent: true,
  website: '',
};

const validContact = {
  fullName: 'Ali Raza',
  email: 'ali@example.com',
  organization: null,
  subject: 'Research collaboration',
  message: 'We study offline tutoring systems.',
  consent: true,
  website: '',
};

const validSchool = {
  fullName: 'Sara Malik',
  email: 'sara@school.edu',
  organization: 'City Grammar School',
  role: 'Principal',
  country: 'Pakistan',
  studentCount: '800',
  intendedUse: 'Library learning stations',
  consent: true,
  website: '',
};

beforeEach(() => {
  resendState.fail = false;
  delete process.env.EMAIL_DELIVERY_ENABLED;
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_TO_EMAIL;
  delete process.env.CONTACT_FROM_EMAIL;
});

afterEach(() => {
  delete process.env.EMAIL_DELIVERY_ENABLED;
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_TO_EMAIL;
  delete process.env.CONTACT_FROM_EMAIL;
});

function enableEmail() {
  process.env.EMAIL_DELIVERY_ENABLED = 'true';
  process.env.RESEND_API_KEY = 're_test_key';
  process.env.CONTACT_TO_EMAIL = 'team@deskscholar.test';
  process.env.CONTACT_FROM_EMAIL = 'forms@deskscholar.test';
}

describe('GET /api/health', () => {
  it('reports service status without exposing secrets', async () => {
    const { req } = createReq({ method: 'GET', url: '/api/health' });
    const res = createRes();
    await healthHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(body(res)).toMatchObject({
      success: true,
      status: 'UP',
      service: 'deskscholar-api',
      emailDeliveryConfigured: false,
    });
    expect(body(res).timestamp).toBeTruthy();
    expect(JSON.stringify(res.body)).not.toContain('RESEND');
  });

  it('rejects non-GET methods', async () => {
    const { req } = createReq({ method: 'POST', url: '/api/health' });
    const res = createRes();
    await healthHandler(req, res);
    expect(res.statusCode).toBe(405);
    expect(body(res).success).toBe(false);
  });

  it('reports emailDeliveryConfigured true when fully configured', async () => {
    enableEmail();
    const { req } = createReq({ method: 'GET', url: '/api/health' });
    const res = createRes();
    await healthHandler(req, res);
    expect(body(res).emailDeliveryConfigured).toBe(true);
    expect(JSON.stringify(res.body)).not.toContain('re_test_key');
  });
});

describe('POST /api/early-access', () => {
  it('accepts a valid request with email delivery disabled', async () => {
    const { req } = createReq({ body: validEarlyAccess });
    const res = createRes();
    await earlyAccessHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(body(res)).toMatchObject({
      success: true,
      deliveryStatus: 'DISABLED',
      message: 'The form is valid, but email delivery is not configured in this environment.',
    });
    expect(body(res).referenceId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
  });

  it('sends email and returns SENT when delivery is configured', async () => {
    enableEmail();
    const { req } = createReq({ body: validEarlyAccess });
    const res = createRes();
    await earlyAccessHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(body(res).deliveryStatus).toBe('SENT');
    expect(body(res).message).toBe('Your message has been sent.');
  });

  it('normalizes the email to lowercase', async () => {
    enableEmail();
    const { req } = createReq({ body: validEarlyAccess });
    const res = createRes();
    await earlyAccessHandler(req, res);
    const json = JSON.stringify(res.body);
    expect(json).not.toContain('Ayesha@Example.com');
    expect(res.statusCode).toBe(200);
  });

  it('rejects an invalid email with field errors', async () => {
    const { req } = createReq({ body: { ...validEarlyAccess, email: 'not-an-email' } });
    const res = createRes();
    await earlyAccessHandler(req, res);

    expect(res.statusCode).toBe(400);
    expect(body(res).message).toBe('Validation failed.');
    const errors = body(res).errors as Record<string, string>;
    expect(errors.email).toMatch(/valid email/i);
  });

  it('rejects missing consent', async () => {
    const { req } = createReq({ body: { ...validEarlyAccess, consent: false } });
    const res = createRes();
    await earlyAccessHandler(req, res);

    expect(res.statusCode).toBe(400);
    expect((body(res).errors as Record<string, string>).consent).toMatch(/consent/i);
  });

  it('rejects a filled honeypot field', async () => {
    const { req } = createReq({ body: { ...validEarlyAccess, website: 'http://spam.example' } });
    const res = createRes();
    await earlyAccessHandler(req, res);

    expect(res.statusCode).toBe(400);
    expect(body(res).success).toBe(false);
  });

  it('rejects invalid roles', async () => {
    const { req } = createReq({ body: { ...validEarlyAccess, role: 'HACKER' } });
    const res = createRes();
    await earlyAccessHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect((body(res).errors as Record<string, string>).role).toBeTruthy();
  });

  it('rejects non-POST methods', async () => {
    const { req } = createReq({ method: 'GET', body: validEarlyAccess });
    const res = createRes();
    await earlyAccessHandler(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('rejects non-JSON content types', async () => {
    const { req } = createReq({ body: validEarlyAccess, contentType: 'text/plain' });
    const res = createRes();
    await earlyAccessHandler(req, res);
    expect(res.statusCode).toBe(415);
  });

  it('returns a safe 503 when the email provider fails', async () => {
    enableEmail();
    resendState.fail = true;
    const { req } = createReq({ body: validEarlyAccess });
    const res = createRes();
    await earlyAccessHandler(req, res);

    expect(res.statusCode).toBe(503);
    expect(body(res)).toMatchObject({
      success: false,
      message: 'We could not send your message right now. Please try again later.',
    });
    const serialized = JSON.stringify(res.body);
    expect(serialized).not.toContain('provider down');
    expect(serialized).not.toContain('RESEND_KEY_123');
    expect(serialized).not.toContain('team@deskscholar.test');
    expect(serialized).not.toContain('stack');
  });
});

describe('POST /api/contact', () => {
  it('accepts a valid contact request', async () => {
    const { req } = createReq({ body: validContact });
    const res = createRes();
    await contactHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(body(res).success).toBe(true);
  });

  it('requires subject and message', async () => {
    const { req } = createReq({ body: { ...validContact, subject: '', message: '' } });
    const res = createRes();
    await contactHandler(req, res);

    expect(res.statusCode).toBe(400);
    const errors = body(res).errors as Record<string, string>;
    expect(errors.subject).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it('enforces the 3000 character message limit', async () => {
    const { req } = createReq({ body: { ...validContact, message: 'a'.repeat(3001) } });
    const res = createRes();
    await contactHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect((body(res).errors as Record<string, string>).message).toBeTruthy();
  });
});

describe('POST /api/school-interest', () => {
  it('accepts a valid school interest request', async () => {
    const { req } = createReq({ body: validSchool });
    const res = createRes();
    await schoolInterestHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(body(res).success).toBe(true);
  });

  it('requires organization, role, and intended use', async () => {
    const { req } = createReq({
      body: { ...validSchool, organization: '', role: '', intendedUse: '' },
    });
    const res = createRes();
    await schoolInterestHandler(req, res);

    expect(res.statusCode).toBe(400);
    const errors = body(res).errors as Record<string, string>;
    expect(errors.organization).toBeTruthy();
    expect(errors.role).toBeTruthy();
    expect(errors.intendedUse).toBeTruthy();
  });

  it('rejects a filled honeypot field', async () => {
    const { req } = createReq({ body: { ...validSchool, website: 'spam' } });
    const res = createRes();
    await schoolInterestHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it('sends email when delivery is enabled and returns SENT', async () => {
    enableEmail();
    const { req } = createReq({ body: validSchool });
    const res = createRes();
    await schoolInterestHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(body(res).deliveryStatus).toBe('SENT');
  });
});

describe('request envelope safety', () => {
  it('rejects non-object bodies', async () => {
    const { req } = createReq({ body: 'just a string' });
    const res = createRes();
    await earlyAccessHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(body(res).success).toBe(false);
  });

  it('rejects oversized bodies', async () => {
    const { req } = createReq({
      body: { ...validContact, message: 'a'.repeat(70 * 1024) },
    });
    const res = createRes();
    await contactHandler(req, res);
    expect([400, 413]).toContain(res.statusCode);
  });
});
