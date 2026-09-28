# Cyrius Gonzales Portfolio

A lightweight, static personal portfolio built with HTML, CSS, and vanilla JavaScript. It runs by opening `index.html` directly and has no build step or dependencies.

## Structure

- `index.html`, `projects.html`, `services.html`, `about.html`, `contact.html`: standalone pages
- `css/style.css`: shared layout, components, and responsive rules
- `css/<page>.css`: page-specific presentation
- `js/data.js`: editable portfolio content
- `js/main.js`: shared navigation, profile fallback, and year
- `js/projects.js`: all-work filters, live website previews, and image viewer
- `js/contact.js`: FAQ accordion and email composition
- `assets/profile/profile picture.png`: sidebar portrait
- `assets/profile/favicon-dev.svg`: monochrome developer favicon
- `assets/graphic-design/`: add graphic design images
- `assets/photography/`: add photography images

## Run locally

Open `index.html` in a current browser. No installation, server, or build command is needed.

## Add website projects

Edit `websiteProjects` in `js/data.js`. Add one object per website with a unique `id`, a `name`, a `description`, and an `https://` `link`. The Projects page shows every item together and can filter to websites, graphic design, photography, or all work. Website cards and their enlarged preview embed the live site in an iframe by default. Set an optional `thumbnail` image URL to display a static card image; set `embedPreview: false` when the host blocks framing. ExecuDesk uses its Open Graph image for the card thumbnail and currently sends `X-Frame-Options: SAMEORIGIN`; enabling its embedded preview requires removing that header and allowing the portfolio origin in the Vercel site's `Content-Security-Policy` `frame-ancestors` directive.

## Add graphic design and photography

Copy real work into `assets/graphic-design/` or `assets/photography/`, then add each image path and title to the matching array in `js/data.js`. The first image becomes the card thumbnail; selecting it opens the larger image viewer. Example path: `assets/graphic-design/design-01.jpg`. Add useful `alt` text. Empty categories show a prompt instead of fabricated images.

## Edit services and FAQs

Update `services` and `faqs` in `js/data.js`. FAQ entries use a `question` and `answer`. The FAQ page uses a single-open, keyboard-accessible accordion.

## Profile, social links, and email

Replace `assets/profile/profile picture.png` with your portrait (keep the same filename). The sidebar social links point to the Facebook and Instagram profiles. Set `contactEmail` in `js/data.js` to your email address; the contact form validates and opens the visitor's email application with the fields prefilled. Nothing is sent to a server. The site uses one light theme and has no theme toggle.

## Deploy

For Netlify, drag the project folder into the Netlify deploy area, or connect its Git repository and use the project root as the publish directory. There is no build command.

For GitHub Pages, push the files to a repository, then enable Pages in repository settings and select the branch and root directory. Keep relative file paths intact. The site can also be deployed to any static host.
