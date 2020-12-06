const singUpBtn = document.querySelector("#SPbtn")
const singInBtn =document.querySelector("#singin")


function validateForm(e) { // sign in
  // var un = document.getElementById("user").value;
  // var pw = document.getElementById("pass").value;
  var un = document.loginform.usr.value;
  var pw = document.loginform.pword.value;
  

  
  // var username = "username"; 
  // var password = "password";
  
  let users = JSON.parse(localStorage.getItem("zzz"));

  let find = false;

  for (let i = 0; i < users.length; i++) {
  
      if ((un == users[i].user) && (pw == users[i].pass)) {

          createAlert("success","Login was successful")

          setTimeout(()=>{
            window.location.replace("menu.html")
          },1000)
            
          find = true; // I founded
      
       
        
              }
  
  }

  
 
 
      // alert ("Login was unsuccessful, please check your username and password")
   if(!find)  // find == false
   {
    createAlert("danger","Please check your username and password");
   } 

   
    e.preventDefault()
    
  
}

function createAlert(type,msg)
{  
        place = document.getElementById("first")
        
        const alert = document.createElement("div")
        alert.className = `alert alert-${type}`
        alert.textContent = msg
        alert.role = "alert"

        //console.log(alert)
        place.appendChild(alert)

        setTimeout(function (){

        alert.remove()
        
        },3000) 


}


singUp =(e)=> {
                // sing up
                let user =document.getElementById("SPuser").value
                let pass = document.getElementById("SPpass").value
                let passR =document.getElementById("SPpassR").value
                let mail =document.getElementById("SPmail").value

                let info ={}

                info.user = user
                info.pass=pass
                info.mail =mail
                if (pass === passR) { //success
                        // alert("dsfadfa")
                        // localStorage.setItem("kkk", JSON.stringify(info));
                        let array;
                        if (localStorage.getItem("zzz")=== null) {
                        
                        array=[]
                        }else {
                        array = JSON.parse(localStorage.getItem("zzz"))
                        }
                        array.push(info)
                        localStorage.setItem("zzz", JSON.stringify(array))

                  


                        createAlert("success","Your registration was successful!")
                        // Your registration was successful!
                  

                }
                else {//invalid

                      
                    createAlert("danger","Invalid auth!")
                    e.preventDefault()

                }
              
              
}



singUpBtn.addEventListener("click", singUp);
singInBtn.addEventListener("click", validateForm);