import { exec, execSync } from "child_process";

export type CanisterName =
  | "sns_members"
  | "sns_profiles"
  | "sns_reports"
  | "sns_groups"
  | "sns_events"
  | "sns_event_attendees";

export async function reset(canister: CanisterName): Promise<string> {
  return await new Promise((resolve, reject) => {
    exec(`bash scripts/reset_canister.sh ${canister}`, (error, stdout, stderr) => {
      if (stderr) {
        return resolve(`${canister}: ${stderr}`);
      }
      return reject(`${canister}: ${error} ${stdout}`);
    });
  });
}

export async function resetAll(): Promise<string> {
  return await new Promise((resolve, reject) => {
    exec(`bash scripts/reset_all.sh`, (error, stdout, stderr) => {
      if (stderr) {
        return resolve(`${stderr}`);
      }
      return reject(`${error} ${stdout}`);
    });
  });
}
