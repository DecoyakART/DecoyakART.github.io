# Decoyak ART Website

A complete responsive Arabic website for Decoyak ART creative studio, built with HTML, CSS, JavaScript, GSAP, and Three.js.

## Features

- **RTL Arabic Layout**: Fully right-to-left Arabic interface with Cairo/Tajawal fonts
- **Dark Elegant Theme**: Dark background (#0f0f0f) with gold accents (#d4af37)
- **String Art Animation**: Sophisticated 3D string-art animation forming "Decoyak ART" text
- **Logo Display**: Prominent logo display in hero section
- **GSAP Animations**: Smooth scroll-triggered animations throughout all sections
- **3D Gallery**: Interactive 3D floating cards with hover effects and lightbox
- **Lazy Loading**: Optimized image loading for better performance
- **Social Media Section**: 3D animated buttons for Facebook and TikTok with glow effects
- **Contact Form**: Integrated with FormSubmit.co (already configured)
- **SEO Optimized**: Meta tags, structured data (JSON-LD), and semantic HTML
- **Fully Responsive**: Works perfectly on all devices (desktop, tablet, mobile)

## File Structure

```
/
├── assets/
│   └── images/
│       └── logo.png (add your logo here)
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── three-setup.js
├── index.html
└── README.md
```

## Setup Instructions

1. **Logo**: 
   - Your logo should be placed at `/assets/images/logo.png`
   - The logo is automatically displayed in the hero section
   - If the logo doesn't exist, the container will hide gracefully

2. **Form Email**: 
   - Already configured: `Decoyak2@gmail.com`
   - To change: Update the form action in `index.html` (line 122)

3. **Add Social Media Links**:
   - Update Facebook link (line 102): Replace `https://facebook.com` with your Facebook page URL
   - Update TikTok link (line 108): Replace `https://tiktok.com` with your TikTok profile URL
   - Also update in the structured data JSON-LD (around line 165)

4. **Add Gallery Images**:
   - Place your artwork images in `/assets/images/`
   - Name them as: `artwork-1.jpg`, `artwork-2.jpg`, `artwork-3.jpg`, etc.
   - Images are lazy-loaded for better performance
   - If images don't exist, placeholder text will show

5. **SEO Configuration**:
   - Update the website URL in structured data (line 165)
   - Update social media links in structured data
   - Meta tags are already configured with Arabic content

## Technologies Used

- **HTML5**: Semantic markup with SEO optimization
- **CSS3**: Custom styling with RTL support, Arabic fonts (Cairo/Tajawal)
- **JavaScript (ES6+)**: Vanilla JavaScript with Intersection Observer API
- **GSAP 3.12.2**: Animation library (ScrollTrigger, animations)
- **Three.js r128**: 3D graphics library for string-art animation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Key Features Explained

### String Art Animation
- The hero section features a sophisticated 3D string-art animation
- Lines animate from random positions to form "Decoyak ART" text
- Uses GSAP for smooth animations with easing
- Includes glowing particles at line intersections
- Parallax effect based on mouse movement

### Performance Optimizations
- Lazy loading for gallery images using Intersection Observer
- requestAnimationFrame for smooth 3D animations
- Optimized Three.js rendering with performance limits
- Deferred script loading

### SEO Features
- Complete meta tags (description, keywords, Open Graph, Twitter)
- Structured data (JSON-LD) for organization and social links
- Semantic HTML5 markup
- Arabic language support with proper lang attribute

## Notes

- All text content is in Arabic (RTL)
- The website uses a dark theme (#0f0f0f) with gold accents (#d4af37)
- All animations are optimized for performance
- The form uses FormSubmit.co for email delivery (already configured)
- Logo is displayed prominently in hero section
- Gallery images are lazy-loaded for better performance

## Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --dark-bg: #0f0f0f;
    --gold: #d4af37;
    --gold-glow: rgba(212, 175, 55, 0.5);
}
```

### Animations
Adjust animation timings and effects in `js/app.js`

### 3D Effects
Modify Three.js scene settings in `js/three-setup.js`

## License

This project is created for Decoyak ART. All rights reserved.

