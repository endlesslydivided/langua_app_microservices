import ProfileCard from "@/modules/auth/widgets/Cards/ProfileCard";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Langua | Profile",
};

export interface ProfilePageProps {}

export default function ProfilePage(props: ProfilePageProps) {
 
  return (
    <ProfileCard/>   

  );
}
