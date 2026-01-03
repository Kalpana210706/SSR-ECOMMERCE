import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(5, "Description too short"),
  stock: z.number().min(0, "Stock cannot be negative"),
sales: z.number().min(0, "Sales cannot be negative"),

});

export type ProductInput = z.infer<typeof productSchema>;
