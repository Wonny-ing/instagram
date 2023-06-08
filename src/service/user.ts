import { client } from './sanity';

type OAuthUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  image?: string | null;
};

export default function addUser({
  id,
  email,
  image,
  name,
  username,
}: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    name,
    image,
    following: [] ?? 0,
    followers: [] ?? 0,
    bookmarks: [] ?? 0,
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }`
  );
}
