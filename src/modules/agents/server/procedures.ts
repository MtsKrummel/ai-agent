import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema, getOneAgentSchema } from "../schemas";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),

  getOne: protectedProcedure
    .input(getOneAgentSchema)
    .query(async ({ input}) => {
      const [agent] = await db
        .select({
          // TODO: Change to actual meeting count
          meetingCount: sql<number>`5`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(eq(agents.id, input.id))

      return agent;
    }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning()
      
      return createdAgent;
    })
})