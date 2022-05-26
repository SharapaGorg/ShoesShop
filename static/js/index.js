url = "/api/shoes"

async function render_shoes() {
    // render all shoes in  no-lazy mode
    let parents = document.getElementById("products")

    let resp = await fetch(url);
    let response = await resp.json();

    for (let i = 0; i < response.length; i++) {
        shoe = response[i]
        parents.innerHTML += '<div class="product"><img src="static/assets/example.jpg" class="img_product"><span class="type_product product_line">' + shoe["category"] + '"</span><span class="name_product product_line">' + shoe["title"] + '</span><span class="price_product product_line">' + shoe["price"] + '</span></div>';

    }
    let result = document.getElementById("result")
    result.innerText += " [" + response.length + "]"
}




render_shoes()