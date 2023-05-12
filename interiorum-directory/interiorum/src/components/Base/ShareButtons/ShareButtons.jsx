import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';

import PropTypes from 'prop-types';

const ShareButtons = ({ location, text, size=32 }) => {
    return (
        <>
            <FacebookShareButton
                url={`http://localhost:5173${location.pathname}`}
                quote={`Check out ${text}'s posts and profile on Interiorum!`}
                hashtag="#interiorum"
            >
                <FacebookIcon size={size} round />
            </FacebookShareButton>
            <TwitterShareButton
                url={`http://localhost:5173${location.pathname}`}
                quote={`Check out ${text}'s posts and profile on Interiorum!`}
                hashtag="#interiorum"
            >
                <TwitterIcon size={size} round />
            </TwitterShareButton>
            <LinkedinShareButton
                url={`http://localhost:5173${location.pathname}`}
                quote={`Check out ${text}'s posts and profile on Interiorum!`}
                hashtag="#interiorum"
            >
                <LinkedinIcon size={size} round />
            </LinkedinShareButton>
        </>
    );
};

ShareButtons.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
    size: PropTypes.number,
};

export default ShareButtons;
