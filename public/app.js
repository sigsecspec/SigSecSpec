// SigSec Updates Page JavaScript - GitHub Pages Version

console.log('SigSec JavaScript loading...');

class UpdatesApp {
    constructor() {
        console.log('UpdatesApp constructor called');
        this.currentPage = 1;
        this.currentType = '';
        this.updatesPerPage = 10;
        this.allUpdates = [];
        this.init();
    }

    async init() {
        console.log('UpdatesApp init() called');
        try {
        this.setupEventListeners();
            console.log('Event listeners setup complete');
            
        await this.loadAppStatus();
            console.log('App status loaded');
            
        await this.loadOperationsStatus();
            console.log('Operations status loaded');
            
        await this.loadAppLinks();
            console.log('App links loaded');
            
        await this.loadUpdates();
            console.log('Updates loaded');
            
            console.log('UpdatesApp initialization complete');
            
            // Mark initialization as successful
            this.initialized = true;
            
        } catch (error) {
            console.error('Error during UpdatesApp initialization:', error);
            this.handleInitializationError(error);
        }
    }
    
    handleInitializationError(error) {
        console.error('Handling initialization error:', error);
        
        // Try to show basic content even if there are errors
        try {
            // Show fallback content for each section
            this.showBasicContent();
        } catch (fallbackError) {
            console.error('Error showing fallback content:', fallbackError);
        }
    }
    
