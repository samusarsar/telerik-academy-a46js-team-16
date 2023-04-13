export const toLoadView = () => `<p id="loader">LOADING .....</p>`;

export const toErrorView = () => `
    <div id="error">
        <h1>Oh-No! There was an error loading these GIFs!</h1>
        <p>Please try again a bit later!</p>
        <p>In the meantime, we hope this flamingo will make you feel better...</p>
        <img src="../../images/error-flamingo.png">
    </div>
`;
