import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../../../config/firebase-config';
import { getPostById } from '../../../services/post.service';
import ProfilePosts from './ProfilePosts';

const ProfileLikedPosts = ({ handle }) => {
    const [likedPosts, setLikedPosts] = useState(null);

    useEffect(() => {
        onValue(ref(db, `users/${handle}/likedPosts`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Promise.all(Object.keys(data).map((id) => getPostById(id)))
                    .then(resultArr => setLikedPosts(resultArr));
            } else {
                setLikedPosts([]);
            }
        });

    }, []);

    if (likedPosts) {
        return <ProfilePosts posts={likedPosts} />;
    }
};

export default ProfileLikedPosts;
