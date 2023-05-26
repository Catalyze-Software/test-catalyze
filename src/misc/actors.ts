import { Actor, HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { _SERVICE as _PARENT_SERVICE, idlFactory as parentIdlFactory } from "../declarations/parent.declarations";
import { _SERVICE as _GROUP_SERVICE, idlFactory as groupIdlFactory } from "../declarations/groups.declarations";
import { _SERVICE as _EVENT_SERVICE, idlFactory as eventIdlFactory } from "../declarations/events.declarations";
import { _SERVICE as _MEMBER_SERVICE, idlFactory as memberIdlFactory } from "../declarations/members.declarations";
import { _SERVICE as _PROFILE_SERVICE, idlFactory as profileIdlFactory } from "../declarations/profiles.declarations";
import {
  _SERVICE as _EVENT_ATTENDEES_SERVICE,
  idlFactory as eventAttendeeIdlFactory,
} from "../declarations/attendees.declarations";
import { _SERVICE as _REPORT_SERVICE, idlFactory as reportIdlFactory } from "../declarations/reports.declarations";
import {
  sns_groups_canister_id,
  sns_events_canister_id,
  sns_event_attendees_canister_id,
  sns_members_canister_id,
  sns_profiles_canister_id,
  sns_reports_canister_id,
} from "../../_test_environment/testCanisterIds";

const host = "http://localhost:8080";

export const parentActor = (identity: Ed25519KeyIdentity, canisterId: string) => {
  const agent = new HttpAgent({ host, identity });
  return Actor.createActor(parentIdlFactory, { agent, canisterId }) as _PARENT_SERVICE;
};

export const groupParentActor = (identity: Ed25519KeyIdentity) => {
  return parentActor(identity, sns_groups_canister_id);
};

export const eventParentActor = (identity: Ed25519KeyIdentity) => {
  return parentActor(identity, sns_events_canister_id);
};

export const eventAttendeesParentActor = (identity: Ed25519KeyIdentity) => {
  return parentActor(identity, sns_event_attendees_canister_id);
};

export const memberParentActor = (identity: Ed25519KeyIdentity) => {
  return parentActor(identity, sns_members_canister_id);
};

export const profilesParentActor = (identity: Ed25519KeyIdentity) => {
  return parentActor(identity, sns_profiles_canister_id);
};

export const reportsParentActor = (identity: Ed25519KeyIdentity) => {
  return parentActor(identity, sns_reports_canister_id);
};

export const childGroupActor = (identity: Ed25519KeyIdentity, canisterId: string) => {
  const agent = new HttpAgent({ host, identity });
  return Actor.createActor(groupIdlFactory, { agent, canisterId }) as _GROUP_SERVICE;
};

export const childEventActor = (identity: Ed25519KeyIdentity, canisterId: string) => {
  const agent = new HttpAgent({ host, identity });
  return Actor.createActor(eventIdlFactory, { agent, canisterId }) as _EVENT_SERVICE;
};

export const childEventAttendeesActor = (identity: Ed25519KeyIdentity, canisterId: string) => {
  const agent = new HttpAgent({ host, identity });
  return Actor.createActor(eventAttendeeIdlFactory, {
    agent,
    canisterId,
  }) as _EVENT_ATTENDEES_SERVICE;
};

export const childMemberActor = (identity: Ed25519KeyIdentity, canisterId: string) => {
  const agent = new HttpAgent({ host, identity });
  return Actor.createActor(memberIdlFactory, { agent, canisterId }) as _MEMBER_SERVICE;
};

export const childProfileActor = (identity: Ed25519KeyIdentity, canisterId: string) => {
  const agent = new HttpAgent({ host, identity });
  return Actor.createActor(profileIdlFactory, { agent, canisterId }) as _PROFILE_SERVICE;
};

export const childReportActor = (identity: Ed25519KeyIdentity, canisterId: string) => {
  const agent = new HttpAgent({ host, identity });
  return Actor.createActor(reportIdlFactory, { agent, canisterId }) as _REPORT_SERVICE;
};

export default {
  parent: {
    group: groupParentActor,
    event: eventParentActor,
    eventAttendees: eventAttendeesParentActor,
    member: memberParentActor,
    profile: profilesParentActor,
    report: reportsParentActor,
  },
  child: {
    group: childGroupActor,
    event: childEventActor,
    eventAttendees: childEventAttendeesActor,
    member: childMemberActor,
    profile: childProfileActor,
    report: childReportActor,
  },
};
