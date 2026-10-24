import { DnsQueryEntity } from './entity/DnsQueryEntity';
import { DomainEntity } from './entity/DomainEntity';
import { EmailEntity } from './entity/EmailEntity';
import { ListEntity } from './entity/ListEntity';
import { ResolveEntity } from './entity/ResolveEntity';
import { V2nEntity } from './entity/V2nEntity';
import { V3nEntity } from './entity/V3nEntity';
export type * from './ThrowawayEmailTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ThrowawayEmailEntityBase } from './ThrowawayEmailEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class ThrowawayEmailSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    DnsQuery(entopts?: Record<string, any>): DnsQueryEntity;
    Domain(entopts?: Record<string, any>): DomainEntity;
    Email(entopts?: Record<string, any>): EmailEntity;
    List(entopts?: Record<string, any>): ListEntity;
    Resolve(entopts?: Record<string, any>): ResolveEntity;
    V2n(entopts?: Record<string, any>): V2nEntity;
    V3n(entopts?: Record<string, any>): V3nEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ThrowawayEmailSDK;
    tester(testopts?: any, sdkopts?: any): ThrowawayEmailSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ThrowawayEmailSDK;
export { stdutil, config, BaseFeature, ThrowawayEmailEntityBase, ThrowawayEmailSDK, SDK, };
export type { DirectResult };
