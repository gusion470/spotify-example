import Sidebar from "./Sidebar";
import Body from "./Body";
import Right from "./Right";
import Player from "./Player";
import SpotifyWebApi from "spotify-web-api-node";
import { useRecoilState } from "recoil";
import { playingTrackState } from "../atoms/playerAtoms";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});
function Dashboard() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);
  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };
  useEffect(() => {
    setShowPlayer(true);
  }, []);
  useEffect(() => {
    if (!accessToken) return;
    SpotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full  bg-black lg:pb-24 ">
      <Sidebar />
      <Body SpotifyApi={SpotifyApi} chooseTrack={chooseTrack} />
      <Right SpotifyApi={SpotifyApi} chooseTrack={chooseTrack} />
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Player accessToken={accessToken} trackUri={playingTrack.uri} />
      </div>
    </div>
  );
}
export default Dashboard;
