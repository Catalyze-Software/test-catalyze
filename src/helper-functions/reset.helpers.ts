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
      if (error) {
        return reject(error);
      }
      return resolve(stdout);
    });
  });
  console.log(result);
}
