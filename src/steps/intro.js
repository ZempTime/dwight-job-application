import { html } from "lit-element";

export default (state, send) => {
  const { weaknessDemonstratedCount } = state.context;

  const handleApplyNow = () => {
    send({
      type: "applynow"
    });
  };
  const handleApplyLater = () => {
    send({
      type: "applylater"
    });
  };

  const warning =
    weaknessDemonstratedCount >= 1
      ? html`
          <p>I trust you'll choose correctly, this time.</p>
        `
      : ``;

  return html`
    <div class="intro">
      <div class="perfection">
        <img
          class="confidence"
          src="/src/assets/confidence.jpg"
          alt="The most beautiful image to ever grace your eyes - Me."
        />
      </div>
      <div>
        <p>My name is Dwight. I need a new underling.</p>
        ${warning}
        <chameleon-button applynow @click="${handleApplyNow}"
          >Apply Now</chameleon-button
        >
        <chameleon-button applylater @click="${handleApplyLater}"
          >Apply Later</chameleon-button
        >
      </div>
    </div>
  `;
};
