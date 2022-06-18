import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "./Search";
import Poster from "./Poster";
import Track from "./Track";
import PlaylistTracks from "./PlaylistTracks";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  playlistActive,
  playlistAtom,
  playlistIdState,
} from "../atoms/playlistAtom";
function Body({ SpotifyApi, chooseTrack }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSeacrhResults] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  // Playlist
  const playlistsId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistAtom);
  const [activePlaylist, setActivePlaylist] = useRecoilState(playlistActive);
  useEffect(() => {
    if (!accessToken) return;
    SpotifyApi.getPlaylist(playlistsId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => {});
  }, [accessToken, playlistsId]);
  useEffect(() => {
    if (!accessToken) return;
    SpotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  // Searching.....
  useEffect(() => {
    if (!search) return setSeacrhResults([]);
    if (!accessToken) return;
    setActivePlaylist(false);
    SpotifyApi.searchTracks(search).then((res) => {
      setSeacrhResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [search, accessToken]);
  // New Releases.....
  useEffect(() => {
    if (!accessToken) return;
    SpotifyApi.getNewReleases().then((res) => {
      setNewRelease(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [search, accessToken]);
  return (
    <section className="bg-black md:ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0
          ? newRelease.slice(0, 4).map((track) => {
              return (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              );
            })
          : searchResults.slice(0, 4).map((track) => {
              return (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              );
            })}
      </div>
      <div className="flex absolute min-w-full md:relative ml-6 ">
        {/* Tracks */}
        <div className="w-full pr-11">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 px-3  ">
            {searchResults.length === 0 && !activePlaylist
              ? newRelease
                  .slice(4, newRelease.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults && !activePlaylist
              ? searchResults
                  .slice(4, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : playlist?.tracks.items.map((track) => (
                  <PlaylistTracks
                    track={track}
                    key={track.track.id}
                    chooseTrack={chooseTrack}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
