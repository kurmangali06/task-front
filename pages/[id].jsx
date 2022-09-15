import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios  from"axios"
import styles from '../styles/Item.module.css'


const Items = () => {
    const router = useRouter();
    const {id} = router.query;
    const [data, setData] = useState({})
    const [isLoading,setIsLoading ] = useState(false)
    const [price, setPrice] = useState(data?.price);
    const [name, setName] = useState(data?.name);
    const [text, setText] = useState(data?.text);
    const [img, setImg] = useState(data?.img);

  

    useEffect(()=> {
      setIsLoading(true)
      axios.get(`https://6300b9619a1035c7f8f6d363.mockapi.io/products/${id}`).then(res => {
        setData(res.data)
        setPrice(res.data?.price)
        setImg(res.data?.img)
        setName(res.data?.name)
        setText(res.data?.text)
      }).catch(err => {
        console.warn(err)
      }).finally(()=> setIsLoading(false))
      console.log(id)
    }, [id])


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
        console.log(fields)
        if(name === '' && price === 0 && img === 0, text === ""){
          alert("все пункты обязательны к заполнению") }
      else{
       await axios.put(`https://6300b9619a1035c7f8f6d363.mockapi.io/products/${id}`, fields);
       alert("товар добавлен")}
      } catch (error) {
        console.warn(error)
        alert("Ошибка при загрузки файла")
      }
      await router.push("/")
    }
    return (
  
      <div className={styles.edit} >
        {isLoading ? <h2 className={styles.loader} >Идет Загрузка</h2> : <div>
        <label  className={styles.label} >НАЗВАНИЯ ТОВОРА</label>
        <br />
        <input   value={name}   onChange={(e) => setName(e.target.value)} className={styles.input} type="text" placeholder={data?.name} />
        <br />
        <label  className={styles.label}></label>
        <br />
        <textarea  value={text} onChange={(e) => setText(e.target.value)} className={styles.input}  placeholder={data?.text} ></textarea>
        <br />
        <label  className={styles.label}>цена</label>
        <br />
        <input  value={price}   onChange={(e) => setPrice(e.target.value)} className={styles.input} type="number" placeholder={data?.price} />
        <br />
        <h5  className={styles.label}>Добавить медиа</h5>
         {data.img && <img src={data?.img} width="200" height="200" />}
        <br />
        <input  value={img} onChange={e=> setImg(e.target.value)} className={styles.input} placeholder="вставьте ссылку" />
        {img && (
          <><button variant="contained" color="error" className={styles.button} onClick={onClickRemoveImage}>
            Удалить
          </button>
          </>
        )}
       
        <button className={styles.button} onClick={onSubmit} >сохранить</button>
        <br />
        <button className={styles.button} onClick={() => router.push("/")} >отмена</button>
        </div>   }
   
      </div>
      
    )
  
  }

export default  Items