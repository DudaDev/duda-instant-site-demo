import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import EditIcon from '@material-ui/icons/Edit'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import WebIcon from '@material-ui/icons/Web';
import DeleteIcon from '@material-ui/icons/Delete';
import { Helmet } from 'react-helmet'
import * as DudaAPI from '../Utilities/Duda'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));
  
  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

function Manager() {
    const classes = useStyles();
    return (
        <>
        <Container>
            <Helmet>
                <title>Simple Instant Flow</title>
            </Helmet>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h4'>
                        Manage Websites
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" className={classes.title}>
                            Edit or delete your sites:
                        </Typography>
                        <div className={classes.demo} style={{
                                backgroundColor: 'rgba(0,0,0,0.1)'
                            }}>
                            <List>
                            {generate(
                                <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                    <WebIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Business Name"
                                />
                                <ListItemSecondaryAction style={{
                                    marginRight: '30px'
                                }}>
                                    <IconButton edge="start" aria-label="edit">
                                    <EditIcon color='primary'/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon color='primary'/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            </Container>
        </>
    );
}

export default withRouter(Manager);