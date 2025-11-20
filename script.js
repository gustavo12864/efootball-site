let usedPlayers = new Set();

function generateCompetitors() {
    const count = document.getElementById('competitorCount').value;
    const container = document.getElementById('competitorTables');
    container.innerHTML = '';

    for (let i = 1; i <= count; i++) {
        container.innerHTML += `
            <div class="competitorBox" id="comp_${i}">
                <input type="text" placeholder="Nome do competidor" onchange="updateName(${i}, this.value)">
                <h3 id="compName_${i}">Competidor ${i}</h3>

                <input type="text" id="playerInput_${i}" placeholder="Adicionar jogador">
                <button onclick="addPlayer(${i})">Adicionar</button>

                <ul id="playerList_${i}"></ul>
            </div>
        `;
    }
}

function updateName(id, name) {
    document.getElementById(`compName_${id}`).innerText = name || "Competidor " + id;
}

function addPlayer(id) {
    const input = document.getElementById(`playerInput_${id}`);
    const name = input.value.trim();
    if (!name) return;

    if (usedPlayers.has(name.toLowerCase())) {
        alert("Jogador já escolhido por outro competidor!");
        input.value = "";
        return;
    }

    usedPlayers.add(name.toLowerCase());

    const list = document.getElementById(`playerList_${id}`);
    const li = document.createElement("li");
    li.className = "playerItem";
    li.innerHTML = `<span>${name}</span> <button onclick="removePlayer(this, '${name.toLowerCase()}')">X</button>`;
    list.appendChild(li);

    input.value = "";
}

function removePlayer(button, playerName) {
    usedPlayers.delete(playerName);
    button.parentElement.remove();
}
