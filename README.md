
# Inosida Webfow Snippets

Snippets built to enhance sites built with webflow


## Page Search

```html
<script src="https://inosida-snippets.pages.dev/pageSearch.js" crossorigin="anonymous"></script>

<script>
(() => {
    const query = new URLSearchParams(window.location.search).get('q');
    const search = new PageSearch('[data-item-list]', '[data-list-item]');
    search.addSearchInput('[data-search-input]');
    search.addSearchLabel('[data-search-label]');

    if (query) {
        search.search(query);
    }
})();
</script>
```
## Filter and Sort

```html
<script src="https://inosida-snippets.pages.dev/filterAndSort.js" crossorigin="anonymous"></script>

<script>
(() => {
    const dynamicContent = document.querySelector('[data-dynamic-content]');
    const listFilter = document.querySelector('[data-filter-select]');
    const listSort = document.querySelector('[data-sort-list]');

    if (dynamicContent) {
        const listItemSelector = dynamicContent.getAttribute('data-list-item-selector');
        window.filterAndSort = new FilterAndSort(dynamicContent, listItemSelector);
    }

    if (listFilter && dynamicContent) {
        window.filterAndSort.addFilterInputs(listFilter, '[data-filter-input]', '[data-filter-list]', '[data-filter-label]');
    }

    if (listSort && dynamicContent) {
        window.filterAndSort.addSortInputs(listSort);
    }

})();
</script>
```
## Search Modal

```html
<script src="https://inosida-snippets.pages.dev/searchModal.js" crossorigin="anonymous"></script>

<script>
(async () => {
    const modal = new Modal('.global-search-wrapper', '.nav-search-button', async () => {
        if (!('searchArray' in window)) {
            const itemGetter = new ItemGetter('/sok', '[data-dynamic-content]', '[data-list-item]', ['name', 'price', 'image', 'url']);
            window.searchArray = await itemGetter.getItems();
            const search = new Search( window.searchArray, '.global-search-list', '.global-search-item', '.global-search-all-link-count', '.global-search-all-link', '.global-search-empty', 3);
            document.querySelector('.nav-search-input').addEventListener('keyup', (e) => {
                search.search(e.target.value);
            });
        }
    });
})();
</script>
```
## CMS Slider

```html
<script src="https://inosida-snippets.pages.dev/cmsSlider.js" crossorigin="anonymous"></script>
```
## Fade Modal

```html
<script src="https://inosida-snippets.pages.dev/fadeModal.js" crossorigin="anonymous"></script>
```

