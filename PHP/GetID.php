<?php
header('Access-Control-Allow-Origin: *');
$servername = "localhost";
$username = "medicaltecmysql";
$password = "Medicaltec310188$";
$CI = $_GET["CI"];
$FN = $_GET["FN"];
// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM future_users.usuarios_web where EMP_Documento =".$CI." AND EMP_FechaNac ='".$FN."'";
$result = $conn->query($sql);
$Obj = new stdClass;
$Obj->existe=false;
if ($result->num_rows > 0) {
    // output data of each row
    $Obj->existe=true;
    $pila = array();
    while($row = $result->fetch_assoc()) {
        $Obj->ID = $row["EMP_EmpresaId"];
        $Obj->NOMBRE = $row["EMP_NombreLargo"];
        array_push($pila,$Obj);
    }
    echo json_encode($pila[0]);
  } else {
    $Obj->ID = null;
    echo json_encode($Obj);
  }
  $conn->close();
?>