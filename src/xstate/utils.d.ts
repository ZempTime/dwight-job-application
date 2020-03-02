import { Event, StateValue, ActionType, Action, EventObject, PropertyMapper, Mapper, EventType, HistoryValue, AssignAction, Condition, Guard, Subscribable, StateMachine, ConditionPredicate, SCXML, StateLike, EventData, TransitionConfig, TransitionConfigTargetShortcut, NullEvent, SingleOrArray } from './types';
import { StateNode } from './StateNode';
import { State } from '.';
import { Actor } from './Actor';
export declare function keys<T extends object>(value: T): Array<keyof T & string>;
export declare function matchesState(parentStateId: StateValue, childStateId: StateValue, delimiter?: string): boolean;
export declare function getEventType<TEvent extends EventObject = EventObject>(event: Event<TEvent>): TEvent['type'];
export declare function getActionType(action: Action<any, any>): ActionType;
export declare function toStatePath(stateId: string | string[], delimiter: string): string[];
export declare function isStateLike(state: any): state is StateLike<any>;
export declare function toStateValue(stateValue: StateLike<any> | StateValue | string[], delimiter: string): StateValue;
export declare function pathToStateValue(statePath: string[]): StateValue;
export declare function mapValues<T, P>(collection: {
    [key: string]: T;
}, iteratee: (item: T, key: string, collection: {
    [key: string]: T;
}, i: number) => P): {
    [key: string]: P;
};
export declare function mapFilterValues<T, P>(collection: {
    [key: string]: T;
}, iteratee: (item: T, key: string, collection: {
    [key: string]: T;
}) => P, predicate: (item: T) => boolean): {
    [key: string]: P;
};
/**
 * Retrieves a value at the given path.
 * @param props The deep path to the prop of the desired value
 */
export declare const path: <T extends Record<string, any>>(props: string[]) => any;
/**
 * Retrieves a value at the given path via the nested accessor prop.
 * @param props The deep path to the prop of the desired value
 */
export declare function nestedPath<T extends Record<string, any>>(props: string[], accessorProp: keyof T): (object: T) => T;
export declare function toStatePaths(stateValue: StateValue | undefined): string[][];
export declare function pathsToStateValue(paths: string[][]): StateValue;
export declare function flatten<T>(array: Array<T | T[]>): T[];
export declare function toArrayStrict<T>(value: T[] | T): T[];
export declare function toArray<T>(value: T[] | T | undefined): T[];
export declare function mapContext<TContext, TEvent extends EventObject>(mapper: Mapper<TContext, TEvent> | PropertyMapper<TContext, TEvent>, context: TContext, _event: SCXML.Event<TEvent>): any;
export declare function isBuiltInEvent(eventType: EventType): boolean;
export declare function isPromiseLike(value: any): value is PromiseLike<any>;
export declare function partition<T, A extends T, B extends T>(items: T[], predicate: (item: T) => item is A): [A[], B[]];
export declare function updateHistoryStates(hist: HistoryValue, stateValue: StateValue): Record<string, HistoryValue | undefined>;
export declare function updateHistoryValue(hist: HistoryValue, stateValue: StateValue): HistoryValue;
export declare function updateContext<TContext, TEvent extends EventObject>(context: TContext, _event: SCXML.Event<TEvent>, assignActions: Array<AssignAction<TContext, TEvent>>, state?: State<TContext, TEvent>): TContext;
declare let warn: (condition: boolean | Error, message: string) => void;
export { warn };
export declare function isArray(value: any): value is any[];
export declare function isFunction(value: any): value is Function;
export declare function isString(value: any): value is string;
export declare function toGuard<TContext, TEvent extends EventObject>(condition?: Condition<TContext, TEvent>, guardMap?: Record<string, ConditionPredicate<TContext, TEvent>>): Guard<TContext, TEvent> | undefined;
export declare function isObservable<T>(value: Subscribable<T> | any): value is Subscribable<T>;
export declare const symbolObservable: string | symbol;
export declare function isMachine(value: any): value is StateMachine<any, any, any>;
export declare function isActor(value: any): value is Actor;
export declare const uniqueId: () => string;
export declare function toEventObject<TEvent extends EventObject>(event: Event<TEvent>, payload?: EventData): TEvent;
export declare function toSCXMLEvent<TEvent extends EventObject>(event: Event<TEvent> | SCXML.Event<TEvent>, scxmlEvent?: Partial<SCXML.Event<TEvent>>): SCXML.Event<TEvent>;
export declare function toTransitionConfigArray<TContext, TEvent extends EventObject>(event: TEvent['type'] | NullEvent['type'] | '*', configLike: SingleOrArray<TransitionConfig<TContext, TEvent> | TransitionConfigTargetShortcut<TContext, TEvent>>): Array<TransitionConfig<TContext, TEvent> & {
    event: TEvent['type'] | NullEvent['type'] | '*';
}>;
export declare function normalizeTarget<TContext, TEvent extends EventObject>(target: SingleOrArray<string | StateNode<TContext, any, TEvent>> | undefined): Array<string | StateNode<TContext, any, TEvent>> | undefined;
export declare function reportUnhandledExceptionOnInvocation(originalError: any, currentError: any, id: string): void;
//# sourceMappingURL=utils.d.ts.map