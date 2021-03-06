import { html, fixture, expect, aTimeout } from "@open-wc/testing";
import { Machine, assign } from "xstate/es";
import { createModel } from "../src/xstate-test/es";

const DELAY_MS = 50;

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
        await aTimeout(DELAY_MS);
      },
      actions: ["logRight"],
    },
    wrong: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question1).to.equal("no");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("chameleon-radio[value='no']").click();
        await aTimeout(DELAY_MS);
      },
      actions: ["logWrong"],
    },
    blank: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question1).to.equal("");
      },
      eventExec: () => {},
      actions: ["logWrong"],
    },
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
        await aTimeout(DELAY_MS);
      },
      actions: ["logRight"],
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
        await aTimeout(DELAY_MS);
      },
      actions: ["logWrong"],
    },
    blank: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question2).to.equal("");
      },
      eventExec: () => {},
      actions: ["logWrong"],
    },
  },
  {
    id: "3",
    right: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question3).to.equal("bears");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("chameleon-radio[value='bears']").click();
        await aTimeout(DELAY_MS);
      },
      actions: ["logRight"],
    },
    wrong: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question3).to.equal("humans");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("chameleon-radio[value='humans']").click();
        await aTimeout(DELAY_MS);
      },
      actions: ["logWrong"],
    },
    blank: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question3).to.equal("");
        await aTimeout(DELAY_MS);
      },
      eventExec: () => {},
      actions: ["logWrong"],
    },
  },
  {
    id: "4",
    right: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question4).to.equal("50");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("[name='question4']").value = 50;
        el.shadowRoot
          .querySelector("[name='question4']")
          .dispatchEvent(new Event("input"));
        await aTimeout(DELAY_MS);
      },
      actions: ["logRight"],
    },
    wrong: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question4).to.equal("100");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("[name='question4']").value = 100;
        el.shadowRoot
          .querySelector("[name='question4']")
          .dispatchEvent(new Event("input"));
        await aTimeout(DELAY_MS);
      },
      actions: ["logWrong"],
    },
    blank: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question4).to.equal(1);
      },
      eventExec: () => {},
      actions: ["logWrong"],
    },
  },
  {
    id: "5",
    right: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question5).to.eql([
          "neck",
          "nostalgia",
          "turkeys",
        ]);
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("a[value='neck']").click();
        await aTimeout(1);
        el.shadowRoot.querySelector("a[value='nostalgia']").click();
        await aTimeout(1);
        el.shadowRoot.querySelector("a[value='turkeys']").click();
        await aTimeout(1);
        await aTimeout(DELAY_MS);
      },
      actions: ["logRight"],
    },
    wrong: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question5).to.eql([
          "nostalgia",
          "neck",
          "turkeys",
        ]);
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("a[value='nostalgia']").click();
        await aTimeout(1);
        el.shadowRoot.querySelector("a[value='neck']").click();
        await aTimeout(1);
        el.shadowRoot.querySelector("a[value='turkeys']").click();
        await aTimeout(1);
        await aTimeout(DELAY_MS);
      },
      actions: ["logWrong"],
    },
    blank: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question5).to.eql([]);
      },
      eventExec: async () => {},
      actions: ["logWrong"],
    },
  },
  {
    id: "6",
    right: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question6).to.equal("mouth");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("chameleon-radio[value='mouth']").click();
        await aTimeout(DELAY_MS);
      },
      actions: ["logRight"],
    },
    wrong: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question6).to.equal("back");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("chameleon-radio[value='back']").click();
        await aTimeout(DELAY_MS);
      },
      actions: ["logWrong"],
    },
    blank: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question6).to.equal("");
      },
      eventExec: () => {},
      actions: ["logWrong"],
    },
  },
  {
    id: "8",
    right: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question8).to.equal("");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("chameleon-radio[value='no']").click();
        await aTimeout(DELAY_MS);
      },
      actions: ["logRight"],
    },
    wrong: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question8).to.equal("Find a mate");
      },
      eventExec: async ({ el }) => {
        el.shadowRoot.querySelector("chameleon-radio[value='yes']").click();
        await aTimeout(1);
        const inputTextarea = el.shadowRoot.querySelector("[name='question8']");
        inputTextarea.value = "Find a mate";
        inputTextarea.dispatchEvent(
          new CustomEvent("change", { target: inputTextarea })
        );
        await aTimeout(DELAY_MS);
      },
      actions: ["logWrong"],
    },
    blank: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question8).to.equal("");
      },
      eventExec: () => {},
      actions: ["logRight"],
    },
  },
  {
    id: "9",
    right: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question9).to.equal("");
      },
      eventExec: async ({ el }) => {},
      actions: ["logRight"],
    },
    wrong: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question9).to.equal("I grow celery");
      },
      eventExec: async ({ el }) => {
        const inputTextarea = el.shadowRoot.querySelector(
          "textarea[name='question9']"
        );
        inputTextarea.value = "I grow celery";
        inputTextarea.dispatchEvent(
          new CustomEvent("change", { target: inputTextarea })
        );
        await aTimeout(DELAY_MS);
      },
    },
    blank: {
      test: async ({ el, expect }) => {
        expect(el.state.context.question9).to.equal("");
      },
      eventExec: () => {},
      actions: ["logRight"],
    },
  },
];

