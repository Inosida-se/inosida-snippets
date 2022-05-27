class Search {
    constructor(itemList, itemSelector) {
        this.itemList = typeof itemList === 'string' ? document.querySelector(itemList) : itemList;
        this.listItems = this.itemList.querySelectorAll(itemSelector);
        this.input = null;
    }
    search(query) {
        if (this.input) {
            this.input.value = query;
        }
        
        let filter, itemName, i, txtValue;
        filter = query.toUpperCase();
        for (i = 0; i < this.listItems.length; i++) {
            itemName = listItems[i].querySelector('[data-name="innerText"]');
            txtValue = itemName.textContent || itemName.innerText;

            if (filter === '' || txtValue.toUpperCase().indexOf(filter) > -1) {
                listItem[i].style.display = "";
            } else {
                listItem[i].style.display = "none";
            }
        }
    }
    addSearchInput(input) {
        this.input = typeof input === 'string' ? document.querySelector(input) : input;
        this.input.addEventListener('keyup', () => {
            search(this.input.value);
        });
    }
}

/* (() => {
    const query = new URLSearchParams(window.location.search).get('q');
    const search = new Search('.item-list', '.item');
    search.addSearchInput('#search');

    if (query) {
        search.search(query);
    }
})(); */