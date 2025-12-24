/*
 * =====================================================
 * Body Measurement Size Calculator
 * =====================================================
 * 
 * Smart clothing size recommendation tool
 * Analyzes body measurements to suggest optimal fit
 * 
 * Author: Mohamed Hassan
 * Web: www.mhdeveloper.com
 * =====================================================
 */

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
    recommendedText: {
      en: [
        "We recommend sizing up for better comfort and fit.",
        "A smaller size may provide a better fit.",
        "Standard size recommendation applies."
      ],
      ar: [
        "نوصي باختيار مقاس أكبر لراحة أفضل وملاءمة أنسب.",
        "قد يكون المقاس الأصغر أنسب من حيث الملاءمة.",
        "ينطبق المقاس القياسي الموصى به."
      ]
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

      if (slideBtn) { // ** Slide Up/Down **

        !slideBtn.classList.contains('active') ? slideAnim(true, slideBtn.nextElementSibling) : slideAnim(false, slideBtn.nextElementSibling);

      } else if (calculateBtn) { // ** Calculate the body size **

        const formSizeOutput = item.querySelector('.formsize-res'),
              formSizeDetails = item.querySelector('.formsize-details'),
              formResult = item.querySelector('.formsize-results');

        let formChest = null, formHeight = null, formWeight = null, formBodyType = null, langIndex = null;

        if (item.hasAttribute('dir') && item.getAttribute('dir').toLowerCase().trim() === 'rtl') { // Arabic

          // Assign Values
          formChest = parseInt(item.querySelector('#chest-ar').value);
          formHeight = parseInt(item.querySelector('#height-ar').value);
          formWeight = parseInt(item.querySelector('#weight-ar').value);
          formBodyType = item.querySelector('#bodytype-ar').value;
          langIndex = 'ar';

        } else { // English

          // Assign Values
          formChest = parseInt(item.querySelector('#chest-en').value);
          formHeight = parseInt(item.querySelector('#height-en').value);
          formWeight = parseInt(item.querySelector('#weight-en').value);
          formBodyType = item.querySelector('#bodytype-en').value;
          langIndex = 'en';

        }

        // Check for form inputs & call calculateSize function
        if ((formChest > 0 && formHeight > 0) && (formWeight > 0 && formBodyType.trim() !== '')) {
          let size = calculateSize(formChest, formHeight, formWeight, formBodyType, langIndex);
          formSizeOutput.textContent = size.recommended;
          formSizeDetails.textContent = size.details;
          formResult.classList.remove('hidden');
        }

      }

    });
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
          slide.style.height = '100%';
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

  // Size Calculator
  function calculateSize(chest, height, weight, bodyType, langIndex) {
    // Calculate BMI for additional reference
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
        
    // Base size determination from chest measurement
    let baseSize;
    if (chest < globalObj.rules.chest.S) baseSize = 'S';
    else if (chest < globalObj.rules.chest.M) baseSize = 'M';
    else if (chest < globalObj.rules.chest.L) baseSize = 'L';
    else if (chest < globalObj.rules.chest.XL) baseSize = 'XL';
    else if (chest < globalObj.rules.chest.XXL) baseSize = 'XXL';
    else baseSize = 'XXXL';
        
    // Adjust based on height and weight ratio
    const heightWeightRatio = weight / height;
        
    // Body type adjustments
    let adjustment = 0;
        
    if (bodyType === 'chest') {
      // Chest-focused: may need larger size for upper body
      if (chest > 100) adjustment += globalObj.rules.chest_Focus;
    } else if (bodyType === 'belly') {
      // Belly-focused: may need size up for comfort
      if (bmi > 27) adjustment += globalObj.rules.belly_Focus;
    } else if (bodyType === 'balanced') {
      // Balanced: standard sizing applies
      adjustment += globalObj.rules.balanced_Focus;
    }
        
    // Height adjustments
    if (height > 185 && heightWeightRatio < 0.45) {
      adjustment += globalObj.rules.height_Tall; // Tall and lean - size up for length
    } else if (height < 165 && heightWeightRatio > 0.5) {
      adjustment -= globalObj.rules.height_Short; // Short and heavier - might fit smaller size
    }
        
    // Weight-chest ratio check
    const expectedWeight = (chest - 80) * 2 + 60; // Rough estimation
    if (weight > expectedWeight + 15) {
      adjustment += 1;
    } else if (weight < expectedWeight - 15) {
      adjustment -= 1;
    }
        
    // Size array for adjustment calculation
    const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    let currentIndex = sizes.indexOf(baseSize);
        
    // Apply adjustment
    currentIndex += adjustment;
        
    // Keep within bounds
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= sizes.length) currentIndex = sizes.length - 1;
        
    const recommendedSize = '(S-' + sizes[currentIndex] + ')';
        
    // Generate details message
    let details = ``;
        
    if (adjustment > 0) {
      details += `${globalObj.recommendedText[langIndex][0]}`;
    } else if (adjustment < 0) {
      details += `${globalObj.recommendedText[langIndex][1]}`;
    } else {
      details += `${globalObj.recommendedText[langIndex][2]}`;
    }
        
    return {
      recommended: recommendedSize,
      details: details
    };
  }


}());