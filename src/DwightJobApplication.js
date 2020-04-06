import { html, css, LitElement } from "lit-element";
import { interpret } from "xstate";
import "@chameleon-ds/button";
import applicationMachine from "./applicationMachine";
import * as steps from "./steps";

export class DwightJobApplication extends LitElement {
  static get styles() {
    return css`
      :host {
        --dwight-job-application-text-color: #000;

        display: block;
        padding: 25px;
        color: var(--dwight-job-application-text-color);
      }

      .container {
        max-width: 800px;
      }

      .intro {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: 300px;
      }

      .perfection {
        height: 1fr;
      }

      .confidence {
        height: 100%;
      }

      .stepper-item {
        padding-right: 7px;
      }
    `;
  }

  static get properties() {
    return {
      state: { type: Object },
    };
  }

  constructor() {
    super();
    this.service = interpret(applicationMachine)
      .onTransition((state) => {
        this.state = state;
      })
      .start();
  }

  disconnectedCallback() {
    this.service.stop();
  }

  handlePrevious() {
    this.service.send("previous");
  }

  get previousButton() {
    return this.state.nextEvents.includes("previous")
      ? html`
          <chameleon-button previous @click="${this.handlePrevious}"
            >Previous</chameleon-button
          >
        `
      : ``;
  }

  handleNext() {
    this.service.send("next");
  }
  get nextButton() {
    return this.state.nextEvents.includes("next")
      ? html`
          <chameleon-button next @click="${this.handleNext}"
            >Next</chameleon-button
          >
        `
      : ``;
  }

  handleSubmit() {
    this.service.send("submit");
  }
  get submitButton() {
    return this.state.nextEvents.includes("submit")
      ? html`
          <chameleon-button submit @click="${this.handleSubmit}"
            >Submit</chameleon-button
          >
        `
      : ``;
  }

  get stepper() {
    const currentStep = this.state.context.currentStep;
    const steps = [
      "loyalty",
      "survivability",
      "skills",
      "information",
      "results",
    ];
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    if (steps.includes(currentStep)) {
      return html`
        <p>
          ${steps.map((step) => {
            return step === currentStep
              ? html`
                  <span class="stepper-item"
                    ><strong>${capitalize(step)}</strong></span
                  >
                `
              : html` <span class="stepper-item">${capitalize(step)}</span> `;
          })}
        </p>
      `;
    }
    return ``;
  }

  render() {
    const { send } = this.service;
    const { currentStep } = this.state.context;
    return html`
      <div class="container">
        <h2>Job Application</h2>
        ${this.stepper}
        <div class="buttons">
          ${this.previousButton} ${this.nextButton} ${this.submitButton}
        </div>
        ${steps[currentStep](this.state, send)}
      </div>
    `;
  }
}
