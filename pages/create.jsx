import { useRouter } from 'next/router'
import {  useState } from 'react';

import styles from '../styles/Item.module.css'


const Edit = () => {
  const router = useRouter();
  const [price, setPrice] = useState('');
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState(""); 
  const [isLoading,setIsLoading ] = useState(false)


  const onClickRemoveImage = () => {
    setImg('');
   };


  const onSubmit = async ()=> {
    try {
      const fields = {
        name,
        price,
        img,
        text
      }
      if(name === '' && price === 0 && img === 0, text === ""){
        alert("все пункты обязательны к заполнению") }
    else{
     await fetch.post('https://6300b9619a1035c7f8f6d363.mockapi.io/products', fields);
     setIsLoading(true)
     alert("товар добавлен")}
    } catch (error) {
      console.warn(error)
      alert("Ошибка при загрузки файла")
    }
    setIsLoading(false)
    await router.push("/")
  }
  return (
    <div className={styles.edit} >
      {isLoading ? <h3>Идет обработка</h3> : (      <div>
      <label  className={styles.label} >НАЗВАНИЯ ТОВОРА</label>
      <br />
      <input   value={name}   onChange={(e) => setName(e.target.value)} className={styles.input} type="text" placeholder='введите названия' />
      <br />
      <label  className={styles.label}></label>
      <br />
      <textarea  value={text} onChange={(e) => setText(e.target.value)} className={styles.input}  placeholder='введите описания' ></textarea>
      <br />
      <label  className={styles.label}>цена</label>
      <br />
      <input  value={price}   onChange={(e) => setPrice(e.target.value)} className={styles.input} type="number" placeholder='ценна ' />
      <br />
      <h5  className={styles.label}>Добавить медиа</h5>
      <br />
      <input  value={img} onChange={e=> setImg(e.target.value)} className={styles.input} placeholder="вставьте ссылку" />
      {img && (
        <><button variant="contained" color="error" className={styles.button} onClick={onClickRemoveImage}>
          Удалить
        </button></>
      )}
      <button className={styles.button} onClick={onSubmit} >сохранить</button>
      <br />
      <button className={styles.button} onClick={() => router.push("/")} >отмена</button>
      </div>  ) }
   
    </div>
    
  )

}


export default Edit