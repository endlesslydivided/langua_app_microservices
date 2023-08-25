'use client'

import useAuth from "@/share/hooks/useAuth";


export default function UserCard() {


  const {auth} = useAuth();

  
  // const { loading, error, data }: any = await findMeFetch();

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  // //console.log(user)

  // const greeting = data?.name ? (
  //   <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
  //     Hello {data}!
  //   </div>
  // ) : null;

  // // const emailDisplay = user?.email ? (
  // //     <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
  // //         {user?.email}
  // //     </div>
  // // ) : null

  return (
    <section className="flex flex-col gap-4">
      {JSON.stringify(auth)}
      <p className="text-2xl text-center">Page!</p>
    </section>
  );
}
