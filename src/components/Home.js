import React from 'react';
import { connect } from "react-redux";
import styles from '../styles/Home.module.css';

const Home = ({currentUserId}) => {
    return (
        <div className={styles.homePageContainer}>
            <div className={styles.mainText2}>Soundzone</div>
            <div className={styles.mainText}>Soundzone Soundzone Soundzone Soundzone</div>
            <img className={styles.image2 + " " + styles.row2} alt="wave" src={'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png'}></img>
            <img className={styles.image + " " + styles.row2} alt="wave" src={'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png'}></img>
            <div className={styles.mainText2 + " " + styles.row3}>Soundzone</div>
            <div className={styles.mainText + " " + styles.row3}>Soundzone Soundzone Soundzone Soundzone</div>
            <img className={styles.image2 + " " + styles.row4} alt="wave" src={'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png'}></img>
            <img className={styles.image + " " + styles.row4} alt="wave" src={'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png'}></img>
            <div className={styles.mainText2 + " " + styles.row5}>Soundzone</div>
            <div className={styles.mainText + " " + styles.row5}>Soundzone Soundzone Soundzone Soundzone</div>
            <img className={styles.image2 + " " + styles.row6} alt="wave" src={'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png'}></img>
            <img className={styles.image + " " + styles.row6} alt="wave" src={'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png'}></img>
            <div className={styles.mainText2 + " " + styles.row7}>Soundzone</div>
            <div className={styles.mainText + " " + styles.row7}>Soundzone Soundzone Soundzone Soundzone</div>
            <img className={styles.image2 + " " + styles.row8} alt="wave" src={'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png'}></img>
            <img className={styles.image + " " + styles.row8} alt="wave" src={'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png'}></img>
            <div className={styles.mainText2 + " " + styles.row9}>Soundzone</div>
            <div className={styles.mainText + " " + styles.row9}>Soundzone Soundzone Soundzone Soundzone</div>
            <img className={styles.image2 + " " + styles.row10} alt="wave" src={'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png'}></img>
            <img className={styles.image + " " + styles.row10} alt="wave" src={'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png'}></img>
            <div className={styles.mainText2 + " " + styles.row11}>Soundzone</div>
            <div className={styles.mainText + " " + styles.row11}>Soundzone Soundzone Soundzone Soundzone</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      currentUserId: state.auth.currentUserId,
    };
};

export default connect(mapStateToProps, null)(Home);
