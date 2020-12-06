
const orders = JSON.parse(localStorage.getItem("orders"))

const area = document.querySelector("#root")

const btnAll =document.querySelector("#btnAll")
const btnComplete = document.querySelector("#btnComplete")
const btnFnished = document.querySelector("#btnFnished")



console.log(orders)


getOrders = () =>{

    for(let i = 0; i < orders.length ; i++)
    {
        //card
        const card = document.createElement("div")
        card.className="card mb-2"
        //styling
        card.style.color = "orange"
        card.style.backgroundColor = "black"
        card.style.borderColor = "aqua"
        card.style.borderBottomWidth = "2px"
    
        //header in card
        const  header = document.createElement("div")
        header.className = "card-header"
        header.textContent  = `ID : #${orders[i].id}`
        card.appendChild(header)
    
    
    
        //body
        const body = document.createElement("div")
        body.className = "card-body"
    
        //title in body
        const title = document.createElement("h5")
        title.className = "card-title"
        title.textContent = `Total $${orders[i].totalPrice}`
        body.appendChild(title)
    
             //hr in body
             const hr = document.createElement("hr")
             hr.style.backgroundColor = "aquamarine"
             body.appendChild(hr)
         
            for(let j = 0 ; j < orders[i].products.length ; j++)
            {
              //p = product in body
                const p = document.createElement("p")
                p.className = "card-text"
                p.innerHTML =  `<i  style = "color : orange;" class="fas fa-thumbtack"></i> ${orders[i].products[j]}`
               // console.log(p)

               
              //hr in body
              const hr = document.createElement("hr")
              hr.style.backgroundColor = "aquamarine"

                body.appendChild(p)
                body.appendChild(hr)
                
                
                
            }
    
            card.appendChild(body)



         //footer
        const footer = document.createElement("div")
        footer.className = "card-footer"

        //button
        const cmp = document.createElement("button")
        cmp.className = "btn btn-warning"
       
         
        if(orders[i].cmp  === true)
        {
          cmp.disabled = true;
          cmp.textContent = "Finished"
        }
        else{
          cmp.textContent = "Complete"
        }
        //button in footer
        footer.appendChild(cmp)
       
        // footer in card
        card.appendChild(footer)






              //card in area
        area.appendChild(card)  

    
        
           
            
    }



}

router = (e) =>{

  if(e.target.className === "btn btn-warning")
  {
     completeTheOrder(e)
  }

 


}


completeTheOrder = (e) =>{

   e.target.disabled = true;

   e.target.textContent = "Finished"

   //siparişi işaretleme kısmı 
   for(let i = 0; i < orders.length ; i++)
   {
    
    /*console.log(e.target.parentElement.parentElement.firstChild.textContent)
    console.log("ID : #" + orders[i].id) */
     if(("ID : #" + orders[i].id) ===  e.target.parentElement.parentElement.firstChild.textContent)
     { 
           
          orders[i].cmp = true;
       
      break;
     }
   }
   
   //update data
   localStorage.setItem("orders",JSON.stringify(orders))
}

document.addEventListener("click",router)


document.addEventListener("DOMContentLoaded",getOrders)





btnAll.addEventListener("click",()=> {
  
let all= area.children
console.log(all);
for (let i = 0; i < all.length; i++) {
all[i].style.display = "block"
  
}
  
})


btnComplete.addEventListener("click",()=> {
  
  let btnComplete= area.children
  console.log(btnComplete);
  for (let i = 0; i < btnComplete.length; i++) {
   if ( btnComplete[i].lastChild.firstChild.textContent === "Complete") {
     btnComplete[i].style.display="block"
   }else {
    btnComplete[i].style.display="none"
   }
    
  }
    
  })

  btnFnished.addEventListener("click",()=> {
  
    let btnFnished= area.children
    console.log(btnFnished);
    for (let i = 0; i < btnFnished.length; i++) {
     if ( btnFnished[i].lastChild.firstChild.textContent === "Finished") {
      btnFnished[i].style.display="block"
     }else {
      btnFnished[i].style.display="none"
     }
      
    }
      
    })








/*
<div class="card">
  <div class="card-header">
    Order ID
  </div>
  <div class="card-body">
    <h5 class="card-title">Total price</h5>
    <p class="card-text">product0</p>
     <p class="card-text">product1</p>
      <p class="card-text">product2</p>
      .
      .
      .
  </div>
  <div class="card-footer">
    <button class="btn btn-warning">Complete</button>
  </div>
</div>
*/



