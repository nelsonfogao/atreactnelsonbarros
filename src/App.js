import React, { useReducer, useState } from 'react';
import './App.css';
import Title from "./components/Title.js";

const formReducer = (state, event) => {
  if(event.reset) {
    return {
      nome: '',
      idade: 0,
      estado: '',
    }
  }
 return {
   ...state,
   [event.name]: event.value
 }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true
      })
    }, 3000);
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return(
    <div className="wrapper">
      <Title></Title>
      {submitting &&
               <div>
               Seu Cadastro é:
               <ul>
                 {Object.entries(formData).map(([name, value]) => (
                   <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                 ))}
               </ul>
             </div>
      }
      <form onSubmit={handleSubmit}>
        <fieldset disabled={submitting}>
          <label>
            <p className='texto'>Nome</p>
            <input type="text" name="nome" required onChange={handleChange} value={formData.nome || ''}/>
          </label>
        </fieldset>
        <fieldset disabled={submitting}>
         <label>
           <p className='texto'>Selecione seu Estado</p>
           <select name="estado" onChange={handleChange} required value={formData.estado || ''}>
               <option value="">--Please choose an option--</option>
               <option value="Rio de Janeiro">Rio de Janeiro</option>
               <option value="São Paulo">São Paulo</option>
               <option value="Minas Gerais">Minas Gerais</option>
           </select>
         </label>
         <label>
           <p className='texto'>Idade</p>
           <input type="number" required name="idade" onChange={handleChange} step="1" value={formData.idade || ''}/>
         </label>
       </fieldset>
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
    </div>
  )
}

export default App;