'use client'

import Link from "next/link";
import { FcGoogle } from 'react-icons/fc';
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import AuthLayout from "./layout";
import styles from './page.module.scss';

export default function SignInPage(props: any) {

  return (
  <AuthLayout>
     <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-4">
                Explore!
            </h1>
            <p className='w-3/4 mx-auto text-xl text-gray-400'>
                Get into your account or create a new one
            </p>
        </div>
        <form className="flex flex-col gap-5">

          <Input indentColor="purple" type="email" name="email" placeholder="Email" afterIndent={
            <span className='icon flex items-center px-4' >
              <HiAtSymbol size={20}/>
            </span>}/>

          <Input indentColor="purple" type="password" name="password" placeholder="Password"/>
          <Button submit text="Login" color="purple"/>
          <Button classic afterIndent=
          {
            <FcGoogle size={25} className="self-center"/>
          } 
            text="Sign In with Google"/>
          
        </form>

        <p className="text-center text-gray">
            Don't have an account yet?{' '}
            <Link href={'/signUp'} className="text-blue-700">
              Sign Up
            </Link>
        </p>
    </section>
  </AuthLayout>
  )
}
