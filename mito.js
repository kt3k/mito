/**
 * This is forked from John Resig's micro-templating function
 * http://ejohn.org/blog/javascript-micro-templating/
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
    return new Function('o,p', 'p=[];' +

        // Introduce the data as local variables using with(){}
        'with(o||p){' +

            // Convert the template into pure JavaScript
            ('%>' + str + '<%')

            [replace](/\s/g, ' ') // turns all whitespaces into 0x20

            [replace](/<%/g, '\t') // escapes open tag to \t

            [replace](/(%>[^\t]*)'/g, '$1\r') // escapes all single quotes in literal mode to \r

            [replace](/\t=(.*?)%>/g, '\',$1,\'') // non-greedy match of <%= ... %> pattern

            [replace](/\t/g, '\');')
            [replace](/%>/g, ';p.push(\'')

            [replace](/\r/g, '\\\'') + // restore single quotes

        '}' +

        'return p.join(\'\')')

}
