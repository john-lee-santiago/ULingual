import React from 'react'
import { Link } from 'react-router-dom';
import './stylesheets/Recommendation.css'
import BookImage from './stylesheets/alex-lvrs-2zDw14yCYqk-unsplash.jpg'
import TVImage from './stylesheets/clement-m-JIOP2qvo8yk-unsplash.jpg'
import VideoImage from './stylesheets/leon-bublitz-uDTzfsGJihw-unsplash.jpg'

const RecommendationPage= () => {
    return( 
        <div class = "container">
            <div class="container1">
                <h1>Recommendations</h1>
        </div>

        <div class="container2">
                <div class="innercontainer1">
                <a href="BookRecommendation" class="button">
                <img src={BookImage} alt="Book Recommendation"></img>
                </a>
                </div>
                <div class="innercontainer2">
                <a href="BookRecommendation" class="button">
                <span class="button__text">Book Recommendation</span>
                </a>
                </div>
        </div>

        <div class="container3">
                <div class="innercontainer1">
                <a href="VideoRecommendation" class="button">
                <img src={VideoImage} alt="Video Recommendation"></img>
                </a>
                </div>
                <div class="innercontainer2">
                <a href="VideoRecommendation" class="button">
                <span class="button__text">Video Recommendation</span>
                </a>
                </div>
        </div>

        <div class="container4">
                <div class="innercontainer1">
                <a href="TVShowRecommendation" class="button">
                <img src={TVImage} alt="Book Recommendation"></img>
                </a>
                </div>
                <div class="innercontainer2">
                <a href="TVShowRecommendation" class="button">
                <span class="button__text">TV Show Recommendation</span>
                </a>
                </div>
        </div>
                <a href="Dashboard" class="button">
                <span class="button__text">Return</span>
                </a>
    </div>
    );
}

export default RecommendationPage;