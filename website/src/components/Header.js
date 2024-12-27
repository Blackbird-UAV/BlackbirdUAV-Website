import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { fadeInUp } from './animations';
import styles from '@/styles/Header.module.css';

const Header = ({ imagePath, headerText, initialOffset }) => {
    const headerRef = useRef(null);
    const parallaxAmplitude = 0.5;

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                const offset = window.scrollY;
                headerRef.current.style.backgroundPositionY = `${-initialOffset + offset * parallaxAmplitude}px`;
            }
        };

        if (headerRef.current) {
            const offset = window.scrollY;
            headerRef.current.style.backgroundPositionY = `${-initialOffset + offset * parallaxAmplitude}px`;
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [parallaxAmplitude, initialOffset]);

    return (
        <header ref={headerRef}
            className={`${styles.header}`}
            style={{ backgroundImage: `url(${imagePath})` }}
        >
            <div className={styles.overlay}></div>
            <motion.h1
                className={styles.text}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {headerText}
            </motion.h1>
        </header>
    );
};

Header.propTypes = {
    imagePath: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    initialOffset: PropTypes.number,
};

Header.defaultProps = {
    initialOffset: 0,
};

export default Header;