const buildQuestionNode = (q) => {
  return {
    initial: "unanswered",
    states: {
      unanswered: {
        on: {
          [`Q${q.id}_WRONG`]: { target: "wrong", actions: q.wrong.actions },
          [`Q${q.id}_RIGHT`]: { target: "right", actions: q.right.actions },
          [`Q${q.id}_BLANK`]: { target: "blank", actions: q.blank.actions },
        },
      },
      wrong: {
        meta: {
          test: q.wrong.test,
        },
      },
      right: {
        meta: {
          test: q.right.test,
        },
      },
      blank: {
        meta: {
          test: q.blank.test,
        },
      },
    },
  };
};

const dwightMachine = Machine(
  {
    id: "dwight",
    initial: "intro",
    context: {
      answers: [],
    },
    states: {
      intro: {
        on: {
          APPLY_NOW: "loyalty",
          APPLY_LATER: "weakness",
        },
        meta: {
          test: async ({ el, expect }) => {
            expect(el.state.context.currentStep).to.equal("intro");
          },
        },
      },
      weakness: {
        on: {
          SORRY: "intro",
        },
        meta: {
          test: async ({ el, expect }) => {
            expect(el.state.context.currentStep).to.equal("weakness");
          },
        },
      },
      loyalty: {
        on: {
          NEXT: "survivability",
        },
        type: "parallel",
        states: {
          q1: buildQuestionNode(questions.find((q) => q.id === "1")),
          q2: buildQuestionNode(questions.find((q) => q.id === "2")),
        },
        meta: {
          test: async ({ el, expect }) => {
            expect(el.state.context.currentStep).to.equal("loyalty");
          },
        },
      },
      survivability: {
        on: {
          NEXT: "skills",
        },
        type: "parallel",
        states: {
          q3: buildQuestionNode(questions.find((q) => q.id === "3")),
          q4: buildQuestionNode(questions.find((q) => q.id === "4")),
          q5: buildQuestionNode(questions.find((q) => q.id === "5")),
        },
        meta: {
          test: async ({ el, expect }) => {
            expect(el.state.context.currentStep).to.equal("survivability");
          },
        },
      },
      skills: {
        on: {
          NEXT: "information",
        },
        type: "parallel",
        states: {
          q6: buildQuestionNode(questions.find((q) => q.id === "6")),
          q8: buildQuestionNode(questions.find((q) => q.id === "8")),
        },
        meta: {
          test: async ({ el, expect }) => {
            expect(el.state.context.currentStep).to.equal("skills");
          },
        },
      },
      information: {
        on: {
          SUBMIT: "results",
        },
        type: "parallel",
        states: {
          q9: buildQuestionNode(questions.find((q) => q.id === "9")),
        },
        meta: {
          test: async ({ el, expect }) => {
            expect(el.state.context.currentStep).to.equal("information");
          },
        },
      },
      results: {
        initial: "undetermined",
        states: {
          undetermined: {
            on: {
              "": [
                { target: "passed", cond: "questionsCorrect" },
                { target: "failed" },
              ],
            },
            meta: {
              description: "results",
            },
          },
          passed: {
            type: "final",
            meta: {
              test: async ({ el, expect }) => {
                expect(
                  el.shadowRoot.querySelector("h2[result]").textContent
                ).to.equal("You're hired.");
              },
              description: "passed",
            },
          },
          failed: {
            type: "final",
            meta: {
              test: async ({ el, expect }) => {
                expect(
                  el.shadowRoot.querySelector("h2[result]").textContent
                ).to.equal("REJECTED");
              },
              description: "failed",
            },
          },
        },
      },
    },
  },
  {
    actions: {
      logRight: assign((ctx) => {
        const answers = ctx.answers.slice(0);
        answers.push("right");
        return {
          ...ctx,
          answers,
        };
      }),
      logWrong: assign((ctx) => {
        const answers = ctx.answers.slice(0);
        answers.push("wrong");
        return {
          ...ctx,
          answers,
        };
      }),
    },
    guards: {
      questionsCorrect: (ctx) =>
        ctx.answers.filter((r) => r === "right").length === 8,
    },
  }
);

