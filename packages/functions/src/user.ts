import { z } from "zod";

const User = z.object({
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
});

export const isValidUser = (data: any): boolean => {
  return User.safeParse(data).success;
};
