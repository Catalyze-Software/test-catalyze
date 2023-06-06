import identities from "../misc/identities";
import { postProfile_identity_one_public, postProfile_identity_two_public } from "../mock-data/profile.mock";
import { createDuplicateProfileTest, createProfileTest } from "../functions/profile.functions";

describe("Create identity one profile test", () => {
  createProfileTest(identities.one(), postProfile_identity_one_public);
});

describe("Create identity two profile with duplicate data", () => {
  createDuplicateProfileTest(identities.two(), postProfile_identity_one_public);
});

describe("Create identity 2 profile test", () => {
  createProfileTest(identities.two(), postProfile_identity_two_public);
});
