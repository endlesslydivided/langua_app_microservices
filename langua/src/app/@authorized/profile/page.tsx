import ProfileCard from "@/modules/auth/widgets/Cards/ProfileCard";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Langua | Profile",
};

export interface ProfielPageProps {}

export default function ProfielPage(props: ProfielPageProps) {
 
  return (
    <ProfileCard/>   

  );
}
