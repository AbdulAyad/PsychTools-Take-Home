import { Link, useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import axios from 'axios';
import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Post from '../components/ui/Post';
import TextBox from '../components/ui/TextBox';
import useDebounce from '../hooks/useDebounce';
import styles from './dashboard.module.css';

export default function Dashboard() {
    const [createPostScreenHidden, setCreatePostScreenHidden] = useState(true);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('add.post'), {
            onSuccess: (page) => {
                reset('title', 'content');
                setCreatePostScreenHidden(true);
                var newPost = page.props.flash.newPost;
                newPost.likes_count = 0;
                newPost.is_liked = false;

                setPosts((prevPosts) => [newPost, ...prevPosts]);
                console.log(page);
            },
        });
    };

    useDebounce(
        async () => {
            try {
                const response = await axios.get('/post/get_posts', {
                    params: { search: search },
                });
                setPosts(response.data);
            } catch (err) {
                console.error(err);
            }
        },
        [search],
        300,
    );

    return (
        <main className={styles.container}>
            <div className={createPostScreenHidden ? styles.createPostScreenHidden : styles.createPostScreen}>
                <div className={styles.closeButton} onClick={() => setCreatePostScreenHidden(true)}>
                    <CloseIcon style={{ fontSize: '4rem', color: 'white' }} />
                </div>
                <form className={styles.form} onSubmit={submit}>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel} htmlFor="title">
                                Title
                            </label>
                            <Input
                                id="title"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Title"
                            />
                            <label>{errors.title}</label>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel} htmlFor="content">
                                Content
                            </label>
                            <TextBox
                                id="content"
                                type="text"
                                required
                                autoFocus
                                tabIndex={2}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Write your content here..."
                            />
                            <label>{errors.content}</label>
                        </div>
                        <Button style={{ backgroundColor: 'white', color: 'black' }} type="submit" tabIndex={3} disabled={processing}>
                            Post
                        </Button>
                    </div>
                </form>
            </div>
            <nav className={styles.navbar}>
                <div className={styles.navItems}>
                    <Link method="post" href={route('logout')} className={styles.navItem}>
                        <LogoutIcon style={{ fontSize: '3rem', color: 'white' }} />
                    </Link>
                    <div style={{ width: '100%' }}>
                        <Input
                            style={{ width: '100%' }}
                            id="search"
                            type="text"
                            autoFocus
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search.."
                        />
                    </div>
                    <div className={styles.navItem} onClick={() => setCreatePostScreenHidden(false)}>
                        <PostAddIcon style={{ fontSize: '3rem', color: 'white' }} />
                    </div>
                </div>
            </nav>
            <div className={styles.innerContainer}>
                {posts.map((p) => (
                    <Post
                        key={p.id}
                        id={p.id}
                        title={p.title}
                        text={p.content}
                        likes={p.likes_count}
                        created_at={p.published_at}
                        liked={p.is_liked}
                    />
                ))}
            </div>
        </main>
    );
}
