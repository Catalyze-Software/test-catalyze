import { Principal } from "@dfinity/principal";
import { _SERVICE as _PARENT_SERVICE } from "../declarations/parent.declarations";
import { _SERVICE as _PROFILE_SERVICE } from "../declarations/profiles.declarations";
import { _SERVICE as _GROUP_SERVICE } from "../declarations/groups.declarations";
import { Member, _SERVICE as _MEMBER_SERVICE } from "../declarations/members.declarations";
import identities from "../misc/identities";
import { postProfile_identity_one_public } from "../mock-data/profile.mock";
import { CanisterRelation, getParentAndChildCanister } from "../helper-functions/actor.helpers";
import { createProfileForGroupTest } from "../helper-functions/profile.helper";
import { postGroup_identity_one_public } from "../mock-data/group.mock";
import { reset } from "../helper-functions/reset.helpers";

describe("Create group test", () => {
  let identityOneProfileCanisters: CanisterRelation<_PROFILE_SERVICE> | undefined;
  let identityOneGroupCanisters: CanisterRelation<_GROUP_SERVICE> | undefined;
  let identityOneMembersCanisters: CanisterRelation<_MEMBER_SERVICE> | undefined;

  beforeAll(async () => {
    identityOneProfileCanisters = await getParentAndChildCanister<_PROFILE_SERVICE>(identities.one(), "profile");
    identityOneGroupCanisters = await getParentAndChildCanister<_GROUP_SERVICE>(identities.one(), "group");
    identityOneMembersCanisters = await getParentAndChildCanister<_MEMBER_SERVICE>(identities.one(), "member");
    if (identityOneProfileCanisters) {
      await createProfileForGroupTest(postProfile_identity_one_public, identityOneProfileCanisters);
    }
  });

  afterAll(async () => {
    await reset("sns_profiles");
    await reset("sns_members");
    await reset("sns_groups");
  }, 15000); // edit the timeout when the test complains about it

  it("Identity one profile canisters should be defined", () => {
    expect(identityOneProfileCanisters).toBeDefined();
  });

  it("Identity one group canisters should be defined", () => {
    expect(identityOneGroupCanisters).toBeDefined();
  });

  it("Identity one member canisters should be defined", () => {
    expect(identityOneMembersCanisters).toBeDefined();
  });

  it("Identity one profile should exist", async () => {
    const result = await identityOneProfileCanisters?.child.get_profile_by_user_principal(
      identities.one().getPrincipal()
    );
    expect(result).toEqual({ Ok: expect.objectContaining({ username: postProfile_identity_one_public.username }) });
  });

  let groupIdentifier: Principal | undefined;

  it("Identity one should create a public group", async () => {
    const result = await identityOneGroupCanisters?.child.add_group(
      postGroup_identity_one_public,
      Principal.fromText(identityOneMembersCanisters!.childCanisterId),
      []
    );

    if ("Err" in result!) {
      expect(result).toEqual({ Ok: expect.anything() });
      return;
    }

    // SET THE GROUP IDENTIFIER FOR THE NEXT TEST
    groupIdentifier = result?.Ok.identifier;

    expect(result).toEqual({ Ok: expect.objectContaining({ name: postGroup_identity_one_public.name }) });
  });

  it("Group identifier should be defined", () => {
    expect(groupIdentifier).toBeDefined();
  });

  it("Identity one should have an entry on the member canister with the correct data", async () => {
    if (!identityOneProfileCanisters) {
      expect(identityOneProfileCanisters).toBeDefined();
      return;
    }

    const memberSelf = await identityOneMembersCanisters!.child.get_self();
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

    const member = memberSelf.Ok[1];
    await expect(Promise.resolve(member.principal.toString())).resolves.toBe(
      identities.one().getPrincipal().toString()
    );
    await expect(Promise.resolve(member.profile_identifier.toString())).resolves.toBe(
      profileResponse.Ok.identifier.toString()
    );
    await expect(Promise.resolve(member.invites.length)).resolves.toEqual(0);
    await expect(Promise.resolve(member.joined.length)).resolves.toEqual(1);
    await expect(Promise.resolve(member.joined[0].roles)).resolves.toEqual(["owner"]);
    await expect(Promise.resolve(member.joined[0].group_identifier)).resolves.toEqual(groupIdentifier);
  });
});
