Custom Select JS Library

Welcome to my personal custom select library! This JavaScript library is designed to enhance the functionality and customization of HTML select elements in your projects. 



# Custom Select JS Library

# Overview

This JavaScript library provides a customizable solution for enhancing HTML elements.
```html
<select>
```
It allows you to create stylish, functional, and interactive custom select dropdowns with extensive styling options.


### Features
**Customizable Styles:** Style the placeholder, arrow, dropdown items, and more using a configuration object.

**Dynamic Updates:** Easily update the select options with new data.

### Event Handling
Supports interactions such as showing/hiding dropdowns and selecting items.

# Getting Started:

## Include the Library

Ensure that your custom select JS library is included in your project:

```javascript
<script src="https://cdn.jsdelivr.net/gh/usamadanbaiwa/myselect@main/code/myselect.min.js"></script>

```

## Create the HTML structure

You need to create a div element with the class c-select, which acts as a container for the custom select box. Inside this container, add a standard HTML select tag with option tags to define your choices.

**Here’s an example:**

```html
<div class="c-select" placeholder="Select an option">
    <select>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
    </select>
</div>
```

**Initialize the custom select** 

After creating the HTML structure, call the mySelect object and initialize it with your custom styles. The initialize method accepts a single object parameter, which allows you to customize the appearance and behavior of the custom select.

Here’s an example of how to initialize the custom select with style options:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    let myCustomSelect = new mySelect();
    
    const styleOptions = {
        arrow: {
            fill: 'gray', // Customize arrow color
            width: '20px', // Customize arrow width
            height: '20px', // Customize arrow height
        },
        onselect: {
            style: 'color: purple; font-weight: normal;' // Style for selected value
        },
        placeholder: {
            style: 'font-weight: bold;' // Customize placeholder style
        },
        select: {
            style: 'border-bottom: solid 1px #dfdfdf; padding: 15px 10px;' // Style for the select items
        }
    };
    
    myCustomSelect.initialize(styleOptions);
});

```

### Customize the placeholder and styles
 You can customize the placeholder, select, and arrow styles by modifying the styleOptions object passed to the initialize method.

**placeholder:** You can define the appearance of the placeholder using the placeholder object.
arrow: Customize the size, color, and appearance of the dropdown arrow using the arrow object.
onSelect: Use the onselect object to define styles for when a user selects an item from the list.


### Adding or updating the options dynamically
To update the select options dynamically, use the updateSelect method, which takes the id of the container and an array of new data:

```javascript
myCustomSelect.updateSelect('your-container-id', ['New Option 1', 'New Option 2', 'New Option 3']);

```

In this example, replace 'your-container-id' with the actual ID of the div.c-select element.

# Example in action
Here’s a full working example:

```html
<div id="select-container" class="c-select" placeholder="Choose a fruit">
    <select>
        <option value="Apple">Apple</option>
        <option value="Banana">Banana</option>
        <option value="Orange">Orange</option>
    </select>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    let myCustomSelect = new mySelect();
    
    const styleOptions = {
        arrow: {
            fill: 'blue',
            width: '15px',
            height: '15px',
        },
        onselect: {
            style: 'color: green; font-weight: bold;',
        },
        placeholder: {
            style: 'font-style: italic; color: gray;',
        },
        select: {
            style: 'padding: 10px; border-bottom: 1px solid #ccc;',
        }
    };
    
    myCustomSelect.initialize(styleOptions);
});
</script>

```
This is how you can customize the select box and integrate it into your webpage.


