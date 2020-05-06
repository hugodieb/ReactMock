import React from 'react'

const SuccessPay = (props) => {
    debugger    
    const data = props.data
    const display = true
    
    return (
        <div className="container has-text-centered">
            <p>erro: {data.error}</p>
            <p className="has-text-grey-light is-uppercase is-size-1-desktop">
                Obrigado pela sua compra!
            </p>
            <p className="has-text-grey-light is-lowercase">
                Click no botão abaixo para download de seu arquivo de template.
            </p>
            <p>
                <a href="/demo/rar/shopmax.zip" download className="button">
                    Download Template&emsp;
                    <i className="fa fa-download" aria-hidden="true"></i>
                </a>
            </p>
            
            <p className="has-text-grey-light is-lowercase has-text-weight-light">
                Caso necessite de algum auxílio, entre em contato pelo canal <br/>
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
                <a className="button is-screw">
                    <span>
                        Detalhes da compra
                    </span>
                </a>
            </p>
        </div>               
    )
}

export default SuccessPay