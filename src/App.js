import { useState } from "react";
import "./App.css";
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Alert from './components/Alert'

const App = () => {

  const [charge, setCharge] = useState('');

  const [amount, setAmount] = useState(0);

  const [id, setId] = useState('');

  const [edit, setEdit] = useState(false);

  const [alert, setAlert] = useState({ show: false });

  const [expenses, setExpenses] = useState(
    [
      { id: 1, charge: '렌트비', amount: 1600},
      { id: 2, charge: '교통비', amount: 400},
      { id: 3, charge: '식비', amount: 1200}
    ]
  )

  const handleCharge = (e) => {
    // console.log(e.target.value);
    setCharge(e.target.value);
  }

  const handleAmount = (e) => {
    // console.log(e.target.valueAsNumber);
    setAmount(e.target.valueAsNumber);
  }

  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.' });
  }

  const clearItems = () => {
    setExpenses([]);
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
      // 7초 후 자동으로 없어짐
    }, 7000);
  }

  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id );
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }

  const handleSubmit = e => {
    
    // 페이지가 새로고침되는 기본 방식을 방지하기 위해 prevent를 해줌
    e.preventDefault();

    if (charge !== '' && amount > 0) {
      if (edit){
        const newExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item
        })

        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: '아이템이 수정되었습니다.' })
        
        // State를 초기화해줌
        setExpenses(newExpenses)
        setCharge('');
        setAmount(0);

      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount };
        
        // 불변성을 지켜주기 위해서 새로운 Expense를 생성해서 expenses 뒤에 추가함 (참조타입인 배열 또는 객체는 불변성이 없으므로 신경써줘야 함)
        // 최대한 원본 데이터를 변경하지 않는 메소드를 사용해야 함
        // spread operator, map, filter, slice, reduce는 원본 데이터를 변경하지 않는 메소드
        const newExpenses = [...expenses, newExpense];

        // State를 초기화해줌
        setExpenses(newExpenses)
        setCharge('');
        setAmount(0);

        handleAlert({ type: 'success', text: '성공적으로 추가되었습니다.' });
      }
      
    } else {
      console.log('error');
      handleAlert({ type: 'danger', text: '경고!! 아쉽게도 추가되지 않았습니다.' });
    }

  }

    return (
      <main className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
        <h1>예산 계산기... 후후</h1>

        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }} >
          {/* {Expense Form} */}
          <ExpenseForm 
            handleCharge={handleCharge}
            charge={charge}
            handleAmount={handleAmount}
            amount={amount}
            handleSubmit={handleSubmit}
            edit={edit}
          />
        </div>

        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }} >
          {/* {Expense List} */}
          <ExpenseList
            expenses={expenses}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            clearItems={clearItems}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
          <p style={{ fontSize: '2rem'}}>
            총 지출:
            <span>
              {/* reduce 메소드로 배열 속 acc(누적값)에 curr(현재값)을 더해줌 */}
              {expenses.reduce((acc, curr) => {
                return (acc += curr.amount);
              }, 0)}
              원
            </span>
          </p>
        </div>
      </main>
    )
  }

export default App;