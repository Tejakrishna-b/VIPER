// GitHub OAuth Configuration
// Replace these values with your GitHub OAuth App credentials

const AUTH_CONFIG = {
    // GitHub OAuth App Client ID (create at: https://github.com/settings/developers)
    clientId: 'Ov23licjO6ph0IxnBL8Y',
    
    // Redirect URI (must match your GitHub Pages URL)
    redirectUri: 'https://Tejakrishna-b.github.io/VIPER/',
    
    // Allowed email domains (company emails)
    allowedDomains: [
        '@vertexinc.com',    // Vertex Inc company domain
        '@vertex.com'        // Alternative Vertex domain
    ],
    
    // Allowed specific GitHub usernames (optional)
    allowedUsers: [
        'Tejakrishna-b',     // Your GitHub username
    ],
    
    // Organization requirement (optional)
    // requireOrganization: 'your-org-name'
};

// Authentication Logic
class GitHubAuth {
    constructor(config) {
        this.config = config;
        this.token = null;
        this.user = null;
    }

    async init() {
        // Check if returning from GitHub OAuth
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            await this.handleCallback(code);
            return;
        }

        // Check for existing session
        this.token = sessionStorage.getItem('github_token');
        
        if (this.token) {
            await this.validateToken();
        } else {
            this.redirectToLogin();
        }
    }

    redirectToLogin() {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${this.config.clientId}&redirect_uri=${encodeURIComponent(this.config.redirectUri)}&scope=user:email`;
        window.location.href = authUrl;
    }

    async handleCallback(code) {
        try {
            // Note: This requires a backend proxy for security
            // See setup instructions below
            const response = await fetch('https://YOUR_WORKER_URL.workers.dev/auth/github', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code })
            });

            const data = await response.json();
            this.token = data.access_token;
            sessionStorage.setItem('github_token', this.token);

            // Remove code from URL
            window.history.replaceState({}, document.title, window.location.pathname);

            await this.validateToken();
        } catch (error) {
            console.error('Authentication failed:', error);
            this.showError('Authentication failed. Please try again.');
        }
    }

    async validateToken() {
        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    'Authorization': `token ${this.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Invalid token');
            }

            this.user = await response.json();

            // Get user emails
            const emailResponse = await fetch('https://api.github.com/user/emails', {
                headers: {
                    'Authorization': `token ${this.token}`
                }
            });

            const emails = await emailResponse.json();
            const primaryEmail = emails.find(e => e.primary)?.email || this.user.email;

            // Check if user is authorized
            if (this.isAuthorized(primaryEmail, this.user.login)) {
                this.showContent();
                this.displayUserInfo();
            } else {
                this.showUnauthorized(primaryEmail);
            }

        } catch (error) {
            console.error('Token validation failed:', error);
            sessionStorage.removeItem('github_token');
            this.redirectToLogin();
        }
    }

    isAuthorized(email, username) {
        // Check email domain
        if (email && this.config.allowedDomains.length > 0) {
            const hasAllowedDomain = this.config.allowedDomains.some(domain => 
                email.toLowerCase().endsWith(domain.toLowerCase())
            );
            if (hasAllowedDomain) return true;
        }

        // Check specific usernames
        if (this.config.allowedUsers.length > 0) {
            if (this.config.allowedUsers.includes(username)) return true;
        }

        // If no restrictions configured, allow all authenticated users
        if (this.config.allowedDomains.length === 0 && this.config.allowedUsers.length === 0) {
            return true;
        }

        return false;
    }

    showContent() {
        document.getElementById('auth-gate')?.remove();
        document.getElementById('main-content').style.display = 'block';
    }

    showUnauthorized(email) {
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #f7f9fb; font-family: 'Segoe UI', Arial, sans-serif;">
                <div style="text-align: center; padding: 40px; background: white; border-radius: 8px; box-shadow: 0 2px 16px rgba(0,0,0,0.1); max-width: 500px;">
                    <h1 style="color: #dc3545; margin-bottom: 20px;">⛔ Access Denied</h1>
                    <p style="color: #666; margin-bottom: 20px;">
                        Your account <strong>${email || 'Unknown'}</strong> is not authorized to access this portal.
                    </p>
                    <p style="color: #666; margin-bottom: 30px;">
                        This portal is restricted to authorized company email addresses only.
                    </p>
                    <button onclick="location.reload()" style="background: #007bff; color: white; border: none; padding: 12px 30px; border-radius: 4px; cursor: pointer; font-size: 16px;">
                        Try Different Account
                    </button>
                </div>
            </div>
        `;
    }

    showError(message) {
        alert(message);
        this.redirectToLogin();
    }

    displayUserInfo() {
        const userInfoDiv = document.createElement('div');
        userInfoDiv.id = 'user-info';
        userInfoDiv.style.cssText = 'position: fixed; top: 10px; right: 10px; background: white; padding: 10px 20px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); z-index: 1000;';
        userInfoDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${this.user.avatar_url}" alt="Avatar" style="width: 32px; height: 32px; border-radius: 50%;">
                <div>
                    <div style="font-weight: 600; font-size: 14px;">${this.user.name || this.user.login}</div>
                    <a href="#" onclick="sessionStorage.clear(); location.reload();" style="font-size: 12px; color: #007bff; text-decoration: none;">Logout</a>
                </div>
            </div>
        `;
        document.body.appendChild(userInfoDiv);
    }
}

// Initialize authentication when page loads
document.addEventListener('DOMContentLoaded', () => {
    const auth = new GitHubAuth(AUTH_CONFIG);
    auth.init();
});
