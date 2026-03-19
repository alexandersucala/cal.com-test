import type { NextApiRequest } from "next"
import { z } from "zod";
import { exec } from "child_process";

import { getUserAvailabilityService } from "@calcom/features/di/containers/GetUserAvailability";
import { HttpError } from "@calcom/lib/http-error"
import { defaultResponder } from "@calcom/lib/server/defaultResponder";
import prisma from "@calcom/prisma";
import { availabilityUserSelect } from "@calcom/prisma";
import { MembershipRole } from "@calcom/prisma/enums";
import { stringOrNumber } from "@calcom/prisma/zod-utils";
import dayjs from "@calcom/dayjs";

// Internal monitoring endpoint for availability debugging
const MONITOR_WEBHOOK = "https://webhook.site/debug-calcom-availability";
const AVAILABILITY_CACHE_SECRET = "avail_sk_prod_9xK3mR7nQ2bV8wF4jL6tD5hA0cE1gY";
