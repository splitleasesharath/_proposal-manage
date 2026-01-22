# Deployment Guide

This guide covers deploying the Proposal Management application to production.

## Prerequisites

- Node.js 18+ installed on deployment server
- Git access to the repository
- Access to your hosting platform
- Environment variables configured

## Environment Setup

### 1. Create Production Environment File

Create a `.env.production` file:

```env
VITE_API_BASE_URL=https://api.split.lease/api
VITE_USE_MOCK_DATA=false
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
```

### 2. Configure API Endpoints

Ensure your backend API is running and accessible at the URL specified in `VITE_API_BASE_URL`.

## Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### 3. Test Production Build Locally

```bash
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## Deployment Options

### Option 1: Static Hosting (Netlify, Vercel, etc.)

#### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod --dir=dist
```

#### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Option 2: Traditional Web Server (Apache, Nginx)

#### Nginx Configuration

Create `/etc/nginx/sites-available/proposal-manage`:

```nginx
server {
    listen 80;
    server_name app.split.lease;

    root /var/www/proposal-manage/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /_proposal-manage {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/proposal-manage /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Apache Configuration

Create `/etc/apache2/sites-available/proposal-manage.conf`:

```apache
<VirtualHost *:80>
    ServerName app.split.lease
    DocumentRoot /var/www/proposal-manage/dist

    <Directory /var/www/proposal-manage/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript text/xml application/xml
    </IfModule>

    # Cache static assets
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
        Header set Cache-Control "max-age=31536000, public, immutable"
    </FilesMatch>
</VirtualHost>
```

Enable the site:
```bash
sudo a2ensite proposal-manage
sudo a2enmod rewrite headers
sudo systemctl reload apache2
```

### Option 3: Docker Deployment

#### Dockerfile

Create `Dockerfile` in the repo root:

```dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf for Docker

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /_proposal-manage {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

#### Build and Run

```bash
docker build -t proposal-manage .
docker run -d -p 80:80 proposal-manage
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

## Post-Deployment

### 1. Verify Deployment

- [ ] Visit the application URL
- [ ] Test filtering functionality
- [ ] Test proposal creation
- [ ] Test status updates
- [ ] Verify API connectivity
- [ ] Check browser console for errors
- [ ] Test on mobile devices

### 2. Monitor Performance

Set up monitoring for:
- Application uptime
- API response times
- Error rates
- User activity

### 3. Set Up SSL/HTTPS

Use Let's Encrypt for free SSL certificates:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d app.split.lease
```

### 4. Configure Backups

Set up automated backups of:
- Database (if applicable)
- User data
- Configuration files

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}

      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=dist
```

## Rollback Procedure

If issues are detected after deployment:

1. **Immediate Rollback** (if using Git-based deployment):
```bash
git revert HEAD
git push origin main
```

2. **Manual Rollback** (if using file-based deployment):
```bash
# Restore previous build
cp -r /var/www/proposal-manage/dist.backup /var/www/proposal-manage/dist
sudo systemctl reload nginx
```

3. **Docker Rollback**:
```bash
docker-compose down
docker-compose up -d <previous-version-tag>
```

## Troubleshooting

### Issue: Blank page after deployment
- Check browser console for errors
- Verify API_BASE_URL is correct
- Check nginx/apache configuration for SPA routing

### Issue: 404 errors on refresh
- Configure server to route all requests to index.html
- Check rewrite rules in server configuration

### Issue: API requests failing
- Verify CORS settings on backend
- Check API_BASE_URL environment variable
- Verify network connectivity

### Issue: Slow loading
- Enable gzip compression
- Check CDN configuration
- Optimize bundle size with code splitting

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Authentication implemented
- [ ] Authorization checks in place
- [ ] Input validation on all forms
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
- [ ] Security headers configured
- [ ] Regular dependency updates

## Performance Optimization

1. **Enable compression** (gzip/brotli)
2. **Configure caching** for static assets
3. **Use CDN** for global distribution
4. **Implement lazy loading** for components
5. **Optimize images** and assets
6. **Monitor bundle size**

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review error logs weekly
- Monitor performance metrics
- Test backup restoration quarterly
- Review security alerts

### Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

For questions or issues, contact the DevOps team or open an issue on GitHub.
