import React, { useState } from "react";
//import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import  { useRef } from "react";
import Dropdown from "../Dropdown/Dropdown";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";
import card1 from "../../images/Userscard.png";
import card2 from "../../images/message-square-outline.svg";
import card3 from "../../images/heart-outline.svg";
import card4 from "../../images/attach-outline.svg";

//like button 


function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, desc, labels } = props.card;
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setLikeCount(likeCount + 1);
  };

  // const formatDate = (value) => {
  //   if (!value) return "";
  //   const date = new Date(value);
  //   if (!date) return "";

  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Aprl",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];

  //   const day = date.getDate();
  //   const month = months[date.getMonth()];
  //   return day + " " + month;
  // };


  //imguploading
  const inputRef=useRef(null);
  const [image,setImage]=useState("");

  const handleImageClick=(e)=>{
    e.stopPropagation();
    inputRef.current.click();
  }
const handleImageChange=(event)=>{
  const file=event.target.files[0];
  console.log(file);
  setImage(event.target.files[0]);
}





const imgRef = useRef(null);
const divRef = useRef(null);
const handleImgClick = (e) => {
  e.stopPropagation();
  if (divRef.current) {
    divRef.current.click();
  }
};




  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div ref={divRef} onClick={handleImageClick} className="image-upload">
         
         {image?(<img className="card-img" src={URL.createObjectURL(image)} alt="imgmissin"/>):(<span/>)}
         <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:"none"}}/>
       </div>
        <div className="card_top">
          <div className="card_top_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            {/* <MoreHorizontal /> */}
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{title}</div>
        <div className="desc_title">{desc}</div>
        
        <div className="card-like-comment">
          <span><img src={card1} alt="oops"/></span>
          <span className="card-icons-low-right">
              <img src={card2} alt="oops"/>
              <div className="like-container">
                <button className="like-button" onClick={handleLikeClick}><img className="like-image" src={card3} alt="oops"/></button>
                <p className="like-count">{likeCount} </p>
                </div>
              <img src={card4} className="card-attach-file-icon-bottom" ref={imgRef} onClick={handleImgClick} style={{ cursor: 'pointer' }} alt="oops"/>
          </span>
        </div>
        
        {/* <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="card_footer_item">
              <CheckSquare className="card_footer_icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div> */}
      </div>
    </>
  );
}

export default Card;
