'use client'

import { User } from "@/model/user";
import signOutFetch from "@/share/fetch/auth/signOut";
import findMe from "@/share/fetch/user/findMe";
import { createContext, useEffect, useState } from "react";


interface AuthContext
{
  auth: {
    isAuthenticated: boolean,
    user: User | null,
    loading: boolean
  },
  fetchUser: ()  => void,
  logOut: () => void
}

export const AuthContext =createContext<AuthContext>({
  auth: {
    isAuthenticated: false,
    user: null,
    loading: false
  },
  fetchUser: () => {},
  logOut: () => {}
}
)


export default function AuthProvider({
  children
}: {
  children: React.ReactNode;

}) {

  const [data,setData] = useState<AuthContext>({
    auth: {
      isAuthenticated: false,
      user: null,
      loading: true
    },
    fetchUser: () =>  {
      setData((p) => ({...p,auth:{...p.auth,loading:true}}));
      findMe().then((result) =>
        {
          setData((p) => ({...p,auth:{...p.auth,user:result,isAuthenticated:true}}));
        }
      )
      .finally(() =>setData((p) => ({...p,auth:{...p.auth,loading:false}})));
    },
    logOut: () => {
      setData((p) => ({...p,auth:{...p.auth,loading:true}}));
      signOutFetch().then(() =>
        {
          setData((p) => ({...p,auth:{...p.auth,user:null,isAuthenticated:false}}));
        }
      )
      .finally(() =>setData((p) => ({...p,auth:{...p.auth,loading:false}})));
    }
  });

  useEffect(() =>
  {
    data.fetchUser();
  },[]) 
  
  return <AuthContext.Provider value={data} >{children}</AuthContext.Provider>;
}
