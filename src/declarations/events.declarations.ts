import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

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
export interface Gated {
	principal: Principal;
	name: string;
	description: string;
	amount: bigint;
	standard: string;
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
export type Location = { None: null } | { Digital: string } | { Physical: PhysicalLocation };
export interface Manifest {
	entries: Array<ChunkData>;
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
	data: Array<EventResponse>;
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
export interface PhysicalLocation {
	longtitude: number;
	address: Address;
	lattitude: number;
}
export interface PostEvent {
	banner_image: Asset;
	date: DateRange;
	name: string;
	tags: Uint32Array | number[];
	description: string;
	website: string;
	privacy: Privacy;
	image: Asset;
	location: Location;
}
export type Privacy =
	| { Gated: Array<Gated> }
	| { Private: null }
	| { Public: null }
	| { InviteOnly: null };
export type Result = { Ok: null } | { Err: ApiError };
export type Result_1 = { Ok: EventResponse } | { Err: ApiError };
export type Result_2 = { Ok: boolean } | { Err: ApiError };
export type Result_3 = { Ok: [Principal, Privacy] } | { Err: ApiError };
export type Result_4 = { Ok: PagedResponse } | { Err: ApiError };
export type Result_5 = { Ok: Metadata } | { Err: ApiError };
export type Result_6 = { Ok: PagedResponse_1 } | { Err: ApiError };
export type Result_7 = { Ok: null } | { Err: boolean };
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
	add_event: ActorMethod<[PostEvent, Principal, Principal, Principal], Result_1>;
	add_to_whitelist: ActorMethod<[string, Principal, WhitelistRights], Result_2>;
	cancel_event: ActorMethod<[Principal, string, Principal, Principal], Result>;
	delete_event: ActorMethod<[Principal, Principal, Principal], Result>;
	edit_event: ActorMethod<[Principal, PostEvent, Principal, Principal], Result_1>;
	get_event: ActorMethod<[Principal, Principal], Result_1>;
	get_event_privacy_and_owner: ActorMethod<[Principal, Principal], Result_3>;
	get_events: ActorMethod<
		[bigint, bigint, EventSort, Array<EventFilter>, FilterType, Principal],
		Result_4
	>;
	get_events_count: ActorMethod<[Array<Principal>], Array<[Principal, bigint]>>;
	get_metadata: ActorMethod<[], Result_5>;
	get_whitelist: ActorMethod<[bigint, bigint], Result_6>;
	http_request: ActorMethod<[HttpRequest], HttpResponse>;
	migration_add_events: ActorMethod<[Array<Event>], undefined>;
	migration_get_events: ActorMethod<[], Array<[Principal, Event]>>;
	remove_from_whitelist: ActorMethod<[Principal], Result_2>;
	sanity_check: ActorMethod<[], string>;
	update_attendee_count_on_event: ActorMethod<[Principal, Principal, bigint], Result_7>;
	wipe_data: ActorMethod<[], boolean>;
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
	const ChunkData = IDL.Record({
		chunk_id: IDL.Nat64,
		canister: IDL.Principal,
		index: IDL.Nat64
	});
	const Manifest = IDL.Record({ entries: IDL.Vec(ChunkData) });
	const CanisterStorage = IDL.Variant({
		None: IDL.Null,
		Manifest: Manifest,
		Chunk: ChunkData
	});
	const Asset = IDL.Variant({
		Url: IDL.Text,
		None: IDL.Null,
		CanisterStorage: CanisterStorage
	});
	const DateRange = IDL.Record({
		end_date: IDL.Nat64,
		start_date: IDL.Nat64
	});
	const Gated = IDL.Record({
		principal: IDL.Principal,
		name: IDL.Text,
		description: IDL.Text,
		amount: IDL.Nat64,
		standard: IDL.Text
	});
	const Privacy = IDL.Variant({
		Gated: IDL.Vec(Gated),
		Private: IDL.Null,
		Public: IDL.Null,
		InviteOnly: IDL.Null
	});
	const Address = IDL.Record({
		street: IDL.Text,
		country: IDL.Text,
		city: IDL.Text,
		postal_code: IDL.Text,
		label: IDL.Text,
		state_or_province: IDL.Text,
		house_number: IDL.Text,
		house_number_addition: IDL.Text
	});
	const PhysicalLocation = IDL.Record({
		longtitude: IDL.Float32,
		address: Address,
		lattitude: IDL.Float32
	});
	const Location = IDL.Variant({
		None: IDL.Null,
		Digital: IDL.Text,
		Physical: PhysicalLocation
	});
	const PostEvent = IDL.Record({
		banner_image: Asset,
		date: DateRange,
		name: IDL.Text,
		tags: IDL.Vec(IDL.Nat32),
		description: IDL.Text,
		website: IDL.Text,
		privacy: Privacy,
		image: Asset,
		location: Location
	});
	const EventResponse = IDL.Record({
		updated_on: IDL.Nat64,
		banner_image: Asset,
		owner: IDL.Principal,
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
		is_deleted: IDL.Bool
	});
	const Result_1 = IDL.Variant({ Ok: EventResponse, Err: ApiError });
	const WhitelistRights = IDL.Variant({
		Read: IDL.Null,
		ReadWrite: IDL.Null,
		Owner: IDL.Null
	});
	const Result_2 = IDL.Variant({ Ok: IDL.Bool, Err: ApiError });
	const Result_3 = IDL.Variant({
		Ok: IDL.Tuple(IDL.Principal, Privacy),
		Err: ApiError
	});
	const SortDirection = IDL.Variant({ Asc: IDL.Null, Desc: IDL.Null });
	const EventSort = IDL.Variant({
		UpdatedOn: SortDirection,
		AttendeeCount: SortDirection,
		StartDate: SortDirection,
		CreatedOn: SortDirection,
		EndDate: SortDirection
	});
	const EventFilter = IDL.Variant({
		Tag: IDL.Nat32,
		UpdatedOn: DateRange,
		Name: IDL.Text,
		Identifiers: IDL.Vec(IDL.Principal),
		IsCanceled: IDL.Bool,
		StartDate: DateRange,
		Owner: IDL.Principal,
		CreatedOn: DateRange,
		EndDate: DateRange
	});
	const FilterType = IDL.Variant({ Or: IDL.Null, And: IDL.Null });
	const PagedResponse = IDL.Record({
		total: IDL.Nat64,
		data: IDL.Vec(EventResponse),
		page: IDL.Nat64,
		limit: IDL.Nat64,
		number_of_pages: IDL.Nat64
	});
	const Result_4 = IDL.Variant({ Ok: PagedResponse, Err: ApiError });
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
	const Result_5 = IDL.Variant({ Ok: Metadata, Err: ApiError });
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
	const Result_6 = IDL.Variant({ Ok: PagedResponse_1, Err: ApiError });
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
	const Event = IDL.Record({
		updated_on: IDL.Nat64,
		banner_image: Asset,
		group_identifier: IDL.Principal,
		owner: IDL.Principal,
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
		is_deleted: IDL.Bool
	});
	const Result_7 = IDL.Variant({ Ok: IDL.Null, Err: IDL.Bool });
	return IDL.Service({
		accept_cycles: IDL.Func([], [IDL.Nat64], []),
		add_entry_by_parent: IDL.Func([IDL.Opt(IDL.Principal), IDL.Vec(IDL.Nat8)], [Result], []),
		add_event: IDL.Func([PostEvent, IDL.Principal, IDL.Principal, IDL.Principal], [Result_1], []),
		add_to_whitelist: IDL.Func([IDL.Text, IDL.Principal, WhitelistRights], [Result_2], []),
		cancel_event: IDL.Func([IDL.Principal, IDL.Text, IDL.Principal, IDL.Principal], [Result], []),
		delete_event: IDL.Func([IDL.Principal, IDL.Principal, IDL.Principal], [Result], []),
		edit_event: IDL.Func([IDL.Principal, PostEvent, IDL.Principal, IDL.Principal], [Result_1], []),
		get_event: IDL.Func([IDL.Principal, IDL.Principal], [Result_1], ['query']),
		get_event_privacy_and_owner: IDL.Func([IDL.Principal, IDL.Principal], [Result_3], ['query']),
		get_events: IDL.Func(
			[IDL.Nat64, IDL.Nat64, EventSort, IDL.Vec(EventFilter), FilterType, IDL.Principal],
			[Result_4],
			['query']
		),
		get_events_count: IDL.Func(
			[IDL.Vec(IDL.Principal)],
			[IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64))],
			['query']
		),
		get_metadata: IDL.Func([], [Result_5], ['query']),
		get_whitelist: IDL.Func([IDL.Nat64, IDL.Nat64], [Result_6], ['query']),
		http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
		migration_add_events: IDL.Func([IDL.Vec(Event)], [], []),
		migration_get_events: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Principal, Event))], ['query']),
		remove_from_whitelist: IDL.Func([IDL.Principal], [Result_2], []),
		sanity_check: IDL.Func([], [IDL.Text], ['query']),
		update_attendee_count_on_event: IDL.Func(
			[IDL.Principal, IDL.Principal, IDL.Nat64],
			[Result_7],
			[]
		),
		wipe_data: IDL.Func([], [IDL.Bool], [])
	});
};
