import identities from "../misc/identities";
import { postGroup_identity_one_public } from "../mock-data/group.mock";
import { createGroupTest } from "../functions/group.functions";
import { createProfileTest } from "../functions/profile.functions";
import { postProfile_identity_one_public } from "../mock-data/profile.mock";
import { reset } from "../helper-functions/reset.helpers";

describe("group tests", () => {
  describe("Create group with identity one profile test", () => {
    createProfileTest(identities.one(), postProfile_identity_one_public);
    createGroupTest(identities.one(), postGroup_identity_one_public);
  });

  afterAll(async () => {
    await reset("sns_members");
    await reset("sns_profiles");
    await reset("sns_groups");
  }, 3 * 5000);
});
