import React, { useEffect, useState } from 'react';
import './ConditionRadioList.css';

function ConditionRadioList({radioDisabled}) {
    const [selectedCondition1, setSelectedCondition1] = useState('1-1');
    const [selectedCondition2, setSelectedCondition2] = useState('2-1');
    const [selectedCondition3, setSelectedCondition3] = useState('3-1');
    const [selectedCondition4, setSelectedCondition4] = useState('4-1');
    const [selectedCondition5, setSelectedCondition5] = useState('5-1');
    const [selectedCondition6, setSelectedCondition6] = useState('6-1');

    const handleConditionChange = (id) => (event) => {
        switch(id) {
            case 1: setSelectedCondition1(event.target.id); break;
            case 2: setSelectedCondition2(event.target.id); break;
            case 3: setSelectedCondition3(event.target.id); break;
            case 4: setSelectedCondition4(event.target.id); break;
            case 5: setSelectedCondition5(event.target.id); break;
            case 6: setSelectedCondition6(event.target.id); break;
            default: break;
        }
    };
    
    useEffect(() => {
        const radioValue = [];
        radioValue.push(selectedCondition1.split('-')[1]);
        radioValue.push(selectedCondition2.split('-')[1]);
        radioValue.push(selectedCondition3.split('-')[1]);
        radioValue.push(selectedCondition4.split('-')[1]);
        radioValue.push(selectedCondition5.split('-')[1]);
        radioValue.push(selectedCondition6.split('-')[1]);
        console.log(radioValue);
    }, [selectedCondition1, selectedCondition2,selectedCondition3,selectedCondition4,selectedCondition5,selectedCondition6]);
    
    return (
        <ul className="condition-list">
            <li>
                <span>밑줄 흔적:</span>
                <input type="radio" id="1-1" checked={selectedCondition1 === '1-1'} onChange={handleConditionChange(1)} disabled={!radioDisabled}/>
                <label htmlFor="1-1" className="radio-label1">없음</label>
                <input type="radio" id="1-2" checked={selectedCondition1 === '1-2'} onChange={handleConditionChange(1)} disabled={!radioDisabled}/>
                <label htmlFor="1-2" className="radio-label2">연필/샤프</label>
                <input type="radio" id="1-3" checked={selectedCondition1 === '1-3'} onChange={handleConditionChange(1)} disabled={!radioDisabled}/>
                <label htmlFor="1-3" className="radio-label3">볼펜/형광펜</label>
            </li>
            <li>
                <span>필기 흔적:</span>
                <input type="radio" id="2-1" checked={selectedCondition2 === '2-1'} onChange={handleConditionChange(2)} disabled={!radioDisabled}/>
                <label htmlFor="2-1" className="radio-label1">없음</label>
                <input type="radio" id="2-2" checked={selectedCondition2 === '2-2'} onChange={handleConditionChange(2)} disabled={!radioDisabled}/>
                <label htmlFor="2-2" className="radio-label2">연필/샤프</label>
                <input type="radio" id="2-3" checked={selectedCondition2 === '2-3'} onChange={handleConditionChange(2)} disabled={!radioDisabled}/>
                <label htmlFor="2-3" className="radio-label3">볼펜/형광펜</label>
            </li>
            <li>
                <span>겉표지:</span>
                <input type="radio" id="3-1" checked={selectedCondition3 === '3-1'} onChange={handleConditionChange(3)} disabled={!radioDisabled}/>
                <label htmlFor="3-1" className="radio-label1">깨끗함</label>
                <input type="radio" id="3-2" checked={selectedCondition3 === '3-2'} onChange={handleConditionChange(3)} disabled={!radioDisabled}/>
                <label htmlFor="3-2" className="radio-label2">깨끗하지 않음</label>
            </li>
            <li>
                <span>이름 기입:</span>
                <input type="radio" id="4-1" checked={selectedCondition4 === '4-1'} onChange={handleConditionChange(4)} disabled={!radioDisabled}/>
                <label htmlFor="4-1" className="radio-label1">없음</label>
                <input type="radio" id="4-2" checked={selectedCondition4 === '4-2'} onChange={handleConditionChange(4)} disabled={!radioDisabled}/>
                <label htmlFor="4-2" className="radio-label2">있음</label>
            </li>
            <li>
                <span>페이지 변색:</span>
                <input type="radio" id="5-1" checked={selectedCondition5 === '5-1'} onChange={handleConditionChange(5)} disabled={!radioDisabled}/>
                <label htmlFor="5-1" className="radio-label1">없음</label>
                <input type="radio" id="5-2" checked={selectedCondition5 === '5-2'} onChange={handleConditionChange(5)} disabled={!radioDisabled}/>
                <label htmlFor="5-2" className="radio-label2">있음</label>
            </li>
            <li>
                <span>페이지 훼손:</span>
                <input type="radio" id="6-1" checked={selectedCondition6 === '6-1'} onChange={handleConditionChange(6)} disabled={!radioDisabled}/>
                <label htmlFor="6-1" className="radio-label1">없음</label>
                <input type="radio" id="6-2" checked={selectedCondition6 === '6-2'} onChange={handleConditionChange(6)} disabled={!radioDisabled}/>
                <label htmlFor="6-2" className="radio-label2">있음</label>
            </li>
        </ul>
    );
}    

export default ConditionRadioList;
