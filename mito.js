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

        // Introduces the data as local variables using with(){}
        'with(o||{}){J=\'' +

            // Converts the template into pure JavaScript
            str

            [replace](/\s/g, ' ')

            // Converts the opening tag to \0
            [replace](/<%/g, '\0')

            // Escapes single quote, \r and \n in literal mode to the escape sequence
            // (escaped \r and \n means line continuations, = empty)
            [replace](/'(?![^\0]*%>)/g, '\\$&')

            // Replaces <%= ... %> pattern, using non-greedy matching (.*?)
            [replace](/\0=(.*?)%>/g, '\0J+=$1%>')

            // Converts the opening and closing tags
            [replace](/\0/g, '\';')
            [replace](/%>/g, ';J+=\'') +

        '\'}' +

        'return J'

    )

}
