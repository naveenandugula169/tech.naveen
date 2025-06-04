'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Initialize the first page
if (pages.length > 0) {
  pages[0].classList.add("active");
  if (navigationLinks.length > 0) {
    navigationLinks[0].classList.add("active");
  }
}

// Loading overlay
const loadingOverlay = document.querySelector('.loading-overlay');
if (loadingOverlay) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
    }, 500);
  });
}

// Form handling
const form = document.querySelector('.form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Add your form submission logic here
  });
}

// Project modal handling
const projectModal = document.querySelector('.project-details-modal');
const projectModalCloseBtn = document.querySelector('.project-details-close');
const projectModalItems = document.querySelectorAll('.project-item > a');

if (projectModal && projectModalCloseBtn) {
  projectModalCloseBtn.addEventListener('click', function () {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  projectModalItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

// Testimonials modal handling
const testimonialsModal = document.querySelector('.testimonials-modal');
const testimonialsModalCloseBtn = document.querySelector('.testimonials-modal-close');
const testimonialsModalItems = document.querySelectorAll('.testimonials-item');

if (testimonialsModal && testimonialsModalCloseBtn) {
  testimonialsModalCloseBtn.addEventListener('click', function () {
    testimonialsModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  testimonialsModalItems.forEach(item => {
    item.addEventListener('click', function () {
      testimonialsModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

// Portfolio filter handling
if (filterBtn.length > 0) {
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].classList.remove("active");
      }
      this.classList.add("active");
      const selectedValue = this.getAttribute("data-select-value");
      const projectItems = document.querySelectorAll("[data-category]");
      for (let i = 0; i < projectItems.length; i++) {
        if (selectedValue === "all") {
          projectItems[i].classList.remove("hide");
        } else if (selectedValue === projectItems[i].getAttribute("data-category")) {
          projectItems[i].classList.remove("hide");
        } else {
          projectItems[i].classList.add("hide");
        }
      }
    });
  }
}

// Initialize the first filter
if (filterBtn.length > 0) {
  filterBtn[0].click();
}

// Enhanced scroll handling
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.classList.remove('hide');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar.classList.contains('hide')) {
    // Scrolling down
    navbar.classList.add('hide');
  } else if (currentScroll < lastScroll && navbar.classList.contains('hide')) {
    // Scrolling up
    navbar.classList.remove('hide');
  }
  
  lastScroll = currentScroll;
});

// Enhanced navigation
const navLinks = document.querySelectorAll('.navbar-link');
const sections = document.querySelectorAll('article');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('data-page');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav-link') === id) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Enhanced form handling
const form = document.querySelector('.form');
const inputs = form.querySelectorAll('.form-input');
const submitBtn = form.querySelector('.form-btn');

const validateInput = (input) => {
  const value = input.value.trim();
  const type = input.getAttribute('type');
  let isValid = true;
  let errorMessage = '';

  switch (type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      errorMessage = 'Please enter a valid email address';
      break;
    case 'text':
      isValid = value.length >= 2;
      errorMessage = 'This field is required';
      break;
    case 'textarea':
      isValid = value.length >= 10;
      errorMessage = 'Message must be at least 10 characters long';
      break;
  }

  if (!isValid) {
    input.classList.add('error');
    input.setAttribute('title', errorMessage);
  } else {
    input.classList.remove('error');
    input.removeAttribute('title');
  }

  return isValid;
};

inputs.forEach(input => {
  input.addEventListener('input', () => {
    validateInput(input);
    updateSubmitButton();
  });

  input.addEventListener('blur', () => {
    validateInput(input);
    updateSubmitButton();
  });
});

const updateSubmitButton = () => {
  const isValid = Array.from(inputs).every(input => validateInput(input));
  submitBtn.disabled = !isValid;
};

// Enhanced project filtering
const filterButtons = document.querySelectorAll('.filter-item button');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter-btn');
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    projectItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        setTimeout(() => item.classList.add('active'), 10);
      } else {
        item.classList.remove('active');
        setTimeout(() => item.style.display = 'none', 300);
      }
    });
  });
});

// Interactive Project Showcases (Example: Modal)
const projectItems = document.querySelectorAll('.project-item > a'); // Select the links within project items

// Get project modal elements
const projectModalContainer = document.querySelector('[data-project-modal-container]');
const projectModalCloseBtn = document.querySelector('[data-project-modal-close-btn]');
const projectModalOverlay = document.querySelector('[data-project-modal-overlay]');
const projectModalTitle = document.querySelector('[data-project-modal-title]');
const projectModalBody = document.querySelector('[data-project-modal-body]');

// Function to open project modal
const openProjectModal = (item) => {
    const projectTitle = item.querySelector('.project-title').textContent;
    const projectCategory = item.querySelector('.project-category').textContent;
    // In a real application, you would load more details based on the project.
    // For now, we'll just display the title and category.
    
    projectModalTitle.textContent = projectTitle;
    projectModalBody.innerHTML = '<p>Category: ' + projectCategory + '</p>' + '<p>More project details go here.</p>'; // Placeholder content
    
    projectModalContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
};

