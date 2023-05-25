import { Actor, HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { _SERVICE as _GROUP_SERVICE, idlFactory as groupIdlFactory } from "../declarations/groups.declarations";
import { _SERVICE as _EVENT_SERVICE, idlFactory as eventIdlFactory } from "../declarations/events.declarations";
import { _SERVICE as _MEMBER_SERVICE, idlFactory as memberIdlFactory } from "../declarations/members.declarations";
import { _SERVICE as _PROFILE_SERVICE, idlFactory as profileIdlFactory } from "../declarations/profiles.declarations";
import {
  _SERVICE as _EVENT_ATTENDEES_SERVICE,
  idlFactory as eventAttendeeIdlFactory,
} from "../declarations/attendees.declarations";
import { _SERVICE as _REPORT_SERVICE, idlFactory as reportIdlFactory } from "../declarations/reports.declarations";

export const groupCanisterId = "";
export const eventCanisterId = "";
export const eventAttendeesCanisterId = "";
export const membersCanisterId = "";
export const profilesCanisterId = "";
export const reportCanisterId = "";

export const groupActor = (identity: Ed25519KeyIdentity) => {
  const agent = new HttpAgent({ host: "http://localhost:8080", identity });
  return Actor.createActor(groupIdlFactory, { agent, canisterId: groupCanisterId }) as _GROUP_SERVICE;
};

export const eventActor = (identity: Ed25519KeyIdentity) => {
  const agent = new HttpAgent({ host: "http://localhost:8080", identity });
  return Actor.createActor(eventIdlFactory, { agent, canisterId: eventCanisterId }) as _EVENT_SERVICE;
};

export const eventAttendeesActor = (identity: Ed25519KeyIdentity) => {
  const agent = new HttpAgent({ host: "http://localhost:8080", identity });
  return Actor.createActor(eventAttendeeIdlFactory, {
    agent,
    canisterId: eventAttendeesCanisterId,
  }) as _EVENT_ATTENDEES_SERVICE;
};

export const memberActor = (identity: Ed25519KeyIdentity) => {
  const agent = new HttpAgent({ host: "http://localhost:8080", identity });
  return Actor.createActor(memberIdlFactory, { agent, canisterId: membersCanisterId }) as _MEMBER_SERVICE;
};

export const profileActor = (identity: Ed25519KeyIdentity) => {
  const agent = new HttpAgent({ host: "http://localhost:8080", identity });
  return Actor.createActor(profileIdlFactory, { agent, canisterId: profilesCanisterId }) as _PROFILE_SERVICE;
};

export const reportActor = (identity: Ed25519KeyIdentity) => {
  const agent = new HttpAgent({ host: "http://localhost:8080", identity });
  return Actor.createActor(reportIdlFactory, { agent, canisterId: reportCanisterId }) as _REPORT_SERVICE;
};

export default {
  group: groupActor,
  event: eventActor,
  eventAttendees: eventAttendeesActor,
  member: memberActor,
  profile: profileActor,
  report: reportActor,
};
