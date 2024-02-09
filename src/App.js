import React, { useRef, useState, useEffect, useContext } from "react";
import logo from './logo.svg';
import './App.css';
import GifLLoading from './img/gifLoading.gif'
import light from './img/light.png'
import img from './img'
import gif from './img/1.gif'
import popup from './img/popup.png'

function App() {
  const [loading, setloading] = useState(true);
  const [popupError, setpopupError] = useState(false);
  const [popupCondition, setpopupCondition] = useState(false);
  const [textError, settextError] = useState('ซึ่งจะทำให้ส่วนนี้มีความสูงเป็นสัดส่วนของพื้นที่มีอยู่ของหน้าจอหรือ container บางครั้งอาจทำให้เนื้อหาไม่พอดี');
  const [texttitelError, settexttitelError] = useState('Error');
  const [isCheckedSubmit, setIsCheckedSubmit] = useState(false);
  const [timedisplay, settimedisplay] = useState('block');
  const [playbuntom, setplaybuntom] = useState('block');
  const [endbuntom, setendbuntom] = useState('none');
  const [timegame, settimegame] = useState(new Date().toLocaleTimeString());
  const [timestart, settimestart] = useState(true);
  const [timesout, settimesout] = useState('00:40:00');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [start, setstart] = useState(false);
  const [popupwin, setpopupwin] = useState(false);

  useEffect(() => {
    if (timestart === true) {
      const interval = setInterval(() => {
        const newTime = new Date().toLocaleTimeString();
        settimegame(newTime);
        if (newTime >= timesout) {
          timeout();
        }
      }, 1000);
      return () => clearInterval(interval);
    }

    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === img.length - 1 ? 0 : prevIndex + 1
      );
    }, 16); // กำหนดเวลาสลับรูปภาพ (มิลลิวินาที)
    return () => clearInterval(interval);

  }, []);

  const handleChangeLoading = (e) => {
    setloading(false)
    setpopupError(true)
  };

  const onClose = (e) => {
    setpopupError(false)
    setpopupCondition(true);
  };

  const onCloseCondition = (e) => {
    if (isCheckedSubmit === true) {
      setpopupCondition(false);
    } else {
      setpopupCondition(true);
    }
  };

  const handleCheckboxChangeSubmit = (event) => {
    setIsCheckedSubmit(event.target.checked);
  };

  const timeout = () => {
    if (timestart === true ) {
      settimedisplay('none');
      setplaybuntom('block')
      settimestart(false)
    }
  };


  const onClickPlay = (event) => {
    if (endbuntom === 'none'){
      setplaybuntom('none')
      setstart(true)
      setTimeout(() => {
        setpopupwin(true);
  
      }, 3000);
    }
  };

  const onClosePopup = (event) => {
    setpopupwin(false)
    setstart(false)
    setendbuntom('block')
  };


  return (
    <>
      {loading && (
        <div className="Loading">
          <div className="BGLoading" onClick={handleChangeLoading}>
            <img className="GitLoading" src={GifLLoading} alt="Git Loading" />
          </div>
        </div>
      )}

      {popupError && (
        <div className="ErrorModal">
          <div className="ErrorModal-content">
            <h2 className="font">{texttitelError}</h2>
            <p className="font">{textError}</p>
            <button className="font" onClick={onClose}>ตกลง</button>
          </div>
        </div>
      )}

      {popupCondition && (
        <div className="Loading">
          <div className="BGCondition">
            <span className="spantext font"> ยอมรับเงื่อนไขและข้อตกลงในการใช้งาน ยอมรับเงื่อนไขและข้อตกลงในการใช้งาน ยอมรับเงื่อนไขและข้อตกลงในการใช้งาน ยอมรับเงื่อนไขและข้อตกลงในการใช้งาน</span>
            <label className="custom-checkbox-container">
              <input
                className="custom-checkbox font"
                type="checkbox"
                checked={isCheckedSubmit}
                onChange={handleCheckboxChangeSubmit}
              />
              <span className="font"> ยอมรับเงื่อนไขและข้อตกลงในการใช้งาน</span>
            </label>
            <button className="confirm-button font" onClick={onCloseCondition}>เล่นเลย!</button>
          </div>
        </div>
      )}


      {start && (
        <div className="Loading">
          <div className="BGLoading" onClick={handleChangeLoading}>
            <img className="Git" src={gif} alt="Git Loading" />
          </div>
        </div>
      )}


      {popupwin && (
        <div className="Loading">
          <div className="BGPopup">
            <div className="BGcenter">
              <div className="popup-container">
                <img className="GitLight rotate" src={light} alt="GitI" />
                <div className="popup-background">
                  <div className="popup-content">
                    <div className="text-content font">
                      <h2 style={{ color: '#ffc400' }}>ของรางวัล</h2>
                      <h1 style={{ color: '#ffc400' }}>ที่ได้!!</h1>
                      <p className="font">ส่วนลด 40% สามารถไปและเครื่องได้ ส่วนลด 40% สามารถไปและเครื่องได้</p>
                    </div>
                    <div className="input-area">
                      <div className="font" onClick={onClosePopup}>ตกลง</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      <div className="App">
        <div className='SiteStart'>
          <div className='BGStart'>
            <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}

              <button className="buttonplay font" style={{ marginBottom: '0px', color: '#590000', display: playbuntom }} onClick={onClickPlay}>
                  <div className="button-content">
                    ลุ้นรางวัล
                  </div>
                </button>
                <div className="font" style={{ display: endbuntom }}>
                <h6 style={{ color: '#590000', marginBottom: '0px', marginTop: '0px' }}>**ท่านเคยกดรับรางวัลไปแล้ว**</h6>
                <h5 style={{ color: '#590000', marginTop: '0px' }}>กดดูรางวัลที่ได้</h5>
              </div>

              <div style={{ width: '100%', display: timedisplay }}>
                <button className="buttonplay" style={{ marginBottom: '0px', color: '#000000' }}>
                  <div className="button-contentNot">
                    ลุ้นรางวัล
                  </div>
                </button>
                <div className="font" style={{ display: timedisplay }}>
                  <h2 style={{ color: '#590000', marginBottom: '0px', marginTop: '0px' }}>{timegame}</h2>
                  <h5 style={{ color: '#590000', marginTop: '0px' }}>ชั่วโมง : นาที : วินาที</h5>
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
