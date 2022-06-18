import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import Dropdown from "./Dropdown";
import RecentlyPlayed from "./RecentlyPlayed";
import Playlist from "./Playlist";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtoms";
import { CgPlayListCheck } from "react-icons/cg";

function Right({ SpotifyApi, chooseTrack }) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [recently, setRecently] = useState([]);
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    if (!accessToken) return;
    SpotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      setRecently(
        res.body.items.map(({ track }) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          };
        })
      );
    });
  }, [accessToken, SpotifyApi]);
  useEffect(() => {
    if (!accessToken) return;
    if (SpotifyApi.getAccessToken()) {
      SpotifyApi.getUserPlaylists().then((res) => {
        setPlaylists(res.body.items);
      });
    }
  }, [accessToken, SpotifyApi]);
  return (
    <section className="pt-4 space-y-8 pr-3">
      <div className="flex space-x-2 items-center justify-between">
        {/* Icons */}
        <div className="flex items-center space-x-4 border-2 border-[#262626] rounded-full h-12 py-3 px-4">
          <HiOutlineShieldCheck className="text-[#CCCCCC] text-xl" />
          <MdOutlineSettings className="text-[#CCCCCC] text-xl" />
          <div>
            <BiBell className="text-[#CCCCCC] text-xl" />
          </div>
        </div>
        {/* Profile Dropdown */}
        <Dropdown />
      </div>
      {/* Playlist Play */}
      <div className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4 lg:w-[]">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm">Your Playlist</h4>
          <CgPlayListCheck className="text-[#686868] h-6 text-2xl" />
        </div>
        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[300px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
          {playlists?.map((track, index) => {
            return <Playlist key={index} track={track} />;
          })}
        </div>
      </div>
      {/* Recently Play */}
      <div className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm">Recently Played</h4>
          <ViewGridIcon className="text-[#686868] h-6" />
        </div>
        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[400px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
          {recently.map((track, index) => {
            return (
              <RecentlyPlayed
                key={index}
                track={track}
                chooseTrack={chooseTrack}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Right;
