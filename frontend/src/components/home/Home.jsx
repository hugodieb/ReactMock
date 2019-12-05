import React, {Component} from 'react'
import Main from '@components/template/Main'

class Home extends Component {    

    render() {        
        
        return (
            <Main icon="home" title="Início"
                subtitle="Seu projeto React com uso de dados mock"
            >
                <section className="container">
                    <div className="columns features">
                        <div class="column is-4">
                            <div class="card is-shady">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="https://source.unsplash.com/RWnpyGtY1aU" alt="" className="modal-button" data-target="modal-image2" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        <h4>Click on image above</h4>
                                        <p>Purus semper eget duis at tellus at urna condimentum mattis. </p>
                                        <span class="button is-link modal-button" data-target="modal-image2">Image modal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Main>
        )
    }
}
  export default Home
