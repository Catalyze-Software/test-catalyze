import actors from "../misc/actors";
import identities from "../misc/identities";

describe("create profile test", () => {
  it("b", async () => {
    const parent = actors.parent.profile(identities.one());
    const x = await parent.get_canisters();
    console.log({ x });
    // console.log(await parent.get_canisters());
  });

  test("x", () => {
    expect("x").toBe("x");
  });
});
