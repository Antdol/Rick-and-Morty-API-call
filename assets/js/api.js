const nav = document.querySelector('#nav')
const container = document.querySelector('#container')
const pageNumber = document.createElement('p')
pageNumber.classList.add('text-white')
let currentPage = 1

async function getAllCharacters(
    url = 'https://rickandmortyapi.com/api/character'
) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(response.status)
        }
        const characters = await response.json()

        createNav(
            characters.info.prev,
            characters.info.pages,
            characters.info.next
        )

        displayCharacters(characters.results)
    } catch (error) {
        console.log(error)
    }
}

function createNav(prev, pages, next) {
    nav.innerHTML = ''
    if (prev) {
        nav.innerHTML += `<button type="button" id="prev-btn" class="absolute left-5" onclick="navBtnHandleClick('${prev}', ${
            currentPage - 1
        })"><</button>`
    }
    nav.innerHTML += createSelectElement(pages)
    nav.innerHTML += pageNumber.innerHTML = `${currentPage}/${pages}`
    nav.append(pageNumber)
    if (next) {
        nav.innerHTML += `<button type="button" id="next-btn" class="absolute right-5" onclick="navBtnHandleClick('${next}', ${
            currentPage + 1
        })">></button>`
    }
}

function createSelectElement(pages) {
    let selectElement = `
    <select name="select-page" id="select-page" onchange="pageSelectHandleChange()">
        <option value="">--Aller à--</option>`
    for (let i = 1; i < pages + 1; i++) {
        selectElement += `
        <option value="${i}">${i}</option>`
    }
    return selectElement
}

function pageSelectHandleChange() {
    const selectPage = document.querySelector('#select-page')
    if (selectPage.value) {
        currentPage = selectPage.value
        getAllCharacters(
            `https://rickandmortyapi.com/api/character/?page=${selectPage.value}`
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

function displayCharacters(characters) {
    container.innerHTML = ''
    const cards = characters.map((character) => {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" />
        <h2>${character.name}</h2>`
        return card
    })
    container.append(...cards)
}

getAllCharacters()
