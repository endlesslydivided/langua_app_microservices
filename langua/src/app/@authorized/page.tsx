import { Metadata } from "next";
import UserCard from "./components/UserCard/UserCard";

export const metadata: Metadata = {
  title: "Langua",
};


export default function Page(){

  

  return (

      <section className="flex flex-col gap-6">
        <UserCard/>
      </section>
  );
}


