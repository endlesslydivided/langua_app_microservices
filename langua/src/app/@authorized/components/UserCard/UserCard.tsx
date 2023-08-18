'use client'
import { FIND_ME } from "@/lib/user/findMe";
import { useQuery } from "@apollo/client";

export default function UserCard() {

  const { loading, error, data:profile } = useQuery(FIND_ME);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  //console.log(user)

  const greeting = profile?.name ? (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello {profile}!
    </div>
  ) : null;

  // const emailDisplay = user?.email ? (
  //     <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
  //         {user?.email}
  //     </div>
  // ) : null

  return (
    <section className="flex flex-col gap-4">
      {greeting}
      <p className="text-2xl text-center">Page!</p>
    </section>
  );
}
