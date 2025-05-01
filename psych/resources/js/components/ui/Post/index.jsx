import { useState } from "react";
import styles from "./Post.module.css";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
const Post  = ({title, id, text, likes, created_at, liked}) => {

    const [expanded, setExpanded] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(liked);

    const like = async () => {

        const prevLikeCount = likeCount;
        const prevIsLiked = isLiked;

        try {
             const newLikeCount = prevIsLiked ? prevLikeCount - 1 : prevLikeCount + 1;
            setLikeCount(newLikeCount);
            setIsLiked(!prevIsLiked);
            const response = await axios.post(`/post/${id}/like`);
            console.log(response);
            
             
        } catch (error) {
            setLikeCount(prevLikeCount);
            setIsLiked(prevIsLiked);
            console.error('Error toggling like:', error);
        }
    }

    const toCleanDate = (date) =>{
        const d = new Date(date);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = d.toLocaleDateString('en-GB', options);

        return formattedDate;
    }
    return <div className={styles.postContainer}>
        <div className={styles.expand} onClick={ () => setExpanded(!expanded)}>{expanded ? <CloseFullscreenIcon  style={{ fontSize: '2rem', color: 'black' }}/> : <OpenInFullIcon  style={{ fontSize: '2rem', color: 'black' }}/>}</div>
        <h2 className={styles.title}>{title}</h2>
        <div className={expanded ? styles.expandedText : styles.text}>{text}</div>
        <div className={styles.bottom}> 
            <div className={styles.likeContainer} onClick={like}>
                {isLiked ? <FavoriteIcon  style={{ fontSize: '2rem', color: 'var(--primary-colour)' }}/>
                        : <FavoriteBorderIcon  style={{ fontSize: '2rem', color: 'var(--primary-colour)' }}/>} {likeCount} likes
         </div>
         <div className={styles.created}>
            Created at: {toCleanDate(created_at)}
         </div>
         </div>
    </div>
}

export default Post;