import './Upload.css';
import { useState } from 'react';

const Option = ({optionName, dbName, example}) => {
  return (
    <div class = "option">
      <input type="text" name = {dbName} placeholder = {"ex) " + example} />
      <div> {optionName} </div>
    </div>
  );
}

const Upload = () => {
  const [upload, setUpload] = useState(false);

  return (
    <div class= "Upload">
      <div class = "left">
        <label htmlFor = "drop">
          <div class = {!upload ? "drop_box" : "drop_box_selected"}>
            <div>
              {!upload ? "Click the Area to Upload" : document.getElementsByClassName('uploadedFile')[0].files[0].name}<br />
              <span>{upload ? "" : ".mp4 or .avi"} </span>
            </div>
          </div>
        </label>
        <input type="file" name="uploadedFile" class = "uploadedFile" id = "drop" onChange = {() => setUpload(true)} multiple = {false} accept=".mp4, .avi"/>
      </div>
      <div class ="right">
        <Option optionName = "Mouse Name" dbName = "mouse_name" example = "Jerry"/>
        <Option optionName = "Experiment Model" dbName = "experimental_model" example = "Drug Diseased"/>
        <Option optionName = "Heredity" dbName = "Heredity" example= "Agouti"/>
        <Option optionName = "Genotype" dbName = "Genotype" example = "Sox9"/>
        <input type = "submit" value = "UPLOAD" class = "submit" />
      </div>
    </div>
  );
}

export default Upload;