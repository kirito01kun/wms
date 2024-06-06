// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, LocalShipping, Store, Inventory, Assessment } from '@mui/icons-material';
import { Link } from 'react-router-dom';

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
                },
            }}
        >
            <List>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/shipments">
                    <ListItemIcon><LocalShipping /></ListItemIcon>
                    <ListItemText primary="Shipment Receiving" />
                </ListItem>
                <ListItem button component={Link} to="/putaway">
                    <ListItemIcon><Store /></ListItemIcon>
                    <ListItemText primary="Putaway Operations" />
                </ListItem>
                <ListItem button component={Link} to="/picking">
                    <ListItemIcon><Inventory /></ListItemIcon>
                    <ListItemText primary="Picking Operations" />
                </ListItem>
                <ListItem button component={Link} to="/transfer">
                    <ListItemIcon><Inventory /></ListItemIcon>
                    <ListItemText primary="Location Transfer Operations" />
                </ListItem>
                <ListItem button component={Link} to="/inventory">
                    <ListItemIcon><Inventory /></ListItemIcon>
                    <ListItemText primary="Inventory Management" />
                </ListItem>
                <ListItem button component={Link} to="/reports">
                    <ListItemIcon><Assessment /></ListItemIcon>
                    <ListItemText primary="Reports and Analytics" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
