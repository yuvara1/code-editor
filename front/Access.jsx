import React from 'react'
import Access from './Templates'

function Template() {
     const files = [
          {
               name: 'first',
               path: '../server/files/example.txt'
          },
          {
               name: 'second',
               path: '../server/files/temp.txt'
          }
     ]
     const filesList = files.map((file) => <Access name={file.name} filepath={file.path}></Access>)
     return (
          <div>
               {filesList}
          </div>
     )


}
Template.defaultProps = {
     name: 'no name'
}
export default Template;

