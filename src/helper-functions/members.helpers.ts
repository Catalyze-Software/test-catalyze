import { _SERVICE } from "../declarations/parent.declarations";
import { _SERVICE as _MEMBER_SERVICE } from "../declarations/members.declarations";
import actors from "../misc/actors";
import identities from "../misc/identities";

export async function getMemberChildCanisterId(): Promise<string | undefined> {
  const parent = actors.parent.member(identities.one()) as _SERVICE;
  const availableCanister = await parent.get_available_canister();

  if ("Ok" in availableCanister) {
    return availableCanister.Ok.principal.toString();
  }
}
