import { z } from "zod";

const User = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export const isValidUser = (data: any): boolean => {
  return User.safeParse(data).success;
};
