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
export type Result_3 = { Ok: ApplicationRole } | { Err: ApiError };
export type Result_4 = { Ok: Metadata } | { Err: ApiError };
export type Result_5 = { Ok: PagedResponse } | { Err: ApiError };
export type Result_6 = { Ok: null } | { Err: null };
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
	add_member_to_profile: ActorMethod<[Array<[Principal, Principal]>], Array<string>>;
	add_profile: ActorMethod<[PostProfile, Principal], Result_1>;
	add_relation: ActorMethod<[Principal, RelationType], Result_1>;
	add_starred: ActorMethod<[Principal], Result_1>;
	add_to_whitelist: ActorMethod<[string, Principal, WhitelistRights], Result_2>;
	add_wallet: ActorMethod<[PostWallet], Result_1>;
	approve_code_of_conduct: ActorMethod<[bigint], Result_2>;
	edit_application_role: ActorMethod<[Principal, ApplicationRole], Result_1>;
	edit_profile: ActorMethod<[UpdateProfile], Result_1>;
	get_application_role: ActorMethod<[], Result_3>;
	get_metadata: ActorMethod<[], Result_4>;
	get_profile_by_identifier: ActorMethod<[Principal], Result_1>;
	get_profile_by_user_principal: ActorMethod<[Principal], Result_1>;
	get_profiles_by_identifier: ActorMethod<[Array<Principal>], Array<ProfileResponse>>;
	get_profiles_by_user_principal: ActorMethod<[Array<Principal>], Array<ProfileResponse>>;
	get_relations: ActorMethod<[RelationType], Array<Principal>>;
	get_starred_events: ActorMethod<[], Array<Principal>>;
	get_starred_groups: ActorMethod<[], Array<Principal>>;
	get_starred_tasks: ActorMethod<[], Array<Principal>>;
	get_whitelist: ActorMethod<[bigint, bigint], Result_5>;
	http_request: ActorMethod<[HttpRequest], HttpResponse>;
	migration_add_profiles: ActorMethod<[Array<Profile>], undefined>;
	migration_get_profiles: ActorMethod<[], Array<[Principal, Profile]>>;
	remove_from_whitelist: ActorMethod<[Principal], Result_2>;
	remove_relation: ActorMethod<[Principal], Result_1>;
	remove_starred: ActorMethod<[Principal], Result_1>;
	remove_wallet: ActorMethod<[Principal], Result_1>;
	sanity_check: ActorMethod<[], string>;
	set_wallet_as_primary: ActorMethod<[Principal], Result_6>;
	wipe_data: ActorMethod<[], boolean>;
}

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
	const ProfilePrivacy = IDL.Variant({
		Private: IDL.Null,
		Public: IDL.Null
	});
	const PostProfile = IDL.Record({
		username: IDL.Text,
		display_name: IDL.Text,
		extra: IDL.Text,
		privacy: ProfilePrivacy,
		first_name: IDL.Text,
		last_name: IDL.Text
	});
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
	const WalletResponse = IDL.Record({
		principal: IDL.Principal,
		provider: IDL.Text,
		is_primary: IDL.Bool
	});
	const CodeOfConductDetails = IDL.Record({
		approved_date: IDL.Nat64,
		approved_version: IDL.Nat64
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
		Watcher: IDL.Null
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
		application_role: ApplicationRole
	});
	const Result_1 = IDL.Variant({ Ok: ProfileResponse, Err: ApiError });
	const RelationType = IDL.Variant({
		Blocked: IDL.Null,
		Friend: IDL.Null
	});
	const WhitelistRights = IDL.Variant({
		Read: IDL.Null,
		ReadWrite: IDL.Null,
		Owner: IDL.Null
	});
	const Result_2 = IDL.Variant({ Ok: IDL.Bool, Err: ApiError });
	const PostWallet = IDL.Record({
		principal: IDL.Principal,
		provider: IDL.Text
	});
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
		skills: IDL.Vec(IDL.Nat32)
	});
	const Result_3 = IDL.Variant({ Ok: ApplicationRole, Err: ApiError });
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
	const Result_4 = IDL.Variant({ Ok: Metadata, Err: ApiError });
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
	const Result_5 = IDL.Variant({ Ok: PagedResponse, Err: ApiError });
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
		application_role: ApplicationRole
	});
	const Result_6 = IDL.Variant({ Ok: IDL.Null, Err: IDL.Null });
	return IDL.Service({
		accept_cycles: IDL.Func([], [IDL.Nat64], []),
		add_entry_by_parent: IDL.Func([IDL.Opt(IDL.Principal), IDL.Vec(IDL.Nat8)], [Result], []),
		add_member_to_profile: IDL.Func(
			[IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Principal))],
			[IDL.Vec(IDL.Text)],
			[]
		),
		add_profile: IDL.Func([PostProfile, IDL.Principal], [Result_1], []),
		add_relation: IDL.Func([IDL.Principal, RelationType], [Result_1], []),
		add_starred: IDL.Func([IDL.Principal], [Result_1], []),
		add_to_whitelist: IDL.Func([IDL.Text, IDL.Principal, WhitelistRights], [Result_2], []),
		add_wallet: IDL.Func([PostWallet], [Result_1], []),
		approve_code_of_conduct: IDL.Func([IDL.Nat64], [Result_2], []),
		edit_application_role: IDL.Func([IDL.Principal, ApplicationRole], [Result_1], []),
		edit_profile: IDL.Func([UpdateProfile], [Result_1], []),
		get_application_role: IDL.Func([], [Result_3], ['query']),
		get_metadata: IDL.Func([], [Result_4], ['query']),
		get_profile_by_identifier: IDL.Func([IDL.Principal], [Result_1], []),
		get_profile_by_user_principal: IDL.Func([IDL.Principal], [Result_1], []),
		get_profiles_by_identifier: IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Vec(ProfileResponse)], []),
		get_profiles_by_user_principal: IDL.Func(
			[IDL.Vec(IDL.Principal)],
			[IDL.Vec(ProfileResponse)],
			[]
		),
		get_relations: IDL.Func([RelationType], [IDL.Vec(IDL.Principal)], ['query']),
		get_starred_events: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
		get_starred_groups: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
		get_starred_tasks: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
		get_whitelist: IDL.Func([IDL.Nat64, IDL.Nat64], [Result_5], ['query']),
		http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
		migration_add_profiles: IDL.Func([IDL.Vec(Profile)], [], []),
		migration_get_profiles: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Principal, Profile))], ['query']),
		remove_from_whitelist: IDL.Func([IDL.Principal], [Result_2], []),
		remove_relation: IDL.Func([IDL.Principal], [Result_1], []),
		remove_starred: IDL.Func([IDL.Principal], [Result_1], []),
		remove_wallet: IDL.Func([IDL.Principal], [Result_1], []),
		sanity_check: IDL.Func([], [IDL.Text], ['query']),
		set_wallet_as_primary: IDL.Func([IDL.Principal], [Result_6], []),
		wipe_data: IDL.Func([], [IDL.Bool], [])
	});
};
