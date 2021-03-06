import { __assign, __values, __awaiter, __generator, __rest } from './_virtual/_tslib.js';
import { getShortestPaths, getSimplePaths, getStateNodes } from '../../xstate-graph/es';
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

 const slimChalk = (_color, msg) => msg

var TestModel =
/*#__PURE__*/

/** @class */
function () {
  function TestModel(machine, options) {
    this.machine = machine;
    this.coverage = {
      stateNodes: new Map(),
      transitions: new Map()
    };
    this.options = __assign(__assign({}, TestModel.defaultOptions), options);
  }

  TestModel.prototype.getShortestPathPlans = function (options) {
    var shortestPaths = getShortestPaths(this.machine, __assign(__assign({}, options), {
      events: getEventSamples(this.options.events)
    }));
    return this.getTestPlans(shortestPaths);
  };

  TestModel.prototype.getShortestPathPlansTo = function (stateValue) {
    var e_1, _a;

    var minWeight = Infinity;
    var shortestPlans = [];
    var plans = this.filterPathsTo(stateValue, this.getShortestPathPlans());

    try {
      for (var plans_1 = __values(plans), plans_1_1 = plans_1.next(); !plans_1_1.done; plans_1_1 = plans_1.next()) {
        var plan = plans_1_1.value;
        var currWeight = plan.paths[0].weight;

        if (currWeight < minWeight) {
          minWeight = currWeight;
          shortestPlans = [plan];
        } else if (currWeight === minWeight) {
          shortestPlans.push(plan);
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (plans_1_1 && !plans_1_1.done && (_a = plans_1.return)) _a.call(plans_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return shortestPlans;
  };

  TestModel.prototype.filterPathsTo = function (stateValue, testPlans) {
    var predicate = typeof stateValue === 'function' ? function (plan) {
      return stateValue(plan.state);
    } : function (plan) {
      return plan.state.matches(stateValue);
    };
    return testPlans.filter(predicate);
  };

  TestModel.prototype.getSimplePathPlans = function (options) {
    var simplePaths = getSimplePaths(this.machine, __assign(__assign({}, options), {
      events: getEventSamples(this.options.events)
    }));
    return this.getTestPlans(simplePaths);
  };

  TestModel.prototype.getSimplePathPlansTo = function (stateValue) {
    return this.filterPathsTo(stateValue, this.getSimplePathPlans());
  };

  TestModel.prototype.getTestPlans = function (statePathsMap) {
    var _this = this;

    return Object.keys(statePathsMap).map(function (key) {
      var testPlan = statePathsMap[key];
      var paths = testPlan.paths.map(function (path) {
        var segments = path.segments.map(function (segment) {
          return __assign(__assign({}, segment), {
            description: getDescription(segment.state),
            test: function (testContext) {
              return _this.testState(segment.state, testContext);
            },
            exec: function (testContext) {
              return _this.executeEvent(segment.event, testContext);
            }
          });
        });

        function formatEvent(event) {
          var type = event.type,
              other = __rest(event, ["type"]);

          var propertyString = Object.keys(other).length ? " (" + JSON.stringify(other) + ")" : '';
          return "" + type + propertyString;
        }

        var eventsString = path.segments.map(function (s) {
          return formatEvent(s.event);
        }).join(' → ');
        return __assign(__assign({}, path), {
          segments: segments,
          description: "via " + eventsString,
          test: function (testContext) {
            return __awaiter(_this, void 0, void 0, function () {
              var testPathResult, segments_1, segments_1_1, segment, testSegmentResult, err_1, err_2, e_2_1, err_3, err_4, targetStateString, hasFailed_1;

              var e_2, _a;

              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    testPathResult = {
                      segments: [],
                      state: {
                        error: null
                      }
                    };
                    _b.label = 1;

                  case 1:
                    _b.trys.push([1, 18,, 19]);

                    _b.label = 2;

                  case 2:
                    _b.trys.push([2, 12, 13, 14]);

                    segments_1 = __values(segments), segments_1_1 = segments_1.next();
                    _b.label = 3;

                  case 3:
                    if (!!segments_1_1.done) return [3
                    /*break*/
                    , 11];
                    segment = segments_1_1.value;
                    testSegmentResult = {
                      segment: segment,
                      state: {
                        error: null
                      },
                      event: {
                        error: null
                      }
                    };
                    testPathResult.segments.push(testSegmentResult);
                    _b.label = 4;

                  case 4:
                    _b.trys.push([4, 6,, 7]);

                    return [4
                    /*yield*/
                    , segment.test(testContext)];

                  case 5:
                    _b.sent();

                    return [3
                    /*break*/
                    , 7];

                  case 6:
                    err_1 = _b.sent();
                    testSegmentResult.state.error = err_1;
                    throw err_1;

                  case 7:
                    _b.trys.push([7, 9,, 10]);

                    return [4
                    /*yield*/
                    , segment.exec(testContext)];

                  case 8:
                    _b.sent();

                    return [3
                    /*break*/
                    , 10];

                  case 9:
                    err_2 = _b.sent();
                    testSegmentResult.event.error = err_2;
                    throw err_2;

                  case 10:
                    segments_1_1 = segments_1.next();
                    return [3
                    /*break*/
                    , 3];

                  case 11:
                    return [3
                    /*break*/
                    , 14];

                  case 12:
                    e_2_1 = _b.sent();
                    e_2 = {
                      error: e_2_1
                    };
                    return [3
                    /*break*/
                    , 14];

                  case 13:
                    try {
                      if (segments_1_1 && !segments_1_1.done && (_a = segments_1.return)) _a.call(segments_1);
                    } finally {
                      if (e_2) throw e_2.error;
                    }

                    return [7
                    /*endfinally*/
                    ];

                  case 14:
                    _b.trys.push([14, 16,, 17]);

                    return [4
                    /*yield*/
                    , this.testState(testPlan.state, testContext)];

                  case 15:
                    _b.sent();

                    return [3
                    /*break*/
                    , 17];

                  case 16:
                    err_3 = _b.sent();
                    testPathResult.state.error = err_3;
                    throw err_3;

                  case 17:
                    return [3
                    /*break*/
                    , 19];

                  case 18:
                    err_4 = _b.sent();
                    targetStateString = JSON.stringify(path.state.value) + " " + (path.state.context === undefined ? '' : JSON.stringify(path.state.context));
                    hasFailed_1 = false;
                    err_4.message += '\nPath:\n' + testPathResult.segments.map(function (s) {
                      var stateString = JSON.stringify(s.segment.state.value) + " " + (s.segment.state.context === undefined ? '' : JSON.stringify(s.segment.state.context));
                      var eventString = "" + JSON.stringify(s.segment.event);
                      var stateResult = "\tState: " + (hasFailed_1 ? slimChalk('gray', stateString) : s.state.error ? (hasFailed_1 = true, slimChalk('redBright', stateString)) : slimChalk('greenBright', stateString));
                      var eventResult = "\tEvent: " + (hasFailed_1 ? slimChalk('gray', eventString) : s.event.error ? (hasFailed_1 = true, slimChalk('red', eventString)) : slimChalk('green', eventString));
                      return [stateResult, eventResult].join('\n');
                    }).concat("\tState: " + (hasFailed_1 ? slimChalk('gray', targetStateString) : testPathResult.state.error ? slimChalk('red', targetStateString) : slimChalk('green', targetStateString))).join('\n\n');
                    throw err_4;

                  case 19:
                    return [2
                    /*return*/
                    , testPathResult];
                }
              });
            });
          }
        });
      });
      return __assign(__assign({}, testPlan), {
        test: function (testContext) {
          return __awaiter(_this, void 0, void 0, function () {
            var paths_1, paths_1_1, path, e_3_1;

            var e_3, _a;

            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  _b.trys.push([0, 5, 6, 7]);

                  paths_1 = __values(paths), paths_1_1 = paths_1.next();
                  _b.label = 1;

                case 1:
                  if (!!paths_1_1.done) return [3
                  /*break*/
                  , 4];
                  path = paths_1_1.value;
                  return [4
                  /*yield*/
                  , path.test(testContext)];

                case 2:
                  _b.sent();

                  _b.label = 3;

                case 3:
                  paths_1_1 = paths_1.next();
                  return [3
                  /*break*/
                  , 1];

                case 4:
                  return [3
                  /*break*/
                  , 7];

                case 5:
                  e_3_1 = _b.sent();
                  e_3 = {
                    error: e_3_1
                  };
                  return [3
                  /*break*/
                  , 7];

                case 6:
                  try {
                    if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                  } finally {
                    if (e_3) throw e_3.error;
                  }

                  return [7
                  /*endfinally*/
                  ];

                case 7:
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        },
        description: "reaches " + getDescription(testPlan.state),
        paths: paths
      });
    });
  };

  TestModel.prototype.testState = function (state, testContext) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, _b, id, stateNodeMeta, e_4_1;

      var e_4, _c;

      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 5, 6, 7]);

            _a = __values(Object.keys(state.meta)), _b = _a.next();
            _d.label = 1;

          case 1:
            if (!!_b.done) return [3
            /*break*/
            , 4];
            id = _b.value;
            stateNodeMeta = state.meta[id];
            if (!(typeof stateNodeMeta.test === 'function' && !stateNodeMeta.skip)) return [3
            /*break*/
            , 3];
            this.coverage.stateNodes.set(id, (this.coverage.stateNodes.get(id) || 0) + 1);
            return [4
            /*yield*/
            , stateNodeMeta.test(testContext, state)];

          case 2:
            _d.sent();

            _d.label = 3;

          case 3:
            _b = _a.next();
            return [3
            /*break*/
            , 1];

          case 4:
            return [3
            /*break*/
            , 7];

          case 5:
            e_4_1 = _d.sent();
            e_4 = {
              error: e_4_1
            };
            return [3
            /*break*/
            , 7];

          case 6:
            try {
              if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            } finally {
              if (e_4) throw e_4.error;
            }

            return [7
            /*endfinally*/
            ];

          case 7:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  TestModel.prototype.getEventExecutor = function (event) {
    var testEvent = this.options.events[event.type];

    if (!testEvent) {
      // tslint:disable-next-line:no-console
      console.warn("Missing config for event \"" + event.type + "\".");
      return undefined;
    }

    if (typeof testEvent === 'function') {
      return testEvent;
    }

    return testEvent.exec;
  };

  TestModel.prototype.executeEvent = function (event, testContext) {
    return __awaiter(this, void 0, void 0, function () {
      var executor;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            executor = this.getEventExecutor(event);
            if (!executor) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , executor(testContext, event)];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  TestModel.prototype.getCoverage = function (options) {
    var e_5, _a;

    var filter = options ? options.filter : undefined;
    var stateNodes = getStateNodes(this.machine);
    var filteredStateNodes = filter ? stateNodes.filter(filter) : stateNodes;
    var coverage = {
      stateNodes: filteredStateNodes.reduce(function (acc, stateNode) {
        acc[stateNode.id] = 0;
        return acc;
      }, {})
    };

    try {
      for (var _b = __values(this.coverage.stateNodes.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var key = _c.value;
        coverage.stateNodes[key] = this.coverage.stateNodes.get(key);
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_5) throw e_5.error;
      }
    }

    return coverage;
  };

  TestModel.prototype.testCoverage = function (options) {
    var coverage = this.getCoverage(options);
    var missingStateNodes = Object.keys(coverage.stateNodes).filter(function (id) {
      return !coverage.stateNodes[id];
    });

    if (missingStateNodes.length) {
      throw new Error('Missing coverage for state nodes:\n' + missingStateNodes.map(function (id) {
        return "\t" + id;
      }).join('\n'));
    }
  };

  TestModel.prototype.withEvents = function (eventMap) {
    return new TestModel(this.machine, {
      events: eventMap
    });
  };

  TestModel.defaultOptions = {
    events: {}
  };
  return TestModel;
}();

function getDescription(state) {
  var contextString = state.context === undefined ? '' : "(" + JSON.stringify(state.context) + ")";
  var stateStrings = state.configuration.filter(function (sn) {
    return sn.type === 'atomic';
  }).map(function (_a) {
    var id = _a.id;
    var meta = state.meta[id];

    if (!meta) {
      return "\"#" + id + "\"";
    }

    var description = meta.description;

    if (typeof description === 'function') {
      return description(state);
    }

    return description ? "\"" + description + "\"" : JSON.stringify(state.value);
  });
  return "state" + (stateStrings.length === 1 ? '' : 's') + ": " + stateStrings.join(', ') + (" " + contextString);
}

function getEventSamples(eventsOptions) {
  var result = {};
  Object.keys(eventsOptions).forEach(function (key) {
    var eventConfig = eventsOptions[key];

    if (typeof eventConfig === 'function') {
      return [{
        type: key
      }];
    }

    result[key] = eventConfig.cases ? eventConfig.cases.map(function (sample) {
      return __assign({
        type: key
      }, sample);
    }) : [{
      type: key
    }];
  });
  return result;
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


function createModel(machine, options) {
  return new TestModel(machine, options);
}

export { TestModel, createModel };