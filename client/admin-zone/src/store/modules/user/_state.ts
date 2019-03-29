interface Profile {
  account?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  createdAt?: number;
  loginAt?: number;
}

export default class User {
  profile: Profile = {};

  list: Profile[] = [];
}
