import { StateNode, State, DefaultContext, Event, EventObject, StateMachine, AnyEventObject } from 'xstate';
import { StatePathsMap, StatePaths, AdjacencyMap, ValueAdjMapOptions } from './types';
export declare function toEventObject<TEvent extends EventObject>(event: Event<TEvent>): TEvent;
/**
 * Returns all state nodes of the given `node`.
 * @param stateNode State node to recursively get child state nodes from
 */
export declare function getStateNodes(stateNode: StateNode | StateMachine<any, any, any>): StateNode[];
export declare function serializeState<TContext>(state: State<TContext, any>): string;
export declare function serializeEvent<TEvent extends EventObject>(event: TEvent): string;
export declare function deserializeEventString<TEvent extends EventObject>(eventString: string): TEvent;
export declare function getAdjacencyMap<TContext = DefaultContext, TEvent extends EventObject = AnyEventObject>(node: StateNode<TContext, any, TEvent> | StateMachine<TContext, any, TEvent>, options?: Partial<ValueAdjMapOptions<TContext, TEvent>>): AdjacencyMap<TContext, TEvent>;
export declare function getShortestPaths<TContext = DefaultContext, TEvent extends EventObject = EventObject>(machine: StateMachine<TContext, any, TEvent>, options?: Partial<ValueAdjMapOptions<TContext, TEvent>>): StatePathsMap<TContext, TEvent>;
export declare function getSimplePaths<TContext = DefaultContext, TEvent extends EventObject = EventObject>(machine: StateMachine<TContext, any, TEvent>, options?: Partial<ValueAdjMapOptions<TContext, TEvent>>): StatePathsMap<TContext, TEvent>;
export declare function getSimplePathsAsArray<TContext = DefaultContext, TEvent extends EventObject = EventObject>(machine: StateNode<TContext, any, TEvent>, options?: ValueAdjMapOptions<TContext, TEvent>): Array<StatePaths<TContext, TEvent>>;
//# sourceMappingURL=graph.d.ts.map