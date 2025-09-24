# AgriMind Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from agricultural and mobile-first applications like WhatsApp, Google Lens, and farming apps. The design prioritizes accessibility, simplicity, and offline-first functionality for users in rural areas with varying literacy levels.

## Core Design Principles
- **Mobile-first**: Designed primarily for smartphone usage
- **High contrast**: Ensures visibility in bright outdoor conditions
- **Large touch targets**: Accommodates users wearing gloves or with calloused hands
- **Minimal data usage**: Lightweight design for areas with poor connectivity
- **Visual communication**: Heavy use of icons and images to transcend literacy barriers

## Color Palette
**Light Mode:**
- Primary: 120 60% 35% (Deep agricultural green)
- Secondary: 45 70% 50% (Warm earth brown)
- Accent: 200 70% 45% (Trust-building blue)
- Success: 140 60% 40% (Healthy plant green)
- Warning: 35 80% 55% (Nutrient deficiency orange)
- Error: 10 70% 50% (Disease/pest red)

**Dark Mode:**
- Primary: 120 40% 70% (Lighter green for contrast)
- Secondary: 45 30% 70% (Lighter earth tone)
- Background: 220 15% 15% (Deep neutral)

## Typography
- **Primary**: Roboto (excellent mobile readability)
- **Secondary**: Noto Sans (multilingual support)
- Large font sizes throughout (minimum 16px body text)
- Bold weights for important information

## Layout System
**Tailwind Spacing**: Consistently use units of 3, 4, 6, 8, 12, 16
- p-4 for standard padding
- m-6 for section spacing
- h-12 for touch targets
- gap-4 for component spacing

## Component Library

### Core Components
- **Camera Capture Button**: Large, prominent with camera icon
- **Voice Input**: Circular record button with visual feedback
- **Diagnosis Cards**: High-contrast cards showing plant/soil analysis
- **Action Buttons**: Large, color-coded buttons for different farming actions
- **Progress Indicators**: Simple visual progress for offline sync

### Navigation
- **Bottom Tab Bar**: 4-5 main sections (Camera, Voice, History, Community, Profile)
- **Simple Header**: Logo and offline indicator
- **Breadcrumbs**: For multi-step processes

### Forms
- **Voice-to-Text Input**: Large microphone button with waveform animation
- **Image Upload**: Drag-and-drop with large preview areas
- **Simple Dropdowns**: Large touch-friendly selectors

### Data Displays
- **Weather Cards**: Visual weather icons with temperature
- **Crop Calendar**: Simple grid with color-coded planting/harvest times
- **Disease Gallery**: Image grid with clear labels

## Images
**Hero Section**: Large hero image showing a farmer using smartphone in field (bright, optimistic, diverse representation)

**Throughout App**:
- Plant disease reference photos
- Healthy vs. unhealthy crop comparisons
- Soil texture examples
- Weather condition illustrations
- Step-by-step farming instruction visuals

**Placement**: Images should dominate most screens to aid non-literate users, with minimal text overlays.

## Animations
**Minimal Usage Only**:
- Camera shutter animation
- Voice recording pulse
- Loading spinners for AI analysis
- Simple slide transitions between screens

## Accessibility Features
- High contrast mode for outdoor use
- Large touch targets (minimum 44px)
- Voice navigation support
- Offline-first design with clear sync indicators
- Multi-language support with flag icons

This design prioritizes functionality and accessibility over aesthetic flourishes, ensuring the app serves farmers effectively in challenging rural environments.