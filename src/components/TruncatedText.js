import React, { useState } from 'react';
import { Typography, Link } from '@mui/material';

const TruncatedText = ({ text, maxLength = 200 }) => {
    const [showMore, setShowMore] = useState(false);

    if (!text) return null;

    const handleToggle = () => {
        setShowMore((prev) => !prev);
    };

    return (
        <Typography>
            {showMore ? text : `${text.substring(0, maxLength)}${text.length > maxLength ? '...' : ''}`}
            {text.length > maxLength && (
                <Link
                    component="button"
                    variant="body2"
                    onClick={handleToggle}
                    sx={{ ml: 1, cursor: 'pointer' }}
                >
                    {showMore ? 'Voir moins' : 'Voir plus...'}
                </Link>
            )}
        </Typography>
    );
};

export default TruncatedText;
