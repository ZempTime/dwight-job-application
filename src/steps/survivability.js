import { html } from "lit-element";
import "@chameleon-ds/radio";

export default (state, send) => {
  const { question3, question4, question5 } = state.context;

  const handleInput = e => {
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

  const handleRank = e => {
    e.preventDefault();
    const value = e.target.getAttribute("value");

    if (question5.indexOf(value) !== -1) return;

    send({
      type: "input",
      payload: {
        name: "question5",
        value: [...question5, value]
      }
    });
  };

  const handleClear = e => {
    e.preventDefault();

    send({
      type: "input",
      payload: {
        name: "question5",
        value: []
      }
    });
  };

  const rankDisplay = choice => {
    const number = question5.indexOf(choice);
    return number === -1 ? "-" : number + 1;
  };

  return html`
    <div>
      <p>
        You must always be ready for surprise attacks. What animal should you be
        most vigilant of?
      </p>

      <div>
        <chameleon-radio
          ?checked="${question3 === "humans"}"
          @click="${handleInput}"
          value="humans"
          label="Humans"
          name="question3"
        ></chameleon-radio>
        <chameleon-radio
          ?checked="${question3 === "bobcats"}"
          @click="${handleInput}"
          value="bobcats"
          label="Bobcats"
          name="question3"
        ></chameleon-radio>
        <chameleon-radio
          ?checked="${question3 === "bears"}"
          @click="${handleInput}"
          value="bears"
          label="Bears"
          name="question3"
        ></chameleon-radio>
      </div>
    </div>

    <div>
      <p>
        You see a swimmer drowning out at sea, and a dolphin quickly closing in.
        How likely is it that Dolphin will save the swimmer?
      </p>
      <input
        type="range"
        min="1"
        max="100"
        name="question4"
        .value="${question4}"
        @input="${handleInput}"
      />
      <p>
        ${question4} %
      </p>
    </div>

    <div>
      <p>Rank human weaknesses, greatest weakness first:</p>

      <p><a href="#" @click="${handleClear}">clear all</a></p>
      <p>
        <a href="#" @click="${handleRank}" value="nostalgia">rank</a>
        [${rankDisplay("nostalgia")}] Nostalgia
      </p>
      <p>
        <a href="#" @click="${handleRank}" value="neck">rank</a> [${rankDisplay(
          "neck"
        )}]
        Neck
      </p>
      <p>
        <a href="#" @click="${handleRank}" value="turkeys">rank</a>
        [${rankDisplay("turkeys")}] Dominant Male Turkeys during Mating Season
      </p>
    </div>
  `;
};
