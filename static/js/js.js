url = "/api/shoes";
console.log("js is here")
// function add_shoe(shoe){
//     let html='<div class="one product"><img src="static/images/example.jpg" class="img_product"><span class="type_product product_line">'+shoe["category"]+'"</span><span class="name_product product_line">'+shoe["title"]+'</span><span class="price_product product_line">'+shoe["price"]+'</span></div>';
//     console.log(document.getElementById("products"))
//     let parents=document.getElementById("products")
//     console.log(typeof(parents))
//     parents.innerHTML=html
    
// }
async function init(){
    let resp =  await fetch(url);
    let response = await resp.json();
    console.log(response);
    let html=""
    for(let i=0;i<response.length;i++){
        shoe=response[i]
        html+='<div class="one product"><img src="static/images/example.jpg" class="img_product"><span class="type_product product_line">'+shoe["category"]+'"</span><span class="name_product product_line">'+shoe["title"]+'</span><span class="price_product product_line">'+shoe["price"]+'</span></div>';
        
    }
    console.log(document.getElementById("products"))
    let parents=document.getElementById("products")
    console.log(typeof(parents))
    parents.innerHTML=html
}
init()