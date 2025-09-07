export type IdSourceType = 'user' | 'student' | 'instructor';
export type IdTypeType = 'param' | 'query' | 'body';
export interface idSourceConfigItf {
    idSource: IdSourceType;
    idType: IdTypeType;
    queryParamName?: string;
}
export type OwnableResource = {
    [key: string]: any;
};
export interface OwnableService {
    findById(id: string): Promise<OwnableResource>;
}
export declare const OWNER_SERVICE_KEY = "ownerService";
export declare const ID_SOURCE_CONFIG_KEY = "idSourceConfig";
export declare const IS_ADMIN_BYPASS_ENABLED_KEY = "isAdminBypassEnabled";
