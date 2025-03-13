import "../styles/homepage.css";
import RecentArticleBox from "../components/RecentArticleBox";
import ModeContext from "../contexts/ModeContext";
import { useContext, useState, useEffect } from "react";
import axios from 'axios';

const HomePage = () => {

    const { mode } = useContext(ModeContext);
    const [recentArticle, setRecentArticle] = useState(null);

    const base64Decode = (base64) => {
        return decodeURIComponent(
            atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
    };

    useEffect(() => {
        const fetchRecentArticle = async () => {
            try {
                const response = await axios.get('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.purdue.edu/newsroom/feed/'));
                const xmlContent = base64Decode(response.data.contents.split(',')[1]);
                const parser = new DOMParser();
                const xml = parser.parseFromString(xmlContent, 'application/xml');
                const items = Array.from(xml.querySelectorAll('item'));

                const articlesData = items.map(item => {
                    const description = item.querySelector('description').textContent;
                    const imgSrcMatch = description.match(/<img[^>]+src="([^">]+)"/);
                    const imgSrc = imgSrcMatch ? imgSrcMatch[1] : '';

                    return {
                        title: item.querySelector('title').textContent,
                        link: item.querySelector('link').textContent,
                        description: item.querySelector('description').textContent,
                        imgSrc,
                    };
                });

                if (articlesData.length > 0) {
                    setRecentArticle(articlesData[0]);
                }
            } catch (error) {
                console.error("Error fetching the most recent article:", error);
            }
        };

        fetchRecentArticle();
    }, []);

    

    return(
        <div className = "home-page-container">
            <h1>Welcome to the Purdue trending app!</h1>

        <div className = "content-section">
            <p>Lorem Ipsum is simply dummy text of the printing 
          and typesetting industry. Lorem Ipsum has been the 
          industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and 
          scrambled it to make a type specimen book. It has 
          survived not only five centuries, but also the leap 
          into electronic typesetting, remaining essentially 
          unchanged. It was popularised in the 1960s with the 
          release of Letraset sheets containing Lorem Ipsum 
          passages, and more recently with desktop publishing 
          software like Aldus PageMaker including versions of 
          Lorem Ipsum.</p>
        </div>
        <RecentArticleBox mode = {mode} article = {recentArticle} />  

    </div>
    );
};

export default HomePage;