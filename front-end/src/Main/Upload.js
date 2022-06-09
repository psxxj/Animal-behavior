import './Upload.css';
import { useState } from 'react';
import axios from "axios";

const Option = ({optionName, dbName, example}) => {
  return (
    <div class = "option">
      <input type="text" name = {dbName} placeholder = {"ex) " + example}/>
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
        onChange = {(video) => setUploadedFile(video.target.files[0])}/>
      </div>
      <div class = "right">
        <div class = "option">
         <input type="text" name =  "mouse_name" placeholder = "ex) Jerry"
         onChange={(text1) => setMouse_name(text1.target.value)}/>
         <div> "Mouse Name" </div>
        </div>
        <div class = "option">
         <input type="text" name = "experimental_model" placeholder = "ex) Drug Diseased"
          onChange={(text2) => setExperimental_model(text2.target.value)}/>
         <div> "Experiment Model" </div>
        </div>
        <div class = "option">
         <input type="text" name = "heredity" placeholder = "ex)  Agouti"
         onChange={(text3) => setHeredity(text3.target.value)}/>
         <div> "Heredity" </div>
        </div>
        <div class = "option">
         <input type="text" name = "genotype" placeholder = "ex)  Sox9"
         onChange={(text4) => setGenotype(text4.target.value)}/>
         <div> "Genotype" </div>
        </div>
        <input type = "submit" value = "UPLOAD" class = "submit"
        onClick = {() => axios.post("http://127.0.0.1:8000/main/", {
                            mouse_name: Mouse_name,
                            experimental_model: Experimental_model,
                            heredity: Heredity,
                            genotype: Genotype
                            //uploadedFile : UploadedFile
                            })
        }/>
      </div>
    </div>
  )
}

export default Upload;