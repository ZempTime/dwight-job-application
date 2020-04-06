import { html } from "lit-element";
import "@chameleon-ds/card";

export default (state) => {
  const { hired, feedback } = state.context;

  if (hired) {
    return html`
      <h2 result>You're hired.</h2>
      <p>Congratulations, you're not an idiot. See you on monday.</p>
    `;
  }

  if (!hired) {
    return html`
      <div>
        <h2 result>REJECTED</h2>
        <p>
          I'm sorry, but you're an idiot. Only an idiot would hire an idiot. If
          an idiot would do a thing, I do not do that thing. So I'm not hiring
          you.
        </p>
        <h3>NEXT!</h3>

        ${feedback.map((fb) => {
          const { question, rightAnswer, yourAnswer, explanation } = fb;
          return html`
            <chameleon-card outline rounded>
              <chameleon-card-header>
                <h3><strong>Question:</strong> ${question}</h3>
              </chameleon-card-header>
              <p><strong>Right Answer:</strong> ${rightAnswer}</p>
              <p><strong>Your Answer:</strong> ${yourAnswer}</p>
              <p><strong>Explanation:</strong> ${explanation}</p>
            </chameleon-card>
          `;
        })}
      </div>
    `;
  }
};
