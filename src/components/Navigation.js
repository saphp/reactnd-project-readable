import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem } from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<Navbar color="faded" light toggleable>
				<NavbarToggler right onClick={this.toggle} />
				<NavbarBrand tag={Link} to="/">Readable</NavbarBrand>
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink exact to="/" className="nav-link" activeClassName="active">Hot</NavLink>
						</NavItem>
						{this.props.categories.map((category) => (
							<NavItem key={category.path}>
								<NavLink to={`/${category.path}`} className="nav-link" activeClassName="active">{category.name}</NavLink>
							</NavItem>
						))}
					</Nav>
				</Collapse>
			</Navbar>
		)
	}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories.items,
});

export default connect(mapStateToProps, null, null, {
	pure: false
})(Navigation)