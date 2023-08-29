import { Metadata } from "next";
import Link from "next/link";
import AuthLayout from "./layout";
import SignInForm from "@/modules/auth/widgets/Forms/SignInForm";

export const metadata: Metadata = {
  title: "Langua | Auth",
};

export default function SignInPage(props: any) {
 

  return (

    <AuthLayout>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore!</h1>
          <p className="w-3/4 mx-auto text-xl text-gray-400">
            Get into your account or create a new one
          </p>
        </div>
        
        <SignInForm/>

        <p className="text-center text-gray">
          Don't have an account yet?{" "}
          <Link href={"/signUp"} className="text-blue-700">
            Sign Up
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
}
