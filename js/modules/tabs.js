function tabs(tabsSrlrctor, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabParent = document.querySelector(tabsParentSelector),
          tabs = tabParent.querySelectorAll(tabsSrlrctor);
    const tabContent = document.querySelectorAll(tabsContentSelector);

    function hideTabCntent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabCntent(i = 0) {
        tabContent[i].classList.add('show');
        tabContent[i].classList.remove('hide');

        tabs[i].classList.add(activeClass);
    }

    hideTabCntent();
    showTabCntent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSrlrctor.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabCntent();
                    showTabCntent(i);  
                }
            });
        }
    });
}

export default  tabs;