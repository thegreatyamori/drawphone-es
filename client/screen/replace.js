import Screen from "./screen.js";

/* global $, ga */

class Replace extends Screen {
    constructor() {
        super();
        this.id = "#replace";
        this.setTitle("Elige un jugador para reemplazar");
    }

    initialize(props) {
        // when leave button is clicked, refresh the page
        $("#replace-leave").on("click", () => location.reload());

        super.initialize(props);
    }

    show({ data }) {
        const { gameCode, players } = data;

        const choices = $("#replace-choices");
        choices.empty();

        if (players.length) {
            players.forEach((player) => {
                const button = $(
                    `<button type="button">${player.name}</button>`
                );

                button.addClass("btn btn-default btn-lg");
                button.on("click", () => this.sendChoice(player));

                choices.append(button);
                choices.append("<br>");
            });
        } else {
            choices.append(
                "<p>Esta partida está actualmente llena. Si te quedas en esta página, se " +
                    "actualizará automáticamente para avisarte si alguien se " +
                    "ha ido!</p>"
            );
        }

        Screen.gameCode = gameCode;
        this.setSubtitle("Listo para unirse a la partida...");
        super.show();
    }

    sendChoice(playerToReplace) {
        this.socket.emit("tryReplacePlayer", {
            playerToReplace,
        });
        ga("send", "event", "Player replacement", "replace", this.timeLimit);
    }
}

export default Replace;
