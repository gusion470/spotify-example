import React from "react";
import Head from "next/head";
import Image from "next/image";
import { getProviders, useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
function signin({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="bg-black h-screen flex flex-col items-center pt-40 space-y-4  ">
      <Head>
        <title>Spotify - Login</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
        />
      </Head>
      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:bg-[#0db146]"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default signin;
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
