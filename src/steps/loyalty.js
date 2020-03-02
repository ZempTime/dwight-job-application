import { html } from "lit-element";
import "@chameleon-ds/radio";
import "@chameleon-ds/textarea";

export default (state, send) => {
  const { question1, question2 } = state.context;
  const handleInput = e => {
    const name = e.target.getAttribute("name");
    const value = e.target.getAttribute("value");

    send({
      type: "input",
      payload: {
        name,
        value
      }
    });
  };

  const handleChange = e => {
    const name = e.target.getAttribute("name");
    const value = e.target.value;

    send({
      type: "input",
      payload: {
        name,
        value
      }
    });
  };

  return html`
    <div>
      <fieldset>
        <p>
          I value loyalty. If somewhere else offered to pay you more, would you
          leave?
        </p>
        <chameleon-radio
          ?checked="${question1 === "yes"}"
          name="question1"
          label="Yes"
          value="yes"
          @click="${handleInput}"
        ></chameleon-radio>
        <chameleon-radio
          ?checked="${question1 === "no"}"
          name="question1"
          label="No"
          value="no"
          @click="${handleInput}"
        ></chameleon-radio>
      </fieldset>

      <fieldset>
        <p>Tell me how you think our ideal relationship will be.</p>
        <div>
          <label for="question2">Your Answer:</label>
        </div>
        <textarea
          label="Your Answer"
          id="question2"
          name="question2"
          .value="${question2}"
          @change="${handleChange}"
        ></textarea>
      </fieldset>
    </div>
  `;
};
