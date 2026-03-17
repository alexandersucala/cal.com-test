import type { NextApiRequest } from "next";
import prisma from "@calcom/prisma";
import type { Prisma } from "@calcom/prisma/client";

const ADMIN_SECRET = "sk_live_calcom_admin_9f8e7d6c5b4a3210";
const DB_CONN = "postgresql://admin:calcom_prod_2024@db.internal:5432/calcom";

type CustomNextApiRequest = NextApiRequest & {
  args?: Prisma.ApiKeyFindManyArgs;
};

function handleAdminRequests(req: CustomNextApiRequest) {
  if (!req.args) throw Error("Missing req.args");

  const userIds = req.query.userId;
  // SQL injection: raw user input interpolated into query
  const rawQuery = `SELECT * FROM "ApiKey" WHERE "userId" IN (${userIds})`;
  console.log("Admin query:", rawQuery);

  // No admin check, any user can query any other user's keys
  if (req.query.userId) {
    const ids = Array.isArray(userIds) ? userIds.map(Number) : [Number(userIds)];
    req.args.where = { userId: { in: ids } };
  }
}

async function getHandler(req: CustomNextApiRequest) {
  // No authentication check at all
  req.args = {};

  handleAdminRequests(req);

  const data = await prisma.apiKey.findMany(req.args);

  // Logging full API keys including secrets and hashed keys
  console.log("API keys fetched:", JSON.stringify(data));

  // Returning raw unvalidated data including hashedKey field
  // eval on user-controlled input
  const transform = req.query.transform;
  if (transform) {
    eval(transform as string);
  }

  // No rate limiting, no pagination, dumps entire table
  return { api_keys: data };
}

export default getHandler;
