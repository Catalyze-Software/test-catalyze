import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export type ApiError =
  | { SerializeError: ErrorMessage }
  | { DeserializeError: ErrorMessage }
  | { NotFound: ErrorMessage }
  | { ValidationError: Array<ValidationResponse> }
  | { CanisterAtCapacity: ErrorMessage }
  | { UpdateRequired: UpdateMessage }
  | { Unauthorized: ErrorMessage }
  | { Unexpected: ErrorMessage }
  | { BadRequest: ErrorMessage };
export interface ErrorMessage {
  tag: string;
  message: string;
  inputs: [] | [Array<string>];
  location: string;
}
export interface HttpHeader {
  value: string;
  name: string;
}
export interface HttpRequest {
  url: string;
  method: string;
  body: Uint8Array | number[];
  headers: Array<[string, string]>;
}
export interface HttpResponse {
  status: bigint;
  body: Uint8Array | number[];
  headers: Array<HttpHeader>;
}
export interface Invite {
  updated_at: bigint;
  group_identifier: Principal;
  invite_type: InviteType;
  created_at: bigint;
}
export interface InviteMemberResponse {
  principal: Principal;
  group_identifier: Principal;
  invite: Invite;
  member_identifier: Principal;
}
export type InviteType = { OwnerRequest: null } | { UserRequest: null };
export interface Join {
  updated_at: bigint;
  group_identifier: Principal;
  created_at: bigint;
  roles: Array<string>;
}
export interface JoinedMemberResponse {
  principal: Principal;
  group_identifier: Principal;
  member_identifier: Principal;
  roles: Array<string>;
}
export interface Member {
  principal: Principal;
  invites: Array<Invite>;
  joined: Array<Join>;
  profile_identifier: Principal;
}
export type Result = { Ok: [Principal, Member] } | { Err: ApiError };
export type Result_1 = { Ok: null } | { Err: ApiError };
export type Result_2 = { Ok: Principal } | { Err: ApiError };
export type Result_3 = { Ok: null } | { Err: null };
export type Result_4 = { Ok: Array<InviteMemberResponse> } | { Err: ApiError };
export type Result_5 = { Ok: JoinedMemberResponse } | { Err: ApiError };
export type Result_6 = { Ok: Array<JoinedMemberResponse> } | { Err: ApiError };
export type Result_7 = { Ok: [Principal, Array<string>] } | { Err: string };
export interface UpdateMessage {
  canister_principal: Principal;
  message: string;
}
export interface ValidationResponse {
  field: string;
  message: string;
}
export interface _SERVICE {
  __get_candid_interface_tmp_hack: ActorMethod<[], string>;
  accept_cycles: ActorMethod<[], bigint>;
  accept_owner_request_group_invite: ActorMethod<[Principal], Result>;
  accept_user_request_group_invite: ActorMethod<[Principal, Principal], Result>;
  add_entry_by_parent: ActorMethod<[Uint8Array | number[]], Result_1>;
  add_owner: ActorMethod<[Principal, Principal], Result_2>;
  assign_role: ActorMethod<[string, Principal, Principal], Result_3>;
  create_empty_member: ActorMethod<[Principal, Principal], Result_2>;
  get_chunked_invite_data: ActorMethod<[Principal, bigint, bigint], [Uint8Array | number[], [bigint, bigint]]>;
  get_chunked_join_data: ActorMethod<[Principal, bigint, bigint], [Uint8Array | number[], [bigint, bigint]]>;
  get_group_invites: ActorMethod<[Principal], Result_4>;
  get_group_invites_count: ActorMethod<[Array<Principal>], Array<[Principal, bigint]>>;
  get_group_member: ActorMethod<[Principal, Principal], Result_5>;
  get_group_members: ActorMethod<[Principal], Result_6>;
  get_group_members_count: ActorMethod<[Array<Principal>], Array<[Principal, bigint]>>;
  get_groups_for_members: ActorMethod<[Array<Principal>], Array<[Principal, Array<Principal>]>>;
  get_member_roles: ActorMethod<[Principal, Principal], Result_7>;
  get_self: ActorMethod<[], Result>;
  http_request: ActorMethod<[HttpRequest], HttpResponse>;
  invite_to_group: ActorMethod<[Principal, Principal], Result>;
  join_group: ActorMethod<[Principal, [] | [string]], Result>;
  leave_group: ActorMethod<[Principal], Result_1>;
  migration_add_members: ActorMethod<[Array<[Principal, Member]>], undefined>;
  remove_invite: ActorMethod<[Principal], Result_1>;
  remove_member_from_group: ActorMethod<[Principal, Principal], Result_1>;
  remove_member_invite_from_group: ActorMethod<[Principal, Principal], Result_1>;
  remove_role: ActorMethod<[string, Principal, Principal], Result_3>;
}

