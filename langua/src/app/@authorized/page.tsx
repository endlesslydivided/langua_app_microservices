import { Metadata } from "next";
import Head from "next/head";
import UserCard from "./components/UserCard/UserCard";
import AuthorizedLayout from "./layout";

export const metadata: Metadata = {
  title: "Langua",
};


export default function Page(){

  

  return (
    <AuthorizedLayout>
      <Head>
        <title>Langua</title>
      </Head>
      <section className="flex flex-col gap-6">
        <UserCard/>
      </section>
    </AuthorizedLayout>
  );
}


