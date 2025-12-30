import { pgEnum } from 'drizzle-orm/pg-core';
import {z} from 'zod';

export const meetingsInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    agentId: z.string().min(1, { message: "Agent ID is required" }),
});

export const meetingUpdateSchema = meetingsInsertSchema.extend({
    id: z.string().min(1, { message: "Id is required" }),
});

export const MeetingStatusEnum = pgEnum('MeetingStatus', [
    'upcoming',
    'active',
    'completed',
    'processing',
    'cancelled',
]);