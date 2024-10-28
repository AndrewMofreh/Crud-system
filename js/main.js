var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productStatus = document.getElementById("productStatus");
var productContainer = [];
var searchInput = document.getElementById("searchInput");
var addAndEditButton = document.getElementById("addAndEditButton");
var currentIndex=0;



if (localStorage.getItem("products") !== null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts(productContainer);
}
else{
  productContainer=[]
}


function addProduct() {
  
  var product = {
    name: productName.value,
    price: productPrice.value,
    model: productModel.value,
    status: productStatus.value,
  };
  productContainer.push(product);
  console.log(productContainer);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts(productContainer);
  clear();
}

function clear() {
  productName.value = "";
  productPrice.value = "";
  productModel.value = "";
  productStatus.value = "";
}


function deleteProduct(deletedItem){
  productContainer.splice(deletedItem,1)
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts(productContainer);
  }

  
function displayProducts(containerArray) {
  var cartona = "";
  for (var i = 0; i < containerArray.length; i++) {
    cartona += `
<tr id="tableRow">
      <td>${i + 1}</td>
      <td>${containerArray[i].name}</td> 
      <td>${containerArray[i].price}</td>
      <td>${containerArray[i].model}</td>
      <td>${containerArray[i].status}</td>
      <td><button class="btn btn-outline-info" onclick="deleteProduct(${i});">Delete</button></td>
      <td><button class="btn btn-outline-danger" onclick="addProductToEdited(${i})" id="addAndEditButton">Update</button></td>
</tr>`;
}
document.getElementById("tableBody").innerHTML = cartona;
}

function searchProduct(term) {
  var searchContainer = [];
var term = searchInput.value;
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name
        .toLowerCase()
        .includes(term.toLowerCase()) === true
    ) {
      searchContainer.push(productContainer[i]);
    }
  }
  displayProducts(searchContainer);
}



function addProductToEdited(editedIndex){

  var andrew =  productContainer[editedIndex];
  currentIndex=editedIndex;
  productName.value = andrew.name;
  productPrice.value = andrew.price;
  productModel.value = andrew.model;
  productStatus.value = andrew.status;

  addAndEditButton.innerHTML = "Edit product";

  // editProduct(currentIndex)
}


function editProduct() {
 var product = {
  name: productName.value,
  price: productPrice.value,
  model: productModel.value,
  status: productStatus.value,
 }
productContainer[currentIndex] = product;
localStorage.setItem("products", JSON.stringify(productContainer));
displayProducts(productContainer);
addAndEditButton.innerHTML="Add product";
clear();
}


// addAndEditButton.onclick = function(){

//   addProduct();
//   addAndEditButton.innerHTML="Add product"
// };


function validationProductName(){
  var regx= /^[A-Z]||[a-z]{1,9}$/
  if(regx.test(productName.value)=== true){
    productName.classList.replace("is-invalid","is-valid")
    return true;
  }
  else {
    productName.classList.add("is-invalid")
    return false;
  }

}


function validationProductPrice(){
  var regx= /^[0-9]{1,5}$/;
  if(regx.test(productPrice.value) === true){
    productPrice.classList.add("is-valid")
    productPrice.classList.remove("is-invalid")
    return true;
  }
  else{
    productPrice.classList.add("is-invalid")
    productPrice.classList.remove("is-valid")
    return false;

  }
}


addAndEditButton.onclick = function(){
  
  if(addAndEditButton.innerHTML === "Add product"){
    if(validationProductName() == true)
    {
      addProduct()

    }
else{alert("Invalid value")}
    
  }
 else{
        editProduct();
      }
      
    }








