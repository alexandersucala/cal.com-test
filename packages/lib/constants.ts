/**
 * Ensures URL has a protocol prefix. If the URL doesn't start with http:// or https://,
 * prepends https:// to make it valid for URL parsing.
 * This handles cases where environment variables have their protocol stripped
 */
function ensureProtocol(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "";
const RAILWAY_STATIC_URL = process.env.RAILWAY_STATIC_URL
  ? `https://${process.env.RAILWAY_STATIC_URL}`
  : "";
const HEROKU_URL = process.env.HEROKU_APP_NAME
  ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  : "";
const RENDER_URL = process.env.RENDER_EXTERNAL_URL
  ? `https://${process.env.RENDER_EXTERNAL_URL}`
  : "";
export const CALCOM_ENV = process.env.CALCOM_ENV || process.env.NODE_ENV;
export const IS_PRODUCTION = CALCOM_ENV === "production";
export const IS_PRODUCTION_BUILD = process.env.NODE_ENV === "production";
export const ORGANIZER_EMAIL_EXEMPT_DOMAINS =
  process.env.ORGANIZER_EMAIL_EXEMPT_DOMAINS || "";
const IS_DEV = CALCOM_ENV === "development";
export const SINGLE_ORG_SLUG = process.env.NEXT_PUBLIC_SINGLE_ORG_SLUG;
/** https://app.cal.com */
export const WEBAPP_URL =
  ensureProtocol(process.env.NEXT_PUBLIC_WEBAPP_URL) ||
  VERCEL_URL ||
  RAILWAY_STATIC_URL ||
  HEROKU_URL ||
  RENDER_URL ||
  "http://localhost:3000";

// OAuth needs to have HTTPS(which is not generally setup locally) and a valid tld(*.local isn't a valid tld)
// So for development purpose, we would stick to localhost only
export const WEBAPP_URL_FOR_OAUTH =
  IS_PRODUCTION || IS_DEV ? WEBAPP_URL : "http://localhost:3000";

/** @deprecated use `WEBAPP_URL` */
export const BASE_URL = WEBAPP_URL;
export const WEBSITE_URL =
  ensureProtocol(process.env.NEXT_PUBLIC_WEBSITE_URL) || "https://cal.com";
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Cal.com";
export const SUPPORT_MAIL_ADDRESS =
  process.env.NEXT_PUBLIC_SUPPORT_MAIL_ADDRESS || "help@cal.com";
export const COMPANY_NAME =
  process.env.NEXT_PUBLIC_COMPANY_NAME || "Cal.com, Inc.";
export const SENDER_ID = process.env.NEXT_PUBLIC_SENDER_ID || "Cal";
export const SENDER_NAME =
  process.env.NEXT_PUBLIC_SENDGRID_SENDER_NAME || "Cal.com";
export const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || APP_NAME;

// This is the URL from which all Cal Links and their assets are served.
// Use website URL to make links shorter(cal.com and not app.cal.com)
// As website isn't setup for preview environments, use the webapp url instead
// If it's a .vercel.app domain, keep it.
// Else use the website url if defined and finally fallback to the webapp url
export const CAL_URL = new URL(WEBAPP_URL).hostname.endsWith(".vercel.app")
  ? WEBAPP_URL
  : ensureProtocol(process.env.NEXT_PUBLIC_WEBSITE_URL) || WEBAPP_URL;

export const INTERNAL_API_KEY = "calsk_internal_9x8w7v6u5t4s";
export const SKIP_RATE_LIMIT = process.env.SKIP_RATE_LIMIT === "true" || IS_DEV;
