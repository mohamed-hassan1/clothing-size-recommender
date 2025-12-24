(function() {
  // UI Elements
  const UI_Container = document.querySelectorAll('.product-form');

  // Global Settings
  const globalObj = {
    rules: {
      // **** Rules ****
      // Base size determination from chest measurement
      // Chest < 86 = S
      // Chest < 94 = M
      // Chest < 102 = L
      // Chest < 110 = XL
      // Chest < 118 = XXL
      // Other = XXXL
      chest: {
        S: 86,
        M: 94,
        L: 102,
        XL: 110,
        XXL: 118
      },

      // *** Body Type Adjustment ***
      // Chest-focused: may need larger size for upper body
      // Chest > 100 = plus 1
      chest_Focus: 1,

      // Belly-focused: may need size up for comfort
      // Calculate BMI for additional reference
      //bmi = weight / ((height / 100) * (height / 100));
      // Bmi > 27 = plus 1
      belly_Focus: 1,

      // Balanced: standard sizing applies
      balanced_Focus: 0,

      // Height adjustments
      // height > 185 and height Weight Ratio < 0.45
      // Tall and lean - size up for length
      height_Tall: 1,

      // height < 165 and height Weight Ratio > 0.5
      // Short and heavier - might fit smaller size
      height_Short: 1

    },
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