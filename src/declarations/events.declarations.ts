import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export interface Address {
  street: string;
  country: string;
  city: string;
  postal_code: string;
  label: string;
  state_or_province: string;
  house_number: string;
  house_number_addition: string;
}
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
export type Asset = { Url: string } | { None: null } | { CanisterStorage: CanisterStorage };
export type CanisterStorage = { None: null } | { Manifest: Manifest } | { Chunk: ChunkData };
export interface ChunkData {
  chunk_id: bigint;
  canister: Principal;
  index: bigint;
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
export interface Event {
  updated_on: bigint;
  banner_image: Asset;
  group_identifier: Principal;
  owner: Principal;
  metadata: [] | [string];
  date: DateRange;
  attendee_count: Array<[Principal, bigint]>;
  name: string;
  tags: Uint32Array | number[];
  description: string;
  created_by: Principal;
  created_on: bigint;
  website: string;
  privacy: Privacy;
  is_canceled: [boolean, string];
  image: Asset;
  location: Location;
  is_deleted: boolean;
}
export type EventFilter =
  | { Tag: number }
  | { UpdatedOn: DateRange }
  | { Name: string }
  | { Identifiers: Array<Principal> }
  | { IsCanceled: boolean }
  | { StartDate: DateRange }
  | { Owner: Principal }
  | { CreatedOn: DateRange }
  | { EndDate: DateRange };
export interface EventResponse {
  updated_on: bigint;
  banner_image: Asset;
  owner: Principal;
  metadata: [] | [string];
  date: DateRange;
  attendee_count: bigint;
  name: string;
  tags: Uint32Array | number[];
  description: string;
  created_by: Principal;
  created_on: bigint;
  website: string;
  privacy: Privacy;
  is_canceled: [boolean, string];
  image: Asset;
  identifier: Principal;
  location: Location;
  is_deleted: boolean;
}
export type EventSort =
  | { UpdatedOn: SortDirection }
  | { AttendeeCount: SortDirection }
  | { StartDate: SortDirection }
  | { CreatedOn: SortDirection }
  | { EndDate: SortDirection };
export type FilterType = { Or: null } | { And: null };
export type GatedType = { Neuron: Array<NeuronGated> } | { Token: Array<TokenGated> };
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
export type Location =
  | { None: null }
  | { Digital: string }
  | { Physical: PhysicalLocation }
  | { MultiLocation: MultiLocation };
export interface Manifest {
  entries: Array<ChunkData>;
}
export interface MultiLocation {
  physical: PhysicalLocation;
  digital: string;
}
export interface NeuronGated {
  governance_canister: Principal;
  name: string;
  description: string;
  ledger_canister: Principal;
  rules: Array<NeuronGatedRules>;
}
export type NeuronGatedRules =
  | { IsDisolving: boolean }
  | { MinStake: bigint }
  | { MinAge: bigint }
  | { MinDissolveDelay: bigint };
export interface PagedResponse {
  total: bigint;
  data: Array<EventResponse>;
  page: bigint;
  limit: bigint;
  number_of_pages: bigint;
}
export interface PhysicalLocation {
  longtitude: number;
  address: Address;
  lattitude: number;
}
export interface PostEvent {
  banner_image: Asset;
  metadata: [] | [string];
  date: DateRange;
  name: string;
  tags: Uint32Array | number[];
  description: string;
  website: string;
  privacy: Privacy;
  image: Asset;
  location: Location;
}
export type Privacy = { Gated: GatedType } | { Private: null } | { Public: null } | { InviteOnly: null };
export type Result = { Ok: null } | { Err: ApiError };
export type Result_1 = { Ok: EventResponse } | { Err: ApiError };
export type Result_2 = { Ok: [Principal, Privacy] } | { Err: ApiError };
export type Result_3 = { Ok: PagedResponse } | { Err: ApiError };
export type Result_4 = { Ok: null } | { Err: boolean };
export type SortDirection = { Asc: null } | { Desc: null };
export interface TokenGated {
  principal: Principal;
  name: string;
  description: string;
  amount: bigint;
  standard: string;
}
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
  add_entry_by_parent: ActorMethod<[Uint8Array | number[]], Result>;
  add_event: ActorMethod<[PostEvent, Principal, Principal, Principal], Result_1>;
  cancel_event: ActorMethod<[Principal, string, Principal, Principal], Result>;
  delete_event: ActorMethod<[Principal, Principal, Principal], Result>;
  edit_event: ActorMethod<[Principal, PostEvent, Principal, Principal], Result_1>;
  get_chunked_data: ActorMethod<
    [Array<EventFilter>, FilterType, bigint, bigint],
    [Uint8Array | number[], [bigint, bigint]]
  >;
  get_event: ActorMethod<[Principal, Principal], Result_1>;
  get_event_privacy_and_owner: ActorMethod<[Principal, Principal], Result_2>;
  get_events: ActorMethod<[bigint, bigint, EventSort, Array<EventFilter>, FilterType, Principal], Result_3>;
  get_events_count: ActorMethod<[Array<Principal>], Array<[Principal, bigint]>>;
  http_request: ActorMethod<[HttpRequest], HttpResponse>;
  migration_add_events: ActorMethod<[Array<[Principal, Event]>], undefined>;
  update_attendee_count_on_event: ActorMethod<[Principal, Principal, bigint], Result_4>;
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
  const DateRange = IDL.Record({
    end_date: IDL.Nat64,
    start_date: IDL.Nat64,
  });
  const NeuronGatedRules = IDL.Variant({
    IsDisolving: IDL.Bool,
    MinStake: IDL.Nat64,
    MinAge: IDL.Nat64,
    MinDissolveDelay: IDL.Nat64,
  });
  const NeuronGated = IDL.Record({
    governance_canister: IDL.Principal,
    name: IDL.Text,
    description: IDL.Text,
    ledger_canister: IDL.Principal,
    rules: IDL.Vec(NeuronGatedRules),
  });
  const TokenGated = IDL.Record({
    principal: IDL.Principal,
    name: IDL.Text,
    description: IDL.Text,
    amount: IDL.Nat64,
    standard: IDL.Text,
  });
  const GatedType = IDL.Variant({
    Neuron: IDL.Vec(NeuronGated),
    Token: IDL.Vec(TokenGated),
  });
  const Privacy = IDL.Variant({
    Gated: GatedType,
    Private: IDL.Null,
    Public: IDL.Null,
    InviteOnly: IDL.Null,
  });
  const Address = IDL.Record({
    street: IDL.Text,
    country: IDL.Text,
    city: IDL.Text,
    postal_code: IDL.Text,
    label: IDL.Text,
    state_or_province: IDL.Text,
    house_number: IDL.Text,
    house_number_addition: IDL.Text,
  });
  const PhysicalLocation = IDL.Record({
    longtitude: IDL.Float32,
    address: Address,
    lattitude: IDL.Float32,
  });
  const MultiLocation = IDL.Record({
    physical: PhysicalLocation,
    digital: IDL.Text,
  });
  const Location = IDL.Variant({
    None: IDL.Null,
    Digital: IDL.Text,
    Physical: PhysicalLocation,
    MultiLocation: MultiLocation,
  });
  const PostEvent = IDL.Record({
    banner_image: Asset,
    metadata: IDL.Opt(IDL.Text),
    date: DateRange,
    name: IDL.Text,
    tags: IDL.Vec(IDL.Nat32),
    description: IDL.Text,
    website: IDL.Text,
    privacy: Privacy,
    image: Asset,
    location: Location,
  });
  const EventResponse = IDL.Record({
    updated_on: IDL.Nat64,
    banner_image: Asset,
    owner: IDL.Principal,
    metadata: IDL.Opt(IDL.Text),
    date: DateRange,
    attendee_count: IDL.Nat64,
    name: IDL.Text,
    tags: IDL.Vec(IDL.Nat32),
    description: IDL.Text,
    created_by: IDL.Principal,
    created_on: IDL.Nat64,
    website: IDL.Text,
    privacy: Privacy,
    is_canceled: IDL.Tuple(IDL.Bool, IDL.Text),
    image: Asset,
    identifier: IDL.Principal,
    location: Location,
    is_deleted: IDL.Bool,
  });
  const Result_1 = IDL.Variant({ Ok: EventResponse, Err: ApiError });
  const EventFilter = IDL.Variant({
    Tag: IDL.Nat32,
    UpdatedOn: DateRange,
    Name: IDL.Text,
    Identifiers: IDL.Vec(IDL.Principal),
    IsCanceled: IDL.Bool,
    StartDate: DateRange,
    Owner: IDL.Principal,
    CreatedOn: DateRange,
    EndDate: DateRange,
  });
  const FilterType = IDL.Variant({ Or: IDL.Null, And: IDL.Null });
  const Result_2 = IDL.Variant({
    Ok: IDL.Tuple(IDL.Principal, Privacy),
    Err: ApiError,
  });
  const SortDirection = IDL.Variant({ Asc: IDL.Null, Desc: IDL.Null });
  const EventSort = IDL.Variant({
    UpdatedOn: SortDirection,
    AttendeeCount: SortDirection,
    StartDate: SortDirection,
    CreatedOn: SortDirection,
    EndDate: SortDirection,
  });
  const PagedResponse = IDL.Record({
    total: IDL.Nat64,
    data: IDL.Vec(EventResponse),
    page: IDL.Nat64,
    limit: IDL.Nat64,
    number_of_pages: IDL.Nat64,
  });
  const Result_3 = IDL.Variant({ Ok: PagedResponse, Err: ApiError });
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
  const Event = IDL.Record({
    updated_on: IDL.Nat64,
    banner_image: Asset,
    group_identifier: IDL.Principal,
    owner: IDL.Principal,
    metadata: IDL.Opt(IDL.Text),
    date: DateRange,
    attendee_count: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64)),
    name: IDL.Text,
    tags: IDL.Vec(IDL.Nat32),
    description: IDL.Text,
    created_by: IDL.Principal,
    created_on: IDL.Nat64,
    website: IDL.Text,
    privacy: Privacy,
    is_canceled: IDL.Tuple(IDL.Bool, IDL.Text),
    image: Asset,
    location: Location,
    is_deleted: IDL.Bool,
  });
  const Result_4 = IDL.Variant({ Ok: IDL.Null, Err: IDL.Bool });
  return IDL.Service({
    __get_candid_interface_tmp_hack: IDL.Func([], [IDL.Text], ["query"]),
    accept_cycles: IDL.Func([], [IDL.Nat64], []),
    add_entry_by_parent: IDL.Func([IDL.Vec(IDL.Nat8)], [Result], []),
    add_event: IDL.Func([PostEvent, IDL.Principal, IDL.Principal, IDL.Principal], [Result_1], []),
    cancel_event: IDL.Func([IDL.Principal, IDL.Text, IDL.Principal, IDL.Principal], [Result], []),
    delete_event: IDL.Func([IDL.Principal, IDL.Principal, IDL.Principal], [Result], []),
    edit_event: IDL.Func([IDL.Principal, PostEvent, IDL.Principal, IDL.Principal], [Result_1], []),
    get_chunked_data: IDL.Func(
      [IDL.Vec(EventFilter), FilterType, IDL.Nat64, IDL.Nat64],
      [IDL.Vec(IDL.Nat8), IDL.Tuple(IDL.Nat64, IDL.Nat64)],
      ["query"]
    ),
    get_event: IDL.Func([IDL.Principal, IDL.Principal], [Result_1], ["query"]),
    get_event_privacy_and_owner: IDL.Func([IDL.Principal, IDL.Principal], [Result_2], ["query"]),
    get_events: IDL.Func(
      [IDL.Nat64, IDL.Nat64, EventSort, IDL.Vec(EventFilter), FilterType, IDL.Principal],
      [Result_3],
      ["query"]
    ),
    get_events_count: IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64))], ["query"]),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ["query"]),
    migration_add_events: IDL.Func([IDL.Vec(IDL.Tuple(IDL.Principal, Event))], [], []),
    update_attendee_count_on_event: IDL.Func([IDL.Principal, IDL.Principal, IDL.Nat64], [Result_4], []),
  });
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Text, IDL.Nat64];
};
