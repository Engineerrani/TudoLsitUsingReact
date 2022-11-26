import React, {useState, useEffect} from 'react'
import './style.css';
// get the localStorage data back
const getLocalData = () => {
    const list = localStorage.getItem("mytodolist");

    if(list) {
        return JSON.parse(list);
    }else {
        return [];
    }
}


const TudoList = () => {
    const [inputdata, setInputData] = useState(" ");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState();
    const [toggleButton, setToggleButton] = useState(false);
 
// add the items function
const addItem = () => {
if(!inputdata) {
    alert('please fill the data')
}else if (inputdata && toggleButton) {
    setItems(
        items.map((curElem) => {
       if(curElem.id ===  isEditItem) {
        return {...curElem, name: inputdata};
       }
       return curElem;
        })
    )
}
else {
    const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
    }
    setItems([...items, inputdata]);
    setInputData(" ");
}
};
// add the items
const editItem = (index) => {
const item_todo_edited = items.find((curElem) => {
    return curElem.id === index;
})
setInputData("")
 setIsEditItem(null);
 setToggleButton(false);
}
// how to delete items
const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
        return curElem.id !== index;
    });
    setItems(updatedItems);
}

//remove all the elements
const removeAll = () => {
    setItems([]);
}
// adding localStorage
useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items))
}, [items]);

  return ( 
    <>
    
    <div className='main_div'>
        <div className='child-div'>
            <figure>
                <img src='https://cdn-icons-png.flaticon.com/512/1/1560.png'width={50} height={50} alt='tudologo' />
                <figcaption className='list'>Add Your List Here 📝</figcaption>
            </figure>
            <div className='addItem'>
                <input type="text" 
                placeholder="✍ Add Item..." 
                className="form-control" 
                value={inputdata} 
                onChange={(event) => setInputData(event.target.value)} />
                {toggleButton ? ( <i className="fa-solid fa-edit" onClick={addItem}></i> ) : (
                    <i className="fa-solid fa-plus" onClick={addItem}></i>
                )}
            
            </div>
            {/* SHOW OUR ITEMS */}
          <div className='showItems'>
            {
                items.map((curElem, index) => {
                    return (
                        <div className='eachItem' key={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className='todu-btn'>
                <i className="fa-solid fa-edit" onClick={() => editItem(curElem.id)}></i>
                <i className="fa-solid fa-trash" onClick={() => deleteItem(curElem.id)}></i>
                </div>
            </div>
                    )
                })
            }
          </div>



            <div className='showItems'>
                <button className='btn' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
            </div>
        </div>
    </div>
    
    
    </>
  )
}

export default TudoList;