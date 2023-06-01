import { exec } from "child_process";

export type CanisterName =
  | "sns_members"
  | "sns_profiles"
  | "sns_reports"
  | "sns_groups"
  | "sns_events"
  | "sns_event_attendees";

export async function reset(canister: CanisterName) {
  const result = await new Promise((resolve, reject) => {
    exec(`bash scripts/reset_canister.sh ${canister}`, (error, stdout, stderr) => {
      if (stderr) {
        return resolve(`${canister}: ${stderr}`);
      }
      return reject(`${canister}: ${error} ${stdout}`);
    });
  });
  console.log(result);
}

// export async function cleanup(canisters: CanisterName[]) {
//   for (const canister of canisters) {
//     await reset(canister);
//   }
// }
