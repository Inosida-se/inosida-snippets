
# Inosida Webfow Snippets

Snippets built to enhance sites built with webflow


## Page Search

```html
<script src="https://cdn.jsdelivr.net/gh/inosida-se/inosida-snippets/webflow/pageSearch.min.js" crossorigin="anonymous"></script>

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

