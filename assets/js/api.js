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
        if (!response.ok) {
            throw new Error(response.status)
        }
        const characters = await response.json()

        // createNav(
        //     characters.info.prev,
        //     characters.info.next,
        //     characters.info.pages
        // )
        const prev = characters.info.prev
        const next = characters.info.next
        const pages = characters.info.pages
        nav.innerHTML = ''
        if (prev) {
            nav.innerHTML += `<button type="button" id="prev-btn" class="absolute left-5" onclick="navBtnHandleClick('${prev}', ${
                currentPage - 1
            })"><</button>`
        }
        nav.innerHTML += `
        <select name="select-page" id="select-page" onchange="handleClick()">
            <option value="">--Aller à--</option>`
        const selectPage = document.querySelector('#select-page')
        for (let i = 1; i < pages + 1; i++) {
            selectPage.innerHTML += `
            <option value="${i}">${i}</option>`
        }
        pageNumber.innerHTML = `${currentPage}/${pages}`
        nav.append(pageNumber)
        if (next) {
            nav.innerHTML += `<button type="button" id="next-btn" class="absolute right-5" onclick="navBtnHandleClick('${next}', ${
                currentPage + 1
            })">></button>`
        }

        // Affiche les personnage sous forme grille
        displayCharacters(characters.results)
    } catch (error) {
        console.log(error)
    }
}

function handleClick(e) {
    console.log('hello')
}

// function createNav(prev, next, pages) {
//     nav.innerHTML = ''
//     if (prev) {
//         nav.innerHTML += `<button type="button" id="prev-btn" class="absolute left-5" onclick="navBtnHandleClick('${prev}', ${
//             currentPage - 1
//         })"><</button>`
//     }
//     const pageSelect = createSelectElement(pages)
//     pageSelect.innerHTML = `
//     <option value="">--Aller à--</option>`
//     for (let i = 1; i < pages + 1; i++) {
//         const option = document.createElement('option')
//         option.value = i
//         option.innerText = `page ${i}`
//         pageSelect.append(option)
//     }
//     nav.append(pageSelect)
//     console.log(pageSelect.onchange)
//     pageNumber.innerHTML = `${currentPage}/${pages}`
//     nav.append(pageNumber)
//     if (next) {
//         nav.innerHTML += `<button type="button" id="next-btn" class="absolute right-5" onclick="navBtnHandleClick('${next}', ${
//             currentPage + 1
//         })">></button>`
//     }
// }

// function createSelectElement(pages) {
//     pageSelect.innerHTML = `
//     <option value="">--Aller à--</option>`
//     for (let i = 1; i < pages + 1; i++) {
//         const option = document.createElement('option')
//         option.value = i
//         option.innerText = `page ${i}`
//         pageSelect.append(option)
//     }
//     // pageSelect.onchange = pageSelectHandleChange

//     return pageSelect
// }

// function pageSelectHandleChange() {
//     console.log('hello')
// }

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
