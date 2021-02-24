export const searchMovieByTitle = (movie, searchValue) => {
    return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
}

export const makeBgActive = (movie) => {
    document.querySelector(`tr[data-id='${movie.id}']`).style.background = "#d7f0f7";
}

export const addCategories = (res, checkerType, name) => {
    const $yearFilterParentEl = document.querySelector('.year-form-check');
    const $genreFilterParentEl = document.querySelector('.genre-box');
    const $genreButton = document.querySelector('.genre-button')
    for (let val in res) {
        const $categoryContainer = document.createElement('div');
        $categoryContainer.className = "form-check";
        const $el = document.createElement('input');
        const $labelEl = document.createElement('label');
        $el.className = "form-check-input"
        $el.type = checkerType
        $el.name = name
        $el.id = val
        $el.value = val
        $labelEl.className = "form-check-label"
        $labelEl.for = "flexCheckDefault"
        $labelEl.innerText = `${val} (${res[val]})`;
        $categoryContainer.appendChild($el)
        $categoryContainer.appendChild($labelEl)
        if (checkerType === "radio") {
            $yearFilterParentEl.appendChild($categoryContainer)
        }
        else {
            $genreFilterParentEl.insertBefore($categoryContainer, $genreButton);
        }
    }
}

