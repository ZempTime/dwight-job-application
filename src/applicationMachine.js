import { Machine, assign } from "xstate";

const setStepActions = [
  "intro",
  "weakness",
  "loyalty",
  "survivability",
  "skills",
  "information",
  "results",
].reduce((acc, step) => {
  const capitalizedStepName = step.charAt(0).toUpperCase() + step.slice(1);
  acc[`setCurrentStep${capitalizedStepName}`] = assign((ctx) => {
    return {
      ...ctx,
      currentStep: step,
    };
  });
  return acc;
}, {});

const applicationMachine = Machine(
  {
    id: "application",
    context: {
      currentStep: "",
      weaknessDemonstratedCount: 0,
      question1: "",
      question2: "",
      question3: "",
      question4: 1,
      question5: [],
      question6: "",
      question7: "",
      question8: "",
      question9: "",
      hired: false,
      feedback: [],
    },
    initial: "intro",
    on: {
      input: {
        actions: ["setInput"],
      },
    },
    states: {
      intro: {
        entry: ["setCurrentStepIntro"],
        on: {
          applynow: "loyalty",
          applylater: "weakness",
        },
      },
      weakness: {
        entry: ["setCurrentStepWeakness", "weaknessDemonstrated"],
        on: {
          apologize: "intro",
        },
      },
      loyalty: {
        entry: ["setCurrentStepLoyalty"],
        on: {
          next: "survivability",
        },
      },
      survivability: {
        entry: ["setCurrentStepSurvivability"],
        on: {
          previous: "loyalty",
          next: "skills",
        },
      },
      skills: {
        entry: ["setCurrentStepSkills"],
        on: {
          previous: "survivability",
          next: "information",
        },
      },
      information: {
        entry: ["setCurrentStepInformation"],
        on: {
          submit: "results",
          previous: "skills",
        },
      },
      results: {
        entry: ["setCurrentStepResults", "verifyAnswers"],
      },
    },
  },
  {
    actions: {
      weaknessDemonstrated: assign((ctx) => {
        return {
          ...ctx,
          weaknessDemonstratedCount: (ctx.weaknessDemonstratedCount += 1),
        };
      }),
      ...setStepActions,
      setInput: assign((ctx, e) => {
        const { name, value } = e.payload;
        return {
          ...ctx,
          [name]: value,
        };
      }),
      verifyAnswers: assign((ctx) => {
        const {
          question1,
          question2,
          question3,
          question4,
          question5,
          question6,
          question8,
          question9,
        } = ctx;

        const feedback = [];
        if (question1 !== "yes") {
          feedback.push({
            question:
              "If somewhere else offered to pay you more, would you leave?",
            rightAnswer: "Yes.",
            yourAnswer: question1,
            explanation:
              "Look, I'm all about loyalty. In fact, I feel like part of what I'm being paid for here is my loyalty. But if there were somewhere else that valued loyalty more highly... I'm going wherever they value loyalty the most.",
          });
        }

        const usedRespect = /master|sensei/i;

        if (!usedRespect.test(question2)) {
          feedback.push({
            question: "Tell me how you think our ideal relationship will be.",
            rightAnswer: "You need to show proper respect and discipline.",
            yourAnswer: "Wrong.",
            explanation: "You didn't even use the word 'Master' or 'Sensei.'",
          });
        }

        if (question3 !== "bears") {
          feedback.push({
            question:
              "What animal should you be most vigilant for surprise attacks?",
            rightAnswer: "Bears. Obviously.",
            yourAnswer: question3,
            explanation:
              "I saw 'Wedding Crashers' accidentally. I bought a ticket for 'Grizzly Man' and went into the wrong theater. After an hour, I figured I was in the wrong theater but I kept waiting. Cause that's the thing about bear attacks... they come when you least expect it.",
          });
        }

        if (question4 !== "50") {
          feedback.push({
            question:
              "How likely is it that Dolphin will save the drowning swimmer?",
            rightAnswer: "50%",
            yourAnswer: `${question4}%`,
            explanation:
              "That dolphin is just as likely to save as to finish off that swimmer. Dolphins get a lot of good publicity for the drowning swimmers they push back to shore, but what you don't hear about is the many people they push further out to sea. Dolphins aren't smart. They just like pushing things.",
          });
        }

        if (
          question5[0] !== "neck" ||
          question5[1] !== "nostalgia" ||
          question5[2] !== "turkeys"
        ) {
          feedback.push({
            question: "Greatest human weaknesses, ranked correctly.",
            rightAnswer: "1) Neck, 2) Nostalgia, 3) Turkeys.",
            yourAnswer: question5.map((v, i) => `${i + 1}) ${v}`).join(" "),
            explanation:
              "People underestimate the power of nostalgia. Nostalgia is truly one of the greatest human weaknesses, second only to the neck. Turkeys are only dangerous during mating season, and while you're unarmed.",
          });
        }

        if (question6 !== "mouth") {
          feedback.push({
            question:
              "What body part becomes critical when you need to sleep on top of a fence?",
            rightAnswer: "Mouth.",
            yourAnswer: question6,
            explanation:
              "I know how to sit on a fence. Hell, I can even sleep on a fence. The trick is to do it face down with the post in your mouth.",
          });
        }

        if (question8 !== "") {
          feedback.push({
            question: "Do you do new year's resolutions?",
            rightAnswer: "No.",
            wrongAnswer: "Yours.",
            explanation:
              "New years resolutions? I don't do that. I've achieved plenty, and there's no better than the best.",
          });
        }

        if (question9.length !== 0) {
          feedback.push({
            question: "Is there any other information you'd like to add?",
            rightAnswer: "Nothing.",
            wrongAnswer: "Yours.",
            explanation:
              "If I actually wanted information from you, I would've asked you something specific.",
          });
        }

        return {
          ...ctx,
          feedback,
          hired: !(feedback.length > 0),
        };
      }),
    },
  }
);

export default applicationMachine;
