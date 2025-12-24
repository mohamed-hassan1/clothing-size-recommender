(function() {
  // UI Elements
  const UI_Container = document.querySelectorAll('.product-form');

  // Global Settings
  const globalObj = {
    responsive: {
      mdScreen: 590,
      smScreen: 450
    }
  }

  // *** Init ***
  // Check Responsive
  calculatorResponsive();

  // *** Events ***
  // Fix Calculator Responsive on Resize
  window.addEventListener('resize', calculatorResponsive);

  // *** Core Functions ***
  // Calculator Responsive
  function calculatorResponsive() {
    UI_Container.forEach(item => {
      let itemW = item.offsetWidth;
      item.classList.remove('md-screen', 'sm-screen');
      if (itemW <= globalObj.responsive.mdScreen && itemW > globalObj.responsive.smScreen) {
        item.classList.add('md-screen');
      } else if (itemW <= globalObj.responsive.smScreen) {
        item.classList.add('sm-screen');
      }
    });
  }


}());