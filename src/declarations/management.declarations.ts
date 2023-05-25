import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ApiError =
	| { NotFound: ErrorMessage }
	| { ValidationError: Array<ValidationResponse> }
	| { Unauthorized: ErrorMessage }
	| { Unexpected: ErrorMessage }
	| { BadRequest: ErrorMessage };
export interface CanisterStatus {
	status: CanisterStatusKind;
	memory_size: bigint;
	cycles: bigint;
	settings: DefiniteCanisterSettings;
	module_hash: [] | [Uint8Array];
}
export type CanisterStatusKind = { stopped: null } | { stopping: null } | { running: null };
export interface CanisterThresHolds {
	user_controller: bigint;
	report_controller: bigint;
	management_controller: bigint;
	group_management_controller: bigint;
	storage_management_controller: bigint;
	group_controller: bigint;
	storage_controller: bigint;
}
export type Controllers =
	| { UserController: null }
	| { ReportController: null }
	| { GroupController: Principal }
	| { StorageController: Principal }
	| { StorageManagementController: null }
	| { GroupManagementController: null };
export interface DefiniteCanisterSettings {
	freezing_threshold: bigint;
	controllers: Array<Principal>;
	memory_allocation: bigint;
	compute_allocation: bigint;
}
export interface ErrorMessage {
	tag: string;
	message: string;
	location: string;
}
export interface HttpRequest {
	url: string;
	method: string;
	body: Uint8Array;
	headers: Array<[string, string]>;
}
export interface HttpResponse {
	body: Uint8Array;
	headers: Array<[string, string]>;
	status_code: number;
}
export interface KeyValue {
	key: number;
	value: string;
}
export type Result = { Ok: KeyValue } | { Err: ApiError };
export type Result_1 = { Ok: null } | { Err: ApiError };
export type Result_2 = { Ok: Array<KeyValue> } | { Err: ApiError };
export type Result_3 = { Ok: CanisterStatus } | { Err: string };
export type Result_4 = { Ok: string } | { Err: ApiError };
export type Result_5 = { Ok: null } | { Err: string };
export type SetThreshold =
	| { GroupControllerThreshold: bigint }
	| { ReportControllerThreshold: bigint }
	| { GroupManagementControllerThreshold: bigint }
	| { ManagementControllerThresHold: bigint }
	| { UserControllerThreshold: bigint }
	| { StorageControllerThreshold: bigint }
	| { StorageManagementControllerThreshold: bigint };
