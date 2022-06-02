class FilterAndSort {
    constructor(itemList, itemSelector) {
        this.itemList = typeof itemList === 'string' ? document.querySelector(itemList) : itemList;
        this.itemSelector = itemSelector;
        this.currentFilter = [];
    }
    filter(filterValue, on) {
        // if the filter is on, add the filter to the current filter array
        // else remove the filter from the current filter array
        if (on === true) {
            this.currentFilter.push(filterValue);
        } else if (on === false) {
            this.currentFilter.splice(this.currentFilter.indexOf(filterValue), 1);
        } else {
            this.currentFilter = [];
        }

        const filteredItems = [];
        this.itemList.querySelectorAll(this.itemSelector).forEach(item => {
            item.style.display = 'none';
            if (this.currentFilter.length === 0) {
                filteredItems.push(item);
            } else {
                this.currentFilter.forEach(filter => {
                    if (item.querySelector(`[data-filter*="${filter}"]`)) {
                        filteredItems.push(item);
                    }
                });
            }
        });

        filteredItems.forEach(item => {
            item.style.display = "";
        });
    }
    sort(sortValue, sortOrder) {
        const sortedItems = [];
        this.itemList.querySelectorAll(this.itemSelector).forEach(item => {
            sortedItems.push(item);
        });
        sortedItems.sort((a, b) => {
            let aValue = a.querySelector(`[data-sort-${sortValue}]`).getAttribute('data-sort-' + sortValue);
            aValue = aValue === "innerText" ? a.querySelector(`[data-sort-${sortValue}]`).innerText : aValue;
            let bValue = b.querySelector(`[data-sort-${sortValue}]`).getAttribute('data-sort-' + sortValue);
            bValue = bValue === "innerText" ? b.querySelector(`[data-sort-${sortValue}]`).innerText : bValue;
            if (sortValue === 'price') {
                aValue = Number(aValue.replace(/\D/g,''));
                bValue = Number(bValue.replace(/\D/g,''));
            }
            if (!!(Number(aValue) && Number(bValue))) {
                return sortOrder === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
            } else if ( new Date(aValue) != "Invalid Date" && new Date(bValue) != "Invalid Date") {
                return sortOrder === 'asc' ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
            } else {
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        });
        this.itemList.innerHTML = "";
        sortedItems.forEach(item => {
            this.itemList.appendChild(item);
        });
    }
    addFilterInputs(filterInput, filterInputTemplate, filterInputList, filterInputLabel) {
        filterInput = typeof filterInput === 'string' ? document.querySelector(filterInput) : filterInput;
        filterInputList = typeof filterInputList === 'string' ? document.querySelector(filterInputList) : filterInputList;
        filterInputLabel = typeof filterInputLabel === 'string' ? document.querySelector(filterInputLabel) : filterInputLabel;

        let filters = [];
        this.itemList.querySelectorAll(this.itemSelector).forEach(item => {
            const itemFilters = item.querySelectorAll('[data-filter]');
            itemFilters.forEach(filter => {
                let filterValue = filter.getAttribute('data-filter').split(',');
                filterValue.forEach(value => {
                    if (!filters.includes(value)) {
                        filters.push(value);
                    }
                });
            });
        });
        
        let filterInputs = [];
        filters.forEach(filter => {
            const filterElement = filterInput.querySelector(filterInputTemplate).cloneNode(true);
            filterElement.querySelector('.w-form-label').innerText = filter;
            filterElement.setAttribute('data-value', filter);
            filterInputs.push(filterElement);
        });
        filterInputList.innerHTML = "";
        filterInputs.forEach(input => {
            filterInputList.appendChild(input);
            input.querySelector('input[type="checkbox"]').addEventListener('change', () => {
                if (input.querySelector('input[type="checkbox"]').checked) {
                    this.filter(input.getAttribute('data-value'), true);
                } else {
                    this.filter(input.getAttribute('data-value'), false);
                }
                let labelText = "";
                filterInputs.forEach(input => {
                    if (input.querySelector('input[type="checkbox"]').checked) {
                        labelText += input.querySelector('.w-form-label').innerText + ", ";
                    }
                });
                filterInputLabel.innerText = labelText === "" ? filterInputLabel.getAttribute('data-default-text') || "Filter" : labelText.substring(0, labelText.length - 2);
            });
        });
    }
    addSortInputs(sortInput) {
        sortInput = typeof sortInput === 'string' ? document.querySelector(sortInput) : sortInput;
        let sortInputChildren = sortInput.querySelectorAll('a');
        sortInputChildren.forEach(child => {
            child.addEventListener('click', () => {
                sortInputChildren.forEach(child => {
                    child.classList.remove('active');
                });
                child.classList.add('active');
                this.sort(child.getAttribute('data-sort'), child.getAttribute('data-sort-order'));
            });
        });
    }
}