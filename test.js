'use strict'

var test = require('tape')
var mito = require('./')

test('basic templating', function (t) {
    t.plan(3)

    t.equal('foo', mito('foo')())
    t.equal('<h1>Foo</h1>', mito('<h1><%= title %></h1>')({title: 'Foo'}))
    t.equal('<p class="bar">Baz!</p>', mito('<p class="<%= cls %>">Baz!</p>')({cls: 'bar'}))
})

test('for statement', function (t) {
    t.plan(1)

    t.equal('235711', mito('<% items.forEach(function (item) { %><%= item %><% }) %>')({
        items: [2, 3, 5, 7, 11]
    }))
})

test('white spaces, all whitespaces become 0x20', function (t) {
    t.plan(4)

    t.equal(' ', mito('\t')())
    t.equal(' ', mito('\r')())
    t.equal(' ', mito('\n')())
    t.equal(' ', mito(' ')())
})

test('if it has a single quote', function (t) {
    t.plan(1)

    try {
        mito("<span class='fa-icon'></span>")
        t.assert(false)
    } catch (e) {
        t.assert(true, 'cannot handle single quote')
    }
})
