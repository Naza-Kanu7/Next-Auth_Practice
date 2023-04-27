import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function Home() {

  const {data:session} = useSession()

  function handleSignOut() {
    signOut()
  }

  return (
    <div>
      <Head>
        <title>Home page</title>
      </Head>
      {session ? User({ session, handleSignOut}) : Guest()}
    </div>
  );
}

function Guest() {
  return (
    <div>
      <Head>
        <title>Home page</title>
      </Head>
      <main className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold py-10">Guest Homapage</h3>
        <div className="flex justify-center">
          <Link href={"/login"}>
            <span className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
              Sign In
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}

function User({ session, handleSignOut }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold py-10">Authorizeed User Homapage</h3>
      <div className="details">
        <h5>Username: {session.user.name}</h5>
        <h5>Useremail: {session.user.email}</h5>
      </div>
      <div className="flex justify-center py-5">
        <Link href={"/profile"}>
          <span className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Profile
          </span>
        </Link>
      </div>
      <div className="flex justify-center">
        <button className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50" onClick={handleSignOut}>Sign Out</button>
      </div>
    </main>
  );
}

export async function getServerSideProps({req}) {
  const session = await getSession({ req })

  if(!session) {
    return{
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {session}
  }
}
