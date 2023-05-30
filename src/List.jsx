import { FaTrash, FaEdit } from 'react-icons/fa';

const List = ({ list, removeSingleItem, editItem}) => {
  return (
    <div className="items">
      {list.map((singleList) => {
        return (
          <div className="single-item" key={singleList.id}>
            <p>{singleList.title}</p>
            <FaTrash onClick={()=> removeSingleItem(singleList.id)} />
            <FaEdit onClick={()=> editItem(singleList.id)}/>
          </div>
        );
      })}
    </div>
  );
};

export default List;
