import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/Home';
import { NotFoundPage } from '../pages/NotFound';
import { ContentPage } from '../templates/ContentPage';
import { DocumentListingPage } from '../templates/DocumentListingPage';
import { NewsListingPage } from '../templates/NewsListingPage';
import { GalleryPage } from '../templates/GalleryPage';
import { ContactPage } from '../templates/ContactPage';

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
      { path: 'about/philosophy', element: <ContentPage {...ABOUT_SECTIONS['philosophy']} categoryLabel="About Us" /> },
      { path: 'about/enrollment', element: <ContentPage {...ABOUT_SECTIONS['enrollment']} categoryLabel="About Us" /> },
      { 
        path: 'about/mandatory-information', 
        element: <DocumentListingPage initialCategory="mandatory-information" pageTitle="Mandatory Public Disclosures" pageSubtitle="Official CBSE affiliation, land, building safety, and sanitation certificates" /> 
      },
      { path: 'about/management', element: <ContentPage {...ABOUT_SECTIONS['management']} categoryLabel="About Us" /> },

      /* ACADEMICS ROUTES */
      { path: 'academics', element: <ContentPage {...ACADEMIC_SECTIONS['curriculum']} categoryLabel="Academics" /> },
      { path: 'academics/curriculum', element: <ContentPage {...ACADEMIC_SECTIONS['curriculum']} categoryLabel="Academics" /> },
      { path: 'academics/co-curricular', element: <ContentPage {...ACADEMIC_SECTIONS['co-curricular']} categoryLabel="Academics" /> },
      { path: 'academics/faculty', element: <ContentPage {...ACADEMIC_SECTIONS['faculty']} categoryLabel="Academics" /> },
      { path: 'academics/teaching-strategy', element: <ContentPage {...ACADEMIC_SECTIONS['teaching-strategy']} categoryLabel="Academics" /> },
      { path: 'academics/infrastructure', element: <ContentPage {...ACADEMIC_SECTIONS['infrastructure']} categoryLabel="Academics" /> },

      /* ADMISSIONS ROUTES */
      { path: 'admissions', element: <ContentPage {...ABOUT_SECTIONS['enrollment']} categoryLabel="Admissions" /> },
      { path: 'admissions/guidelines', element: <ContentPage {...ABOUT_SECTIONS['enrollment']} categoryLabel="Admissions" /> },

      /* UNIQUE FEATURES ROUTES */
      { path: 'features', element: <ContentPage {...FEATURE_SECTIONS['spiritual-activities']} categoryLabel="Unique Features" /> },
      { path: 'features/spiritual-activities', element: <ContentPage {...FEATURE_SECTIONS['spiritual-activities']} categoryLabel="Unique Features" /> },
      { path: 'features/career-counselling', element: <ContentPage {...FEATURE_SECTIONS['career-counselling']} categoryLabel="Unique Features" /> },
      { path: 'features/education-tours', element: <ContentPage {...FEATURE_SECTIONS['education-tours']} categoryLabel="Unique Features" /> },
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

      /* DOWNLOADS ROUTES */
      { 
        path: 'downloads', 
        element: <DocumentListingPage pageTitle="Downloads Center" pageSubtitle="Official sample papers, admission forms, disclosures, and certificates" /> 
      },
      { 
        path: 'downloads/sample-papers', 
        element: <DocumentListingPage initialCategory="sample-papers" pageTitle="Sample Question Papers" pageSubtitle="CBSE Class 1 to 10 question papers and evaluation sets" /> 
      },
      { 
        path: 'downloads/evaluation-papers', 
        element: <DocumentListingPage initialCategory="sample-papers" pageTitle="Evaluation III Question Papers" pageSubtitle="Standard 1 to 5 Evaluation III Question papers" /> 
      },
      { 
        path: 'downloads/admissions', 
        element: <DocumentListingPage initialCategory="admissions" pageTitle="Admission Registration Forms" pageSubtitle="Download official application forms for Nursery, KG, and Std I to IX" /> 
      },
      { 
        path: 'downloads/transfer-certificates', 
        element: <DocumentListingPage initialCategory="admissions" pageTitle="Transfer Certificates (TC)" pageSubtitle="Download official Transfer Certificate records (TC 2020, 2021, 2023)" /> 
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

      /* CONTACT ROUTE */
      { path: 'contact', element: <ContactPage /> },

      /* 404 CATCH-ALL ROUTE */
      { path: '*', element: <NotFoundPage /> },
    ]
  }
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
