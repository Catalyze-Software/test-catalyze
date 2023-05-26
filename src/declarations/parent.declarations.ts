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
export type CanisterType =
  | { Empty: null }
  | { Foundation: null }
  | { Custom: null }
  | { ScalableChild: null }
  | { Scalable: null };
export interface ChunkData {
  chunk_id: bigint;
  canister: Principal;
  index: bigint;
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

export interface Permission {
  name: string;
  actions: PermissionActions;
  protected: boolean;
}
export interface PermissionActions {
  edit: boolean;
  read: boolean;
  delete: boolean;
  write: boolean;
}
export type Result = { Ok: Principal } | { Err: ApiError };
export type Result_1 = { Ok: ScalableCanisterDetails } | { Err: string };
export interface ScalableCanisterDetails {
  entry_range: [bigint, [] | [bigint]];
  principal: Principal;
  wasm_version: WasmVersion;
  is_available: boolean;
  canister_type: CanisterType;
}
export interface UpdateMessage {
  canister_principal: Principal;
  message: string;
}
export interface ValidationResponse {
  field: string;
  message: string;
}
export type WasmVersion = { None: null } | { Version: bigint } | { Custom: null };
export interface _SERVICE {
  __get_candid_interface_tmp_hack: ActorMethod<[], string>;
  accept_cycles: ActorMethod<[], bigint>;
  close_child_canister_and_spawn_sibling: ActorMethod<[bigint, Uint8Array | number[]], Result>;
  get_available_canister: ActorMethod<[], Result_1>;
  get_canisters: ActorMethod<[], Array<ScalableCanisterDetails>>;
  get_latest_wasm_version: ActorMethod<[], WasmVersion>;
  http_request: ActorMethod<[HttpRequest], HttpResponse>;
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
  const Result = IDL.Variant({ Ok: IDL.Principal, Err: ApiError });
  const WasmVersion = IDL.Variant({
    None: IDL.Null,
    Version: IDL.Nat64,
    Custom: IDL.Null,
  });
  const CanisterType = IDL.Variant({
    Empty: IDL.Null,
    Foundation: IDL.Null,
    Custom: IDL.Null,
    ScalableChild: IDL.Null,
    Scalable: IDL.Null,
  });
  const ScalableCanisterDetails = IDL.Record({
    entry_range: IDL.Tuple(IDL.Nat64, IDL.Opt(IDL.Nat64)),
    principal: IDL.Principal,
    wasm_version: WasmVersion,
    is_available: IDL.Bool,
    canister_type: CanisterType,
  });
  const Result_1 = IDL.Variant({
    Ok: ScalableCanisterDetails,
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
    close_child_canister_and_spawn_sibling: IDL.Func([IDL.Nat64, IDL.Vec(IDL.Nat8)], [Result], []),
    get_available_canister: IDL.Func([], [Result_1], ["query"]),
    get_canisters: IDL.Func([], [IDL.Vec(ScalableCanisterDetails)], ["query"]),
    get_latest_wasm_version: IDL.Func([], [WasmVersion], ["query"]),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ["query"]),
  });
};
