import React, {useState, useEffect} from 'react'
import axios from 'axios'

export function check({data}) {
    const [mydata, setmydata] = useState([]);

    function getMeDetails() {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {response.json();setmydata(response)})
    .then(json => console.log("json",json))
  }
  useEffect(() => {
    getMeDetails();
  }, []);
  console.log("mydata",mydata)
    
    console.log("xdata", data)
  return (
    <div>
        Hello
    </div>
  )
}

export async function getStaticProps() {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const data = response.json()
          return {
        props: {
          data: data,
        },
      }
    } catch (err) {
      console.log("err", err);
      return false;
    }
  }