const menu = [
    {
        id: 1,
        title: "Butter milkpancake",
        category: "Breakfast",
        price: 15,
        img: "../img/menu-items.jpeg",
        desc:
            "Lorem ipsum dolor, sit am. Laborum adipisci voluptatibus facere in qui non nemo doloribus pariatur placeat accusamus!",
    },
    {
        id: 2,
        title: "Lunch",
        category: "Breakfast",
        price: 20,
        img: "../img/menu-item2.jpeg",
        desc:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adi facere in qui non nemo doloribus pariatur placeat accusamus!",
    },
    {
        id: 3,
        title: "Lunch 2",
        category: "lunch",
        price: 16,
        img: "../img/menu-item3.jpeg",
        desc:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci voluptatibus facere in qui non nemo atur placeat accusamus!",
    },

    {
        id: 4,
        title: "Lunch 3",
        category: "lunch",
        price: 22,
        img: "../img/menu-item4.jpeg",
        desc:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci voluptatibus facere in qui non nemo doloribus pariatur placeat accusamus!",
    },

    {
        id: 5,
        title: "Lunch 4 ",
        category: "lunch",
        price: 25,
        img: "../img/menu-item5.jpeg",
        desc:
            "Lorem ipsum dolor, sit amet coicing elit. Laborum adipisci voluptatibus facere in qui non nemo doloribus pariatur placeat accusamus!",
    },
    {
        id: 6,
        title: "dessert",
        category: "dessert",
        price: 22,
        img: "../img/menu-item6.jpeg",
        desc: "Lorem ipsum dolor, sit amet  pariatur placeat accusamus!",
    },
    {
        id: 7,
        title: "dessert 3",
        category: "dessert",
        price: 17,
        img: "../img/menu-item7.jpeg",
        desc:
            "Lorem ipsum dolor, sit ametaborum adipisci voluptatibus facere in qui non nemo doloribus pariatur placeat accusamus!",
    },
    {
        id: 8,
        title: "Lunch 5",
        category: "dessert",
        price: 16,
        img: "../img/menu-item8.jpeg",
        desc:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lab non nemo doloribus pariatur placeat accusamus!",
    },
];
// console.log(menu[0].desc);

const setionCenter = document.querySelector(".section-center");

const container = document.querySelector(".btn-container");
// console.log(filterBtn);
const cart = document.querySelector("#pro-area");
// const totalPrice =document.querySelector("#total-prc")
const tp = document.querySelector("#tp");

//have no product yazısı
const noContent = document.querySelector("#no-content")


// filterBtn.forEach(function (btn) {
//     btn.addEventListener("click",function (e) {
//         console.log(e.currentTarget.dataset.id);

//     })
// })

window.addEventListener("DOMContentLoaded", function () {
    displayMenuItem(menu);
    displayMenuButtons();
});

function displayMenuItem(menuItem) {
    let displayMenu = menuItem.map((item) => {
        // console.log(item);
        return `<article class="menu-item">
        <img src=${item.img} alt=${item.title}  class="photo">
        
        <div class="item-info">
        <header>
            <h4>${item.title} </h4>
            <h4 class="price">$${item.price} </h4>
        </header>
        <p class="item-text">${item.desc}</p>
        <button class="filter-btn zxc" type="button" data-id="btn-slect ">Add to Cart</button>
        </div>
        </article>
        `;
    });
    displayMenu = displayMenu.join("");
    // console.log(displayMenu);
    setionCenter.innerHTML = displayMenu;
}

function displayMenuButtons() {
    const categories = menu.reduce(
        function (values, item) {
            if (!values.includes(item.category)) {
                values.push(item.category);
            }
            return values;
        },
        ["All"]
    );
    const categoryBtns = categories
        .map(function (category) {
            return ` <button class="filter-btn" type="button"  data-id=${category}>${category}</button>`;
        })
        .join("");

    container.innerHTML = categoryBtns;

    const filterBtn = document.querySelectorAll(".filter-btn");
    filterBtn.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const category = e.currentTarget.dataset.id;
            const menuCategory = menu.filter(function (menuItem) {
                // console.log(menuItem.category);
                if (menuItem.category === category) {
                    return menuItem;
                }
            });
            // console.log(menuCategory);
            if (category === "All") {
                displayMenuItem(menu);
            } else {
                displayMenuItem(menuCategory);
            }
        });
    });

}

addProductInCart = (e) => {
    //btn =  Add to Cart butonu  sana kolay kullanmk için yaptım
    let btn = e.target;
    let [title, price] = [...btn.previousElementSibling.previousElementSibling.children];
    console.log(title, price);





    if(cart.children.length == 1) // YANİ HİÇ ÜRÜN YOK İSE yani bölege sadece no have products yazısı var ise
    {
        cart.firstElementChild.style.display = "none"
    } 

    const template = document.createElement("div")
    template.className = "d-flex flex-row bd-highlight mb-3" 
    const icon = document.createElement("i")
    icon.className = "far fa-trash-alt"
    icon.style.cursor = "pointer"
    icon.style.marginTop = "5px"
    icon.style.marginLeft = "15px"

    title.style.marginRight = "20px"

    template.appendChild(title)
    template.appendChild(price)
    template.appendChild(icon)

    cart.appendChild(template)

    let totalPrice = Number(tp.textContent);
    let productPrice = Number(price.textContent.slice(1))
    totalPrice += productPrice;
    tp.textContent = totalPrice;









    displayMenuItem(menu)
};

router = (e) => {
    if (e.target.className == "filter-btn zxc") {
        // add cart butonuna tıklanmış ise
        // sepete ekle metodu
        addProductInCart(e);
    }  
    else if(e.target.className == "far fa-trash-alt"){
        removeItem(e)
    }
    else if (e.target.id == "chc-out")
    {
        saveOrder(e);

    }
        
    };



    // check out butonuna basılınca
saveOrder = (e) =>{

    let order = {}

    let elements = Array.from(cart.children)

  

    

    //console.log(elements)
    for(let i = 0; i<elements.length ;i++)
    {
       // console.log(elements[i].textContent)
        elements[i] = elements[i].textContent;
    }
    elements = elements.slice(1) // bunu yapmamızın sebi have no product yazısını almamak



    order.elements = elements
    
    order.totalPrice = tp.textContent  // string

    if(order.totalPrice === "0") // sepette hiç ürün yok ise
    {
       
        //create alert
            const div = document.createElement("div")
            div.className = "alert alert-danger"
            div.role = "alert"
            div.textContent = "Your cart is empty please add some product !!"

                cart.appendChild(div)
              
            setTimeout(
                ()=>{
                    div.remove()
                },2000)
    }
    else{
     
        localStorage.setItem("ttt", JSON.stringify(order));
        location.href = "check-out.html"
    }

  //  console.log(order)
    
   
    


   //e.preventDefault()


}

removeItem = (e)=> {
   //e.target = silme iconu
   e.target.parentNode.remove()

   // console.log(e.target.parentNode)


    const productPrice = e.target.previousElementSibling.textContent.slice(1)

console.log(productPrice);

   let totalPrice = tp.textContent

   totalPrice =  Number(totalPrice) - Number(productPrice)
    
   //eğer total price 0 ise içinde hiç ürün yoktur sepetin o yüzden have no product yazısı gelmeli
   
   if(totalPrice === 0)
   {
       noContent.style.display = "block"
   }
   else{ // yani ürün varsa içinde 
       noContent.style.display = "none"
   }


   tp.textContent = totalPrice
}


document.addEventListener("click", router);