    showBasicContent() {
        console.log('Showing basic content due to initialization errors');
        
        // Hide loading messages
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Show basic app status
        const appStatusContainer = document.getElementById('app-status-container');
        if (appStatusContainer) {
            appStatusContainer.innerHTML = `
                <div class="app-status-card">
                    <div class="app-header">
                        <h4>SigSecSpec</h4>
                        <span class="overall-status unreleased">unreleased</span>
                    </div>
                    <div class="version-grid">
                        <div class="version-card test">
                            <h5>Test</h5>
                            <div class="version-info">
                                <span class="version-number">v1.0.0</span>
                                <span class="version-status unreleased">unreleased</span>
                            </div>
                            <p class="version-notes">Internal testing phase - not ready for public release</p>
                            <small class="version-date" style="background: rgba(174, 174, 90, 0.3); padding: 2px 6px; border-radius: 4px; font-weight: 600;">Milestone: October 1st, 2025</small>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Show basic updates
        const updatesContainer = document.getElementById('updates-container');
        if (updatesContainer) {
            updatesContainer.innerHTML = `
                <div class="update-card">
                    <h3>Development Progress Update</h3>
                    <div class="update-meta">
                        <span class="update-type update">update</span>
                        <span class="update-date">September 18, 2025</span>
                        <span class="update-author">by Development Team</span>
                        <span class="update-priority high">high</span>
                    </div>
                    <div class="update-content">We are working diligently on getting the website and mobile app developed for testing as fast as possible. Our development team is working around the clock to ensure we meet our target milestones:

• Test Version v1.0.0 - October 1st, 2025
• Beta Version v1.0.0 - November 1st, 2025
• Release Version v1.0.0 - December 1st, 2025
• Launch Version v1.0.0 - January 1st, 2026

We appreciate your patience as we work to deliver a high-quality product that meets our standards.</div>
                </div>
            `;
        }
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                if (target.startsWith('#')) {
                    this.scrollToSection(target);
                }
                this.setActiveNavLink(link);
            });
        });

        // Filter controls
        const typeFilter = document.getElementById('type-filter');
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.currentType = e.target.value;
                this.currentPage = 1;
                this.loadUpdates();
            });
        }

        // Pagination
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.loadUpdates();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentPage++;
                this.loadUpdates();
            });
        }
    }

    setActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            // Get the header height to account for fixed positioning
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            
            // Calculate the position to scroll to (section top minus header height plus some padding)
            const sectionTop = section.offsetTop - headerHeight - 20;
            
            // Smooth scroll to the calculated position
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }

    async loadAppStatus() {
        console.log('loadAppStatus() called');
        // Manual app status data - update directly in code
        const appStatus = [
            {
                id: 1,
                name: "SigSecSpec",
                versions: {
                    test: {
                        version: "v1.0.0",
                        status: "unreleased",
                        last_updated: "2024-02-15T10:00:00Z",
                        notes: "Internal testing phase - not ready for public release"
                    },
                    beta: {
                        version: "v1.0.0",
                        status: "unreleased",
                        last_updated: "2024-02-15T10:00:00Z",
                        notes: "Beta version not yet available"
                    },
                    release: {
                        version: "v1.0.0",
                        status: "unreleased",
                        last_updated: "2024-02-15T10:00:00Z",
                        notes: "Production release pending final testing and approval"
                    },
                    launch: {
                        version: "v1.0.0",
                        status: "unreleased",
                        last_updated: "2024-02-15T10:00:00Z",
                        notes: "Full public launch with all features and services"
                    }
                },
                overall_status: "unreleased",
                next_milestone: "Test Version v1.0.0",
                target_date: "2025-10-01T00:00:00Z"
            }
        ];
        
        console.log('App status data:', appStatus);
        this.renderAppStatus(appStatus);
    }

    renderAppStatus(appStatus) {
        console.log('renderAppStatus() called with:', appStatus);
        const container = document.getElementById('app-status-container');
        console.log('App status container:', container);
        
        if (!container) {
            console.error('App status container not found');
            return;
        }
        
        if (!appStatus || appStatus.length === 0) {
            container.innerHTML = `
                <div class="status-card">
                    <h4>No App Status Available</h4>
                    <p>App status information will appear here once available.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = appStatus.map(app => `
            <div class="app-status-card">
                <div class="app-header">
                    <h4>${this.escapeHtml(app.name)}</h4>
                    <span class="overall-status ${app.overall_status}">${this.escapeHtml(app.overall_status)}</span>
                </div>
                
                <div class="version-grid">
                    <div class="version-card test">
                        <h5>Test</h5>
                        <div class="version-info">
                            <span class="version-number">${this.escapeHtml(app.versions.test.version)}</span>
                            <span class="version-status ${app.versions.test.status}">${this.escapeHtml(app.versions.test.status)}</span>
                        </div>
                        <p class="version-notes">${this.escapeHtml(app.versions.test.notes)}</p>
                        <small class="version-date" style="background: rgba(174, 174, 90, 0.3); padding: 2px 6px; border-radius: 4px; font-weight: 600;">Milestone: October 1st, 2025</small>
                    </div>
                    
                    <div class="version-card beta">
                        <h5>Beta</h5>
                        <div class="version-info">
                            <span class="version-number">${this.escapeHtml(app.versions.beta.version)}</span>
                            <span class="version-status ${app.versions.beta.status}">${this.escapeHtml(app.versions.beta.status)}</span>
                        </div>
                        <p class="version-notes">${this.escapeHtml(app.versions.beta.notes)}</p>
                        <small class="version-date" style="background: rgba(174, 174, 90, 0.3); padding: 2px 6px; border-radius: 4px; font-weight: 600;">Milestone: November 1st, 2025</small>
                    </div>
                    
                    <div class="version-card release">
                        <h5>Public Release</h5>
                        <div class="version-info">
                            <span class="version-number">${this.escapeHtml(app.versions.release.version)}</span>
                            <span class="version-status ${app.versions.release.status}">${this.escapeHtml(app.versions.release.status)}</span>
                        </div>
                        <p class="version-notes">${this.escapeHtml(app.versions.release.notes)}</p>
                        <small class="version-date" style="background: rgba(174, 174, 90, 0.3); padding: 2px 6px; border-radius: 4px; font-weight: 600;">Milestone: December 1st, 2025</small>
                </div>
                
                    <div class="version-card launch">
                        <h5>Launch Release</h5>
                        <div class="version-info">
                            <span class="version-number">${this.escapeHtml(app.versions.launch.version)}</span>
                            <span class="version-status ${app.versions.launch.status}">${this.escapeHtml(app.versions.launch.status)}</span>
                        </div>
                        <p class="version-notes">${this.escapeHtml(app.versions.launch.notes)}</p>
                        <small class="version-date" style="background: rgba(174, 174, 90, 0.3); padding: 2px 6px; border-radius: 4px; font-weight: 600;">Milestone: January 1st, 2026</small>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderAppStatusError() {
        const container = document.getElementById('app-status-container');
        container.innerHTML = `
            <div class="status-card error">
                <h4>Unable to Load App Status</h4>
                <p>There was an error loading the app status information. Please try again later.</p>
            </div>
        `;
    }

    async loadOperationsStatus() {
        console.log('loadOperationsStatus() called');
        // Manual operations status data - update directly in code
        const operations = [
            {
                id: 1,
                category: "Licenses",
                items: []
            },
            {
                id: 2,
                category: "Insurance",
                items: []
            },
            {
                id: 3,
                category: "Certifications",
                items: []
            },
            {
                id: 4,
                category: "Permits",
                items: []
            }
        ];
        
        this.renderOperationsStatus(operations);
    }

    renderOperationsStatus(operations) {
        console.log('renderOperationsStatus() called with:', operations);
        const container = document.getElementById('operations-container');
        
        if (!container) {
            console.error('Operations container not found');
                return;
            }

        // Create individual cards for each category
        container.innerHTML = operations.map(category => `
                        <div class="operation-item">
                            <div class="operation-header">
                    <h4 class="operation-title">${this.escapeHtml(category.category)}</h4>
                    <span class="operation-status ${category.items && category.items.length > 0 ? 'active' : 'inactive'}">
                        ${category.items && category.items.length > 0 ? 'Active' : 'Pending'}
                    </span>
                </div>
                <div class="operation-description">
                    ${category.items && category.items.length > 0 
                        ? `${category.items.length} ${category.category.toLowerCase()} currently active`
                        : `${category.category} documentation and verification in progress`
                    }
                            </div>
                                <div class="operation-meta">
                    <span>Status: ${category.items && category.items.length > 0 ? 'Documented' : 'In Progress'}</span>
                    <span>Last Updated: ${this.formatDate(new Date().toISOString())}</span>
                </div>
            </div>
        `).join('');
    }

    renderOperationsStatusError() {
        const container = document.getElementById('operations-container');
            if (container) {
                container.innerHTML = `
                <div class="operation-item error">
                    <div class="operation-header">
                        <h4 class="operation-title">Unable to Load Operations Status</h4>
                        <span class="operation-status inactive">Error</span>
                    </div>
                    <div class="operation-description">
                        There was an error loading the operations status information. Please try again later.
                    </div>
                    </div>
                `;
            }
    }

    async loadAppLinks() {
        console.log('loadAppLinks() called');
        // Manual app links data - update directly in code
        const appLinks = [
            {
                id: 1,
                platform: "Android",
                download_url: "https://play.google.com/store/apps/details?id=com.sigsec.app",
                version: "1.0.0",
                file_size: "28.7 MB",
                release_notes: "Download the Android app in APK format",
                is_active: false,
                created_at: "2024-01-25T09:00:00Z",
                status_type: "development",
                android_files: [
                    {
                        type: "APK",
                        url: "android/sigsec-app.apk",
                        size: "28.7 MB",
                        description: "Direct APK installation file"
                    }
                ]
            },
            {
                id: 2,
                platform: "iOS",
                download_url: "https://apps.apple.com/app/sigsec/id123456789",
                version: "1.0.0",
                file_size: "25.4 MB",
                release_notes: "App currently unavailable - in development",
                is_active: false,
                created_at: "2024-01-25T09:00:00Z",
                status_type: "unavailable"
            }
        ];
        
        this.renderAppLinks(appLinks);
    }

    renderAppLinks(appLinks) {
        console.log('renderAppLinks() called with:', appLinks);
        const container = document.getElementById('app-links');
        
        if (!container) {
            console.error('App links container not found');
            return;
        }
        
        if (!appLinks || appLinks.length === 0) {
            container.innerHTML = `
                <div class="app-link-item">
                    <div class="app-link-header">
                        <h4 class="app-link-title">No App Downloads Available</h4>
                        <span class="operation-status inactive">Unavailable</span>
                    </div>
                    <div class="operation-description">
                        Check back later for official app releases.
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = appLinks.map(link => {
            if (link.platform === 'Android' && link.android_files) {
                return `
                    <div class="app-link-item">
                        <div class="app-link-header">
                            <h4 class="app-link-title">${this.escapeHtml(link.platform)}</h4>
                            <span class="operation-status ${link.status_type === 'development' ? 'development' : link.status_type === 'unavailable' ? 'inactive' : 'active'}">
                                ${link.status_type === 'development' ? 'In Development' : link.status_type === 'unavailable' ? 'Unavailable' : 'Available'}
                            </span>
                        </div>
                        <div class="app-link-meta">
                            ${link.version ? `<span>Version: ${this.escapeHtml(link.version)}</span>` : ''}
                            <span>Platform: ${this.escapeHtml(link.platform)}</span>
                        </div>
                        <div class="operation-description">
                            ${link.release_notes ? this.escapeHtml(link.release_notes) : 'Download the official SigSec mobile application for your device.'}
                        </div>
                        <a href="#" class="download-btn" onclick="showAndroidDownloadModal(); return false;">
                            Download for Android
                        </a>
                    </div>
                `;
            } else {
                return `
                    <div class="app-link-item">
                        <div class="app-link-header">
                            <h4 class="app-link-title">${this.escapeHtml(link.platform)}</h4>
                            <span class="operation-status ${link.status_type === 'development' ? 'development' : link.status_type === 'unavailable' ? 'inactive' : 'active'}">
                                ${link.status_type === 'development' ? 'In Development' : link.status_type === 'unavailable' ? 'Unavailable' : 'Available'}
                            </span>
                        </div>
                        <div class="app-link-meta">
                            ${link.version ? `<span>Version: ${this.escapeHtml(link.version)}</span>` : ''}
                            ${link.file_size ? `<span>Size: ${this.escapeHtml(link.file_size)}</span>` : ''}
                            <span>Platform: ${this.escapeHtml(link.platform)}</span>
                        </div>
                        <div class="operation-description">
                            ${link.release_notes ? this.escapeHtml(link.release_notes) : 'Download the official SigSec mobile application for your device.'}
                        </div>
                        <a href="#" class="download-btn" onclick="showUnavailableMessage('${this.escapeHtml(link.platform)}'); return false;">
                            Download for ${this.escapeHtml(link.platform)}
                        </a>
                    </div>
                `;
            }
        }).join('');
    }

    renderAppLinksError() {
        const container = document.getElementById('app-links');
        container.innerHTML = `
            <div class="app-link-item error">
                <div class="app-link-header">
                    <h4 class="app-link-title">Unable to Load Downloads</h4>
                    <span class="operation-status inactive">Error</span>
                </div>
                <div class="operation-description">
                    There was an error loading the download links. Please try again later.
                </div>
            </div>
        `;
    }

    async loadUpdates() {
        console.log('loadUpdates() called');
        // Manual updates data - update directly in code
        const allUpdates = [
            {
                id: 2,
                title: "Development Progress Update",
                content: "We are working diligently on getting the website and mobile app developed for testing as fast as possible. Our development team is working around the clock to ensure we meet our target milestones:\n\n• Test Version v1.0.0 - October 1st, 2025\n• Beta Version v1.0.0 - November 1st, 2025\n• Release Version v1.0.0 - December 1st, 2025\n• Launch Version v1.0.0 - January 1st, 2026\n\nWe appreciate your patience as we work to deliver a high-quality product that meets our standards.",
                type: "update",
                priority: "high",
                author: "Development Team",
                created_at: "2025-09-18T07:16:00Z",
                is_published: true
            }
        ];
        
        // Store all updates for client-side filtering and pagination
        this.allUpdates = allUpdates.filter(update => update.is_published);
        
        // Apply filtering
        let filteredUpdates = this.allUpdates;
        if (this.currentType) {
            filteredUpdates = this.allUpdates.filter(update => update.type === this.currentType);
        }
        
        // Apply pagination
        const startIndex = (this.currentPage - 1) * this.updatesPerPage;
        const endIndex = startIndex + this.updatesPerPage;
        const paginatedUpdates = filteredUpdates.slice(startIndex, endIndex);
        
        this.renderUpdates(paginatedUpdates);
        this.updatePagination(filteredUpdates.length);
    }

    renderUpdates(updates) {
        console.log('renderUpdates() called with:', updates);
        const container = document.getElementById('updates-container');
        
        if (!container) {
            console.error('Updates container not found');
            return;
        }
        
        if (!updates || updates.length === 0) {
            container.innerHTML = `
                <div class="update-card">
                    <h3>No Updates Available</h3>
                    <p>There are no updates to display at this time. Check back later for the latest news.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = updates.map(update => `
            <article class="update-card">
                <div class="update-header">
                        <h3 class="update-title">${this.escapeHtml(update.title)}</h3>
                    <div class="update-meta-bubbles">
                        <div class="meta-bubble type-bubble">
                            <span class="update-type ${update.type}">${this.escapeHtml(update.type)}</span>
                        </div>
                        <div class="meta-bubble date-bubble">
                            <span class="update-date">${this.formatDate(update.created_at)}</span>
                        </div>
                        ${update.author ? `
                            <div class="meta-bubble author-bubble">
                                <span class="update-author">by ${this.escapeHtml(update.author)}</span>
                            </div>
                        ` : ''}
                        ${update.priority && update.priority !== 'normal' ? `
                            <div class="meta-bubble priority-bubble">
                                <span class="update-priority ${update.priority}">${this.escapeHtml(update.priority)}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="update-content">${this.escapeHtml(update.content)}</div>
            </article>
        `).join('');
    }

    renderUpdatesError() {
        const container = document.getElementById('updates-container');
        container.innerHTML = `
            <div class="update-card">
                <h3>Unable to Load Updates</h3>
                <p>There was an error loading the updates. Please try again later.</p>
            </div>
        `;
    }

    updatePagination(totalFilteredUpdates) {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const pageInfo = document.getElementById('page-info');

        if (prevBtn) {
            prevBtn.disabled = this.currentPage <= 1;
        }

        if (nextBtn) {
            const totalPages = Math.ceil(totalFilteredUpdates / this.updatesPerPage);
            nextBtn.disabled = this.currentPage >= totalPages;
        }

        if (pageInfo) {
            const totalPages = Math.ceil(totalFilteredUpdates / this.updatesPerPage);
            pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global function to show unavailable message
function showUnavailableMessage(platform) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: rgba(17, 24, 39, 0.95);
        backdrop-filter: blur(20px);
        border: 2px solid rgba(16, 185, 129, 0.3);
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(16, 185, 129, 0.5);
        max-width: 400px;
        margin: 20px;
        animation: slideIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">📱</div>
        <h3 style="color: var(--background-primary); margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">
            App Currently Unavailable
        </h3>
        <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 1.5rem; line-height: 1.6;">
            The ${platform} app is currently in development and not yet available for download. 
            Please check back later for updates.
        </p>
        <button onclick="closeUnavailableModal()" style="
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
            color: var(--background-primary);
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 0 30px rgba(16, 185, 129, 0.8)'" 
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 0 20px rgba(16, 185, 129, 0.5)'">
            Got It
        </button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeUnavailableModal();
        }
    });

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeUnavailableModal();
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Store cleanup function
    overlay._cleanup = () => {
        document.removeEventListener('keydown', handleEscape);
    };
}

// Global function to close modal
function closeUnavailableModal() {
    const overlay = document.querySelector('div[style*="position: fixed"]');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (overlay._cleanup) overlay._cleanup();
            document.body.removeChild(overlay);
        }, 300);
    }
}

