import { html } from "lit-element";

export default (state, send) => {
  const { question9 } = state.context;

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

  return html`
    <div>
      <label>Is there any other information you'd like to add?</label>
      <br />
      <textarea
        name="question9"
        value="${question9}"
        @change="${handleInput}"
      ></textarea>
    </div>
  `;
};