export interface ValidationResponse {
	field: string;
	message: string;
}
export interface _SERVICE {
	accept_cycles: ActorMethod<[], bigint>;
	add_interest: ActorMethod<[string], Result>;
	add_interests: ActorMethod<[Array<string>], Result_1>;
	add_skill: ActorMethod<[string], Result>;
	add_skills: ActorMethod<[Array<string>], Result_1>;
	add_tag: ActorMethod<[string], Result>;
	add_tags: ActorMethod<[Array<string>], Result_1>;
	get_all_interest: ActorMethod<[], Result_2>;
	get_all_skill: ActorMethod<[], Result_2>;
	get_all_tag: ActorMethod<[], Result_2>;
	get_cycles: ActorMethod<[], bigint>;
	get_environment: ActorMethod<[], string>;
	get_interest: ActorMethod<[number], Result>;
	get_interests: ActorMethod<[Uint32Array], Result_2>;
	get_size: ActorMethod<[], bigint>;
	get_skill: ActorMethod<[number], Result>;
	get_skills: ActorMethod<[Uint32Array], Result_2>;
	get_status: ActorMethod<[Principal], Result_3>;
	get_tag: ActorMethod<[number], Result>;
	get_tags: ActorMethod<[Uint32Array], Result_2>;
	get_thresholds: ActorMethod<[], CanisterThresHolds>;
	get_updated_at: ActorMethod<[], bigint>;
	http_request: ActorMethod<[HttpRequest], HttpResponse>;
	remove_interest: ActorMethod<[string], Result_4>;
	remove_skill: ActorMethod<[string], Result_4>;
	remove_tag: ActorMethod<[string], Result_4>;
	send_cycles: ActorMethod<[Controllers, bigint], Result_5>;
	send_cycles_to_cycles_management_canister: ActorMethod<[bigint], Result_1>;
	set_threshold: ActorMethod<[SetThreshold], Result_1>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const idlFactory = ({ IDL }: any) => {
	const KeyValue = IDL.Record({ key: IDL.Nat32, value: IDL.Text });
	const ErrorMessage = IDL.Record({
		tag: IDL.Text,
		message: IDL.Text,
		location: IDL.Text
	});
	const ValidationResponse = IDL.Record({
		field: IDL.Text,
		message: IDL.Text
	});
	const ApiError = IDL.Variant({
		NotFound: ErrorMessage,
		ValidationError: IDL.Vec(ValidationResponse),
		Unauthorized: ErrorMessage,
		Unexpected: ErrorMessage,
		BadRequest: ErrorMessage
	});
	const Result = IDL.Variant({ Ok: KeyValue, Err: ApiError });
	const Result_1 = IDL.Variant({ Ok: IDL.Null, Err: ApiError });
	const Result_2 = IDL.Variant({ Ok: IDL.Vec(KeyValue), Err: ApiError });
	const CanisterStatusKind = IDL.Variant({
		stopped: IDL.Null,
		stopping: IDL.Null,
		running: IDL.Null
	});
	const DefiniteCanisterSettings = IDL.Record({
		freezing_threshold: IDL.Nat,
		controllers: IDL.Vec(IDL.Principal),
		memory_allocation: IDL.Nat,
		compute_allocation: IDL.Nat
	});
	const CanisterStatus = IDL.Record({
		status: CanisterStatusKind,
		memory_size: IDL.Nat,
		cycles: IDL.Nat,
		settings: DefiniteCanisterSettings,
		module_hash: IDL.Opt(IDL.Vec(IDL.Nat8))
	});
	const Result_3 = IDL.Variant({ Ok: CanisterStatus, Err: IDL.Text });
	const CanisterThresHolds = IDL.Record({
		user_controller: IDL.Nat64,
		report_controller: IDL.Nat64,
		management_controller: IDL.Nat64,
		group_management_controller: IDL.Nat64,
		storage_management_controller: IDL.Nat64,
		group_controller: IDL.Nat64,
		storage_controller: IDL.Nat64
	});
	const HttpRequest = IDL.Record({
		url: IDL.Text,
		method: IDL.Text,
		body: IDL.Vec(IDL.Nat8),
		headers: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))
	});
	const HttpResponse = IDL.Record({
		body: IDL.Vec(IDL.Nat8),
		headers: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
		status_code: IDL.Nat16
	});
	const Result_4 = IDL.Variant({ Ok: IDL.Text, Err: ApiError });
	const Controllers = IDL.Variant({
		UserController: IDL.Null,
		ReportController: IDL.Null,
		GroupController: IDL.Principal,
		StorageController: IDL.Principal,
		StorageManagementController: IDL.Null,
		GroupManagementController: IDL.Null
	});
	const Result_5 = IDL.Variant({ Ok: IDL.Null, Err: IDL.Text });
	const SetThreshold = IDL.Variant({
		GroupControllerThreshold: IDL.Nat64,
		ReportControllerThreshold: IDL.Nat64,
		GroupManagementControllerThreshold: IDL.Nat64,
		ManagementControllerThresHold: IDL.Nat64,
		UserControllerThreshold: IDL.Nat64,
		StorageControllerThreshold: IDL.Nat64,
		StorageManagementControllerThreshold: IDL.Nat64
	});
	return IDL.Service({
		accept_cycles: IDL.Func([], [IDL.Nat64], []),
		add_interest: IDL.Func([IDL.Text], [Result], []),
		add_interests: IDL.Func([IDL.Vec(IDL.Text)], [Result_1], []),
		add_skill: IDL.Func([IDL.Text], [Result], []),
		add_skills: IDL.Func([IDL.Vec(IDL.Text)], [Result_1], []),
		add_tag: IDL.Func([IDL.Text], [Result], []),
		add_tags: IDL.Func([IDL.Vec(IDL.Text)], [Result_1], []),
		get_all_interest: IDL.Func([], [Result_2], ['query']),
		get_all_skill: IDL.Func([], [Result_2], ['query']),
		get_all_tag: IDL.Func([], [Result_2], ['query']),
		get_cycles: IDL.Func([], [IDL.Nat64], ['query']),
		get_environment: IDL.Func([], [IDL.Text], ['query']),
		get_interest: IDL.Func([IDL.Nat32], [Result], ['query']),
		get_interests: IDL.Func([IDL.Vec(IDL.Nat32)], [Result_2], ['query']),
		get_size: IDL.Func([], [IDL.Nat64], ['query']),
		get_skill: IDL.Func([IDL.Nat32], [Result], ['query']),
		get_skills: IDL.Func([IDL.Vec(IDL.Nat32)], [Result_2], ['query']),
		get_status: IDL.Func([IDL.Principal], [Result_3], []),
		get_tag: IDL.Func([IDL.Nat32], [Result], ['query']),
		get_tags: IDL.Func([IDL.Vec(IDL.Nat32)], [Result_2], ['query']),
		get_thresholds: IDL.Func([], [CanisterThresHolds], ['query']),
		get_updated_at: IDL.Func([], [IDL.Nat64], ['query']),
		http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
		remove_interest: IDL.Func([IDL.Text], [Result_4], []),
		remove_skill: IDL.Func([IDL.Text], [Result_4], []),
		remove_tag: IDL.Func([IDL.Text], [Result_4], []),
		send_cycles: IDL.Func([Controllers, IDL.Nat64], [Result_5], []),
		send_cycles_to_cycles_management_canister: IDL.Func([IDL.Nat64], [Result_1], []),
		set_threshold: IDL.Func([SetThreshold], [Result_1], [])
	});
};
