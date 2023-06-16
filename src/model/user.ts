export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, 'username' | 'image'>;

export type DetailUSer = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type ProfileUser = User & {
  following: number;
  followers: number;
};
