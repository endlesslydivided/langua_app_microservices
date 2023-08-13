'use client'

import Link from "next/link";
import { FcGoogle } from 'react-icons/fc';
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";

import styles from './page.module.scss';
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button";

export default function SignUpPage(props: any) {

  return (
     <section className="w-3/4 mx-auto flex flex-col gap-5">
        <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-3">
                Get into!
            </h1>
            <p className='w-3/4 mx-auto text-xl text-gray-400'>
                Create a new account and begin to learn!
            </p>
        </div>
        <form className="flex flex-col col-span-2 gap-4">
          <Input indentColor="purple" type="text" name="email" placeholder="Email" />

          <div className="grid grid-cols-2 gap-5">
            <Input indentColor="purple" type="text" name="firstname" placeholder="Firstname" />
            <Input indentColor="purple" type="text" name="surname" placeholder="Surname" />
          </div>

          <Input indentColor="purple" type="text" name="country" placeholder="Country" />

          <div className="grid grid-cols-2 gap-5">
            <Input type="date" name="birthday" placeholder="Birthday" />
            <Input type="tel" telPattern="[0-9]{12}" beforeIndent={
              <span className='icon flex text- items-center pl-4 m-0' >
              +
              </span>}
            name="phoneNumber" placeholder="Phone" />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Input indentColor="purple" type="password" name="password" placeholder="Password"/>
            <Input indentColor="purple" type="password" name="confirmPassword" placeholder="Confirm password" />
          </div>

        
          <Button submit text="Register" color="purple"/>

          <Button classic afterIndent=
            {
              <FcGoogle size={25} className="self-center"/>
            } 
            text="Sign Up with Google"/>
          
        </form>

        <p className="text-center text-gray">
            Already have an account?{' '}
            <Link href={'/'} className="text-blue-700">
              Sign In
            </Link>
        </p>
    </section>
     
  )
}
