let API = "/api/"


// MOUNTED
window.addEventListener('load', () => {
    //
});

// UTILS
function createElement(tagName, className) {
    let element = document.createElement(tagName)
    element.className = className

    return element
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1)
}

// BIN FORM
let binButton = window.document.getElementById('bin')
let binWrapper = document.getElementById('binWrapper')
let bin = document.getElementById('binForm')
let crossBin = document.getElementById('crossBin')
let binItems = document.getElementById("binList")

// show bin form
binButton.addEventListener("click", () => {
    binWrapper.style.display = 'block'
    bin.style.display = 'block'
})

// hide bin form
crossBin.addEventListener("click", () => {
    binWrapper.style.display = 'none'
    bin.style.display = 'none'
})

function getItem(imgSrc, title, price, id) {
    let itemWrapper = createElement("div", "bin-item grid grid-cols-2 justify-items-center")
    let imgWrapper = createElement("div", "bin-img-wrapper")
    let image = createElement("img", "bin-img mx-auto")
    let itemDescription = createElement("div", "bin-item-desc")
    let itemTitle = createElement("div", "bin-item-title text-center")
    let itemPrice = createElement("div", "bin-item-price text-center")
    let removeButton = createElement("div", "remove_from_bin px-2 mx-auto")

    image.src = imgSrc
    itemTitle.innerText = title
    itemPrice.innerText = price + ' rub'
    removeButton.innerText = 'remove -'

    imgWrapper.appendChild(image)
    
    itemDescription.appendChild(itemTitle)
    itemDescription.appendChild(itemPrice)
    itemDescription.appendChild(removeButton)

    itemWrapper.appendChild(imgWrapper)
    itemWrapper.appendChild(itemDescription)

    // remove item from bin
    removeButton.addEventListener("click", () => {
        itemWrapper.parentNode.removeChild(itemWrapper)
        let itemInList = document.getElementById(id)
        let addButton = itemInList.getElementsByClassName('add_to_bin')[0]

        addButton.classList.remove('added_to_bin')
        addButton.innerText = 'add +'
    })

    return itemWrapper
}

function addItemToBin(imageSrc, title, price, id) {
    let item = getItem(imageSrc, title, price, id)
    binItems.appendChild(item)
}

// SIDEBAR ACTIONS
let selectedCategory = 'all'

function resetColor() {
    let _categories = document.getElementsByClassName('category')

    for (let category of _categories) {
        if (category.innerText.toLowerCase() !== selectedCategory) {
            category.style.background = ''
            category.style.color = ''
        }
    }
}

function getCategory(title, id) {
    let wrapper = createElement("li", "px-4 py-1 cursor-pointer category font-bold")
    wrapper.innerText = title
    wrapper.id = id

    return wrapper
}

async function renderCategories() {
    let categoriesList = document.getElementById("categories")
    let request = await fetch(API + 'categories')
    let categories = await request.json()

    for (let category of categories) {
        let model = getCategory(category.title, category.id)
        categoriesList.appendChild(model)

        model.addEventListener("click", () => {
            selectedCategory = model.innerText.toLowerCase()
    
            renderShoes("all")
    
            model.style.background = 'rgb(247, 241, 241)'
            model.style.color = '#27a74d'
    
            resetColor()
        })
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


// FIGURE PRODUCT CELL
function getProduct(imgSrc, category, title, price, id) {
    let wrapper = createElement("div", "product")
    let image = createElement("img", "img_product mx-auto")
    let category_ = createElement("span", "cat_product ")
    let title_ = createElement("span", "text-3xl font-bold title_product")
    let price_ = createElement("span", "price_product text-2xl")
    let addToBin = createElement("div", "add_to_bin noselect")

    image.src = imgSrc
    category_.innerText = category
    title_.innerText = title
    price_.innerText = price + ' rub'
    addToBin.innerText = 'add +'

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

    wrapper.appendChild(addToBin)
    wrapper.id = id

    addToBin.addEventListener("click", () => {
        if (addToBin.innerText !== 'added') {
            addItemToBin(imgSrc, title, price, id)
        }

        addToBin.innerText = 'added'
        addToBin.classList.add('added_to_bin')
    })

    return wrapper
}

// RENDER PRODUCT LIST (no-lazy)
async function renderShoes(title) {
    let products = document.getElementById("products")
    products.innerHTML = ""

    let resp = await fetch(API + 'shoes', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            category: selectedCategory
        })
    })

    let response = await resp.json()

    let result = document.getElementById("result")
    result.innerText = capitalize(selectedCategory) + " - " + response.length + " results (" + title + ")"

    for (let i = 0; i < response.length; i++) {
        shoe = response[i]
        let base = "static/assets/example.jpg"

        const product = getProduct(shoe.img, shoe.category, shoe.title, shoe.price, shoe.id)

        products.appendChild(product)

    }
}

// AUTH MODAL WINDOW
let accountButton = window.document.getElementById("account")
let authWrapper = document.getElementById("authWrapper")
let authForm = document.getElementById("authForm")
let cross = document.getElementById("crossAuth")

// activate auth form
accountButton.addEventListener("click", () => {
    authWrapper.style.display = 'block'
    authForm.style.display = 'block'
})

// hide auth form
cross.addEventListener("click", () => {
    authWrapper.style.display = 'none'
    authForm.style.display = 'none'
})

// form switching
let signInButton = document.getElementById("signInButton")
let signUpButton = document.getElementById("signUpButton")
let signInContent = document.getElementById("signIn")
let signUpContent = document.getElementById("signUp")

// show sign-in form
signInButton.addEventListener("click", () => {
    signInContent.style.display = 'block'
    signUpContent.style.display = 'none'

    signInButton.classList.add('activated-switcher')
    signUpButton.classList.remove('activated-switcher')
})

// show sign-up form
signUpButton.addEventListener("click", () => {
    signInContent.style.display = 'none'
    signUpContent.style.display = 'block'

    signUpButton.classList.add('activated-switcher')
    signInButton.classList.remove('activated-switcher')
})

// SIGN IN | SIGN UP
let signIn = document.getElementById('authorize')
let signUp = document.getElementById('register')

// sign in
signIn.addEventListener("click", () => {
    //
})

// sign up
signUp.addEventListener("click", () => {
    //
})

renderCategories()
renderShoes('all')
// monitor search field
setInterval(getSearchData, 500)