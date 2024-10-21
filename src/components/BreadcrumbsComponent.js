import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';

const BreadcrumbsComponent = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const excludedPages = ['login'];
    const shouldRenderBreadcrumbs = !excludedPages.includes(pathnames[0]);

    if (!shouldRenderBreadcrumbs) return null;

    const userRole = localStorage.getItem('role');
    let homeLink = '/login';

    switch (userRole) {
        case 'CLIENT':
            homeLink = '/client';
            break;
        case 'AGENT':
            homeLink = '/agent';
            break;
        case 'ADMIN':
            homeLink = '/admin';
            break;
        default:
            homeLink = '/login';
            break;
    }

    return (
        <Breadcrumbs 
            aria-label="breadcrumb" 
            sx={{ fontSize: '20px', padding: '8px', '& .MuiBreadcrumbs-li': { margin: '0 4px' } }}
        >
            <Link to={homeLink} style={{ fontSize: '20px', textDecoration: 'none' }}>Acceuil</Link>
            {pathnames.length > 0 && (
                pathnames.map((value, index) => {
                    if (index === pathnames.length - 1) {
                        return (
                            <Typography color="textPrimary" key={index} sx={{ fontSize: '20px' }}>
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </Typography>
                        );
                    }
                    return null;
                })
            )}
        </Breadcrumbs>
    );
};

export default BreadcrumbsComponent;
