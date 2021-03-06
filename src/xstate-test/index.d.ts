import { StatePathsMap, ValueAdjMapOptions } from '@xstate/graph';
import { StateMachine, EventObject, State, StateValue } from 'xstate';
import { TestModelCoverage, TestModelOptions, TestPlan, StatePredicate, EventExecutor, CoverageOptions } from './types';
/**
 * Creates a test model that represents an abstract model of a
 * system under test (SUT).
 *
 * The test model is used to generate test plans, which are used to
 * verify that states in the `machine` are reachable in the SUT.
 *
 * @example
 *
 * ```js
 * const toggleModel = createModel(toggleMachine).withEvents({
 *   TOGGLE: {
 *     exec: async page => {
 *       await page.click('input');
 *     }
 *   }
 * });
 * ```
 *
 */
export declare class TestModel<TTestContext, TContext> {
    machine: StateMachine<TContext, any, any>;
    coverage: TestModelCoverage;
    options: TestModelOptions<TTestContext>;
    static defaultOptions: TestModelOptions<any>;
    constructor(machine: StateMachine<TContext, any, any>, options?: Partial<TestModelOptions<TTestContext>>);
    getShortestPathPlans(options?: Partial<ValueAdjMapOptions<TContext, any>>): Array<TestPlan<TTestContext, TContext>>;
    getShortestPathPlansTo(stateValue: StateValue | StatePredicate<TContext>): Array<TestPlan<TTestContext, TContext>>;
    private filterPathsTo;
    getSimplePathPlans(options?: Partial<ValueAdjMapOptions<TContext, any>>): Array<TestPlan<TTestContext, TContext>>;
    getSimplePathPlansTo(stateValue: StateValue | StatePredicate<TContext>): Array<TestPlan<TTestContext, TContext>>;
    getTestPlans(statePathsMap: StatePathsMap<TContext, any>): Array<TestPlan<TTestContext, TContext>>;
    testState(state: State<TContext, any>, testContext: TTestContext): Promise<void>;
    getEventExecutor(event: EventObject): EventExecutor<TTestContext> | undefined;
    executeEvent(event: EventObject, testContext: TTestContext): Promise<void>;
    getCoverage(options?: CoverageOptions<TContext>): {
        stateNodes: Record<string, number>;
    };
    testCoverage(options?: CoverageOptions<TContext>): void;
    withEvents(eventMap: TestModelOptions<TTestContext>['events']): TestModel<TTestContext, TContext>;
}
/**
 * Creates a test model that represents an abstract model of a
 * system under test (SUT).
 *
 * The test model is used to generate test plans, which are used to
 * verify that states in the `machine` are reachable in the SUT.
 *
 * @example
 *
 * ```js
 * const toggleModel = createModel(toggleMachine).withEvents({
 *   TOGGLE: {
 *     exec: async page => {
 *       await page.click('input');
 *     }
 *   }
 * });
 * ```
 *
 * @param machine The state machine used to represent the abstract model.
 * @param options Options for the created test model:
 * - `events`: an object mapping string event types (e.g., `SUBMIT`)
 * to an event test config (e.g., `{exec: () => {...}, cases: [...]}`)
 */
export declare function createModel<TestContext, TContext = any>(machine: StateMachine<TContext, any, any>, options?: TestModelOptions<TestContext>): TestModel<TestContext, TContext>;
//# sourceMappingURL=index.d.ts.map