function trackOrder(){

let orderId = document.getElementById("orderId").value;

if(orderId === ""){
alert("Please enter Order ID");
return;
}

document.getElementById("timeline").style.display="block";

}