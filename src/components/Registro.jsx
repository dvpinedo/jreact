import React from 'react'
import {nanoid} from 'nanoid'
import {firebase} from '../firebase'
const Registro = () => {
    const [nombre,setNombre]=React.useState('')
    const [apellido,setApellido]=React.useState('')
    const [correo,setCorreo]=React.useState('')
    const [direccion,setDireccion]=React.useState('')
    const [telefono,setTelefono]=React.useState('')
    const [ciudad, setCiudad]= React.useState('')
    const [programa, setPrograma]=React.useState('')
    const [id, setId]=React.useState('')
    

    const [edicion, setEdicion]=React.useState(false)
    const [setError]=React.useState(null)
    const [listaEstudiantes,setListaEstudiantes]=React.useState([])
    
 
    React.useEffect(()=>{
        const obtenerdatos= async() =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('university').get()
                const arrayData=data.docs.map (item =>(
                    {
                        id: item.id, ...item.data()
                    }
                ))
                //console.log(arrayData)
                setListaEstudiantes(arrayData)
            }catch(error){
                console.log(error)
            }
        }
        obtenerdatos()
    },[])
    //@dvpinedo
    const guardarEstudiantes = async (e)=>{
        e.preventDefault()

        if(!nombre.trim()){
            alert("Por favor ingrese el nombre")
            return
        }
        if(!apellido.trim()){
            alert("Por favor ingrese el apellido")
            return
        }
        if(!correo.trim()){
            alert("Por favor ingrese el correo")
            return
        }
        if(!direccion.trim()){
            alert("Por favor ingrese la dirección")
            return
        }
        if(!telefono.trim()){
            alert("Por favor ingrese el teléfono")
            return
        }
        if(!ciudad.trim()){
            alert("Por favor ingrese la ciudad")
            return
        }
        if(!programa.trim()){
            alert("Por favor el programa")
            return
        }

        try{
            const db = firebase.firestore();
            const student = {
            nombreEstudiante: nombre,
            apellidoEstudiante: apellido,
            correoEstudiante: correo,
            direccionEstudiante: direccion,
            telefonoEstudiante: telefono,
            ciudadEstudiante: ciudad,
            programaEstudiante: programa
          }
          await db.collection('university').add(student)
            setListaEstudiantes([
            ...listaEstudiantes,
            {id:nanoid(),nombreEstudiante: nombre, apellidoEstudiante: apellido, correoEstudiante: correo, direccionEstudiante: direccion, telefonoEstudiante: telefono, ciudadEstudiante: ciudad, programaEstudiante: programa}
        ])
        console.log(listaEstudiantes)
        e.target.reset()

        setNombre("")
        setApellido("")
        setCorreo("")
        setDireccion("")
        setTelefono("")
        setCiudad("")
        setPrograma("")
        setError(null)

        }catch(error){
            console.log(error)
        }
    
    }
    
    const editar= item =>{
        setNombre(item.nombreEstudiante)
        setApellido(item.apellidoEstudiante)
        setCorreo(item.correoEstudiante)
        setDireccion(item.direccionEstudiante)
        setTelefono(item.telefonoEstudiante)
        setCiudad(item.ciudadEstudiante)
        setPrograma(item.programaEstudiante)
        setEdicion(true)
        setId(item.id)
    }
    const editarEstudiantes = async e=>{
        e.preventDefault()

        
        if(!nombre.trim()){
            alert("Por favor ingrese el nombre")
            return
        }
        if(!apellido.trim()){
            alert("Por favor ingrese el apellido")
            return
        }
        if(!correo.trim()){
            alert("Por favor ingrese el correo")
            return
        }
        if(!direccion.trim()){
            alert("Por favor ingrese la dirección")
            return
        }
        if(!telefono.trim()){
            alert("Por favor ingrese el teléfono")
            return
        }
        if(!ciudad.trim()){
            alert("Por favor ingrese la ciudad")
            return
        }
        if(!programa.trim()){
            alert("Por favor el programa")
            return
        }

        try{ console.log(id,"edicion")
            const db = firebase.firestore()
            await db.collection('university').doc(id).update({
            nombreEstudiante: nombre,
            apellidoEstudiante: apellido,
            correoEstudiante: correo,
            direccionEstudiante: direccion,
            telefonoEstudiante: telefono,
            ciudadEstudiante: ciudad,
            programaEstudiante: programa
            })

            
            const arrayEditado = listaEstudiantes.map(
                item => item.id===id ? {id:id, nombreEstudiante: nombre, apellidoEstudiante: apellido, correoEstudiante:correo, direccionEstudiante: direccion, telefonoEstudiante:telefono, ciudadEstudiante: ciudad, programaEstudiante: programa} : item
        )
                setListaEstudiantes(arrayEditado)
                setNombre('')
                setApellido('')
                setCorreo('')
                setDireccion('')
                setTelefono('')
                setCiudad('')
                setPrograma('')
                setId('')
                setEdicion(false)
                setError(null)
        }catch(error){
            console.log(error)
        }
    
    }
    const eliminar = async id =>{
        try{
            const db = firebase.firestore()
            await db.collection('university').doc(id).delete()
            const aux= listaEstudiantes.filter(item=> item.id !== id)
            setListaEstudiantes(aux)
        }catch(error){
            console.log(error)
        }
  
    }
    const cancelar = () =>{
        setEdicion(false)
        setNombre('')
        setApellido('')
        setCorreo('')
        setDireccion('')
        setTelefono('')
        setCiudad('')
        setPrograma('')
        setId('')
        setError(null)

    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'><img src="https://s3.amazonaws.com/staticcuc/images/stories/archivos/imagenes/logoCUC/logo-dorados-header.png" alt="" /></h1>
        <hr />
        <div className='row'>
            <div className='col-8'>
                <h4 className='text-left'>Estudiantes Registrados</h4>
            <ul className='list-group'>
                    {
                listaEstudiantes.map((item)=>(
                <li className="list-group-item" key={item.id}>
                <span className='lead'>
                    <img src="https://picsum.photos/200/300" alt="" />

                <br />
                <label >Nombre:</label> {item.nombreEstudiante} 
                <br />
                <label >Apellido:</label> {item.apellidoEstudiante}
                <br />
                <label >Correo Electrónico:</label> {item.correoEstudiante}
                <br />
                <label >Dirección:</label> {item.direccionEstudiante}
                <br />
                <label >Teléfono:</label> {item.telefonoEstudiante}
                <br />
                <label >Ciudad:</label> {item.ciudadEstudiante}
                <br />
                <label >Carrera Universitaria</label> {item.programaEstudiante}</span>
                <button className='btn btn-outline-danger btn-sm float-end mx-2'onClick={()=>eliminar(item.id)}>Eliminar</button>
                <button className='btn btn-outline-warning btn-sm float-end' onClick={()=>editar(item)}>Editar</button>
                </li>
            ))
            }
            </ul>
        </div>
        <div class="x" className='col-4'>
                        
                {   
                    edicion ? 'Editarndo datos. . .' : 'Ingresando. . .'
                }
                <br />
                <br />
                <form onSubmit={edicion? editarEstudiantes : guardarEstudiantes}>

                <label >Nombre</label>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su nombre'onChange={(e)=>setNombre(e.target.value)}value={nombre} />
                <label >Apellido</label>
                <input className='form-control mb-2'type="text" placeholder='Ingrese su apellido'onChange={(e)=>setApellido(e.target.value)}value={apellido} />
                <label >Correo Electrónico</label>
                <input className='form-control mb-2' type="email" placeholder='Ingrese su correo' onChange={(e)=>setCorreo(e.target.value)}value={correo} />
                <label for="inputAddress">Dirección</label>
                <input className='form-control mb-2' id="inputAdress"type="text"  placeholder='Ingrese su dirección' onChange={(e)=>setDireccion(e.target.value)}value={direccion} />
                <label >Teléfono</label>
                <input className='form-control mb-2' type="phone" placeholder='Ingrese su teléfono' onChange={(e)=>setTelefono(e.target.value)}value={telefono} />
                <label >Ciudad</label>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su ciudad' onChange={(e)=>setCiudad(e.target.value)}value={ciudad} />
                <label >Carrera Universitaria</label>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su programa' onChange={(e)=>setPrograma(e.target.value)}value={programa} />
                <br />
                {
                    edicion ? (
                    <>
                    <button className='btn btn-outline-warning ' type='submit'>Editar</button>
                    <button className='btn btn-outline-dark mx-2'onClick={()=>cancelar()}>Cancelar</button>
                    </>
                    )
                    :
                <button className='btn btn-outline-primary' type='submit'>Crear estudiante</button>
                }
                </form>
            </div>
        </div>
    </div>
    )
}

export default Registro
export {firebase}