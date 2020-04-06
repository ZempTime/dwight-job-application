import { html } from "lit-element";

export default (state, send) => {
  const { question6, question7, question8 } = state.context;

  const handleInput = e => {
    const name = e.target.getAttribute("name");
    const value = e.target.getAttribute("value") || e.target.value;

    send({
      type: "input",
      payload: {
        name,
        value
      }
    });
  };

  const resolution =
    question7 === "yes"
      ? html`
          <label>What are they?</label>
          <textarea
            name="question8"
            value="${question8}"
            @change="${handleInput}"
          ></textarea>
        `
      : ``;

  return html`
    <div>
      <p>
        What body part becomes critical when you need to sleep on top of a
        fence?
      </p>

      <div>
        <chameleon-radio
          ?checked="${question6 === "hands"}"
          @click="${handleInput}"
          name="question6"
          value="hands"
          label="Hands"
        ></chameleon-radio>
        <chameleon-radio
          ?checked="${question6 === "mouth"}"
          @click="${handleInput}"
          name="question6"
          value="mouth"
          label="Mouth"
        ></chameleon-radio>
        <chameleon-radio
          ?checked="${question6 === "back"}"
          @click="${handleInput}"
          name="question6"
          value="back"
          label="Back"
        ></chameleon-radio>
      </div>
    </div>

    <div>
      <p>Do you do new year's resolutions?</p>
      <div>
        <chameleon-radio
          ?checked="${question7 === "yes"}"
          @click="${handleInput}"
          name="question7"
          value="yes"
          label="Yes"
        ></chameleon-radio>
        <chameleon-radio
          ?checked="${question7 === "no"}"
          @click="${handleInput}"
          name="question7"
          value="no"
          label="No"
        ></chameleon-radio>
      </div>

      ${resolution}
    </div>
  `;
};
