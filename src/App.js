import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('repositories')
    .then(response => {
      setRepositories(response.data);
    });

  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Teste Front",
      "url": "https://www.github.com/pamploni",
      "techs":["JAVA","JAVASCRIPT","REACT"]
    });

    setRepositories([...repositories, response.data]);
    
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

  /*  if (response.status === '204') {
      const resp = await api.get('repositories');
      setRepositories([resp.data]);
    } else {
      setRepositories(repositories);
    }
*/
    setRepositories();
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories
          ? repositories.map(item =>
              <li key= {item.id}>
                <h1>{item.title}</h1>
                <button onClick={() => handleRemoveRepository(item.id)}>
                  Remover
                </button>
              </li>)
          : null
        }
        
      </ul>

      <button onClick={()=>handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
