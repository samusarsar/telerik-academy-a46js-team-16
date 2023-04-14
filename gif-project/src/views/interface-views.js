export const toLoadView = () => `<p id="loader">UPLOADING GIF .....</p>`;

export const toErrorView = () => `
    <div id="error">
        <h1>Oh-No! There was an error loading these GIFs!</h1>
        <p>Please try again a bit later!</p>
        <p>In the meantime, we hope these flamingos will make you feel better...</p>
        <img src="../../images/error-flamingos.gif" alt="Funky flamingos">
    </div>
`;
