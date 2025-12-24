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
  slideAnim(true, UI_Container[0].querySelector('.formsize-content'));

  // *** Events ***
  // Fix Calculator Responsive on Resize
  window.addEventListener('resize', calculatorResponsive);

  // Calculator Slide Up/Down and Calculate Button
  UI_Container.forEach(item => {
    item.addEventListener('click', (e) => {
      let slideBtn = e.target.closest('.formsize-heading'),
          calculateBtn = e.target.closest('.form-size-btn');

      if (slideBtn) { // Slide Up/Down
        !slideBtn.classList.contains('active') ? slideAnim(true, slideBtn.nextElementSibling) : slideAnim(false, slideBtn.nextElementSibling);
      } else if (calculateBtn) { // Calculate the body size

      }



    })
  })

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

  // Calculator Slide Up/Down
  

  // Slide Animation
  function slideAnim(status, slide) {
    let slideH = slide.children[0].offsetHeight,
        anim = null, counter = null;

    if (status) { // Slide Down
      slide.previousElementSibling.classList.add('active');
      counter = 0;
      anim = setInterval(frame, 4);
      // Animation Frame
      function frame() {
        counter += 4;
        if (counter >= slideH) {
          slide.style.height = slideH + 'px';
          clearInterval(anim);
        } else {
          slide.style.height = counter + 'px';
        }
      }
    } else { // Slide Up
      slide.previousElementSibling.classList.remove('active');
      counter = slideH;
      anim = setInterval(frame, 4);
      // Animation Frame
      function frame() {
        counter -= 4;
        if (counter <= 0) {
          slide.style.height = '0px';
          clearInterval(anim);
        } else {
          slide.style.height = counter + 'px';
        }
      }
    }

  }


}());