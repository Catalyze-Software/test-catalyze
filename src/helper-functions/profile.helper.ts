import { CanisterRelation, getParentAndChildCanister } from "./actor.helpers";
import { PostProfile, _SERVICE as _PROFILE_SERVICE } from "../declarations/profiles.declarations";
import { _SERVICE as _MEMBER_SERVICE } from "../declarations/members.declarations";
import identities from "../misc/identities";
import { Principal } from "@dfinity/principal";

export async function createProfileForGroupTest(
  postProfile: PostProfile,
  profileCanister: CanisterRelation<_PROFILE_SERVICE>
) {
  try {
    const memberCanisters = await getParentAndChildCanister<_MEMBER_SERVICE>(identities.one(), "member");
    if (memberCanisters && profileCanister) {
      await profileCanister.child.add_profile(postProfile, Principal.fromText(memberCanisters.childCanisterId));
    } else {
      Promise.reject("Canisters not defined");
    }
  } catch (error) {
    console.log(error);
  }
}
