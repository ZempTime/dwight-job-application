import { __spread, __assign, __values, __read } from './_virtual/_tslib.js';
import { keys, flatten } from 'xstate/es/utils'

function toEventObject(event) {
  if (typeof event === 'string' || typeof event === 'number') {
    return {
      type: event
    };
  }

  return event;
}

var EMPTY_MAP = {};
/**
 * Returns all state nodes of the given `node`.
 * @param stateNode State node to recursively get child state nodes from
 */

function getStateNodes(stateNode) {
  var states = stateNode.states;
  var nodes = keys(states).reduce(function (accNodes, stateKey) {
    var childStateNode = states[stateKey];
    var childStateNodes = getStateNodes(childStateNode);
    accNodes.push.apply(accNodes, __spread([childStateNode], childStateNodes));
    return accNodes;
  }, []);
  return nodes;
}

function serializeState(state) {
  var value = state.value,
      context = state.context;
  return context === undefined ? JSON.stringify(value) : JSON.stringify(value) + ' | ' + JSON.stringify(context);
}

function serializeEvent(event) {
  return JSON.stringify(event);
}

function deserializeEventString(eventString) {
  return JSON.parse(eventString);
}

var defaultValueAdjMapOptions = {
  events: {},
  filter: function () {
    return true;
  },
  stateSerializer: serializeState,
  eventSerializer: serializeEvent
};

