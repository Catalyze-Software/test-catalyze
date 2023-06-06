import { Ed25519KeyIdentity } from "@dfinity/identity";
import { Principal } from "@dfinity/principal";
import { _SERVICE as _PARENT_SERVICE } from "../declarations/parent.declarations";
import { _SERVICE as _PROFILE_SERVICE } from "../declarations/profiles.declarations";
import { PostGroup, _SERVICE as _GROUP_SERVICE } from "../declarations/groups.declarations";
import { _SERVICE as _MEMBER_SERVICE } from "../declarations/members.declarations";
import { CanisterRelation, getParentAndChildCanister } from "../helper-functions/actor.helpers";

export function createGroupTest(identity: Ed25519KeyIdentity, postGroup: PostGroup) {
  let profileCanister: CanisterRelation<_PROFILE_SERVICE> | undefined;
  let groupCanisters: CanisterRelation<_GROUP_SERVICE> | undefined;
  let memberCanisters: CanisterRelation<_MEMBER_SERVICE> | undefined;
  let groupIdentifier: Principal | undefined;

  it("Profile canisters should be defined", async () => {
    profileCanister = await getParentAndChildCanister<_PROFILE_SERVICE>(identity, "profile");
    expect(profileCanister).toBeDefined();
  });

  it("Group canisters should be defined", async () => {
    groupCanisters = await getParentAndChildCanister<_GROUP_SERVICE>(identity, "group");
    expect(groupCanisters).toBeDefined();
  });

  it("Member canisters should be defined", async () => {
    memberCanisters = await getParentAndChildCanister<_MEMBER_SERVICE>(identity, "member");
    expect(memberCanisters).toBeDefined();
  });

  it("Should create a public group", async () => {
    const result = await groupCanisters?.child.add_group(
      postGroup,
      Principal.fromText(memberCanisters!.childCanisterId),
      []
    );

    if ("Err" in result!) {
      expect(result).toEqual({ Ok: expect.anything() });
      return;
    }

    groupIdentifier = result?.Ok.identifier;

    expect(result).toEqual({ Ok: expect.objectContaining({ name: postGroup.name }) });
  });

  it("Group identifier should be defined", () => {
    expect(groupIdentifier).toBeDefined();
  });

  it("Identity one should have an entry on the member canister with the correct data", async () => {
    const memberSelf = await memberCanisters!.child.get_self();
    const profileResponse = await profileCanister!.child.get_profile_by_user_principal(identity.getPrincipal());

    if ("Err" in memberSelf) {
      expect(memberSelf).toEqual({ Ok: expect.anything() });
      return;
    }
    if ("Err" in profileResponse) {
      expect(profileResponse).toEqual({ Ok: expect.anything() });
      return;
    }

    const member = memberSelf.Ok[1];
    await expect(Promise.resolve(member.principal.toString())).resolves.toBe(identity.getPrincipal().toString());
    await expect(Promise.resolve(member.profile_identifier.toString())).resolves.toBe(
      profileResponse.Ok.identifier.toString()
    );
    await expect(Promise.resolve(member.invites.length)).resolves.toEqual(0);
    await expect(Promise.resolve(member.joined.length)).resolves.toEqual(1);
    await expect(Promise.resolve(member.joined[0].roles)).resolves.toEqual(["owner"]);
    await expect(Promise.resolve(member.joined[0].group_identifier)).resolves.toEqual(groupIdentifier);
  });
}
