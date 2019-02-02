import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { ThemeProvider } from 'react-jss';
import { ToastContainer } from 'react-toastify';
import { GuardSpinner } from 'react-spinners-kit';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';

import Emulator from 'chip8/components/Emulator';

import theme from './theme.js';


const styles = () => ({
    spinnerContainer: {
        position: 'absolute',
        left: '50%',
        top: '300px',
        '@media (max-width: 576px)': {
            top: '50%',
        }
    },
    spinner: {
        position: 'relative',
        left: '-20px',
        top: '-20px',
    }
});

const Spinner = injectSheet(styles)(({ classes }) => (
    <div className={classes.spinnerContainer}>
        <div className={classes.spinner}>
            <GuardSpinner
                frontColor={theme.palette.secondary.base} />
        </div>
    </div>
));

const App = ({ romsLoaded }) => {
    let view;

    if (romsLoaded) {
        view = <Emulator />;
    } else {
        view = <Spinner />;
    }

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                { view }
                <ToastContainer 
                    position='bottom-center'
                    hideProgressBar={true} />
            </React.Fragment>
        </ThemeProvider>
    );
};

App.propTypes = {
    romsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    romsLoaded: state.roms.list.length > 0
});

export default connect(mapStateToProps)(App);