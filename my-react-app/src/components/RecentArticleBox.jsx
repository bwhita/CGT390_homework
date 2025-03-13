import "../styles/messagebox.css";

const RecentArticleBox = ({ mode, article }) => {
    if (!article) {
        return <p>Fetching the latest article...</p>;
    }

    return (
        <div className={`message-box ${mode}`}>
            <p>{`Latest News: ${article.title}`}</p>
            {article.imgSrc && <img src={article.imgSrc} alt="Article image" />}
        </div>
    );
}

export default RecentArticleBox;
