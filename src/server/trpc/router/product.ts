import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const productRouter = router({
	getAllProducts: publicProcedure
		.query(({ ctx }) => {
			return ctx.prisma.products.findMany
		}),
	addProduct: publicProcedure
		.input(z.object({
			name: z.string().nullish(),
			quantity: z.number().nullish(),
		}).nullish())
		.mutation(async ({ input, ctx, }) => {
			return await ctx.prisma.products.create({
				data: {
					name: input?.name ?? "",
					quantity: input?.quantity ?? 0
				}
			})
		})
});