// Global function to show Android download modal
function showAndroidDownloadModal() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'android-download-modal';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(25px) saturate(180%);
        border: 1px solid rgba(174, 174, 90, 0.2);
        border-radius: 18px;
        padding: 30px;
        text-align: center;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        max-width: 600px;
        margin: 20px;
        animation: slideIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">📱</div>
        <h3 style="color: var(--text-primary); margin-bottom: 1rem; font-size: clamp(20px, 4vw, 24px); font-weight: 700; text-shadow: 0 0 15px rgba(174, 174, 90, 0.3);">
            Download Android App
        </h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6; font-size: clamp(14px, 2.5vw, 16px);">
            Download the Android APK file for direct installation.
        </p>
        <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 1.5rem;">
            <div style="background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(25px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 18px; padding: 24px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);">
                <div style="margin-bottom: 16px;">
                    <h5 style="font-size: clamp(16px, 3vw, 18px); font-weight: 600; color: var(--text-primary); margin: 0 0 8px 0;">APK</h5>
                    <span style="font-size: clamp(13px, 2.5vw, 14px); color: var(--text-secondary); font-weight: 500; display: block; margin-bottom: 8px;">28.7 MB</span>
                    <p style="font-size: clamp(12px, 2.5vw, 13px); color: var(--text-secondary); margin: 0; line-height: 1.4;">Direct APK installation file</p>
                </div>
                <a href="android/sigsec-app.apk" class="download-btn" download style="
                    width: 100%;
                    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
                    color: var(--background-primary);
                    text-decoration: none;
                    padding: 14px 24px;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: clamp(14px, 2.5vw, 16px);
                    text-align: center;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 15px rgba(174, 174, 90, 0.3);
                    display: block;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(174, 174, 90, 0.4)'" 
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(174, 174, 90, 0.3)'">
                    Download APK
                </a>
            </div>
        </div>
        <button onclick="closeAndroidDownloadModal()" style="
            background: rgba(255, 255, 255, 0.08);
            color: var(--text-secondary);
            border: 1px solid rgba(174, 174, 90, 0.2);
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 600;
            font-size: clamp(14px, 2.5vw, 16px);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        " onmouseover="this.style.background='rgba(255, 255, 255, 0.15)'; this.style.transform='translateY(-2px)'" 
           onmouseout="this.style.background='rgba(255, 255, 255, 0.08)'; this.style.transform='translateY(0)'">
            Cancel
        </button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @media (min-width: 768px) {
            .android-download-modal div[style*="flex-direction: column"] {
                max-width: 400px;
                margin: 0 auto;
            }
        }
    `;
    document.head.appendChild(style);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeAndroidDownloadModal();
        }
    });

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeAndroidDownloadModal();
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Store cleanup function
    overlay._cleanup = () => {
        document.removeEventListener('keydown', handleEscape);
    };
}

// Global function to close Android download modal
function closeAndroidDownloadModal() {
    const overlay = document.querySelector('.android-download-modal');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (overlay._cleanup) overlay._cleanup();
            document.body.removeChild(overlay);
        }, 300);
    }
}

// Comprehensive initialization system for GitHub Pages compatibility
let appInstance = null;
let initializationAttempts = 0;
const maxAttempts = 3;

function initializeApp() {
    console.log(`Initialization attempt ${initializationAttempts + 1}/${maxAttempts}`);
    initializationAttempts++;
    
    try {
        if (appInstance) {
            console.log('App already initialized');
            return;
        }
        
        appInstance = new UpdatesApp();
        console.log('UpdatesApp instance created successfully');
        
        // Hide loading messages after successful initialization
        setTimeout(() => {
            const loadingElements = document.querySelectorAll('.loading');
            loadingElements.forEach(el => {
                if (el.style.display !== 'none') {
                    el.style.display = 'none';
                }
            });
        }, 1000);
        
    } catch (error) {
        console.error('Error creating UpdatesApp instance:', error);
        
        if (initializationAttempts < maxAttempts) {
            console.log(`Retrying initialization in 1 second...`);
            setTimeout(initializeApp, 1000);
        } else {
            console.error('Max initialization attempts reached. Showing fallback content.');
            showFallbackContent();
        }
    }
}

function showFallbackContent() {
    console.log('Showing fallback content due to JavaScript errors');
    
    // Hide all loading messages
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => {
        el.style.display = 'none';
    });
    
    // Show noscript content if it exists
    const noscriptElements = document.querySelectorAll('noscript');
    noscriptElements.forEach(noscript => {
        const fallbackContent = noscript.innerHTML;
        noscript.parentNode.insertAdjacentHTML('beforeend', fallbackContent);
    });
    
    // Add error message to main content
    const mainContent = document.querySelector('.main .container');
    if (mainContent) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'status-card error';
        errorDiv.style.marginBottom = '2rem';
        errorDiv.innerHTML = `
            <h4>⚠️ JavaScript Loading Issue</h4>
            <p>There was an issue loading the interactive features. The content above shows the latest information, but some features may not be available.</p>
            <p><strong>Try:</strong> Refreshing the page or checking your internet connection.</p>
        `;
        mainContent.insertBefore(errorDiv, mainContent.firstChild);
    }
}

// Multiple initialization strategies for maximum compatibility
function setupInitialization() {
    console.log('Setting up app initialization...');
    
    // Strategy 1: DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Content Loaded - initializing UpdatesApp');
        initializeApp();
    });
    
    // Strategy 2: Immediate if DOM is ready
    if (document.readyState === 'loading') {
        console.log('DOM still loading, waiting for DOMContentLoaded');
    } else {
        console.log('DOM already loaded, initializing immediately');
        setTimeout(initializeApp, 100);
    }
    
    // Strategy 3: Window load as fallback
    window.addEventListener('load', () => {
        console.log('Window loaded - checking if app initialized');
        if (!appInstance && initializationAttempts < maxAttempts) {
            console.log('App not initialized on window load, trying again...');
            initializeApp();
        }
    });
    
    // Strategy 4: Timeout fallback
    setTimeout(() => {
        if (!appInstance && initializationAttempts < maxAttempts) {
            console.log('Timeout reached, attempting final initialization...');
            initializeApp();
        }
    }, 3000);
}

// Start the initialization process
setupInitialization();
