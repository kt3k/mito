'use strict'

var test = require('tape')
var mito = require('./')

test('basic templating', function (t) {
    t.plan(3)

    t.equal(mito('foo')(), 'foo')
    t.equal(mito('<h1><%= title %></h1>')({title: 'Foo'}), '<h1>Foo</h1>')
    t.equal(mito('<p class="<%= cls %>">Baz!</p>')({cls: 'bar'}), '<p class="bar">Baz!</p>')
})

test('for statement', function (t) {
    t.plan(1)

    t.equal(mito('<% items.forEach(function (item) { %><%= item %><% }) %>')({
        items: [2, 3, 5, 7, 11]
    }), '235711')
})

test('white spaces', function (t) {
    t.plan(6)

    t.equal(mito(' ')(), ' ')
    t.equal(mito('\t')(), '\t')
    t.equal(mito('\r')(), '')
    t.equal(mito('\n')(), '')
    t.equal(mito('a\nb\rc')(), 'abc')
    t.equal(mito('\'\n\'\r\'')(), '\'\'\'')
})

test('single quote', function (t) {
    t.plan(2)

    t.equal(mito('<span class=\'<%= cls %>\'></span>')({cls: 'foo'}), '<span class=\'foo\'></span>')
    t.equal(mito('<span class=\'<%= \'foo\' %>\'></span>')(), '<span class=\'foo\'></span>')

    // note: This does not work
    // t.equal(mito('<span class=\'<%= \'foo\' + (1%2) %>\'></span>')(), '<span class=\'foo1\'></span>')
})
