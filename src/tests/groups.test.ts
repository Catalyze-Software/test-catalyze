import identities from "../misc/identities";
import { postGroup_invite_only, postGroup_private, postGroup_public } from "../mock-data/group.mock";
import { createGroupTest, joinPrivateGroupTest, joinPublicGroupTest } from "../functions/group.functions";
import { createProfileTest } from "../functions/profile.functions";
import { postProfile_identity_one_public, postProfile_identity_two_public } from "../mock-data/profile.mock";

// needed for the other tests to run (beforeAll doesnt work)
describe("Create profiles for identities", () => {
  createProfileTest(identities.one(), postProfile_identity_one_public);
  createProfileTest(identities.two(), postProfile_identity_two_public);
});

describe("Create public group with identity one profile test", () => {
  createGroupTest(identities.one(), postGroup_public);
});

describe("Create private group with identity one profile test", () => {
  createGroupTest(identities.one(), postGroup_private);
});

describe("Create invite-only group with identity one profile test", () => {
  createGroupTest(identities.one(), postGroup_invite_only);
});

describe("Join public group with identity one should fail", () => {
  joinPublicGroupTest(identities.one(), postGroup_public, true);
});

describe("Join public group with identity two", () => {
  joinPublicGroupTest(identities.two(), postGroup_public, false);
});

describe("Join private group with identity two should fail", () => {
  joinPrivateGroupTest(identities.two(), postGroup_private);
});
