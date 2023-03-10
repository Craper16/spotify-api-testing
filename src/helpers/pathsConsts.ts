export const MAIN_AUTH = '/';
export const AUTHENTICATE = '/authenticate';
export const HOME = '/home';
export const PLAYLISTS = '/playlists';
export const PLAYLIST_DETAILS = '/playlists/:playlistId';
export const PLAYLIST_DETAILS_FN = (playlistId: string) =>
  `/playlists/${playlistId}`;
export const ARTIST_DETAILS = '/artists/:artistId';
export const ARTIST_DETAILS_FN = (artistId: string) => `/artists/${artistId}`;
export const CREATE_PLAYLIST = '/playlists/create-playlist';
export const SEARCH = '/search';
