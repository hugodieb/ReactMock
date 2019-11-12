import './avatar.css'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import avatar from '../../assets/imgs/avatar.png'

class Avatar extends Component {
    render() {
        const { user } = this.props
        console.log(user)
        return (
            <div>
                <img src={avatar}
             alt="Avatar" className="avatar">             
            </img>
            <p>{user.name}</p>
            </div>           
        )
    }
}

const mapStateToProps = store => ({
    user: store.authLogin.user
})

export default connect(mapStateToProps)(Avatar)