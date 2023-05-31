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
export type FilterType = { Or: null } | { And: null };
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
export interface PagedResponse {
  total: bigint;
  data: Array<ReportResponse>;
  page: bigint;
  limit: bigint;
  number_of_pages: bigint;
}
export interface PostReport {
  subject: Principal;
  group_identifier: Principal;
  message: string;
}
export type ReportFilter = { Kind: string } | { ReportedBy: Principal } | { CreatedOn: DateRange };
export interface ReportResponse {
  subject: Principal;
  group_identifier: Principal;
  subject_kind: string;
  created_on: bigint;
  message: string;
  reported_by: Principal;
  identifier: Principal;
}
export type ReportSort = { Id: SortDirection } | { Kind: SortDirection } | { CreatedOn: SortDirection };
export type Result = { Ok: null } | { Err: ApiError };
export type Result_1 = { Ok: ReportResponse } | { Err: ApiError };
export type Result_2 = { Ok: PagedResponse } | { Err: ApiError };
export type SortDirection = { Asc: null } | { Desc: null };
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
  add_report: ActorMethod<[PostReport, Principal, Principal], Result_1>;
  add_report_test: ActorMethod<[], undefined>;
  get_chunked_data: ActorMethod<
    [Array<ReportFilter>, FilterType, bigint, bigint],
    [Uint8Array | number[], [bigint, bigint]]
  >;
  get_report: ActorMethod<[Principal, Principal, Principal], Result_1>;
  get_reports: ActorMethod<
    [bigint, bigint, ReportSort, Array<ReportFilter>, FilterType, Principal, Principal],
    Result_2
  >;
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
  const Result = IDL.Variant({ Ok: IDL.Null, Err: ApiError });
  const PostReport = IDL.Record({
    subject: IDL.Principal,
    group_identifier: IDL.Principal,
    message: IDL.Text,
  });
  const ReportResponse = IDL.Record({
    subject: IDL.Principal,
    group_identifier: IDL.Principal,
    subject_kind: IDL.Text,
    created_on: IDL.Nat64,
    message: IDL.Text,
    reported_by: IDL.Principal,
    identifier: IDL.Principal,
  });
  const Result_1 = IDL.Variant({ Ok: ReportResponse, Err: ApiError });
  const DateRange = IDL.Record({
    end_date: IDL.Nat64,
    start_date: IDL.Nat64,
  });
  const ReportFilter = IDL.Variant({
    Kind: IDL.Text,
    ReportedBy: IDL.Principal,
    CreatedOn: DateRange,
  });
  const FilterType = IDL.Variant({ Or: IDL.Null, And: IDL.Null });
  const SortDirection = IDL.Variant({ Asc: IDL.Null, Desc: IDL.Null });
  const ReportSort = IDL.Variant({
    Id: SortDirection,
    Kind: SortDirection,
    CreatedOn: SortDirection,
  });
  const PagedResponse = IDL.Record({
    total: IDL.Nat64,
    data: IDL.Vec(ReportResponse),
    page: IDL.Nat64,
    limit: IDL.Nat64,
    number_of_pages: IDL.Nat64,
  });
  const Result_2 = IDL.Variant({ Ok: PagedResponse, Err: ApiError });
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
    add_entry_by_parent: IDL.Func([IDL.Vec(IDL.Nat8)], [Result], []),
    add_report: IDL.Func([PostReport, IDL.Principal, IDL.Principal], [Result_1], []),
    add_report_test: IDL.Func([], [], []),
    get_chunked_data: IDL.Func(
      [IDL.Vec(ReportFilter), FilterType, IDL.Nat64, IDL.Nat64],
      [IDL.Vec(IDL.Nat8), IDL.Tuple(IDL.Nat64, IDL.Nat64)],
      ["query"]
    ),
    get_report: IDL.Func([IDL.Principal, IDL.Principal, IDL.Principal], [Result_1], []),
    get_reports: IDL.Func(
      [IDL.Nat64, IDL.Nat64, ReportSort, IDL.Vec(ReportFilter), FilterType, IDL.Principal, IDL.Principal],
      [Result_2],
      []
    ),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ["query"]),
  });
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Text, IDL.Nat64];
};
