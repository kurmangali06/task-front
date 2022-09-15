import styles from '../styles/Item.module.css'
import axios  from"axios"
import { useRouter } from 'next/router';
import { useState } from 'react';

const Item = ({ id, img, name, status, price  }) => {
  const [isLoading,setIsLoading ] = useState(false)
  const router = useRouter();
  const onSubmitRemove = async ()=> {
    try {
    setIsLoading(true)
     await axios.delete(`https://6300b9619a1035c7f8f6d363.mockapi.io/products/${id}`);
     alert("товар удален")
     
    } catch (error) {
      console.warn(error)
      alert("Ошибка при загрузки файла")
    }
    location.reload()
    setIsLoading(false)
  }
  const onSubmitEdit = async ()=> {
    router.push(`/${id}`)
  }
  return (
    <> 
    {isLoading ? <h3>идет удаления товара</h3>: (    
    <><div className={styles.item}>
          <img src={img} height="150" width="200" />
          <h3>{name} </h3>
          <b>{price} тенге</b>
          <p>{status}</p>
        </div><div className={styles.container}>
            <button className={styles.button} onClick={onSubmitRemove}>Удалить</button>
            <button className={styles.button} onClick={onSubmitEdit}>Редактировать</button>
          </div></>) }

    </>
  )
}

export default Item