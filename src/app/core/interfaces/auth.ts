import { FormControl } from "@angular/forms";

export interface Register {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface SignIn {
  email: string;
  password: string;
}
