import { html } from "lit-element";
import "@chameleon-ds/button";

export default (state, send) => {
  const { weaknessDemonstratedCount } = state.context;

  const handleApology = () => {
    send({
      type: "apologize"
    });
  };

  if (weaknessDemonstratedCount > 1) {
    return html`
      <div>
        <p>You've demonstrated too much weakness to be useful to me. NEXT!</p>
      </div>
    `;
  }

  return html`
    <div>
      <p>Wrong. I need decisiveness. I need commitment.</p>
      <chameleon-button @click="${handleApology}"> I'm Sorry</chameleon-button>
    </div>
  `;
};
