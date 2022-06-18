import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Dashboard from "../components/Dashboard";
const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  return (
    <div className="">
      <Head>
        <title>Spotify - Web Player</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
        />
      </Head>
      <main className="w-[85%] mx-auto md:w-full md:mx-0">
        <Dashboard />
      </main>
    </div>
  );
};

export default Home;
