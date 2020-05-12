import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ data, closeModal, modalState, title }) => {    
    if(!modalState) {
      return null
    }
    
    const show = () => {
      return (
        <div>
          <p className="has-text-left is-uppercase">
            O número do seu pedido é: <span className="has-text-grey">{ data.invoice }</span>
          </p>
          <p className="has-text-left is-uppercase">
            Nome do seu Produto: <span className="has-text-grey">{ data.name }</span>
          </p>
          <p className="has-text-left is-uppercase">
            Status de pagamento do seu pedido: <span className="has-text-grey">{ data.state }</span>
          </p>
        </div>
      )
    }

    return(
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal} />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{title}</p>
              <button className="delete" onClick={closeModal} />
            </header>
            <section className="modal-card-body">
              <div className="content">                
                {show()}              
              </div>
            </section>
            <footer className="modal-card-foot">
              <a className="button" onClick={closeModal}>Sair</a>
            </footer>
        </div>
      </div>
    )
}
  
Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired,
    title: PropTypes.string
  }

export default Modal