(() => {
    const grid = document.getElementById('hobbyCards');
    const nav = document.getElementById('hobbyPagination');
    if (!grid || !nav) return;
    const cards = Array.from(grid.children);
    const status = document.getElementById('hobbyPageStatus');
    const desktop = window.matchMedia('(min-width: 992px)');
    const tablet = window.matchMedia('(min-width: 576px)');
    const pageSize = () => desktop.matches ? 3 : tablet.matches ? 2 : 1;
    let size = pageSize();
    let page = 0;
    function render() {
        const total = Math.ceil(cards.length / size);
        page = Math.min(page, total - 1);
        cards.forEach((card, index) => {
            card.hidden = Math.floor(index / size) !== page;
        });
        nav.replaceChildren();
        for (let index = 0; index < total; index++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'hobby-dot' + (index === page ? ' is-active' : '');
            dot.setAttribute('aria-label', `취미 목록 ${index + 1}페이지 보기`);
            dot.setAttribute('aria-controls', 'hobbyCards');
            if (index === page) dot.setAttribute('aria-current', 'page');
            dot.append(document.createElement('span'));
            dot.addEventListener('click', () => {
                page = index;
                render();
                nav.children[index].focus({ preventScroll: true });
            });
            nav.append(dot);
        }
        status.textContent = `총 ${total}페이지 중 ${page + 1}페이지`;
    }
    function resize() {
        const first = page * size;
        size = pageSize();
        page = Math.floor(first / size);
        render();
    }
    desktop.addEventListener('change', resize);
    tablet.addEventListener('change', resize);
    render();
})();
