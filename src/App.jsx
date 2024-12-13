import { useState, useEffect } from 'react'
import axios from 'axios'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import './index.css' 
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Pdffile = (props) => {
  const [numPages, setNumPages] = useState();
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
        {[...Array(numPages)].map((e, i) => <Page key={i + 1} pageNumber={i + 1} renderTextLayer={false} renderAnnotationLayer={false} />)}
      </Document>
    </div>
  );
}

const App = () => {
  const [file1, setFile1] = useState()
  const [file2, setFile2] = useState()
  
  const fileChangeHandler1 = (e) => {
    if (e.target.files[0].type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
      const data = new FormData()
      const dataFile = e.target.files[0]
      data.append('file', dataFile)
      axios
      .post("http:localhost:3001/api/files", data, {
        responseType: 'blob',
        transformResponse: [function (data) {
            let blob = new window.Blob([data], { type: 'application/pdf' })
            return window.URL.createObjectURL(blob)
        }]
      })
      .then(response => setFile1(response.data))
    }
    setFile1(e.target.files[0])
  }

  const fileChangeHandler2 = (e) => {
    if (e.target.files[0].type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
      const data = new FormData()
      const dataFile = e.target.files[0]
      data.append('file', dataFile)
      axios
      .post("http:localhost:3001/api/files", data, {
        responseType: 'blob',
        transformResponse: [function (data) {
            let blob = new window.Blob([data], { type: 'application/pdf' })
            return window.URL.createObjectURL(blob)
        }]
      })
      .then(response => setFile2(response.data))
    }
    setFile2(e.target.files[0])
  }

  return (
    <div> 
      <p>Submit pdf or powerpoint. Translate one of them using free online pdf or powerpoint translator</p>
      <form encType="multipart/form-data">
      <input
          type="file"
          onChange={fileChangeHandler1}
        />
      <input
          type="file"
          onChange={fileChangeHandler2}
        />
      </form> 
      <div className="pdfs">
        <Pdffile file={file1}/>
        <Pdffile file={file2}/>
      </div>
    </div>
  )
}

export default App