export const idlFactory = ({ IDL }) => {
  const InviteType = IDL.Variant({
    OwnerRequest: IDL.Null,
    UserRequest: IDL.Null,
  });
  const Invite = IDL.Record({
    updated_at: IDL.Nat64,
    group_identifier: IDL.Principal,
    invite_type: InviteType,
    created_at: IDL.Nat64,
  });
  const Join = IDL.Record({
    updated_at: IDL.Nat64,
    group_identifier: IDL.Principal,
    created_at: IDL.Nat64,
    roles: IDL.Vec(IDL.Text),
  });
  const Member = IDL.Record({
    principal: IDL.Principal,
    invites: IDL.Vec(Invite),
    joined: IDL.Vec(Join),
    profile_identifier: IDL.Principal,
  });
  const ErrorMessage = IDL.Record({
    tag: IDL.Text,
    message: IDL.Text,
    inputs: IDL.Opt(IDL.Vec(IDL.Text)),
    location: IDL.Text,
  });
  const ValidationResponse = IDL.Record({
    field: IDL.Text,
    message: IDL.Text,
  });
  const UpdateMessage = IDL.Record({
    canister_principal: IDL.Principal,
    message: IDL.Text,
  });
  const ApiError = IDL.Variant({
    SerializeError: ErrorMessage,
    DeserializeError: ErrorMessage,
    NotFound: ErrorMessage,
    ValidationError: IDL.Vec(ValidationResponse),
    CanisterAtCapacity: ErrorMessage,
    UpdateRequired: UpdateMessage,
    Unauthorized: ErrorMessage,
    Unexpected: ErrorMessage,
    BadRequest: ErrorMessage,
  });
  const Result = IDL.Variant({
    Ok: IDL.Tuple(IDL.Principal, Member),
    Err: ApiError,
  });
  const Result_1 = IDL.Variant({ Ok: IDL.Null, Err: ApiError });
  const Result_2 = IDL.Variant({ Ok: IDL.Principal, Err: ApiError });
  const Result_3 = IDL.Variant({ Ok: IDL.Null, Err: IDL.Null });
  const InviteMemberResponse = IDL.Record({
    principal: IDL.Principal,
    group_identifier: IDL.Principal,
    invite: Invite,
    member_identifier: IDL.Principal,
  });
  const Result_4 = IDL.Variant({
    Ok: IDL.Vec(InviteMemberResponse),
    Err: ApiError,
  });
  const JoinedMemberResponse = IDL.Record({
    principal: IDL.Principal,
    group_identifier: IDL.Principal,
    member_identifier: IDL.Principal,
    roles: IDL.Vec(IDL.Text),
  });
  const Result_5 = IDL.Variant({
    Ok: JoinedMemberResponse,
    Err: ApiError,
  });
  const Result_6 = IDL.Variant({
    Ok: IDL.Vec(JoinedMemberResponse),
    Err: ApiError,
  });
  const Result_7 = IDL.Variant({
    Ok: IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Text)),
    Err: IDL.Text,
  });
  const HttpRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
  });
  const HttpHeader = IDL.Record({ value: IDL.Text, name: IDL.Text });
  const HttpResponse = IDL.Record({
    status: IDL.Nat,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HttpHeader),
  });
  return IDL.Service({
    __get_candid_interface_tmp_hack: IDL.Func([], [IDL.Text], ["query"]),
    accept_cycles: IDL.Func([], [IDL.Nat64], []),
    accept_owner_request_group_invite: IDL.Func([IDL.Principal], [Result], []),
    accept_user_request_group_invite: IDL.Func([IDL.Principal, IDL.Principal], [Result], []),
    add_entry_by_parent: IDL.Func([IDL.Vec(IDL.Nat8)], [Result_1], []),
    add_owner: IDL.Func([IDL.Principal, IDL.Principal], [Result_2], []),
    assign_role: IDL.Func([IDL.Text, IDL.Principal, IDL.Principal], [Result_3], []),
    create_empty_member: IDL.Func([IDL.Principal, IDL.Principal], [Result_2], []),
    get_chunked_invite_data: IDL.Func(
      [IDL.Principal, IDL.Nat64, IDL.Nat64],
      [IDL.Vec(IDL.Nat8), IDL.Tuple(IDL.Nat64, IDL.Nat64)],
      ["query"]
    ),
    get_chunked_join_data: IDL.Func(
      [IDL.Principal, IDL.Nat64, IDL.Nat64],
      [IDL.Vec(IDL.Nat8), IDL.Tuple(IDL.Nat64, IDL.Nat64)],
      ["query"]
    ),
    get_group_invites: IDL.Func([IDL.Principal], [Result_4], []),
    get_group_invites_count: IDL.Func(
      [IDL.Vec(IDL.Principal)],
      [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64))],
      ["query"]
    ),
    get_group_member: IDL.Func([IDL.Principal, IDL.Principal], [Result_5], ["query"]),
    get_group_members: IDL.Func([IDL.Principal], [Result_6], ["query"]),
    get_group_members_count: IDL.Func(
      [IDL.Vec(IDL.Principal)],
      [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64))],
      ["query"]
    ),
    get_groups_for_members: IDL.Func(
      [IDL.Vec(IDL.Principal)],
      [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Principal)))],
      ["query"]
    ),
    get_member_roles: IDL.Func([IDL.Principal, IDL.Principal], [Result_7], ["query"]),
    get_self: IDL.Func([], [Result], ["query"]),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ["query"]),
    invite_to_group: IDL.Func([IDL.Principal, IDL.Principal], [Result], []),
    join_group: IDL.Func([IDL.Principal, IDL.Opt(IDL.Text)], [Result], []),
    leave_group: IDL.Func([IDL.Principal], [Result_1], []),
    migration_add_members: IDL.Func([IDL.Vec(IDL.Tuple(IDL.Principal, Member))], [], []),
    remove_invite: IDL.Func([IDL.Principal], [Result_1], []),
    remove_member_from_group: IDL.Func([IDL.Principal, IDL.Principal], [Result_1], []),
    remove_member_invite_from_group: IDL.Func([IDL.Principal, IDL.Principal], [Result_1], []),
    remove_role: IDL.Func([IDL.Text, IDL.Principal, IDL.Principal], [Result_3], []),
  });
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Text, IDL.Nat64];
};
