// Toggle mobile menu
function toggleMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.getElementById('mobileNavOverlay');
  
  hamburger.classList.toggle('active');
  overlay.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  document.body.classList.toggle('menu-open');
}

// Switch between tabs in mobile menu
function switchMobileTab(tabName) {
  // Remove active class from all tab buttons and panes
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  
  // Add active class to clicked tab button
  event.target.classList.add('active');
  
  // Show corresponding tab pane
  const targetPane = tabName === 'main' ? 'mainTab' : 'sectionTab';
  document.getElementById(targetPane).classList.add('active');
}

// Sticky Navigation
function initStickyNavigation() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
  });
}

function saveScrollPosition() {
  // Save the current scroll position in localStorage
  const sidebar = document.getElementById('sidebar');
  const currentPath = window.location.pathname;

  // Define section index pages that should not save scroll position
  

  // Restore scroll position if sidebar is open unless on no-scroll paths
  if (noScrollPaths.includes(currentPath)) {
    const savedScroll = localStorage.getItem('sidebar-scroll');
    if (savedScroll !== null) {
      sidebar.scrollTop = parseInt(savedScroll, 10);
    }
  }

  // Save scroll position before page unload
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('sidebar-scroll', sidebar.scrollTop);
  });
}

function setSidebarScroll() {
  // Find the sidebar element on the page
  const sidebar = document.querySelector('.sidebar');

  // If there is no sidebar on this page, stop.
  if (!sidebar) {
    return;
  }

  // Define a key for our localStorage item
  const scrollPositionKey = 'sidebarScrollPosition';

  // --- Part 1: Restore the scroll position on page load ---
  // Get the saved position from localStorage
  const savedPosition = localStorage.getItem(scrollPositionKey);

  // If a position was saved, apply it to the sidebar
  if (savedPosition) {
    sidebar.scrollTop = savedPosition;
  }

  // --- Part 2: Save the scroll position when the user scrolls ---
  // Add an event listener to the sidebar
  sidebar.addEventListener('scroll', () => {
    // Save the current scroll position to localStorage
    localStorage.setItem(scrollPositionKey, sidebar.scrollTop);
  });
}

// Close mobile menu when clicking outside or on links
document.addEventListener('DOMContentLoaded', function() {

  initStickyNavigation();
  setSidebarScroll()
  //saveScrollPosition();

  const overlay = document.getElementById('mobileNavOverlay');
  const mobileNavContent = document.querySelector('.mobile-nav-content');
  
  // Close when clicking outside the menu content
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      toggleMobileMenu();
    }
  });
  
  // Close when clicking on navigation links
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      toggleMobileMenu();
    });
  });
  
  // Handle escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      toggleMobileMenu();
    }
  });
});

// Add CSS to prevent body scroll when menu is open
const style = document.createElement('style');
style.textContent = `
  body.menu-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
`;
document.head.appendChild(style);