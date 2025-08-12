// Define the possible sources for the resource ID
export type IdSourceType = 'user' | 'student' | 'instructor';
export type IdTypeType = 'param' | 'query' | 'body';
export interface idSourceConfigItf {
  idSource: IdSourceType;
  idType: IdTypeType;
  queryParamName?: string;
}

// TODO: make resource hat have IdSourceType id
export type OwnableResource = { [key: string]: any };

export interface OwnableService {
  findById(id: string): Promise<OwnableResource>;
}

// Define keys for individual metadata
export const OWNER_SERVICE_KEY = 'ownerService';
export const ID_SOURCE_CONFIG_KEY = 'idSourceConfig';
export const IS_ADMIN_BYPASS_ENABLED_KEY = 'isAdminBypassEnabled';
