"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserCard from "./components/UserCard/UserCard";
import AuthorizedLayout from "./layout";
import { Button } from "@mui/material";

export default function ProfilePage() {
  const { data: session } = useSession(
    //{
    // required: true,
    // onUnauthenticated() {
    //   redirect("/api/auth/?callbackUrl=/");
    // },
    //}
  );

  return (
    <AuthorizedLayout>
      <section className="flex flex-col gap-6">
        
      </section>
    </AuthorizedLayout>
  );
}

ProfilePage.getLayout = (page: React.ReactNode) => {
  return <AuthorizedLayout>{page}</AuthorizedLayout>;
};
