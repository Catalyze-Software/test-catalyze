import { PostGroup } from "../declarations/groups.declarations";

export const postGroup_public: PostGroup = {
  banner_image: {
    Url: "",
  },
  name: "public_group_test",
  matrix_space_id: "",
  tags: [],
  description: "public_group_test",
  website: "https://public_group_test.com",
  privacy: {
    Public: null,
  },
  image: {
    Url: "",
  },
  location: {
    None: null,
  },
};

export const postGroup_private: PostGroup = {
  banner_image: {
    Url: "",
  },
  name: "private_group_test",
  matrix_space_id: "",
  tags: [],
  description: "private_group_test",
  website: "https://private_group_test.com",
  privacy: {
    Private: null,
  },
  image: {
    Url: "",
  },
  location: {
    None: null,
  },
};

export const postGroup_invite_only: PostGroup = {
  banner_image: {
    Url: "",
  },
  name: "invite_only_group_test",
  matrix_space_id: "",
  tags: [],
  description: "invite_only_group_test",
  website: "https://invite_only_group_test.com",
  privacy: {
    InviteOnly: null,
  },
  image: {
    Url: "",
  },
  location: {
    None: null,
  },
};
