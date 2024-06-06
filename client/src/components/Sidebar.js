// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { SpaceDashboard, Archive, Unarchive, LocalShipping, Inventory, MoveUp, Assessment } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import the logo image

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#424242',
                },
            }}
        >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1px' }}> {/* Adjust width here */}
                <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} /> {/* Adjust height here */}
            </div>
            <List>
                <ListItem button component={Link} to="/dashboard" sx={{ '&:hover': { backgroundColor: '#9e9e9e' } }}>
                    <ListItemIcon sx={{ color: '#f0f0f0'}}><SpaceDashboard /></ListItemIcon>
                    <ListItemText primary="Dashboard" sx={{ color: '#f0f0f0'}} />
                </ListItem>
                <ListItem button component={Link} to="/shipments" sx={{ '&:hover': { backgroundColor: '#9e9e9e' } }}>
                    <ListItemIcon sx={{ color: '#f0f0f0'}}><LocalShipping /></ListItemIcon>
                    <ListItemText primary="Shipment Receiving"  sx={{ color: '#f0f0f0'}}/>
                </ListItem>
                <ListItem button component={Link} to="/putaway" sx={{ '&:hover': { backgroundColor: '#9e9e9e' } }}>
                    <ListItemIcon sx={{ color: '#f0f0f0'}}><Archive /></ListItemIcon>
                    <ListItemText primary="Putaway Operations" sx={{ color: '#f0f0f0'}} />
                </ListItem>
                <ListItem button component={Link} to="/picking" sx={{ '&:hover': { backgroundColor: '#9e9e9e' } }}>
                    <ListItemIcon sx={{ color: '#f0f0f0'}}><Unarchive /></ListItemIcon>
                    <ListItemText primary="Picking Operations" sx={{ color: '#f0f0f0'}} />
                </ListItem>
                <ListItem button component={Link} to="/transfer" sx={{ '&:hover': { backgroundColor: '#9e9e9e' } }}>
                    <ListItemIcon sx={{ color: '#f0f0f0'}}><MoveUp /></ListItemIcon>
                    <ListItemText primary="Location Transfer Operations" sx={{ color: '#f0f0f0'}} />
                </ListItem>
                <ListItem button component={Link} to="/inventory" sx={{ '&:hover': { backgroundColor: '#9e9e9e' } }}>
                    <ListItemIcon sx={{ color: '#f0f0f0'}}><Inventory /></ListItemIcon>
                    <ListItemText primary="Inventory Management" sx={{ color: '#f0f0f0'}} />
                </ListItem>
                <ListItem button component={Link} to="/reports" sx={{ '&:hover': { backgroundColor: '#9e9e9e' } }}>
                    <ListItemIcon sx={{ color: '#f0f0f0'}}><Assessment /></ListItemIcon>
                    <ListItemText primary="Reports and Analytics" sx={{ color: '#f0f0f0'}} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
