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
	data: Array<WhitelistEntry>;
	page: bigint;
	limit: bigint;
	number_of_pages: bigint;
}
export type Result = { Ok: [Principal, Member] } | { Err: ApiError };
export type Result_1 = { Ok: null } | { Err: ApiError };
export type Result_10 = { Ok: PagedResponse } | { Err: ApiError };
export type Result_2 = { Ok: Principal } | { Err: ApiError };
export type Result_3 = { Ok: boolean } | { Err: ApiError };
export type Result_4 = { Ok: null } | { Err: null };
export type Result_5 = { Ok: Array<InviteMemberResponse> } | { Err: ApiError };
export type Result_6 = { Ok: JoinedMemberResponse } | { Err: ApiError };
export type Result_7 = { Ok: Array<JoinedMemberResponse> } | { Err: ApiError };
export type Result_8 = { Ok: [Principal, Array<string>] } | { Err: string };
export type Result_9 = { Ok: Metadata } | { Err: ApiError };
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
	accept_owner_request_group_invite: ActorMethod<[Principal], Result>;
	accept_user_request_group_invite: ActorMethod<[Principal, Principal], Result>;
	add_entry_by_parent: ActorMethod<[[] | [Principal], Uint8Array | number[]], Result_1>;
	add_owner: ActorMethod<[Principal, Principal], Result_2>;
	add_to_whitelist: ActorMethod<[string, Principal, WhitelistRights], Result_3>;
	assign_role: ActorMethod<[string, Principal, Principal], Result_4>;
	create_empty_member: ActorMethod<[Principal, Principal], Result_2>;
	get_group_invites: ActorMethod<[Principal], Result_5>;
	get_group_invites_count: ActorMethod<[Array<Principal>], Array<[Principal, bigint]>>;
	get_group_member: ActorMethod<[Principal, Principal], Result_6>;
	get_group_members: ActorMethod<[Principal], Result_7>;
	get_group_members_count: ActorMethod<[Array<Principal>], Array<[Principal, bigint]>>;
	get_groups_for_members: ActorMethod<[Array<Principal>], Array<[Principal, Array<Principal>]>>;
	get_member_roles: ActorMethod<[Principal, Principal], Result_8>;
	get_metadata: ActorMethod<[], Result_9>;
	get_self: ActorMethod<[], Result>;
	get_whitelist: ActorMethod<[bigint, bigint], Result_10>;
	http_request: ActorMethod<[HttpRequest], HttpResponse>;
	invite_to_group: ActorMethod<[Principal, Principal], Result>;
	join_group: ActorMethod<[Principal, [] | [string]], Result>;
	leave_group: ActorMethod<[Principal], Result_1>;
	migration_add_members: ActorMethod<[Array<Member>], undefined>;
	migration_get_members: ActorMethod<[], Array<[Principal, Member]>>;
	remove_from_whitelist: ActorMethod<[Principal], Result_3>;
	remove_invite: ActorMethod<[Principal], Result_1>;
	remove_member_from_group: ActorMethod<[Principal, Principal], Result_1>;
	remove_member_invite_from_group: ActorMethod<[Principal, Principal], Result_1>;
	remove_role: ActorMethod<[string, Principal, Principal], Result_4>;
	sanity_check: ActorMethod<[], string>;
	wipe_data: ActorMethod<[], boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const idlFactory = ({ IDL }: any) => {
	const InviteType = IDL.Variant({
		OwnerRequest: IDL.Null,
		UserRequest: IDL.Null
	});
	const Invite = IDL.Record({
		updated_at: IDL.Nat64,
		group_identifier: IDL.Principal,
		invite_type: InviteType,
		created_at: IDL.Nat64
	});
	const Join = IDL.Record({
		updated_at: IDL.Nat64,
		group_identifier: IDL.Principal,
		created_at: IDL.Nat64,
		roles: IDL.Vec(IDL.Text)
	});
	const Member = IDL.Record({
		principal: IDL.Principal,
		invites: IDL.Vec(Invite),
		joined: IDL.Vec(Join),
		profile_identifier: IDL.Principal
	});
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
	const Result = IDL.Variant({
		Ok: IDL.Tuple(IDL.Principal, Member),
		Err: ApiError
	});
	const Result_1 = IDL.Variant({ Ok: IDL.Null, Err: ApiError });
	const Result_2 = IDL.Variant({ Ok: IDL.Principal, Err: ApiError });
	const WhitelistRights = IDL.Variant({
		Read: IDL.Null,
		ReadWrite: IDL.Null,
		Owner: IDL.Null
	});
	const Result_3 = IDL.Variant({ Ok: IDL.Bool, Err: ApiError });
	const Result_4 = IDL.Variant({ Ok: IDL.Null, Err: IDL.Null });
	const InviteMemberResponse = IDL.Record({
		principal: IDL.Principal,
		group_identifier: IDL.Principal,
		invite: Invite,
		member_identifier: IDL.Principal
	});
	const Result_5 = IDL.Variant({
		Ok: IDL.Vec(InviteMemberResponse),
		Err: ApiError
	});
	const JoinedMemberResponse = IDL.Record({
		principal: IDL.Principal,
		group_identifier: IDL.Principal,
		member_identifier: IDL.Principal,
		roles: IDL.Vec(IDL.Text)
	});
	const Result_6 = IDL.Variant({
		Ok: JoinedMemberResponse,
		Err: ApiError
	});
	const Result_7 = IDL.Variant({
		Ok: IDL.Vec(JoinedMemberResponse),
		Err: ApiError
	});
	const Result_8 = IDL.Variant({
		Ok: IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Text)),
		Err: IDL.Text
	});
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
	const Result_9 = IDL.Variant({ Ok: Metadata, Err: ApiError });
	const WhitelistEntry = IDL.Record({
		principal: IDL.Principal,
		rights: WhitelistRights,
		created_on: IDL.Nat64,
		label: IDL.Text
	});
	const PagedResponse = IDL.Record({
		total: IDL.Nat64,
		data: IDL.Vec(WhitelistEntry),
		page: IDL.Nat64,
		limit: IDL.Nat64,
		number_of_pages: IDL.Nat64
	});
	const Result_10 = IDL.Variant({ Ok: PagedResponse, Err: ApiError });
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
		accept_owner_request_group_invite: IDL.Func([IDL.Principal], [Result], []),
		accept_user_request_group_invite: IDL.Func([IDL.Principal, IDL.Principal], [Result], []),
		add_entry_by_parent: IDL.Func([IDL.Opt(IDL.Principal), IDL.Vec(IDL.Nat8)], [Result_1], []),
		add_owner: IDL.Func([IDL.Principal, IDL.Principal], [Result_2], []),
		add_to_whitelist: IDL.Func([IDL.Text, IDL.Principal, WhitelistRights], [Result_3], []),
		assign_role: IDL.Func([IDL.Text, IDL.Principal, IDL.Principal], [Result_4], []),
		create_empty_member: IDL.Func([IDL.Principal, IDL.Principal], [Result_2], []),
		get_group_invites: IDL.Func([IDL.Principal], [Result_5], []),
		get_group_invites_count: IDL.Func(
			[IDL.Vec(IDL.Principal)],
			[IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64))],
			['query']
		),
		get_group_member: IDL.Func([IDL.Principal, IDL.Principal], [Result_6], ['query']),
		get_group_members: IDL.Func([IDL.Principal], [Result_7], ['query']),
		get_group_members_count: IDL.Func(
			[IDL.Vec(IDL.Principal)],
			[IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64))],
			['query']
		),
		get_groups_for_members: IDL.Func(
			[IDL.Vec(IDL.Principal)],
			[IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Principal)))],
			['query']
		),
		get_member_roles: IDL.Func([IDL.Principal, IDL.Principal], [Result_8], ['query']),
		get_metadata: IDL.Func([], [Result_9], ['query']),
		get_self: IDL.Func([], [Result], ['query']),
		get_whitelist: IDL.Func([IDL.Nat64, IDL.Nat64], [Result_10], ['query']),
		http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
		invite_to_group: IDL.Func([IDL.Principal, IDL.Principal], [Result], []),
		join_group: IDL.Func([IDL.Principal, IDL.Opt(IDL.Text)], [Result], []),
		leave_group: IDL.Func([IDL.Principal], [Result_1], []),
		migration_add_members: IDL.Func([IDL.Vec(Member)], [], []),
		migration_get_members: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Principal, Member))], ['query']),
		remove_from_whitelist: IDL.Func([IDL.Principal], [Result_3], []),
		remove_invite: IDL.Func([IDL.Principal], [Result_1], []),
		remove_member_from_group: IDL.Func([IDL.Principal, IDL.Principal], [Result_1], []),
		remove_member_invite_from_group: IDL.Func([IDL.Principal, IDL.Principal], [Result_1], []),
		remove_role: IDL.Func([IDL.Text, IDL.Principal, IDL.Principal], [Result_4], []),
		sanity_check: IDL.Func([], [IDL.Text], ['query']),
		wipe_data: IDL.Func([], [IDL.Bool], [])
	});
};
