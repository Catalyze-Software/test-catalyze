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
export type ApplicationRole =
  | { Blocked: null }
  | { Guest: null }
  | { Member: null }
  | { Banned: null }
  | { Admin: null }
  | { Moderator: null }
  | { Leader: null }
  | { Owner: null }
  | { Watcher: null };
export type Asset = { Url: string } | { None: null } | { CanisterStorage: CanisterStorage };
export type CanisterStorage = { None: null } | { Manifest: Manifest } | { Chunk: ChunkData };
export interface ChunkData {
  chunk_id: bigint;
  canister: Principal;
  index: bigint;
}
export interface CodeOfConductDetails {
  approved_date: bigint;
  approved_version: bigint;
}
export interface DateRange {
  end_date: bigint;
  start_date: bigint;
}
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
export interface Manifest {
  entries: Array<ChunkData>;
}
export interface PostProfile {
  username: string;
  display_name: string;
  extra: string;
  privacy: ProfilePrivacy;
  first_name: string;
  last_name: string;
}
export interface PostWallet {
  principal: Principal;
  provider: string;
}
export interface Profile {
  updated_on: bigint;
  profile_image: Asset;
  principal: Principal;
  banner_image: Asset;
  about: string;
  country: string;
  username: string;
  starred: Array<[Principal, string]>;
  interests: Uint32Array | number[];
  city: string;
  created_on: bigint;
  email: string;
  website: string;
  display_name: string;
  extra: string;
  privacy: ProfilePrivacy;
  wallets: Array<[Principal, Wallet]>;
  state_or_province: string;
  first_name: string;
  last_name: string;
  member_identifier: Principal;
  causes: Uint32Array | number[];
  code_of_conduct: CodeOfConductDetails;
  date_of_birth: bigint;
  skills: Uint32Array | number[];
  relations: Array<[Principal, string]>;
  application_role: ApplicationRole;
}
export type ProfileFilter =
  | { Interest: number }
  | { Email: string }
  | { Skill: number }
  | { DisplayName: string }
  | { UpdatedOn: DateRange }
  | { City: string }
  | { FirstName: string }
  | { LastName: string }
  | { Cause: number }
  | { StateOrProvince: string }
  | { Country: string }
  | { CreatedOn: DateRange }
  | { Username: string };
export type ProfilePrivacy = { Private: null } | { Public: null };
export interface ProfileResponse {
  updated_on: bigint;
  profile_image: Asset;
  principal: Principal;
  banner_image: Asset;
  about: string;
  country: string;
  username: string;
  interests: Uint32Array | number[];
  city: string;
  created_on: bigint;
  email: string;
  website: string;
  display_name: string;
  extra: string;
  privacy: ProfilePrivacy;
  wallets: Array<WalletResponse>;
  state_or_province: string;
  first_name: string;
  last_name: string;
  member_identifier: Principal;
  causes: Uint32Array | number[];
  code_of_conduct: CodeOfConductDetails;
  date_of_birth: bigint;
  identifier: Principal;
  skills: Uint32Array | number[];
  application_role: ApplicationRole;
}
export type RelationType = { Blocked: null } | { Friend: null };
export type Result = { Ok: null } | { Err: ApiError };
export type Result_1 = { Ok: ProfileResponse } | { Err: ApiError };
export type Result_2 = { Ok: boolean } | { Err: ApiError };
export type Result_3 = { Ok: null } | { Err: null };
export interface UpdateMessage {
  canister_principal: Principal;
  message: string;
}
export interface UpdateProfile {
  profile_image: Asset;
  banner_image: Asset;
  about: string;
  country: string;
  interests: Uint32Array | number[];
  city: string;
  email: [] | [string];
  website: string;
  display_name: string;
  extra: string;
  privacy: ProfilePrivacy;
  state_or_province: string;
  first_name: string;
  last_name: string;
  causes: Uint32Array | number[];
  date_of_birth: bigint;
  skills: Uint32Array | number[];
}
export interface ValidationResponse {
  field: string;
  message: string;
}
export interface Wallet {
  provider: string;
  is_primary: boolean;
}
export interface WalletResponse {
  principal: Principal;
  provider: string;
  is_primary: boolean;
}
export interface _SERVICE {
  __get_candid_interface_tmp_hack: ActorMethod<[], string>;
  accept_cycles: ActorMethod<[], bigint>;
  add_entry_by_parent: ActorMethod<[Uint8Array | number[]], Result>;
  add_profile: ActorMethod<[PostProfile, Principal], Result_1>;
  add_relation: ActorMethod<[Principal, RelationType], Result_1>;
  add_starred: ActorMethod<[Principal], Result_1>;
  add_wallet: ActorMethod<[PostWallet], Result_1>;
  approve_code_of_conduct: ActorMethod<[bigint], Result_2>;
  edit_profile: ActorMethod<[UpdateProfile], Result_1>;
  get_chunked_data: ActorMethod<[Array<ProfileFilter>, bigint, bigint], [Uint8Array | number[], [bigint, bigint]]>;
  get_profile_by_identifier: ActorMethod<[Principal], Result_1>;
  get_profile_by_user_principal: ActorMethod<[Principal], Result_1>;
  get_profiles_by_identifier: ActorMethod<[Array<Principal>], Array<ProfileResponse>>;
  get_profiles_by_user_principal: ActorMethod<[Array<Principal>], Array<ProfileResponse>>;
  get_relations: ActorMethod<[RelationType], Array<Principal>>;
  get_starred_events: ActorMethod<[], Array<Principal>>;
  get_starred_groups: ActorMethod<[], Array<Principal>>;
  get_starred_tasks: ActorMethod<[], Array<Principal>>;
  http_request: ActorMethod<[HttpRequest], HttpResponse>;
  migration_add_profiles: ActorMethod<[Array<[Principal, Profile]>], undefined>;
  remove_relation: ActorMethod<[Principal], Result_1>;
  remove_starred: ActorMethod<[Principal], Result_1>;
  remove_wallet: ActorMethod<[Principal], Result_1>;
  set_wallet_as_primary: ActorMethod<[Principal], Result_3>;
}

