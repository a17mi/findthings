function Modal({ ad, onClose }) {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{ad.title}</h2>
          <p>{ad.description}</p>
        </div>
      </div>
    );
  }
  
  export default Modal;