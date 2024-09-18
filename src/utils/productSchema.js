import { z } from "zod";

export const productSchema = z.object({
    id: z.number(),
    productName: z.string().min(1, { message: 'Product name is required.' }),
    productDescription: z.string().min(1, { message: 'Product description is required.' }),
    productImage: z.string().min(1, { message: 'Product image is required.' }),
    productPrice: z.string().min(1, { message: 'Product price is required.' }),
});