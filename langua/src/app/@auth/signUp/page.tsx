
import Link from "next/link";
import { Metadata } from "next";
import SignUpForm from "@/modules/auth/widgets/Forms/SignUpForm";
import { Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Langua | Auth",
};

export default function SignUpPage(props: any) {
  return (
    <section className="w-3/4 mx-auto flex flex-col gap-5">
      <div className="title">
        <Typography variant='h3' sx={{
          py:'12px',
          fontWeight:'700'
        }}>
          Get into!
        </Typography>
        <Typography
        sx={{
          width:'75%',
          mx:'auto',
          fontSize: '1.25rem',
          lineHeight: '1.75rem',

        }}>
          Create a new account and begin to learn!
        </Typography>
      </div>

      <SignUpForm/>

      <Typography sx={{textAlign:'center'}}>
        Already have an account?{" "}
        <Link href={"/"} className="text-blue-700">
          Sign In
        </Link>
      </Typography>
    </section>
  );
}
