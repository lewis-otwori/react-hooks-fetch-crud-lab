import React from "react";
function QuestionItem({ question , updateQuestions}) {
  const { id, prompt, answers, correctIndex } = question;
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleDelete(){
    fetch(`http://localhost:3000/questions/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      updateQuestions(question)
      alert('Question deleted!')
    })
    .catch(err => console.log(err));
  }
  function handleCorrectAnswer(e){
    fetch(`http://localhost:3000/questions/${id}`,{
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correctIndex: e.target.value,
      })
    })
    .then(resp=>resp.json())
    .then(()=>{alert('Correct answer changed!')})
    .catch(err=>console.log(err))
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}
export default QuestionItem;