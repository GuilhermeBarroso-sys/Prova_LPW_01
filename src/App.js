
import './App.css';
import './Header.css';
import {v4 as uuid} from 'uuid';
import swal from 'sweetalert2';
import {Header} from './components/Header'
import { useEffect, useState } from 'react';
function App() {
  const getLocalStorage = () => {
    const localStorageItems = localStorage.getItem('@regcity:city');
    if(localStorageItems == null) {
      return [];
    }
    const itemsValue = JSON.parse(localStorageItems);
    return itemsValue;
  }
  const [cities, setCities] = useState(getLocalStorage());
  const handleSubmit = (event) => {
    const ibgeCode = event.target.ibgeCode.value;
    const county = event.target.county.value;
    const state = event.target.state.value;
    event.preventDefault();
    if(ibgeCode.length < 1 ||county.length < 1 ||state.length < 1 ) {
      swal.fire({
        icon: 'error',
        title: 'Campo em branco!',
        text: 'Um ou mais campos estão em branco!',
      })
    }else {
      setCities([...cities, {
        id: uuid(),
        ibgeCode,
        county,
        state,
      }]);
      swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text:'Municipio cadastrado com sucesso!'
      });
    }
    
  }
  useEffect(() => {
    localStorage.setItem('@regcity:city', JSON.stringify(cities))
  },[cities])
  const handleDeleteSubmit = (id) => {
    swal.fire({
      title: 'Tem certeza que deseja apagar o Municipio?',
      text: "Uma vez que o Municipio for excluido, não será possivel recuperar!",
      icon: 'warning',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        setCities(cities.filter(city => city.id != id));
        swal.fire({
          text: 'Municipio deletado com sucesso!',
          icon: 'success',
        })
      }
    })
  }
  return (
    <>
    <Header />
    <div className="page">
      <br/>
      <span className = "headerTitle">Cadastrar Municipios</span>
      <form  className="register" onSubmit = {handleSubmit}>
        <input
          name="ibgeCode"
          type="text"
          placeholder="Digite o código do IBGE"
        />
        <input
          name="county"
          type="text"
          placeholder="Digite o municipio"
        />
        <input
          name = "state"
          type="text"
          placeholder="Digite o estado"
        />
        <button type="submit">Enviar</button>
      </form>
      <br />
      <br/>
      <table>
        <thead>
          <tr>
            <th>Codigo do IBGE</th>
            <th>Digite o municipio</th>
            <th>Digite o estado</th>
            <th colSpan={1}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => {
              return (
                <tr key = {city.id}>
                  <td>{city.ibgeCode}</td>
                  <td>{city.county}</td>
                  <td>{city.state}</td>
                  <td>
                  <button className = "buttonDelete" onClick = {() => {
                    handleDeleteSubmit(city.id);
                  }}>
                  <span className = "delete"> Excluir </span></button>
                  </td>
                </tr>
              )
          })}
        </tbody>
      </table>

    </div>
    </>
  );
}

export default App;
