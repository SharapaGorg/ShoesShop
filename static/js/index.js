url = "/api/shoes"


// SIDEBAR ACTIONS
let selectedCategory = 'all'
let categories = document.getElementsByClassName('category')

function resetColor() {
    for (let category of categories) {
        if (category.innerText.toLowerCase() !== selectedCategory) {
            category.style.background = ''
            category.style.color = ''
        }
    }
}

let lastInputData = localStorage.getItem('inputData')

function getSearchData() {
    let inputData = localStorage.getItem('inputData')

    if (inputData !== lastInputData) {
        renderShoes(inputData)

        lastInputData = inputData
    }
}

for (let category of categories) {
    category.addEventListener("click", () => {
        selectedCategory = category.innerText.toLowerCase()

        renderShoes()

        category.style.background = 'rgb(247, 241, 241)'
        category.style.color = '#27a74d'

        resetColor()
    })
}

function createElement(tagName, className) {
    let element = document.createElement(tagName)
    element.className = className

    return element
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1)
}


// FIGURE PRODUCT CELL
function getProduct(imgSrc, category, title, price) {
    let wrapper = createElement("div", "product")
    let image = createElement("img", "img_product mx-auto")
    let category_ = createElement("span", "cat_product ")
    let title_ = createElement("span", "text-3xl font-bold title_product")
    let price_ = createElement("span", "price_product text-2xl")

    image.src = imgSrc
    category_.innerText = category
    title_.innerText = title
    price_.innerText = price + ' rub'

    let headersWrapper = createElement("div", "px-2 py-1")
    let imageWrapper = createElement("div", "img_product_wrapper")

    imageWrapper.appendChild(image)

    wrapper.appendChild(imageWrapper)
    wrapper.appendChild(headersWrapper)

    headersWrapper.appendChild(title_)
    headersWrapper.innerHTML += '<br>'
    headersWrapper.appendChild(category_)
    headersWrapper.innerHTML += '<br>'
    headersWrapper.appendChild(price_)

    return wrapper
}

// RENDER PRODUCT LIST (no-lazy)
async function renderShoes(title) {
    let products = document.getElementById("products")
    products.innerHTML = ""

    let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title : title,
            category: selectedCategory
        })
    });

    let response = await resp.json();

    let result = document.getElementById("result")
    result.innerText = capitalize(selectedCategory) + " - " + response.length + " results"

    for (let i = 0; i < response.length; i++) {
        shoe = response[i]
        let base = "static/assets/example.jpg"

        const product = getProduct(shoe.img, shoe.category, shoe.title, shoe.price)
        products.appendChild(product)

    }
}


renderShoes('all')
// monitor search field
setInterval(getSearchData, 500)