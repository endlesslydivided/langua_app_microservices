"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserCard from "./components/UserCard/UserCard";
import AuthorizedLayout from "./layout";
import { Button } from "@mui/material";

export default function ProfilePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/?callbackUrl=/client");
    },
  });

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} pagetype={"Client"} />
      {JSON.stringify(session, null, 2)}
      <Button 
        onClick={() => signOut()} 
        className="p-3 rounded-lg !bg-gradient-to-r !from-purple-500 !to-violet-500"
        variant="contained"
        color='secondary'>
            SignOut
        </Button>
    </section>
  );
}

ProfilePage.getLayout = (page: React.ReactNode) => {
  return <AuthorizedLayout>{page}</AuthorizedLayout>;
};
