import identities from "../misc/identities";
import { postGroup_identity_one_public } from "../mock-data/group.mock";
import { createGroupTest } from "../functions/group.functions";
import { createProfileTest } from "../functions/profile.functions";
import { postProfile_identity_one_public } from "../mock-data/profile.mock";

describe("Create group with identity one profile test", () => {
  createProfileTest(identities.one(), postProfile_identity_one_public);
  createGroupTest(identities.one(), postGroup_identity_one_public);
});
