export const toUploadView = () => `
    <div id="upload-box">
        <form name="upload-form" method="post">
            <label> Select GIF to upload:
                <input id="file" type="file" name="file" required />
            </label>
            <input type="submit" value="Upload" class="submit"/>
        </form>
    </div>
`;

export const toUploadViewSuccess = () => `
    <div id="upload-box">
        <form name="upload-form" method="post">
            <label> Select GIF to upload:
                <input id="file" type="file" name="file" required />
            </label>
            <input type="submit" value="Upload" class="submit"/>
        </form>
        <p>GIF successfully uploaded!</p>
    </div>
`;

export const toUploadViewError = (error) => `
    <div id="upload-box">
        <form name="upload-form" method="post">
            <label> Select GIF to upload:
                <input id="file" type="file" name="file" required />
            </label>
            <input type="submit" value="Upload" class="submit"/>
        </form>
        <p>There was a problem uploading the GIF: ${error}</p>
    </div>
`;
