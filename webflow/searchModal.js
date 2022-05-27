class ItemGetter {
    constructor(sourceUrl, targetList = document, targetSelector, fields) {
        this.url = sourceUrl;
        this.targetList = targetList;
        this.targetSelector = targetSelector;
        this.fields = fields;
    }
    async getItems() {
        const response = await fetch(this.url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const list = doc.querySelector(this.targetList);
        const items = list.querySelectorAll(this.targetSelector);
        const itemData = [];
        items.forEach(item => {
            const itemDataObject = {};
            this.fields.forEach(field => {
                if (field === 'image') {
                    itemDataObject[field] = {
                        src: item.querySelector(`[data-${field}]`).getAttribute('src'),
                        alt: item.querySelector(`[data-${field}]`).getAttribute('alt')
                    }
                } else if (field === 'url') {
                    itemDataObject[field] = item.querySelector(`[data-${field}]`).getAttribute('href');
                } else if (field === 'price') {
                    let value = item.querySelector(`[data-${field}]`)?.getAttribute('data-' + field);
                    let priceString = value === "innerText" ? item.querySelector(`[data-${field}]`)?.innerText : value;
                    itemDataObject[field] = {
                        price: Number(priceString.replace(/\D/g,'')),
                        currency: priceString.replace(/[^a-zA-Z]/g,""),
                        text: priceString
                    }
                } else {
                    let value = item.querySelector(`[data-${field}]`)?.getAttribute('data-' + field);
                    itemDataObject[field] = value === "innerText" ? item.querySelector(`[data-${field}]`)?.innerText : value;
                }
            });
            itemData.push(itemDataObject);
        });
        return itemData;
    }
}

class Search {
    constructor(itemArray, searchList, searchTemplate, resultCount, resultLinkBlock, searchEmptyBlock, limit = 3) {
        this.itemArray = itemArray;
        this.searchList = typeof searchList === 'string' ? document.querySelector(searchList) : searchList;
        this.searchTemplate = typeof searchTemplate === 'string' ? document.querySelector(searchTemplate) : searchTemplate;
        this.resultCount = typeof resultCount === 'string' ? document.querySelector(resultCount) : resultCount;
        this.resultLinkBlock = typeof resultLinkBlock === 'string' ? document.querySelector(resultLinkBlock) : resultLinkBlock;
        this.searchEmptyBlock = typeof searchEmptyBlock === 'string' ? document.querySelector(searchEmptyBlock) : searchEmptyBlock;
        this.limit = limit;
        this.resultLinkBlock.style.display = 'none';
        this.searchEmptyBlock.style.display = 'none';
        this.searchTemplate.style.display = 'none';
    }
    search(searchValue) {
        const searchResults = [];
        this.itemArray.forEach(item => {
            const itemName = item.name.toLowerCase();
            if ((itemName.includes(searchValue.toLowerCase()) || searchValue === "") && searchResults.length < this.limit) {
                searchResults.push(item);
            }
        });
        this.appendItems(searchResults);
        this.updateResultCount(searchResults.length, searchValue);
    }
    appendItems(items) {
        const list =this.searchList;
        list.innerHTML = "";
        items.forEach(item => {
            const itemElement = this.searchTemplate.cloneNode(true);
            itemElement.style.display = '';
            Object.keys(item).forEach(key => {
                let dataElement;
                if (itemElement.getAttribute(`data-${key}`)) {
                    dataElement = itemElement
                } else {
                    dataElement = itemElement.querySelector(`[data-${key}]`);
                }
                if (dataElement) {
                    if (key === 'image') {
                        dataElement.setAttribute('src', item[key].src);
                        dataElement.setAttribute('alt', item[key].alt);
                    } else if (key === 'url') {
                        dataElement.setAttribute('href', item[key])
                    } else if (key === 'price') {
                        dataElement.innerText = item[key].text
                    } else {
                        dataElement.innerText = item[key]
                    }
                }
            });
            list.appendChild(itemElement);
        });
    }
    updateResultCount(numberOfResults, searchValue) {
        console.log(numberOfResults);
        if (numberOfResults > this.limit) {
            this.searchEmptyBlock.style.display = 'none';
            this.resultLinkBlock.style.display = '';
            this.resultCount.innerText = numberOfResults;
            this.resultLinkBlock.setAttribute('href', '/sok?q=' + searchValue);
        } else if (numberOfResults === 0) {
            this.resultLinkBlock.style.display = 'none';
            this.searchEmptyBlock.style.display = '';
        } else {
            this.resultLinkBlock.style.display = 'none';
            this.searchEmptyBlock.style.display = 'none';
        }
    }
}

class Modal {
    constructor(modalSelector, modalOpenSelector, modalOnOpen) {
        this.modalSelector = typeof modalSelector === 'string' ? document.querySelector(modalSelector) : modalSelector;
        this.modal = typeof modalSelector === 'string' ? document.querySelector(modalSelector) : modalSelector;
        this.modalOpen = typeof modalOpenSelector === 'string' ? document.querySelectorAll(modalOpenSelector) : modalOpenSelector;
        this.modalOnOpen = modalOnOpen;
        this.modalOpen.forEach(open => {
            open.addEventListener('click', () => {
                this.open();
            });
        });
    }
    open() {
        if (this.modalOnOpen) {
            this.modalOnOpen();
        }
    }
}


/* (async () => {
    const modal = new Modal('.global-search-wrapper', '.nav-search-button', async () => {
        console.log('Modal opened');
        if (!('searchArray' in window)) {
            const itemGetter = new ItemGetter('/sok', '[data-dynamic-content]', '[data-list-item]', ['name', 'price', 'image', 'url']);
            window.searchArray = await itemGetter.getItems();
            const search = new Search( window.searchArray, '.global-search-list', '.global-search-item', '.global-search-all-link-count', '.global-search-all-link', '.global-search-empty', 3);
            document.querySelector('.nav-search-input').addEventListener('keyup', (e) => {
                search.search(e.target.value);
            });
        }
    });
})();  */