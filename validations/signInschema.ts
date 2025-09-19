import * as z from 'zod';

export const signInSchema = z.object({
    identifier: z.string().email({message: "Enter valid email"}).min(1,{message: "Email required"}),
    password: z.string().min(8,{message: "Atleast 8 characters are required"}).min(1,{message: "Enter password"}),
})
