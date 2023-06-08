import { Ed25519KeyIdentity } from "@dfinity/identity";
import { Principal } from "@dfinity/principal";
import { _SERVICE as _PARENT_SERVICE } from "../declarations/parent.declarations";
import { _SERVICE as _PROFILE_SERVICE } from "../declarations/profiles.declarations";
import { PostGroup, _SERVICE as _GROUP_SERVICE } from "../declarations/groups.declarations";
import { _SERVICE as _MEMBER_SERVICE } from "../declarations/members.declarations";
import { CanisterRelation, getParentAndChildCanister } from "../helper-functions/actor.helpers";
import identities from "../misc/identities";

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

  it("Should create a group", async () => {
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

    expect(result).toEqual({
      Ok: expect.objectContaining({ name: postGroup.name, privacy: postGroup.privacy }),
    });
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

    await expect(Promise.resolve(member)).resolves.toBeDefined();
    await expect(Promise.resolve(member.principal.toString())).resolves.toBe(identity.getPrincipal().toString());
    await expect(Promise.resolve(member.profile_identifier.toString())).resolves.toBe(
      profileResponse.Ok.identifier.toString()
    );

    const joined = member.joined.find((group) => group.group_identifier.toString() === groupIdentifier?.toString());
    await expect(Promise.resolve(joined)).resolves.toBeDefined();
    await expect(Promise.resolve(joined!.roles)).resolves.toEqual(["owner"]);
    await expect(Promise.resolve(joined!.group_identifier)).resolves.toEqual(groupIdentifier);
  });
}

export function joinPublicGroupTest(identity: Ed25519KeyIdentity, postGroup: PostGroup, shouldFailJoining: boolean) {
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

  it("Should fetch a list of groups an get the first public group", async () => {
    const result = await groupCanisters!.child.get_groups(
      BigInt(10),
      BigInt(1),
      [],
      { And: null },
      { Name: { Asc: null } },
      true
    );

    if ("Err" in result!) {
      expect(result).toEqual({ Ok: expect.anything() });
      return;
    }

    const publicGroup = result.Ok.data.find((group) => "Public" in group.privacy);
    groupIdentifier = publicGroup?.identifier;

    await expect(Promise.resolve(publicGroup)).resolves.toBeDefined();
    await expect(Promise.resolve(publicGroup!.name)).resolves.toEqual(postGroup.name);
  });

  if (shouldFailJoining) {
    it("Should fail joining the public group", async () => {
      const result = await memberCanisters!.child.join_group(groupIdentifier!, []);
      console.log(result);
      expect(result).toEqual({ Err: expect.anything() });
    });
  } else {
    it("Should join the public group", async () => {
      const result = await memberCanisters!.child.join_group(groupIdentifier!, []);

      if ("Err" in result!) {
        expect(result).toEqual({ Ok: expect.anything() });
        return;
      }

      expect(result).toEqual({ Ok: expect.anything() });
    });

    it("Identity should have an entry on the member canister with the correct data", async () => {
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

      await expect(Promise.resolve(member)).resolves.toBeDefined();
      await expect(Promise.resolve(member.principal.toString())).resolves.toBe(identity.getPrincipal().toString());
      await expect(Promise.resolve(member.profile_identifier.toString())).resolves.toBe(
        profileResponse.Ok.identifier.toString()
      );

      const joined = member.joined.find((group) => group.group_identifier.toString() === groupIdentifier?.toString());
      await expect(Promise.resolve(joined)).resolves.toBeDefined();
      await expect(Promise.resolve(joined!.roles)).resolves.toEqual(["member"]);
      await expect(Promise.resolve(joined!.group_identifier)).resolves.toEqual(groupIdentifier);
    });
  }
}

