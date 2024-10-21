import React from 'react';
import { Avatar, Typography } from '@mui/material';

// Function to generate a color from a string
const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        color += ('00' + ((hash >> (i * 8)) & 0xFF).toString(16)).slice(-2);
    }
    return color;
};

// Function to determine if a color is light or dark
const isColorLight = (color) => {
    const rgb = parseInt(color.slice(1), 16); // Convert hex to RGB
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Luminosity
    return l > 128;
};

const CustomAvatar = ({ name = '' }) => { // Default to empty string if name is undefined
    if (!name) {
        return (
            <Avatar
                style={{
                    backgroundColor: '#9e9e9e', // Default background color
                    width: '40px', // Fixed width
                    height: '40px', // Fixed height
                }}
            >
                <Typography variant="h6" style={{ color: '#FFFFFF' }}>
                    ?
                </Typography>
            </Avatar>
        );
    }

    // Split the name into first and last names
    const names = name.split(' ');
    const initials = names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
    
    // Generate a fixed color based on the name
    const backgroundColor = stringToColor(name);
    const textColor = isColorLight(backgroundColor) ? '#000000' : '#FFFFFF';

    return (
        <Avatar
            style={{
                backgroundColor: backgroundColor, // Set background color
                width: '40px', // Fixed width
                height: '40px', // Fixed height
            }}
        >
            <Typography variant="h6" style={{ color: textColor }}>
                {initials.toUpperCase()} {/* Display both initials */}
            </Typography>
        </Avatar>
    );
};

export default CustomAvatar;
