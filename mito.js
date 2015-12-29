/**
 * This is forked from John Resig's micro-templating function
 * http://ejohn.org/blog/javascript-micro-templating/
 *
 * Also thanks to Neil Donewar's correction
 * http://ejohn.org/blog/javascript-micro-templating/#comment-321850
 *
 * Generate a reusable function that will serve as a template generator.
 *
 * @param {String} str The template string
 * @param {String} [replace='replace'] Don't use
 */
module.exports = function (str, replace) {
    /* eslint no-new-func: 0, no-unexpected-multiline: 0 */
    replace = 'replace'

    /**
     * Renders the given template parameter.
     *
     * @param {Object} o The template parameter
     * @param {Array} [p=[]] The string buffer (don't use)
     */
    return Function('o,J', 'J=\'\';' +

        // Introduce the data as local variables using with(){}
        'with(o||J){' +

            // Convert the template into pure JavaScript
            str

            [replace](/\n|\r|'(?![^%]*%>)/g, '\\$&') // escapes single quotes in literal mode to the escape sequence

            [replace](/<%=(.*?)%>/g, '<%J+=$1%>') // replaces <%= ... %> pattern, using non-greedy matching (.*?)

            [replace](/<%/g, '\';') // converts the opening tags
            [replace](/^|(%>)/g, ';J+=\'') + // converts the closing tags

        '\'}' +

        'return J')

}
