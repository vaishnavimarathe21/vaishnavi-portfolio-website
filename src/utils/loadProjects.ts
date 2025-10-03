export interface ProjectData {
  id?: number
  title: string
  description: string
  image: string | null
  images?: string[]
  technologies: string[]
  category: string
  date: string
  status: string
  githubUrl: string
  liveUrl: string | null
  features: string[]
  slug: string
  content?: string
  readingTime?: number
}

// Static project data - for now, let's use hardcoded data to get it working
const staticProjects: ProjectData[] = [
  {
    id: 1,
    slug: 'california-housing-dashboard',
    title: 'California Housing Dashboard',
    description: 'Advanced interactive dashboard for California housing price prediction using linear regression and its variants. Features multiple ML models (Linear, Polynomial, Ridge, Lasso), geospatial visualizations, SHAP explanations, and modern Streamlit UI with glassmorphism design.',
    image: null,
    images: [],
    technologies: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'Scikit-learn', 'SHAP', 'Plotly', 'Matplotlib'],
    category: 'Data Science',
    date: '2024-01-15',
    status: 'Completed',
    githubUrl: 'https://github.com/vaishnavimarathe21/California-Housing-Dashboard',
    liveUrl: null,
    features: [
      'Multiple regression models with hyperparameter tuning',
      'Interactive geospatial maps and partial dependence plots',
      'SHAP explanations for model interpretability',
      'Feature engineering with region clustering and interaction terms',
      'Model persistence and downloadable predictions/coefficients',
      'Modern UI with gradient backgrounds and card layouts',
      'Custom data upload for prediction and live model comparison'
    ],
    content: `# California Housing Dashboard

## Project Overview

This project is an advanced, interactive dashboard for California housing price prediction using linear regression and its variants. It features a Streamlit web app with rich visualizations, model comparison, feature engineering, and explainability.

## Key Features

### Multiple Regression Models
- **Linear Regression** - Basic linear model for baseline predictions
- **Polynomial Regression** - Captures non-linear relationships
- **Ridge Regression** - L2 regularization to prevent overfitting
- **Lasso Regression** - L1 regularization with feature selection

### Advanced Visualizations
- **Geospatial Maps** - Interactive maps showing predictions and errors across California
- **Partial Dependence Plots (PDP)** - Shows how individual features affect predictions
- **Feature Importance** - Coefficient analysis and SHAP explanations
- **Residuals Analysis** - Loss curves and correlation heatmaps

### User Experience
- **Downloadable Predictions** - Export model results and coefficients
- **Custom Data Upload** - Upload your own data for predictions
- **Live Model Comparison** - Side-by-side model performance comparison
- **Modern UI** - Glassmorphism design with gradient backgrounds`,
    readingTime: 3
  },
  {
    id: 2,
    slug: 'aws-cloud-data-pipeline',
    title: 'AWS Cloud Data Pipeline',
    description: 'End-to-end AWS data engineering solution for analyzing global YouTube trending video data. Built scalable, cloud-native pipeline to ingest, process, and analyze 200,000+ records using S3, Glue, Lambda, Athena, and QuickSight.',
    image: '/images/projects/Youtube-data-engineering/DashboardImg2.png',
    images: [
      '/images/projects/Youtube-data-engineering/DashboardImg1.png',
      '/images/projects/Youtube-data-engineering/DashboardImg2.png',
      '/images/projects/Youtube-data-engineering/DashboardImg3.png'
    ],
    technologies: ['AWS S3', 'AWS Glue', 'AWS Lambda', 'AWS Athena', 'QuickSight', 'Python', 'SQL', 'AWS IAM'],
    category: 'Data Engineering',
    date: '2024-01-20',
    status: 'Completed',
    githubUrl: 'https://github.com/vaishnavimarathe21/Data-Engineering-Youtube-Data-Analysis',
    liveUrl: null,
    features: [
      'Processed 200,000+ YouTube records across multiple regions',
      '90% reduction in data redundancy through ETL optimization',
      '60% faster query performance with optimized data structures',
      'Dynamic QuickSight dashboards for real-time analytics',
      'Serverless data integration with AWS Glue',
      'Scalable data lake architecture with S3',
      'Interactive query service with AWS Athena'
    ],
    content: `# AWS Cloud Data Pipeline

## Project Overview

This project showcases an end-to-end AWS data engineering solution for analyzing global YouTube trending video data. A scalable, cloud-native pipeline was built to ingest, process, and analyze large volumes of structured and semi-structured data using AWS services.

## Architecture & Services

### Data Lake Architecture
- **Amazon S3** - Scalable object storage for raw and processed data
- **AWS Glue** - Serverless ETL service for data transformation
- **AWS Lambda** - Event-driven compute for data processing
- **AWS Athena** - Interactive query service for S3 data
- **QuickSight** - Business intelligence and visualization platform

### Data Flow
1. **Data Ingestion** - YouTube trending videos from multiple regions
2. **Data Processing** - ETL transformations using AWS Glue
3. **Data Storage** - Structured storage in S3 data lake
4. **Data Analysis** - SQL queries using AWS Athena
5. **Data Visualization** - Dynamic dashboards in QuickSight`,
    readingTime: 4
  },
  {
    id: 3,
    slug: 'real-time-height-measurement',
    title: 'Real-Time Height Measurement System',
    description: 'Sophisticated computer vision-based height measurement system using laptop camera for real-time measurements. Built with Python FastAPI backend and React TypeScript frontend, featuring Google MediaPipe for 33 precise body landmarks.',
    image: '/images/projects/Height-Measurement/HeightMeasurement.png',
    images: ['/images/projects/Height-Measurement/HeightMeasurement.png'],
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'MediaPipe', 'OpenCV', 'Kalman Filter', 'WebSockets', 'CUDA'],
    category: 'Computer Vision',
    date: '2024-01-25',
    status: 'Completed',
    githubUrl: 'https://github.com/vaishnavimarathe21/Real-Time-Height-Measurement-System',
    liveUrl: null,
    features: [
      '±2cm measurement accuracy with 95%+ detection confidence',
      'Real-time 30 FPS processing with <100ms latency',
      'Smart auto-calibration using torso length with 40 samples',
      'Kalman filter for data smoothing and noise reduction',
      'Beautiful glassmorphism UI with responsive design',
      'WebSocket API for real-time video processing',
      'GPU acceleration with CUDA 11.7 support',
      'Cross-platform compatibility across all major browsers'
    ],
    content: `# Real-Time Height Measurement System

## Project Overview

A sophisticated computer vision-based height measurement system that uses your laptop camera to measure a person's height in real-time. Built with Python FastAPI backend and React TypeScript frontend, featuring Google MediaPipe for precise pose detection and beautiful glassmorphism UI.

## Key Features

### AI-Powered Detection
- **Google MediaPipe** - 33 precise body landmarks detection
- **Pose Estimation** - Real-time human pose tracking
- **Landmark Accuracy** - 95%+ detection confidence
- **Multi-person Support** - Can detect multiple people simultaneously

### Smart Calibration System
- **Auto-Calibration** - Uses torso length for reference
- **40 Sample Collection** - Robust calibration with outlier filtering
- **Dynamic Adjustment** - Adapts to different environments
- **Calibration Validation** - Ensures measurement accuracy

### Performance Metrics
- **±2cm Accuracy** - Highly precise height measurements
- **30 FPS Processing** - Real-time video processing
- **<100ms Latency** - Near-instantaneous results
- **GPU Acceleration** - CUDA 11.7 support for faster processing`,
    readingTime: 5
  }
]

