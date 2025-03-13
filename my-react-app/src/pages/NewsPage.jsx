import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/newspage.module.css'; 

const NewsPage = ({ onReceiveRecentArticle = () => {}, mode }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const base64Decode = (base64) => {
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  };
console.log(mode)
  useEffect(() => {
    const fetchArticles = async () => {
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

        setArticles(articlesData);
        setLoading(false);
        
        // Pass the most recent article to the parent component
        if (articlesData.length > 0) {
          onReceiveRecentArticle(articlesData[0]);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [onReceiveRecentArticle]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={`${styles.newsContainer} ${mode === "dark" ? styles['dark'] : styles.light} `}>
      <h1 className={styles.newsHeader}>News about Purdue University</h1>
      <ul className={styles.newsList}>
        {articles.map((article, index) => (
          <li key={index} className={styles.newsItem}>
            <div className = "newsContent">
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                {article.title}
                {article.imgSrc && <img src={article.imgSrc} alt={article.title} className={styles.newsImage} />}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPage;
