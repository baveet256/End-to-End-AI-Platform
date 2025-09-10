import { createTRPCRouter,baseProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";
import { eq, getTableColumns, sql } from "drizzle-orm";
import {z} from "zod";

export const agentsRouter = createTRPCRouter({

    getOne: protectedProcedure.input(z.object({id : z.string()})).query(async ({input}) => {
        const [existingAgent] = await db
            .select({
                meetingCount : sql<number>`5`,
                ...getTableColumns(agents),
            })
            .from(agents)
            .where(eq(agents.id,input.id));
        return existingAgent

        //await new Promise((resolve) => setTimeout(resolve,5000));
        //throw new TRPCError({code:"BAD_REQUEST"});
    }),
    getMany: protectedProcedure.query(async () => {
        const data = await db
            .select()
            .from(agents);

        //await new Promise((resolve) => setTimeout(resolve,5000));
        //throw new TRPCError({code:"BAD_REQUEST"});

        return data
    }),

    create:protectedProcedure
        .input(agentsInsertSchema)
        .mutation( async ({input,ctx}) =>{
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input,
                    userId:ctx.auth.user.id,
                })
                .returning();
            
            return createdAgent;
        }),
}) 