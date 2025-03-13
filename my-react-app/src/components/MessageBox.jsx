import "../styles/messagebox.css";

const MessageBox = ({ mode, message, image }) => {
    return (
        <div className = {`message-box ${mode}`}>
            <p>{message}</p>
            {image && <img src = {image} alt = "Article image" />}
        </div>
    );
}

export default MessageBox;