export const idlFactory = ({ IDL }) => {
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
  const Result = IDL.Variant({ Ok: IDL.Null, Err: ApiError });
  const ProfilePrivacy = IDL.Variant({
    Private: IDL.Null,
    Public: IDL.Null,
  });
  const PostProfile = IDL.Record({
    username: IDL.Text,
    display_name: IDL.Text,
    extra: IDL.Text,
    privacy: ProfilePrivacy,
    first_name: IDL.Text,
    last_name: IDL.Text,
  });
  const ChunkData = IDL.Record({
    chunk_id: IDL.Nat64,
    canister: IDL.Principal,
    index: IDL.Nat64,
  });
  const Manifest = IDL.Record({ entries: IDL.Vec(ChunkData) });
  const CanisterStorage = IDL.Variant({
    None: IDL.Null,
    Manifest: Manifest,
    Chunk: ChunkData,
  });
  const Asset = IDL.Variant({
    Url: IDL.Text,
    None: IDL.Null,
    CanisterStorage: CanisterStorage,
  });
  const WalletResponse = IDL.Record({
    principal: IDL.Principal,
    provider: IDL.Text,
    is_primary: IDL.Bool,
  });
  const CodeOfConductDetails = IDL.Record({
    approved_date: IDL.Nat64,
    approved_version: IDL.Nat64,
  });
  const ApplicationRole = IDL.Variant({
    Blocked: IDL.Null,
    Guest: IDL.Null,
    Member: IDL.Null,
    Banned: IDL.Null,
    Admin: IDL.Null,
    Moderator: IDL.Null,
    Leader: IDL.Null,
    Owner: IDL.Null,
    Watcher: IDL.Null,
  });
  const ProfileResponse = IDL.Record({
    updated_on: IDL.Nat64,
    profile_image: Asset,
    principal: IDL.Principal,
    banner_image: Asset,
    about: IDL.Text,
    country: IDL.Text,
    username: IDL.Text,
    interests: IDL.Vec(IDL.Nat32),
    city: IDL.Text,
    created_on: IDL.Nat64,
    email: IDL.Text,
    website: IDL.Text,
    display_name: IDL.Text,
    extra: IDL.Text,
    privacy: ProfilePrivacy,
    wallets: IDL.Vec(WalletResponse),
    state_or_province: IDL.Text,
    first_name: IDL.Text,
    last_name: IDL.Text,
    member_identifier: IDL.Principal,
    causes: IDL.Vec(IDL.Nat32),
    code_of_conduct: CodeOfConductDetails,
    date_of_birth: IDL.Nat64,
    identifier: IDL.Principal,
    skills: IDL.Vec(IDL.Nat32),
    application_role: ApplicationRole,
  });
  const Result_1 = IDL.Variant({ Ok: ProfileResponse, Err: ApiError });
  const RelationType = IDL.Variant({
    Blocked: IDL.Null,
    Friend: IDL.Null,
  });
  const PostWallet = IDL.Record({
    principal: IDL.Principal,
    provider: IDL.Text,
  });
  const Result_2 = IDL.Variant({ Ok: IDL.Bool, Err: ApiError });
  const UpdateProfile = IDL.Record({
    profile_image: Asset,
    banner_image: Asset,
    about: IDL.Text,
    country: IDL.Text,
    interests: IDL.Vec(IDL.Nat32),
    city: IDL.Text,
    email: IDL.Opt(IDL.Text),
    website: IDL.Text,
    display_name: IDL.Text,
    extra: IDL.Text,
    privacy: ProfilePrivacy,
    state_or_province: IDL.Text,
    first_name: IDL.Text,
    last_name: IDL.Text,
    causes: IDL.Vec(IDL.Nat32),
    date_of_birth: IDL.Nat64,
    skills: IDL.Vec(IDL.Nat32),
  });
  const DateRange = IDL.Record({
    end_date: IDL.Nat64,
    start_date: IDL.Nat64,
  });
  const ProfileFilter = IDL.Variant({
    Interest: IDL.Nat32,
    Email: IDL.Text,
    Skill: IDL.Nat32,
    DisplayName: IDL.Text,
    UpdatedOn: DateRange,
    City: IDL.Text,
    FirstName: IDL.Text,
    LastName: IDL.Text,
    Cause: IDL.Nat32,
    StateOrProvince: IDL.Text,
    Country: IDL.Text,
    CreatedOn: DateRange,
    Username: IDL.Text,
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
  const Wallet = IDL.Record({ provider: IDL.Text, is_primary: IDL.Bool });
  const Profile = IDL.Record({
    updated_on: IDL.Nat64,
    profile_image: Asset,
    principal: IDL.Principal,
    banner_image: Asset,
    about: IDL.Text,
    country: IDL.Text,
    username: IDL.Text,
    starred: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text)),
    interests: IDL.Vec(IDL.Nat32),
    city: IDL.Text,
    created_on: IDL.Nat64,
    email: IDL.Text,
    website: IDL.Text,
    display_name: IDL.Text,
    extra: IDL.Text,
    privacy: ProfilePrivacy,
    wallets: IDL.Vec(IDL.Tuple(IDL.Principal, Wallet)),
    state_or_province: IDL.Text,
    first_name: IDL.Text,
    last_name: IDL.Text,
    member_identifier: IDL.Principal,
    causes: IDL.Vec(IDL.Nat32),
    code_of_conduct: CodeOfConductDetails,
    date_of_birth: IDL.Nat64,
    skills: IDL.Vec(IDL.Nat32),
    relations: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text)),
    application_role: ApplicationRole,
  });
  const Result_3 = IDL.Variant({ Ok: IDL.Null, Err: IDL.Null });
  return IDL.Service({
    __get_candid_interface_tmp_hack: IDL.Func([], [IDL.Text], ["query"]),
    accept_cycles: IDL.Func([], [IDL.Nat64], []),
    add_entry_by_parent: IDL.Func([IDL.Vec(IDL.Nat8)], [Result], []),
    add_profile: IDL.Func([PostProfile, IDL.Principal], [Result_1], []),
    add_relation: IDL.Func([IDL.Principal, RelationType], [Result_1], []),
    add_starred: IDL.Func([IDL.Principal], [Result_1], []),
    add_wallet: IDL.Func([PostWallet], [Result_1], []),
    approve_code_of_conduct: IDL.Func([IDL.Nat64], [Result_2], []),
    edit_profile: IDL.Func([UpdateProfile], [Result_1], []),
    get_chunked_data: IDL.Func(
      [IDL.Vec(ProfileFilter), IDL.Nat64, IDL.Nat64],
      [IDL.Vec(IDL.Nat8), IDL.Tuple(IDL.Nat64, IDL.Nat64)],
      ["query"]
    ),
    get_profile_by_identifier: IDL.Func([IDL.Principal], [Result_1], []),
    get_profile_by_user_principal: IDL.Func([IDL.Principal], [Result_1], []),
    get_profiles_by_identifier: IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Vec(ProfileResponse)], []),
    get_profiles_by_user_principal: IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Vec(ProfileResponse)], []),
    get_relations: IDL.Func([RelationType], [IDL.Vec(IDL.Principal)], ["query"]),
    get_starred_events: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    get_starred_groups: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    get_starred_tasks: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ["query"]),
    migration_add_profiles: IDL.Func([IDL.Vec(IDL.Tuple(IDL.Principal, Profile))], [], []),
    remove_relation: IDL.Func([IDL.Principal], [Result_1], []),
    remove_starred: IDL.Func([IDL.Principal], [Result_1], []),
    remove_wallet: IDL.Func([IDL.Principal], [Result_1], []),
    set_wallet_as_primary: IDL.Func([IDL.Principal], [Result_3], []),
  });
};