// Function to close project modal
const closeProjectModal = () => {
    projectModalContainer.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
};

// Add click event to all project items
projectItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        openProjectModal(item);
    });
});

// Add click event to project modal close button and overlay
projectModalCloseBtn.addEventListener('click', closeProjectModal);
projectModalOverlay.addEventListener('click', closeProjectModal);

// Add JavaScript for the loading overlay
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        // Add a slight delay to ensure all assets are ready and the animation is seen
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            // Remove the overlay from the DOM after transition
            loadingOverlay.addEventListener('transitionend', () => {
                loadingOverlay.remove();
            }, { once: true });
        }, 500); // 500ms delay
    }
});

// Subtle Parallax Scrolling
// Select elements that should have parallax effect. Add a class like 'parallax-element' to them.
// Be mindful of performance and which elements are suitable.

const parallaxElements = document.querySelectorAll('.parallax-element');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;

    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.1; // Get speed from data attribute, default 0.1
        const transformY = scrollPosition * speed;
        element.style.transform = 'translateY(' + transformY + 'px)';
    });
});

// Add data-parallax-speed attribute to elements in HTML you want parallax on.
// Example: <img src="..." alt="..." class="parallax-element" data-parallax-speed="0.05">

// Find the existing skills section and items
const skillSection = document.querySelector('.skill');
const skillItems = document.querySelectorAll('.skills-item');

// Function to animate skill bars
const animateSkillBars = () => {
    skillItems.forEach(item => {
        const progressFill = item.querySelector('.skill-progress-fill');
        const skillLevel = item.querySelector('data').getAttribute('value');
        const skillLevelPercentage = skillLevel * 10 + '%'; // Assuming data-value is out of 10
        
        // Check if the item is in the viewport
        const rect = item.getBoundingClientRect();
        const isVisible = (rect.top < window.innerHeight && rect.bottom >= 0);

        if (isVisible) {
            // Set the CSS variable for animation FIRST
            item.style.setProperty('--skill-level', skillLevelPercentage);
             // Add a small delay before adding the class to ensure animation plays
            setTimeout(() => {
                 item.classList.add('is-visible');
            }, 50); // Small delay
           
        } else {
             // Optional: reset animation if scrolling away
             item.classList.remove('is-visible');
             item.style.setProperty('--skill-level', '0%'); // Reset width
        }
    });
};

// Run animation on page load and scroll
// Use a slight delay on load to ensure elements are rendered before checking visibility
window.addEventListener('load', () => {
    setTimeout(animateSkillBars, 100); 
});
window.addEventListener('scroll', animateSkillBars);

// Optional: Use Intersection Observer for better performance - this is generally preferred

const skillObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the item is visible - Adjusted threshold
};

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const item = entry.target;
        const progressFill = item.querySelector('.skill-progress-fill');
        const skillLevel = item.querySelector('data').getAttribute('value');
        const skillLevelPercentage = skillLevel * 10 + '%';
        const percentageText = item.querySelector('.skill-percentage'); // Get the percentage text element

        if (entry.isIntersecting) {
            // Set the CSS variable for the fill width immediately
            item.style.setProperty('--skill-level', skillLevelPercentage);

            // Add the class to trigger fill animation and show percentage after a small delay
            setTimeout(() => {
                 item.classList.add('is-visible');
                 // Set the left position of the percentage text to match the fill width
                 if(percentageText) {
                    percentageText.style.left = skillLevelPercentage;
                 }
                 console.log(`Animating ${skillLevel}/10 skill to ${skillLevelPercentage}`);
            }, 10); // A very short delay (e.g., 10ms)
           
            // Optional: Unobserve after animation if you only want it to animate once
            // observer.unobserve(item);
        } else {
             // Optional: reset animation if scrolling away
             item.classList.remove('is-visible');
             item.style.setProperty('--skill-level', '0%'); // Reset fill width
              if(percentageText) {
                 percentageText.style.left = '0%'; // Reset percentage text position
              }
        }
    });
}, skillObserverOptions);

// Observe each skill item
skillItems.forEach(item => skillObserver.observe(item));

// Remove the old scroll and load listeners for skill bars
// These listeners were added before switching to Intersection Observer
// Removing them ensures only the observer controls the animation
window.removeEventListener('load', () => { setTimeout(animateSkillBars, 100); }); 
window.removeEventListener('scroll', animateSkillBars);

// To ensure removal, define the functions separately if needed, or just rely on the observer now.
// Let's simplify and just use the observer.

// Subtle Audio Integration

