# Wedding RSVP Application

An interactive web application built with Nuxt.js and PHP to collect and manage wedding RSVPs. The application features a beautiful design with green geometric graphics.

## Features

- Interactive RSVP form
- Wedding details page with venue information, schedule, and FAQs
- Admin dashboard to view and manage RSVPs
- Responsive design for mobile and desktop
- Green geometric design elements
- Secure database storage

## Technology Stack

- **Frontend**: Nuxt.js (Vue.js framework)
- **Backend**: PHP
- **Database**: MySQL (Hetzner database)
- **Styling**: Custom CSS with green geometric design elements

## Project Structure

```
wedding-rsvp/
├── components/
│   ├── GeometricPattern.vue    # SVG pattern component for design elements
│   └── Navigation.vue          # Site navigation component
├── layouts/
│   └── default.vue             # Main layout with geometric decorations
├── pages/
│   ├── index.vue               # RSVP form page
│   ├── details.vue             # Wedding details page
│   ├── admin.vue               # Admin dashboard
│   └── login.vue               # Admin login page
├── middleware/
│   └── auth.js                 # Authentication middleware for admin pages
├── assets/
│   └── css/
│       └── main.css            # Global CSS styles
├── api/
│   ├── rsvp.php                # API endpoint to submit RSVPs
│   └── get-rsvps.php           # API endpoint to retrieve RSVPs for admin
└── nuxt.config.js              # Nuxt.js configuration
```

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- PHP 7.4+
- MySQL database (Hetzner)

### Installation

1. Clone the repository:
   ```
   git clone [repository-url]
   cd wedding-rsvp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file with the following variables:
   ```
   DB_HOST=ho7w.your-database.de
   DB_NAME=jazzya_db1
   DB_USER=jazzya_1
   DB_PASS=VhRNJjx3efMJTZxy
   ADMIN_PASSWORD=wedding2025
   ```

4. Set up the database:
   The database tables will be automatically created when the first RSVP is submitted.

5. Development server:
   ```
   npm run dev
   ```

6. Production build:
   ```
   npm run build
   npm run start
   ```

### PHP API Setup

1. Make sure the PHP files in the `/api` directory are properly configured with your database credentials.

2. For production, set up a PHP server to handle the API requests, or use a hosting provider that supports PHP and MySQL.

3. Update the `nuxt.config