function getAdjacencyMap(node, options) {
  var e_1, _a;

  var optionsWithDefaults = __assign(__assign({}, defaultValueAdjMapOptions), options);

  var filter = optionsWithDefaults.filter,
      stateSerializer = optionsWithDefaults.stateSerializer,
      eventSerializer = optionsWithDefaults.eventSerializer;
  var events = {};

  try {
    for (var _b = __values(node.events), _c = _b.next(); !_c.done; _c = _b.next()) {
      var event_1 = _c.value;
      events[event_1] = [event_1];
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  Object.assign(events, optionsWithDefaults.events);
  var adjacency = {};

  function findAdjacencies(state) {
    var e_2, _a;

    var nextEvents = state.nextEvents;
    var stateHash = stateSerializer(state);

    if (adjacency[stateHash]) {
      return;
    }

    adjacency[stateHash] = {};
    var potentialEvents = flatten(nextEvents.map(function (nextEvent) {
      return events[nextEvent] || [];
    })).map(function (event) {
      return toEventObject(event);
    });

    try {
      for (var potentialEvents_1 = __values(potentialEvents), potentialEvents_1_1 = potentialEvents_1.next(); !potentialEvents_1_1.done; potentialEvents_1_1 = potentialEvents_1.next()) {
        var event_2 = potentialEvents_1_1.value;
        var nextState = void 0;

        try {
          nextState = node.transition(state, event_2);
        } catch (e) {
          throw new Error("Unable to transition from state " + stateSerializer(state) + " on event " + eventSerializer(event_2) + ": " + e.message);
        }

        if ((!filter || filter(nextState)) && stateHash !== stateSerializer(nextState)) {
          adjacency[stateHash][eventSerializer(event_2)] = {
            state: nextState,
            event: event_2
          };
          findAdjacencies(nextState);
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (potentialEvents_1_1 && !potentialEvents_1_1.done && (_a = potentialEvents_1.return)) _a.call(potentialEvents_1);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  }

  findAdjacencies(node.initialState);
  return adjacency;
}

function getShortestPaths(machine, options) {
  var e_3, _a, e_4, _b;

  if (!machine.states) {
    // return EMPTY_MAP;
    return EMPTY_MAP;
  }

  var optionsWithDefaults = __assign({
    events: {},
    stateSerializer: serializeState,
    eventSerializer: serializeEvent
  }, options);

  var adjacency = getAdjacencyMap(machine, optionsWithDefaults); // weight, state, event

  var weightMap = new Map();
  var stateMap = new Map();
  var initialVertex = optionsWithDefaults.stateSerializer(machine.initialState);
  stateMap.set(initialVertex, machine.initialState);
  weightMap.set(initialVertex, [0, undefined, undefined]);
  var unvisited = new Set();
  var visited = new Set();
  unvisited.add(initialVertex);

  while (unvisited.size > 0) {
    try {
      for (var unvisited_1 = (e_3 = void 0, __values(unvisited)), unvisited_1_1 = unvisited_1.next(); !unvisited_1_1.done; unvisited_1_1 = unvisited_1.next()) {
        var vertex = unvisited_1_1.value;

        var _c = __read(weightMap.get(vertex), 1),
            weight = _c[0];

        try {
          for (var _d = (e_4 = void 0, __values(keys(adjacency[vertex]))), _e = _d.next(); !_e.done; _e = _d.next()) {
            var event_3 = _e.value;
            var nextSegment = adjacency[vertex][event_3];
            var nextVertex = optionsWithDefaults.stateSerializer(nextSegment.state);
            stateMap.set(nextVertex, nextSegment.state);

            if (!weightMap.has(nextVertex)) {
              weightMap.set(nextVertex, [weight + 1, vertex, event_3]);
            } else {
              var _f = __read(weightMap.get(nextVertex), 1),
                  nextWeight = _f[0];

              if (nextWeight > weight + 1) {
                weightMap.set(nextVertex, [weight + 1, vertex, event_3]);
              }
            }

            if (!visited.has(nextVertex)) {
              unvisited.add(nextVertex);
            }
          }
        } catch (e_4_1) {
          e_4 = {
            error: e_4_1
          };
        } finally {
          try {
            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
          } finally {
            if (e_4) throw e_4.error;
          }
        }

        visited.add(vertex);
        unvisited.delete(vertex);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (unvisited_1_1 && !unvisited_1_1.done && (_a = unvisited_1.return)) _a.call(unvisited_1);
      } finally {
        if (e_3) throw e_3.error;
      }
    }
  }

  var statePathMap = {};
  weightMap.forEach(function (_a, stateSerial) {
    var _b = __read(_a, 3),
        weight = _b[0],
        fromState = _b[1],
        fromEvent = _b[2];

    var state = stateMap.get(stateSerial);
    statePathMap[stateSerial] = {
      state: state,
      paths: !fromState ? [{
        state: state,
        segments: [],
        weight: weight
      }] : [{
        state: state,
        segments: statePathMap[fromState].paths[0].segments.concat({
          state: stateMap.get(fromState),
          event: deserializeEventString(fromEvent)
        }),
        weight: weight
      }]
    };
  });
  return statePathMap;
}

function getSimplePaths(machine, options) {
  var e_5, _a;

  var optionsWithDefaults = __assign(__assign({}, defaultValueAdjMapOptions), options);

  var stateSerializer = optionsWithDefaults.stateSerializer;

  if (!machine.states) {
    return EMPTY_MAP;
  } // @ts-ignore - excessively deep


  var adjacency = getAdjacencyMap(machine, optionsWithDefaults);
  var stateMap = new Map();
  var visited = new Set();
  var path = [];
  var paths = {};

  function util(fromState, toStateSerial) {
    var e_6, _a;

    var fromStateSerial = stateSerializer(fromState);
    visited.add(fromStateSerial);

    if (fromStateSerial === toStateSerial) {
      if (!paths[toStateSerial]) {
        paths[toStateSerial] = {
          state: stateMap.get(toStateSerial),
          paths: []
        };
      }

      paths[toStateSerial].paths.push({
        state: fromState,
        weight: path.length,
        segments: __spread(path)
      });
    } else {
      try {
        for (var _b = __values(keys(adjacency[fromStateSerial])), _c = _b.next(); !_c.done; _c = _b.next()) {
          var subEvent = _c.value;
          var nextSegment = adjacency[fromStateSerial][subEvent];

          if (!nextSegment) {
            continue;
          }

          var nextStateSerial = stateSerializer(nextSegment.state);
          stateMap.set(nextStateSerial, nextSegment.state);

          if (!visited.has(nextStateSerial)) {
            path.push({
              state: stateMap.get(fromStateSerial),
              event: deserializeEventString(subEvent)
            });
            util(nextSegment.state, toStateSerial);
          }
        }
      } catch (e_6_1) {
        e_6 = {
          error: e_6_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_6) throw e_6.error;
        }
      }
    }

    path.pop();
    visited.delete(fromStateSerial);
  }

  var initialStateSerial = stateSerializer(machine.initialState);
  stateMap.set(initialStateSerial, machine.initialState);

  try {
    for (var _b = __values(keys(adjacency)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var nextStateSerial = _c.value;
      util(machine.initialState, nextStateSerial);
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

  return paths;
}

export { deserializeEventString, getAdjacencyMap, getShortestPaths, getSimplePaths, getStateNodes, serializeEvent, serializeState, toEventObject };