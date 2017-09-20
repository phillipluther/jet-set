
//
//
function isOfClass(node, className) {
    var
        hasClass = false;

    while (node) {
        if (node.classList.contains(className)) {
            hasClass = true;
            break;
        }

        node = node.parentNode;

        if (node.isEqualNode(document.body)) {
            break;
        }
    }

    return hasClass;
}

(function() {

    var
        header = document.getElementById('pageHeader'),
        menuToggle = document.getElementById('navToggle');


    //
    //
    function handleHeaderClick(e) {

        var target = e.target;

        if (isOfClass(target, 'primaryNav-toggle')) {
            menuToggle.classList.toggle('show');
            header.classList.toggle('show-menu');

        } else if (
            (isOfClass(target), 'primaryNav-link') ||
            (isOfClass(target), 'secondaryNav-link')
        ) {
            menuToggle.classList.remove('show');
            header.classList.remove('show-menu');
        }
    }

    header.addEventListener('click', handleHeaderClick);
})();
