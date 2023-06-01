import { Principal } from "@dfinity/principal";
import { _SERVICE as _PARENT_SERVICE } from "../declarations/parent.declarations";
import { _SERVICE as _PROFILE_SERVICE } from "../declarations/profiles.declarations";
import { Member, _SERVICE as _MEMBER_SERVICE } from "../declarations/members.declarations";
import identities from "../misc/identities";
import { postProfile_identity_one_public } from "../mock-data/profile.mock";
import { CanisterRelation, getParentAndChildCanister } from "../helper-functions/actor.helpers";
import { reset } from "../helper-functions/reset.helpers";

describe("Create profile test", () => {
  let identityOneProfileCanisters: CanisterRelation<_PROFILE_SERVICE> | undefined;

  beforeAll(async () => {
    identityOneProfileCanisters = await getParentAndChildCanister<_PROFILE_SERVICE>(identities.one(), "profile");
  });

  it("Identity one profile canisters should be defined", () => {
    expect(identityOneProfileCanisters).toBeDefined();
  });

  afterAll(async () => {
    await reset("sns_profiles");
    await reset("sns_members");
  }, 10000); // edit the timeout when the test complains about it

  it("Identity one profile should not exist", async () => {
    const result = await identityOneProfileCanisters?.child.get_profile_by_user_principal(
      identities.one().getPrincipal()
    );
    expect(result).toEqual({ Err: expect.anything() });
  });

  let memberCanisters: CanisterRelation<_MEMBER_SERVICE> | undefined;

  it("Member canisters should be defined", async () => {
    memberCanisters = await getParentAndChildCanister<_MEMBER_SERVICE>(identities.one(), "member");
    await expect(memberCanisters).toBeDefined();
  });

  it("Identity one profile should be created", async () => {
    if (!memberCanisters) {
      expect(memberCanisters).toBeDefined();
      return;
    }

    const result = await identityOneProfileCanisters?.child.add_profile(
      postProfile_identity_one_public,
      Principal.fromText(memberCanisters.childCanisterId)
    );
    expect(result).toEqual({ Ok: expect.objectContaining({ username: postProfile_identity_one_public.username }) });
  });

  it("Identity one profile should exist", async () => {
    const result = await identityOneProfileCanisters?.child.get_profile_by_user_principal(
      identities.one().getPrincipal()
    );
    expect(result).toEqual({ Ok: expect.objectContaining({ username: postProfile_identity_one_public.username }) });
  });

  it("Identity one should have an entry on the member canister with the correct data", async () => {
    if (!identityOneProfileCanisters) {
      expect(identityOneProfileCanisters).toBeDefined();
      return;
    }

    if (!memberCanisters) {
      expect(memberCanisters).toBeDefined();
      return;
    }
    const memberSelf = await memberCanisters.child.get_self();
    const profileResponse = await identityOneProfileCanisters.child.get_profile_by_user_principal(
      identities.one().getPrincipal()
    );

    if ("Err" in memberSelf) {
      expect(memberSelf).toEqual({ Ok: expect.anything() });
      return;
    }
    if ("Err" in profileResponse) {
      expect(profileResponse).toEqual({ Ok: expect.anything() });
      return;
    }
    const member: Member = {
      profile_identifier: profileResponse.Ok.identifier,
      invites: [],
      joined: [],
      principal: identities.one().getPrincipal(),
    };
    expect(memberSelf.Ok[1]).toEqual(member);
  });

  let identityTwoProfileCanisters: CanisterRelation<_PROFILE_SERVICE> | undefined;

  it("Identity two profile canisters should be defined", async () => {
    identityTwoProfileCanisters = await getParentAndChildCanister<_PROFILE_SERVICE>(identities.two(), "profile");
    expect(identityOneProfileCanisters).toBeDefined();
  });

  it("Creating identity two profile should give a duplicate data error", async () => {
    if (!memberCanisters) {
      expect(memberCanisters).toBeDefined();
      return;
    }
    const result = await identityTwoProfileCanisters?.child.add_profile(
      postProfile_identity_one_public,
      Principal.fromText(memberCanisters.childCanisterId)
    );
    expect(result).toEqual({ Err: expect.anything() });
  });
});
