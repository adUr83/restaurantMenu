const orders =JSON.parse(localStorage.getItem("ttt"))

const list = document.querySelector("#ord")
const tp = document.querySelector("#tp")
const complete = document.querySelector("#cmp")




getProducts = () =>{

/*
<div class="d-flex justify-content-between">
 <li class="list-group-item">ürün bilgisi1</li>
 <i class="fas fa-trash-alt"></i>
</div>

<div class="d-flex justify-content-between">
 <li class="list-group-item">ürün bilgisi2</li>
 <i class="fas fa-trash-alt"></i>
</div>


<div class="d-flex justify-content-between">
 <li class="list-group-item">ürün bilgisi3</li>
 <i class="fas fa-trash-alt"></i>
</div>
<hr>

*/

    for (let i = 0; i < orders.elements.length; i++) {

        
        //div
        const div = document.createElement("div")
        div.className = "d-flex justify-content-between"

        //li
        let li = document.createElement("li")
        li.className = " price"
        li.textContent = orders.elements[i]

        //icon
        const icon = document.createElement("i")
        icon.className = "fas fa-trash-alt price"
        icon.style.cursor = "pointer"
        
  
  
        // this handler will be executed only once when the cursor moves over the unordered list
        icon.addEventListener("mouseenter", function( event ) {   
          // highlight the mouseenter target
          event.target.style.color = "black";
      
          // reset the color after a short delay
          setTimeout(function() {
            event.target.style.color = "";
          }, 4000);
        }, false);
       



        //hr
        const hr= document.createElement("hr")


        div.appendChild(li)
        div.appendChild(icon)
       
        list.appendChild(div)
        list.appendChild(hr)
      
    }

    tp.textContent = `Total Price $${orders.totalPrice}`
  
    
}








router = (e) =>{


    if(e.target.className === "fas fa-trash-alt price") // remove icons
    {
         removeProduct(e);
    }
    else if (e.target.id == "cmp")  // complete button
    {
      completeOrder(e)
    }
}

completeOrder = () =>{

  let cmpO = {} // completed order

  

  const sip = JSON.parse(localStorage.getItem("ttt")) // son halini çektim siparişin şu an ki

  // sipariş bilgilerini ekledim
   cmpO.products = sip.elements
   cmpO.totalPrice = sip.totalPrice
   cmpO.id = makeid(10)

   if(sip.totalPrice === 0)
   {

    const div = document.createElement("div")
    div.className = "alert alert-danger"
    div.role = "alert"
    div.textContent = "Have no products please return menu "

        list.appendChild(div)
      
    setTimeout(
        ()=>{
            div.remove()
        },2000)
   }
   else{
    




    let ords;
    if(localStorage.getItem("orders") === null)
    {
       ords = []
    }
    else{
      ords = JSON.parse(localStorage.getItem("orders"))
    }
 
    ords.push(cmpO)
 
    localStorage.setItem("orders",JSON.stringify(ords))



    const div = document.createElement("div")
    div.className = "alert alert-success"
    div.role = "alert"
    div.textContent = "Order is successfuly"

        list.appendChild(div)
      
    setTimeout(
        ()=>{
            div.remove()
             location.href = "menu.html"
        },2000)


   }
  






}

removeProduct = (e) =>{

  //e.target = icon
  
  e.target.parentElement.nextElementSibling.remove() // hr
    e.target.parentElement.remove() // remove from UI  // div
    
  


    //remove from localstorage
    const info = e.target.previousElementSibling.textContent

    console.log(info)

    // obtained current total price
    let productPrice;

    for(let i = 0; i < info.length ; i++)
    {
      if(info[i] === "$")
      {
        productPrice =  info.slice(i+1);
         break;
      }

    }
    console.log(productPrice)
    let currentTotalPrice = tp.textContent.slice(13)
    console.log(currentTotalPrice)

       tp.textContent = `Total Price $${Number(currentTotalPrice) - Number(productPrice)}`
    
        orders.totalPrice = Number(currentTotalPrice) - Number(productPrice)

    

    //remove process
     orders.elements =  orders.elements.filter( item => info !== item)

      console.log(orders.elements)

      localStorage.setItem("ttt",JSON.stringify(orders))

}





const  makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


document.addEventListener("click",router)


document.addEventListener("DOMContentLoaded",getProducts) 