export function joinPrivateGroupTest(identity: Ed25519KeyIdentity, postGroup: PostGroup) {
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

  it("Should fetch a list of groups an get the first private group", async () => {
    const result = await groupCanisters!.child.get_groups(
      BigInt(10),
      BigInt(1),
      [],
      { And: null },
      { Name: { Asc: null } },
      true
    );

    if ("Err" in result!) {
      expect(result).toEqual({ Ok: expect.anything() });
      return;
    }

    const privateGroup = result.Ok.data.find((group) => "Private" in group.privacy);
    groupIdentifier = privateGroup?.identifier;

    await expect(Promise.resolve(privateGroup)).resolves.toBeDefined();
    await expect(Promise.resolve(privateGroup!.name)).resolves.toEqual(postGroup.name);
  });

  it("Should do a join request", async () => {
    const result = await memberCanisters!.child.join_group(groupIdentifier!, []);

    if ("Err" in result!) {
      expect(result).toEqual({ Ok: expect.anything() });
      return;
    }

    expect(result).toEqual({ Ok: expect.anything() });
  });

  it("Identity should have an entry on the member canister with the correct data", async () => {
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

    await expect(Promise.resolve(member)).resolves.toBeDefined();
    await expect(Promise.resolve(member.principal.toString())).resolves.toBe(identity.getPrincipal().toString());
    await expect(Promise.resolve(member.profile_identifier.toString())).resolves.toBe(
      profileResponse.Ok.identifier.toString()
    );

    const invite = member.invites.find((group) => group.group_identifier.toString() === groupIdentifier?.toString());
    await expect(Promise.resolve(invite)).resolves.toBeDefined();
    await expect(Promise.resolve(invite!.group_identifier)).resolves.toEqual(groupIdentifier);
    await expect(Promise.resolve(invite!.invite_type)).resolves.toEqual({ UserRequest: null });
  });

  let ownerIdentity: Ed25519KeyIdentity;

  it("Should fetch the group owner identity", async () => {
    const group = await groupCanisters?.child.get_group(groupIdentifier!);
    await expect(Promise.resolve(group)).resolves.toBeDefined();

    if ("Err" in group!) {
      expect(group).toEqual({ Ok: expect.anything() });
      return;
    }

    const ownerPrincipal = group!.Ok.owner;
    const _ownerIdentity = identities.array.find(
      (identity) => identity().getPrincipal().toString() === ownerPrincipal.toString()
    );
    await expect(Promise.resolve(_ownerIdentity)).resolves.toBeDefined();
    ownerIdentity = _ownerIdentity!();
  });

  let ownerMemberCanister: CanisterRelation<_MEMBER_SERVICE> | undefined;

  it("Owner member canisters should be defined", async () => {
    ownerMemberCanister = await getParentAndChildCanister<_MEMBER_SERVICE>(ownerIdentity, "member");
    expect(ownerMemberCanister).toBeDefined();
  });

  it("The owner should accept the invite", async () => {
    const memberFrominvite = await memberCanisters!.child.get_self();

    if ("Err" in memberFrominvite) {
      expect(memberFrominvite).toEqual({ Ok: expect.anything() });
      return;
    }

    const result = await ownerMemberCanister!.child.accept_user_request_group_invite(
      identity.getPrincipal(),
      groupIdentifier!
    );

    if ("Err" in result) {
      expect(result).toEqual({ Ok: expect.anything() });
      return;
    }

    const member = result.Ok[1];

    await expect(Promise.resolve(member)).resolves.toBeDefined();
    await expect(Promise.resolve(member.principal.toString())).resolves.toBe(identity.getPrincipal().toString());

    const joined = member.joined.find((group) => group.group_identifier.toString() === groupIdentifier?.toString());
    await expect(Promise.resolve(joined)).resolves.toBeDefined();
    await expect(Promise.resolve(joined!.group_identifier.toString())).resolves.toEqual(groupIdentifier?.toString());
    await expect(Promise.resolve(joined!.roles)).resolves.toEqual(["member"]);

    const invite = member.invites.find((group) => group.group_identifier.toString() === groupIdentifier?.toString());
    await expect(Promise.resolve(invite)).resolves.toBeUndefined();
  });
}
