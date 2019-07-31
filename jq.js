(function () {
    var jQuery = function (selector) {
        return new jQuery.fn.init(selector)
    }

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

        init: function (selector) {
            let nodes = document.querySelectorAll(selector)
            nodes.forEach((node, index) => {
                this[index] = node
            })
            this.length = nodes.length
        },

        addClass: function () {
            console.log('nihao')
            return this
        }
    }

    jQuery.fn.init.prototype = jQuery.fn

    jQuery.extend = jQuery.fn.extend = function (obj) {
        for (var key in obj) {
            this[key] = obj[key]
        }
    }

    jQuery.extend({
        get: function (url, data = {}) {
            url += '?' + Object.entries(data).map(v => `${v[0]}=${v[1]}`).join('&')
            return fetch(url).then(function(res) {
                return res.json()
            })
        },

        post: function(url, data= {}) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
        },


        unique: function(array) {
            return [...new Set(array)]
        }
    })

    jQuery.fn.extend({
        addClass: function (cls) {
            Array.from(this).forEach(node => node.classList.add(cls))
            return this
        }
    })

    window.$ = jQuery
}());