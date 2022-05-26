let search = document.getElementById('search')
let last = ""

function monitorValue() {
    if (last !== search.value) {
        // autosuggestions
        last = search.value
    }
}

function activateSearching(elem) {
    if(event.key === 'Enter') {
        // set input data globally
        localStorage.setItem('inputData', elem.value)
        // reset search field
        elem.value = ""
    }
}
setInterval(monitorValue, 500)