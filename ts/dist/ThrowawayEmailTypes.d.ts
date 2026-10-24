export interface DnsQuery {
}
export interface DnsQueryLoadMatch {
    dns: string;
}
export interface DnsQueryCreateData {
    $body?: Uint8Array | ArrayBuffer | Blob | ReadableStream | AsyncIterable<Uint8Array> | string;
}
export interface Domain {
    id?: string;
    isDisposable?: boolean;
    success?: boolean;
}
export interface DomainLoadMatch {
    id: string;
}
export interface Email {
    id?: string;
    isDisposable?: boolean;
    success?: boolean;
}
export interface EmailLoadMatch {
    id: string;
}
export interface List {
}
export interface ListLoadMatch {
}
export interface ListListMatch {
}
export interface Resolve {
}
export interface ResolveLoadMatch {
    cd?: boolean;
    do?: boolean;
    name: string;
    type?: string;
}
export interface V2n {
    isDisposable?: boolean;
    success?: boolean;
}
export interface V2nLoadMatch {
    subject: string;
}
export interface V3n {
    records?: Record<string, any>;
    success: boolean;
    traits: any[];
}
export interface V3nLoadMatch {
    subject: string;
}
