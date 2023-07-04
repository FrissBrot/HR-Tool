//Timo Weber
//Juli 2023

// AJAX-Funktion, um die Backend-Anfrage zu senden
function sendRequest(action) {
    return new Promise(function (resolve, reject) {
        fetch('backend.php?action=' + action)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (data) {
                resolve(data);
            });
    });
}


function fillTableWithArray(table, data) {

    console.log(data);
    var odersTableBody = document.getElementById(table);

    // Schleife über das Array, um die Einträge in die Tabelle einzufügen
    for (var i = 0; i < data.names.length; i++) {
        var id = data.names[i].id;
        var name = data.names[i].name;

        // Neue Zeile erstellen
        var newRow = document.createElement("tr");

        // Neue Zelle erstellen und den Namen einfügen
        var nameCell = document.createElement("td");
        nameCell.textContent = name;

        // Klick-Ereignis an die Zelle anhängen
        nameCell.addEventListener("click", createAlert.bind(null, id));

        // Zelle zur Zeile hinzufügen
        newRow.appendChild(nameCell);

        // Zeile zur Tabelle hinzufügen
        odersTableBody.appendChild(newRow);
    }
}