const questionEvents = questions.reduce((acc, questionDef) => {
  const right = {
    key: `Q${questionDef.id}_RIGHT`,
    value: {
      exec: questionDef.right.eventExec,
    },
  };

  const wrong = {
    key: `Q${questionDef.id}_WRONG`,
    value: {
      exec: questionDef.wrong.eventExec,
    },
  };

  const blank = {
    key: `Q${questionDef.id}_BLANK`,
    value: {
      exec: questionDef.blank.eventExec,
    },
  };
  return {
    ...acc,
    [right.key]: right.value,
    [wrong.key]: wrong.value,
    [blank.key]: blank.value,
  };
}, {});

const dwightModel = createModel(dwightMachine).withEvents({
  APPLY_NOW: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-button[applynow]").click();
      await aTimeout(DELAY_MS);
    },
  },
  APPLY_LATER: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-button[applylater]").click();
      await aTimeout(DELAY_MS);
    },
  },
  SORRY: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-button[sorry]").click();
      await aTimeout(DELAY_MS);
    },
  },
  NEXT: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-button[next]").click();
      await aTimeout(DELAY_MS);
    },
  },
  SUBMIT: {
    exec: async ({ el }) => {
      el.shadowRoot.querySelector("chameleon-button[submit]").click();
      await aTimeout(DELAY_MS);
    },
  },
  ...questionEvents,
});

describe("DwightJobApplication", () => {
  const css = `
  dwight-job-application[topright] {
    background: rgba(255, 255, 255, 1);
    position:absolute;
    width: 850px;
    z-index: 300;
    right:0;
    top:40px;
    opacity: 1;
  }`;
  const head = document.head;
  let style = document.createElement("style");
  head.appendChild(style);
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));

  let waysToPass = 0;
  let waysToFail = 0;
  const isCompleted = (meta) => {
    if (meta.includes("dwight.results.passed")) {
      waysToPass += 1;
      return true;
    }
    if (meta.includes("dwight.results.failed")) {
      waysToFail += 2;
      return true;
    }
    return false;
  };

  const testPlans1 = dwightModel
    .getShortestPathPlans()
    .filter((p) => isCompleted(Object.keys(p.state.meta)));

  console.log("waysToPass: ", waysToPass, "waysToFail:", waysToFail);

  testPlans1.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, async () => {
          const el = await fixture(html`
            <dwight-job-application topright></dwight-job-application>
          `);
          await path.test({ el, expect });
        });
      });
    });
  });
});
