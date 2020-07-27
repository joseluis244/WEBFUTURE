<?php
$servername = "localhost";
$username = "XXXXXXXXXXX";
$password = "XXXXXXXXXXXX$";
$CI = $_GET["CI"];

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM future_users.usuarios_web where EMP_Documento =".$CI;
$result = $conn->query($sql);
$Obj = new stdClass;
$Obj->existe=false;
if ($result->num_rows > 0) {
    // output data of each row
    $Obj->existe=true;
    $pila = array();
    while($row = $result->fetch_assoc()) {
        $Obj->ID = $row["EMP_EmpresaId"];
        array_push($pila,$Obj);
    }
    echo json_encode($pila[0]);
  } else {
    $Obj->ID = null;
    echo json_encode($Obj);
  }
  $conn->close();
?>