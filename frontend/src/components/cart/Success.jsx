import React, { useState, useEffect } from 'react'
import Modal from '@components/cart/Modal'

const SuccessPay = (props) => {            
    const { data } = props.data    
    const [modalState, setModalState] = useState(false)
    const [dataState, setDataState] = useState(
        {
            "invoice": "",
            "name": "",
            "state": ""
        }
    )

    useEffect(() => {        
        if(Object.keys(data).length > 0) {          
            data.transactions.map(transaction => {                
                transaction.item_list.items.map(item => {
                    setDataState(
                        {
                            ...dataState,
                            "name": item.name,
                            "invoice": transaction.invoice_number,
                            "state": data.state
                        }
                    )
                })
            })
        }
    }, [])

    const dowloadFile = (event) => {        
        event.preventDefault()     
        const url = "/demo/rar/shopmax.zip"
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'template_one');
        document.body.appendChild(link);
        link.click();
    }   

    const toggleModal = () => {         
        setModalState(!modalState)
    }
    
    const getSucces = () => {
        
        return (
            <div>
                <p className="has-text-grey-light is-uppercase is-size-1-desktop">
                    Obrigado pela sua compra!
                </p>
                <p className="has-text-grey-light is-lowercase">
                    Click no botão abaixo para download de seu arquivo de template.
                </p>
                <p>
                    { Object.keys(data).length > 0 ? 
                         <button className="button" onClick={e => dowloadFile(e)}>
                            Download Template&emsp;
                            <i className="fa fa-download" aria-hidden="true"></i>
                         </button>
                         : ''
                    }
                </p>                
                <p className="has-text-grey-light is-lowercase has-text-weight-light">
                    Caso necessite de algum auxílio, entre em contato pelo canal <br/>
                </p>
                <p className="has-text-grey-light is-lowercase has-text-weight-light">
                    *O arquivo de template também será enviado para seu email*
                </p>
                <p>
                    <a href="#" className="help is-uppercase">Me ajude&emsp;
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                    </a>
                </p>
                <p>
                    <a className="button is-screw secondary">
                        <span>
                            Voltar para o início
                        </span>
                    </a>
                    <a className="button is-screw" onClick={toggleModal}>
                        <span>
                            Detalhes da compra
                        </span>
                    </a>                   
                </p>
                <Modal 
                    closeModal={toggleModal} 
                    modalState={modalState} 
                    title="Dados da sua compra"
                    data={ dataState }
                / >  
            </div>          
        )
    }   
    
    return (        
        <div className="container has-text-centered">
            { getSucces() }            
        </div>               
    )
}

export default SuccessPay