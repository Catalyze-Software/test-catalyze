import { Principal } from "@dfinity/principal";
import { sns_members_canister_id, sns_profiles_canister_id } from "../../_test_environment/testCanisterIds";
import { _SERVICE as _PARENT_SERVICE } from "../declarations/parent.declarations";
import { _SERVICE as _PROFILE_SERVICE } from "../declarations/profiles.declarations";
import actors from "../misc/actors";
import identities from "../misc/identities";
import { postProfileMock } from "../mock-data/profile.mock";
import { exec } from "child_process";
import { getMemberChildCanisterId } from "../helper-functions/members.helpers";
import { reset } from "../helper-functions/reset.helpers";

describe("profile", () => {
  let profile_parent: _PARENT_SERVICE;
  let profile_child: _PROFILE_SERVICE;
  let profile_child_canister_id: string;

  beforeEach(async () => {
    profile_parent = actors.parent.profile(identities.one());
    const childCanistersId = await profile_parent.get_available_canister();
    if ("Ok" in childCanistersId) {
      profile_child_canister_id = childCanistersId.Ok.principal.toString();
      profile_child = actors.child.profile(identities.one(), childCanistersId.Ok.principal.toString());
    }
  });

  afterAll(async () => {
    await reset("sns_profiles");
    await reset("sns_members");
  }, 10000);

  test("Should not exist", async () => {
    const result = await profile_child.get_profile_by_user_principal(identities.one().getPrincipal());
    expect(result).toEqual({ Err: expect.anything() });
  });

  let memberChildCanisterId: string | undefined;

  it("should get member child canister id", async () => {
    memberChildCanisterId = await getMemberChildCanisterId();
    expect(memberChildCanisterId).toBeDefined();
  });

  it("should add profile", async () => {
    if (memberChildCanisterId) {
      const result = await profile_child.add_profile(postProfileMock, Principal.fromText(memberChildCanisterId));
      expect(result).toEqual({ Ok: expect.objectContaining({ username: postProfileMock.username }) });
    }
  });

  test("Should exist", async () => {
    const result = await profile_child.get_profile_by_user_principal(identities.one().getPrincipal());
    expect(result).toEqual({ Ok: expect.objectContaining({ username: postProfileMock.username }) });
  });
});
