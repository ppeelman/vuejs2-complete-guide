Documentation: https://vuejs.org/v2/guide/

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

```html
<p v-html="finishedLink"></p>
```

Be careful! This can expose you to cross-scripting attacks!!
If you know the source is clean, or you sanitized the HTML yourself, you can use this!

You can enter valid JavaScript directly within the template:

```html
<button v-on:click="increase(2, $event)">Click me</button>
<button v-on:click="counter++">Click me</button>
<p>{{ counter * 2 > 10 ? 'Greater than 10' : 'Smaller than 10'}}</p>
```

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

Documentation: https://vuejs.org/v2/guide/events.html#Listening-to-Events

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

Documentation: https://vuejs.org/v2/guide/events.html#Event-Modifiers

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

## Key modifiers

Documentation: https://vuejs.org/v2/guide/events.html#Key-Modifiers

When listening for keyboard events, we often need to check for specific keys. Vue allows adding key modifiers for v-on when listening for key events.

```html
<input type="text" v-on:keyup.enter="alertMe" />
```

Key modifiers can also be chained!

```html
<input type="text" v-on:keyup.enter.space="alertMe" />
```

## Two-Way data binding

Documentation: https://vuejs.org/v2/guide/forms.html

You can use the **v-model** directive to create two-way data bindings on form input, textarea, and select elements. It automatically picks the correct way to update the element based on the input type. Although a bit magical, v-model is essentially syntax sugar for updating data on user input events, plus special care for some edge cases.

```html
<input type="text" v-model="name" />
<p>{{ name }}</p>
```

## Computed properties

Documentation: https://vuejs.org/v2/guide/computed.html#Computed-Properties

In-template expressions are very convenient, but they are meant for simple operations. Putting too much logic in your templates can make them bloated and hard to maintain.

Every _function_ in the **computed** object of the Vue instance can be used just as a property within the **data** object (so without brackets).

Difference with a function in the **methods**: for Computed properties, Vue analyzes the contents of the function in order to know what data properties the function is dependent on. A computed property will only re-evaluate when some of its reactive dependencies have changed. A method invocation will always run the function whenever a re-render happens (every time the DOM gets updated).

This also means the following computed property will never update, because Date.now() is not a reactive dependency:

```js
computed: {
  now: function () {
    return Date.now()
  }
}
```

**Why do we need caching?** Imagine we have an expensive computed property A, which requires looping through a huge Array and doing a lot of computations. Then we may have other computed properties that in turn depend on A. Without caching, we would be executing A’s getter many more times than necessary! In cases where you do not want caching, use a method instead.

Computed properties are by default **getter-only**, but you can also provide a **setter** when you need it:

```

```

Computed properties always need to run **synchronously**.

## Watch properties (watchers)

Documentation: https://vuejs.org/v2/guide/computed.html#Watchers

Execute code upon changes

In **computed properties** we set up the property and then, as a function (within the computed object, we set up the logic how this property should be computed.

In **watch properties**: as a key, I set up the property name I want to watch (has to match a data property) - then as a function, I specify the code I want to execute whenever the data property changes. Vue.js automatically passes the value of the upcoming change to this function. This allows to react to changes.

**Don't overuse watch properties! Its is often a better idea to use a computed property rather than an imperative watch callback.**

**Asynchronous actions**: this is most useful when you want to perform asynchronous or expensive operations in response to changing data.

## Shorthands

- **@click** is short for **v-on:click**
- **:href** is short for **v-bind:href**

## Dynamic styling with CSS Classes - class attribute

Documentation: https://vuejs.org/v2/guide/class-and-style.html

A common need for data binding is manipulating an element’s class list and its inline styles. Since they are both attributes, we can use v-bind to handle them: we only need to calculate a final string with our expressions. However, meddling with string concatenation is annoying and error-prone. For this reason, Vue provides special enhancements when v-bind is used with class and style. In addition to strings, the expressions can also evaluate to objects or arrays.

```html
<div id="app">
  <div
    class="demo"
    @click="attachRed = !attachRed"
    :class="{red: attachRed}"
  ></div>
  <div class="demo"></div>
  <div class="demo"></div>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    attachRed: false
  }
});
```

We can also bind to a **computed property** that returns an object.

```html
<div class="demo" @click="attachRed = !attachRed" :class="divClasses"></div>
```

```js
computed: {
    divClasses: function() {
      return {
        red: this.attachRed,
        blue: !this.attachRed
      };
    }
  }
```

We can pass an **array** to v-bind:class to apply a list of classes:

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

## Setting styles dynamically - style attribute

Documentation: https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles

The object syntax for v-bind:style is pretty straightforward - it looks almost like CSS, except it’s a JavaScript object. You can use either camelCase or kebab-case (use quotes with kebab-case) for the CSS property names:

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

It is often a good idea to bind to a style object directly so that the template is cleaner.

For the style and class attribute, you can combine the object and name syntax within an array!

## Conditional rendering
