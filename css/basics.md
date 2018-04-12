## Ways to Add CSS to a Page

### Inline

ex: `<body style='background-color: orange;'>`
+ Considered bad practice (no separation of content and presentation).
+ Lowest level of the CSS cascade - very specific - will override other styles applied to an element.

### Internal

ex: `<style>
        p {
            font-size: 20px;
        }
    </style>`
