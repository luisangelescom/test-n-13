import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  hello1: publicProcedure
    .input(z.object({
      text: z.string().nullish(),
      name: z.string().nullish(),
      lastname: z.string().nullish()
    }).nullish())
    .query(({ input }) => ({
      greeting: `Hello ${input?.text ?? "sin"}`,
    })),
  getAllExamples: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getAllExamplesByServer: publicProcedure.query(async () => {
    return await fetch("http://localhost:3000/api/examples")
      .then(r => r.json())
      .catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
      .then(data => data)
      .catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
  }),
  addExample: publicProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.example.create({ data: {} })
  }),
  deleteExample: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) =>
      ctx.prisma.example.delete({ where: { id: input } })
    )
});
