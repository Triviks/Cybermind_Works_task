import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import saveIcon from './assets/images/icons/circle-check.png';
import trashCan1 from './assets/images/icons/trash-can.png';
import closeIcon from './assets/images/icons/close.png';
import calendarIcon from './assets/images/icons/calendar.png';
import personImg from './assets/images/icons/Rectangle 911.png';
import personIcon from './assets/images/icons/user.png';
import dropdownArrow from './assets/images/icons/Vector.png';
import notes from './assets/images/icons/note-sticky.png';
import send from './assets/images/icons/send.png';
import users from './users';
import initialComments from './comments';
import { FiEdit } from "react-icons/fi";

function Modal() {
    const [eventName, setEventName] = useState("Flower Arrangement");
    const [startDate, setStartDate] = useState(new Date('2024-12-05T08:00:00'));
    const [isEditingDate, setIsEditingDate] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState("Jane Smith");
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");
    const [editingComment, setEditingComment] = useState(null);
    const [isEventComplete, setIsEventComplete] = useState(false);
    const dropdownRef = useRef(null);
    const modalContainer = useRef();

    const handleDateChange = (date) => {
        setStartDate(date);
        setIsEditingDate(false);
    };

    const handlePersonSelect = (person) => {
        setSelectedPerson(person);
        setIsDropdownOpen(false);
    };

    const formatTime = (time) => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        if (editingComment !== null) {
            if (newComment.trim() === "") return;

            const updatedComments = comments.map((comment, index) =>
                index === editingComment ? { ...comment, comment: newComment } : comment
            );
            setComments(updatedComments);
            setEditingComment(null);
        } else {
            if (newComment.trim() === "") return;
            const newCommentObj = {
                name: "Jane Smith",
                image: personImg,
                comment: newComment,
            };
            setComments([...comments, newCommentObj]);
        }
        setNewComment("");
    };

    const handleDeleteComment = (index) => {
        const filteredComments = comments.filter((_, i) => i !== index);
        setComments(filteredComments);
    };

    const toggleEventCompletion = () => {
        setIsEventComplete(!isEventComplete);

    };

    return (
        <>
            <div className='modal_container border' ref={modalContainer} style={isEventComplete ? { backgroundColor: "lightgreen" } : { backgroundColor: "white" }}>

                <section className='top section d-flex align-items-center justify-content-between mb-4'>
                    <span onClick={toggleEventCompletion} style={{ cursor: "pointer" }}>
                        <img src={saveIcon} alt="Save" />
                    </span>

                    {isEventComplete && (
                        <span className='event_status' style={{ fontFamily: "Inter", fontWeight: '900', fontSize: "16px", color: 'red', textTransform: "uppercase" }}>Status: Complete</span>
                    )}

                    <span className='d-flex gap-3 align-items-center'>
                        <img src={trashCan1} alt="Delete" style={{ cursor: 'pointer' }} />
                        <img src={closeIcon} alt="Close" style={{ cursor: 'pointer' }} />
                    </span>
                </section>

                <section className='event_details d-flex flex-column'>
                    <input
                        type='text'
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className='event_name'
                        disabled={isEventComplete}
                    />
                    <span className='event_date d-flex align-items-center'>
                        <img src={calendarIcon} width={13} height={15} className='me-2' alt="Calendar" />
                        {isEditingDate ? (
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                onCalendarClose={() => setIsEditingDate(false)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                inline
                                className='custom_date_class'
                            />
                        ) : (
                            <span className='event_date_input' onClick={() => !isEventComplete && setIsEditingDate(true)}>
                                {`${startDate.toLocaleString('default', { month: 'short' })} ${startDate.getDate()}, ${startDate.getFullYear()} at ${formatTime(startDate)} - ${formatTime(new Date(startDate.getTime() + 2 * 60 * 60 * 1000))}`}
                            </span>
                        )}
                    </span>
                </section>

                <section className='event_person d-flex align-items-center justify-content-between' style={{ padding: "20px 0px" }}>
                    <div className='d-flex align-items-center' style={{ gap: "15px" }}>
                        <img src={personIcon} alt="Person" />
                        <i style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: "500", lineHeight: "16.94px", letterSpacing: '-0.02em', color: "#5A5A5A" }}>Assign to:</i>
                    </div>
                    <div ref={dropdownRef} className="assign_person d-flex align-items-center justify-content-between" onClick={() => !isEventComplete && setIsDropdownOpen(!isDropdownOpen)}>
                        <span className='d-flex align-items-center gap-2'>
                            <img src={users.find(user => user.name === selectedPerson)?.image} alt={selectedPerson} className='user_img' />
                            <span style={{ fontFamily: "Inter", fontSize: "12px", fontWeight: "600", lineHeight: "14.52px", letterSpacing: '-0.02em', color: "#009379" }}>{selectedPerson}</span>
                        </span>
                        <img src={dropdownArrow} alt="Dropdown" />
                        {isDropdownOpen && (
                            <div className="dropdown">
                                <ul>
                                    {users.map((user, index) => (
                                        <li key={index} onClick={() => handlePersonSelect(user.name)} className='d-flex align-items-center gap-2'>
                                            <img src={user.image} alt={user.name} className='user_img' />
                                            <span>
                                                {user.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                <section className='event_notes d-flex align-items-start justify-content-between'>
                    <div className='d-flex align-items-center' style={{ gap: '15px' }}>
                        <img src={notes} alt="Notes" />
                        <i style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: "500", lineHeight: "16.94px", letterSpacing: '-0.02em', color: "#5A5A5A" }}>Note:</i>
                    </div>
                    <div className='event_notes'>
                        <textarea
                            rows='2'
                            className='event_notes_input'
                            defaultValue="09382049832 www.flowervendor.com"
                            disabled={isEventComplete}
                        />
                    </div>
                </section>

                <hr />

                <section className='comments mt-4'>
                    <h6 className="heading">Comments</h6>
                    {comments.map((comment, index) => (
                        <div key={index} className='d-flex justify-content-between align-items-start my-4'>
                            <div className='d-flex align-items-start gap-2'>
                                <img src={comment.image} alt={comment.name} />
                                <div className='d-flex flex-column align-items-baseline'>
                                    <span className='username' style={{ cursor: "pointer" }}>{comment.name}</span>
                                    {editingComment === index ? (
                                        <span className='comment'>{newComment}</span>
                                    ) : (
                                        <span className='comment'>{comment.comment}</span>
                                    )}
                                    {!isEventComplete ? (
                                        <FiEdit
                                            className='mt-1'
                                            style={{ fontSize: "10px", cursor: "pointer" }}
                                            onClick={() => {
                                                setNewComment(comment.comment);
                                                setEditingComment(index);
                                            }}
                                        />
                                    ) : (
                                        <FiEdit
                                            className='mt-1'
                                            style={{ fontSize: "10px", cursor: "pointer" }}
                                        />
                                    )}
                                </div>
                            </div>
                            {!isEventComplete ? (
                                <img src={trashCan1} alt="Delete" className='mt-3' onClick={() => handleDeleteComment(index)} style={{ cursor: "pointer", paddingLeft: "5px" }} />
                            ) : (
                                <img src={trashCan1} alt="Delete" className='mt-3' style={{ cursor: "pointer", paddingLeft: "5px" }} />
                            )}
                        </div>
                    ))}
                    <div className='d-flex align-items-center gap-2'>
                        <img src={personImg} alt="User" />
                        <span className='comment_input_container d-flex align-items-center justify-content-between'>
                            {!isEventComplete ? (
                                <input
                                    type='text'
                                    placeholder='Write comment...'
                                    value={newComment}
                                    onChange={handleCommentChange}
                                />
                            ) : (
                                <input
                                    type='text'
                                    placeholder='Write comment...'
                                    value={newComment}
                                    onChange={handleCommentChange}
                                    disabled
                                />
                            )}
                            <button type='button' className='btn d-flex p-0 align-items-center send_btn' style={{ border: 'none', outline: "none" }}>
                                <img src={send} alt="Send" onClick={handleAddComment} />
                            </button>
                        </span>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Modal;