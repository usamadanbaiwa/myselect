let mySelect = (() => {
    'use strict';
    class ElementITems {
        constructor() {

        }

        arrowIcon(conf = {}) {
            const width = conf.width || '20px';
            const height = conf.height || '20px';
            const fill = conf.fill || 'black';

            let arrow = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 24 24"><path fill="' + fill + '" d="m7 10l5 5l5-5z"/></svg>';
            return arrow;
        }


    }

    class CustomSelect extends ElementITems {
        constructor() {
            //call the super class
            super()
            this.customSelectElements = document.querySelectorAll('.c-select');

            // Selection list parent class
            this.selectListContainerClass = 'c-select-list';
            // Selection list items
            this.selectListListItemsClass = 'c-select-list-item';

            this.randomClass = [];
            //is select list show
            this.isSelectShow = false;
            // the styles
            this.customStyle = {};
        }
        initialize(conf = {}) {
            this.customStyle = conf;
            //add the placeholder to all elements
            this.addPlaceHolder();
            //add all the arrow
            this.addListArrow(this.customStyle.arrow);
            // add the random id 
            this.addRandomClass();
            // Add the selections
            this.addSelectList();
            this.showOnClick();
        }

        // update the select
        updateSelect(id, data = []) {
            const selectContainer = document.getElementById(id);
            // query the select
            const select = selectContainer.querySelector('select');

            // get the list
            const selectList = selectContainer.querySelector('.c-select-list');
            const containerClass = selectContainer.getAttribute('containerClassId');

            //reset the select

            if (selectContainer && select && selectList) {
                // reset the selectlist 
                selectList.innerHTML = '';
                select.innerHTML = '';
                if (data.length > 0) {
                    data.forEach((v) => {
                        const selectStyle = this.customStyle.select || {};
                        selectStyle.pContainer = containerClass;
                        selectStyle.selectValue = v;

                        this.createNewElement('option', select, v);

                        this.createNewElement('div', selectList, v, [this.selectListListItemsClass], selectStyle);
                    });
                }
                this.addChoiceItems(this.validateElement('#' + id));
            }
        }

        addSelectList() {
            if (this.customSelectElements.length > 0) {
                this.customSelectElements.forEach((e) => {
                    // Get parent c-select div width
                    const ParentWidth = e.offsetWidth;
                    // Add the random class and from container class id
                    const randomClass = e.getAttribute('containerClassId');
                    // Check if there is select element tag in the 
                    // c-select div
                    const getSelect = e.querySelector('select');
                    if (getSelect) {
                        const getOptions = e.querySelectorAll('select option');
                        if (getOptions.length > 0) {
                            // Create the parent element for the
                            // Selection list parent
                            this.createNewElement('div', e, '', [this.selectListContainerClass], {
                                'style': 'width:' + ParentWidth + 'px'
                            });

                            // Query the c-select-list
                            const cSelectClass = e.querySelector('.' + this.selectListContainerClass);

                            // Iterate on all the select options
                            getOptions.forEach((option) => {
                                // get the style
                                const style = this.customStyle.select || {};
                                const selectListStyle = Object.assign(style, {
                                    pContainer: randomClass,
                                    selectValue: option.value,
                                })
                                // add the options
                                this.createNewElement('div', cSelectClass, option.value, [this.selectListListItemsClass], selectListStyle);
                            });

                        } else {
                            // User has not add any option in the select
                            // element tag
                        }
                    } else {
                        // The select element tag has not bind found
                    }
                });
            }
        }
        addChoiceItems(selectedParent) {
            if (this.customSelectElements.length > 0) {
                const allItems = selectedParent.querySelectorAll('.' + this.selectListListItemsClass);

                let getValue = (e) => {
                    const containerClass = e.target.getAttribute('pContainer');
                    const selectedValue = e.target.getAttribute('selectValue');

                    //query the container
                    const containerQuery = document.querySelector('.' + containerClass);
                    //update the placeholder
                    this.updatePlaceholder(containerQuery, selectedValue)

                    //query the select tag
                    const selectTag = containerQuery.querySelector('select');
                    selectTag.value = selectedValue;
                }

                if (allItems.length > 0) {
                    allItems.forEach((i) => {
                        i.addEventListener('click', getValue);
                    });

                }

            }
        }
        //update placeholder
        updatePlaceholder(el, value) {
            const getEl = this.validateElement(el);
            //update the element placeholder
            getEl.setAttribute('placeholder', value);
            //queryt the placeholder and put it
            const placeholder = getEl.querySelector('.placeholder')
            const getStyle = this.customStyle.onselect || {};
            // if value to update is not empty string
            if (value.trim() !== "") {
                placeholder.innerHTML = '';
                this.createNewElement('div', placeholder, value, [], getStyle);
            }
        }
        /**
         * show selected list
         */
        showOnClick() {
            if (this.customSelectElements.length > 0) {
                this.customSelectElements.forEach((e) => {
                    // select container
                    // c-select-list
                    const selectListContainer = e.querySelector('.' + this.selectListContainerClass);

                    if (selectListContainer) {
                        e.addEventListener('click', (event) => {
                            this.hideAllSelectionList();
                            // check the target that get clicked
                            if (event.target === e || event.target.matches('svg') || event.target.matches('path') || event.target.matches('.placeholder') || event.target.matches('.arrow-down')) {
                                // stop the propagation on the target
                                event.stopPropagation();
                            }
                            // check if the selected element is already clicked from the 
                            // isSelectShow string
                            if (this.isSelectShow !== e.getAttribute('containerClassId')) {
                                selectListContainer.style.display = 'block'
                                this.isSelectShow = e.getAttribute('containerClassId');

                                // rotate the arrow when the list is show
                                const getArrow = e.querySelector('.arrow-down');
                                this.rotateArrow(getArrow);

                                document.addEventListener('click', () => {
                                    this.hideAllSelectionList();
                                });
                            } else {
                                this.isSelectShow = 'nothing';
                                this.hideAllSelectionList();
                            }
                        });
                        this.addChoiceItems(e)
                    }
                });
            }

        }
        //rotate the arrow
        rotateArrow(el, action = 'deg') {
            const getEl = this.validateElement(el);
            if (action === 'deg') {
                getEl.classList.add('arrow-rotate');
            } else {
                getEl.classList.remove('arrow-rotate');
            }
        }

        // Hide all the selection list of a item parent
        hideAllSelectionList() {
            if (this.customSelectElements.length > 0) {
                this.customSelectElements.forEach((e) => {
                    const allSelectList = e.querySelectorAll('.' + this.selectListContainerClass);
                    //get the arrow
                    const allArrow = e.querySelectorAll('.arrow-down');
                    if (allSelectList.length > 0) {
                        allSelectList.forEach((list) => {
                            list.style.display = 'none'
                        });
                    }
                    allArrow.forEach((ar) => {
                        this.rotateArrow(ar, 'normal')
                    })

                });
            }
        }
        addRandomClass() {
            if (this.customSelectElements.length > 0) {
                this.customSelectElements.forEach((e) => {
                    // get the length of the random id
                    const getLength = parseInt(this.randomClass.length) + 1;
                    const createdId = 'cSelect-' + getLength;
                    e.classList.add(createdId);
                    e.setAttribute('containerClassId', createdId);
                    this.randomClass.push(createdId);
                });
            }

        }
        /**
         * add the placeholder to it
         */
        addPlaceHolder() {
            if (this.customSelectElements.length > 0) {
                this.customSelectElements.forEach((el) => {
                    // Get the Placeholder
                    const getPlaceholder = el.getAttribute('placeholder');
                    // get the placeholder style
                    const placeholderStyle = this.customStyle.placeholder || {};

                    this.createNewElement('div', el, getPlaceholder, ['placeholder'], placeholderStyle);
                    // console.log(getPlaceholder);
                });
            }
        }
        /**
         *add list arrow in all the c-select class
         *
         * @memberof CustomSelect
         */
        addListArrow(conf) {
            let arrow = conf || {};

            if (this.customSelectElements.length > 0) {
                this.customSelectElements.forEach((el) => {
                    this.createNewElement('div', el, this.arrowIcon(arrow), ['arrow-down'], arrow);
                });
            } else {
                /** 
                //Pass
                //No any custom element has been found
                 */
            }
        }
        /**
         * Create new element and add the needed value to it
         * @param {element type to create} eType 
         * @param {element to append the create element to} appendTo 
         * @param {value of the create element} eValue 
         * @param {class list of the created element} eClass 
         */
        createNewElement(eType, appendTo, eValue, eClass = [], attributes = {}) {
            //Create the element
            const cElement = document.createElement(eType);
            //add the class
            if (eClass.length > 0) {
                eClass.forEach(c => {
                    cElement.classList.add(c);
                });
            }
            // add the value
            cElement.innerHTML = eValue;
            //get the attribute keys
            const attributeKeys = Object.keys(attributes);
            attributeKeys.forEach((key) => {
                cElement.setAttribute(key, attributes[key])
            });
            // append the element
            const valided = this.validateElement(appendTo);

            valided.appendChild(cElement);

        }
        // validate an element if it was queried element or element class || element html object
        validateElement(el) {
            if (typeof el === 'string') {
                // if element to validated is string not htmlelement object so query the element 
                const element = document.querySelector(el);
                // return the element htmlobject
                return element;
            } else if (Array.isArray(el)) {
                // if the (el) is array, it mean it is not more than 1 element 

                // store the element htmlobject after validated in the loop
                let elObject = [];
                for (let i = 0; i < el.length; i++) {
                    if (typeof (el[i]) === 'object') {
                        // this mean it is html object element so add it to the elObject
                        elObject.push(el[i]);
                    } else {
                        // element is string so query the element html object
                        const cEl = document.querySelector(el[i]);
                        elObject.push(cEl);
                    }
                }
                const elements = elObject;
                return elements;
            } else {
                return el;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {

        //  let call = new CustomSelect()
        const option = {
            arrow: {
                fill: 'gray',
                style: {

                }
            },
            onselect: {
                style: 'color: purple;font-weight: normal'
            },
            placeholder: {
                style: 'font-weight: bold'
            },
            select: {
                style: 'border-bottom: solid 1px #dfdfdf;padding: 15px 10px'
            }
        }
    });
    return CustomSelect;

})();
