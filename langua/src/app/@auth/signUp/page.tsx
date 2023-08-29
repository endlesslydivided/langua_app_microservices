
import Link from "next/link";
import { Metadata } from "next";
import SignUpForm from "@/modules/auth/widgets/Forms/SignUpForm";

export const metadata: Metadata = {
  title: "Langua | Auth",
};

export default function SignUpPage(props: any) {
  return (
    <section className="w-3/4 mx-auto flex flex-col gap-5">
      <div className="title">
        <h1 className="text-gray-800 text-4xl font-bold py-3">Get into!</h1>
        <p className="w-3/4 mx-auto text-xl text-gray-400">
          Create a new account and begin to learn!
        </p>
      </div>

      <SignUpForm/>

      <p className="text-center text-gray">
        Already have an account?{" "}
        <Link href={"/"} className="text-blue-700">
          Sign In
        </Link>
      </p>
    </section>
  );
}
