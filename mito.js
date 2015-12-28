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

            'p.push("' +

            // Convert the template into pure JavaScript
            str
            [replace](/[\r\t\n]/g, ' ')
            [replace](/<%/g, '\t')
            [replace](/((^|%>)[^\t]*)'/g, '$1\r')
            [replace](/\t=(.*?)%>/g, '",$1,"')
            [replace](/\t/g, '");')
            [replace](/%>/g, ';p.push("')
            [replace](/\r/g, '\\"') + '")' +

        '}' +

        'return p.join("")')

}
