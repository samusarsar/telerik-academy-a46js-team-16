import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../../../config/firebase-config';
import { getPostById } from '../../../services/post.service';
import ProfilePosts from './ProfilePosts';
import ProfileComments from './ProfileComments';
import { getCommentById } from '../../../services/comment.services';

const ProfileLikedComments = ({ handle }) => {
    const [likedComments, setLikedComments] = useState(null);

    useEffect(() => {
        onValue(ref(db, `users/${handle}/likedComments`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Promise.all(Object.keys(data).map((id) => getCommentById(id)))
                    .then(resultArr => setLikedComments(resultArr))
            } else {
                setLikedComments([]);
            }
        });

    }, []);

    if (likedComments) {
        return <ProfileComments comments={likedComments} />;
    }
};

export default ProfileLikedComments;
