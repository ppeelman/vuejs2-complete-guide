## Why choose Vue.js?

- Extremely lean and small (16kb minified and gzipped)
- Great runtime performance
- Feature-rich

## Installation

Using a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

Using NPM (recommended)

```
npm install vue
```

## The Vue instance

Every Vue application starts by creating a new Vue instance with the Vue function

```js
let vm = new Vue({
  // options
});
```

'vm' stands for ViewModel (inspired by **MVVM**: https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)

## Directives

```html
<div id="app">
  <input type="text" v-on:input="changeTitle" />
  <p>{{ title }}</p>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    title: 'Hello world'
  },
  methods: {
    changeTitle: function(event) {
      this.title = event.target.value;
    }
  }
});
```
