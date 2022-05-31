
# Inosida Webfow Snippets

Snippets built to enhance sites built with webflow


## Page Search

```html
<script src="https://cdn.jsdelivr.net/gh/inosida-se/inosida-snippets/webflow/fadeModal.js" crossorigin="anonymous"></script>

<script>
(() => {
    const query = new URLSearchParams(window.location.search).get('q');
    const search = new Search('.item-list', '.item');
    search.addSearchInput('#search');
    search.addSearchLabel('#searchLabel');

    if (query) {
        search.search(query);
    }
})();
</script>
```

