import React from "react";
import { useSelector } from "react-redux";

function UserTodo(){
    const {userTodo} = useSelector((state) => state.auth);

    console.log("todo", userTodo);
    

    const renderTodo = (todo = userTodo)=>{
        return todo.map((data, index) => {
            const [day, todoExercises]  = data.split(":");
            
            const Exercises = todoExercises.split(",")
            console.log("Exercises ",Exercises);
            
             return (<div key={index}>
                <h1>
                    {day}
                </h1>
                <div>{
                    Exercises.map((data, exerciseIndex) => {
                          
                         return (<div  key={exerciseIndex}><p>
                        {data}
                    </p></div>)
                    })
                }</div>
            </div>)
        })
    
    }
    return (
        <div>
            {renderTodo()}
        </div>
    )

}

export default UserTodo;