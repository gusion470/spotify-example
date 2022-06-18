import { useRecoilState } from "recoil";
import { playlistIdState, playlistActive } from "../atoms/playlistAtom";

function Playlist({ track }) {
  const [playlistsId, setPlaylistsId] = useRecoilState(playlistIdState);
  const [activePlaylist, setActivePlaylist] = useRecoilState(playlistActive);

  return (
    <div
      className="flex items-center space-x-3 hover:bg-white/10 rounded-2xl"
      onClick={() => {
        setPlaylistsId(track.id);
        setActivePlaylist(true);
      }}
    >
      <img
        src={track?.images?.[0]?.url}
        alt=""
        className="rounded-full w-[52px] h-[52px]"
      />
      <div>
        <h4 className="text-white text-[13px] mb-0.5 font-semibold  cursor-pointer truncate max-w-[150px]">
          {track.name}
        </h4>
      </div>
    </div>
  );
}

export default Playlist;
