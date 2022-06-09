import './Upload.css';
import { useState } from 'react';
import axios from "axios";

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
  const [Mouse_name, setMouse_name] = useState("");
  const [Experimental_model, setExperimental_model] = useState("");
  const [Heredity, setHeredity] = useState("");
  const [Genotype, setGenotype] = useState("");
  const [UploadedFile, setUploadedFile] = useState("");
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
        <input type="file" name="uploadedFile" class = "uploadedFile" id = "drop" accept=".mp4, .avi"
        onChange = {(file) => setUploadedFile(file.target.files)}/>
      </div>
      <div class ="right">
        <Option optionName = "Mouse Name" dbName = "mouse_name" example = "Jerry"
        onChange={(text1) => setMouse_name(text1.target.value)}/>
        <Option optionName = "Experiment Model" dbName = "experimental_model" example = "Drug Diseased"
        onChange={(text2) => setExperimental_model(text2.target.value)}/>
        <Option optionName = "Heredity" dbName = "Heredity" example= "Agouti"
        onChange={(text3) => setHeredity(text3.target.value)}/>
        <Option optionName = "Genotype" dbName = "Genotype" example = "Sox9"
        onChange={(text4) => setGenotype(text4.target.value)}/>
        <input type = "submit" value = "UPLOAD" class = "submit"
        onClick = {() => axios.post("http://127.0.0.1:8000/main/", {
                            mouse_name: Mouse_name,
                            experimental_model: Experimental_model,
                            heredity: Heredity,
                            genotype: Genotype,
                            uploadedFile : UploadedFile})
        }/>
      </div>
    </div>
  );
}

export default Upload;