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

function searchTable(searchInput, TableBody) {
    var searchInput = document.getElementById(searchInput);
    var TableBody = document.getElementById(TableBody);

    searchInput.addEventListener("keyup", function () {
        var filter = searchInput.value.toLowerCase();
        var rows = TableBody.getElementsByTagName("tr");

        for (var i = 0; i < rows.length; i++) {
            var cell = rows[i].getElementsByTagName("td")[0];
            if (cell) {
                var text = cell.innerText.toLowerCase();
                rows[i].style.display = text.indexOf(filter) > -1 ? "" : "none";
            }
        }
    });
}

function clearTable(TableID) {
    var tableBody = document.getElementById(TableID);
    if (tableBody.hasChildNodes()) {
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    }
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

function fillTableWithTasks(data) {
    clearTable("tasksTableBody");
    var tableBody = document.getElementById('tasksTableBody');

    // Schleife über alle Aufgaben im Array
    for (var i = 0; i < data.tasks.length; i++) {
        var task = data.tasks[i];

        // Eine neue Zeile erstellen
        var row = document.createElement('tr');

        // Aufgabenname und Datum hinzufügen
        var nameCell = document.createElement('td');
        var icon = document.createElement('img');

        icon.src = 'assets/icons/calendar-date.svg';
        icon.alt = 'Date Icon';

        nameCell.innerHTML += "<span class='fs-1'>" + task.name + "</span><br>";
        nameCell.appendChild(icon);
        nameCell.innerHTML += "<span class='badge'>" + task.date + "</span>";

        row.appendChild(nameCell);

        // Aufgabenstatus hinzufügen
        var statusCell = document.createElement('td');
        var statusSpan = document.createElement('span');
        statusSpan.textContent = task.status;

        // Klasse basierend auf dem Aufgabenstatus hinzufügen
        if (task.status === 'offen') {
            statusSpan.classList.add('badge', 'bg-primary', 'w-100');
        } else if (task.status === 'erledigt') {
            statusSpan.classList.add('badge', 'bg-success', 'w-100');
        }

        statusCell.appendChild(statusSpan);
        row.appendChild(statusCell);

        // Buttons in der gleichen Zelle erstellen
        var buttonCell = document.createElement('td');

        // "Erledigen"-Button erstellen und Event Listener hinzufügen
        var completeButton = document.createElement('button');
        completeButton.textContent = 'done';
        completeButton.classList.add('btn', 'btn-success');
        completeButton.addEventListener('click', function (id) {
            return function () {
                console.log(id);
            };
        }(task.id));
        buttonCell.appendChild(completeButton);

        // "Muss nicht gemacht werden"-Button erstellen und Event Listener hinzufügen
        var skipButton = document.createElement('button');
        skipButton.textContent = 'skip';
        skipButton.classList.add('btn', 'btn-warning', 'ml-2');
        skipButton.addEventListener('click', function (id) {
            return function () {
                console.log(id);
            };
        }(task.id));
        buttonCell.appendChild(skipButton);

        row.appendChild(buttonCell);

        var ownerCell = document.createElement('td');
        var ownerSpan = document.createElement('span');

        ownerSpan.textContent = task.owner;
        ownerSpan.classList.add('badge', 'bg-primary');

        ownerCell.appendChild(ownerSpan);

        row.appendChild(ownerCell);

        // Zeile zur Tabelle hinzufügen
        tableBody.appendChild(row);
    }

}
