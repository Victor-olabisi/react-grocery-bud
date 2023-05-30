import { useEffect, useState } from 'react';
import List from './List';
import Alert from './Alert';


const getLocalStorage = () => {
 const storage = localStorage.getItem('list')
  if (storage) {
    return JSON.parse(localStorage.getItem('list'));
  }
  else {
    return []
  }
}
const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID,setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type:'',
  })
  const displayAlert = (show = false, message = '', type = '') => {
    setAlert({
      show,
      message,
      type,
    })
   
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      displayAlert(true, "please enter value", 'danger')
    } else if (name && isEditing) {
      setList(list.map(item => {
        if (item.id === editID) {
          return {...item, title:name}
        }
        return item
      }))
      displayAlert(true, 'item changed','success')
      setIsEditing(false)
      setName('')
      setEditID(null)
    } else {
      const newItem = { id: new Date().getTime(), title: name };
      setList([...list, newItem]);
      setName("")
      displayAlert(true, 'item added successfully', 'success')
    }
  };
  const removeAllItems = () => {
    setList([]);
    if (list.length === 0) {
    displayAlert(true, 'no item in the list', 'danger');

    }
    else {
      displayAlert(true, 'all item deleted','danger')
    }
  };
  const removeSingleItem = (id) => {
    const newList = list.filter(singleItem => {
      return singleItem.id !== id;
    })
    displayAlert(true, 'item deleted', 'danger')
    setList(newList)
  }
  const editItem = (id) => {
    const specificItem = list.find(singleList => {
      return singleList.id === id;
    })
    setName(specificItem.title)
    setIsEditing(true)
    setEditID(id)
  }
  useEffect(() => {
   localStorage.setItem('list',JSON.stringify(list))
  },[list])
  return (
    <>
      <section className="section-center">
        <form className="form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={displayAlert} />}

          <h4>grocery bud</h4>

          <div className="form-control">
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="btn">
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
          {<List list={list} removeSingleItem={removeSingleItem} editItem={editItem} />}
        </form>

        <button className="btn" onClick={removeAllItems}>
          clear item
        </button>
      </section>
    </>
  );
};

export default App;
