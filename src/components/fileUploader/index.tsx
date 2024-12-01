import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

function FileUploader() {
  return (
    <div>
      <FileUploaderRegular
         sourceList="local, url, camera, gdrive"
         classNameUploader="uc-light"
         pubkey="f851a2ed0d7f578532f9"
      />
    </div>
  );
}

export default FileUploader;