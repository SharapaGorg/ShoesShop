url = "/api/shoes";
let final_price=0;
console.log("js is here")
function create_bin_wrapper(imgSrc, category, title, price,id) {
    let wrapper = createElement("div", "bin_product")
    let image = createElement("img", "bin_img_product mx-auto")
    let category_ = createElement("span", "bin_cat_product ")
    let title_ = createElement("span", "text-3xl font-bold bin_title_product")
    let price_ = createElement("span", "bin_price_product text-2xl")
    image.src = imgSrc
    category_.innerText = category
    title_.innerText = title
    price_.innerText = price + ' rub'
    // wrapper.id=id
    let headersWrapper = createElement("div", "px-2 py-1")
    let imageWrapper = createElement("div", "img_product_wrapper_bin")

    imageWrapper.appendChild(image)

    wrapper.appendChild(imageWrapper)
    wrapper.appendChild(headersWrapper)

    headersWrapper.appendChild(title_)
    headersWrapper.innerHTML += '<br>'
    headersWrapper.appendChild(category_)
    headersWrapper.innerHTML += '<br>'
    headersWrapper.appendChild(price_)

    return wrapper}
// async function init(){
//     let resp =  await fetch(url);
//     let response = await resp.json();
//     console.log(response);
//     let html=""
//     for(let i=0;i<response.length;i++){
//         shoe=response[i]
//         html+='<div class="one product"><img src="static/images/example.jpg" class="img_product"><span class="type_product product_line">'+shoe["category"]+'"</span><span class="name_product product_line">'+shoe["title"]+'</span><span class="price_product product_line">'+shoe["price"]+'</span></div>';
        
//     }
//     console.log(document.getElementById("products"))
//     let parents=document.getElementById("products")
//     console.log(typeof(parents))
//     parents.innerHTML=html
// }
// init()
function products_change(elem){
    text=elem.text

}
document.getElementById("open_bin").onclick=function(){
    document.getElementById("bin").classList.toggle("hidden")
}
document.getElementById("open_registration").onclick=function(){
    document.getElementById("registration").classList.toggle("hidden")
}
async function add_to_bin(id){
    console.log("i am in")
    console.log(id)
    console.log(url)
    let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            id : id
        })
    });
    let bin=document.getElementById("chosen_products");
    let shoe=await resp.json();
    console.log(shoe[0],"shoe")
    shoe=shoe[0]
    let product = await create_bin_wrapper(shoe.img, shoe.category, shoe.title, shoe.price,shoe.id);
    bin.appendChild(product);
    final_price+=shoe.price
    document.getElementById("price").innerText=String(final_price)+"Р"
}
async function init(){
    await renderShoes();
    product=document.getElementsByClassName("product");
    console.log(product)
    for (let i=0;i<product.length;i++){
        console.log(i);
        product[i].onclick=function(){add_to_bin(product[i].id);}
}
}
init()
document.getElementById("close_bin").onclick=function(){ document.getElementById("bin").classList.toggle("hidden")}