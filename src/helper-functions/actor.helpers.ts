import { _SERVICE } from "../declarations/parent.declarations";
import { _SERVICE as _MEMBER_SERVICE } from "../declarations/members.declarations";
import { _SERVICE as _EVENT_SERVICE } from "../declarations/events.declarations";
import { _SERVICE as _EVENT_ATTENDEES_SERVICE } from "../declarations/attendees.declarations";
import { _SERVICE as _PROFILE_SERVICE } from "../declarations/profiles.declarations";
import { _SERVICE as _REPORT_SERVICE } from "../declarations/reports.declarations";
import { _SERVICE as _GROUP_SERVICE } from "../declarations/groups.declarations";
import actors from "../misc/actors";
import identities from "../misc/identities";
import { Ed25519KeyIdentity } from "@dfinity/identity";

export type CanisterType = keyof typeof actors.child;
export type ChildService =
  | _EVENT_ATTENDEES_SERVICE
  | _EVENT_SERVICE
  | _GROUP_SERVICE
  | _MEMBER_SERVICE
  | _PROFILE_SERVICE
  | _REPORT_SERVICE;

export interface CanisterRelation<T> {
  parent: _SERVICE;
  child: T;
  childCanisterId: string;
}

export async function getParentAndChildCanister<T>(
  identity: Ed25519KeyIdentity,
  canister: CanisterType
): Promise<CanisterRelation<T> | undefined> {
  const parent = actors.parent[canister](identity) as _SERVICE;
  const availableCanister = await parent.get_available_canister();

  if ("Ok" in availableCanister) {
    const child = actors.child[canister](identity, availableCanister.Ok.principal.toString()) as T;
    return {
      parent,
      child,
      childCanisterId: availableCanister.Ok.principal.toString(),
    };
  }
}
