import React, { useEffect, useState } from "react";

const AddEvent = ({ afterAdded }) => {
  let [input, setInput] = useState("");

  const submit = async () => {
    await fetch(`http://127.0.0.1:3001/add?name=${input}`);
    setInput("");
    await afterAdded();
  }

  const inputHandler = (e) => {
    setInput(e.target.value);
  }

  return (
    <div>
      <input type="text" onChange={inputHandler} value={input}/>
      <button onClick={submit}>新增</button>
    </div>
  );
};

const RenderList = () => {
  const [list, setList] = useState([]);
  
  const getList = async () => {
    let fetchPromise = await fetch("http://127.0.0.1:3001/list", {
    method: 'POST', 
  }); 
    let todosArray = await fetchPromise.json(); 
    setList(todosArray);
  }

  const deleteHandler = async (id) => {
    await fetch(`http://127.0.0.1:3001/${id}`, {
      method:'DELETE' , 
    }); 
    getList();
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <AddEvent afterAdded={getList} />
      {list
        .filter((item) => !item.deleted)
        .map((item) => {
          return (
            <div key={item.id}>
              <span>{item.name}</span>
              <button onClick={() => deleteHandler(item.id)}>刪除</button>
            </div>
          );
        })}
    </div>
  );
}

export default RenderList;
