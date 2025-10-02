# AyurSutra - Team Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone/Download the project**
   ```bash
   # Navigate to project directory
   cd react-ayursutra
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Open in Browser**
   - App will run on: `http://localhost:3000`

## 📁 Project Structure

```
react-ayursutra/
├── src/
│   ├── components/          # Reusable UI Components
│   │   ├── AuthModal.js     # Login/Signup Modal
│   │   ├── Navbar.js        # Navigation Bar
│   │   ├── Notification.js  # Toast Notifications
│   │   └── Dashboard*.js    # Dashboard Components
│   ├── pages/              # Main Application Pages
│   │   ├── Home.js         # Landing Page
│   │   ├── Dashboard.js    # User Dashboard
│   │   ├── Scheduling.js   # Appointment Booking
│   │   ├── Progress.js     # Progress Tracking
│   │   └── Chatbot.js      # AI Assistant
│   ├── styles/             # CSS Styling
│   │   └── App.css         # Main Stylesheet
│   ├── utils/              # Helper Functions
│   │   └── storage.js      # Local Storage Utils
│   ├── App.js              # Main App Component
│   └── index.js            # Entry Point
├── public/
│   └── index.html          # HTML Template
├── package.json            # Dependencies
└── README.md               # Documentation
```

## 🎯 Key Features

- ✅ **Authentication System** (Patient/Therapist roles)
- ✅ **Dashboard** with statistics and overview
- ✅ **Therapy Scheduling** with conflict detection
- ✅ **Progress Tracking** with feedback forms
- ✅ **AI Chatbot** with Ayurvedic recommendations
- ✅ **Responsive Design** (Mobile-friendly)
- ✅ **Beautiful Animations** and Ayurvedic theme

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🎨 Theme & Design

- **Colors**: Forest greens, golden accents, earth tones
- **Fonts**: Poppins (body), Playfair Display (headings)
- **Icons**: Emoji-based for universal compatibility
- **Animations**: Smooth CSS transitions and keyframes

## 📱 Testing

### Test User Accounts
- **Patient**: Any email/password combination
- **Therapist**: Any email/password combination
- Authentication is simulated (no backend required)

### Test Features
1. Login as Patient/Therapist
2. Navigate through dashboard
3. Schedule appointments
4. Add progress feedback
5. Use AI chatbot
6. Test mobile responsiveness

## 🔧 Customization

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `App.js`
3. Update navigation in `Navbar.js`

### Styling Changes
- Main styles: `src/styles/App.css`
- Component-specific styles: Inline or CSS classes

### Data Storage
- Currently uses localStorage
- Ready for backend integration
- Helper functions in `src/utils/storage.js`

## 🚨 Troubleshooting

### Common Issues
1. **Port 3000 in use**: Kill process or use different port
2. **Dependencies error**: Delete `node_modules` and run `npm install`
3. **ESLint errors**: Disabled in `.env` file

### Support
- Check console for errors
- Ensure all dependencies are installed
- Verify Node.js version compatibility

## 🎯 Next Steps for Team

1. **Backend Integration**: Replace localStorage with API calls
2. **Real Authentication**: Implement JWT tokens
3. **Database**: Add MongoDB/PostgreSQL
4. **Payment Gateway**: For appointment booking
5. **Real-time Notifications**: WebSocket implementation
6. **Mobile App**: React Native version

---

**Ready for Smart India Hackathon 2024! 🏆**