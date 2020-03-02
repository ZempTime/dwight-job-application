import { html, fixture, expect } from "@open-wc/testing";
import { Machine } from "xstate/es";
import { createModel } from "../src/xstate-test/es";

import "../dwight-job-application.js";

const questions = [
  {
    id: "1",
    right: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question1).to.equal("yes");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("chameleon-radio[value='yes']").click();
      }
    },
    wrong: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question1).to.equal("no");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("chameleon-radio[value='no']").click();
      }
    },
    blank: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question1).to.equal("");
      },
      eventExec: () => {}
    }
  },
  {
    id: "2",
    right: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question2).to.equal("Teach me, sensei");
      },
      eventExec: async ({ el }) => {
        const inputTextarea = el.shadowRoot.querySelector(
          "textarea[name='question2']"
        );
        inputTextarea.value = "Teach me, sensei";
        inputTextarea.dispatchEvent(
          new CustomEvent("change", { target: inputTextarea })
        );
      }
    },
    wrong: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question2).to.equal(
          "A standard working relationship"
        );
      },
      eventExec: async ({ el }) => {
        const inputTextarea = el.shadowRoot.querySelector(
          "textarea[name='question2']"
        );
        inputTextarea.value = "A standard working relationship";
        inputTextarea.dispatchEvent(
          new CustomEvent("change", { target: inputTextarea })
        );
      }
    },
    blank: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question2).to.equal("");
      },
      eventExec: () => {}
    }
  }
];

const buildQuestionNode = q => {
  return {
    initial: "unanswered",
    states: {
      unanswered: {
        on: {
          [`Q${q.id}_WRONG`]: "wrong",
          [`Q${q.id}_RIGHT`]: "right",
          [`Q${q.id}_BLANK`]: "blank"
        }
      },
      wrong: {
        meta: {
          test: q.wrong.test
        }
      },
      right: {
        meta: {
          test: q.right.test
        }
      },
      blank: {
        meta: {
          test: q.blank.test
        }
      }
    }
  };
};

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
        q1: buildQuestionNode(questions.find(q => q.id === "1")),
        q2: buildQuestionNode(questions.find(q => q.id === "2"))
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

const questionEvents = questions.reduce((acc, questionDef) => {
  const right = {
    key: `Q${questionDef.id}_RIGHT`,
    value: {
      exec: questionDef.right.eventExec
    }
  };

  const wrong = {
    key: `Q${questionDef.id}_WRONG`,
    value: {
      exec: questionDef.wrong.eventExec
    }
  };

  const blank = {
    key: `Q${questionDef.id}_BLANK`,
    value: {
      exec: questionDef.blank.eventExec
    }
  };
  return {
    ...acc,
    [right.key]: right.value,
    [wrong.key]: wrong.value,
    [blank.key]: blank.value
  };
}, {});

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
  },
  ...questionEvents
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
