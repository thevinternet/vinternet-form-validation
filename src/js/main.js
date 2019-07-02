"use strict";

// Real Time Client Side HTML Form Validation

(() => {

  // If HTML 'required' attribute exists within document continue otherwise return
  if (document.querySelector('[required]')) {

    // Store core HTML elements used for user form
    const domElements = {
      userForm: document.getElementById('userForm'),
      userFormContainer: document.getElementById('userFormContainer'),
      validationElements: [].slice.call(document.querySelectorAll('[required]'))
    }

    // ****************************** ELEMENT VALIDITY CHECK *******************************************//

    // Function to check element validity status
    const validationCheck = (event) => {

      // Store the event target and it's validity object
      const targetElement = event.target;
      const validityObj = event.target.validity;

      // Check validity object for missing value or pattern match failure
      // and pass target element to the appropriate function
      if (validityObj.valueMissing === true || validityObj.patternMismatch === true) {
        validationErrorHandling(targetElement, validityObj);
      } else {
        validationPassed(targetElement);
      }
    }

    // ******************************* HANDLE INVALID ELEMENTS *****************************************//

    // Function to handle invalid element and provide user feedback
    const validationErrorHandling = (targetElement, validityObj) => {

      // Store invalid HTML element's 'name' and 'data-error' (bespoke error message) attributes
      const targetElementName = targetElement.getAttribute('name');
      const errorMessageText = targetElement.getAttribute('data-error');

      // Set ARIA attritbutes on invalid HTML element
      targetElement.setAttribute('aria-invalid', 'true');
      targetElement.setAttribute('aria-describedby', targetElementName);

      // Call function to construct custom HTML error message for invalid HTML element
      const errorMessageHTML = constructErrorMessage(targetElementName, errorMessageText);

      // Call function to calculate DOM position for bespoke HTML error message
      const errorMessagePosition = calculateErrorPosition(targetElement);

      // Add custom error message for invalid element if it doesn't already exist in the DOM
      if (!errorMessagePosition || !errorMessagePosition.classList.contains('message--error')) {
        errorMessagePosition.insertAdjacentElement('afterend', errorMessageHTML);

        // Set browser custom validity message on invalid input
        targetElement.setCustomValidity(errorMessageText);
      } else {
        return;
      }
    }

    // ****************************** CONSTRUCT CUSTOM ERROR MESSAGE ***********************************//

    // Function to construct and return custom HTML error message
    const constructErrorMessage = (targetElementName, errorMessageText) => {

      // Construct inline error message
      const errorMessageHTML = document.createElement('p');
      errorMessageHTML.innerText = errorMessageText;
      errorMessageHTML.classList.add('message--error');
      errorMessageHTML.setAttribute('id', targetElementName);
      errorMessageHTML.setAttribute('aria-live', 'polite');

      return errorMessageHTML;
    }

    // ****************************** CUSTOM ERROR MESSAGE POSITION ************************************//

    // Function to identify and return correct DOM location to insert error message
    const calculateErrorPosition = (targetElement) => {

      let errorMessagePosition;

      if ((targetElement.type == 'radio' || targetElement.type == 'checkbox') && targetElement.name) {
        const targetGroup = document.getElementsByName(targetElement.name);
        errorMessagePosition = targetGroup[0].parentElement.previousElementSibling;
      } else {
        errorMessagePosition = targetElement.previousElementSibling;
      }

      return errorMessagePosition;
    }

    // ********************************* HANDLE VALID ELEMENTS *****************************************//

    // Function to handle a valid element and provide user feedback
    const validationPassed = (targetElement) => {
      if (targetElement.hasAttribute('aria-invalid')) {

        // Remove ARIA attributes from valid input and reset custom validity message
        // handling radio button groups and standalone inputs accordingly
        if (targetElement.type == 'radio' && targetElement.name) {
          const targetGroup = [].slice.call(document.getElementsByName(targetElement.name));
          targetGroup.forEach((element) => {
            element.removeAttribute('aria-invalid');
            element.removeAttribute('aria-describedby');
            element.setCustomValidity('');
          });
        } else {
          targetElement.removeAttribute('aria-invalid');
          targetElement.removeAttribute('aria-describedby');
          targetElement.setCustomValidity('');
        }

        // Grab custom error message element and remove it from the DOM
        const errorMessagePosition = calculateErrorPosition(targetElement);
        errorMessagePosition.parentNode.removeChild(errorMessagePosition);

      } else {
        return;
      }
    }

    // ******************************** FILE SUBMISSION MESSAGE *************************************** //

    const userFormSubmit = (event) => {
      // Prevent default actions on form
      event.preventDefault();

      // Reset file upload form
      domElements.userForm.reset();

      // Construct and add new status message holder
      const statusMessageHolder = document.createElement('div');
      statusMessageHolder.className ='status--highlight theme--success';

      // Construct and add new status message
      const statusMessage = document.createElement('p');
      statusMessage.setAttribute('aria-live', 'assertive');
      statusMessage.setAttribute('aria-role', 'alert');
      statusMessage.innerText = 'Thank you for using my example user form. The details you have provided have not been sent anywhere and the form has been reset for you to try again.';

      // Append status message to holder and then holder to DOM
      statusMessageHolder.appendChild(statusMessage);
      domElements.userFormContainer.appendChild(statusMessageHolder);
    }

    // *********************************** EVENT LISTENERS ******************************************** //

    // Add event listeners to each element requiring validation
    domElements.validationElements.forEach((element) => {
      element.addEventListener('invalid', validationCheck);
      element.addEventListener('change', validationCheck);
    });

    // Add listener to form submission event to prevent defaults and show submssion message
    domElements.userForm.addEventListener('submit', userFormSubmit);

  } else {
    return;
  }
})();
