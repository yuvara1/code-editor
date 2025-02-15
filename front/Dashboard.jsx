import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../front/styles/styleDash.css';


function Dashboard() {
     
     const filepath = localStorage.getItem('filepath')
     console.log(filepath)
     

     const Navigate = useNavigate()
     function handleDash() {
          Navigate('/access')
     }
     const [fileContent, setFileContent] = useState('');

     const [count, setCount] = useState(0);

     const [fontSize, setFontSize] = useState(16)



     const fontStyles =
          ["Arial",
               "Verdana",
               "Georgia",
               "Palatino",
               "Andale Mono",
               "Comic Sans MS, Comic Sans, cursive",
               "Helvetica, sans-serif"
          ];

     function changeFontStyle() {
          setCount(count + 1);
          console.log(count)
          let num = count / fontStyles.length - 1;
          if (count === fontStyles.length - 1) {
               setCount(0);
          }
          document.getElementById('text').style.fontFamily = `${fontStyles.at(num)}`;
     }

     useEffect(() => {
          const fetchData = async () => {
               try {
                    
                    const response = await fetch(`http://localhost:5000/read?fileName=${filepath}`);
                    if (!response.ok) {
                         throw new Error('Network response was not ok');
                    }
                    const data = await response.text();
                    setFileContent(data);
               } catch (error) {
                    console.error('Error fetching data:', error);
               }
          };

          fetchData();
     }, []);

     const handleChange = (event) => {
          setFontSize(event.target.value);
         
     };
     const handleAppend = async (event) => {
          event.preventDefault();

          const newData = fileContent;
          fetch('http://localhost:5000/appendFile', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                    content: newData, fileName: `${filepath}`
               })
          })
               .then(response => {
                    if (!response.ok) {
                         throw new Error('Network response was not ok');
                    }
                    alert('File saved successfully!');
               })
               .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                    alert('Error appending data.');
               });

     };
     const handleDownload = () => {
          const element = document.createElement('a');
          const fileURL = URL.createObjectURL(new Blob([fileContent], { type: 'text/plain' }));
          element.href = fileURL;
          element.download = `${filepath}`;
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
     };
     return (
          <div >
               <nav className='navbar'>
                    <ul>
                         <li>text editor</li>
                         <li>logout</li>
                    </ul>
               </nav>
               <aside className='sidebar'>
                    <div>
                         <ul>
                              <li>Home</li>
                              <li onClick={handleAppend} accessKey='s'>Save</li>
                              <li onClick={handleDash}>Files</li>
                              <li onClick={handleDownload}>Download</li>
                              <li onClick={changeFontStyle}>change font</li>
                              <li>
                                   <label htmlFor="">font fize</label>
                                   <input type="number"
                                        id="fontSize"
                                        value={fontSize}
                                        onChange={handleChange}
                                        min="10"
                                        max="100"
                                   />
                              </li>
                         </ul>
                    </div>
               </aside>
               <main className="workspace">
                    <textarea
                         style={{ fontSize: `${fontSize}px` , fontFamily:`${fontStyles.at(count)}`}}
                         name="text"
                         id="text"
                         value={fileContent}
                         onChange={(e) => setFileContent(e.target.value)}
                         spellCheck={false}
                    />
               </main>
          </div>
     );
}

export default Dashboard;