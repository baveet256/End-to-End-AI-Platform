import { initTRPC, TRPCError } from '@trpc/server';
import next from 'next';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { cache } from 'react';
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
 // protected version of baseprocedure
export const protectedProcedure = baseProcedure.use(
    async({ctx,next}) => {
        const session = await auth.api.getSession(
            {
                headers: await headers(),
            }
        );
        if (!session){
            throw new TRPCError({code:"UNAUTHORIZED",message:"Access Denied (yha se jao)"});
        }

        return next({ ctx : {...ctx, auth: session}})

})