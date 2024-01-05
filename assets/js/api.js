const nav = document.querySelector('#nav')
const container = document.querySelector('#container')
const pageNumber = document.createElement('p')
pageNumber.classList.add('text-white')
let currentPage = 1

// Récupérer les données de l'api
async function getAllCharacters(
    url = 'https://rickandmortyapi.com/api/character'
) {
    try {
        const response = await fetch(url)
        const characters = await response.json()
        const results = characters.results

        createNav(
            characters.info.prev,
            characters.info.next,
            characters.info.pages
        )

        // Affiche les personnage sous forme grille
        container.innerHTML = ''
        results.forEach((result) => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
        <img src="${result.image}" alt="${result.name}" />
        <h2>${result.name}</h2>`
            container.appendChild(card)
        })
    } catch (error) {}
}

function createNav(prev, next, pages) {
    nav.innerHTML = ''
    if (prev) {
        nav.innerHTML += `<button type="button" id="prev-btn" class="absolute left-5" onclick="navBtnHandleClick('${prev}', ${
            currentPage - 1
        })"><</button>`
    }
    const pageSelect = createSelectElement(pages)
    // pageSelect.onchange = pageSelectHandleChange
    nav.append(pageSelect)
    pageNumber.innerHTML = `${currentPage}/${pages}`
    nav.append(pageNumber)
    if (next) {
        nav.innerHTML += `<button type="button" id="next-btn" class="absolute right-5" onclick="navBtnHandleClick('${next}', ${
            currentPage + 1
        })">></button>`
    }
}

function createSelectElement(pages) {
    const pageSelect = document.createElement('select')
    pageSelect.name = 'page-select'
    pageSelect.id = 'page-select'
    pageSelect.innerHTML = `
    <option value="">--Aller à--</option>`
    for (let i = 1; i < pages + 1; i++) {
        const option = document.createElement('option')
        option.value = i
        option.innerText = `page ${i}`
        pageSelect.append(option)
    }
    pageSelect.onchange = pageSelectHandleChange()

    return pageSelect
}

function pageSelectHandleChange() {
    console.log(this.value)
    if (this.value && this.value !== 'undefined') {
        currentPage = this.value
        getAllCharacters(
            `https://rickandmortyapi.com/api/character/?page=${this.value}`
        )
    }
}

function navBtnHandleClick(nextURL, nextPageNumber) {
    if (nextPageNumber > currentPage) {
        currentPage++
    } else {
        currentPage--
    }
    getAllCharacters(nextURL)
}

// function displayCharacters()

getAllCharacters()
