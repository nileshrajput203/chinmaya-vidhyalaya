import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/Home';
import { NotFoundPage } from '../pages/NotFound';
import { FaqPage } from '../pages/Faq';
import { ContentPage } from '../templates/ContentPage';
import { DocumentListingPage } from '../templates/DocumentListingPage';
import { NewsListingPage } from '../templates/NewsListingPage';
import { GalleryPage } from '../templates/GalleryPage';
import { ContactPage } from '../templates/ContactPage';
import { CareersPage } from '../templates/CareersPage';
import { AlumniPage } from '../templates/AlumniPage';
import { BlogPage } from '../templates/BlogPage';
import { RegistrationFormPage } from '../pages/Admissions/RegistrationFormPage';
import { FeeStructurePage } from '../pages/Admissions/FeeStructurePage';
import { SchoolCalendarPage } from '../pages/Admissions/SchoolCalendarPage';
import TimelineDemo from '../components/ui/timeline-demo';
import IntegrationDemo from '../components/ui/demo';

import { ABOUT_SECTIONS } from '../data/about';
import { ACADEMIC_SECTIONS } from '../data/academics';
import { FEATURE_SECTIONS } from '../data/features';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },

      /* ABOUT ROUTES */
      { path: 'about', element: <ContentPage {...ABOUT_SECTIONS['history']} categoryLabel="About Us" /> },
      { path: 'about/history', element: <ContentPage {...ABOUT_SECTIONS['history']} categoryLabel="About Us" /> },
      { path: 'about/mission-vision', element: <ContentPage {...ABOUT_SECTIONS['mission-vision']} categoryLabel="About Us" /> },
      { path: 'about/management', element: <ContentPage {...ABOUT_SECTIONS['management']} categoryLabel="About Us" /> },
      { 
        path: 'about/mandatory-information', 
        element: <DocumentListingPage initialCategory="mandatory-information" pageTitle="Important Disclosures & Transfer Certificates" pageSubtitle="Official CBSE affiliation, land, building safety, sanitation certificates, and Transfer Certificates (TC)" /> 
      },
      { path: 'about/important-disclosures', element: <Navigate to="/about/mandatory-information" replace /> },
      { path: 'about/swami-chinmayananda', element: <ContentPage {...ABOUT_SECTIONS['swami-chinmayananda']} categoryLabel="About Us" /> },
      { path: 'about/heritage', element: <ContentPage {...ABOUT_SECTIONS['swami-chinmayananda']} categoryLabel="About Us" /> },
      { path: 'about/philosophy', element: <ContentPage {...ABOUT_SECTIONS['philosophy']} categoryLabel="About Us" /> },
      { path: 'about/4-pillars', element: <ContentPage {...ABOUT_SECTIONS['philosophy']} categoryLabel="About Us" /> },
      { path: 'about/four-pillars', element: <Navigate to="/about/philosophy" replace /> },
      { path: 'about/enrollment', element: <Navigate to="/admissions/guidelines" replace /> },
      { path: 'about/transfer-certificates', element: <Navigate to="/about/mandatory-information" replace /> },

      /* ACADEMICS ROUTES */
      { path: 'academics', element: <ContentPage {...ACADEMIC_SECTIONS['curriculum']} categoryLabel="Academics" /> },
      { path: 'academics/curriculum', element: <ContentPage {...ACADEMIC_SECTIONS['curriculum']} categoryLabel="Academics" /> },
      { path: 'academics/co-curricular', element: <ContentPage {...ACADEMIC_SECTIONS['co-curricular']} categoryLabel="Academics" /> },
      { path: 'academics/faculty', element: <Navigate to="/academics/curriculum" replace /> },
      { path: 'academics/teaching-strategy', element: <Navigate to="/academics/curriculum" replace /> },
      { path: 'academics/infrastructure', element: <ContentPage {...ACADEMIC_SECTIONS['infrastructure']} categoryLabel="Academics" /> },

      /* ADMISSIONS ROUTES */
      { path: 'admissions', element: <ContentPage {...ABOUT_SECTIONS['enrollment']} categoryLabel="Admissions" /> },
      { path: 'admissions/guidelines', element: <ContentPage {...ABOUT_SECTIONS['enrollment']} categoryLabel="Admissions" /> },
      { path: 'admissions/forms', element: <RegistrationFormPage /> },
      { path: 'admissions/registration', element: <RegistrationFormPage /> },
      { path: 'admissions/registration-forms', element: <RegistrationFormPage /> },
      { path: 'registration-forms', element: <RegistrationFormPage /> },
      { path: 'admissions/fee-structure', element: <FeeStructurePage /> },
      { path: 'admissions/fees', element: <Navigate to="/admissions/fee-structure" replace /> },
      { path: 'fee-structure', element: <Navigate to="/admissions/fee-structure" replace /> },
      { path: 'fees', element: <Navigate to="/admissions/fee-structure" replace /> },
      { path: 'admissions/calendar', element: <SchoolCalendarPage /> },
      { path: 'admissions/academic-calendar', element: <Navigate to="/admissions/calendar" replace /> },
      { path: 'calendar', element: <Navigate to="/admissions/calendar" replace /> },
      { path: 'school-calendar', element: <Navigate to="/admissions/calendar" replace /> },
      { path: 'academic-calendar', element: <Navigate to="/admissions/calendar" replace /> },
      { path: 'admission/guidelines', element: <Navigate to="/admissions/guidelines" replace /> },
      { path: 'admission-guidelines', element: <Navigate to="/admissions/guidelines" replace /> },
      { path: 'admissions-guidelines', element: <Navigate to="/admissions/guidelines" replace /> },
      { path: 'guidelines', element: <Navigate to="/admissions/guidelines" replace /> },
      { path: 'admission', element: <Navigate to="/admissions/guidelines" replace /> },

      /* UNIQUE FEATURES ROUTES */
      { path: 'features', element: <ContentPage {...FEATURE_SECTIONS['spiritual-activities']} categoryLabel="Unique Features" /> },
      { path: 'features/spiritual-activities', element: <ContentPage {...FEATURE_SECTIONS['spiritual-activities']} categoryLabel="Unique Features" /> },
      { path: 'features/4-pillars', element: <ContentPage {...FEATURE_SECTIONS['four-pillars']} categoryLabel="Unique Features" /> },
      { path: 'features/four-pillars', element: <ContentPage {...FEATURE_SECTIONS['four-pillars']} categoryLabel="Unique Features" /> },
      { path: 'features/holistic-development', element: <ContentPage {...FEATURE_SECTIONS['holistic-development']} categoryLabel="Unique Features" /> },
      { path: 'features/career-counselling', element: <ContentPage {...FEATURE_SECTIONS['career-counselling']} categoryLabel="Unique Features" /> },
      { path: 'features/education-tours', element: <Navigate to="/features/holistic-development" replace /> },
      { path: 'features/library', element: <ContentPage {...FEATURE_SECTIONS['library']} categoryLabel="Unique Features" /> },

      /* NEWS & EVENTS ROUTES */
      { path: 'news', element: <NewsListingPage /> },
      { path: 'news/latest-updates', element: <NewsListingPage /> },
      { path: 'news/festivals', element: <NewsListingPage /> },
      { 
        path: 'news/circulars', 
        element: <DocumentListingPage initialCategory="circulars" pageTitle="School Circulars" pageSubtitle="Official circulars, book notices, and library guidelines" /> 
      },

      /* GALLERY ROUTE */
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'activities/gallery', element: <Navigate to="/gallery" replace /> },
      { path: 'activities/sports', element: <Navigate to="/features/holistic-development" replace /> },

      /* FAQ ROUTE */
      { path: 'faq', element: <FaqPage /> },

      /* DOWNLOADS ROUTES */
      { 
        path: 'downloads', 
        element: <DocumentListingPage pageTitle="Downloads Center" pageSubtitle="Official sample papers, admission forms, disclosures, and certificates" /> 
      },
      { 
        path: 'downloads/sample-papers', 
        element: <DocumentListingPage initialCategory="sample-papers" pageTitle="Sample Question Papers" pageSubtitle="CBSE Class 1 to 10 question papers term-wise" /> 
      },
      { 
        path: 'downloads/evaluation-papers', 
        element: <DocumentListingPage initialCategory="sample-papers" pageTitle="Evaluation III Question Papers" pageSubtitle="Standard 1 to 5 Evaluation III Question papers" /> 
      },
      { 
        path: 'downloads/admissions', 
        element: <RegistrationFormPage /> 
      },
      { 
        path: 'downloads/transfer-certificates', 
        element: <DocumentListingPage initialCategory="mandatory-information" pageTitle="Transfer Certificates (TC)" pageSubtitle="View official Transfer Certificate records (TC 2020, 2021, 2023)" /> 
      },
      { 
        path: 'downloads/recruitment', 
        element: <DocumentListingPage initialCategory="admissions" pageTitle="Faculty Recruitment Application" pageSubtitle="Download application form for the post of teacher" /> 
      },
      { 
        path: 'downloads/mandatory-information', 
        element: <DocumentListingPage initialCategory="mandatory-information" pageTitle="Mandatory Public Disclosures" pageSubtitle="CBSE SARAS, safety certificates, affiliation letters, and RTE recognition" /> 
      },
      { 
        path: 'downloads/documents', 
        element: <DocumentListingPage pageTitle="Official Documents & Forms" pageSubtitle="Download official certificates, disclosures, and administrative forms" /> 
      },
      { path: 'essential-student-documents', element: <Navigate to="/downloads/documents" replace /> },
      { path: 'downloads/essential-student-documents', element: <Navigate to="/downloads/documents" replace /> },
      { path: 'student-documents', element: <Navigate to="/downloads/documents" replace /> },

      /* CAREERS, ALUMNI & BLOG ROUTES */
      { path: 'careers', element: <CareersPage /> },
      { path: 'alumni', element: <AlumniPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blogs', element: <Navigate to="/blog" replace /> },
      { path: 'blog/:slug', element: <BlogPage /> },

      { path: 'timeline-demo', element: <TimelineDemo /> },
      { path: 'integration-demo', element: <IntegrationDemo /> },
      { path: 'contact', element: <ContactPage /> },

      /* 404 CATCH-ALL ROUTE */
      { path: '*', element: <NotFoundPage /> },
    ]
  }
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
