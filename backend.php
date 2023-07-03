<?php
// Das Array mit den Namen erstellen
$names = [
    ["id" => 1, "name" => "John"],
    ["id" => 2, "name" => "Emily"],
    ["id" => 3, "name" => "Michael"],
    ["id" => 4, "name" => "Sophia"],
    ["id" => 5, "name" => "William"],
    ["id" => 6, "name" => "Olivia"],
    ["id" => 7, "name" => "Daniel"],
    ["id" => 8, "name" => "Ava"],
    ["id" => 9, "name" => "James"],
    ["id" => 10, "name" => "Timo"],
    ["id" => 11, "name" => "Niklas"]
];

$tasksTimo = [
  ["id" => 1, "name" => "ad user löschen", "status" => "erledigt"],
  ["id" => 2, "name" => "mailbox deaktivieren", "status" => "offen"],
  ["id" => 3, "name" => "deaktivieren", "status" => "erledigt"],
];

$tasksJohn = [
  ["id" => 1, "name" => "essen"],
  ["id" => 2, "name" => "hunger"],

];

if(isset($_GET['action'])) {
  $action = $_GET['action'];
  // Hier kannst du entsprechend auf $variable reagieren und die gewünschten Daten zurückgeben.
  // Beispiel:
  switch($action) {
    case 'GetOders':
      echo json_encode(["names" => $names]);
      break;
    case 'GetTasksFromOrder':
      $id = $_GET['id'];
      switch($id){
        case 1:
          echo json_encode(["tasks" => $tasksTimo]);
          break;
        case 2:
          echo json_encode(["tasks" => $tasksJohn]);
          break;
      }
      break;
    default:
      echo 'Ungültige Variable';
      break;
  }
}
?>