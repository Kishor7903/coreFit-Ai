import React, {useState} from 'react'


function FileUpload() {

    const [file, setFile] = useState(null);

    const handleChange = (e) =>{
        console.log(e.target.file);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <div>FileUpload
        <input type="file" onChange={handleChange} />
        <img src={file} alt="" />
    </div>
  )
}

export default FileUpload