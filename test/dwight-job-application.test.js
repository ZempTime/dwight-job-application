import { html, fixture, expect } from "@open-wc/testing";
import { Machine } from "xstate/es";
import { createModel } from "../src/xstate-test/es"

import "../dwight-job-application.js";

const dwightMachine = Machine({
  id: "dwight",
  initial: "intro",
  states: {
    intro: {
      on: {
        APPLY_NOW: "loyalty"
      },
      meta: {
        test: async ({ el, expect }) => {
          expect(el.state.context.currentStep).to.equal("intro");
        }
      }
    },
    loyalty: {
      on: {
        NEXT: "surviability"
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
    exec: async el => {
      el.shadowRoot.querySelector("chameleon-button[applynow]").click();
    }
  },
  NEXT: {
    exec: async el => {
      el.shadowRoot.querySelector("chameleon-button[next]").click();
    }
  },
  SUBMIT: {
    exec: async el => {
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
