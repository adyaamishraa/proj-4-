import React, { useEffect, useState } from "react";
import styled from "styled-components"
import SearchResult from "./components/SearchResult";


export const BASE_URL = "http://localhost:9000";


const App = () => {
  const [data, setData] = useState(null); // store karne ke liye data, direct from server in json format
  const [loading, setloading] = useState(false);// Incase UI render na ho uske liye
  const [error, seterror] = useState(null); // Incase UI render na ho to error aayega
  const [filteredData, setfilteredData] = useState(null); // type ke basis pe filtered data. search karne me jo similar aaye.
  const [selectedBtn, setSelectedBtn] = useState("all"); //jo button choose karenge.


  
  useEffect(() => { //data fetch, DOM update, run code in props, avoid blocking UI updates.
    
    const fetchFoodData = async() => {
      setloading(true);
      try {
        const response = await fetch(BASE_URL);
  
        const json = await response.json();
        //console.log(json);
  
        setData(json);
        setfilteredData(json); 
        setloading(false);

      } catch (error) {
        seterror("UNABLE TO FETCH DATA!!")
      }
    }

    fetchFoodData();
  }, []);//useeffect phle he data le aayega before UI is built. Dependency array pass karne se ek he baar aayega data 

  if(error){
    return <div>{error}</div>
  }
  if(loading){
    return <div>loading...</div>
  }

  
  

  const filterBtn = [
    { 
      name: "All", 
      type: "all",
    },
    { 
      name: "Breakfast", 
      type: "breakfast",
    },
    { 
      name: "Lunch", 
      type: "lunch",
    },
    { 
      name: "Dinner", 
      type: "dinner",
    },
  ]


  
  const filteredFood = (type) => {
    if(type == "all"){
      setfilteredData(data);  // saare cards aa jayenge
      setSelectedBtn("all");  // all ka btn select ho jayega.
      return;
    }

    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));

    setfilteredData(filter);
    setSelectedBtn(type);

  }

  

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    
    if(searchValue == ""){
      setfilteredData(null);
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));

    setfilteredData(filter);
  }

  return (
    <>
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="logo.svg" alt="logo" />
        </div>

        <div className="search">
          <input type="text" name="" id="" placeholder="Search Food" onChange={searchFood}/>
        </div>
      </TopContainer>

      <FilterContainer>
        {filterBtn.map((value)=> <Button key={value.name} onClick={() => filteredFood(value.type)}>{value.name}</Button>)}
      </FilterContainer>     
    </Container>

    <SearchResult data={filteredData}/>  
    </>
  )
};

export default App;

export const Container = styled.div`
  background-color: #323334;
  max-width: 1200px;
  margin: 0 auto;
`

const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  align-items: center;

  .search{
    input{
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 15px;
    }
  }
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding-bottom: 45px;
`

export const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  box-shadow: 1px 2px 2px #808080;
  cursor: pointer;

  :hover{
    transform: scale(1.3);
    transition: all transform ease-in-out 1s;
    box-shadow: none;
    background-color: #f22f2f;
  }

`




// In React.js, async and await are used to handle asynchronous operations like fetching data, calling APIs, or waiting for a promise to resolve. They make the code easier to read and write compared to using .then() and .catch() for promises.

// Error Handling: Using try...catch with async/await provides a cleaner way to handle errors.
//Avoid Callback Hell: Prevents deeply nested .then() chains.

// In React.js, the try...catch statement is used to handle errors gracefully, especially in asynchronous operations or sections of code where errors might occur. It helps in preventing the app from crashing and allows you to handle errors in a controlled way

