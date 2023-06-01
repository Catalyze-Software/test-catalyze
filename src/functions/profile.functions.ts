import { Ed25519KeyIdentity } from "@dfinity/identity";
import { Principal } from "@dfinity/principal";
import { PostProfile, _SERVICE as _PROFILE_SERVICE } from "../declarations/profiles.declarations";
import { Member, _SERVICE as _MEMBER_SERVICE } from "../declarations/members.declarations";
import { CanisterRelation, getParentAndChildCanister } from "../helper-functions/actor.helpers";

export function createProfileTest(identity: Ed25519KeyIdentity, postProfile: PostProfile) {
  let profileCanisters: CanisterRelation<_PROFILE_SERVICE> | undefined;
  let memberCanisters: CanisterRelation<_MEMBER_SERVICE> | undefined;

  it("Profile canisters should be defined", async () => {
    profileCanisters = await getParentAndChildCanister<_PROFILE_SERVICE>(identity, "profile");
    expect(profileCanisters).toBeDefined();
  });

  it("Member canisters should be defined", async () => {
    memberCanisters = await getParentAndChildCanister<_MEMBER_SERVICE>(identity, "member");
    expect(memberCanisters).toBeDefined();
  });

  it("Profile should not exist", async () => {
    const result = await profileCanisters!.child.get_profile_by_user_principal(identity.getPrincipal());
    expect(result).toEqual({ Err: expect.anything() });
  });

  it("Profile should be created", async () => {
    const result = await profileCanisters!.child.add_profile(
      postProfile,
      Principal.fromText(memberCanisters!.childCanisterId)
    );
    expect(result).toEqual({ Ok: expect.objectContaining({ username: postProfile.username }) });
  });

  it("Profile should exist", async () => {
    const result = await profileCanisters!.child.get_profile_by_user_principal(identity.getPrincipal());
    expect(result).toEqual({ Ok: expect.objectContaining({ username: postProfile.username }) });
  });

  it("Should have an entry on the member canister with the correct data", async () => {
    const memberSelf = await memberCanisters!.child.get_self();
    const profileResponse = await profileCanisters!.child.get_profile_by_user_principal(identity.getPrincipal());

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
      principal: identity.getPrincipal(),
    };
    expect(memberSelf.Ok[1]).toEqual(member);
  });
}

export function createDuplicateProfileTest(identity: Ed25519KeyIdentity, postProfile: PostProfile) {
  let profileCanisters: CanisterRelation<_PROFILE_SERVICE> | undefined;
  let memberCanisters: CanisterRelation<_MEMBER_SERVICE> | undefined;

  it("Profile canisters should be defined", async () => {
    profileCanisters = await getParentAndChildCanister<_PROFILE_SERVICE>(identity, "profile");
    expect(profileCanisters).toBeDefined();
  });

  it("Member canisters should be defined", async () => {
    memberCanisters = await getParentAndChildCanister<_MEMBER_SERVICE>(identity, "member");
    expect(memberCanisters).toBeDefined();
  });

  it("Create profile should give a duplicate data error", async () => {
    const result = await profileCanisters!.child.add_profile(
      postProfile,
      Principal.fromText(memberCanisters!.childCanisterId)
    );
    expect(result).toEqual({ Err: expect.anything() });
  });
}
