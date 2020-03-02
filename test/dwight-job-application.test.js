import { html, fixture, expect } from "@open-wc/testing";
import { Machine } from "xstate/es";
import { createModel } from "../src/xstate-test/es";

import "../dwight-job-application.js";

const dwightMachine = Machine({
  id: "dwight",
  initial: "intro",
  states: {
    intro: {
      on: {
        APPLY_NOW: "loyalty",
        APPLY_LATER: "weakness"
      },
      meta: {
        test: async ({ el, expect }) => {
          expect(el.state.context.currentStep).to.equal("intro");
        }
      }
    },
    weakness: {
      on: {
        SORRY: "intro"
      },
      meta: {
        test: async ({ el, expect }) => {
          expect(el.state.context.currentStep).to.equal("weakness");
        }
      }
    },
    loyalty: {
      on: {
        NEXT: "survivability"
      },
      type: "parallel",
      states: {
        q1: {
          initial: "unanswered",
          states: {
            unanswered: {
              on: {
                Q1_WRONG: "wrong",
                Q1_RIGHT: "right",
                Q1_BLANK: "blank"
              }
            },
            wrong: {
              meta: {
                test: async ({ el, expect }) => {
                  expect(el.state.context.question1).to.equal("no");
                }
              }
            },
            right: {
              meta: {
                test: async ({ el, expect }) => {
                  expect(el.state.context.question1).to.equal("yes");
                }
              }
            },
            blank: {
              meta: {
                test: async ({ el, expect }) => {
                  expect(el.state.context.question1).to.eql("");
                }
              }
            }
          }
        }
      },
      meta: {
        test: async ({ el, expect }) => {
          expect(el.state.context.currentStep).to.equal("loyalty");
        }
      }
    },
    survivability: {
      on: {
        NEXT: "skills"
      },
      meta: {
        test: async ({ el, expect }) => {
          expect(el.state.context.currentStep).to.equal("survivability");
        }
      }
    },
    skills: {
      on: {
        NEXT: "skills"
      },
      meta: {
        test: async ({ el, expect }) => {
          expect(el.state.context.currentStep).to.equal("skills");
        }
      }
    },
    information: {
      on: {
        SUBMIT: "results"
      },
      meta: {
        test: async ({ el, expect }) => {
          expect(el.state.context.currentStep).to.equal("information");
        }
      }
    },
    results: {
      meta: {
        test: async ({ el, expect }) => {
          expect(el.state.context.currentStep).to.equal("results");
        }
      }
    }
  }
});

const dwightModel = createModel(dwightMachine).withEvents({
  APPLY_NOW: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-button[applynow]").click();
    }
  },
  APPLY_LATER: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-button[applylater]").click();
    }
  },
  Q1_RIGHT: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-radio[value='yes']").click();
    }
  },
  Q1_WRONG: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-radio[value='no']").click();
    }
  },
  Q1_BLANK: {
    exec: () => {}
  },
  SORRY: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-button[sorry]").click();
    }
  },
  NEXT: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-button[next]").click();
    }
  },
  SUBMIT: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-button[submit]").click();
    }
  }
});

describe("DwightJobApplication", () => {
  const testPlans = dwightModel.getShortestPathPlans();

  testPlans.forEach(plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        it(path.description, async () => {
          const el = await fixture(html`
            <dwight-job-application></dwight-job-application>
          `);
          await path.test({ el, expect });
        });
      });
    });
  });
});
