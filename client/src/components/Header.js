import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {

    renderLinks() {
        if (this.props.auth) {
            return (
                <div className="ui menu">
                    <NavLink exact className="item" to="/">Redux Auth</NavLink>
                    <NavLink className="item" to="/signout">Sign Out</NavLink>
                    <NavLink className="item" to="/feature">Feature</NavLink>
                </div>
            )
        }
        else {
            return (
                <div className="ui menu">
                    <NavLink exact className="item" to="/">Redux Auth</NavLink>
                    <NavLink className="item" to="/signin">Sign In</NavLink>
                    <NavLink className="item" to="/signup">Sign Up</NavLink>
                </div>
            );
        }
    }

    render() {
        return this.renderLinks();
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.authenticated
    }
};

export default connect(mapStateToProps)(Header);