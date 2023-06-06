import { _SERVICE } from "../declarations/parent.declarations";
import actors from "../misc/actors";
import identities from "../misc/identities";

export function parentTest() {
  describe("parent canister has at least one child", () => {
    test.each(["eventAttendee", "event", "group", "member", "profile", "report"])(
      "parent canister",
      async (canister: string) => {
        const parent = actors.parent[canister](identities.one()) as _SERVICE;
        const childCanisters = await parent.get_canisters();
        expect(childCanisters.length).toBeGreaterThan(0);
      }
    );

    test.each(["eventAttendee", "event", "group", "member", "profile", "report"])(
      "available child canister check",
      async (canister: string) => {
        const parent = actors.parent[canister](identities.one()) as _SERVICE;
        const availableCanister = await parent.get_available_canister();
        expect(availableCanister).toEqual({ Ok: expect.anything() });
      }
    );

    test.each(["eventAttendee", "event", "group", "member", "profile", "report"])(
      "child canister correctly deployed check",
      async (canister: string) => {
        const parent = actors.parent[canister](identities.one()) as _SERVICE;
        const availableCanister = await parent.get_available_canister();
        if ("Ok" in availableCanister) {
          const child = actors.child[canister](identities.one(), availableCanister.Ok.principal.toString());
          const candid: string = await child.__get_candid_interface_tmp_hack();
          expect(candid).toEqual(expect.stringContaining("service : (principal, text, nat64) -> {"));
        }
      }
    );
  });
}