// Load sounds (replace with actual paths to your audio files)
const clickSound = new Audio('./assets/audio/click.mp3'); // Example click sound
const modalOpenSound = new Audio('./assets/audio/open_modal.mp3'); // Example modal open sound
const modalCloseSound = new Audio('./assets/audio/close_modal.mp3'); // Example modal close sound

// Optional: Set volume
clickSound.volume = 0.5;
modalOpenSound.volume = 0.5;
modalCloseSound.volume = 0.5;

// Function to play a sound
const playSound = (audio) => {
    audio.currentTime = 0; // Rewind to the start
    audio.play().catch(e => console.error('Error playing sound:', e)); // Play and catch potential errors
};

// Add sound to project item click (opens modal)
projectItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        openProjectModal(item);
        playSound(modalOpenSound); // Play sound on modal open
    });
});

// Add sound to project modal close button and overlay
projectModalCloseBtn.addEventListener('click', () => {
    closeProjectModal();
    playSound(modalCloseSound); // Play sound on modal close
});

projectModalOverlay.addEventListener('click', () => {
    closeProjectModal();
    playSound(modalCloseSound); // Play sound on modal close
});

// You can add sounds to other interactions as well, e.g., navbar clicks, form submission, etc.

// Add more microinteractions (examples)

// Add ripple effect on buttons using the CSS :active pseudo-element
// No extra JS needed for the CSS ripple effect, just ensure the CSS is applied.

// Example: Add subtle scale effect on social links on click
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('click', () => {
        link.classList.add('clicked');
        link.addEventListener('animationend', () => {
            link.classList.remove('clicked');
        }, { once: true });
    });
});

// Add CSS for .clicked class animation if desired

// Example: Add feedback on form input focus (already handled by CSS outline, can add more)
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.add('focused');
    });
    input.addEventListener('blur', () => {
        input.classList.remove('focused');
    });
});

// Add CSS for .focused class if desired

// Storytelling and Hobby Integration (JS part)
// This will depend on the specific implementation. Placeholders below:

// Functionality for a subtle hobby element (e.g., toggle visibility)
const hobbyElement = document.querySelector('.hobby-element'); // Assuming you add this element in HTML

if (hobbyElement) {
    hobbyElement.addEventListener('click', () => {
        // Add interaction logic here, e.g., show a small modal, change content, etc.
        console.log('Hobby element clicked!');
        // Example: Toggle a class to show/hide more info
        // const hobbyDetails = document.querySelector('.hobby-details');
        // hobbyDetails.classList.toggle('visible');
    });
}

// Logic for narrative flow/storytelling (more about content arrangement)
// No specific JS required here unless you have complex step-by-step reveals or interactions tied to the narrative.

// Enhanced project modal functionality
const projectModal = {
  container: document.querySelector('.project-details-modal'),
  content: document.querySelector('.project-details-content'),
  closeBtn: document.querySelector('.project-details-close'),
  title: document.querySelector('.project-details-content h3'),
  image: document.querySelector('.project-details-content img'),
  description: document.querySelector('.project-details-content p'),

  open(projectData) {
    this.title.textContent = projectData.title;
    this.image.src = projectData.image;
    this.image.alt = projectData.title;
    this.description.textContent = projectData.description;
    this.container.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.container.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Add click event to project items
document.querySelectorAll('.project-item > a').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const projectData = {
      title: item.querySelector('.project-title').textContent,
      image: item.querySelector('.project-img img').src,
      description: 'Detailed project description goes here...' // You can add this data to your HTML
    };
    projectModal.open(projectData);
  });
});

// Close modal on close button click and overlay click
projectModal.closeBtn.addEventListener('click', () => projectModal.close());
projectModal.container.addEventListener('click', (e) => {
  if (e.target === projectModal.container) projectModal.close();
});

// Enhanced skill animations with Intersection Observer
const skillObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const item = entry.target;
      const progressFill = item.querySelector('.skill-progress-fill');
      const skillLevel = item.querySelector('data').getAttribute('value');
      const skillLevelPercentage = skillLevel * 10 + '%';

      item.style.setProperty('--skill-level', skillLevelPercentage);
      item.classList.add('is-visible');
    }
  });
}, skillObserverOptions);

document.querySelectorAll('.skills-item').forEach(item => {
  skillObserver.observe(item);
});

// Enhanced scroll handling with throttling
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        navbar.classList.remove('hide');
      } else if (currentScroll > lastScroll && !navbar.classList.contains('hide')) {
        navbar.classList.add('hide');
      } else if (currentScroll < lastScroll && navbar.classList.contains('hide')) {
        navbar.classList.remove('hide');
      }
      
      lastScroll = currentScroll;
      ticking = false;
    });
    ticking = true;
  }
});

// Loading overlay with fade out
window.addEventListener('load', () => {
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
      loadingOverlay.addEventListener('transitionend', () => {
        loadingOverlay.remove();
      }, { once: true });
    }, 500);
  }
});