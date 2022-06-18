import { atom } from "recoil";

export const playlistIdState = atom({
  key: "playlistIdstate",
  default: null,
});

export const playlistAtom = atom({
  key: "playlistAtomState",
  default: null,
});

export const playlistActive = atom({
  key: "playlistActive",
  default: false,
});
