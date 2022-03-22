import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {
  
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== ""){
      let cookies = document.cookie.split(';');
      for (let i=0; i<cookies.length; i++){
        let cookie = cookies[i].trim();
        if (cookie.substring(0,name.length+1)===(name+'=')){
          cookieValue = decodeURIComponent(cookie.substring(name.length +1));
          break;
        }
      }
    }
    return cookieValue;
  }
    
  const [data, setData] = useState('');
  
  const submit = (event) => {
    event.preventDefault()
    fetch('http://127.0.0.1:8000/api/task-create/',
          {method:'POST',
             headers:{'content-type':'application/json',
                      'X-CSRFToken':getCookie('csrftoken')
              },
             body:JSON.stringify({
                id: null,    
                title:event.target.value,
                completed: false})
          })
  }
  
  const submit2 = () => {
    fetch('http://127.0.0.1:8000/api/task-create/',
          {method:'POST',
             headers:{'content-type':'application/json',
                      'X-CSRFToken':getCookie('csrftoken')
              },
             body:JSON.stringify({
                id: null,    
                title:'successful post on 21 March.',
                completed: false})
          })
  }

  return(
  <div>
    <form onSubmit={submit}>
      <input 
        type="text"
        name="todo item"
        value={data}
        onChange={event => {setData(event.targetvalue)}}
      />
      <input 
        type="submit" 
        name="submit new todo"
      />
    </form>

      <button onClick={submit2}>button</button>
    </div>    
  )

}
  
export default App;
