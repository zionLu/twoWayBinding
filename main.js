var currentTarget = null
var data = {
    msg: 'helloWorld',
    act: 'getIt',
}

function observe(data) {
    for (let key in data) {
        (function(key) {
            var value = data[key]
            var dep = []
            Object.defineProperty(data, key, {
                get: function() {
                    dep.push(currentTarget)
                    return value
                },
                set: function(arg) {
                    value = arg
                    dep.forEach(function(elm) {
                        elm.innerHTML = value
                    })
                }
            })
        })(key)
    }
}
observe(data)

window.onload = function() {
    var list = document.querySelectorAll("[data-ref]")
    list.forEach(function(elm) {
        currentTarget = elm
        if (elm.tagName == "INPUT") {
            elm.value = data[elm.dataset.ref]
        } else {
            elm.innerHTML = data[elm.dataset.ref]
        }
        currentTarget = null
    });
}

function changeMsg(evt) {
    data.msg = evt.currentTarget.value
}