import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../../../config/firebase-config';
import { deleteLikedPostToUser, getPostById } from '../../../services/post.service';
import ProfilePosts from './ProfilePosts';
import PropTypes from 'prop-types';

const ProfileLikedPosts = ({ handle }) => {
    const [likedPosts, setLikedPosts] = useState(null);

    useEffect(() => {
        onValue(ref(db, `users/${handle}/likedPosts`), (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const promises = Object.keys(data).map((id) =>
                    (getPostById(id)
                        .catch(() => {
                            deleteLikedPostToUser(handle, id);
                            return null;
                        })));

                Promise.all(promises)
                    .then(resultArr => resultArr.filter(el => el))
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

ProfileLikedPosts.propTypes = {
    handle: PropTypes.string.isRequired,
};
export default ProfileLikedPosts;
