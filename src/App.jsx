import { useState } from 'react';
import './App.css';

export const App = () => {
  const [inputLearningContext, setInputLearningContext] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [records, setRecords] = useState([]);
  const onChangeLearningContext = (event) =>
    setInputLearningContext(event.target.value);
  const onChangeTime = (event) => setInputTime(event.target.value);
  const [error, setError] = useState(false);
  const [sumTime, setSumTime] = useState(0);

  const onClickAdd = () => {
    // 入力項目が空の場合
    if (!inputLearningContext || !inputTime) {
      setError(true);
      return;
    }
    // エラーメッセージを非表示
    setError(false);

    const newRecords = {
      title: inputLearningContext,
      time: parseInt(inputTime),
    };

    // 新しいレコードを追加
    const updateRecords = [...records, newRecords];
    setRecords(updateRecords);

    // 合計時間を計算
    let total = updateRecords.reduce(
      (sum, current) => parseInt(sum) + parseInt(current.time),
      0
    );
    setSumTime(total);

    // 入力項目をリセット
    setInputLearningContext('');
    setInputTime(0);
  };

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        学習内容
        <input
          type="text"
          value={inputLearningContext}
          onChange={onChangeLearningContext}
        />
      </div>
      <div>
        学習時間
        <input type="number" value={inputTime} onChange={onChangeTime} />
        時間
      </div>
      <div>
        <p>入力されている学習内容：{inputLearningContext}</p>
        <p>入力されている時間：{inputTime}時間</p>
      </div>
      <hr />
      {records.map((record, index) => {
        return (
          <p key={index}>
            {record.title} {record.time}時間
          </p>
        );
      })}

      <div>
        <button onClick={onClickAdd}>登録</button>
      </div>
      {error && <p style={{ color: 'red' }}>入力されていない項目があります</p>}
      <p>合計時間：{sumTime}/1000(h)</p>
    </>
  );
};
