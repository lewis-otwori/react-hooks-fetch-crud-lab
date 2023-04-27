import React, { useState,useEffect } from "react";
import QuestionItem from "./QuestionItem";
function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(()=>{fetch('http://localhost:3000/questions').then(resp=>resp.json()).then(data=>setQuestions(data))},[])
  function handleDeletedItem(deletedQuestion){
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      {questions.map((question)=>{
        return <ul key={question.id}><QuestionItem question={question} updateQuestions={handleDeletedItem}/></ul>
      })}
    </section>
  );
}
export default QuestionList;