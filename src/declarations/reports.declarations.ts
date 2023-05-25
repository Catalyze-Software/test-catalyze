import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

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
export interface Metadata {
	updated_at: bigint;
	owner: Principal;
	name: string;
	max_entries: bigint;
	current_entry_id: [] | [bigint];
	created_at: bigint;
	used_data: bigint;
	cycles: bigint;
	is_available: boolean;
	identifier: bigint;
	entries_count: bigint;
	parent: Principal;
}
export interface PagedResponse {
	total: bigint;
	data: Array<ReportResponse>;
	page: bigint;
	limit: bigint;
	number_of_pages: bigint;
}
export interface PagedResponse_1 {
	total: bigint;
	data: Array<WhitelistEntry>;
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
export type ReportSort =
	| { Id: SortDirection }
	| { Kind: SortDirection }
	| { CreatedOn: SortDirection };
export type Result = { Ok: null } | { Err: ApiError };
export type Result_1 = { Ok: ReportResponse } | { Err: ApiError };
export type Result_2 = { Ok: boolean } | { Err: ApiError };
export type Result_3 = { Ok: Metadata } | { Err: ApiError };
export type Result_4 = { Ok: PagedResponse } | { Err: ApiError };
export type Result_5 = { Ok: PagedResponse_1 } | { Err: ApiError };
export type SortDirection = { Asc: null } | { Desc: null };
export interface UpdateMessage {
	canister_principal: Principal;
	message: string;
}
export interface ValidationResponse {
	field: string;
	message: string;
}
export interface WhitelistEntry {
	principal: Principal;
	rights: WhitelistRights;
	created_on: bigint;
	label: string;
}
export type WhitelistRights = { Read: null } | { ReadWrite: null } | { Owner: null };
export interface _SERVICE {
	accept_cycles: ActorMethod<[], bigint>;
	add_entry_by_parent: ActorMethod<[[] | [Principal], Uint8Array | number[]], Result>;
	add_report: ActorMethod<[PostReport, Principal, Principal], Result_1>;
	add_to_whitelist: ActorMethod<[string, Principal, WhitelistRights], Result_2>;
	get_metadata: ActorMethod<[], Result_3>;
	get_report: ActorMethod<[Principal, Principal, Principal], Result_1>;
	get_reports: ActorMethod<
		[bigint, bigint, ReportSort, Array<ReportFilter>, FilterType, Principal, Principal],
		Result_4
	>;
	get_whitelist: ActorMethod<[bigint, bigint], Result_5>;
	http_request: ActorMethod<[HttpRequest], HttpResponse>;
	remove_from_whitelist: ActorMethod<[Principal], Result_2>;
	sanity_check: ActorMethod<[], string>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const idlFactory = ({ IDL }: any) => {
	const ErrorMessage = IDL.Record({
		tag: IDL.Text,
		message: IDL.Text,
		inputs: IDL.Opt(IDL.Vec(IDL.Text)),
		location: IDL.Text
	});
	const ValidationResponse = IDL.Record({
		field: IDL.Text,
		message: IDL.Text
	});
	const UpdateMessage = IDL.Record({
		canister_principal: IDL.Principal,
		message: IDL.Text
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
		BadRequest: ErrorMessage
	});
	const Result = IDL.Variant({ Ok: IDL.Null, Err: ApiError });
	const PostReport = IDL.Record({
		subject: IDL.Principal,
		group_identifier: IDL.Principal,
		message: IDL.Text
	});
	const ReportResponse = IDL.Record({
		subject: IDL.Principal,
		group_identifier: IDL.Principal,
		subject_kind: IDL.Text,
		created_on: IDL.Nat64,
		message: IDL.Text,
		reported_by: IDL.Principal,
		identifier: IDL.Principal
	});
	const Result_1 = IDL.Variant({ Ok: ReportResponse, Err: ApiError });
	const WhitelistRights = IDL.Variant({
		Read: IDL.Null,
		ReadWrite: IDL.Null,
		Owner: IDL.Null
	});
	const Result_2 = IDL.Variant({ Ok: IDL.Bool, Err: ApiError });
	const Metadata = IDL.Record({
		updated_at: IDL.Nat64,
		owner: IDL.Principal,
		name: IDL.Text,
		max_entries: IDL.Nat64,
		current_entry_id: IDL.Opt(IDL.Nat64),
		created_at: IDL.Nat64,
		used_data: IDL.Nat64,
		cycles: IDL.Nat64,
		is_available: IDL.Bool,
		identifier: IDL.Nat64,
		entries_count: IDL.Nat64,
		parent: IDL.Principal
	});
	const Result_3 = IDL.Variant({ Ok: Metadata, Err: ApiError });
	const SortDirection = IDL.Variant({ Asc: IDL.Null, Desc: IDL.Null });
	const ReportSort = IDL.Variant({
		Id: SortDirection,
		Kind: SortDirection,
		CreatedOn: SortDirection
	});
	const DateRange = IDL.Record({
		end_date: IDL.Nat64,
		start_date: IDL.Nat64
	});
	const ReportFilter = IDL.Variant({
		Kind: IDL.Text,
		ReportedBy: IDL.Principal,
		CreatedOn: DateRange
	});
	const FilterType = IDL.Variant({ Or: IDL.Null, And: IDL.Null });
	const PagedResponse = IDL.Record({
		total: IDL.Nat64,
		data: IDL.Vec(ReportResponse),
		page: IDL.Nat64,
		limit: IDL.Nat64,
		number_of_pages: IDL.Nat64
	});
	const Result_4 = IDL.Variant({ Ok: PagedResponse, Err: ApiError });
	const WhitelistEntry = IDL.Record({
		principal: IDL.Principal,
		rights: WhitelistRights,
		created_on: IDL.Nat64,
		label: IDL.Text
	});
	const PagedResponse_1 = IDL.Record({
		total: IDL.Nat64,
		data: IDL.Vec(WhitelistEntry),
		page: IDL.Nat64,
		limit: IDL.Nat64,
		number_of_pages: IDL.Nat64
	});
	const Result_5 = IDL.Variant({ Ok: PagedResponse_1, Err: ApiError });
	const HttpRequest = IDL.Record({
		url: IDL.Text,
		method: IDL.Text,
		body: IDL.Vec(IDL.Nat8),
		headers: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))
	});
	const HttpHeader = IDL.Record({ value: IDL.Text, name: IDL.Text });
	const HttpResponse = IDL.Record({
		status: IDL.Nat,
		body: IDL.Vec(IDL.Nat8),
		headers: IDL.Vec(HttpHeader)
	});
	return IDL.Service({
		accept_cycles: IDL.Func([], [IDL.Nat64], []),
		add_entry_by_parent: IDL.Func([IDL.Opt(IDL.Principal), IDL.Vec(IDL.Nat8)], [Result], []),
		add_report: IDL.Func([PostReport, IDL.Principal, IDL.Principal], [Result_1], []),
		add_to_whitelist: IDL.Func([IDL.Text, IDL.Principal, WhitelistRights], [Result_2], []),
		get_metadata: IDL.Func([], [Result_3], ['query']),
		get_report: IDL.Func([IDL.Principal, IDL.Principal, IDL.Principal], [Result_1], []),
		get_reports: IDL.Func(
			[
				IDL.Nat64,
				IDL.Nat64,
				ReportSort,
				IDL.Vec(ReportFilter),
				FilterType,
				IDL.Principal,
				IDL.Principal
			],
			[Result_4],
			[]
		),
		get_whitelist: IDL.Func([IDL.Nat64, IDL.Nat64], [Result_5], ['query']),
		http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
		remove_from_whitelist: IDL.Func([IDL.Principal], [Result_2], []),
		sanity_check: IDL.Func([], [IDL.Text], ['query'])
	});
};
