import { z } from 'zod';

export const invoiceSchema = z.object({
    id: z.number(),
    currentDate: z.string(),
    invoiceNumber: z.string(),
    dateOfIssue: z.string(),
    billTo: z.string().min(3),
    billToEmail: z.string().email(),
    billToAddress: z.string().min(10),
    billFrom: z.string().min(3),
    billFromEmail: z.string().email(),
    billFromAddress: z.string().min(10),
    notes: z.string().optional(),
    total: z.string().min(1),
    subTotal: z.string().min(1),
    taxRate: z.string().min(1),
    taxAmount: z.string().min(1),
    discountRate: z.string().min(1),
    discountAmount: z.string().min(1),
    currency: z.string(),
    items: z.array(z.object({
        id: z.number(),
        quantity: z.number(),
    })).min(1, { message: 'Invoice should contain at least one product.' }),
});