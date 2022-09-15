
import Link from 'next/link'

import { useEffect, useState } from 'react'
import Item from '../components/Item'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [value, setValue ]= useState('')
  const [page, setPage] = useState(1)
  const [collections, setCollections] = useState([])
  const [isLoading,setIsLoading ] = useState(false)
  const onClickClear = () => {
    setValue('')
  }

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://6300b9619a1035c7f8f6d363.mockapi.io/products?page=${page}&limit=5`).then((res) => res.json()).then((json) => {
      setCollections(json)
    }).catch((err) => {
      console.warn(err);
      alert("Ошибка при подлючении данных");
    }).finally(()=> setIsLoading(false))
  }, [ page])
  return (
    <><div className={styles.title}>
      <h1>Товары</h1>
      <Link href="/create">
      <a className={styles.button}>Добавить</a>
        </Link>
   
    </div>
    <div className={styles.root}>
    <img className={styles.icon} src='/icon.png'  />
    <input  value={value} onChange={e =>setValue(e.target.value) } className={styles.input} type="text" placeholder='поиск' />
    <div className={styles.text}>
      <h3>картинка</h3>
      <h3 className={styles.p}>названия</h3>
      <h3 >сумма</h3>
      <h3>статус</h3>
    </div>
    {value && (<img onClick={onClickClear} className={styles.clearIcon} src='https://i.ya-webdesign.com/images/oyster-clipart-watercolor-18.png'/>)}
    </div>
      { isLoading ? <h2 className={styles.loader} >Идет Загрузка</h2> : collections.length > 0 ? collections.filter(obj => {
          return obj.name.toLowerCase().includes(value.toLocaleLowerCase())
        }).map(res => {
        return (
          <Item key={res.id} {...res} />
        ) 
      }) : <h2> проблема с загрузкой </h2>}
         <ul className={styles.pagination}>
{
  [...Array(2)].map((_, i) => <li key={i} onClick={()=> setPage(i + 1)}>{i +1}</li>)
}
      </ul>
    </>
  )
}