// Client-side project loading using static data for now
export async function loadProjects(): Promise<ProjectData[]> {
  try {
    // Return static projects for now
    return staticProjects
  } catch (error) {
    console.error('Error loading projects:', error)
    throw error
  }
}

// Get project by slug
export async function loadProject(slug: string): Promise<ProjectData | null> {
  try {
    const projects = await loadProjects()
    return projects.find(project => project.slug === slug) || null
  } catch (error) {
    console.error('Error loading project:', error)
    return null
  }
}

// Get featured projects
export async function getFeaturedProjects(): Promise<ProjectData[]> {
  try {
    const projects = await loadProjects()
    return projects.filter(project => project.status === 'Completed')
  } catch (error) {
    console.error('Error loading featured projects:', error)
    return []
  }
}

// Get projects by category
export async function getProjectsByCategory(category: string): Promise<ProjectData[]> {
  try {
    const projects = await loadProjects()
    return projects.filter(project => 
      project.category.toLowerCase() === category.toLowerCase()
    )
  } catch (error) {
    console.error('Error loading projects by category:', error)
    return []
  }
}

// Get all unique categories
export async function getAllCategories(): Promise<string[]> {
  try {
    const projects = await loadProjects()
    const categories = new Set(projects.map(project => project.category))
    return Array.from(categories).sort()
  } catch (error) {
    console.error('Error loading categories:', error)
    return []
  }
}

// Search projects
export async function searchProjects(query: string): Promise<ProjectData[]> {
  try {
    const projects = await loadProjects()
    const lowercaseQuery = query.toLowerCase()
    
    return projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.category.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
    )
  } catch (error) {
    console.error('Error searching projects:', error)
    return []
  }
}