# GMT 320 Semester Test 2 - University of Pretoria Campus Sustainability Application

**Student Name:** Brandon Cooley
**Student Number:** 21723894
---
## Repository Structure

```
GMT320Semester2/
├── public/
│   ├── 3dmodel.gltf              # Exported 3D campus model from QGIS
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── 3d/                   # 3D viewer components
│   │   │   ├── CampusModelViewer.js  # Main 3D viewer with controls
│   │   │   ├── DataPanel.js      # Building attributes panel
│   │   │   ├── BinPanel.js       # Waste bin information panel
│   │   │   └── ErrorBoundary.js  # Error handling
│   │   ├── auth/                 # Authentication components
│   │   ├── layout/               # Layout components
│   │   └── map/                  # 2D map analysis tools
│   ├── pages/                    # Application pages
│   │   ├── MapViewer.js          # 3D campus viewer page
│   │   ├── Map2D.js              # 2D map analysis
│   │   ├── Dashboard.js          # Metrics dashboard
│   │   └── ...
│   ├── services/                 # Data services
│   │   ├── firebase.js           # Firebase configuration
│   │   ├── sustainabilityData.js # Sustainability data
│   │   └── ...
│   ├── contexts/                 # React contexts
│   ├── App.js                    # Main application component
│   └── index.js                  # Entry point
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## Question 2: Web Mapping Application

### 2.1 3D Model Export to Web Application 
- Exported QGIS 3D model as GLTF format
- Integrated using React Three Fiber and Three.js
- Model located at: [/public/3dmodel.gltf]
- Implemented in: [src/components/3d/CampusModelViewer.js]

### 2.2 Interactive 3D Object Attributes 
- Click functionality for 3D buildings and objects
- Visual highlighting with green glow for buildings, blue for bins
- Attribute extraction from GLTF userData
- Components:
  - Data Panel at: [src/components/3d/DataPanel.js] - Displays building attributes
  - Bin Panel at: [src/components/3d/BinPanel.js] - Displays waste bin information

Displayed Attributes:
- Building ID
- Building Name
- Building Type
- Height (meters)
- Layer Information

### 2.3 Additional Functional Requirement 
This functionality demonstrates one of our PRD's real-time waste bin monitoring and management.

- Interactive waste bin visualization on 3D campus model
- Click on bins to view:
  - Bin type (general, recycling, compost)
  - Current fill level (%)
  - Last emptied date
  - Location coordinates
-Components
- [src/components/3d/BinPanel.js](src/components/3d/BinPanel.js)

### 2.4 Header Bar Implementation 
- header bar with university branding
- Located in: [src/components/3d/CampusModelViewer.js] (lines 449-509)

### Assignment data:
- Screenshot: 3D model in web application
- Screenshot: Building attributes display (Geography Building)
- Screenshot: Header bar implementation
- Screenshot: Additional waste management functionality
Screenshots are all located in google drive
- All code for questions in folder: u21723894_Question2 in google drive

---

## Question 3: Version Control using Git

### 3.1 Repository Creation
- Repository Name: Cooley-u21723894-SemesterTest2
- GitHub URL: [https://github.com/BrandonCooley/Cooley-u21723894-SemesterTest2/]

### 3.3 Additional Features Branch 
Branch: Added-Functions
---

### Installation Steps

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Access the application:
Open [http://localhost:3000](http://localhost:3000) in your browser


## Demo Login Credentials

For testing the application:
- Email: Demo@somethingspatial.com
- Password: Demopassword