// search.js - Search functionality for AtlasServer documentation

// Store all documentation content for quick searching
let docsContent = {};
let searchIndex = [];
let searchModal = null;
let searchInput = null;
let searchResults = null;

// Initialize search functionality
function initSearch() {
  // Create search modal
  createSearchModal();
  
  // Set up event listeners
  setupEventListeners();
  
  // Load and index all documentation content
  loadAllDocuments();
}

// Create search modal in DOM
function createSearchModal() {
  // Create modal element
  searchModal = document.createElement('div');
  searchModal.className = 'search-modal';
  searchModal.style.display = 'none';
  
  // Create search input and results container
  const modalContent = `
    <div class="search-modal-content">
      <div class="search-header">
        <input type="text" class="search-modal-input" placeholder="Search documentation...">
        <button class="search-close-btn">×</button>
      </div>
      <div class="search-results"></div>
    </div>
  `;
  
  searchModal.innerHTML = modalContent;
  document.body.appendChild(searchModal);
  
  // Store references to important elements
  searchInput = searchModal.querySelector('.search-modal-input');
  searchResults = searchModal.querySelector('.search-results');
}

// Set up event listeners
function setupEventListeners() {
  // Keyboard shortcut (Ctrl+K) to open search
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    
    // Escape key to close search
    if (e.key === 'Escape' && searchModal.style.display === 'block') {
      closeSearch();
    }
  });
  
  // Click on header search input
  const headerSearchInput = document.querySelector('.search-input');
  if (headerSearchInput) {
    headerSearchInput.addEventListener('click', openSearch);
  }
  
  // Close button
  const closeBtn = searchModal.querySelector('.search-close-btn');
  closeBtn.addEventListener('click', closeSearch);
  
  // Input change for search
  searchInput.addEventListener('input', performSearch);
  
  // Click outside to close
  searchModal.addEventListener('click', function(e) {
    if (e.target === searchModal) {
      closeSearch();
    }
  });
}

// Load and index all documentation content
function loadAllDocuments() {
  // List of all documentation files
  const docFiles = ['index', 'installation', 'api', 'frameworks'];
  
  // Load each document and add to search index
  docFiles.forEach(filename => {
    fetch(`docs/${filename}.md`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`File ${filename}.md not found`);
        }
        return response.text();
      })
      .then(content => {
        docsContent[filename] = content;
        indexDocument(filename, content);
      })
      .catch(error => {
        console.warn(`Could not load ${filename}.md:`, error);
      });
  });
}

// Index a document for search
function indexDocument(filename, content) {
  // Split content into sections by headings
  const sections = content.split(/^#{1,3} /m);
  
  // Process each section
  sections.forEach(section => {
    if (section.trim() === '') return;
    
    // Get section title (first line)
    const title = section.split('\n')[0].trim();
    
    // Add to search index
    searchIndex.push({
      filename: filename,
      title: title,
      content: section,
      lowerContent: section.toLowerCase()
    });
  });
}

// Open search modal
function openSearch() {
  searchModal.style.display = 'block';
  searchInput.focus();
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  
  // Force repaint to ensure modal is centered
  setTimeout(() => {
    searchModal.style.opacity = '0.99';
    setTimeout(() => {
      searchModal.style.opacity = '1';
    }, 10);
  }, 10);
}

// Close search modal
function closeSearch() {
  searchModal.style.display = 'none';
  searchInput.value = '';
  searchResults.innerHTML = '';
  document.body.style.overflow = ''; // Restore scrolling
}

// Perform search and display results
function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  
  // Clear results if query is empty
  if (query === '') {
    searchResults.innerHTML = '<div class="search-empty">Type to search...</div>';
    return;
  }
  
  // Find matches in search index
  const matches = searchIndex.filter(item => {
    return item.lowerContent.includes(query) || item.title.toLowerCase().includes(query);
  });
  
  // Display results
  if (matches.length === 0) {
    searchResults.innerHTML = '<div class="search-empty">No results found</div>';
  } else {
    searchResults.innerHTML = '';
    
    matches.forEach(match => {
      // Create result element
      const resultElement = document.createElement('div');
      resultElement.className = 'search-result-item';
      
      // Get context around match
      const matchIndex = match.lowerContent.indexOf(query);
      const start = Math.max(0, matchIndex - 50);
      const end = Math.min(match.content.length, matchIndex + query.length + 50);
      let context = match.content.substring(start, end);
      
      // Add ellipsis if needed
      if (start > 0) context = '...' + context;
      if (end < match.content.length) context += '...';
      
      // Highlight match in context
      const highlightedContext = context.replace(
        new RegExp(query, 'gi'),
        match => `<span class="search-highlight">${match}</span>`
      );
      
      // Set result element content
      resultElement.innerHTML = `
        <div class="search-result-title">${match.title}</div>
        <div class="search-result-context">${highlightedContext}</div>
      `;
      
      // Add click handler to navigate to this document
      resultElement.addEventListener('click', () => {
        navigateToResult(match.filename, match.title);
        closeSearch();
      });
      
      searchResults.appendChild(resultElement);
    });
  }
}

// Navigate to a search result
function navigateToResult(filename, title) {
  // Get all navigation links and find the one corresponding to this document
  const navLinks = document.querySelectorAll('.nav-link');
  let navLink = null;
  
  navLinks.forEach(link => {
    if (link.getAttribute('data-doc') === filename) {
      navLink = link;
    }
  });
  
  // Click the navigation link to load the document
  if (navLink) {
    navLink.click();
    
    // Wait for document to load, then scroll to section
    setTimeout(() => {
      // Find heading with matching title
      const headings = document.querySelectorAll('h1, h2, h3');
      headings.forEach(heading => {
        if (heading.textContent.trim() === title) {
          heading.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }, 100);
  }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch);