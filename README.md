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

## VueJS templates

Vue.js uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying Vue instance’s data.

The {{ }} syntax is called **interpolation** or **String interpolation**.
The double curly braces ({{ }}) is also called "Mustache" syntax.

The VueJS instance takes our 'HTML code', creates a template, renders the template and finally outputs the final HTML code that appears on the screen.

- Text interpolation

```html
<span>Message: {{ msg }}</span>
```

- JavaScript expressions

```html
<p>{{ sayHello() }}</p>
```

- Raw HTML

By default, VueJS escapes HTML.
So if you would assign HTML code to a variable within the Vue instance's data object + use the double curly braces syntax in your HTLM file, the HTML would be rendered as text instead.

Instead, you have to do the following:

```js
data: {
...
finishedLink: '<a href="http://www.google.com">Google</a>'
},
  methods: {
    ...
```

```
<p v-html="finishedLink"></p>
```

Be careful! This can expose you to cross-scripting attacks!!
If you know the source is clean, or you sanitized the HTML yourself, you can use this!

## Directives (bind element attributes)

We cannot use curly braces ({{ }}) in any HTML element attributes!
We can only use the curly brace syntax in places where we would put text.

```js
<a v-bind:href='link'>Google</a>
```

The v-bind attribute is called a **directive**. Directives are prefixed with v- to indicate that they are special attributes provided by Vue. It dynamically binds data to the DOM.. Here, it is saying “keep this element’s href attribute up-to-date with the link property on the Vue instance.

When you change a property within a method (eg. this.title = 'Hello'), all usages of 'title' get rerendered so they reflect the new value.

In order to keep the first value and not rerender when the value subsequently changes:

```html
<h1 v-once>{{ title }}</h1>
```

## Listening to events

We can use the **v-on** directive to listen to DOM events and run some JavaScript when they’re triggered.

```html
<div id="app">
  <button v-on:click="increase(2, $event)">Click me</button>
  <p>{{ counter }}</p>
</div>
```

```js
methods: {
    increase: function(step, event) {
      this.counter += step;
      console.log(event);
    }
```

## Event modifier

It is a very common need to call event.preventDefault() or event.stopPropagation() inside event handlers. Although we can do this easily inside methods, it would be better if the methods can be purely about data logic rather than having to deal with DOM event details.

```html
<!-- the click event's propagation will be stopped -->
<a v-on:click.stop="doThis"></a>
```

- **.stop**: event.stopPropagation()
- **.prevent**: event.preventDefault()
- **.capture**
- **.self**
- **.once**
- **.passive**

You can chain event modifiers!
