export const setActiveNav = (page) => {
  const navs = document.querySelectorAll('a.nav-link');

  Array
    .from(navs)
    .forEach(element => element
      .getAttribute('data-page') === page ?
      element.classList.add('active') :
      element.classList.remove('active'),
    );
};
