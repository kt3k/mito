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
 * @return {Function} Template function
 */
module.exports = function (str, replace) {
    /* eslint no-new-func: 0, no-unexpected-multiline: 0 */

    replace = 'replace'

    /**
     * Renders the given template parameter.
     *
     * @param {Object} o The template parameter
     * @param {String} [J=''] The string buffer (don't use)
     * @return {String} Rendered string
     */
    return Function('o,J',

        // Introduce the data as local variables using with(){}
        'with(o||{}){J=\'' +

            // Convert the template into pure JavaScript
            str

            // Escapes single quote, \r and \n in literal mode to the escape sequence
            // escaped \r and \n means line continuations
            [replace](/\n|\r|'(?![^%]*%>)/g, '\\$&')

            // Replaces <%= ... %> pattern, using non-greedy matching (.*?)
            [replace](/<%=(.*?)%>/g, '<%J+=$1%>')

            // Converts the opening and closing tags
            [replace](/<%/g, '\';')
            [replace](/%>/g, ';J+=\'') +

        '\'}' +

        'return J'

    )

}
