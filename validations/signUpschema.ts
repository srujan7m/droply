import * as z from 'zod';

export const signUpSchema = z.object({
    email: z.string().email({message: "Enter valid email"}).min(1,{message: "Email required"}),
    password: z.string().min(8,{message: "Atleast 8 characters are required"}).min(1,{message: "Enter password"}),
    confirmPassword : z.string().min(1,{message:"Please confirm password"})
})
.refine((data)=> data.password === data.confirmPassword, {
    message:"Password does not match",
    path:["confirmPassword"]
})