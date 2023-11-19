import { Context } from './context';
import { ExclusiveKeys, MaybePromise } from './core/helpers/util';
import { MiddlewareFn } from './middleware';
export interface SyncSessionStore<T> {
    get: (name: string) => T | undefined;
    set: (name: string, value: T) => void;
    delete: (name: string) => void;
}
export interface AsyncSessionStore<T> {
    get: (name: string) => Promise<T | undefined>;
    set: (name: string, value: T) => Promise<unknown>;
    delete: (name: string) => Promise<unknown>;
}
export type SessionStore<T> = SyncSessionStore<T> | AsyncSessionStore<T>;
interface SessionOptions<S, C extends Context, P extends string> {
    /** Customise the session prop. Defaults to "session" and is available as ctx.session. */
    property?: P;
    getSessionKey?: (ctx: C) => MaybePromise<string | undefined>;
    store?: SessionStore<S>;
    defaultSession?: (ctx: C) => S;
}
/** @deprecated session can use custom properties now. Construct this type directly. */
export interface SessionContext<S extends object> extends Context {
    session?: S;
}
/**
 * Returns middleware that adds `ctx.session` for storing arbitrary state per session key.
 *
 * The default `getSessionKey` is `${ctx.from.id}:${ctx.chat.id}`.
 * If either `ctx.from` or `ctx.chat` is `undefined`, default session key and thus `ctx.session` are also `undefined`.
 *
 * > ⚠️ Session data is kept only in memory by default,  which means that all data will be lost when the process is terminated.
 * >
 * > If you want to persist data across process restarts, or share it among multiple instances, you should use
 * [@telegraf/session](https://www.npmjs.com/package/@telegraf/session), or pass custom `storage`.
 *
 * @see {@link https://github.com/feathers-studio/telegraf-docs/blob/b694bcc36b4f71fb1cd650a345c2009ab4d2a2a5/guide/session.md Telegraf Docs | Session}
 * @see {@link https://github.com/feathers-studio/telegraf-docs/blob/master/examples/session-bot.ts Example}
 */
export declare function session<S extends NonNullable<C[P]>, C extends Context & {
    [key in P]?: C[P];
}, P extends (ExclusiveKeys<C, Context> & string) | 'session' = 'session'>(options?: SessionOptions<S, C, P>): MiddlewareFn<C>;
/** @deprecated Use `Map` */
export declare class MemorySessionStore<T> implements SyncSessionStore<T> {
    private readonly ttl;
    private readonly store;
    constructor(ttl?: number);
    get(name: string): T | undefined;
    set(name: string, value: T): void;
    delete(name: string): void;
}
/** @deprecated session can use custom properties now. Directly use `'session' in ctx` instead */
export declare function isSessionContext<S extends object>(ctx: Context): ctx is SessionContext<S>;
export {};
//# sourceMappingURL=session.d.ts.map