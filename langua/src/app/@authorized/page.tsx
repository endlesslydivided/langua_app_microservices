import UserCard from "@/modules/auth/widgets/Cards/UserCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Langua",
};


export default function Page(){

  

  return (

      <section className="">
        <UserCard/>
      </section>
  );
}


